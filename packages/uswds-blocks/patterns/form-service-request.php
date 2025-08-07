<?php
/**
 * Title: Government Service Request Form
 * Slug: wp-uswds/form-service-request
 * Categories: wp-uswds-forms
 * Description: Comprehensive form for citizens to request government services and assistance
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-right:2rem;padding-bottom:3rem;padding-left:2rem">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"2rem","fontWeight":"700","lineHeight":"1.3"},"spacing":{"margin":{"bottom":"1rem","top":"0"}}},"textColor":"base-darkest"} -->
	<h2 class="wp-block-heading has-text-align-center has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1rem;font-size:2rem;font-weight:700;line-height:1.3">Government Service Request</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"2rem"}}},"textColor":"base-dark"} -->
	<p class="has-text-align-center has-base-dark-color has-text-color" style="margin-bottom:2rem;font-size:1.1rem;line-height:1.6">Request assistance with government services, programs, or applications. Complete this form to start your service request process.</p>
	<!-- /wp:paragraph -->

	<!-- wp:wp-uswds/alert {"type":"warning","heading":"Important Information"} -->
	<div class="wp-block-wp-uswds-alert usa-alert usa-alert--warning">
		<div class="usa-alert__body">
			<h4 class="usa-alert__heading">Important Information</h4>
			<!-- wp:paragraph -->
			<p>Some services may require additional documentation or verification. Processing times vary by service type. For emergencies, contact 911 or your local emergency services.</p>
			<!-- /wp:paragraph -->
		</div>
	</div>
	<!-- /wp:wp-uswds/alert -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"},"margin":{"top":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
	<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;margin-top:2rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
		<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1.5rem","top":"0"}}},"textColor":"base-darkest"} -->
		<h3 class="wp-block-heading has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1.5rem;font-size:1.3rem;font-weight:600">Personal Information</h3>
		<!-- /wp:heading -->

		<!-- wp:columns -->
		<div class="wp-block-columns">
			<!-- wp:column -->
			<div class="wp-block-column">
				<!-- wp:wp-uswds/text-input {"label":"First Name","required":true,"width":"full"} -->
				<div class="wp-block-wp-uswds-text-input usa-form-group">
					<label class="usa-label" for="text-input">First Name <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
					<input class="usa-input" id="text-input" name="text-input" type="text" required />
				</div>
				<!-- /wp:wp-uswds/text-input -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column -->
			<div class="wp-block-column">
				<!-- wp:wp-uswds/text-input {"label":"Last Name","required":true,"width":"full"} -->
				<div class="wp-block-wp-uswds-text-input usa-form-group">
					<label class="usa-label" for="text-input">Last Name <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
					<input class="usa-input" id="text-input" name="text-input" type="text" required />
				</div>
				<!-- /wp:wp-uswds/text-input -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->

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
				<!-- wp:wp-uswds/text-input {"label":"Phone Number","required":true,"width":"full"} -->
				<div class="wp-block-wp-uswds-text-input usa-form-group">
					<label class="usa-label" for="text-input">Phone Number <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
					<input class="usa-input" id="text-input" name="text-input" type="text" required />
				</div>
				<!-- /wp:wp-uswds/text-input -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->

		<!-- wp:wp-uswds/text-input {"label":"Street Address","required":true,"width":"full"} -->
		<div class="wp-block-wp-uswds-text-input usa-form-group">
			<label class="usa-label" for="text-input">Street Address <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<input class="usa-input" id="text-input" name="text-input" type="text" required />
		</div>
		<!-- /wp:wp-uswds/text-input -->

		<!-- wp:columns -->
		<div class="wp-block-columns">
			<!-- wp:column {"width":"50%"} -->
			<div class="wp-block-column" style="flex-basis:50%">
				<!-- wp:wp-uswds/text-input {"label":"City","required":true,"width":"full"} -->
				<div class="wp-block-wp-uswds-text-input usa-form-group">
					<label class="usa-label" for="text-input">City <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
					<input class="usa-input" id="text-input" name="text-input" type="text" required />
				</div>
				<!-- /wp:wp-uswds/text-input -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"width":"25%"} -->
			<div class="wp-block-column" style="flex-basis:25%">
				<!-- wp:wp-uswds/text-input {"label":"State","required":true,"width":"full"} -->
				<div class="wp-block-wp-uswds-text-input usa-form-group">
					<label class="usa-label" for="text-input">State <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
					<input class="usa-input" id="text-input" name="text-input" type="text" required />
				</div>
				<!-- /wp:wp-uswds/text-input -->
			</div>
			<!-- /wp:column -->

			<!-- wp:column {"width":"25%"} -->
			<div class="wp-block-column" style="flex-basis:25%">
				<!-- wp:wp-uswds/text-input {"label":"ZIP Code","required":true,"width":"full"} -->
				<div class="wp-block-wp-uswds-text-input usa-form-group">
					<label class="usa-label" for="text-input">ZIP Code <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
					<input class="usa-input" id="text-input" name="text-input" type="text" required />
				</div>
				<!-- /wp:wp-uswds/text-input -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"},"margin":{"top":"2rem"}},"border":{"radius":"8px","width":"1px","style":"solid","color":"#dfe1e2"}},"backgroundColor":"base-lightest","layout":{"type":"constrained"}} -->
	<div class="wp-block-group has-border-color has-base-lightest-background-color has-background" style="border-color:#dfe1e2;border-style:solid;border-width:1px;border-radius:8px;margin-top:2rem;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
		<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"600"},"spacing":{"margin":{"bottom":"1.5rem","top":"0"}}},"textColor":"base-darkest"} -->
		<h3 class="wp-block-heading has-base-darkest-color has-text-color" style="margin-top:0;margin-bottom:1.5rem;font-size:1.3rem;font-weight:600">Service Request Details</h3>
		<!-- /wp:heading -->

		<!-- wp:wp-uswds/select {"label":"Service Category","required":true,"options":[{"value":"health","label":"Health & Medical Services"},{"value":"social","label":"Social Services & Benefits"},{"value":"education","label":"Education & Student Services"},{"value":"business","label":"Business & Professional Services"},{"value":"housing","label":"Housing & Community Development"},{"value":"transportation","label":"Transportation & Infrastructure"},{"value":"legal","label":"Legal & Court Services"},{"value":"tax","label":"Tax & Revenue Services"},{"value":"employment","label":"Employment & Workforce Services"},{"value":"other","label":"Other Government Services"}]} -->
		<div class="wp-block-wp-uswds-select usa-form-group">
			<label class="usa-label" for="select">Service Category <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<select class="usa-select" id="select" name="select" required>
				<option value="">- Select Service Category -</option>
				<option value="health">Health & Medical Services</option>
				<option value="social">Social Services & Benefits</option>
				<option value="education">Education & Student Services</option>
				<option value="business">Business & Professional Services</option>
				<option value="housing">Housing & Community Development</option>
				<option value="transportation">Transportation & Infrastructure</option>
				<option value="legal">Legal & Court Services</option>
				<option value="tax">Tax & Revenue Services</option>
				<option value="employment">Employment & Workforce Services</option>
				<option value="other">Other Government Services</option>
			</select>
		</div>
		<!-- /wp:wp-uswds/select -->

		<!-- wp:wp-uswds/select {"label":"Priority Level","required":true,"options":[{"value":"routine","label":"Routine (Standard Processing)"},{"value":"urgent","label":"Urgent (Expedited Processing)"},{"value":"emergency","label":"Emergency (Immediate Attention)"}]} -->
		<div class="wp-block-wp-uswds-select usa-form-group">
			<label class="usa-label" for="select">Priority Level <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<select class="usa-select" id="select" name="select" required>
				<option value="">- Select Priority Level -</option>
				<option value="routine">Routine (Standard Processing)</option>
				<option value="urgent">Urgent (Expedited Processing)</option>
				<option value="emergency">Emergency (Immediate Attention)</option>
			</select>
		</div>
		<!-- /wp:wp-uswds/select -->

		<!-- wp:wp-uswds/text-input {"label":"Specific Service Requested","required":true,"width":"full","hint":"Please specify the exact service, program, or assistance you need"} -->
		<div class="wp-block-wp-uswds-text-input usa-form-group">
			<label class="usa-label" for="text-input">Specific Service Requested <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<span class="usa-hint">Please specify the exact service, program, or assistance you need</span>
			<input class="usa-input" id="text-input" name="text-input" type="text" required />
		</div>
		<!-- /wp:wp-uswds/text-input -->

		<!-- wp:wp-uswds/textarea {"label":"Detailed Description","required":true,"rows":5,"hint":"Provide a complete description of your situation and what assistance you need. Include relevant background information, dates, and any previous interactions with our office."} -->
		<div class="wp-block-wp-uswds-textarea usa-form-group">
			<label class="usa-label" for="textarea">Detailed Description <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			<span class="usa-hint">Provide a complete description of your situation and what assistance you need. Include relevant background information, dates, and any previous interactions with our office.</span>
			<textarea class="usa-textarea" id="textarea" name="textarea" rows="5" required></textarea>
		</div>
		<!-- /wp:wp-uswds/textarea -->

		<!-- wp:wp-uswds/checkbox-group {"legend":"Additional Requirements","options":[{"value":"translation","label":"Translation services needed"},{"value":"accessibility","label":"Accessibility accommodations required"},{"value":"appointment","label":"In-person appointment preferred"},{"value":"documentation","label":"Need help with required documentation"}]} -->
		<fieldset class="wp-block-wp-uswds-checkbox-group usa-fieldset">
			<legend class="usa-legend">Additional Requirements</legend>
			<div class="usa-checkbox">
				<input class="usa-checkbox__input" id="translation" type="checkbox" name="requirements[]" value="translation" />
				<label class="usa-checkbox__label" for="translation">Translation services needed</label>
			</div>
			<div class="usa-checkbox">
				<input class="usa-checkbox__input" id="accessibility" type="checkbox" name="requirements[]" value="accessibility" />
				<label class="usa-checkbox__label" for="accessibility">Accessibility accommodations required</label>
			</div>
			<div class="usa-checkbox">
				<input class="usa-checkbox__input" id="appointment" type="checkbox" name="requirements[]" value="appointment" />
				<label class="usa-checkbox__label" for="appointment">In-person appointment preferred</label>
			</div>
			<div class="usa-checkbox">
				<input class="usa-checkbox__input" id="documentation" type="checkbox" name="requirements[]" value="documentation" />
				<label class="usa-checkbox__label" for="documentation">Need help with required documentation</label>
			</div>
		</fieldset>
		<!-- /wp:wp-uswds/checkbox-group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"1rem"},"margin":{"top":"2rem"}}},"layout":{"type":"constrained"}} -->
	<div class="wp-block-group" style="margin-top:2rem;padding-top:2rem;padding-bottom:1rem">
		<!-- wp:wp-uswds/checkbox {"label":"I certify that the information provided is accurate and complete","name":"certification","required":true} -->
		<div class="wp-block-wp-uswds-checkbox usa-form-group">
			<div class="usa-checkbox">
				<input class="usa-checkbox__input" id="certification" type="checkbox" name="certification" required />
				<label class="usa-checkbox__label" for="certification">I certify that the information provided is accurate and complete <abbr title="required" class="usa-hint usa-hint--required">*</abbr></label>
			</div>
		</div>
		<!-- /wp:wp-uswds/checkbox -->

		<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"left"}} -->
		<div class="wp-block-group">
			<!-- wp:wp-uswds/button {"text":"Submit Service Request","url":"#","variant":"default"} -->
			<a class="wp-block-wp-uswds-button usa-button" href="#">Submit Service Request</a>
			<!-- /wp:wp-uswds/button -->

			<!-- wp:wp-uswds/button {"text":"Save as Draft","url":"#","variant":"outline"} -->
			<a class="wp-block-wp-uswds-button usa-button usa-button--outline" href="#">Save as Draft</a>
			<!-- /wp:wp-uswds/button -->
		</div>
		<!-- /wp:group -->

		<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"spacing":{"margin":{"top":"1.5rem"}}},"textColor":"base-dark"} -->
		<p class="has-base-dark-color has-text-color" style="margin-top:1.5rem;font-size:0.9rem">📋 <strong>What happens next:</strong> You'll receive a confirmation email with your request number. We'll review your request and contact you within 3-5 business days with next steps.</p>
		<!-- /wp:paragraph -->

		<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}},"textColor":"base-dark"} -->
		<p class="has-base-dark-color has-text-color" style="font-size:0.9rem">🔒 <strong>Privacy:</strong> Your information is protected under government privacy laws and will only be used to process your service request.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->