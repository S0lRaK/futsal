import * as cheerio from 'cheerio'

import { getLeaderboard } from './leaderboard.js'
import { logError, logInfo, logSuccess } from './log.js'
import { writeDBFile } from '../db/index.js'

export const SCRAPINGS = {
	leaderboard: {
		url: 'https://lnfs.es/competicion/primera/2023/clasificacion/1',
		scraper: getLeaderboard
	}
}

export const cleanText = (text) => text.replace(/\s\s+/g, ' ').trim()

export async function scrape(url) {
	const response = await fetch(url)
	const html = await response.text()
	return cheerio.load(html)
}

export async function scrapeAndSave(name) {
	const start = performance.now()

	try {
		const { scraper, url } = SCRAPINGS[name]

		logInfo(`Scraping [${name}]...`)
		const $ = await scrape(url)
		const content = await scraper($)
		logSuccess(`[${name}] scraped successfully`)

		logInfo(`Writing [${name}] to database...`)
		await writeDBFile(name, content)
		logSuccess(`[${name}] written to database successfully`)
	} catch (error) {
		logError(`Error scraping [${name}]`)
		logError(error)
	} finally {
		const end = performance.now()
		const time = Number((end - start) / 1000).toFixed(2)
		logInfo(`[${name}] scraped in ${time} seconds`)
	}
}
