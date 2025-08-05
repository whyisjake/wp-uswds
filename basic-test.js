/**
 * Ultra-simple block test
 */

(function() {
	'use strict';

	wp.domReady(function() {
		wp.blocks.registerBlockType('wp-uswds/test-alert', {
			title: 'Test USWDS Alert',
			category: 'wp-uswds',
			icon: 'warning',
			attributes: {
				message: {
					type: 'string',
					default: 'This is a test alert'
				}
			},
			edit: function(props) {
				return wp.element.createElement('div', {
					className: 'usa-alert usa-alert--info',
					style: { padding: '20px', border: '2px solid #005ea2', margin: '10px 0' }
				}, [
					wp.element.createElement('strong', { key: 'label' }, 'USWDS Alert Block - '),
					wp.element.createElement('span', { key: 'message' }, props.attributes.message),
					wp.element.createElement('br', { key: 'br' }),
					wp.element.createElement('small', { key: 'help' }, '(This is the editor view)')
				]);
			},
			save: function(props) {
				return wp.element.createElement('div', {
					className: 'usa-alert usa-alert--info'
				}, 
					wp.element.createElement('div', { className: 'usa-alert__body' },
						wp.element.createElement('p', { className: 'usa-alert__text' },
							props.attributes.message
						)
					)
				);
			}
		});
	});

})();