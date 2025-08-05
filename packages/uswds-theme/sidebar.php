<?php
/**
 * The sidebar containing the main widget area
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="secondary" class="usa-layout-docs__sidenav desktop:grid-col-3" role="complementary">
	<nav aria-label="<?php esc_attr_e( 'Secondary navigation', 'wp-uswds-theme' ); ?>">
		<?php dynamic_sidebar( 'sidebar-1' ); ?>
	</nav>
</aside>