import React, { Component, PropTypes } from 'react';
import { Modal, Button, Input, Glyphicon } from 'react-bootstrap';

/**
 * This presentational component contains a button wich reveals a modal dialog
 * which allows the user to add score to a specific team.
 */
class AddScoreModal extends Component {

	static propTypes = {
		team: PropTypes.object.isRequired,
		addScore: PropTypes.func.isRequired
	};

	state = {
		isVisible: false,
		name: '',
		score: ''
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

	changeScore = (score) => {
		this.setState({ score });
	}

	render() {
		const { name, score, isVisible } = this.state;
		const { team, addScore } = this.props;

		return (
			<div>
				<Button bsStyle={'primary'} onClick={this.show} bsSize={'xsmall'}>
					<Glyphicon glyph={'plus'} /> Přidat skóre
				</Button>
				<Modal show={isVisible} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Přidat skóre pro tým {team.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<Input type={'text'} label={'Název aktivity'} onChange={(e) => this.changeName(e.target.value)} />
							<Input type={'text'} label={'Počet bodů'} onChange={(e) => this.changeScore(e.target.value)} />
						</form>
					</Modal.Body>
					<Modal.Footer>
            			<Button bsStyle={'primary'}
            				onClick={() => addScore(name, Number(score)) && this.close()}
            				disabled={name.length === 0 || score.length === 0 || isNaN(Number(score))}>Přidat skóre</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

}



export default AddScoreModal;
