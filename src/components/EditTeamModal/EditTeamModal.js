import React, { Component, PropTypes } from 'react';
import { Modal, Button, Input, Glyphicon } from 'react-bootstrap';

/**
 * This presentational component allows user to edit the name and current score of a team.
 * The component contains a button and modal dialog.
 */
class EditTeamModal extends Component {

	static propTypes = {
		team: PropTypes.object.isRequired,
		editTeam: PropTypes.func.isRequired
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

	componentDidMount = () => {
		this.componentWillReceiveProps(this.props);
	};

	componentWillReceiveProps = (props) => {
		const { team } = props;
		this.setState({
			name: team.name,
			score: team.points
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
	};

	render() {
		const { name, score, isVisible } = this.state;
		const { team, editTeam } = this.props;

		return (
			<div>
				<Button bsStyle={'primary'} onClick={this.show} bsSize={'xsmall'}>
					<Glyphicon glyph={'pencil'} /> Upravit tým
				</Button>

				<Modal show={isVisible} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Přidat skóre pro tým {team.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							<Input type={'text'} label={'Název týmu'} value={name} onChange={(e) => this.changeName(e.target.value)} />
							<Input type={'text'} label={'Počet bodů'} value={score} onChange={(e) => this.changeScore(e.target.value)} />
						</form>
					</Modal.Body>
					<Modal.Footer>
            			<Button bsStyle={'primary'}
            				onClick={() => editTeam(name, Number(score)) && this.close()}
            				disabled={name.length === 0 || score.length === 0 || isNaN(Number(score))}>Upravit</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}

}



export default EditTeamModal;
