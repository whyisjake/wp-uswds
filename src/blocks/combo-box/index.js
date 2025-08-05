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
	title: __( 'USWDS Combo Box', 'wp-uswds' ),
	description: __( 'USWDS Combo Box component', 'wp-uswds' ),
	keywords: [
		__( 'combo-box', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};