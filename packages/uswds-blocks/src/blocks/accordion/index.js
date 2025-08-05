/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { list as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Accordion', 'wp-uswds' ),
	description: __( 'USWDS Accordion component', 'wp-uswds' ),
	keywords: [
		__( 'accordion', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};