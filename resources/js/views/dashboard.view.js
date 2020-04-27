import React, { Component } from 'react';
import { connect } from "react-redux";
import { alertActions, categoriesActions } from '../actions';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state= {
			getResponse: [],
			count:0,
			cssGridClass:"col-md-4",
		}
		const { dispatch } = this.props;
		dispatch(alertActions.clear());	
	}

	componentDidMount() {
    	this.props.dispatch(categoriesActions.getResponse());
	}

	componentWillReceiveProps(nextProps) {

		this.setState({ getResponse : nextProps.getResponse });
		
	}

	renderTableData(modeCat) {
		if(this.state.getResponse != undefined){
              
			return Object.keys(this.state.getResponse).map((mo, index) => {
            
				if(mo == modeCat){

	   		return this.state.getResponse[mo].map((mode,i)=>{
	   			
                    const { id, first_name, last_name, review } = mode;
                    const { response } = JSON.parse(review);
                  
            
	         	return (
	               
	         		<div className="listResponse">
	               		<p>{first_name} {last_name}</p>
	               		<p>{ response.content }</p>
	            	</div>
	            	
	         	) 
				});
			}
      		});		
		}
    }

	 render(){
               return(
               <div class="container">
                 <div class="row">  
                    <div class="col-md-3 gridBox">
                       <h3>Urgent</h3>
		              {this.renderTableData(1)}	
		           </div>
		           <div class="col-md-3 gridBox">
		              <h3>Regular</h3>
		              {this.renderTableData(2)}	
		           </div>
		           <div class="col-md-3 gridBox">
		              <h3>Wip</h3>
		              {this.renderTableData(3)}	
		           </div>
                  </div>
                </div>  
	            );
	        }
   }

function mapStateToProps(state) {
	const { getResponse } = state.categories;
	const { alert } = state;
	return {
		getResponse,
		alert
	};
}



export default connect(mapStateToProps)(Dashboard);