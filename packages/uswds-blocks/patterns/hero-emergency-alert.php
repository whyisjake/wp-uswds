<?php
/**
 * Title: Emergency Alert Hero
 * Slug: wp-uswds/hero-emergency-alert
 * Categories: wp-uswds-heroes
 * Description: Urgent emergency alert banner for critical government communications
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"1rem","right":"1rem"}}},"backgroundColor":"error-default","textColor":"base-lightest","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-base-lightest-color has-error-default-background-color has-text-color has-background" style="padding-top:3rem;padding-right:1rem;padding-bottom:3rem;padding-left:1rem">
	<!-- wp:group {"style":{"spacing":{"padding":{"top":"0.75rem","bottom":"0.75rem","left":"1.5rem","right":"1.5rem"},"margin":{"bottom":"2rem"}},"border":{"radius":"4px","width":"2px","style":"solid","color":"#ffffff"}},"layout":{"type":"flex","justifyContent":"center","flexWrap":"nowrap"}} -->
	<div class="wp-block-group has-border-color" style="border-color:#ffffff;border-style:solid;border-width:2px;border-radius:4px;margin-bottom:2rem;padding-top:0.75rem;padding-right:1.5rem;padding-bottom:0.75rem;padding-left:1.5rem">
		<!-- wp:paragraph {"style":{"typography":{"fontSize":"1rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"1px"}},"textColor":"base-lightest"} -->
		<p class="has-base-lightest-color has-text-color" style="font-size:1rem;font-weight:700;text-transform:uppercase;letter-spacing:1px">🚨 Emergency Alert</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->

	<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","fontWeight":"700","lineHeight":"1.1"},"spacing":{"margin":{"bottom":"1.5rem","top":"0"}}},"textColor":"base-lightest"} -->
	<h1 class="wp-block-heading has-text-align-center has-base-lightest-color has-text-color" style="margin-top:0;margin-bottom:1.5rem;font-size:3rem;font-weight:700;line-height:1.1">Critical Service Disruption</h1>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.3rem","lineHeight":"1.4"},"spacing":{"margin":{"bottom":"2rem"}}},"textColor":"base-lightest"} -->
	<p class="has-text-align-center has-base-lightest-color has-text-color" style="margin-bottom:2rem;font-size:1.3rem;line-height:1.4">Due to severe weather conditions, several government services are temporarily unavailable. Essential services remain operational.</p>
	<!-- /wp:paragraph -->

	<!-- wp:group {"layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap"}} -->
	<div class="wp-block-group">
		<!-- wp:wp-uswds/button {"text":"Emergency Information","url":"/emergency-status","variant":"secondary"} -->
		<a class="wp-block-wp-uswds-button usa-button usa-button--secondary" href="/emergency-status">Emergency Information</a>
		<!-- /wp:wp-uswds/button -->

		<!-- wp:wp-uswds/button {"text":"Essential Services","url":"/essential-services","variant":"outline"} -->
		<a class="wp-block-wp-uswds-button usa-button usa-button--outline" href="/essential-services">Essential Services</a>
		<!-- /wp:wp-uswds/button -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","bottom":"1rem","left":"2rem","right":"2rem"},"margin":{"top":"2rem"}},"border":{"radius":"4px","width":"1px","style":"solid","color":"rgba(255,255,255,0.3)"}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group has-border-color" style="border-color:rgba(255,255,255,0.3);border-style:solid;border-width:1px;border-radius:4px;margin-top:2rem;padding-top:1.5rem;padding-right:2rem;padding-bottom:1rem;padding-left:2rem">
		<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.95rem","fontWeight":"600"}},"textColor":"base-lightest"} -->
		<p class="has-text-align-center has-base-lightest-color has-text-color" style="font-size:0.95rem;font-weight:600">📞 Emergency Hotline: 1-800-GOV-HELP</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}},"textColor":"base-lighter"} -->
		<p class="has-text-align-center has-base-lighter-color has-text-color" style="font-size:0.9rem">Available 24/7 for urgent assistance</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->