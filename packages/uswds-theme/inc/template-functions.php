<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

namespace USWDS_Theme;

/**
 * Custom navigation walker for USWDS
 */
class Nav_Walker extends \Walker_Nav_Menu {

	/**
	 * Starts the list before the elements are added.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul class=\"usa-nav__submenu\">\n";
	}

	/**
	 * Ends the list after the elements are added.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "$indent</ul>\n";
	}

	/**
	 * Starts the element output.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

		if ( $depth === 0 ) {
			$class_names = $class_names ? ' class="usa-nav__primary-item"' : ' class="usa-nav__primary-item"';
		} else {
			$class_names = $class_names ? ' class="usa-nav__submenu-item"' : ' class="usa-nav__submenu-item"';
		}

		$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args );
		$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= $indent . '<li' . $id . $class_names . '>';

		$attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) . '"' : '';
		$attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) . '"' : '';
		$attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) . '"' : '';
		$attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) . '"' : '';

		if ( $depth === 0 ) {
			$link_class = 'usa-nav__link';
		} else {
			$link_class = 'usa-nav__submenu-link';
		}

		$item_output = isset( $args->before ) ? $args->before ?? '' : '';
		$item_output .= '<a class="' . $link_class . '"' . $attributes . '>';
		$item_output .= ( isset( $args->link_before ) ? $args->link_before ?? '' : '' ) . apply_filters( 'the_title', $item->title, $item->ID ) . ( isset( $args->link_after ) ? $args->link_after ?? '' : '' );
		$item_output .= '</a>';
		$item_output .= isset( $args->after ) ? $args->after ?? '' : '';

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

	/**
	 * Ends the element output.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= "</li>\n";
	}
}

/**
 * Add custom classes to post navigation
 */
function posts_navigation_classes( $template, $class ) {
	if ( $class === 'posts-navigation' ) {
		return str_replace(
			'class="nav-links"',
			'class="usa-pagination__list"',
			$template
		);
	}
	return $template;
}
add_filter( 'navigation_markup_template', __NAMESPACE__ . '\posts_navigation_classes', 10, 2 );

/**
 * Add USWDS classes to comment form
 */
function comment_form_field_comment( $field ) {
	$field = str_replace(
		'<textarea',
		'<textarea class="usa-textarea"',
		$field
	);
	return $field;
}
add_filter( 'comment_form_field_comment', __NAMESPACE__ . '\comment_form_field_comment' );

/**
 * Add USWDS classes to search form
 */
function get_search_form( $form ) {
	$form = '<form role="search" method="get" class="usa-search usa-search--small" action="' . home_url( '/' ) . '" >
		<label class="usa-sr-only" for="search-field">' . __( 'Search', 'wp-uswds-theme' ) . '</label>
		<input class="usa-input" id="search-field" type="search" name="s" placeholder="' . esc_attr__( 'Search', 'wp-uswds-theme' ) . '" value="' . get_search_query() . '" />
		<button class="usa-button" type="submit">
			<img src="' . get_template_directory_uri() . '/assets/images/usa-icons-bg/search--white.svg" class="usa-search__submit-icon" alt="Search">
		</button>
	</form>';

	return $form;
}
add_filter( 'get_search_form', __NAMESPACE__ . '\get_search_form' );