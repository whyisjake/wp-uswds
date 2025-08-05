<?php
/**
 * Title: USWDS Hero Banner
 * Slug: uswds/hero-banner
 * Categories: header, featured
 * Description: A prominent hero section with USWDS banner, heading, and call-to-action button
 * Keywords: hero, banner, header, landing
 */
?>

<!-- wp:uswds/banner {"type":"info","message":"An official website of the United States government","showCloseButton":false} -->
<div class="wp-block-uswds-banner usa-banner usa-banner--info">
	<div class="usa-accordion">
		<header class="usa-banner__header">
			<div class="usa-banner__inner">
				<div class="grid-col-auto">
					<img class="usa-banner__header-flag" src="https://designsystem.digital.gov/img/us_flag_small.png" alt="U.S. flag">
				</div>
				<div class="grid-col-fill tablet:grid-col-auto">
					<p class="usa-banner__header-text">An official website of the United States government</p>
				</div>
			</div>
		</header>
	</div>
</div>
<!-- /wp:uswds/banner -->

<!-- wp:group {"style":{"color":{"background":"#f0f0f0"},"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group has-background" style="background-color:#f0f0f0;padding-top:4rem;padding-bottom:4rem">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"3rem"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"60%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:60%">
			<!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"3rem","lineHeight":"1.2","fontWeight":"700"},"color":{"text":"#1b1b1b"}}} -->
			<h1 class="wp-block-heading has-text-color" style="color:#1b1b1b;font-size:3rem;font-weight:700;line-height:1.2">Bring attention to a current priority</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.25rem","lineHeight":"1.6"},"color":{"text":"#565c65"},"spacing":{"margin":{"top":"1.5rem","bottom":"2rem"}}}} -->
			<p class="has-text-color" style="color:#565c65;margin-top:1.5rem;margin-bottom:2rem;font-size:1.25rem;line-height:1.6">Support the body text with a clear explanation of the priority. What do you want your users to know or do after reading the body text? Keep it simple.</p>
			<!-- /wp:paragraph -->

			<!-- wp:uswds/button {"text":"Call to action","variant":"default","size":"big"} -->
			<div class="wp-block-uswds-button">
				<a class="usa-button usa-button--big" href="#">Call to action</a>
			</div>
			<!-- /wp:uswds/button -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
			<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
			<figure class="wp-block-image size-large">
				<img src="https://designsystem.digital.gov/img/introducing-uswds-2-0/uswds-2-illio-feature-image.jpg" alt="USWDS illustration"/>
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->