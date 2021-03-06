import React, { Component } from 'react';
import Logo from '../../assets/logo.svg';
import { MdInsertDriveFile } from 'react-icons/md';

import axios from 'axios';
import './style.css';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

class Box extends Component {
	state = {
		box: {},
	};

	async componentDidMount() {
		this.subscribeToNewFiles();
		const box = this.props.match.params.id;
		const response = await axios.get(`https://rocket-drop.herokuapp.com/boxes/${box}`);
		console.log(response);
		this.setState({ box: response.data });
	}

	subscribeToNewFiles = () => {
		const box = this.props.match.params.id;
		const io = socket('https://rocket-drop.herokuapp.com');
		io.emit('connectRoom', box);
		io.on('file', data => {
			this.setState({ box: { ...this.state.box, files: [data, ...this.state.box.files] } });
		});
	};

	handleUpload = files => {
		files.forEach(file => {
			const data = new FormData();
			data.append('file', file);
			const response = axios.post(`https://rocket-drop.herokuapp.com/boxes/${this.state.box._id}/files`, data);
			this.setState({ box: { ...this.state.box, response } });
		});
	};

	render() {
		const { box } = this.state;
		return (
			<div id="box-container">
				<header>
					<img src={Logo} alt="logo" />
					<h1>{box.title}</h1>
				</header>
				<Dropzone onDropAccepted={this.handleUpload}>
					{({ getRootProps, getInputProps }) => (
						<div className="upload" {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Arraste arquivos ou clique aqui para acessa-los</p>
						</div>
					)}
				</Dropzone>
				<ul>
					{box.files &&
						box.files.map(file => (
							<li key={file._id}>
								<a className="fileInfo" href={file.url} target="_blank">
									<MdInsertDriveFile size={24} color="#A5Cfff" />
									<strong>{file.title}</strong>
								</a>
								<span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
							</li>
						))}
				</ul>
			</div>
		);
	}
}

export default Box;
