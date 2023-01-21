import { Hono } from 'hono'
import leaderboard from '../db/leaderboard.json'

const app = new Hono()

app.get('/', (context) => {
	return context.json([
		{
			endpoint: '/leaderboard',
			description: 'Returns the leaderboard'
		}
	])
})

app.get('/leaderboard', (context) => context.json(leaderboard))

export default app
