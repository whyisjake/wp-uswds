<?php
/**
 * USWDS WordPress Theme functions and definitions
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

namespace USWDS_Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'USWDS_THEME_VERSION', '1.0.0' );
define( 'USWDS_THEME_PATH', get_template_directory() );
define( 'USWDS_THEME_URL', get_template_directory_uri() );

/**
 * Theme setup
 */
function setup() {
	// Add theme support for various WordPress features
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );
	
	// Add theme support for Gutenberg features
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'custom-spacing' );
	add_theme_support( 'custom-units' );
	add_theme_support( 'custom-line-height' );
	add_theme_support( 'experimental-link-color' );
	add_theme_support( 'appearance-tools' );

	// Register navigation menus
	register_nav_menus( array(
		'primary' => __( 'Primary Navigation', 'wp-uswds-theme' ),
		'footer'  => __( 'Footer Navigation', 'wp-uswds-theme' ),
	) );

	// Add editor stylesheet
	add_editor_style( 'assets/css/editor-styles.css' );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\setup' );

/**
 * Enqueue styles and scripts
 */
function enqueue_assets() {
	// Enqueue USWDS CSS directly from node_modules
	wp_enqueue_style(
		'uswds-styles',
		USWDS_THEME_URL . '/assets/css/uswds.min.css',
		array(),
		USWDS_THEME_VERSION
	);

	// Enqueue theme styles  
	wp_enqueue_style(
		'uswds-theme-styles',
		get_stylesheet_uri(),
		array( 'uswds-styles' ),
		USWDS_THEME_VERSION
	);

	// Enqueue USWDS JavaScript
	wp_enqueue_script(
		'uswds-js',
		USWDS_THEME_URL . '/assets/js/uswds.min.js',
		array(),
		USWDS_THEME_VERSION,
		true
	);

	// Enqueue theme JavaScript (if built)
	$theme_js = USWDS_THEME_PATH . '/build/theme.js';
	if ( file_exists( $theme_js ) ) {
		wp_enqueue_script(
			'uswds-theme-js',
			USWDS_THEME_URL . '/build/theme.js',
			array( 'uswds-js' ),
			USWDS_THEME_VERSION,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_assets' );

/**
 * Register widget areas
 */
function register_sidebars() {
	register_sidebar( array(
		'name'          => __( 'Main Sidebar', 'wp-uswds-theme' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Widgets in this area will be shown in the main sidebar.', 'wp-uswds-theme' ),
		'before_widget' => '<div class="usa-sidenav__item">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="usa-sidenav__heading">',
		'after_title'   => '</h3>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer Widget Area', 'wp-uswds-theme' ),
		'id'            => 'footer-widgets',
		'description'   => __( 'Widgets in this area will be shown in the footer.', 'wp-uswds-theme' ),
		'before_widget' => '<div class="usa-footer__primary-content">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4>',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', __NAMESPACE__ . '\register_sidebars' );

/**
 * Add USWDS body classes
 */
function add_uswds_body_classes( $classes ) {
	$classes[] = 'usa-site';
	return $classes;
}
add_filter( 'body_class', __NAMESPACE__ . '\add_uswds_body_classes' );

/**
 * Customize Gutenberg block editor
 */
function customize_block_editor() {
	// Add USWDS color palette
	add_theme_support( 'editor-color-palette', array(
		array(
			'name'  => __( 'USWDS Blue', 'wp-uswds-theme' ),
			'slug'  => 'uswds-blue',
			'color' => '#005ea2',
		),
		array(
			'name'  => __( 'USWDS Red', 'wp-uswds-theme' ),
			'slug'  => 'uswds-red',
			'color' => '#d63384',
		),
		array(
			'name'  => __( 'USWDS Green', 'wp-uswds-theme' ),
			'slug'  => 'uswds-green',
			'color' => '#00a91c',
		),
		array(
			'name'  => __( 'USWDS Yellow', 'wp-uswds-theme' ),
			'slug'  => 'uswds-yellow',
			'color' => '#ffbe2e',
		),
		array(
			'name'  => __( 'USWDS Gray Dark', 'wp-uswds-theme' ),
			'slug'  => 'uswds-gray-dark',
			'color' => '#565c65',
		),
		array(
			'name'  => __( 'USWDS Gray Light', 'wp-uswds-theme' ),
			'slug'  => 'uswds-gray-light',
			'color' => '#f0f0f0',
		),
	) );

	// Add USWDS font sizes
	add_theme_support( 'editor-font-sizes', array(
		array(
			'name' => __( 'Small', 'wp-uswds-theme' ),
			'size' => 14,
			'slug' => 'small'
		),
		array(
			'name' => __( 'Normal', 'wp-uswds-theme' ),
			'size' => 16,
			'slug' => 'normal'
		),
		array(
			'name' => __( 'Large', 'wp-uswds-theme' ),
			'size' => 20,
			'slug' => 'large'
		),
		array(
			'name' => __( 'Extra Large', 'wp-uswds-theme' ),
			'size' => 28,
			'slug' => 'extra-large'
		),
	) );
}
add_action( 'after_setup_theme', __NAMESPACE__ . '\customize_block_editor' );

/**
 * Load theme includes
 */
require_once USWDS_THEME_PATH . '/inc/customizer.php';
require_once USWDS_THEME_PATH . '/inc/template-functions.php';
require_once USWDS_THEME_PATH . '/inc/block-patterns.php';