import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Header extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
				{/* <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button> */}
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto mt-2 mt-lg-0">
						<li><Link to="/login" className="nav-link">Logout</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
}