/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl
} from '@wordpress/components';
import classnames from 'classnames';

export default function Edit( { attributes, setAttributes } ) {
	const { type, heading, content, slim, noIcon } = attributes;

	const blockProps = useBlockProps( {
		className: classnames(
			'usa-alert',
			`usa-alert--${type}`,
			{
				'usa-alert--slim': slim,
				'usa-alert--no-icon': noIcon,
			}
		),
	} );

	const alertTypes = [
		{ label: __( 'Info', 'wp-uswds' ), value: 'info' },
		{ label: __( 'Warning', 'wp-uswds' ), value: 'warning' },
		{ label: __( 'Error', 'wp-uswds' ), value: 'error' },
		{ label: __( 'Success', 'wp-uswds' ), value: 'success' },
		{ label: __( 'Emergency', 'wp-uswds' ), value: 'emergency' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Alert Settings', 'wp-uswds' ) }>
					<SelectControl
						label={ __( 'Alert Type', 'wp-uswds' ) }
						value={ type }
						options={ alertTypes }
						onChange={ ( value ) => setAttributes( { type: value } ) }
					/>
					<ToggleControl
						label={ __( 'Slim variant', 'wp-uswds' ) }
						checked={ slim }
						onChange={ ( value ) => setAttributes( { slim: value } ) }
					/>
					<ToggleControl
						label={ __( 'Hide icon', 'wp-uswds' ) }
						checked={ noIcon }
						onChange={ ( value ) => setAttributes( { noIcon: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="usa-alert__body">
					{ ! slim && (
						<RichText
							tagName="h4"
							className="usa-alert__heading"
							value={ heading }
							onChange={ ( value ) => setAttributes( { heading: value } ) }
							placeholder={ __( 'Alert heading...', 'wp-uswds' ) }
							allowedFormats={ [] }
						/>
					) }
					<RichText
						tagName={ slim ? 'div' : 'p' }
						className="usa-alert__text"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						placeholder={ __( 'Alert content...', 'wp-uswds' ) }
						allowedFormats={ [ 'core/link', 'core/bold', 'core/italic' ] }
					/>
				</div>
			</div>
		</>
	);
}