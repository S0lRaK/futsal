import * as cheerio from 'cheerio'

export const URLS = {
	leaderboard: 'https://lnfs.es/competicion/primera/2023/clasificacion/1'
}

export const cleanText = text =>
	text
		.replace(/\s\s+/g, ' ')
		.trim()

export async function scrape(url) {
	const response = await fetch(url)
	const html = await response.text()
	return cheerio.load(html)
}