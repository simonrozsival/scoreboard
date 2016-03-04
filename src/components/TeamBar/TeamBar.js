import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './TeamBar.less';

/**
 * This presentational component shows a bar which represents the points
 * gained by the team. The size of the bar reflects the ratio of the team's
 * points and the maximum points among all the teams.
 */
class TeamBar extends Component {

	static propTypes = {
		team: PropTypes.object.isRequired,
		maxScore: PropTypes.number.isRequired
	};

	render() {
		const { team, maxScore } = this.props;
		const percent = maxScore > 0 ? (team.points / maxScore) * 100 : 0;

		const inlineStyles = {
			background: team.points > 0 ? team.color : 'transparent',
			width: team.points === 0 ? '100%' : `${percent}%`
		};

		return (
			<div className={team.points > 0 ? styles.bar : styles.zeroPoints} style={inlineStyles}>
				{team.points}&nbsp;b
			</div>
		);
	}

}

export default TeamBar;
