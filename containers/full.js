import React, { Component } from 'react';
import { connect } from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';
import 'react-sortable-tree/style.css'

import { Header, Sidebar, Loader} from '../components';
import { alertActions} from '../actions';
import Dashboard from '../views/dashboard.view';
import Categories from '../views/categories.view';
import Response from '../views/response.view';
import ResponseList from '../views/responselist.view';

class Full extends Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		dispatch(alertActions.clear());
	}

	render() {
		const { loader, alert, } = this.props;
		return(
			<div>
				{
					loader.loading && <Loader/>
				}
				<div className="d-flex" id="wrapper">
					<Sidebar/>
					<div id="page-content-wrapper">
						<Header/>
						<div className="container-fluid">
							{
								alert.message && 
								<p className={ "mt-2 alert " + alert.type }>
									{ alert.message }
								</p>
							}
							<Switch>
								<Route path="/" exact name="Dashboard" component={Dashboard}/>
								<Route path="/categories" exact name="Categories" component={Categories}/>
								<Route path="/response" exact name="ResponseList" component={ResponseList}/>
								<Route path="/response/add" exact name="Response" component={Response}/>
							</Switch>
						</div>
					</div>
				</div>
			
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	const { loader } = state;
	return {
		alert,
		loader
	};
}
export default connect(mapStateToProps)(Full);