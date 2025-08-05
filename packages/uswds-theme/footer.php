<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

?>
		</div><!-- .grid-row -->
	</div><!-- .grid-container -->
</div><!-- .usa-layout-docs -->

<footer class="usa-footer">
	<div class="usa-footer__primary-section">
		<div class="usa-footer__primary-container grid-container">
			<div class="usa-footer__primary-content">
				
				<?php if ( is_active_sidebar( 'footer-widgets' ) ) : ?>
					<div class="usa-footer__primary-content">
						<?php dynamic_sidebar( 'footer-widgets' ); ?>
					</div>
				<?php endif; ?>

				<?php
				wp_nav_menu( array(
					'theme_location' => 'footer',
					'menu_class'     => 'usa-footer__nav',
					'container'      => 'nav',
					'container_class' => 'usa-footer__nav',
					'container_id'   => 'footer-navigation',
					'fallback_cb'    => false,
					'depth'          => 1,
				) );
				?>

			</div>
		</div>
	</div>

	<div class="usa-footer__secondary-section">
		<div class="grid-container">
			<div class="usa-footer__logo grid-row grid-gap-2">
				<div class="grid-col-auto">
					<div class="usa-footer__logo-img">
						<img class="usa-footer__logo-img" src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/logo-img.png" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
					</div>
				</div>
				<div class="grid-col-auto">
					<div class="usa-footer__logo-heading">
						<h3 class="usa-footer__logo-heading"><?php bloginfo( 'name' ); ?></h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>

</body>
</html>