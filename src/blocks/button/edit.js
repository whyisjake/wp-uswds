/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps,
	InspectorControls,
	RichText,
	BlockControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	ToolbarGroup,
	ToolbarButton,
	TextControl
} from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';
import classnames from 'classnames';

export default function Edit( { attributes, setAttributes } ) {
	const { text, url, variant, size, opensInNewTab } = attributes;

	const blockProps = useBlockProps( {
		className: classnames(
			'usa-button',
			{
				[`usa-button--${variant}`]: variant !== 'default',
				[`usa-button--${size}`]: size !== 'default' && variant !== 'big',
			}
		),
	} );

	const variantOptions = [
		{ label: __( 'Default', 'wp-uswds' ), value: 'default' },
		{ label: __( 'Secondary', 'wp-uswds' ), value: 'secondary' },
		{ label: __( 'Accent Cool', 'wp-uswds' ), value: 'accent-cool' },
		{ label: __( 'Accent Warm', 'wp-uswds' ), value: 'accent-warm' },
		{ label: __( 'Base', 'wp-uswds' ), value: 'base' },
		{ label: __( 'Outline', 'wp-uswds' ), value: 'outline' },
		{ label: __( 'Big', 'wp-uswds' ), value: 'big' },
		{ label: __( 'Unstyled', 'wp-uswds' ), value: 'unstyled' },
	];

	const sizeOptions = [
		{ label: __( 'Default', 'wp-uswds' ), value: 'default' },
		{ label: __( 'Big', 'wp-uswds' ), value: 'big' },
	];

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ url ? linkOff : link }
						title={ url ? __( 'Remove link', 'wp-uswds' ) : __( 'Add link', 'wp-uswds' ) }
						onClick={ () => {
							if ( url ) {
								setAttributes( { url: '', opensInNewTab: false } );
							}
						} }
						isActive={ !! url }
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'wp-uswds' ) }>
					<SelectControl
						label={ __( 'Button Variant', 'wp-uswds' ) }
						value={ variant }
						options={ variantOptions }
						onChange={ ( value ) => setAttributes( { variant: value } ) }
					/>
					{ variant !== 'big' && (
						<SelectControl
							label={ __( 'Button Size', 'wp-uswds' ) }
							value={ size }
							options={ sizeOptions }
							onChange={ ( value ) => setAttributes( { size: value } ) }
						/>
					) }
					<TextControl
						label={ __( 'Link URL', 'wp-uswds' ) }
						value={ url }
						onChange={ ( value ) => setAttributes( { url: value } ) }
						placeholder={ __( 'Enter URL...', 'wp-uswds' ) }
					/>
					{ url && (
						<ToggleControl
							label={ __( 'Open in new tab', 'wp-uswds' ) }
							checked={ opensInNewTab }
							onChange={ ( value ) => setAttributes( { opensInNewTab: value } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName={ url ? 'a' : 'button' }
					className={ blockProps.className }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Add button text...', 'wp-uswds' ) }
					allowedFormats={ [] }
				/>
			</div>
		</>
	);
}