<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="usa-skipnav" href="#main"><?php esc_html_e( 'Skip to main content', 'wp-uswds-theme' ); ?></a>

<div class="usa-overlay"></div>

<header class="usa-header usa-header--basic">
	<div class="usa-nav-container">
		<div class="usa-navbar">
			<div class="usa-logo" id="basic-logo">
				<em class="usa-logo__text">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
						<?php bloginfo( 'name' ); ?>
					</a>
				</em>
			</div>
			<button type="button" class="usa-menu-btn"><?php esc_html_e( 'Menu', 'wp-uswds-theme' ); ?></button>
		</div>

		<nav aria-label="<?php esc_attr_e( 'Primary navigation', 'wp-uswds-theme' ); ?>" class="usa-nav">
			<button type="button" class="usa-nav__close">
				<img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/usa-icons/close.svg" role="img" alt="<?php esc_attr_e( 'Close', 'wp-uswds-theme' ); ?>">
			</button>

			<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'menu_class'     => 'usa-nav__primary usa-accordion',
				'container'      => false,
				'fallback_cb'    => false,
				'walker'         => new \USWDS_Theme\Nav_Walker(),
			) );
			?>
		</nav>
	</div>
</header>

<div class="usa-layout-docs usa-section" id="content">
	<div class="grid-container">
		<div class="grid-row grid-gap"><?php // Main content wrapper ?>