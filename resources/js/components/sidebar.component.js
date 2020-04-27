import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Sidebar extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className="bg-light border-right" id="sidebar-wrapper">
				<div className="sidebar-heading">Response Tracker</div>
				<div className="list-group list-group-flush">
					<Link to="/" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
					<Link to="/categories" className="list-group-item list-group-item-action bg-light">Categories</Link>
					<Link to="/response" className="list-group-item list-group-item-action bg-light">Response</Link>
				</div>
			</div>
		);
	}
}