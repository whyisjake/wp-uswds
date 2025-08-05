/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { admin-page as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Modal', 'wp-uswds' ),
	description: __( 'USWDS Modal component', 'wp-uswds' ),
	keywords: [
		__( 'modal', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};