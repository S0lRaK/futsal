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
/* export default {
	async fetch(request, env, ctx) {
		return new Response(JSON.stringify(leaderboard), {
			headers: {
				'content-type': 'application/json;charset=UTF-8'
			}
		});
	},
}; */
