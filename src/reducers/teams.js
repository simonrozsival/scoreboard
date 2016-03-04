/**
 * This file contains the definition of a 'teams' reducer, action type constants,
 * and the action creators functions.
 *
 * @author  Šimon Rozsíval
 */


import shortid from 'shortid'; // see https://github.com/dylang/shortid

// this reducer must be state-aware - once an old state is loaded, the colors used
// by the loaded teams must be removed from the list of available colors, so no team
// is assigned one of these colors in the future

import { LOAD } from 'redux-storage';


// Action types

export const ADD_TEAM = 'add_team';
export const REMOVE_TEAM = 'remove_team';
export const EDIT_TEAM = 'edit_team';
export const ADD_SCORE = 'add_score';
export const REMOVE_SCORE = 'remove_score';


/**
 * The initial state of the reduer - empty set of teams and zero score.
 * @type {Object}
 */
const initialState = {
	maxScore: 0,
	activeTeams: [],
	archivedTeams: []
};

/**
 * Internal list of available colors
 * @todo Load from a config file at runtime
 * @type {Array}
 */
let availableColors = [
	'#7f8c8d',
	'#1abc9c',
	'#2ecc71',
	'#3498db',
	'#9b59b6',
	'#34495e',
	'#e74c3c',
	'#e67e22',
	'#f1c40f'
];

/**
 * The reducer which implements the logic of manipulating teams and their score.
 * @param  {Object} state  Old state
 * @param  {Object} action The handled action
 * @return {Object}        New state
 */
const teams = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			if (action.payload.teams) {
				availableColors = availableColors.filter(color => !action.payload.teams.activeTeams.find(team => team.color === color));
			}

			return state;

		case ADD_TEAM:
			return {
				activeTeams: [ ...state.activeTeams, {
					id: action.id,
					name: action.name,
					color: availableColors.length > 0 ? availableColors.pop() : 'green', // dummy default value...
					points: 0,
					history: []
				}].sort((a, b) => b.points - a.points),
				archivedTeams: state.archivedTeams,
				maxScore: state.maxScore
			};

		case REMOVE_TEAM:
			const activeTeams = state.activeTeams.filter(team => team.id !== action.teamId).sort((a, b) => b.points - a.points);
			return {
				activeTeams,
				archivedTeams: [...state.archivedTeams, state.activeTeams.find(team => team.id === action.teamId)],
				maxScore: getMaxScore(activeTeams)
			};

		case EDIT_TEAM:
			const team = state.activeTeams.find(team => team.id === action.teamId);
			if (!team) {
				return state;
			}

			const editedTeam = Object.assign({}, team, {
				name: action.name,
				points: action.points
			});

			const updatedListOfTeams = [...state.activeTeams.filter(t => t.id !== editedTeam.id), editedTeam].sort((a, b) => b.points - a.points);
			return {
				activeTeams: updatedListOfTeams,
				archivedTeams: [...state.archivedTeams, state.activeTeams.find(team => team.id === action.teamId)],
				maxScore: getMaxScore(updatedListOfTeams)
			};

		case ADD_SCORE:
			const currentTeam = state.activeTeams.find(team => team.id === action.teamId);
			if (!currentTeam) {
				return state;
			}

			const updatedTeam = Object.assign({}, currentTeam, {
				points: currentTeam.points + action.points,
				history: [...currentTeam.history, {
					id: action.id,
					time: (new Date()).toLocaleTimeString(),
					name: action.name,
					points: action.points
				}]
			});

			const allTeams = [...state.activeTeams.filter(team => team.id !== updatedTeam.id), updatedTeam].sort((a, b) => b.points - a.points);
			return {
				activeTeams: allTeams,
				archivedTeams: state.archivedTeams,
				maxScore: getMaxScore(allTeams)
			}

		case REMOVE_SCORE:
			const teamWithOldScore = state.activeTeams.find(team => team.id === action.teamId);
			if (!teamWithOldScore) {
				return state;
			}

			const oldActivity = teamWithOldScore.history.find(activity => activity.id === action.activityId);
			if (!oldActivity) {
				return state;
			}

			const teamWithRemovedScore = Object.assign({}, teamWithOldScore, {
				points: teamWithOldScore.points - oldActivity.points,
				history: teamWithOldScore.history.filter(activity => activity.id !== oldActivity.id)
			});

			const teams = [...state.activeTeams.filter(team => team.id !== teamWithRemovedScore.id), teamWithRemovedScore].sort((a, b) => b.points - a.points);
			return {
				activeTeams: teams,
				archivedTeams: state.archivedTeams,
				maxScore: getMaxScore(teams)
			};

		default:
			return state;
	}
}

// the reducer is the default export
export default teams;

/**
 * Find the largest score among the set of teams.
 * @param  {Array} teams The set of teams
 * @return {Number}      The largest score
 */
function getMaxScore(teams) {
	return teams.reduce((acc, team) => Math.max(acc, team.points), 0);
}


/**
 * Action creator for adding a new team.
 * Each team will be assigned a random unique ID by the action creator (reducer must remain a pure function).
 * @param  {String} name Team name
 * @return {Object}      Add-team-specific action
 */
export const addTeam = (name) => ({
	type: ADD_TEAM,
	id: shortid.generate(),
	name
});

/**
 * Action creator for removing a team
 * @param  {String} teamId The ID of the removed team
 * @return {Object}        Remove-team-specific action
 */
export const removeTeam = (teamId) => ({
	type: REMOVE_TEAM,
	teamId
});

/**
 * Change team parameters action creator.
 * @param  {String} teamId [description]
 * @param  {String} name   New name of the team
 * @param  {Number} points New score of the team
 * @return {Object}        The action
 */
export const editTeam = (teamId, name, points) => ({
	type: EDIT_TEAM,
	teamId,
	name,
	points
});

/**
 * Add score for a specific team.
 * Each scored activity will receive a unique ID by the action creator (the reducer must remain a pure function).
 * The ID needs to be unique only within a single team.
 * @param  {String} teamId ID of the lucky team
 * @param  {String} name   The name of the scored activity
 * @param  {Number} points The amout of points to be added
 * @return {Object}        The action
 */
export const addScore = (teamId, name, points) => ({
	type: ADD_SCORE,
	teamId,
	id: shortid.generate(),
	name,
	points
});

/**
 * Remove a specific score of a specific team.
 * @param  {String} teamId     The ID of the team
 * @param  {String} activityId The ID of the scored activity
 * @return {Object}            The action
 */
export const removeScore = (teamId, activityId) => ({
	type: REMOVE_SCORE,
	teamId,
	activityId
});
