/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { warning as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Alert', 'wp-uswds' ),
	description: __( 'Keep users informed of important and sometimes time-sensitive changes.', 'wp-uswds' ),
	keywords: [
		__( 'alert', 'wp-uswds' ),
		__( 'notification', 'wp-uswds' ),
		__( 'message', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};