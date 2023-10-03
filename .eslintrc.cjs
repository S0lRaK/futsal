module.exports = {
	extends: [
		"standard",
		"plugin:astro/recommended"
	],
	rules: {
		"indent": "off",
		"no-tabs": "off",
		"space-before-function-paren": "off"
	},
	overrides: [
		{
			files: [
				"*.astro"
			],
			parser: "astro-eslint-parser",
			parserOptions: {
				extraFileExtension: ['.astro']
			},
			rules: {
				"astro/no-set-html-directive": "error"
			}
		}
	]
}