import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'

import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import scorers from '../db/scorers.json'

const app = new Hono()

app.get('/', (context) =>
	context.json([
		{
			endpoint: '/leaderboard',
			description: 'Returns the leaderboard'
		},
		{
			endpoint: '/teams',
			description: 'Returns the teams'
		},
		{
			endpoint: '/teams/id',
			description: 'Returns the team'
		},
		{
			endpoint: '/scorers',
			description: 'Returns the top 20 scorers'
		}
	])
)

app.get('/leaderboard', (context) => context.json(leaderboard))

app.get('/teams', (context) => context.json(teams))

app.get('/teams/:id', (context) => {
	const teamId = context.req.param('id')
	const teamFoundById = teams.find((team) => team.id === teamId)

	return teamFoundById
		? context.json(teamFoundById)
		: context.json({ message: 'Team not found' }, 404)
})

app.get('/scorers', (context) => context.json(scorers))

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((context) => {
	const { pathname } = new URL(context.req.url)

	if (context.req.url.at(-1) === '/') {
		return context.redirect(pathname.slice(0, -1))
	}

	return context.json({ message: 'Not Found' }, 404)
})

export default app
