import React, { Component, PropTypes } from 'react';
import { Table, Button, Row, Col, Glyphicon } from 'react-bootstrap';

/**
 * This presentational component shows a table of all scored activities of a team.
 */
class TeamStats extends Component {

	static propTypes = {
		team: PropTypes.object.isRequired,
		removeScore: PropTypes.func.isRequired
	};

	render() {
		const { team, removeScore } = this.props;

		if (team.history.length === 0) {
			return null;
		}

		return (
			<Table striped hover condensed>
				<thead>
					<tr>
						<th>Čas zaznamenání</th>
						<th>Název</th>
						<th>Body</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
				{team.history.map((activity, i) => (
					<tr key={i}>
						<td>
							{activity.time}
						</td>
						<td>
							{activity.name}
						</td>
						<td>
							{activity.points}
						</td>
						<td>
							<Button bsStyle={'danger'} onClick={() => removeScore(activity.id)} bsSize={'xsmall'}>
								<Glyphicon glyph={'trash'} />
							</Button>
						</td>
					</tr>
				))}
				</tbody>
			</Table>
		);
	}

}

export default TeamStats;
