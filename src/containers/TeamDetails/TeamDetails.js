import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import { Alert, BreadcrumbItem, Glyphicon } from 'react-bootstrap';

// Sub-components:

import AddScoreModal from '../../components/AddScoreModal/AddScoreModal';
import EditTeamModal from '../../components/EditTeamModal/EditTeamModal';
import TeamBar from '../../components/TeamBar/TeamBar';
import TeamStats from '../../components/TeamStats/TeamStats';
import { editTeam, addScore, removeScore } from '../../reducers/teams';

/**
 * This component displays all information about a single team and allows
 * the user of the app the add new scored activities or edit the details
 * of the team.
 *
 * This component expects to receive an ID of a team from the router and searches
 * for the details of the team in the current state of the application.
 */
class TeamDetails extends Component {

	static propTypes = {
		maxScore: PropTypes.number.isRequired,
		team: PropTypes.object,
		params: PropTypes.shape({
			teamId: PropTypes.string.isRequired
		}),
		editTeam: PropTypes.func.isRequired,
		addScore: PropTypes.func.isRequired,
		removeScore: PropTypes.func.isRequired
	};

	renderError() {
		return (
			<div>
				<h2>Jejda...</h2>
				<Alert bsStyle={'warning'}>
					<Glyphicon glyph={'warning'} /> Tým '{this.props.params.teamId}' neexistuje.
				</Alert>
			</div>
		);
	}

	render() {
		const { team, maxScore, editTeam, addScore, removeScore } = this.props;

		if (!team) {
			return this.renderError();
		}

		return (
			<div>
				<h2>{team.name}</h2>
				<p>
					<Link to={'/overview'} className={'btn btn-default btn-xs'}>
						<Glyphicon glyph={'arrow-left'} /> Zpět na přehled týmů
					</Link>
				</p>
				<EditTeamModal team={team} editTeam={editTeam} />

				<hr />
				<TeamBar team={team} maxScore={maxScore} />
				<hr />
			
				<TeamStats team={team} removeScore={removeScore} />
				<AddScoreModal team={team} addScore={addScore} />
			</div>
		);
	}

}

export default connect(
	(state, props) => ({
		maxScore: state.teams.maxScore,
		team: state.teams.activeTeams.find(team => team.id === props.params.teamId)
	}),
	(dispatch, props) => ({
		editTeam: (name, points) => dispatch(editTeam(props.params.teamId, name, points)),
		addScore: (name, points) => dispatch(addScore(props.params.teamId, name, points)),
		removeScore: (activityId) => dispatch(removeScore(props.params.teamId, activityId))
	})
)(TeamDetails);
