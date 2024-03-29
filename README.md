# Futsal

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![Deploy API](https://github.com/S0lRaK/futsal/actions/workflows/deploy-api.yml/badge.svg)](https://github.com/S0lRaK/futsal/actions/workflows/deploy-api.yml)
[![Scrape LNFS website](https://github.com/S0lRaK/futsal/actions/workflows/scrape-lnfs-web.yml/badge.svg)](https://github.com/S0lRaK/futsal/actions/workflows/scrape-lnfs-web.yml)

Project to create an API from the Spanish Futsal league and its website.

## API

[api.futsal.dev](https://api.futsal.dev)

Endpoints:

- GET `/leaderboard`: returns the table from the First Division
- GET `/teams`: returns all the teams from the First Division
- GET `/teams/:id`: returns a team from the First Division
- GET `/scorers`: returns the top 20 scorers from the First Division 

## Tech Stack

- [Cheerio](https://cheerio.js.org)
- [Cloudflare Workers](https://workers.cloudflare.com)
- [Hono](https://honojs.dev)
- [Astro](https://astro.build)
- [Vitest](https://vitest.dev)

Based on [Kings League Project by _midudev_](https://github.com/midudev/kings-league-project) streamed on [Twitch](https://www.twitch.tv/midudev)
