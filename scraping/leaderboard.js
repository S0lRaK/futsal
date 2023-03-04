import { cleanText } from './utils.js'
import TEAMS from '../db/teams.json' assert { type: 'json' }

const LEADERBOARD_SELECTORS = {
	team: { selector: '> :nth-child(3)', typeOf: 'string' },
	points: { selector: '> :nth-child(4)', typeOf: 'number' },
	gamesPlayed: { selector: '> :nth-child(5)', typeOf: 'number' },
	gamesWon: { selector: '> :nth-child(6)', typeOf: 'number' },
	gamesDrawn: { selector: '> :nth-child(7)', typeOf: 'number' },
	gamesLost: { selector: '> :nth-child(8)', typeOf: 'number' },
	goalsFor: { selector: '> :nth-child(9)', typeOf: 'number' },
	goalsAgainst: { selector: '> :nth-child(10)', typeOf: 'number' },
	goalsDifference: { selector: '> :nth-child(11)', typeOf: 'number' }
}

export async function getLeaderboard($) {
	const $rows = $('table tbody tr')

	const getTeam = ({ name }) => TEAMS.find((team) => team.name === name)

	const leaderboardSelectorsEntries = Object.entries(LEADERBOARD_SELECTORS)

	const leaderboard = []

	$rows.each((index, element) => {
		const leaderboardEntries = leaderboardSelectorsEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $(element).find(selector).text()
			const valueCleaned = cleanText(rawValue)

			const value = typeOf === 'number' ? Number(valueCleaned) : valueCleaned

			return [key, value]
		})

		const { team: teamName, ...teamForLeaderboard } = Object.fromEntries(leaderboardEntries)
		const team = getTeam({ name: teamName })

		leaderboard.push({
			...teamForLeaderboard,
			team
		})
	})
	return leaderboard
}
