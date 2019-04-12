import React, { Component } from 'react';
import './styles.css';
import Logo from '../../assets/logo.svg';

import axios from 'axios';

class Main extends Component {
	state = {
		newBox: '',
	};

	handleSubmit = async e => {
		e.preventDefault();
		const response = await axios.post('https://rocket-drop.herokuapp.com/boxes', { title: this.state.newBox });
		console.log(response);
		this.props.history.push(`/box/${response.data._id}`);
	};

	handleInputChange = e => {
		this.setState({ newBox: e.target.value });
	};

	render() {
		return (
			<div id="main-container">
				<form action="" onSubmit={this.handleSubmit}>
					<img alt="logo" src={Logo} />
					<input value={this.state.newBox} onChange={this.handleInputChange} placeholder="Criar um Box" />
					<button type="submit">Criar</button>
				</form>
			</div>
		);
	}
}

export default Main;
