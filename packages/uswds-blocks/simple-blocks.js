/**
 * Simple USWDS Blocks Registration
 * 
 * Manually register blocks for testing purposes
 */

(function() {
	'use strict';

	const { registerBlockType } = wp.blocks;
	const { __ } = wp.i18n;
	const { useBlockProps, InspectorControls, RichText } = wp.blockEditor;
	const { PanelBody, SelectControl, ToggleControl, TextControl } = wp.components;
	const { createElement: el } = wp.element;

	// Register Alert Block
	registerBlockType('wp-uswds/alert', {
		title: __('USWDS Alert', 'wp-uswds'),
		description: __('Keep users informed of important and sometimes time-sensitive changes.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'warning',
		attributes: {
			type: {
				type: 'string',
				default: 'info'
			},
			heading: {
				type: 'string',
				default: ''
			},
			slim: {
				type: 'boolean',
				default: false
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { type, heading, slim } = attributes;

			const blockProps = useBlockProps({
				className: `usa-alert usa-alert--${type}${slim ? ' usa-alert--slim' : ''}`
			});

			const alertTypes = [
				{ label: __('Info', 'wp-uswds'), value: 'info' },
				{ label: __('Warning', 'wp-uswds'), value: 'warning' },
				{ label: __('Error', 'wp-uswds'), value: 'error' },
				{ label: __('Success', 'wp-uswds'), value: 'success' },
				{ label: __('Emergency', 'wp-uswds'), value: 'emergency' },
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' }, 
					el(PanelBody, { title: __('Alert Settings', 'wp-uswds') }, [
						el(SelectControl, {
							key: 'type',
							label: __('Alert Type', 'wp-uswds'),
							value: type,
							options: alertTypes,
							onChange: function(value) { setAttributes({ type: value }); }
						}),
						el(ToggleControl, {
							key: 'slim',
							label: __('Slim variant', 'wp-uswds'),
							checked: slim,
							onChange: function(value) { setAttributes({ slim: value }); }
						})
					])
				),
				el('div', blockProps, 
					el('div', { className: 'usa-alert__body' }, [
						!slim && el(RichText, {
							key: 'heading',
							tagName: 'h4',
							className: 'usa-alert__heading',
							value: heading,
							onChange: function(value) { setAttributes({ heading: value }); },
							placeholder: __('Alert heading...', 'wp-uswds')
						}),
						el(wp.blockEditor.InnerBlocks, {
							key: 'content',
							template: [
								['core/paragraph', { 
									placeholder: 'Add alert content here. You can add any blocks - text, images, buttons, lists, etc.',
									className: 'usa-alert__text'
								}]
							],
							templateLock: false
						})
					])
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { type, heading, slim } = attributes;

			return el('div', {
				className: `usa-alert usa-alert--${type}${slim ? ' usa-alert--slim' : ''}`
			},
				el('div', { className: 'usa-alert__body' }, [
					!slim && heading && el('h4', {
						key: 'heading',
						className: 'usa-alert__heading',
						dangerouslySetInnerHTML: { __html: heading }
					}),
					el(wp.blockEditor.InnerBlocks.Content)
				])
			);
		}
	});

	// Register Button Block
	registerBlockType('wp-uswds/button', {
		title: __('USWDS Button', 'wp-uswds'),
		description: __('A button component following USWDS design patterns.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'button',
		attributes: {
			text: {
				type: 'string',
				default: 'Button'
			},
			url: {
				type: 'string',
				default: ''
			},
			variant: {
				type: 'string',
				default: 'default'
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { text, url, variant } = attributes;

			const blockProps = useBlockProps({
				className: `usa-button${variant !== 'default' ? ` usa-button--${variant}` : ''}`
			});

			const variantOptions = [
				{ label: __('Default', 'wp-uswds'), value: 'default' },
				{ label: __('Secondary', 'wp-uswds'), value: 'secondary' },
				{ label: __('Outline', 'wp-uswds'), value: 'outline' },
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Button Settings', 'wp-uswds') }, [
						el(SelectControl, {
							key: 'variant',
							label: __('Button Variant', 'wp-uswds'),
							value: variant,
							options: variantOptions,
							onChange: function(value) { setAttributes({ variant: value }); }
						}),
						el(TextControl, {
							key: 'url',
							label: __('Link URL', 'wp-uswds'),
							value: url,
							onChange: function(value) { setAttributes({ url: value }); }
						})
					])
				),
				el('div', blockProps,
					el(RichText, {
						tagName: url ? 'a' : 'button',
						className: blockProps.className,
						value: text,
						onChange: function(value) { setAttributes({ text: value }); },
						placeholder: __('Add button text...', 'wp-uswds')
					})
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { text, url, variant } = attributes;

			const className = `usa-button${variant !== 'default' ? ` usa-button--${variant}` : ''}`;

			if (url) {
				return el('a', {
					className: className,
					href: url,
					dangerouslySetInnerHTML: { __html: text }
				});
			}

			return el('button', {
				className: className,
				type: 'button',
				dangerouslySetInnerHTML: { __html: text }
			});
		}
	});

	// Register Card Block
	registerBlockType('wp-uswds/card', {
		title: __('USWDS Card', 'wp-uswds'),
		description: __('Cards contain content and actions about a single subject.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'id-alt',
		attributes: {
			heading: {
				type: 'string',
				default: 'Card Title'
			},
			media: {
				type: 'string',
				default: ''
			},
			flag: {
				type: 'boolean',
				default: false
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { heading, media, flag } = attributes;

			const blockProps = useBlockProps({
				className: `usa-card${flag ? ' usa-card--flag' : ''}`
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Card Settings', 'wp-uswds') }, [
						el(ToggleControl, {
							key: 'flag',
							label: __('Flag layout', 'wp-uswds'),
							checked: flag,
							onChange: function(value) { setAttributes({ flag: value }); }
						}),
						el(TextControl, {
							key: 'media',
							label: __('Media URL (optional)', 'wp-uswds'),
							value: media,
							onChange: function(value) { setAttributes({ media: value }); }
						})
					])
				),
				el('div', blockProps, 
					el('div', { className: 'usa-card__container' }, [
						media && el('div', {
							key: 'media',
							className: flag ? 'usa-card__media usa-card__media--inset' : 'usa-card__media'
						},
							el('div', { className: 'usa-card__img' },
								el('img', { src: media, alt: '' })
							)
						),
						el('div', { key: 'body', className: 'usa-card__body' }, [
							el(RichText, {
								key: 'heading',
								tagName: 'h3',
								className: 'usa-card__heading',
								value: heading,
								onChange: function(value) { setAttributes({ heading: value }); },
								placeholder: __('Card heading...', 'wp-uswds')
							}),
							el(wp.blockEditor.InnerBlocks, {
								template: [
									['core/paragraph', { placeholder: 'Add card content here. You can add any blocks - text, images, buttons, etc.' }]
								],
								templateLock: false
							})
						])
					])
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { heading, media, flag } = attributes;

			return el('div', {
				className: `usa-card${flag ? ' usa-card--flag' : ''}`
			},
				el('div', { className: 'usa-card__container' }, [
					media && el('div', {
						key: 'media',
						className: flag ? 'usa-card__media usa-card__media--inset' : 'usa-card__media'
					},
						el('div', { className: 'usa-card__img' },
							el('img', { src: media, alt: '' })
						)
					),
					el('div', { key: 'body', className: 'usa-card__body' }, [
						heading && el('h3', {
							key: 'heading',
							className: 'usa-card__heading',
							dangerouslySetInnerHTML: { __html: heading }
						}),
						el(wp.blockEditor.InnerBlocks.Content)
					])
				])
			);
		}
	});

	// Register Tag Block
	registerBlockType('wp-uswds/tag', {
		title: __('USWDS Tag', 'wp-uswds'),
		description: __('A tag draws attention to new or categorized content elements.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'tag',
		attributes: {
			text: {
				type: 'string',
				default: 'Tag'
			},
			big: {
				type: 'boolean',
				default: false
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { text, big } = attributes;

			const blockProps = useBlockProps({
				className: `usa-tag${big ? ' usa-tag--big' : ''}`
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Tag Settings', 'wp-uswds') },
						el(ToggleControl, {
							label: __('Big variant', 'wp-uswds'),
							checked: big,
							onChange: function(value) { setAttributes({ big: value }); }
						})
					)
				),
				el(RichText, {
					...blockProps,
					tagName: 'span',
					value: text,
					onChange: function(value) { setAttributes({ text: value }); },
					placeholder: __('Tag text...', 'wp-uswds')
				})
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { text, big } = attributes;

			return el('span', {
				className: `usa-tag${big ? ' usa-tag--big' : ''}`,
				dangerouslySetInnerHTML: { __html: text }
			});
		}
	});

	// Register Summary Box Block
	registerBlockType('wp-uswds/summary-box', {
		title: __('USWDS Summary Box', 'wp-uswds'),
		description: __('A summary box highlights key information from a longer page.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'info',
		attributes: {
			heading: {
				type: 'string',
				default: 'Summary'
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { heading } = attributes;

			const blockProps = useBlockProps({
				className: 'usa-summary-box'
			});

			return el('div', blockProps,
				el('div', { className: 'usa-summary-box__body' }, [
					el(RichText, {
						key: 'heading',
						tagName: 'h3',
						className: 'usa-summary-box__heading',
						value: heading,
						onChange: function(value) { setAttributes({ heading: value }); },
						placeholder: __('Summary heading...', 'wp-uswds')
					}),
					el('div', { key: 'text', className: 'usa-summary-box__text' },
						el(wp.blockEditor.InnerBlocks, {
							template: [
								['core/paragraph', { placeholder: 'Add your summary content here. You can add any blocks - text, images, lists, etc.' }]
							],
							templateLock: false
						})
					)
				])
			);
		},
		save: function(props) {
			const { attributes } = props;
			const { heading } = attributes;

			return el('div', {
				className: 'usa-summary-box'
			},
				el('div', { className: 'usa-summary-box__body' }, [
					heading && el('h3', {
						key: 'heading',
						className: 'usa-summary-box__heading',
						dangerouslySetInnerHTML: { __html: heading }
					}),
					el('div', {
						key: 'text',
						className: 'usa-summary-box__text'
					},
						el(wp.blockEditor.InnerBlocks.Content)
					)
				])
			);
		}
	});

	// Register Accordion Block
	registerBlockType('wp-uswds/accordion', {
		title: __('USWDS Accordion', 'wp-uswds'),
		description: __('An accordion is a list of headers that hide or reveal additional content when selected.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'menu-alt',
		attributes: {
			bordered: {
				type: 'boolean',
				default: false
			},
			multiselectable: {
				type: 'boolean',
				default: false
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { bordered, multiselectable } = attributes;

			const blockProps = useBlockProps({
				className: `usa-accordion${bordered ? ' usa-accordion--bordered' : ''}${multiselectable ? ' usa-accordion--multiselectable' : ''}`
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Accordion Settings', 'wp-uswds') }, [
						el(ToggleControl, {
							key: 'bordered',
							label: __('Bordered variant', 'wp-uswds'),
							checked: bordered,
							onChange: function(value) { setAttributes({ bordered: value }); }
						}),
						el(ToggleControl, {
							key: 'multiselectable',
							label: __('Allow multiple sections open', 'wp-uswds'),
							checked: multiselectable,
							onChange: function(value) { setAttributes({ multiselectable: value }); }
						})
					])
				),
				el('div', blockProps,
					el(wp.blockEditor.InnerBlocks, {
						allowedBlocks: ['wp-uswds/accordion-item'],
						template: [
							['wp-uswds/accordion-item', { heading: 'First Amendment' }]
						],
						templateLock: false
					})
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { bordered, multiselectable } = attributes;

			return el('div', {
				className: `usa-accordion${bordered ? ' usa-accordion--bordered' : ''}${multiselectable ? ' usa-accordion--multiselectable' : ''}`,
				'data-allow-multiple': multiselectable
			},
				el(wp.blockEditor.InnerBlocks.Content)
			);
		}
	});

	// Register Accordion Item Block
	registerBlockType('wp-uswds/accordion-item', {
		title: __('USWDS Accordion Item', 'wp-uswds'),
		description: __('An individual accordion section with heading and content.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'menu-alt',
		parent: ['wp-uswds/accordion'],
		attributes: {
			heading: {
				type: 'string',
				default: 'Accordion Section'
			},
			uniqueId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { heading, uniqueId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!uniqueId) {
				setAttributes({ uniqueId: `accordion-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-accordion__item'
			});

			return el('div', blockProps, [
				el('h4', { key: 'heading', className: 'usa-accordion__heading' },
					el('button', {
						type: 'button',
						className: 'usa-accordion__button',
						'aria-expanded': 'true',
						'aria-controls': `accordion-${clientId}`
					},
						el(RichText, {
							tagName: 'span',
							value: heading,
							onChange: function(value) { setAttributes({ heading: value }); },
							placeholder: __('Section heading...', 'wp-uswds')
						})
					)
				),
				el('div', {
					key: 'content',
					id: uniqueId || `accordion-${clientId}`,
					className: 'usa-accordion__content usa-prose'
				},
					el(wp.blockEditor.InnerBlocks, {
						template: [
							['core/paragraph', { placeholder: 'Add your accordion content here. You can add images, text, other blocks...' }]
						],
						templateLock: false
					})
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { heading, uniqueId } = attributes;

			return el('div', {
				className: 'usa-accordion__item'
			}, [
				el('h4', { key: 'heading', className: 'usa-accordion__heading' },
					el('button', {
						type: 'button',
						className: 'usa-accordion__button',
						'aria-expanded': 'false',
						'aria-controls': uniqueId
					}, heading)
				),
				el('div', {
					key: 'content',
					id: uniqueId,
					className: 'usa-accordion__content usa-prose',
					hidden: true
				},
					el(wp.blockEditor.InnerBlocks.Content)
				)
			]);
		}
	});

	// Register Process List Block
	registerBlockType('wp-uswds/process-list', {
		title: __('USWDS Process List', 'wp-uswds'),
		description: __('A process list displays the steps or stages of important instructions.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'list-view',
		attributes: {
			steps: {
				type: 'array',
				default: [
					{ heading: 'Start the application', content: 'Complete the form and submit your information.' },
					{ heading: 'Provide supporting documents', content: 'Upload any required documentation.' }
				]
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { steps } = attributes;

			const blockProps = useBlockProps({
				className: 'usa-process-list'
			});

			const updateStep = function(index, field, value) {
				const newSteps = [...steps];
				newSteps[index] = { ...newSteps[index], [field]: value };
				setAttributes({ steps: newSteps });
			};

			const addStep = function() {
				const newSteps = [...steps, { heading: 'New Step', content: '' }];
				setAttributes({ steps: newSteps });
			};

			const removeStep = function(index) {
				const newSteps = steps.filter((_, i) => i !== index);
				setAttributes({ steps: newSteps });
			};

			return el('ol', blockProps,
				steps.map(function(step, index) {
					return el('li', { 
						key: index,
						className: 'usa-process-list__item'
					}, [
						el(RichText, {
							key: 'heading',
							tagName: 'h4',
							className: 'usa-process-list__heading',
							value: step.heading,
							onChange: function(value) { updateStep(index, 'heading', value); },
							placeholder: __('Step heading...', 'wp-uswds')
						}),
						el(RichText, {
							key: 'content',
							tagName: 'p',
							value: step.content,
							onChange: function(value) { updateStep(index, 'content', value); },
							placeholder: __('Step description...', 'wp-uswds')
						}),
						el('div', { key: 'controls', style: { marginTop: '10px' } }, [
							el('button', {
								key: 'remove',
								type: 'button',
								className: 'button button-secondary',
								onClick: function() { removeStep(index); },
								style: { marginRight: '10px' }
							}, __('Remove Step', 'wp-uswds')),
							index === steps.length - 1 && el('button', {
								key: 'add',
								type: 'button',
								className: 'button button-primary',
								onClick: addStep
							}, __('Add Step', 'wp-uswds'))
						])
					]);
				})
			);
		},
		save: function(props) {
			const { attributes } = props;
			const { steps } = attributes;

			return el('ol', {
				className: 'usa-process-list'
			},
				steps.map(function(step, index) {
					return el('li', { 
						key: index,
						className: 'usa-process-list__item'
					}, [
						step.heading && el('h4', {
							key: 'heading',
							className: 'usa-process-list__heading',
							dangerouslySetInnerHTML: { __html: step.heading }
						}),
						step.content && el('p', {
							key: 'content',
							dangerouslySetInnerHTML: { __html: step.content }
						})
					]);
				})
			);
		}
	});

	// Register Step Indicator Block
	registerBlockType('wp-uswds/step-indicator', {
		title: __('USWDS Step Indicator', 'wp-uswds'),
		description: __('A step indicator updates users on their progress through a multi-step process.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'controls-forward',
		attributes: {
			steps: {
				type: 'array',
				default: [
					{ label: 'Personal information', status: 'complete' },
					{ label: 'Household status', status: 'current' },
					{ label: 'Supporting documents', status: 'incomplete' },
					{ label: 'Review and submit', status: 'incomplete' }
				]
			},
			showLabels: {
				type: 'boolean',
				default: true
			},
			showCounters: {
				type: 'boolean',
				default: true
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { steps, showLabels, showCounters } = attributes;

			const blockProps = useBlockProps({
				className: `usa-step-indicator${!showLabels ? ' usa-step-indicator--no-labels' : ''}${!showCounters ? ' usa-step-indicator--no-counters' : ''}`
			});

			const updateStep = function(index, field, value) {
				const newSteps = [...steps];
				newSteps[index] = { ...newSteps[index], [field]: value };
				setAttributes({ steps: newSteps });
			};

			const statusOptions = [
				{ label: __('Incomplete', 'wp-uswds'), value: 'incomplete' },
				{ label: __('Current', 'wp-uswds'), value: 'current' },
				{ label: __('Complete', 'wp-uswds'), value: 'complete' }
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Step Indicator Settings', 'wp-uswds') }, [
						el(ToggleControl, {
							key: 'showLabels',
							label: __('Show step labels', 'wp-uswds'),
							checked: showLabels,
							onChange: function(value) { setAttributes({ showLabels: value }); }
						}),
						el(ToggleControl, {
							key: 'showCounters',
							label: __('Show step counters', 'wp-uswds'),
							checked: showCounters,
							onChange: function(value) { setAttributes({ showCounters: value }); }
						})
					])
				),
				el('div', blockProps,
					el('ol', { className: 'usa-step-indicator__segments' },
						steps.map(function(step, index) {
							return el('li', {
								key: index,
								className: `usa-step-indicator__segment usa-step-indicator__segment--${step.status}`
							}, [
								el('span', {
									key: 'marker',
									className: 'usa-step-indicator__segment-marker'
								}, showCounters ? (index + 1).toString() : ''),
								showLabels && el('span', {
									key: 'label',
									className: 'usa-step-indicator__segment-label'
								},
									el(RichText, {
										tagName: 'span',
										value: step.label,
										onChange: function(value) { updateStep(index, 'label', value); },
										placeholder: __('Step label...', 'wp-uswds')
									})
								),
								el('div', { key: 'controls', style: { marginTop: '5px' } },
									el(SelectControl, {
										label: __('Status', 'wp-uswds'),
										value: step.status,
										options: statusOptions,
										onChange: function(value) { updateStep(index, 'status', value); }
									})
								)
							]);
						})
					)
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { steps, showLabels, showCounters } = attributes;

			return el('div', {
				className: `usa-step-indicator${!showLabels ? ' usa-step-indicator--no-labels' : ''}${!showCounters ? ' usa-step-indicator--no-counters' : ''}`
			},
				el('ol', { className: 'usa-step-indicator__segments' },
					steps.map(function(step, index) {
						return el('li', {
							key: index,
							className: `usa-step-indicator__segment usa-step-indicator__segment--${step.status}`
						}, [
							el('span', {
								key: 'marker',
								className: 'usa-step-indicator__segment-marker'
							}, showCounters ? (index + 1).toString() : ''),
							showLabels && step.label && el('span', {
								key: 'label',
								className: 'usa-step-indicator__segment-label',
								dangerouslySetInnerHTML: { __html: step.label }
							})
						]);
					})
				)
			);
		}
	});

	// Register Icon List Block
	registerBlockType('wp-uswds/icon-list', {
		title: __('USWDS Icon List', 'wp-uswds'),
		description: __('An icon list reinforces the meaning and visibility of individual list items.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'editor-ul',
		attributes: {
			items: {
				type: 'array',
				default: [
					{ text: 'Donate to support the project', icon: 'favorite' },
					{ text: 'Join our team as a volunteer', icon: 'public' }
				]
			},
			size: {
				type: 'string',
				default: 'default'
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { items, size } = attributes;

			const blockProps = useBlockProps({
				className: `usa-icon-list${size !== 'default' ? ` usa-icon-list--size-${size}` : ''}`
			});

			const updateItem = function(index, field, value) {
				const newItems = [...items];
				newItems[index] = { ...newItems[index], [field]: value };
				setAttributes({ items: newItems });
			};

			const addItem = function() {
				const newItems = [...items, { text: 'New item', icon: 'star' }];
				setAttributes({ items: newItems });
			};

			const removeItem = function(index) {
				const newItems = items.filter((_, i) => i !== index);
				setAttributes({ items: newItems });
			};

			const sizeOptions = [
				{ label: __('Default', 'wp-uswds'), value: 'default' },
				{ label: __('Large', 'wp-uswds'), value: 'lg' },
				{ label: __('Extra Large', 'wp-uswds'), value: 'xl' }
			];

			const iconOptions = [
				{ label: __('Star', 'wp-uswds'), value: 'star' },
				{ label: __('Favorite', 'wp-uswds'), value: 'favorite' },
				{ label: __('Public', 'wp-uswds'), value: 'public' },
				{ label: __('Check Circle', 'wp-uswds'), value: 'check_circle' },
				{ label: __('Info', 'wp-uswds'), value: 'info' },
				{ label: __('Warning', 'wp-uswds'), value: 'warning' }
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Icon List Settings', 'wp-uswds') },
						el(SelectControl, {
							label: __('Icon Size', 'wp-uswds'),
							value: size,
							options: sizeOptions,
							onChange: function(value) { setAttributes({ size: value }); }
						})
					)
				),
				el('ul', blockProps,
					items.map(function(item, index) {
						return el('li', { 
							key: index,
							className: 'usa-icon-list__item'
						}, [
							el('div', { key: 'content', className: 'usa-icon-list__content' }, [
								el('span', { key: 'icon', className: `usa-icon-list__icon usa-icon--size-${size !== 'default' ? size : 'md'}` },
									el('svg', {
										className: 'usa-icon',
										'aria-hidden': 'true',
										focusable: 'false',
										role: 'img'
									}, `[${item.icon}]`) // Placeholder for icon
								),
								el(RichText, {
									key: 'text',
									tagName: 'span',
									value: item.text,
									onChange: function(value) { updateItem(index, 'text', value); },
									placeholder: __('List item text...', 'wp-uswds')
								})
							]),
							el('div', { key: 'controls', style: { marginTop: '5px' } }, [
								el(SelectControl, {
									key: 'icon-select',
									label: __('Icon', 'wp-uswds'),
									value: item.icon,
									options: iconOptions,
									onChange: function(value) { updateItem(index, 'icon', value); }
								}),
								el('button', {
									key: 'remove',
									type: 'button',
									className: 'button button-secondary',
									onClick: function() { removeItem(index); },
									style: { marginRight: '10px' }
								}, __('Remove Item', 'wp-uswds')),
								index === items.length - 1 && el('button', {
									key: 'add',
									type: 'button',
									className: 'button button-primary',
									onClick: addItem
								}, __('Add Item', 'wp-uswds'))
							])
						]);
					})
				)
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { items, size } = attributes;

			return el('ul', {
				className: `usa-icon-list${size !== 'default' ? ` usa-icon-list--size-${size}` : ''}`
			},
				items.map(function(item, index) {
					return el('li', { 
						key: index,
						className: 'usa-icon-list__item'
					},
						el('div', { className: 'usa-icon-list__content' }, [
							el('span', { key: 'icon', className: `usa-icon-list__icon usa-icon--size-${size !== 'default' ? size : 'md'}` },
								el('svg', {
									className: 'usa-icon',
									'aria-hidden': 'true',
									focusable: 'false',
									role: 'img'
								}, `[${item.icon}]`) // Placeholder for icon
							),
							item.text && el('span', {
								key: 'text',
								dangerouslySetInnerHTML: { __html: item.text }
							})
						])
					);
				})
			);
		}
	});

	// Register Banner Block
	registerBlockType('wp-uswds/banner', {
		title: __('USWDS Banner', 'wp-uswds'),
		description: __('Banners identify official websites of government organizations in the United States.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'flag',
		attributes: {
			content: {
				type: 'string',
				default: 'An official website of the United States government'
			},
			showDetails: {
				type: 'boolean',
				default: false
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { content, showDetails } = attributes;

			const blockProps = useBlockProps({
				className: 'usa-banner'
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Banner Settings', 'wp-uswds') },
						el(ToggleControl, {
							label: __('Show detailed information', 'wp-uswds'),
							checked: showDetails,
							onChange: function(value) { setAttributes({ showDetails: value }); }
						})
					)
				),
				el('div', blockProps, [
					el('div', { key: 'header', className: 'usa-accordion' },
						el('header', { className: 'usa-banner__header' },
							el('div', { className: 'usa-banner__inner' }, [
								el('div', { key: 'flag', className: 'grid-col-auto' },
									el('img', { 
										className: 'usa-banner__header-flag',
										src: 'https://unpkg.com/@uswds/uswds@latest/dist/img/us_flag_small.png',
										alt: 'US flag'
									})
								),
								el('div', { key: 'text', className: 'grid-col-fill tablet:grid-col-auto' },
									el(RichText, {
										tagName: 'p',
										className: 'usa-banner__header-text',
										value: content,
										onChange: function(value) { setAttributes({ content: value }); },
										placeholder: __('Banner message...', 'wp-uswds')
									})
								),
								showDetails && el('button', {
									key: 'button',
									className: 'usa-accordion__button usa-banner__button',
									'aria-expanded': 'false',
									'aria-controls': 'gov-banner'
								}, el('span', { className: 'usa-banner__button-text' }, __('Here\'s how you know', 'wp-uswds')))
							])
						)
					),
					showDetails && el('div', {
						key: 'content',
						className: 'usa-banner__content usa-accordion__content',
						id: 'gov-banner'
					},
						el('div', { className: 'grid-row grid-gap-lg' }, [
							el('div', { key: 'https', className: 'usa-banner__guidance tablet:grid-col-6' }, [
								el('img', {
									className: 'usa-banner__icon usa-media-block__img',
									src: 'https://unpkg.com/@uswds/uswds@latest/dist/img/icon-https.svg',
									alt: 'Https'
								}),
								el('div', { className: 'usa-media-block__body' }, [
									el('p', null, [
										el('strong', null, __('Secure .gov websites use HTTPS', 'wp-uswds')),
										el('br'),
										__('A lock (🔒) or https:// means you\'ve safely connected to the .gov website. Share sensitive information only on official, secure websites.', 'wp-uswds')
									])
								])
							]),
							el('div', { key: 'dot-gov', className: 'usa-banner__guidance tablet:grid-col-6' }, [
								el('img', {
									className: 'usa-banner__icon usa-media-block__img',
									src: 'https://unpkg.com/@uswds/uswds@latest/dist/img/icon-dot-gov.svg',
									alt: 'Dot gov'
								}),
								el('div', { className: 'usa-media-block__body' }, [
									el('p', null, [
										el('strong', null, __('Official websites use .gov', 'wp-uswds')),
										el('br'),
										__('A .gov website belongs to an official government organization in the United States.', 'wp-uswds')
									])
								])
							])
						])
					)
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { content, showDetails } = attributes;

			return el('div', {
				className: 'usa-banner'
			}, [
				el('div', { key: 'header', className: 'usa-accordion' },
					el('header', { className: 'usa-banner__header' },
						el('div', { className: 'usa-banner__inner' }, [
							el('div', { key: 'flag', className: 'grid-col-auto' },
								el('img', { 
									className: 'usa-banner__header-flag',
									src: 'https://unpkg.com/@uswds/uswds@latest/dist/img/us_flag_small.png',
									alt: 'US flag'
								})
							),
							el('div', { key: 'text', className: 'grid-col-fill tablet:grid-col-auto' },
								el('p', {
									className: 'usa-banner__header-text',
									dangerouslySetInnerHTML: { __html: content }
								})
							),
							showDetails && el('button', {
								key: 'button',
								className: 'usa-accordion__button usa-banner__button',
								'aria-expanded': 'false',
								'aria-controls': 'gov-banner'
							}, el('span', { className: 'usa-banner__button-text' }, __('Here\'s how you know', 'wp-uswds')))
						])
					)
				),
				showDetails && el('div', {
					key: 'content',
					className: 'usa-banner__content usa-accordion__content',
					id: 'gov-banner'
				},
					el('div', { className: 'grid-row grid-gap-lg' }, [
						el('div', { key: 'https', className: 'usa-banner__guidance tablet:grid-col-6' }, [
							el('img', {
								className: 'usa-banner__icon usa-media-block__img',
								src: 'https://unpkg.com/@uswds/uswds@latest/dist/img/icon-https.svg',
								alt: 'Https'
							}),
							el('div', { className: 'usa-media-block__body' }, [
								el('p', null, [
									el('strong', null, __('Secure .gov websites use HTTPS', 'wp-uswds')),
									el('br'),
									__('A lock (🔒) or https:// means you\'ve safely connected to the .gov website. Share sensitive information only on official, secure websites.', 'wp-uswds')
								])
							])
						]),
						el('div', { key: 'dot-gov', className: 'usa-banner__guidance tablet:grid-col-6' }, [
							el('img', {
								className: 'usa-banner__icon usa-media-block__img',
								src: 'https://unpkg.com/@uswds/uswds@latest/dist/img/icon-dot-gov.svg',
								alt: 'Dot gov'
							}),
							el('div', { className: 'usa-media-block__body' }, [
								el('p', null, [
									el('strong', null, __('Official websites use .gov', 'wp-uswds')),
									el('br'),
									__('A .gov website belongs to an official government organization in the United States.', 'wp-uswds')
								])
							])
						])
					])
				)
			]);
		}
	});

	// Register Breadcrumb Block
	registerBlockType('wp-uswds/breadcrumb', {
		title: __('USWDS Breadcrumb', 'wp-uswds'),
		description: __('Breadcrumbs provide secondary navigation to help users understand where they are.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'arrow-right-alt',
		attributes: {
			autoGenerate: {
				type: 'boolean',
				default: true
			},
			showHome: {
				type: 'boolean',
				default: true
			},
			homeText: {
				type: 'string',
				default: 'Home'
			},
			showCategory: {
				type: 'boolean',
				default: true
			},
			maxDepth: {
				type: 'number',
				default: 0
			},
			customItems: {
				type: 'array',
				default: []
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { autoGenerate, showHome, homeText, showCategory, maxDepth, customItems } = attributes;

			const blockProps = useBlockProps({
				className: 'usa-breadcrumb'
			});

			const updateCustomItem = function(index, field, value) {
				const newItems = [...customItems];
				newItems[index] = { ...newItems[index], [field]: value };
				setAttributes({ customItems: newItems });
			};

			const addCustomItem = function() {
				const newItems = [...customItems, { text: 'New Page', url: '' }];
				setAttributes({ customItems: newItems });
			};

			const removeCustomItem = function(index) {
				const newItems = customItems.filter((_, i) => i !== index);
				setAttributes({ customItems: newItems });
			};

			// Preview items for display in editor
			const previewItems = autoGenerate ? [
				{ text: showHome ? homeText : null, url: '/' },
				{ text: 'Parent Page', url: '/parent' },
				{ text: 'Current Page', url: '' }
			].filter(item => item.text) : customItems;

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Breadcrumb Settings', 'wp-uswds') }, [
						el(ToggleControl, {
							key: 'autoGenerate',
							label: __('Auto-generate breadcrumbs', 'wp-uswds'),
							checked: autoGenerate,
							onChange: function(value) { setAttributes({ autoGenerate: value }); },
							help: __('Automatically build breadcrumbs from page hierarchy', 'wp-uswds')
						}),
						autoGenerate && el(ToggleControl, {
							key: 'showHome',
							label: __('Show home link', 'wp-uswds'),
							checked: showHome,
							onChange: function(value) { setAttributes({ showHome: value }); }
						}),
						autoGenerate && showHome && el(TextControl, {
							key: 'homeText',
							label: __('Home link text', 'wp-uswds'),
							value: homeText,
							onChange: function(value) { setAttributes({ homeText: value }); }
						}),
						autoGenerate && el(ToggleControl, {
							key: 'showCategory',
							label: __('Show category for posts', 'wp-uswds'),
							checked: showCategory,
							onChange: function(value) { setAttributes({ showCategory: value }); }
						}),
						autoGenerate && el('div', { key: 'maxDepth' }, [
							el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Maximum depth (0 = unlimited)', 'wp-uswds')),
							el('input', {
								type: 'number',
								min: 0,
								max: 10,
								value: maxDepth,
								onChange: function(e) { setAttributes({ maxDepth: parseInt(e.target.value) || 0 }); },
								style: { width: '100%' }
							})
						])
					])
				),
				el('nav', blockProps, [
					!autoGenerate && el('div', { key: 'notice', style: { background: '#f0f6fc', padding: '12px', marginBottom: '16px', border: '1px solid #c3c4c7' } },
						el('p', { style: { margin: 0 } }, __('Manual mode: Add custom breadcrumb items below. Auto-generated breadcrumbs are disabled.', 'wp-uswds'))
					),
					autoGenerate && el('div', { key: 'preview-notice', style: { background: '#f0f6fc', padding: '12px', marginBottom: '16px', border: '1px solid #c3c4c7' } },
						el('p', { style: { margin: 0 } }, __('Preview: Breadcrumbs will be automatically generated based on the current page hierarchy when published.', 'wp-uswds'))
					),
					el('ol', { key: 'list', className: 'usa-breadcrumb__list' },
						!autoGenerate ? 
							customItems.map(function(item, index) {
								const isLast = index === customItems.length - 1;
								return el('li', { 
									key: index,
									className: `usa-breadcrumb__list-item${isLast ? ' usa-current' : ''}`
								}, [
									el('div', { key: 'controls', style: { marginBottom: '10px' } }, [
										el(TextControl, {
											key: 'text',
											label: __('Text', 'wp-uswds'),
											value: item.text,
											onChange: function(value) { updateCustomItem(index, 'text', value); }
										}),
										!isLast && el(TextControl, {
											key: 'url',
											label: __('URL', 'wp-uswds'),
											value: item.url,
											onChange: function(value) { updateCustomItem(index, 'url', value); }
										}),
										el('button', {
											key: 'remove',
											type: 'button',
											className: 'button button-secondary',
											onClick: function() { removeCustomItem(index); },
											style: { marginRight: '10px' }
										}, __('Remove', 'wp-uswds')),
										index === customItems.length - 1 && el('button', {
											key: 'add',
											type: 'button',
											className: 'button button-primary',
											onClick: addCustomItem
										}, __('Add Item', 'wp-uswds'))
									]),
									isLast ? 
										el('span', null, item.text) :
										el('a', { 
											href: item.url,
											className: 'usa-breadcrumb__link'
										}, item.text)
								]);
							}) :
							previewItems.map(function(item, index) {
								const isLast = index === previewItems.length - 1;
								return el('li', { 
									key: index,
									className: `usa-breadcrumb__list-item${isLast ? ' usa-current' : ''}`
								},
									isLast ? 
										el('span', null, item.text) :
										el('a', { 
											href: item.url,
											className: 'usa-breadcrumb__link'
										}, item.text)
								);
							})
					),
					!autoGenerate && customItems.length === 0 && el('button', {
						key: 'add-first',
						type: 'button',
						className: 'button button-primary',
						onClick: addCustomItem,
						style: { marginTop: '10px' }
					}, __('Add First Breadcrumb Item', 'wp-uswds'))
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { autoGenerate, showHome, homeText, showCategory, maxDepth, customItems } = attributes;

			// For auto-generated breadcrumbs, we'll use a server-side render
			if (autoGenerate) {
				return el('div', {
					className: 'wp-block-uswds-breadcrumb',
					'data-auto-generate': 'true',
					'data-show-home': showHome,
					'data-home-text': homeText,
					'data-show-category': showCategory,
					'data-max-depth': maxDepth
				});
			}

			// For custom breadcrumbs, render them directly
			return el('nav', {
				className: 'usa-breadcrumb',
				'aria-label': 'Breadcrumbs'
			},
				el('ol', { className: 'usa-breadcrumb__list' },
					customItems.map(function(item, index) {
						const isLast = index === customItems.length - 1;
						return el('li', { 
							key: index,
							className: `usa-breadcrumb__list-item${isLast ? ' usa-current' : ''}`
						},
							isLast ? 
								el('span', null, item.text) :
								el('a', { 
									href: item.url,
									className: 'usa-breadcrumb__link'
								}, item.text)
						);
					})
				)
			);
		}
	});

	// Register Collection Block
	registerBlockType('wp-uswds/collection', {
		title: __('USWDS Collection', 'wp-uswds'),
		description: __('A collection displays a compact list of multiple related items.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'list-view',
		attributes: {},
		edit: function(props) {
			const blockProps = useBlockProps({
				className: 'usa-collection'
			});

			return el('ul', blockProps,
				el(wp.blockEditor.InnerBlocks, {
					allowedBlocks: ['wp-uswds/collection-item'],
					template: [
						['wp-uswds/collection-item', { heading: 'First Collection Item' }]
					],
					templateLock: false
				})
			);
		},
		save: function(props) {
			return el('ul', {
				className: 'usa-collection'
			},
				el(wp.blockEditor.InnerBlocks.Content)
			);
		}
	});

	// Register Collection Item Block
	registerBlockType('wp-uswds/collection-item', {
		title: __('USWDS Collection Item', 'wp-uswds'),
		description: __('An individual collection item with heading, content, and metadata.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'list-view',
		parent: ['wp-uswds/collection'],
		attributes: {
			heading: {
				type: 'string',
				default: 'Collection Item'
			},
			meta: {
				type: 'string',
				default: ''
			},
			url: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { heading, meta, url } = attributes;

			const blockProps = useBlockProps({
				className: 'usa-collection__item'
			});

			return el('li', blockProps, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Collection Item Settings', 'wp-uswds') }, [
						el(TextControl, {
							key: 'url',
							label: __('Link URL (optional)', 'wp-uswds'),
							value: url,
							onChange: function(value) { setAttributes({ url: value }); }
						}),
						el(TextControl, {
							key: 'meta',
							label: __('Meta information (optional)', 'wp-uswds'),
							value: meta,
							onChange: function(value) { setAttributes({ meta: value }); }
						})
					])
				),
				el('div', { key: 'content', className: 'usa-collection__body' }, [
					el(RichText, {
						key: 'heading',
						tagName: 'h3',
						className: 'usa-collection__heading',
						value: heading,
						onChange: function(value) { setAttributes({ heading: value }); },
						placeholder: __('Item heading...', 'wp-uswds')
					}),
					el(wp.blockEditor.InnerBlocks, {
						template: [
							['core/paragraph', { placeholder: 'Add item description and content here. You can add any blocks.' }]
						],
						templateLock: false
					}),
					meta && el('div', { key: 'meta', className: 'usa-collection__meta' },
						el('span', null, meta)
					)
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { heading, meta, url } = attributes;

			return el('li', {
				className: 'usa-collection__item'
			},
				el('div', { className: 'usa-collection__body' }, [
					heading && el('h3', {
						key: 'heading',
						className: 'usa-collection__heading'
					},
						url ? 
							el('a', { 
								href: url,
								className: 'usa-collection__link',
								dangerouslySetInnerHTML: { __html: heading }
							}) :
							el('span', { dangerouslySetInnerHTML: { __html: heading } })
					),
					el(wp.blockEditor.InnerBlocks.Content),
					meta && el('div', { 
						key: 'meta', 
						className: 'usa-collection__meta'
					},
						el('span', null, meta)
					)
				])
			);
		}
	});

})();