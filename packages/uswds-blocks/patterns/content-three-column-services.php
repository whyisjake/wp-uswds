<?php
/**
 * Title: Three Column Services Layout
 * Slug: wp-uswds/content-three-column-services
 * Categories: wp-uswds-content
 * Description: Three column layout showcasing government departments and services
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-right:2rem;padding-bottom:3rem;padding-left:2rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"2.25rem","fontWeight":"700","lineHeight":"1.3"},"spacing":{"margin":{"bottom":"1rem","top":"0"}}},"textColor":"base-darkest"} -->
	<h2 class="wp-block-heading has-text-align-center has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1rem;font-size:2.25rem;font-weight:700;line-height:1.3">Government Departments</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"3rem"}}},"textColor":"base-dark"} -->
	<p class="has-text-align-center has-base-dark-color has-text-color" style="margin-bottom:3rem;font-size:1.1rem;line-height:1.6">Access services and information from key government departments dedicated to serving our citizens.</p>
	<!-- /wp:paragraph -->

	<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
			<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
				<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1rem","top":"0"}}},"textColor":"primary-default"} -->
				<h3 class="wp-block-heading has-text-align-center has-primary-default-color has-text-color" style="margin-top:0;margin-bottom:1rem;font-size:1.4rem;font-weight:600">🏥 Health Services</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"1rem","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
				<p style="margin-bottom:1.5rem;font-size:1rem;line-height:1.6">Public health programs, medical assistance, mental health resources, and community wellness initiatives.</p>
				<!-- /wp:paragraph -->

				<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"},"spacing":{"margin":{"bottom":"2rem"}}}} -->
				<ul style="margin-bottom:2rem;font-size:0.95rem">
					<!-- wp:list-item -->
					<li>Healthcare enrollment</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Mental health support</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Public health alerts</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Community programs</li>
					<!-- /wp:list-item -->
				</ul>
				<!-- /wp:list -->

				<!-- wp:wp-uswds/button {"text":"Health Services","url":"/health","variant":"default"} -->
				<a class="wp-block-wp-uswds-button usa-button" href="/health">Health Services</a>
				<!-- /wp:wp-uswds/button -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
			<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
				<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1rem","top":"0"}}},"textColor":"primary-default"} -->
				<h3 class="wp-block-heading has-text-align-center has-primary-default-color has-text-color" style="margin-top:0;margin-bottom:1rem;font-size:1.4rem;font-weight:600">🎓 Education</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"1rem","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
				<p style="margin-bottom:1.5rem;font-size:1rem;line-height:1.6">Educational resources, student aid programs, school information, and continuing education opportunities.</p>
				<!-- /wp:paragraph -->

				<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"},"spacing":{"margin":{"bottom":"2rem"}}}} -->
				<ul style="margin-bottom:2rem;font-size:0.95rem">
					<!-- wp:list-item -->
					<li>Student financial aid</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>School district information</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Adult education programs</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Educational grants</li>
					<!-- /wp:list-item -->
				</ul>
				<!-- /wp:list -->

				<!-- wp:wp-uswds/button {"text":"Education Resources","url":"/education","variant":"default"} -->
				<a class="wp-block-wp-uswds-button usa-button" href="/education">Education Resources</a>
				<!-- /wp:wp-uswds/button -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
			<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
				<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1rem","top":"0"}}},"textColor":"primary-default"} -->
				<h3 class="wp-block-heading has-text-align-center has-primary-default-color has-text-color" style="margin-top:0;margin-bottom:1rem;font-size:1.4rem;font-weight:600">🏢 Business & Economy</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"style":{"typography":{"fontSize":"1rem","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
				<p style="margin-bottom:1.5rem;font-size:1rem;line-height:1.6">Business registration, economic development, employment services, and regulatory compliance assistance.</p>
				<!-- /wp:paragraph -->

				<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"},"spacing":{"margin":{"bottom":"2rem"}}}} -->
				<ul style="margin-bottom:2rem;font-size:0.95rem">
					<!-- wp:list-item -->
					<li>Business licensing</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Employment resources</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Economic development</li>
					<!-- /wp:list-item -->

					<!-- wp:list-item -->
					<li>Tax information</li>
					<!-- /wp:list-item -->
				</ul>
				<!-- /wp:list -->

				<!-- wp:wp-uswds/button {"text":"Business Services","url":"/business","variant":"default"} -->
				<a class="wp-block-wp-uswds-button usa-button" href="/business">Business Services</a>
				<!-- /wp:wp-uswds/button -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->