import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { Table, Button, Glyphicon } from 'react-bootstrap';

import AddTeamModal from '../../components/AddTeamModal/AddTeamModal';
import TeamBar from '../../components/TeamBar/TeamBar';
import { addTeam, removeTeam } from '../../reducers/teams';

/**
 * The list of all teams in the current state. This component also allows the user to add
 * new teams, view details of a team, and to remove old teams.
 */
class Overview extends Component {

	static propTypes = {
		maxScore: PropTypes.number.isRequired,
		teams: PropTypes.array.isRequired,
		addTeam: PropTypes.func.isRequired,
		removeTeam: PropTypes.func.isRequired
	};

	render() {
		const { maxScore, teams, addTeam, removeTeam } = this.props;
		return (
			<div>
				<Table hover>
					<thead>
						<tr>
							<th>Pořadí</th>
							<th>Název týmu</th>
							<th>Body</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
					{teams.map((team, i) => (
						<tr key={i}>
							<td>{i + 1}.</td>
							<td>
								<Link to={'/team/' + team.id}>
									{team.name}
								</Link>
							</td>
							<td style={{ width: '80%' }}> {/* The 'chart' must be the major part of the table */}
								<TeamBar key={team.id} team={team} maxScore={maxScore} />
							</td>
							<td>
								<Button onClick={() => removeTeam(team.id)} bsSize={'xsmall'} bsStyle={'danger'}>
									<Glyphicon glyph={'trash'} />
								</Button>
							</td>
						</tr>
					))}
					</tbody>
				</Table>

				<AddTeamModal addTeam={addTeam} />
			</div>
		);
	}

}

export default connect(
	state => ({
		maxScore: state.teams.maxScore,
		teams: state.teams.activeTeams
	}),
	dispatch => ({
		addTeam: (name) => dispatch(addTeam(name)),
		removeTeam: (id) => dispatch(removeTeam(id))
	})
)(Overview);
