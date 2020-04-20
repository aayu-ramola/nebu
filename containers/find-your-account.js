import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../actions';
import { Loader } from '../components';

class Login extends Component {
	constructor(props) {
		super(props);

		props.dispatch(userActions.logout());
		this.state= {
			emailId : "",
			password : "",
			submitted: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		const { dispatch } = this.props;
		dispatch(alertActions.clear());
		
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ submitted: true });
		const { emailId, password } = this.state;
		const { dispatch } = this.props;
		dispatch(alertActions.clear());
		if(emailId && password) {
			dispatch(userActions.login(emailId, password));
		}
	}

	handleChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
    this.setState({ [name]: value });
	}
 
	render() {
		const { loggingIn, alert } = this.props;
    const { emailId, password, submitted } = this.state;
		return (
		  <div>
				{
					loggingIn && <Loader/>
				}
				<div className="py-4">
	        <div className="container">
						<div className="row justify-content-center">
							<div className="col-md-8">
								<div className="card">
									<div className="card-header">Login</div>
									<div className="card-body">
										{
											alert.message && <p className="text-danger text-center">These credentials do not match our records.</p>
										}
										<form onSubmit={this.handleSubmit}>
												<div className="form-group row">
													<label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
													<div className="col-md-6">
														<input id="emailId" type="text" name="emailId" onChange={this.handleChange} autoFocus="" value={emailId}
															className={ "form-control " + (submitted && !emailId ? "is-invalid": "")} />
														{	submitted && !emailId &&
															<span className="invalid-feedback" role="alert">
																<strong>Email address is required</strong>
															</span>	
														}
													</div>
												</div>
												<div className="form-group row">
														<label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
														<div className="col-md-6">
															<input id="password" type="password" name="password" onChange={this.handleChange} value={password}
																className={ "form-control " + (submitted && !password ? "is-invalid": "")}/>
																{	submitted && !password &&
																	<span className="invalid-feedback" role="alert">
																		<strong>Password is required</strong>
																	</span>	
																}
														</div>
												</div>
												<div className="form-group row">
													<div className="col-md-6 offset-md-4">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" name="remember" id="remember"/>
															<label className="form-check-label" htmlFor="remember">
																Remember Me
															</label>
														</div>
													</div>
												</div>
												<div className="form-group row mb-0">
													<div className="col-md-8 offset-md-4">
														<button type="submit" onClick={this.handleSubmit} className="btn btn-primary">
															Login
														</button>
														<a className="btn btn-link" href="/Find-Your-Account">
															Forgot Your Password?
														</a>
													</div>
												</div>
										</form>
									</div>
							</div>
						</div>
					</div>
				</div>
	    </div>
	  </div>
		);
	}
}

function mapStateToProps(state) {
	const { loggingIn } = state.authentication;
	const { alert } = state;
	return {
		loggingIn,
		alert
	};
}

export default connect(mapStateToProps)(Login);