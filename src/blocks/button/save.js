/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function Save( { attributes } ) {
	const { text, url, variant, size, opensInNewTab } = attributes;

	const blockProps = useBlockProps.save( {
		className: classnames(
			'usa-button',
			{
				[`usa-button--${variant}`]: variant !== 'default',
				[`usa-button--${size}`]: size !== 'default' && variant !== 'big',
			}
		),
	} );

	if ( url ) {
		return (
			<a
				{ ...blockProps }
				href={ url }
				target={ opensInNewTab ? '_blank' : undefined }
				rel={ opensInNewTab ? 'noopener noreferrer' : undefined }
			>
				<RichText.Content value={ text } />
			</a>
		);
	}

	return (
		<button { ...blockProps } type="button">
			<RichText.Content value={ text } />
		</button>
	);
}