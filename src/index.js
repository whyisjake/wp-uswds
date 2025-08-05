/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';

// Import USWDS blocks that we've created
import * as alert from './blocks/alert';
import * as button from './blocks/button';

// Register all blocks
const blocks = [
	alert,
	button,
];

blocks.forEach( ( block ) => {
	if ( ! block ) {
		return;
	}

	const { name, settings } = block;
	registerBlockType( name, settings );
} );