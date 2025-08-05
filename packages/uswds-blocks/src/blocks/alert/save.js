/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function Save( { attributes } ) {
	const { type, heading, content, slim, noIcon } = attributes;

	const blockProps = useBlockProps.save( {
		className: classnames(
			'usa-alert',
			`usa-alert--${type}`,
			{
				'usa-alert--slim': slim,
				'usa-alert--no-icon': noIcon,
			}
		),
	} );

	return (
		<div { ...blockProps }>
			<div className="usa-alert__body">
				{ ! slim && heading && (
					<RichText.Content
						tagName="h4"
						className="usa-alert__heading"
						value={ heading }
					/>
				) }
				{ content && (
					<RichText.Content
						tagName={ slim ? 'div' : 'p' }
						className="usa-alert__text"
						value={ content }
					/>
				) }
			</div>
		</div>
	);
}