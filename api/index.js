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
	}
]))

app.get('/leaderboard', (context) => context.json(leaderboard))

app.get('/teams', (context) => context.json(teams))

app.get('/static/*', serveStatic({ root: './' }))

export default app
