<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

get_header(); ?>

<main id="main" class="usa-layout-docs__main desktop:grid-col-9 usa-prose usa-layout-docs">
	<div class="usa-layout-docs__content">
		
		<?php if ( have_posts() ) : ?>
			
			<?php if ( is_home() && ! is_front_page() ) : ?>
				<header class="page-header">
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
			<?php endif; ?>

			<?php while ( have_posts() ) : the_post(); ?>
				
				<?php get_template_part( 'template-parts/content', get_post_type() ); ?>

			<?php endwhile; ?>

			<?php
			the_posts_navigation( array(
				'prev_text' => __( 'Older posts', 'wp-uswds-theme' ),
				'next_text' => __( 'Newer posts', 'wp-uswds-theme' ),
			) );
			?>

		<?php else : ?>

			<?php get_template_part( 'template-parts/content', 'none' ); ?>

		<?php endif; ?>

	</div>
</main>

<?php
get_sidebar();
get_footer();