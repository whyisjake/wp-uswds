<?php
/**
 * Block Patterns for USWDS Theme
 *
 * @package USWDS_Theme
 * @since 1.0.0
 */

namespace USWDS_Theme;

/**
 * Register block patterns
 */
function register_block_patterns() {

	// Hero section pattern
	register_block_pattern(
		'uswds-theme/hero-section',
		array(
			'title'       => __( 'USWDS Hero Section', 'wp-uswds-theme' ),
			'description' => __( 'A hero section with title, description, and call-to-action button', 'wp-uswds-theme' ),
			'categories'  => array( 'featured' ),
			'content'     => '<!-- wp:group {"className":"usa-hero"} -->
<div class="wp-block-group usa-hero">
	<!-- wp:group {"className":"usa-hero__callout"} -->
	<div class="wp-block-group usa-hero__callout">
		<!-- wp:heading {"level":1,"className":"usa-hero__heading"} -->
		<h1 class="wp-block-heading usa-hero__heading">Bring attention to a current priority</h1>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph {"className":"usa-hero__text"} -->
		<p class="usa-hero__text">Support the callout with some short explanatory text. You don\'t need more than a couple of sentences.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:buttons -->
		<div class="wp-block-buttons">
			<!-- wp:button {"className":"usa-button"} -->
			<div class="wp-block-button usa-button"><a class="wp-block-button__link wp-element-button">Call to action</a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->',
		)
	);

	// Three column features pattern
	register_block_pattern(
		'uswds-theme/three-column-features',
		array(
			'title'       => __( 'Three Column Features', 'wp-uswds-theme' ),
			'description' => __( 'Three columns with icons, headings, and descriptions', 'wp-uswds-theme' ),
			'categories'  => array( 'columns' ),
			'content'     => '<!-- wp:columns {"className":"usa-graphic-list"} -->
<div class="wp-block-columns usa-graphic-list">
	<!-- wp:column {"className":"usa-graphic-list__row"} -->
	<div class="wp-block-column usa-graphic-list__row">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Graphic headings can vary</h3>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p>Graphic headings can be used a few different ways, depending on what your landing page is for. Highlight priorities, or provide more detail.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
	
	<!-- wp:column {"className":"usa-graphic-list__row"} -->
	<div class="wp-block-column usa-graphic-list__row">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Stick to 6 or fewer words</h3>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p>Keep body text to about 30 words. They can be shorter, but try to be somewhat balanced across all four. It creates a clean appearance with good spacing.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
	
	<!-- wp:column {"className":"usa-graphic-list__row"} -->
	<div class="wp-block-column usa-graphic-list__row">
		<!-- wp:heading {"level":3} -->
		<h3 class="wp-block-heading">Never highlight anything without a goal</h3>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p>For anything you want to highlight here, understand what your users know now, and what activity or impression you want from them after they see it.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->',
		)
	);

	// Footer pattern
	register_block_pattern(
		'uswds-theme/footer-section',
		array(
			'title'       => __( 'USWDS Footer Section', 'wp-uswds-theme' ),
			'description' => __( 'A footer section with contact information and links', 'wp-uswds-theme' ),
			'categories'  => array( 'footer' ),
			'content'     => '<!-- wp:group {"className":"usa-footer__primary-section"} -->
<div class="wp-block-group usa-footer__primary-section">
	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":4} -->
			<h4 class="wp-block-heading">About</h4>
			<!-- /wp:heading -->
			
			<!-- wp:list -->
			<ul>
				<li><a href="#">Our Mission</a></li>
				<li><a href="#">Leadership</a></li>
				<li><a href="#">History</a></li>
			</ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->
		
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":4} -->
			<h4 class="wp-block-heading">Contact</h4>
			<!-- /wp:heading -->
			
			<!-- wp:paragraph -->
			<p>Phone: (555) 123-4567<br>Email: info@agency.gov<br>Address: 123 Government St<br>Washington, DC 20500</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
		
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:heading {"level":4} -->
			<h4 class="wp-block-heading">Resources</h4>
			<!-- /wp:heading -->
			
			<!-- wp:list -->
			<ul>
				<li><a href="#">FOIA</a></li>
				<li><a href="#">Privacy Policy</a></li>
				<li><a href="#">Accessibility</a></li>
			</ul>
			<!-- /wp:list -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_block_patterns' );