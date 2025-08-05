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
	title: __( 'USWDS Time Picker', 'wp-uswds' ),
	description: __( 'USWDS Time Picker component', 'wp-uswds' ),
	keywords: [
		__( 'time-picker', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};