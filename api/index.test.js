import { unstable_dev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

describe('Testing / route', () => {
	let worker

	beforeAll(async () => {
		worker = await unstable_dev('api/index.js', {
			experimental: { disableExperimentalWarning: true }
		})
	})

	afterAll(async () => {
		await worker.stop()
	})

	it('Routes should have an endpoint and a description', async () => {
		const response = await worker.fetch()
		if (response) {
			const apiRoutes = await response.json()
			apiRoutes.forEach(route => {
				expect(route).toHaveProperty('endpoint')
				expect(route).toHaveProperty('description')
			})
		}
	})

	it('Routes should should return 404 for unknown routes', async () => {
		const response = await worker.fetch('/unknown')
		expect(response.status).toBe(404)
	})
})

describe('Testing /teams route', () => {
	let worker

	beforeAll(async () => {
		worker = await unstable_dev('api/index.js', {
			experimental: { disableExperimentalWarning: true }
		})
	})

	afterAll(async () => {
		await worker.stop()
	})

	it('Teams endpoint should have all teams', async() => {
		const response = await worker.fetch('/teams')
		if (response) {
			const teams = await response.json()
			const numberOfTeams = Object.entries(teams).length
			expect(numberOfTeams).toBe(16)
		}
	})

	it('Teams should have all props', async() => {
		const response = await worker.fetch('/teams')
		if (response) {
			const teams = await response.json()

			teams.forEach((team) => {
				expect(team).toHaveProperty('id')
				expect(team).toHaveProperty('name')
				expect(team).toHaveProperty('web')
				expect(team).toHaveProperty('est')
				expect(team).toHaveProperty('president')
				expect(team).toHaveProperty('stadium')
				expect(team).toHaveProperty('coach')
				expect(team).toHaveProperty('players')
				expect(team).toHaveProperty('social')
			})
		}
	})

	it('Non existing team should return "not found" message', async() => {
		const response = await worker.fetch('/teams/noexist')
		if (response) {
			const errorMessage = await response.json()
			expect(errorMessage).toEqual({
				message: 'Team not found'
			})
		}
	})
})
