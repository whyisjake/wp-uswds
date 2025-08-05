<?php
/**
 * Title: USWDS Landing Page Layout
 * Slug: uswds/landing-page-layout
 * Categories: featured, header
 * Description: Complete landing page layout with banner, hero section, services grid, and key information
 * Keywords: landing, homepage, government, layout, complete
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

<!-- wp:group {"style":{"color":{"background":"#162e51"},"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"textColor":"white","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group has-white-color has-text-color has-background" style="background-color:#162e51;padding-top:4rem;padding-bottom:4rem">
	<!-- wp:columns {"verticalAlignment":"center"} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center","width":"60%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:60%">
			<!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"3.5rem","fontWeight":"700","lineHeight":"1.1"},"color":{"text":"#ffffff"}}} -->
			<h1 class="wp-block-heading has-text-color" style="color:#ffffff;font-size:3.5rem;font-weight:700;line-height:1.1">Serving the American people</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.5rem","lineHeight":"1.4"},"spacing":{"margin":{"top":"1.5rem","bottom":"2.5rem"}}}} -->
			<p style="margin-top:1.5rem;margin-bottom:2.5rem;font-size:1.5rem;line-height:1.4">Access government services, apply for benefits, and find the information you need.</p>
			<!-- /wp:paragraph -->

			<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"left"}} -->
			<div class="wp-block-group">
				<!-- wp:uswds/button {"text":"Apply for Benefits","variant":"default","size":"big"} -->
				<div class="wp-block-uswds-button">
					<a class="usa-button usa-button--big" href="#">Apply for Benefits</a>
				</div>
				<!-- /wp:uswds/button -->

				<!-- wp:uswds/button {"text":"Find Services","variant":"outline","size":"big"} -->
				<div class="wp-block-uswds-button">
					<a class="usa-button usa-button--outline usa-button--big usa-button--inverse" href="#">Find Services</a>
				</div>
				<!-- /wp:uswds/button -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center","width":"40%"} -->
		<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%">
			<!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
			<figure class="wp-block-image size-large">
				<img src="https://via.placeholder.com/600x400/ffffff/162e51?text=Government+Services" alt="Government services illustration"/>
			</figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group" style="padding-top:4rem;padding-bottom:4rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"spacing":{"margin":{"bottom":"3rem"}}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="margin-bottom:3rem">Popular Services</h2>
	<!-- /wp:heading -->

	<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:uswds/card {"title":"Social Security","content":"Apply for benefits, check your status, or update your information online.","linkUrl":"#","linkText":"Get Started"} -->
			<div class="wp-block-uswds-card usa-card">
				<div class="usa-card__container">
					<div class="usa-card__body">
						<h3 class="usa-card__heading">Social Security</h3>
						<p>Apply for benefits, check your status, or update your information online.</p>
					</div>
					<div class="usa-card__footer">
						<a href="#" class="usa-button">Get Started</a>
					</div>
				</div>
			</div>
			<!-- /wp:uswds/card -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:uswds/card {"title":"Healthcare","content":"Find health insurance options, manage your coverage, and access medical records.","linkUrl":"#","linkText":"Learn More"} -->
			<div class="wp-block-uswds-card usa-card">
				<div class="usa-card__container">
					<div class="usa-card__body">
						<h3 class="usa-card__heading">Healthcare</h3>
						<p>Find health insurance options, manage your coverage, and access medical records.</p>
					</div>
					<div class="usa-card__footer">
						<a href="#" class="usa-button">Learn More</a>
					</div>
				</div>
			</div>
			<!-- /wp:uswds/card -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:uswds/card {"title":"Veterans Affairs","content":"Access benefits, healthcare, and support services for veterans and their families.","linkUrl":"#","linkText":"Visit VA.gov"} -->
			<div class="wp-block-uswds-card usa-card">
				<div class="usa-card__container">
					<div class="usa-card__body">
						<h3 class="usa-card__heading">Veterans Affairs</h3>
						<p>Access benefits, healthcare, and support services for veterans and their families.</p>
					</div>
					<div class="usa-card__footer">
						<a href="#" class="usa-button">Visit VA.gov</a>
					</div>
				</div>
			</div>
			<!-- /wp:uswds/card -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"color":{"background":"#f0f0f0"},"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group has-background" style="background-color:#f0f0f0;padding-top:4rem;padding-bottom:4rem">
	<!-- wp:columns {"verticalAlignment":"top","style":{"spacing":{"blockGap":{"left":"4rem"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-top">
		<!-- wp:column {"verticalAlignment":"top","width":"60%"} -->
		<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:60%">
			<!-- wp:uswds/summary-box {"heading":"Important Updates"} -->
			<div class="wp-block-uswds-summary-box usa-summary-box">
				<div class="usa-summary-box__body">
					<h3 class="usa-summary-box__heading">Important Updates</h3>
					<div class="usa-summary-box__text">
						<!-- wp:paragraph -->
						<p><strong>New application process</strong> - We've simplified the way you apply for services. The new system launches January 15, 2024.</p>
						<!-- /wp:paragraph -->
						
						<!-- wp:paragraph -->
						<p>Current applications will continue to be processed normally. No action required for existing applicants.</p>
						<!-- /wp:paragraph -->
					</div>
				</div>
			</div>
			<!-- /wp:uswds/summary-box -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"top","width":"40%"} -->
		<div class="wp-block-column is-vertically-aligned-top" style="flex-basis:40%">
			<!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"bottom":"1rem"}}}} -->
			<h3 class="wp-block-heading" style="margin-bottom:1rem">Quick Links</h3>
			<!-- /wp:heading -->

			<!-- wp:uswds/icon-list {"items":[{"icon":"description","text":"Forms and Applications"},{"icon":"schedule","text":"Office Hours and Locations"},{"icon":"contact_support","text":"Contact Information"},{"icon":"info","text":"Frequently Asked Questions"}]} -->
			<div class="wp-block-uswds-icon-list usa-icon-list">
				<ul class="usa-icon-list">
					<li class="usa-icon-list__item">
						<div class="usa-icon-list__icon">
							<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
								<use xlink:href="#description"></use>
							</svg>
						</div>
						<div class="usa-icon-list__content">Forms and Applications</div>
					</li>
					<li class="usa-icon-list__item">
						<div class="usa-icon-list__icon">
							<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
								<use xlink:href="#schedule"></use>
							</svg>
						</div>
						<div class="usa-icon-list__content">Office Hours and Locations</div>
					</li>
					<li class="usa-icon-list__item">
						<div class="usa-icon-list__icon">
							<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
								<use xlink:href="#contact_support"></use>
							</svg>
						</div>
						<div class="usa-icon-list__content">Contact Information</div>
					</li>
					<li class="usa-icon-list__item">
						<div class="usa-icon-list__icon">
							<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
								<use xlink:href="#info"></use>
							</svg>
						</div>
						<div class="usa-icon-list__content">Frequently Asked Questions</div>
					</li>
				</ul>
			</div>
			<!-- /wp:uswds/icon-list -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->