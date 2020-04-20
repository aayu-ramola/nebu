import React from 'react';
import { connect } from "react-redux";
import { Response } from '../components';
import { alertActions, categoriesActions } from '../actions';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class ResponseList extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			categoriesInTreeData: []
		}
		const { dispatch } = this.props;
		dispatch(alertActions.clear());	
	}

	componentDidMount() {
    	this.props.dispatch(categoriesActions.getAllCategoryResponse());
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ categoriesInTreeData : nextProps.categoriesInTreeData });
	}

	renderTableData() {
		if(this.state.categoriesInTreeData != undefined){
			return this.state.categoriesInTreeData.map((student, index) => {
	         	const { id, tagsname, response } = student
	         	return (
	           		<tr key={id}>
	               		<td>{tagsname}</td>
	               		<td dangerouslySetInnerHTML={{ __html: response}} ></td>
	            	</tr>
	         	)
      		})		
		}
    }
	
    render() {
      const { categoriesInTreeData } = this.state;
      var linkStyle = {marginBottom: '10px' , marginTop: '10px', float: 'right'};
      return (
          <div className="row">

                <div className="col-md-12">
                <span>
                 <Link className="btn btn-primary" to="/response/add" style={linkStyle}>Add Category Response</Link>
                </span>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th >Category</th>
                                <th >Response</th>
                            </tr>
                        </thead>
                        <tbody>
                  		{this.renderTableData()}
               			</tbody>
                    </table>
                </div>
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
		createResponseCategory: (data) => dispatch(categoriesActions.createResponseCategory(data)),
		dispatch:  dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseList);