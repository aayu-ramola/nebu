import React, { Component } from 'react';
import { connect } from "react-redux";
import CKEditor from "react-ckeditor-component";
import { alertActions, categoriesActions } from '../actions';
import Select from 'react-select';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";

class ResponseData extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.state= {
			categoriesInTreeData: [],
			categriesAll : [],
			content:'',
	        selectedOption: null,
	        selectError: '',
	        contentError: ''
		}
		const { dispatch } = this.props;
		dispatch(alertActions.clear());	
	}

	componentDidMount() {
    	this.props.dispatch(categoriesActions.getAllInTreeData());
	}

	updateContent(newContent) {
        this.setState({content: newContent});
    }

	componentWillReceiveProps(nextProps) {
		this.setState({ categoriesInTreeData : nextProps.categoriesInTreeData });
		if(nextProps.categoriesInTreeData != undefined ){
			Object.keys(nextProps.categoriesInTreeData).forEach((key)=> {
				if(nextProps.categoriesInTreeData[key].children){
					this.subCategory(nextProps.categoriesInTreeData[key].children);
				}					
			});			
		}
	}

	subCategory(subCategory){
		Object.keys(subCategory).forEach((key)=> {
			if(subCategory[key].children){
				this.subCategory(subCategory[key].children);
			}
			this.state.categriesAll.push({value : subCategory[key].id , label : subCategory[key].category_title})
		});	
		
	}

	onChangeVar(evt){
      var newContent = evt.editor.getData();
      this.setState({content: newContent });
      this.setState({ contentError: ''});
    }

    handleChange(selectedOption){
    	this.setState({ selectedOption });
    	this.setState({selectError: ''});
    };

    saveData(){
    	this.setState({selectError: ''});
    	this.setState({contentError: ''});
    	if(this.state.selectedOption == null){
    		this.setState({ selectError: 'Please select at least one category'});
    		return false;
    	}
    	if(!this.state.content){
    		this.setState({ contentError:'Please enter response'});
    		return false;
    	}
    	if(this.state.content && this.state.selectedOption){
    		let allData = {"content":this.state.content,'selectedOption':this.state.selectedOption};
    		var fetchDone = this.props.dispatch(categoriesActions.createResponseCategory(allData));
    		window.location.href = '/response';    		
    	}
    }

	render(){
		const { categoriesInTreeData,categriesAll,selectedItems ,content, selectedOption, selectError, contentError } = this.state;	
		var linkStyle = {marginBottom: '10px' , marginTop: '10px'};			
		return(
			<div>
			<span>
             <Link className="btn btn-primary" style={linkStyle	} to="/response" >Category Response List</Link>
             </span>
             <div>
			 <label>Select Category:</label>
			 <Select value={selectedOption} onChange={this.handleChange} options={categriesAll} isMulti />
			 <div style={{ color: 'red'}}>{selectError}</div>
			 <label>Response Content:</label>
       		 <CKEditor  activeClass="editor" events={{"change": this.onChangeVar.bind(this)}} content={this.state.content} />
       		 <div style={{ color: 'red'}}>{contentError}</div>
       		 <span>
       		 <button className="btn btn-primary" style={linkStyle} onClick={this.saveData.bind(this)}>Save</button>
       		 </span>
       		 </div>
       		</div>
		);
	}
	
	optionClicked(optionsList) {
        this.setState({ categriesAll: optionsList });
	}
	
	selectedBadgeClicked(optionsList) {
	    this.setState({ categriesAll: optionsList });
	}
}

function mapStateToProps(state) {
	const { categoriesInTreeData, loading, categories } = state.categories;
	const { alert } = state;
	return {
		categoriesInTreeData,
		categories,
		loading,
		alert
	};
}


const mapDispatchToProps = dispatch => {
  return {		
  		createCategroy: (data) => dispatch(categoriesActions.create(data)),
		updateCategroy: (categoryId, data) => dispatch(categoriesActions.update(categoryId, data)),
		removeCategroy: (categoryId) => dispatch(categoriesActions.remove(categoryId)),
		importCategoriesFile: (files) => dispatch(categoriesActions.importCategoriesFile(files)),
		clearAllCategories: (files) => dispatch(categoriesActions.clearAllCategories(files)),
		createResponseCategory: (data) => dispatch(categoriesActions.createResponseCategory(data)),
		dispatch:  dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseData);