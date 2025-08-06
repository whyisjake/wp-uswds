<?php
/**
 * Title: USWDS Alert Section
 * Slug: wp-uswds/alert-section
 * Categories: text, call-to-action
 * Description: Multiple USWDS alerts demonstrating different alert types for notifications and important information
 * Keywords: alerts, notifications, emergency, warning, info
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem"}}},"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group" style="padding-top:2rem;padding-bottom:2rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="margin-bottom:2rem">Important Notifications</h2>
	<!-- /wp:heading -->

	<!-- wp:wp-uswds/alert {"type":"emergency","heading":"Emergency Alert"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--emergency">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Emergency Alert</h4>
			<!-- wp:paragraph -->
			<p>This is an emergency alert with <a href="#">an emergency link</a>. Emergency alerts are used for urgent situations that require immediate attention.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->

	<!-- wp:spacer {"height":"1.5rem"} -->
	<div style="height:1.5rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:wp-uswds/alert {"type":"error","heading":"Error Alert"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--error">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Error Alert</h4>
			<!-- wp:paragraph -->
			<p>Something went wrong. Please <a href="#">try again</a> or contact support if the problem persists.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->

	<!-- wp:spacer {"height":"1.5rem"} -->
	<div style="height:1.5rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:wp-uswds/alert {"type":"warning","heading":"Warning Alert"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--warning">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Warning Alert</h4>
			<!-- wp:paragraph -->
			<p>This action cannot be undone. Please review your information carefully before proceeding. <a href="#">Learn more about data retention policies</a>.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->

	<!-- wp:spacer {"height":"1.5rem"} -->
	<div style="height:1.5rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:wp-uswds/alert {"type":"success","heading":"Success Alert"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--success">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Success Alert</h4>
			<!-- wp:paragraph -->
			<p>Your application has been successfully submitted! You will receive a confirmation email within 24 hours. <a href="#">Track your application status</a>.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->

	<!-- wp:spacer {"height":"1.5rem"} -->
	<div style="height:1.5rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:wp-uswds/alert {"type":"info","heading":"Information Alert"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--info">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Information Alert</h4>
			<!-- wp:paragraph -->
			<p>New features are now available! Check out the <a href="#">latest updates</a> to see what's new and improved.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->
</div>
<!-- /wp:group -->