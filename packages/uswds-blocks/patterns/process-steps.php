<?php
/**
 * Title: USWDS Process Steps
 * Slug: uswds/process-steps
 * Categories: text, featured
 * Description: A step-by-step process layout using USWDS step indicator and process list components
 * Keywords: process, steps, workflow, guide
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"3rem"}}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="margin-bottom:3rem;font-size:2.5rem;font-weight:700">How to complete your application</h2>
	<!-- /wp:heading -->

	<!-- wp:group {"style":{"border":{"width":"1px","style":"solid","color":"#dfe1e2"},"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}}},"backgroundColor":"f8f9fa","layout":{"type":"constrained"}} -->
	<div class="wp-block-group has-border-color has-f-8-f-9-fa-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
		<!-- wp:heading {"textAlign":"center","level":3,"style":{"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
		<h3 class="wp-block-heading has-text-align-center" style="margin-bottom:1.5rem">Application Progress</h3>
		<!-- /wp:heading -->

		<!-- wp:columns {"verticalAlignment":"center"} -->
		<div class="wp-block-columns are-vertically-aligned-center">
			<!-- wp:column {"verticalAlignment":"center","width":"30%"} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%">
				<!-- wp:group {"style":{"color":{"background":"#00a91c"},"spacing":{"padding":{"top":"0.5rem","right":"1rem","bottom":"0.5rem","left":"1rem"}},"border":{"radius":"4px"}},"textColor":"white","layout":{"type":"constrained"}} -->
				<div class="wp-block-group has-white-color has-text-color has-background" style="border-radius:4px;background-color:#00a91c;padding-top:0.5rem;padding-right:1rem;padding-bottom:0.5rem;padding-left:1rem">
					<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem","fontWeight":"600"}}} -->
					<p class="has-text-align-center" style="font-size:0.9rem;font-weight:600">✓ Step 1: Personal Information</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"verticalAlignment":"center","width":"30%"} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%">
				<!-- wp:group {"style":{"color":{"background":"#005ea2"},"spacing":{"padding":{"top":"0.5rem","right":"1rem","bottom":"0.5rem","left":"1rem"}},"border":{"radius":"4px"}},"textColor":"white","layout":{"type":"constrained"}} -->
				<div class="wp-block-group has-white-color has-text-color has-background" style="border-radius:4px;background-color:#005ea2;padding-top:0.5rem;padding-right:1rem;padding-bottom:0.5rem;padding-left:1rem">
					<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem","fontWeight":"600"}}} -->
					<p class="has-text-align-center" style="font-size:0.9rem;font-weight:600">→ Step 2: Financial Details</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"verticalAlignment":"center","width":"30%"} -->
			<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:30%">
				<!-- wp:group {"style":{"color":{"background":"#71767a"},"spacing":{"padding":{"top":"0.5rem","right":"1rem","bottom":"0.5rem","left":"1rem"}},"border":{"radius":"4px"}},"textColor":"white","layout":{"type":"constrained"}} -->
				<div class="wp-block-group has-white-color has-text-color has-background" style="border-radius:4px;background-color:#71767a;padding-top:0.5rem;padding-right:1rem;padding-bottom:0.5rem;padding-left:1rem">
					<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem","fontWeight":"600"}}} -->
					<p class="has-text-align-center" style="font-size:0.9rem;font-weight:600">Step 3: Review & Submit</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->
	</div>
	<!-- /wp:group -->

	<!-- wp:spacer {"height":"3rem"} -->
	<div style="height:3rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:wp-uswds/process-list {"steps":[{"heading":"Complete personal information","content":"Provide your full name, address, and contact details. Make sure all information is accurate and up-to-date."},{"heading":"Submit financial documentation","content":"Upload required documents including income statements, tax returns, and bank statements from the past 12 months."},{"heading":"Review and verify details","content":"Double-check all information before submitting. Once submitted, changes may require additional processing time."}]} -->
	<ol class="wp-block-wp-uswds-process-list usa-process-list">
		<li class="usa-process-list__item">
			<h4 class="usa-process-list__heading">Complete personal information</h4>
			<p>Provide your full name, address, and contact details. Make sure all information is accurate and up-to-date.</p>
		</li>
		<li class="usa-process-list__item">
			<h4 class="usa-process-list__heading">Submit financial documentation</h4>
			<p>Upload required documents including income statements, tax returns, and bank statements from the past 12 months.</p>
		</li>
		<li class="usa-process-list__item">
			<h4 class="usa-process-list__heading">Review and verify details</h4>
			<p>Double-check all information before submitting. Once submitted, changes may require additional processing time.</p>
		</li>
	</ol>
	<!-- /wp:wp-uswds/process-list -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem"}}},"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-group" style="padding-top:2rem">
		<!-- wp:wp-uswds/button {"text":"Continue Application","url":"#","variant":"default"} -->
		<a class="wp-block-wp-uswds-button usa-button" href="#">Continue Application</a>
		<!-- /wp:wp-uswds/button -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->