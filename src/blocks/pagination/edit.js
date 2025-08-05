/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
} from '@wordpress/components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: classnames(
			'usa-pagination',
		),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Pagination Settings', 'wp-uswds' ) }>
					{/* Add controls here */}
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{/* Add block content here */}
				<p>{ __( 'Pagination block content', 'wp-uswds' ) }</p>
			</div>
		</>
	);
}