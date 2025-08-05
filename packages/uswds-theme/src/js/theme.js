/**
 * USWDS WordPress Theme JavaScript
 * 
 * Initialize USWDS components and add WordPress-specific functionality
 */

// Import USWDS JavaScript
import uswds from '@uswds/uswds';

// WordPress-specific functionality
document.addEventListener('DOMContentLoaded', function() {
	// Initialize USWDS
	uswds.on();
	
	// WordPress admin bar compatibility
	initAdminBarCompatibility();
	
	// Smooth scrolling for anchor links
	initSmoothScrolling();
	
	// Accessibility enhancements
	initAccessibilityEnhancements();
	
	// Gutenberg block enhancements
	initGutenbergEnhancements();
});

/**
 * WordPress admin bar compatibility
 */
function initAdminBarCompatibility() {
	const adminBar = document.getElementById('wpadminbar');
	const header = document.querySelector('.usa-header');
	
	if (adminBar && header) {
		// Adjust header position when admin bar is present
		const adminBarHeight = adminBar.offsetHeight;
		header.style.top = adminBarHeight + 'px';
		
		// Adjust modal positioning
		const modals = document.querySelectorAll('.usa-modal');
		modals.forEach(modal => {
			modal.style.top = adminBarHeight + 'px';
		});
	}
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	
	anchorLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href').substring(1);
			const targetElement = document.getElementById(targetId);
			
			if (targetElement) {
				e.preventDefault();
				
				const headerHeight = document.querySelector('.usa-header')?.offsetHeight || 0;
				const adminBarHeight = document.getElementById('wpadminbar')?.offsetHeight || 0;
				const offset = headerHeight + adminBarHeight + 20;
				
				const targetPosition = targetElement.offsetTop - offset;
				
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
}

/**
 * Accessibility enhancements
 */
function initAccessibilityEnhancements() {
	// Skip link functionality
	const skipLink = document.querySelector('.usa-skipnav');
	if (skipLink) {
		skipLink.addEventListener('click', function(e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.focus();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	}
	
	// Improve focus management for mobile menu
	const menuButton = document.querySelector('.usa-menu-btn');
	const nav = document.querySelector('.usa-nav');
	const closeButton = document.querySelector('.usa-nav__close');
	
	if (menuButton && nav && closeButton) {
		menuButton.addEventListener('click', function() {
			// Focus first menu item when menu opens
			setTimeout(() => {
				const firstMenuItem = nav.querySelector('.usa-nav__link');
				if (firstMenuItem) {
					firstMenuItem.focus();
				}
			}, 100);
		});
		
		closeButton.addEventListener('click', function() {
			// Return focus to menu button when menu closes
			menuButton.focus();
		});
	}
	
	// Enhance keyboard navigation
	document.addEventListener('keydown', function(e) {
		// ESC key closes modals and mobile menu
		if (e.key === 'Escape') {
			const openModal = document.querySelector('.usa-modal[aria-hidden="false"]');
			if (openModal) {
				const closeBtn = openModal.querySelector('.usa-modal__close');
				if (closeBtn) closeBtn.click();
			}
			
			if (nav && !nav.hidden) {
				closeButton.click();
			}
		}
	});
}

/**
 * Gutenberg block enhancements
 */
function initGutenbergEnhancements() {
	// Enhance USWDS blocks with additional functionality
	initAccordionBlocks();
	initModalBlocks();
	initAlertBlocks();
}

/**
 * Initialize accordion blocks
 */
function initAccordionBlocks() {
	const accordions = document.querySelectorAll('.wp-block-wp-uswds-accordion');
	
	accordions.forEach(accordion => {
		// Add USWDS accordion functionality if not already present
		if (!accordion.classList.contains('usa-accordion')) {
			accordion.classList.add('usa-accordion');
		}
	});
}

/**
 * Initialize modal blocks
 */
function initModalBlocks() {
	const modalTriggers = document.querySelectorAll('[data-open-modal]');
	
	modalTriggers.forEach(trigger => {
		trigger.addEventListener('click', function(e) {
			e.preventDefault();
			const modalId = this.getAttribute('data-open-modal');
			const modal = document.getElementById(modalId);
			
			if (modal) {
				// Use USWDS modal functionality
				modal.hidden = false;
				modal.setAttribute('aria-hidden', 'false');
				
				// Focus first focusable element in modal
				const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
				if (focusable) {
					focusable.focus();
				}
			}
		});
	});
}

/**
 * Initialize alert blocks
 */
function initAlertBlocks() {
	const dismissibleAlerts = document.querySelectorAll('.wp-block-wp-uswds-alert[data-dismissible="true"]');
	
	dismissibleAlerts.forEach(alert => {
		// Add dismiss button if not present
		if (!alert.querySelector('.usa-alert__dismiss')) {
			const dismissBtn = document.createElement('button');
			dismissBtn.className = 'usa-alert__dismiss';
			dismissBtn.innerHTML = '&times;';
			dismissBtn.setAttribute('aria-label', 'Dismiss alert');
			
			dismissBtn.addEventListener('click', function() {
				alert.style.display = 'none';
			});
			
			alert.appendChild(dismissBtn);
		}
	});
}

// Export for potential use by other scripts
window.USWDSTheme = {
	initAdminBarCompatibility,
	initSmoothScrolling,
	initAccessibilityEnhancements,
	initGutenbergEnhancements
};