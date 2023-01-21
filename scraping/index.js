import * as cheerio from 'cheerio'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

import TEAMS from '../db/teams.json' assert { type: 'json'}

const DB_PATH = path.join(process.cwd(), 'db/')

const URLS = {
  leaderboard: 'https://lnfs.es/competicion/primera/2023/clasificacion/1'
}

async function scrape(url) {
  const response = await fetch(url)
  const html = await response.text()
  return cheerio.load(html)
}

async function getLeaderboard() {
  const $ = await scrape(URLS.leaderboard)
  const $rows = $('table tbody tr')

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

  const getTeam = ({ name }) => TEAMS.find(team => team.name === name)

  const cleanText = text => text
    .replace(/\s\s+/g, ' ')
    .trim()

  const leaderboardSelectorsEntries = Object.entries(LEADERBOARD_SELECTORS)

  const leaderboard = []

  $rows.each((index, element) => {
    const leaderboardEntries = leaderboardSelectorsEntries.map(([key, { selector, typeOf }]) => {
      const rawValue = $(element).find(selector).text()
      const valueCleaned = cleanText(rawValue)

      const value = typeOf === 'number'
        ? Number(valueCleaned)
        : valueCleaned

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

const leaderboard = await getLeaderboard()

await writeFile(`${DB_PATH}/leaderboard.json`, JSON.stringify(leaderboard, null, 2), 'utf-8')