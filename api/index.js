import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'

import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'

const app = new Hono()

app.get('/', (context) => context.json([
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
	}
]))

app.get('/leaderboard\\/?', (context) => context.json(leaderboard))

app.get('/teams\\/?', (context) => context.json(teams))

app.get('/teams/:id', (context) => {
	const teamId = context.req.param('id')
	const teamFoundById = teams.find((team) => team.id === teamId)

	return teamFoundById
		? context.json(teamFoundById)
		: context.json({ message: 'Team not found' }, 404)
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
