<?php
/**
 * Title: Government Contact Form
 * Slug: wp-uswds/form-contact-government
 * Categories: wp-uswds-forms
 * Description: Comprehensive contact form for citizens to reach government departments
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"backgroundColor":"base-lightest","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-base-lightest-background-color has-background" style="padding-top:3rem;padding-right:2rem;padding-bottom:3rem;padding-left:2rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"2rem","fontWeight":"700","lineHeight":"1.3"},"spacing":{"margin":{"bottom":"1rem","top":"0"}}},"textColor":"base-darkest"} -->
	<h2 class="wp-block-heading has-text-align-center has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1rem;font-size:2rem;font-weight:700;line-height:1.3">Contact Your Government</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"2rem"}}},"textColor":"base-dark"} -->
	<p class="has-text-align-center has-base-dark-color has-text-color" style="margin-bottom:2rem;font-size:1.1rem;line-height:1.6">We're here to help. Use this form to contact the appropriate government department for assistance with services, questions, or feedback.</p>
	<!-- /wp:paragraph -->

	<!-- wp:wp-uswds/alert {"type":"info","heading":"Form Security Notice"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--info">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Form Security Notice</h4>
			<!-- wp:paragraph -->
			<p>This form uses government-grade encryption. Do not include sensitive information like Social Security Numbers or passwords. For emergency services, call 911.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"},"margin":{"top":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
	<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;margin-top:2rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
		<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1.5rem","top":"0"}}},"textColor":"base-darkest"} -->
		<h3 class="wp-block-heading has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1.5rem;font-size:1.3rem;font-weight:600">Contact Information</h3>
		<!-- /wp:heading -->

		<!-- wp:group {"style":{"spacing":{"blockGap":"1.5rem"}},"layout":{"type":"constrained"}} -->
		<div class="wp-block-group">
			<!-- wp:wp-uswds/text-input {"label":"Full Name","required":true,"width":"full"} -->
			<div class="wp-block-wp-uswds-text-input usa-form-group">
				<label class="usa-label" for="text-input">Full Name <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
				<input class="usa-input" id="text-input" name="text-input" type="text" required />
			</div>
			<!-- /wp:wp-uswds/text-input -->

			<!-- wp:columns -->
			<div class="wp-block-columns">
				<!-- wp:column -->
				<div class="wp-block-column">
					<!-- wp:wp-uswds/email-input {"label":"Email Address","required":true} -->
					<div class="wp-block-wp-uswds-email-input usa-form-group">
						<label class="usa-label" for="email-input">Email Address <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
						<input class="usa-input" id="email-input" name="email-input" type="email" required />
					</div>
					<!-- /wp:wp-uswds/email-input -->
				</div>
				<!-- /wp:column -->

				<!-- wp:column -->
				<div class="wp-block-column">
					<!-- wp:wp-uswds/text-input {"label":"Phone Number","width":"full"} -->
					<div class="wp-block-wp-uswds-text-input usa-form-group">
						<label class="usa-label" for="text-input">Phone Number</label>
						<input class="usa-input" id="text-input" name="text-input" type="text" />
					</div>
					<!-- /wp:wp-uswds/text-input -->
				</div>
				<!-- /wp:column -->
			</div>
			<!-- /wp:columns -->

			<!-- wp:wp-uswds/select {"label":"Department","required":true,"options":[{"value":"general","label":"General Inquiries"},{"value":"health","label":"Health Services"},{"value":"education","label":"Education Department"},{"value":"business","label":"Business Services"},{"value":"social","label":"Social Services"},{"value":"safety","label":"Public Safety"},{"value":"tax","label":"Tax Services"},{"value":"other","label":"Other Department"}]} -->
			<div class="wp-block-wp-uswds-select usa-form-group">
				<label class="usa-label" for="select">Department <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
				<select class="usa-select" id="select" name="select" required>
					<option value="">- Select Department -</option>
					<option value="general">General Inquiries</option>
					<option value="health">Health Services</option>
					<option value="education">Education Department</option>
					<option value="business">Business Services</option>
					<option value="social">Social Services</option>
					<option value="safety">Public Safety</option>
					<option value="tax">Tax Services</option>
					<option value="other">Other Department</option>
				</select>
			</div>
			<!-- /wp:wp-uswds/select -->

			<!-- wp:wp-uswds/select {"label":"Inquiry Type","required":true,"options":[{"value":"question","label":"General Question"},{"value":"service","label":"Service Request"},{"value":"complaint","label":"Complaint or Issue"},{"value":"compliment","label":"Compliment or Feedback"},{"value":"application","label":"Application Status"},{"value":"appointment","label":"Schedule Appointment"}]} -->
			<div class="wp-block-wp-uswds-select usa-form-group">
				<label class="usa-label" for="select">Inquiry Type <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
				<select class="usa-select" id="select" name="select" required>
					<option value="">- Select Inquiry Type -</option>
					<option value="question">General Question</option>
					<option value="service">Service Request</option>
					<option value="complaint">Complaint or Issue</option>
					<option value="compliment">Compliment or Feedback</option>
					<option value="application">Application Status</option>
					<option value="appointment">Schedule Appointment</option>
				</select>
			</div>
			<!-- /wp:wp-uswds/select -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"},"margin":{"top":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
	<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;margin-top:2rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
		<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1.5rem","top":"0"}}},"textColor":"base-darkest"} -->
		<h3 class="wp-block-heading has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1.5rem;font-size:1.3rem;font-weight:600">Your Message</h3>
		<!-- /wp:heading -->

		<!-- wp:wp-uswds/text-input {"label":"Subject","required":true,"width":"full"} -->
		<div class="wp-block-wp-uswds-text-input usa-form-group">
			<label class="usa-label" for="text-input">Subject <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<input class="usa-input" id="text-input" name="text-input" type="text" required />
		</div>
		<!-- /wp:wp-uswds/text-input -->

		<!-- wp:wp-uswds/textarea {"label":"Detailed Message","required":true,"rows":6,"hint":"Please provide as much detail as possible to help us assist you effectively. Include relevant dates, reference numbers, or previous correspondence."} -->
		<div class="wp-block-wp-uswds-textarea usa-form-group">
			<label class="usa-label" for="textarea">Detailed Message <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<span class="usa-hint">Please provide as much detail as possible to help us assist you effectively. Include relevant dates, reference numbers, or previous correspondence.</span>
			<textarea class="usa-textarea" id="textarea" name="textarea" rows="6" required></textarea>
		</div>
		<!-- /wp:wp-uswds/textarea -->

		<!-- wp:wp-uswds/select {"label":"Preferred Response Method","options":[{"value":"email","label":"Email (fastest)"},{"value":"phone","label":"Phone Call"},{"value":"mail","label":"Postal Mail"}]} -->
		<div class="wp-block-wp-uswds-select usa-form-group">
			<label class="usa-label" for="select">Preferred Response Method</label>
			<select class="usa-select" id="select" name="select">
				<option value="email">Email (fastest)</option>
				<option value="phone">Phone Call</option>
				<option value="mail">Postal Mail</option>
			</select>
		</div>
		<!-- /wp:wp-uswds/select -->

		<!-- wp:wp-uswds/checkbox {"label":"I would like to receive updates about this inquiry via email","name":"email-updates"} -->
		<div class="wp-block-wp-uswds-checkbox usa-form-group">
			<div class="usa-checkbox">
				<input class="usa-checkbox__input" id="email-updates" type="checkbox" name="email-updates" />
				<label class="usa-checkbox__label" for="email-updates">I would like to receive updates about this inquiry via email</label>
			</div>
		</div>
		<!-- /wp:wp-uswds/checkbox -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"1rem"},"margin":{"top":"2rem"}}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group" style="margin-top:2rem;padding-top:2rem;padding-bottom:1rem">
		<!-- wp:wp-uswds/button {"text":"Submit Contact Form","url":"#","variant":"default"} -->
		<a class="wp-block-wp-uswds-button usa-button" href="#">Submit Contact Form</a>
		<!-- /wp:wp-uswds/button -->

		<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"spacing":{"margin":{"top":"1rem"}}},"textColor":"base-dark"} -->
		<p class="has-base-dark-color has-text-color" style="margin-top:1rem;font-size:0.9rem">⏱️ <strong>Response Time:</strong> We typically respond within 1-2 business days. For urgent matters, please call our main number.</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}},"textColor":"base-dark"} -->
		<p class="has-base-dark-color has-text-color" style="font-size:0.9rem">🔒 <strong>Privacy:</strong> Your information is protected by government privacy laws and will only be used to respond to your inquiry.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->