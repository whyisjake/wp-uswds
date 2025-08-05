/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { arrow-right as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Breadcrumb', 'wp-uswds' ),
	description: __( 'USWDS Breadcrumb component', 'wp-uswds' ),
	keywords: [
		__( 'breadcrumb', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};