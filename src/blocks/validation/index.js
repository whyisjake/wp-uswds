/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { admin-generic as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Validation', 'wp-uswds' ),
	description: __( 'USWDS Validation component', 'wp-uswds' ),
	keywords: [
		__( 'validation', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};