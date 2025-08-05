/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { flag as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

export const name = metadata.name;

export const settings = {
	...metadata,
	icon,
	title: __( 'USWDS Banner', 'wp-uswds' ),
	description: __( 'USWDS Banner component', 'wp-uswds' ),
	keywords: [
		__( 'banner', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};