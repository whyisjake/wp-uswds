<?php
/**
 * USWDS Theme Customizer
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

namespace USWDS_Theme;

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 */
function customize_register( $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
	$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

	if ( isset( $wp_customize->selective_refresh ) ) {
		$wp_customize->selective_refresh->add_partial(
			'blogname',
			array(
				'selector'        => '.usa-logo__text a',
				'render_callback' => __NAMESPACE__ . '\customize_partial_blogname',
			)
		);
		$wp_customize->selective_refresh->add_partial(
			'blogdescription',
			array(
				'selector'        => '.site-description',
				'render_callback' => __NAMESPACE__ . '\customize_partial_blogdescription',
			)
		);
	}

	// Add USWDS Theme Options section
	$wp_customize->add_section(
		'uswds_theme_options',
		array(
			'title'    => __( 'USWDS Theme Options', 'wp-uswds-theme' ),
			'priority' => 130,
		)
	);

	// Header Logo setting
	$wp_customize->add_setting(
		'uswds_header_logo',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		new \WP_Customize_Image_Control(
			$wp_customize,
			'uswds_header_logo',
			array(
				'label'    => __( 'Header Logo', 'wp-uswds-theme' ),
				'section'  => 'uswds_theme_options',
				'settings' => 'uswds_header_logo',
			)
		)
	);

	// Footer Logo setting
	$wp_customize->add_setting(
		'uswds_footer_logo',
		array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		)
	);

	$wp_customize->add_control(
		new \WP_Customize_Image_Control(
			$wp_customize,
			'uswds_footer_logo',
			array(
				'label'    => __( 'Footer Logo', 'wp-uswds-theme' ),
				'section'  => 'uswds_theme_options',
				'settings' => 'uswds_footer_logo',
			)
		)
	);

	// Agency name setting
	$wp_customize->add_setting(
		'uswds_agency_name',
		array(
			'default'           => get_bloginfo( 'name' ),
			'sanitize_callback' => 'sanitize_text_field',
		)
	);

	$wp_customize->add_control(
		'uswds_agency_name',
		array(
			'label'   => __( 'Agency Name', 'wp-uswds-theme' ),
			'section' => 'uswds_theme_options',
			'type'    => 'text',
		)
	);

	// Show government banner setting
	$wp_customize->add_setting(
		'uswds_show_government_banner',
		array(
			'default'           => true,
			'sanitize_callback' => 'wp_validate_boolean',
		)
	);

	$wp_customize->add_control(
		'uswds_show_government_banner',
		array(
			'label'   => __( 'Show Government Banner', 'wp-uswds-theme' ),
			'section' => 'uswds_theme_options',
			'type'    => 'checkbox',
		)
	);
}
add_action( 'customize_register', __NAMESPACE__ . '\customize_register' );

/**
 * Render the site title for the selective refresh partial.
 */
function customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 */
function customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function customize_preview_js() {
	wp_enqueue_script(
		'uswds-theme-customizer',
		get_template_directory_uri() . '/assets/js/customizer.js',
		array( 'customize-preview' ),
		USWDS_THEME_VERSION,
		true
	);
}
add_action( 'customize_preview_init', __NAMESPACE__ . '\customize_preview_js' );