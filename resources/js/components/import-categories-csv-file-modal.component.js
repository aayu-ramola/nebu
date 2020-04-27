import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import Dropzone from 'react-dropzone';
import swal from 'sweetalert';

export class ImportCategoriesCsvFileModal extends Component {
	constructor(props) {
		super(props);
		this.state= {
			uploadedFiles: []
		}
		this.changeDropZoneContent = this.changeDropZoneContent.bind(this);
		this.removeFileFromDropZone = this.removeFileFromDropZone.bind(this);
		this.importUploadedCategoriesFile = this.importUploadedCategoriesFile.bind(this);
	}

	changeDropZoneContent(acceptedFiles) {
		if(acceptedFiles && acceptedFiles.length) {
			let file = acceptedFiles[0];
			if(file.name.includes('csv')) {
				this.setState({
					uploadedFiles: [...acceptedFiles]
				})
			} else {
				swal("Please upload valid CSV file!", "", "info");
			}
		}
	}

	importUploadedCategoriesFile() {
		let self = this;
		const {uploadedFiles} = self.state;
		if(uploadedFiles && uploadedFiles.length > 0) {
			self.props.importUploadedCategoriesFile(uploadedFiles).then(function(isSuccessed){
				if(isSuccessed) {
					swal("Categories imporated successfully!", "", "success");
					self.props.toggleModal()
					self.setState({
						uploadedFiles: []
					});
				}
			});
		}
		
	}

	removeFileFromDropZone(e) {
		this.setState({
			uploadedFiles: []
		});
		e.stopPropagation();
	}
	

	render(){
	const { fileuploadModel } = this.props;
	const { uploadedFiles } = this.state; 

		return(
			<Modal isOpen={fileuploadModel} toggle={this.props.toggleModal}>
			<ModalHeader toggle={this.props.toggleModal}>Import Categories</ModalHeader>
			<ModalBody>
				<Dropzone multiple={false} onDrop={this.changeDropZoneContent}>
					{({getRootProps, getInputProps}) => (
						<section>
							<div {...getRootProps({className: 'dropzone'})}>
								<input {...getInputProps()} />
								{
									uploadedFiles && uploadedFiles.length == 0 ? 
									<p>Drag 'n' drop some files here, or click to select files</p> :
									uploadedFiles.map((file, index) => (
										<Alert color="primary" key={index} isOpen={true} toggle={this.removeFileFromDropZone}>
											{file.name}
										</Alert>
									))
								}
							</div>
						</section>
					)}
				</Dropzone>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={this.importUploadedCategoriesFile}>Import</Button>
				<Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
			</ModalFooter>
		</Modal>
		);
	}
}