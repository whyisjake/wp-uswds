/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { media-default as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Card', 'wp-uswds' ),
	description: __( 'USWDS Card component', 'wp-uswds' ),
	keywords: [
		__( 'card', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};