import React, { Component } from 'react';

export class Loader extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<div className="loading">Loading&#8230;</div>
		);
	}
}