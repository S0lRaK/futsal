# Futsal

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Project to create an API from the Spanish Futsal league and its website.

## API

Endpoints:

- GET `/leaderboard`: returns the table from the First Division
- GET `/teams`: returns the all the teams from the First Division

## Tech Stack

- [Cheerio](https://cheerio.js.org)
- [Cloudflare Workers](https://workers.cloudflare.com)
- [Hono](https://honojs.dev)
- [Astro](https://astro.build)
- [Vitest](https://vitest.dev)

Based on [Kings League Project by _midudev_](https://github.com/midudev/kings-league-project) streamed on [Twitch](https://www.twitch.tv/midudev)
