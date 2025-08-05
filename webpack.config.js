/**
 * External dependencies
 */
const path = require('path');

/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			'@uswds': path.resolve(__dirname, '../../node_modules/@uswds/uswds'),
		},
	},
};