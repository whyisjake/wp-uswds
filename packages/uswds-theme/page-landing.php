<?php
/*
Template Name: USWDS Landing Page
*/

/**
 * Template for Landing Page
 *
 * Based on USWDS Landing Page template structure
 * https://designsystem.digital.gov/templates/landing-page/
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

get_header(); ?>

<main id="main">
	<?php while (have_posts()) : the_post(); ?>

		<?php the_content(); ?>

	<?php endwhile; ?>
</main>

<?php get_footer(); ?>
