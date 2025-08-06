<?php
/**
 * Title: USWDS Summary Box Highlight
 * Slug: uswds/summary-box-highlight
 * Categories: text, call-to-action
 * Description: A summary box pattern highlighting key information with supporting content and call-to-action
 * Keywords: summary, highlight, important, key information
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="margin-bottom:2rem">Important Program Information</h2>
	<!-- /wp:heading -->

	<!-- wp:wp-uswds/summary-box {"heading":"Application Deadline Approaching"} -->
	<div class="wp-block-wp-uswds-summary-box usa-summary-box wp-block-uswds-summary-box">
		<div class="usa-summary-box__body">
			<h3 class="usa-summary-box__heading">Application Deadline Approaching</h3>
			<div class="usa-summary-box__text">
				<!-- wp:paragraph -->
				<p><strong>Submit your application by March 15, 2024</strong> to be considered for this funding cycle. Late applications will not be accepted.</p>
				<!-- /wp:paragraph -->
				
				<!-- wp:list -->
				<ul>
					<li>Complete application form</li>
					<li>Submit required documentation</li>
					<li>Pay processing fee</li>
					<li>Schedule interview (if applicable)</li>
				</ul>
				<!-- /wp:list -->
			</div>
		</div>
	</div>
	<!-- /wp:wp-uswds/summary-box -->

	<!-- wp:spacer {"height":"2rem"} -->
	<div style="height:2rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
	<div class="wp-block-columns">
		<!-- wp:column {"width":"60%"} -->
		<div class="wp-block-column" style="flex-basis:60%">
			<!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"bottom":"1rem"}}}} -->
			<h3 class="wp-block-heading" style="margin-bottom:1rem">What You Need to Know</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"1rem"}}}} -->
			<p style="margin-bottom:1rem">This program provides financial assistance to eligible applicants. Review all requirements carefully before beginning your application.</p>
			<!-- /wp:paragraph -->

			<!-- wp:wp-uswds/icon-list {"items":[{"icon":"check_circle","text":"Free application process"},{"icon":"event","text":"Processing takes 2-4 weeks"},{"icon":"chat","text":"Support available Monday-Friday"}]} -->
			<ul class="wp-block-wp-uswds-icon-list usa-icon-list">
				<li class="usa-icon-list__item">
					<div class="usa-icon-list__icon usa-icon--size-md">
						<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
							<use href="/wp-content/plugins/uswds-blocks/assets/images/sprite.svg#check_circle"></use>
						</svg>
					</div>
					<div class="usa-icon-list__content">Free application process</div>
				</li>
				<li class="usa-icon-list__item">
					<div class="usa-icon-list__icon usa-icon--size-md">
						<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
							<use href="/wp-content/plugins/uswds-blocks/assets/images/sprite.svg#event"></use>
						</svg>
					</div>
					<div class="usa-icon-list__content">Processing takes 2-4 weeks</div>
				</li>
				<li class="usa-icon-list__item">
					<div class="usa-icon-list__icon usa-icon--size-md">
						<svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
							<use href="/wp-content/plugins/uswds-blocks/assets/images/sprite.svg#chat"></use>
						</svg>
					</div>
					<div class="usa-icon-list__content">Support available Monday-Friday</div>
				</li>
			</ul>
			<!-- /wp:wp-uswds/icon-list -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"40%"} -->
		<div class="wp-block-column" style="flex-basis:40%">
			<!-- wp:group {"style":{"border":{"width":"1px","color":"#dfe1e2","style":"solid"},"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}}},"backgroundColor":"f9f9f9","layout":{"type":"constrained"}} -->
			<div class="wp-block-group has-border-color has-f-9-f-9-f-9-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
				<!-- wp:heading {"level":4,"style":{"spacing":{"margin":{"bottom":"1rem"}}}} -->
				<h4 class="wp-block-heading" style="margin-bottom:1rem">Need Help?</h4>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
				<p style="margin-bottom:1.5rem;font-size:0.9rem">Contact our support team for assistance with your application.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"spacing":{"margin":{"bottom":"0.5rem"}}}} -->
				<p style="margin-bottom:0.5rem;font-size:0.9rem"><strong>Phone:</strong> 1-800-555-0123</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
				<p style="margin-bottom:1.5rem;font-size:0.9rem"><strong>Email:</strong> support@agency.gov</p>
				<!-- /wp:paragraph -->

				<!-- wp:wp-uswds/button {"text":"Start Application","url":"#"} -->
				<a class="wp-block-wp-uswds-button usa-button" href="#">Start Application</a>
				<!-- /wp:wp-uswds/button -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->