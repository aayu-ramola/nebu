import React, { Component } from 'react';
import { connect } from "react-redux";
import 'react-sortable-tree/style.css'
import { Header, Sidebar, Loader, CategorySortableTreeView, ImportCategoriesCsvFileModal } from '../components';
import { alertActions, categoriesActions } from '../actions';
import swal from 'sweetalert';


export class Categories extends Component {
	constructor(props) {
		super(props);
		this.state= {
			categoriesInTreeData: [],
			fileuploadModel : false,
			uploadedFiles: []
		}
		const { dispatch } = this.props;
		dispatch(alertActions.clear());
		this.toggleModal = this.toggleModal.bind(this);
		this.importUploadedCategoriesFile = this.importUploadedCategoriesFile.bind(this);
		this.clearCategories = this.clearCategories.bind(this);
	}

	componentDidMount() {
    this.props.dispatch(categoriesActions.getAllInTreeData());
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			categoriesInTreeData: nextProps.categoriesInTreeData
		});
	 }

	toggleModal() {
    this.setState(prevState => ({
			fileuploadModel: !prevState.fileuploadModel
    }));
	}

	importUploadedCategoriesFile(uploadedFiles) {
		let self= this;
		return self.props.importCategoriesFile(uploadedFiles).then(function(data){
			self.setState({
				categoriesInTreeData: data,
			});
			return true;
		});
	}

	clearCategories() {
		swal({
			title: "Once cleared, you will not be able to recover those categories!",
			text: "",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
		.then((willDelete) => {
			if (willDelete) {
				swal("Categories cleared now!", "", "success");
			}
		});
	}


	render(){
		const { fileuploadModel, categoriesInTreeData } = this.state;
		return(
			<div>
				<div className="mt-2">
					<button onClick={this.toggleModal} className="btn btn-primary mr-2">
						Import Categories
					</button>
					<button onClick={this.clearCategories} className="btn btn-danger mr-2" style={{display: 'none'}}>
						Clear Categories
					</button>
				</div>
				{
					<CategorySortableTreeView 
						categoriesInTreeData= {categoriesInTreeData}
						createCategroy={this.props.createCategroy}
						updateCategroy={this.props.updateCategroy}
						removeCategroy={this.props.removeCategroy}>
					</CategorySortableTreeView>
				}
				<ImportCategoriesCsvFileModal
					fileuploadModel={fileuploadModel}
					toggleModal={this.toggleModal}
					importUploadedCategoriesFile={this.importUploadedCategoriesFile}>
				</ImportCategoriesCsvFileModal>
			</div>
		);
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
		dispatch:  dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);