import TEAMS from '../db/teams.json' assert { type: 'json' }
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), 'db/')

export function writeDBFile (dbName, data) {
	return writeFile(
		`${DB_PATH}/${dbName}.json`,
		JSON.stringify(data, null, 2),
		'utf-8'
	)
}

export function getTeamLogo ({ name }) {
	const { image } = TEAMS.find((team) => team.name === name)
	return image
}