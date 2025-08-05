/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { tag as icon } from '@wordpress/icons';

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
	title: __( 'USWDS Tag', 'wp-uswds' ),
	description: __( 'USWDS Tag component', 'wp-uswds' ),
	keywords: [
		__( 'tag', 'wp-uswds' ),
		__( 'uswds', 'wp-uswds' ),
	],
	edit,
	save,
};