import { getTeamLogo } from '../db/index.js'
import { cleanText } from './utils.js'

const SCORERS_SELECTORS = {
	ranking: { selector: '> :nth-child(1)', typeOf: 'number' },
	player: { selector: '> :nth-child(3) a p', typeOf: 'string' },
	position: { selector: '> :nth-child(5)', typeOf: 'string' },
	goals: { selector: '> :nth-child(6)', typeOf: 'number' },
	gamesPlayed: { selector: '> :nth-child(7)', typeOf: 'number' },
	team: { selector: '> :nth-child(9)', typeOf: 'string' }
}

export async function getScorers ($) {
	const $rows = $('table tbody tr')

	const scorersSelectorsEntries = Object.entries(SCORERS_SELECTORS)
	const scorers = []

	$rows.each((index, element) => {
		const scorersEntries = scorersSelectorsEntries.map(([key, { selector, typeOf }]) => {
			const rawValue = $(element).find(selector).text()
			const valueCleaned = cleanText(rawValue)
			const value = typeOf === 'number' ? Number(valueCleaned) : valueCleaned
			return [key, value]
		})

		const { team: teamName, ...scorersData } = Object.fromEntries(scorersEntries)
		const teamLogo = getTeamLogo({ name: teamName })

		scorers.push({
			...scorersData,
			ranking: index + 1,
			team: teamName,
			teamLogo
		})
	})
	return scorers
}