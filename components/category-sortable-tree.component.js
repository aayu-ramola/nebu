import React, { Component } from 'react';
import SortableTree , { toggleExpandedForAll, changeNodeAtPath, addNodeUnderParent, removeNodeAtPath } from "react-sortable-tree";

export class CategorySortableTreeView extends Component {
	constructor(props) {
		super(props);
		this.state= {
			categoriesInTreeData: [],
			categories: [],
			categoryFormModal: false,
			searchString: "",
			searchFocusIndex: 0,
			searchFoundCount: null,
			selectedNode: {
				category_title: ""
			}
		}
		this.addNewItem = this.addNewItem.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.renameItem = this.renameItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
		this.removeNode = this.removeNode.bind(this);
		this.handleTreeOnChange = this.handleTreeOnChange.bind(this);
		this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
		this.selectNextMatch = this.selectNextMatch.bind(this);
		this.selectPrevMatch = this.selectPrevMatch.bind(this);
		this.changeParentOnMove= this.changeParentOnMove.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.categoriesInTreeData !== this.props.categoriesInTreeData) {
			this.setState({
				categoriesInTreeData: nextProps.categoriesInTreeData
			});
		}
	 }
	
	addNewItem(newItem) {
		let self = this;
		let { node } = newItem;
		let NEW_NODE = { category_title: "New node", parent_id: node.id };
    let getNodeKey = ({ node: object, treeIndex: number }) => {
      return number;
    };
    let parentKey = getNodeKey(newItem);
    if (parentKey === -1) {
      parentKey = null;
		}
		this.props.createCategroy(NEW_NODE).then(category => {
			let newTree = addNodeUnderParent({
				treeData: self.state.categoriesInTreeData,
				newNode: category,
				expandParent: true,
				parentKey: parentKey,
				getNodeKey:  ({ node: object, treeIndex: number }) => {
					return number;
				}
			});
			self.setState({ categoriesInTreeData: newTree.treeData });
		})
	}
	
	handleOnChange(e) {
    e.isDefaultPrevented();
    let { selectedNode } = this.state;
    selectedNode.category_title = e.target.value;
    this.setState({
      selectedNode: selectedNode
    });
	}

	handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.saveItem();
    }
  }
	
	renameItem(rowInfo) {
    let { node, path } = rowInfo;
    this.setState({
      selectedNode: node,
      selectedNodePath: path
		});
    node.isInsrted = true;
    let newTree = changeNodeAtPath({
      treeData: this.state.categoriesInTreeData,
      newNode: node,
      path: path,
      getNodeKey: ({ node: TreeNode, treeIndex: number}) => {
        return number;
      },
      ignoreCollapsed: true
		});
    this.setState({ categoriesInTreeData: newTree });
  } 

  saveItem() {
		let self = this;
		let { selectedNode, selectedNodePath } = self.state;
		delete selectedNode["isInsrted"];
		let data = {
			category_title: selectedNode.category_title,
			parent_id: selectedNode.parent_id
		}
		self.props.updateCategroy(selectedNode.id, data).then(() => {
			let newTree = changeNodeAtPath({
				treeData: self.state.categoriesInTreeData,
				newNode: selectedNode,
				path: selectedNodePath,
				getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
					return number;
				},
				ignoreCollapsed: true
			});
			self.setState({ selectedNode: { category_title: "" } });
			self.setState({ selectedNodePath: [] });
			self.setState({ categoriesInTreeData: newTree });
		});
  }

  removeNode(rowInfo) {
		let self = this;
		let { node, path } = rowInfo;
		this.props.removeCategroy(node.id).then(() =>{
			let newTree = removeNodeAtPath({
				treeData: self.state.categoriesInTreeData,
				path: path,
				getNodeKey: ({ node: object, treeIndex: number }) => {
					return number;
				},
				ignoreCollapsed: true
			});
			self.setState({ categoriesInTreeData: newTree });
		});
	}

	changeParentOnMove(node, newParent) {
		let self = this;
		let data = {
			category_title: node.category_title,
			parent_id: newParent.id
		}
		self.props.updateCategroy(node.id, data).then(() => {
			console.log("Parent updated");
		});
	}

	handleTreeOnChange(categoriesInTreeData) {
    this.setState({ 
			categoriesInTreeData: categoriesInTreeData
		 });
  };

  handleSearchOnChange(e) {
    this.setState({
      searchString: e.target.value
    });
  };

  selectPrevMatch() {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1
    });
  };

  selectNextMatch() {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0
    });
  };

  toggleNodeExpansion (expanded) {
    this.setState(prevState => ({
      categoriesInTreeData: toggleExpandedForAll({
        treeData: prevState.categoriesInTreeData,
        expanded
      })
    }));
  };

	render(){
		const { 
			categoriesInTreeData, 
			searchString,
      searchFocusIndex,
      searchFoundCount,
			selectedNode, } = this.state;
		let maxDepth= 4;
		return(
			<div>
				<div className="mt-2">
					<button onClick={this.toggleNodeExpansion.bind(this, true)} className="btn btn-primary mr-2">
						Expand all
					</button>
					<button className="btn btn-primary mr-2" onClick={this.toggleNodeExpansion.bind(this, false)}>
						Collapse all
					</button>
					<label>Search: </label>
					<input onChange={this.handleSearchOnChange} className="mr-2 ml-2"/>
					<button className="btn btn-primary mr-2" onClick={this.selectPrevMatch}>
						Previous
					</button>
					<button className="btn btn-primary mr-2" onClick={this.selectNextMatch} >
						Next
					</button>
					<label>
						{searchFocusIndex} / {searchFoundCount}
					</label>
				</div>
				<div style={{ height: 1020 }}>
					{
						categoriesInTreeData &&
						<SortableTree
							treeData={categoriesInTreeData}
							onChange={this.handleTreeOnChange}
							onMoveNode={({ node, treeIndex, path, nextParentNode }) => {
									this.changeParentOnMove(node, nextParentNode);
								}
							}
							maxDepth={maxDepth}
							searchMethod= {(node) => {
								let nodeInfo = node.node;
								let searchQuery = node.searchQuery;
								return nodeInfo && searchQuery && nodeInfo.category_title.toLowerCase().includes(searchQuery.toLowerCase());
							}}
							searchQuery={searchString}
							searchFocusOffset={searchFocusIndex}
							canDrag={({ node }) => {
								return node.category_title != "Root";
							}}
							canDrop={({ nextParent }) => {
								return nextParent != null
							}}
							searchFinishCallback={ (matches) => {
									this.setState({
										searchFoundCount: matches.length,
										searchFocusIndex:
											matches.length > 0 ? searchFocusIndex % matches.length : 0
									});
								}
							}
							isVirtualized={true}
							generateNodeProps={rowInfo => ({
								buttons: [
									<button
										className="btn btn-link"
										style={{ verticalAlign: "middle" }}
										onClick={() => this.addNewItem(rowInfo)}>
										Add
									</button>,
									<button
										className="btn btn-link"
										style={{ verticalAlign: "middle" }}
										onClick={() => this.renameItem(rowInfo)}>
										Rename
									</button>,
									rowInfo.node.parent_id !== 0 && <button
										className="btn btn-link"
										style={{ verticalAlign: "middle" }}
										onClick={() => this.removeNode(rowInfo)}>
										Remove
									</button>
								],
								title: nodeInfo => {
									let { node } = nodeInfo;
									if (node.isInsrted) {
										return (
											<input
												type="text"
												value={selectedNode.category_title}
												onChange={this.handleOnChange}
												onBlur={this.saveItem}
												onKeyDown={this.handleKeyDown}
												autoFocus/>
										);      
									} else {
										return <span onDoubleClick={() => this.renameItem(rowInfo)}>{node.category_title}</span>
									}
								}
							})}/>
					}
				</div>
			</div>
		);
	}
}