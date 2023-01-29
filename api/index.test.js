import { unstable_dev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

describe('Worker', () => {
	let worker

	beforeAll(async () => {
		worker = await unstable_dev('api/index.js', {
			experimental: { disableExperimentalWarning: true },
		})
	})

	afterAll(async () => {
		await worker.stop()
	})

	it('routes should have an endpoint and a description', async () => {
		const response = await worker.fetch()
		if (response) {
			const apiRoutes = await response.json()
			apiRoutes.forEach(route => {
				expect(route).toHaveProperty('endpoint')
				expect(route).toHaveProperty('description')
			})
		}
	})
})
