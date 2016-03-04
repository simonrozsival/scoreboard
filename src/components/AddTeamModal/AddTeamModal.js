import React, { Component, PropTypes } from 'react';
import { Modal, Button, Input, Glyphicon } from 'react-bootstrap';

/**
 * This presentational components contains a button which shows a modal
 * which allows user to add a new team.
 */
class AddTeamModal extends Component {

	static propTypes = {
		addTeam: PropTypes.func.isRequired
	};

	state = {
		isVisible: false,
		name: ''
	};

	show = () => {
		this.setState({
			isVisible: true
		});
	};

	close = () => {
		this.setState({
			isVisible: false
		});
	};

	changeName = (name) => {
		this.setState({ name });
	};

	render() {
		const { name, isVisible } = this.state;
		const { addTeam } = this.props;

		return (
			<div>
				<Button bsStyle={'primary'} onClick={this.show} bsSize={'xsmall'}>
					<Glyphicon glyph={'plus'} /> Přidat tým
				</Button>
				<Modal show={isVisible} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Přidat nový tým</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<Input type={'text'} label={'Název týmu'} onChange={(e) => this.changeName(e.target.value)} />
						</form>
					</Modal.Body>
					<Modal.Footer>
            			<Button bsStyle={'primary'}
            				onClick={() => addTeam(name) && this.close()}
            				disabled={name.length === 0}>Přidat tým</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

}

export default AddTeamModal;
