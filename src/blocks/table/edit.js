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
			'usa-table',
		),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Table Settings', 'wp-uswds' ) }>
					{/* Add controls here */}
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{/* Add block content here */}
				<p>{ __( 'Table block content', 'wp-uswds' ) }</p>
			</div>
		</>
	);
}