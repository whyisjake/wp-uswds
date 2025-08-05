/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { editor-table as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Table', 'wp-uswds' ),
	description: __( 'USWDS Table component', 'wp-uswds' ),
	keywords: [
		__( 'table', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};