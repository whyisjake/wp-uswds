/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function Save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: classnames(
			'usa-combo-box',
		),
	} );

	return (
		<div { ...blockProps }>
			{/* Add block save content here */}
		</div>
	);
}