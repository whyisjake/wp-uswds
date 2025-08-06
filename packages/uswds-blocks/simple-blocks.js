/**
 * Simple USWDS Blocks Registration
 * 
 * Manually register blocks for testing purposes
 */

(function() {
	'use strict';

	const { registerBlockType } = wp.blocks;
	const { __ } = wp.i18n;
	const { useBlockProps, InspectorControls, RichText, InnerBlocks } = wp.blockEditor;
	const { PanelBody, SelectControl, ToggleControl, TextControl, TextareaControl, RangeControl } = wp.components;
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

			const blockProps = useBlockProps.save({
				className: `usa-alert usa-alert--${type}${slim ? ' usa-alert--slim' : ''}`
			});

			return el('div', blockProps,
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
				const blockProps = useBlockProps.save({
					className: className,
					href: url
				});
				return el('a', {
					...blockProps,
					dangerouslySetInnerHTML: { __html: text }
				});
			}

			const blockProps = useBlockProps.save({
				className: className,
				type: 'button'
			});
			return el('button', {
				...blockProps,
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
							el('div', { key: 'icon', className: `usa-icon-list__icon usa-icon--size-${size !== 'default' ? size : 'md'}` },
								el('svg', {
									className: 'usa-icon',
									'aria-hidden': 'true',
									focusable: 'false',
									role: 'img'
								}, 
									el('use', {
										href: `${wp.uswdsBlocks?.spriteUrl || '/wp-content/plugins/uswds-blocks/assets/images/sprite.svg'}#${item.icon}`
									})
								)
							),
							el(RichText, {
								key: 'content',
								tagName: 'div',
								className: 'usa-icon-list__content',
								value: item.text,
								onChange: function(value) { updateItem(index, 'text', value); },
								placeholder: __('List item text...', 'wp-uswds')
							}),
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
					}, [
						el('div', { key: 'icon', className: `usa-icon-list__icon usa-icon--size-${size !== 'default' ? size : 'md'}` },
							el('svg', {
								className: 'usa-icon',
								'aria-hidden': 'true',
								focusable: 'false',
								role: 'img'
							}, 
								el('use', {
									href: `${wp.uswdsBlocks?.spriteUrl || '/wp-content/plugins/uswds-blocks/assets/images/sprite.svg'}#${item.icon}`
								})
							)
						),
						item.text && el('div', {
							key: 'content',
							className: 'usa-icon-list__content',
							dangerouslySetInnerHTML: { __html: item.text }
						})
					]
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

	// Register Header Block
	registerBlockType('wp-uswds/header', {
		title: __('USWDS Header', 'wp-uswds'),
		description: __('Government website header with logo, navigation, and search.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'admin-appearance',
		attributes: {
			variant: {
				type: 'string',
				default: 'basic'
			},
			siteName: {
				type: 'string',
				default: 'Site Name'
			},
			siteTagline: {
				type: 'string',
				default: ''
			},
			logoUrl: {
				type: 'string',
				default: ''
			},
			showSearch: {
				type: 'boolean',
				default: false
			},
			navItems: {
				type: 'array',
				default: [
					{ label: 'Current page', url: '#', current: true, hasSubmenu: false, submenu: [] },
					{ 
						label: 'About', 
						url: '#about', 
						current: false,
						hasSubmenu: true,
						submenu: [
							{ label: 'Our Mission', url: '/about/mission' },
							{ label: 'Leadership', url: '/about/leadership' },
							{ label: 'History', url: '/about/history' }
						]
					},
					{ label: 'Services', url: '#services', current: false, hasSubmenu: false, submenu: [] },
					{ label: 'Contact', url: '#contact', current: false, hasSubmenu: false, submenu: [] }
				]
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { variant, siteName, siteTagline, logoUrl, showSearch, navItems } = attributes;

			const blockProps = useBlockProps({
				className: `usa-header usa-header--${variant}`
			});

			const variantOptions = [
				{ label: __('Basic', 'wp-uswds'), value: 'basic' },
				{ label: __('Basic with Megamenu', 'wp-uswds'), value: 'basic-megamenu' },
				{ label: __('Extended', 'wp-uswds'), value: 'extended' },
				{ label: __('Extended with Megamenu', 'wp-uswds'), value: 'extended-megamenu' }
			];

			const updateNavItem = function(index, field, value) {
				const newItems = [...navItems];
				newItems[index] = { ...newItems[index], [field]: value };
				setAttributes({ navItems: newItems });
			};

			const addNavItem = function() {
				const newItems = [...navItems, { label: 'New Page', url: '#', current: false, hasSubmenu: false, submenu: [] }];
				setAttributes({ navItems: newItems });
			};

			const addSubmenuItem = function(parentIndex) {
				const newItems = [...navItems];
				newItems[parentIndex].submenu = [...newItems[parentIndex].submenu, { label: 'New Submenu Item', url: '#' }];
				setAttributes({ navItems: newItems });
			};

			const updateSubmenuItem = function(parentIndex, submenuIndex, field, value) {
				const newItems = [...navItems];
				newItems[parentIndex].submenu[submenuIndex] = { ...newItems[parentIndex].submenu[submenuIndex], [field]: value };
				setAttributes({ navItems: newItems });
			};

			const removeSubmenuItem = function(parentIndex, submenuIndex) {
				const newItems = [...navItems];
				newItems[parentIndex].submenu = newItems[parentIndex].submenu.filter((_, i) => i !== submenuIndex);
				setAttributes({ navItems: newItems });
			};

			const removeNavItem = function(index) {
				const newItems = navItems.filter((_, i) => i !== index);
				setAttributes({ navItems: newItems });
			};

			const isExtended = variant.includes('extended');

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' }, [
					el(PanelBody, { title: __('Header Settings', 'wp-uswds') }, [
						el(SelectControl, {
							key: 'variant',
							label: __('Header Variant', 'wp-uswds'),
							value: variant,
							options: variantOptions,
							onChange: function(value) { setAttributes({ variant: value }); }
						}),
						el(TextControl, {
							key: 'siteName',
							label: __('Site Name', 'wp-uswds'),
							value: siteName,
							onChange: function(value) { setAttributes({ siteName: value }); }
						}),
						isExtended && el(TextControl, {
							key: 'siteTagline',
							label: __('Site Tagline', 'wp-uswds'),
							value: siteTagline,
							onChange: function(value) { setAttributes({ siteTagline: value }); }
						}),
						el(TextControl, {
							key: 'logoUrl',
							label: __('Logo URL (optional)', 'wp-uswds'),
							value: logoUrl,
							onChange: function(value) { setAttributes({ logoUrl: value }); }
						}),
						el(ToggleControl, {
							key: 'showSearch',
							label: __('Show search', 'wp-uswds'),
							checked: showSearch,
							onChange: function(value) { setAttributes({ showSearch: value }); }
						})
					]),
					el(PanelBody, { title: __('Navigation Items', 'wp-uswds'), initialOpen: false },
						navItems.map(function(item, index) {
							return el('div', { key: index, style: { marginBottom: '20px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' } }, [
								el(TextControl, {
									key: 'label',
									label: __('Label', 'wp-uswds'),
									value: item.label,
									onChange: function(value) { updateNavItem(index, 'label', value); }
								}),
								el(TextControl, {
									key: 'url',
									label: __('URL', 'wp-uswds'),
									value: item.url,
									onChange: function(value) { updateNavItem(index, 'url', value); }
								}),
								el(ToggleControl, {
									key: 'current',
									label: __('Current page', 'wp-uswds'),
									checked: item.current,
									onChange: function(value) { updateNavItem(index, 'current', value); }
								}),
								el(ToggleControl, {
									key: 'hasSubmenu',
									label: __('Has dropdown menu', 'wp-uswds'),
									checked: item.hasSubmenu,
									onChange: function(value) { updateNavItem(index, 'hasSubmenu', value); }
								}),
								item.hasSubmenu && el('div', {
									key: 'submenu',
									style: { marginTop: '12px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }
								}, [
									el('strong', { key: 'title', style: { display: 'block', marginBottom: '8px' } }, __('Dropdown Items:', 'wp-uswds')),
									...item.submenu.map(function(submenuItem, submenuIndex) {
										return el('div', { 
											key: `submenu-${submenuIndex}`,
											style: { marginBottom: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '3px', backgroundColor: 'white' }
										}, [
											el(TextControl, {
												key: 'sublabel',
												label: __('Submenu Label', 'wp-uswds'),
												value: submenuItem.label,
												onChange: function(value) { updateSubmenuItem(index, submenuIndex, 'label', value); }
											}),
											el(TextControl, {
												key: 'suburl',
												label: __('Submenu URL', 'wp-uswds'),
												value: submenuItem.url,
												onChange: function(value) { updateSubmenuItem(index, submenuIndex, 'url', value); }
											}),
											el('button', {
												key: 'remove-sub',
												type: 'button',
												className: 'button button-small button-secondary',
												onClick: function() { removeSubmenuItem(index, submenuIndex); },
												style: { marginTop: '4px' }
											}, __('Remove', 'wp-uswds'))
										]);
									}),
									el('button', {
										key: 'add-submenu',
										type: 'button',
										className: 'button button-small button-primary',
										onClick: function() { addSubmenuItem(index); },
										style: { marginTop: '8px' }
									}, __('Add Submenu Item', 'wp-uswds'))
								]),
								el('button', {
									key: 'remove',
									type: 'button',
									className: 'button button-secondary',
									onClick: function() { removeNavItem(index); },
									style: { marginTop: '12px' }
								}, __('Remove Menu Item', 'wp-uswds'))
							]);
						}).concat([
							el('button', {
								key: 'add',
								type: 'button',
								className: 'button button-primary',
								onClick: addNavItem,
								style: { marginTop: '12px' }
							}, __('Add Navigation Item', 'wp-uswds'))
						])
					)
				]),
				el('header', blockProps, [
					el('div', { key: 'container', className: 'usa-nav-container' }, [
						el('div', { key: 'navbar', className: 'usa-navbar' }, [
							el('div', { key: 'logo', className: 'usa-logo', id: isExtended ? 'extended-logo' : 'basic-logo' }, [
								logoUrl && el('img', {
									key: 'logo-img',
									className: 'usa-logo__img',
									src: logoUrl,
									alt: siteName
								}),
								el('em', { key: 'logo-text', className: 'usa-logo__text' },
									el('a', { 
										href: '/',
										title: siteName
									}, siteName)
								)
							]),
							el('button', {
								key: 'menu-btn',
								type: 'button',
								className: 'usa-menu-btn'
							}, __('Menu', 'wp-uswds'))
						]),
						isExtended && siteTagline && el('div', {
							key: 'tagline',
							className: 'usa-logo__tagline'
						}, siteTagline),
						el('nav', { 
							key: 'nav',
							'aria-label': __('Primary navigation', 'wp-uswds'),
							className: 'usa-nav'
						}, [
							el('button', {
								key: 'close',
								type: 'button',
								className: 'usa-nav__close'
							}, [
								el('img', {
									src: '/wp-content/themes/uswds-theme/assets/images/usa-icons/close.svg',
									role: 'img',
									alt: __('Close', 'wp-uswds')
								})
							]),
							el('ul', { 
								key: 'primary',
								className: 'usa-nav__primary usa-accordion'
							},
								navItems.map(function(item, index) {
									if (item.hasSubmenu && item.submenu && item.submenu.length > 0) {
										return el('li', { 
											key: index,
											className: `usa-nav__primary-item${item.current ? ' usa-current' : ''}`
										}, [
											el('button', {
												key: 'button',
												type: 'button',
												className: 'usa-accordion__button usa-nav__link',
												'aria-expanded': 'false',
												'aria-controls': `nav-${index}`
											}, [
												el('span', { key: 'text' }, item.label)
											]),
											el('ul', {
												key: 'submenu',
												id: `nav-${index}`,
												className: 'usa-nav__submenu',
												hidden: true
											},
												item.submenu.map(function(subitem, subindex) {
													return el('li', {
														key: subindex,
														className: 'usa-nav__submenu-item'
													},
														el('a', {
															className: 'usa-nav__submenu-link',
															href: subitem.url
														}, subitem.label)
													);
												})
											)
										]);
									} else {
										return el('li', { 
											key: index,
											className: `usa-nav__primary-item${item.current ? ' usa-current' : ''}`
										},
											el('a', {
												className: 'usa-nav__link',
												href: item.url
											}, item.label)
										);
									}
								})
							),
							showSearch && el('div', {
								key: 'search',
								className: 'usa-nav__secondary'
							},
								el('form', { className: 'usa-search usa-search--small' },
									el('div', { role: 'search' }, [
										el('label', {
											key: 'label',
											className: 'usa-sr-only',
											htmlFor: 'search-field'
										}, __('Search', 'wp-uswds')),
										el('input', {
											key: 'input',
											className: 'usa-input',
											id: 'search-field',
											type: 'search',
											name: 'search',
											placeholder: __('Search', 'wp-uswds')
										}),
										el('button', {
											key: 'submit',
											className: 'usa-button',
											type: 'submit'
										}, __('Search', 'wp-uswds'))
									])
								)
							)
						])
					])
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { variant, siteName, siteTagline, logoUrl, showSearch, navItems } = attributes;

			const isExtended = variant.includes('extended');

			return el('header', {
				className: `usa-header usa-header--${variant}`
			},
				el('div', { className: 'usa-nav-container' }, [
					el('div', { key: 'navbar', className: 'usa-navbar' }, [
						el('div', { key: 'logo', className: 'usa-logo', id: isExtended ? 'extended-logo' : 'basic-logo' }, [
							logoUrl && el('img', {
								key: 'logo-img',
								className: 'usa-logo__img',
								src: logoUrl,
								alt: siteName
							}),
							el('em', { key: 'logo-text', className: 'usa-logo__text' },
								el('a', { 
									href: '/',
									title: siteName,
									dangerouslySetInnerHTML: { __html: siteName }
								})
							)
						]),
						el('button', {
							key: 'menu-btn',
							type: 'button',
							className: 'usa-menu-btn'
						}, 'Menu')
					]),
					isExtended && siteTagline && el('div', {
						key: 'tagline',
						className: 'usa-logo__tagline'
					}, siteTagline),
					el('nav', { 
						key: 'nav',
						'aria-label': 'Primary navigation',
						className: 'usa-nav'
					}, [
						el('button', {
							key: 'close',
							type: 'button',
							className: 'usa-nav__close'
						}, [
							el('img', {
								src: '/wp-content/themes/uswds-theme/assets/images/usa-icons/close.svg',
								role: 'img',
								alt: 'Close'
							})
						]),
						el('ul', { 
							key: 'primary',
							className: 'usa-nav__primary usa-accordion'
						},
							navItems.map(function(item, index) {
								if (item.hasSubmenu && item.submenu && item.submenu.length > 0) {
									return el('li', { 
										key: index,
										className: `usa-nav__primary-item${item.current ? ' usa-current' : ''}`
									}, [
										el('button', {
											key: 'button',
											type: 'button',
											className: 'usa-accordion__button usa-nav__link',
											'aria-expanded': 'false',
											'aria-controls': `nav-${index}`
										}, [
											el('span', { 
												key: 'text',
												dangerouslySetInnerHTML: { __html: item.label }
											})
										]),
										el('ul', {
											key: 'submenu',
											id: `nav-${index}`,
											className: 'usa-nav__submenu',
											hidden: true
										},
											item.submenu.map(function(subitem, subindex) {
												return el('li', {
													key: subindex,
													className: 'usa-nav__submenu-item'
												},
													el('a', {
														className: 'usa-nav__submenu-link',
														href: subitem.url,
														dangerouslySetInnerHTML: { __html: subitem.label }
													})
												);
											})
										)
									]);
								} else {
									return el('li', { 
										key: index,
										className: `usa-nav__primary-item${item.current ? ' usa-current' : ''}`
									},
										el('a', {
											className: 'usa-nav__link',
											href: item.url,
											dangerouslySetInnerHTML: { __html: item.label }
										})
									);
								}
							})
						),
						showSearch && el('div', {
							key: 'search',
							className: 'usa-nav__secondary'
						},
							el('form', { className: 'usa-search usa-search--small' },
								el('div', { role: 'search' }, [
									el('label', {
										key: 'label',
										className: 'usa-sr-only',
										htmlFor: 'search-field'
									}, 'Search'),
									el('input', {
										key: 'input',
										className: 'usa-input',
										id: 'search-field',
										type: 'search',
										name: 'search',
										placeholder: 'Search'
									}),
									el('button', {
										key: 'submit',
										className: 'usa-button',
										type: 'submit'
									}, 'Search')
								])
							)
						)
					])
				])
			);
		}
	});

	// Register Text Input Block
	registerBlockType('wp-uswds/text-input', {
		title: __('USWDS Text Input', 'wp-uswds'),
		description: __('A text input field following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'text',
		attributes: {
			label: {
				type: 'string',
				default: 'Text input label'
			},
			placeholder: {
				type: 'string',
				default: ''
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			inputType: {
				type: 'string',
				default: 'text'
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, placeholder, isRequired, isDisabled, hasError, errorMessage, helpText, inputType, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `text-input-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			const inputTypeOptions = [
				{ label: __('Text', 'wp-uswds'), value: 'text' },
				{ label: __('Email', 'wp-uswds'), value: 'email' },
				{ label: __('Password', 'wp-uswds'), value: 'password' },
				{ label: __('Number', 'wp-uswds'), value: 'number' },
				{ label: __('Tel', 'wp-uswds'), value: 'tel' },
				{ label: __('URL', 'wp-uswds'), value: 'url' }
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Text Input Settings', 'wp-uswds') }, [
						el(SelectControl, {
							key: 'inputType',
							label: __('Input Type', 'wp-uswds'),
							value: inputType,
							options: inputTypeOptions,
							onChange: function(value) { setAttributes({ inputType: value }); }
						}),
						el(TextControl, {
							key: 'placeholder',
							label: __('Placeholder Text', 'wp-uswds'),
							value: placeholder,
							onChange: function(value) { setAttributes({ placeholder: value }); }
						}),
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					])
				),
				el('div', blockProps, [
					el('label', {
						key: 'label',
						className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId || `text-input-${clientId}`
					}, [
						el(RichText, {
							tagName: 'span',
							value: label,
							onChange: function(value) { setAttributes({ label: value }); },
							placeholder: __('Enter field label...', 'wp-uswds')
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `text-input-${clientId}`}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `text-input-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					el('input', {
						key: 'input',
						className: `usa-input${hasError ? ' usa-input--error' : ''}`,
						id: fieldId || `text-input-${clientId}`,
						name: fieldId || `text-input-${clientId}`,
						type: inputType,
						placeholder: placeholder,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId || `text-input-${clientId}`}-hint` : '',
							hasError ? `${fieldId || `text-input-${clientId}`}-error` : ''
						].filter(Boolean).join(' ') || undefined
					})
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, placeholder, isRequired, isDisabled, hasError, errorMessage, helpText, inputType, fieldId } = attributes;

			return el('div', {
				className: 'usa-form-group'
			}, [
				el('label', {
					key: 'label',
					className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
					htmlFor: fieldId
				}, [
					el('span', {
						key: 'text',
						dangerouslySetInnerHTML: { __html: label }
					}),
					isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
				]),
				helpText && el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				el('input', {
					key: 'input',
					className: `usa-input${hasError ? ' usa-input--error' : ''}`,
					id: fieldId,
					name: fieldId,
					type: inputType,
					placeholder: placeholder,
					disabled: isDisabled,
					required: isRequired,
					'aria-describedby': [
						helpText ? `${fieldId}-hint` : '',
						hasError ? `${fieldId}-error` : ''
					].filter(Boolean).join(' ') || undefined
				})
			]);
		}
	});

	// Register Textarea Block
	registerBlockType('wp-uswds/textarea', {
		title: __('USWDS Textarea', 'wp-uswds'),
		description: __('A textarea field for longer text input following USWDS patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'text',
		attributes: {
			label: {
				type: 'string',
				default: 'Textarea label'
			},
			placeholder: {
				type: 'string',
				default: ''
			},
			rows: {
				type: 'number',
				default: 4
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, placeholder, rows, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `textarea-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Textarea Settings', 'wp-uswds') }, [
						el('div', { key: 'rows' }, [
							el('label', { style: { display: 'block', marginBottom: '8px' } }, __('Rows', 'wp-uswds')),
							el('input', {
								type: 'number',
								min: 2,
								max: 20,
								value: rows,
								onChange: function(e) { setAttributes({ rows: parseInt(e.target.value) || 4 }); },
								style: { width: '100%' }
							})
						]),
						el(TextControl, {
							key: 'placeholder',
							label: __('Placeholder Text', 'wp-uswds'),
							value: placeholder,
							onChange: function(value) { setAttributes({ placeholder: value }); }
						}),
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					])
				),
				el('div', blockProps, [
					el('label', {
						key: 'label',
						className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId || `textarea-${clientId}`
					}, [
						el(RichText, {
							tagName: 'span',
							value: label,
							onChange: function(value) { setAttributes({ label: value }); },
							placeholder: __('Enter field label...', 'wp-uswds')
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `textarea-${clientId}`}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `textarea-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					el('textarea', {
						key: 'textarea',
						className: `usa-textarea${hasError ? ' usa-textarea--error' : ''}`,
						id: fieldId || `textarea-${clientId}`,
						name: fieldId || `textarea-${clientId}`,
						rows: rows,
						placeholder: placeholder,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId || `textarea-${clientId}`}-hint` : '',
							hasError ? `${fieldId || `textarea-${clientId}`}-error` : ''
						].filter(Boolean).join(' ') || undefined
					})
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, placeholder, rows, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			return el('div', {
				className: 'usa-form-group'
			}, [
				el('label', {
					key: 'label',
					className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
					htmlFor: fieldId
				}, [
					el('span', {
						key: 'text',
						dangerouslySetInnerHTML: { __html: label }
					}),
					isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
				]),
				helpText && el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				el('textarea', {
					key: 'textarea',
					className: `usa-textarea${hasError ? ' usa-textarea--error' : ''}`,
					id: fieldId,
					name: fieldId,
					rows: rows,
					placeholder: placeholder,
					disabled: isDisabled,
					required: isRequired,
					'aria-describedby': [
						helpText ? `${fieldId}-hint` : '',
						hasError ? `${fieldId}-error` : ''
					].filter(Boolean).join(' ') || undefined
				})
			]);
		}
	});

	// Register Checkbox Block
	registerBlockType('wp-uswds/checkbox', {
		title: __('USWDS Checkbox', 'wp-uswds'),
		description: __('A checkbox input following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'yes',
		attributes: {
			label: {
				type: 'string',
				default: 'Checkbox label'
			},
			isChecked: {
				type: 'boolean',
				default: false
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, isChecked, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `checkbox-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Checkbox Settings', 'wp-uswds') }, [
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isChecked',
							label: __('Default checked', 'wp-uswds'),
							checked: isChecked,
							onChange: function(value) { setAttributes({ isChecked: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					])
				),
				el('div', blockProps, [
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `checkbox-${clientId}`}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `checkbox-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					el('div', { key: 'checkbox', className: 'usa-checkbox' }, [
						el('input', {
							key: 'input',
							className: `usa-checkbox__input${hasError ? ' usa-checkbox__input--error' : ''}`,
							id: fieldId || `checkbox-${clientId}`,
							name: fieldId || `checkbox-${clientId}`,
							type: 'checkbox',
							checked: isChecked,
							disabled: isDisabled,
							required: isRequired,
							'aria-describedby': [
								helpText ? `${fieldId || `checkbox-${clientId}`}-hint` : '',
								hasError ? `${fieldId || `checkbox-${clientId}`}-error` : ''
							].filter(Boolean).join(' ') || undefined,
							onChange: function(e) { setAttributes({ isChecked: e.target.checked }); }
						}),
						el('label', {
							key: 'label',
							className: `usa-checkbox__label${isRequired ? ' usa-label--required' : ''}`,
							htmlFor: fieldId || `checkbox-${clientId}`
						}, [
							el(RichText, {
								tagName: 'span',
								value: label,
								onChange: function(value) { setAttributes({ label: value }); },
								placeholder: __('Enter checkbox label...', 'wp-uswds')
							}),
							isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
						])
					])
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, isChecked, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			return el('div', {
				className: 'usa-form-group'
			}, [
				helpText && el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				el('div', { key: 'checkbox', className: 'usa-checkbox' }, [
					el('input', {
						key: 'input',
						className: `usa-checkbox__input${hasError ? ' usa-checkbox__input--error' : ''}`,
						id: fieldId,
						name: fieldId,
						type: 'checkbox',
						defaultChecked: isChecked,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId}-hint` : '',
							hasError ? `${fieldId}-error` : ''
						].filter(Boolean).join(' ') || undefined
					}),
					el('label', {
						key: 'label',
						className: `usa-checkbox__label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId
					}, [
						el('span', {
							key: 'text',
							dangerouslySetInnerHTML: { __html: label }
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					])
				])
			]);
		}
	});

	// Register Radio Button Block
	registerBlockType('wp-uswds/radio-buttons', {
		title: __('USWDS Radio Buttons', 'wp-uswds'),
		description: __('Radio button group following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'marker',
		attributes: {
			legend: {
				type: 'string',
				default: 'Radio button legend'
			},
			options: {
				type: 'array',
				default: [
					{ label: 'Option 1', value: 'option1', checked: true },
					{ label: 'Option 2', value: 'option2', checked: false }
				]
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { legend, options, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `radio-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			const updateOption = function(index, field, value) {
				const newOptions = [...options];
				if (field === 'checked' && value) {
					// Uncheck all other options when one is checked
					newOptions.forEach((opt, i) => {
						newOptions[i] = { ...opt, checked: i === index };
					});
				} else {
					newOptions[index] = { ...newOptions[index], [field]: value };
				}
				setAttributes({ options: newOptions });
			};

			const addOption = function() {
				const newOptions = [...options, { label: 'New Option', value: `option${options.length + 1}`, checked: false }];
				setAttributes({ options: newOptions });
			};

			const removeOption = function(index) {
				const newOptions = options.filter((_, i) => i !== index);
				setAttributes({ options: newOptions });
			};

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' }, [
					el(PanelBody, { title: __('Radio Button Settings', 'wp-uswds') }, [
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					]),
					el(PanelBody, { title: __('Radio Options', 'wp-uswds'), initialOpen: false },
						options.map(function(option, index) {
							return el('div', { 
								key: index, 
								style: { marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }
							}, [
								el(TextControl, {
									key: 'label',
									label: __('Label', 'wp-uswds'),
									value: option.label,
									onChange: function(value) { updateOption(index, 'label', value); }
								}),
								el(TextControl, {
									key: 'value',
									label: __('Value', 'wp-uswds'),
									value: option.value,
									onChange: function(value) { updateOption(index, 'value', value); }
								}),
								el(ToggleControl, {
									key: 'checked',
									label: __('Default selected', 'wp-uswds'),
									checked: option.checked,
									onChange: function(value) { updateOption(index, 'checked', value); }
								}),
								el('button', {
									key: 'remove',
									type: 'button',
									className: 'button button-secondary',
									onClick: function() { removeOption(index); },
									style: { marginTop: '8px' }
								}, __('Remove Option', 'wp-uswds'))
							]);
						}).concat([
							el('button', {
								key: 'add',
								type: 'button',
								className: 'button button-primary',
								onClick: addOption,
								style: { marginTop: '12px' }
							}, __('Add Option', 'wp-uswds'))
						])
					)
				]),
				el('fieldset', blockProps, [
					el('legend', {
						key: 'legend',
						className: `usa-legend${isRequired ? ' usa-label--required' : ''}`
					}, [
						el(RichText, {
							tagName: 'span',
							value: legend,
							onChange: function(value) { setAttributes({ legend: value }); },
							placeholder: __('Enter fieldset legend...', 'wp-uswds')
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `radio-${clientId}`}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `radio-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					options.map(function(option, index) {
						return el('div', { 
							key: index, 
							className: 'usa-radio'
						}, [
							el('input', {
								key: 'input',
								className: `usa-radio__input${hasError ? ' usa-radio__input--error' : ''}`,
								id: `${fieldId || `radio-${clientId}`}-${index}`,
								name: fieldId || `radio-${clientId}`,
								type: 'radio',
								value: option.value,
								checked: option.checked,
								disabled: isDisabled,
								required: isRequired,
								'aria-describedby': [
									helpText ? `${fieldId || `radio-${clientId}`}-hint` : '',
									hasError ? `${fieldId || `radio-${clientId}`}-error` : ''
								].filter(Boolean).join(' ') || undefined,
								onChange: function() { updateOption(index, 'checked', true); }
							}),
							el('label', {
								key: 'label',
								className: 'usa-radio__label',
								htmlFor: `${fieldId || `radio-${clientId}`}-${index}`
							}, option.label)
						]);
					})
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { legend, options, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			return el('fieldset', {
				className: 'usa-form-group'
			}, [
				el('legend', {
					key: 'legend',
					className: `usa-legend${isRequired ? ' usa-label--required' : ''}`
				}, [
					el('span', {
						key: 'text',
						dangerouslySetInnerHTML: { __html: legend }
					}),
					isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
				]),
				helpText && el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				options.map(function(option, index) {
					return el('div', { 
						key: index, 
						className: 'usa-radio'
					}, [
						el('input', {
							key: 'input',
							className: `usa-radio__input${hasError ? ' usa-radio__input--error' : ''}`,
							id: `${fieldId}-${index}`,
							name: fieldId,
							type: 'radio',
							value: option.value,
							defaultChecked: option.checked,
							disabled: isDisabled,
							required: isRequired,
							'aria-describedby': [
								helpText ? `${fieldId}-hint` : '',
								hasError ? `${fieldId}-error` : ''
							].filter(Boolean).join(' ') || undefined
						}),
						el('label', {
							key: 'label',
							className: 'usa-radio__label',
							htmlFor: `${fieldId}-${index}`
						}, option.label)
					]);
				})
			]);
		}
	});

	// Register Select Block
	registerBlockType('wp-uswds/select', {
		title: __('USWDS Select', 'wp-uswds'),
		description: __('A select dropdown following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'list-view',
		attributes: {
			label: {
				type: 'string',
				default: 'Select an option'
			},
			options: {
				type: 'array',
				default: [
					{ label: 'Option 1', value: 'option1', selected: false },
					{ label: 'Option 2', value: 'option2', selected: false },
					{ label: 'Option 3', value: 'option3', selected: false }
				]
			},
			placeholder: {
				type: 'string',
				default: '- Select -'
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, options, placeholder, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `select-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			const updateOption = function(index, field, value) {
				const newOptions = [...options];
				if (field === 'selected' && value) {
					// Unselect all other options when one is selected
					newOptions.forEach((opt, i) => {
						newOptions[i] = { ...opt, selected: i === index };
					});
				} else {
					newOptions[index] = { ...newOptions[index], [field]: value };
				}
				setAttributes({ options: newOptions });
			};

			const addOption = function() {
				const newOptions = [...options, { label: 'New Option', value: `option${options.length + 1}`, selected: false }];
				setAttributes({ options: newOptions });
			};

			const removeOption = function(index) {
				const newOptions = options.filter((_, i) => i !== index);
				setAttributes({ options: newOptions });
			};

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' }, [
					el(PanelBody, { title: __('Select Settings', 'wp-uswds') }, [
						el(TextControl, {
							key: 'placeholder',
							label: __('Placeholder Text', 'wp-uswds'),
							value: placeholder,
							onChange: function(value) { setAttributes({ placeholder: value }); }
						}),
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					]),
					el(PanelBody, { title: __('Select Options', 'wp-uswds'), initialOpen: false },
						options.map(function(option, index) {
							return el('div', { 
								key: index, 
								style: { marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }
							}, [
								el(TextControl, {
									key: 'label',
									label: __('Label', 'wp-uswds'),
									value: option.label,
									onChange: function(value) { updateOption(index, 'label', value); }
								}),
								el(TextControl, {
									key: 'value',
									label: __('Value', 'wp-uswds'),
									value: option.value,
									onChange: function(value) { updateOption(index, 'value', value); }
								}),
								el(ToggleControl, {
									key: 'selected',
									label: __('Default selected', 'wp-uswds'),
									checked: option.selected,
									onChange: function(value) { updateOption(index, 'selected', value); }
								}),
								el('button', {
									key: 'remove',
									type: 'button',
									className: 'button button-secondary',
									onClick: function() { removeOption(index); },
									style: { marginTop: '8px' }
								}, __('Remove Option', 'wp-uswds'))
							]);
						}).concat([
							el('button', {
								key: 'add',
								type: 'button',
								className: 'button button-primary',
								onClick: addOption,
								style: { marginTop: '12px' }
							}, __('Add Option', 'wp-uswds'))
						])
					)
				]),
				el('div', blockProps, [
					el('label', {
						key: 'label',
						className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId || `select-${clientId}`
					}, [
						el(RichText, {
							tagName: 'span',
							value: label,
							onChange: function(value) { setAttributes({ label: value }); },
							placeholder: __('Enter field label...', 'wp-uswds')
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `select-${clientId}`}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `select-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					el('select', {
						key: 'select',
						className: `usa-select${hasError ? ' usa-select--error' : ''}`,
						id: fieldId || `select-${clientId}`,
						name: fieldId || `select-${clientId}`,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId || `select-${clientId}`}-hint` : '',
							hasError ? `${fieldId || `select-${clientId}`}-error` : ''
						].filter(Boolean).join(' ') || undefined
					}, [
						placeholder && el('option', { key: 'placeholder', value: '' }, placeholder)
					].concat(
						options.map(function(option, index) {
							return el('option', {
								key: index,
								value: option.value,
								selected: option.selected
							}, option.label);
						})
					))
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, options, placeholder, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			return el('div', {
				className: 'usa-form-group'
			}, [
				el('label', {
					key: 'label',
					className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
					htmlFor: fieldId
				}, [
					el('span', {
						key: 'text',
						dangerouslySetInnerHTML: { __html: label }
					}),
					isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
				]),
				helpText && el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				el('select', {
					key: 'select',
					className: `usa-select${hasError ? ' usa-select--error' : ''}`,
					id: fieldId,
					name: fieldId,
					disabled: isDisabled,
					required: isRequired,
					'aria-describedby': [
						helpText ? `${fieldId}-hint` : '',
						hasError ? `${fieldId}-error` : ''
					].filter(Boolean).join(' ') || undefined
				}, [
					placeholder && el('option', { key: 'placeholder', value: '' }, placeholder)
				].concat(
					options.map(function(option, index) {
						return el('option', {
							key: index,
							value: option.value,
							defaultSelected: option.selected
						}, option.label);
					})
				))
			]);
		}
	});

	// Register File Input Block
	registerBlockType('wp-uswds/file-input', {
		title: __('USWDS File Input', 'wp-uswds'),
		description: __('A file input field following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'upload',
		attributes: {
			label: {
				type: 'string',
				default: 'Upload file'
			},
			acceptedTypes: {
				type: 'string',
				default: ''
			},
			multiple: {
				type: 'boolean',
				default: false
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, acceptedTypes, multiple, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `file-input-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('File Input Settings', 'wp-uswds') }, [
						el(TextControl, {
							key: 'acceptedTypes',
							label: __('Accepted File Types', 'wp-uswds'),
							value: acceptedTypes,
							help: __('e.g., .pdf,.doc,.docx or image/*', 'wp-uswds'),
							onChange: function(value) { setAttributes({ acceptedTypes: value }); }
						}),
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'multiple',
							label: __('Allow multiple files', 'wp-uswds'),
							checked: multiple,
							onChange: function(value) { setAttributes({ multiple: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					])
				),
				el('div', blockProps, [
					el('label', {
						key: 'label',
						className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId || `file-input-${clientId}`
					}, [
						el(RichText, {
							tagName: 'span',
							value: label,
							onChange: function(value) { setAttributes({ label: value }); },
							placeholder: __('Enter field label...', 'wp-uswds')
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `file-input-${clientId}`}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `file-input-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					el('input', {
						key: 'input',
						className: `usa-file-input${hasError ? ' usa-file-input--error' : ''}`,
						id: fieldId || `file-input-${clientId}`,
						name: fieldId || `file-input-${clientId}`,
						type: 'file',
						accept: acceptedTypes || undefined,
						multiple: multiple,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId || `file-input-${clientId}`}-hint` : '',
							hasError ? `${fieldId || `file-input-${clientId}`}-error` : ''
						].filter(Boolean).join(' ') || undefined
					})
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, acceptedTypes, multiple, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			return el('div', {
				className: 'usa-form-group'
			}, [
				el('label', {
					key: 'label',
					className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
					htmlFor: fieldId
				}, [
					el('span', {
						key: 'text',
						dangerouslySetInnerHTML: { __html: label }
					}),
					isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
				]),
				helpText && el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				el('input', {
					key: 'input',
					className: `usa-file-input${hasError ? ' usa-file-input--error' : ''}`,
					id: fieldId,
					name: fieldId,
					type: 'file',
					accept: acceptedTypes || undefined,
					multiple: multiple,
					disabled: isDisabled,
					required: isRequired,
					'aria-describedby': [
						helpText ? `${fieldId}-hint` : '',
						hasError ? `${fieldId}-error` : ''
					].filter(Boolean).join(' ') || undefined
				})
			]);
		}
	});

	// Register Form Block
	registerBlockType('wp-uswds/form', {
		title: __('USWDS Form', 'wp-uswds'),
		description: __('A form container following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'feedback',
		attributes: {
			formTitle: {
				type: 'string',
				default: ''
			},
			formDescription: {
				type: 'string',
				default: ''
			},
			submitText: {
				type: 'string',
				default: 'Submit'
			},
			method: {
				type: 'string',
				default: 'post'
			},
			action: {
				type: 'string',
				default: ''
			},
			showTitle: {
				type: 'boolean',
				default: false
			},
			showDescription: {
				type: 'boolean',
				default: false
			},
			formId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { formTitle, formDescription, submitText, method, action, showTitle, showDescription, formId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!formId) {
				setAttributes({ formId: `form-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form'
			});

			const ALLOWED_BLOCKS = [
				'wp-uswds/text-input',
				'wp-uswds/textarea',
				'wp-uswds/checkbox',
				'wp-uswds/radio-buttons',
				'wp-uswds/select',
				'wp-uswds/file-input',
				'core/paragraph',
				'core/heading',
				'core/spacer'
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Form Settings', 'wp-uswds') }, [
						el(ToggleControl, {
							key: 'showTitle',
							label: __('Show form title', 'wp-uswds'),
							checked: showTitle,
							onChange: function(value) { setAttributes({ showTitle: value }); }
						}),
						showTitle && el(TextControl, {
							key: 'formTitle',
							label: __('Form Title', 'wp-uswds'),
							value: formTitle,
							onChange: function(value) { setAttributes({ formTitle: value }); }
						}),
						el(ToggleControl, {
							key: 'showDescription',
							label: __('Show form description', 'wp-uswds'),
							checked: showDescription,
							onChange: function(value) { setAttributes({ showDescription: value }); }
						}),
						showDescription && el(TextareaControl, {
							key: 'formDescription',
							label: __('Form Description', 'wp-uswds'),
							value: formDescription,
							onChange: function(value) { setAttributes({ formDescription: value }); }
						}),
						el(TextControl, {
							key: 'submitText',
							label: __('Submit Button Text', 'wp-uswds'),
							value: submitText,
							onChange: function(value) { setAttributes({ submitText: value }); }
						}),
						el(SelectControl, {
							key: 'method',
							label: __('Form Method', 'wp-uswds'),
							value: method,
							options: [
								{ label: __('POST', 'wp-uswds'), value: 'post' },
								{ label: __('GET', 'wp-uswds'), value: 'get' }
							],
							onChange: function(value) { setAttributes({ method: value }); }
						}),
						el(TextControl, {
							key: 'action',
							label: __('Form Action URL', 'wp-uswds'),
							value: action,
							help: __('Leave empty to submit to current page', 'wp-uswds'),
							onChange: function(value) { setAttributes({ action: value }); }
						})
					])
				),
				el('div', blockProps, [
					showTitle && formTitle && el('h2', {
						key: 'title',
						className: 'usa-form__title'
					}, formTitle),
					showDescription && formDescription && el('p', {
						key: 'description',
						className: 'usa-form__description'
					}, formDescription),
					el(InnerBlocks, {
						key: 'content',
						allowedBlocks: ALLOWED_BLOCKS,
						template: [
							['wp-uswds/text-input', { label: 'Full Name', isRequired: true }],
							['wp-uswds/text-input', { label: 'Email Address', inputType: 'email', isRequired: true }],
							['wp-uswds/textarea', { label: 'Message', isRequired: true }]
						],
						templateLock: false
					}),
					el('button', {
						key: 'submit',
						type: 'submit',
						className: 'usa-button'
					}, submitText)
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { formTitle, formDescription, submitText, method, action, showTitle, showDescription, formId } = attributes;

			return el('form', {
				className: 'usa-form',
				id: formId,
				method: method,
				action: action || undefined
			}, [
				showTitle && formTitle && el('h2', {
					key: 'title',
					className: 'usa-form__title'
				}, formTitle),
				showDescription && formDescription && el('p', {
					key: 'description',
					className: 'usa-form__description'
				}, formDescription),
				el(InnerBlocks.Content, { key: 'content' }),
				el('button', {
					key: 'submit',
					type: 'submit',
					className: 'usa-button'
				}, submitText)
			]);
		}
	});

	// Register Date Picker Block
	registerBlockType('wp-uswds/date-picker', {
		title: __('USWDS Date Picker', 'wp-uswds'),
		description: __('A date picker with calendar widget following USWDS form patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'calendar-alt',
		attributes: {
			label: {
				type: 'string',
				default: 'Date'
			},
			minDate: {
				type: 'string',
				default: ''
			},
			maxDate: {
				type: 'string',
				default: ''
			},
			defaultDate: {
				type: 'string',
				default: ''
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'Please enter a valid date'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			dateFormat: {
				type: 'string',
				default: 'mm/dd/yyyy'
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, minDate, maxDate, defaultDate, isRequired, isDisabled, hasError, errorMessage, helpText, dateFormat, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `date-picker-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-form-group'
			});

			const dateFormatOptions = [
				{ label: __('MM/DD/YYYY', 'wp-uswds'), value: 'mm/dd/yyyy' },
				{ label: __('DD/MM/YYYY', 'wp-uswds'), value: 'dd/mm/yyyy' },
				{ label: __('YYYY-MM-DD', 'wp-uswds'), value: 'yyyy-mm-dd' }
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Date Picker Settings', 'wp-uswds') }, [
						el(SelectControl, {
							key: 'dateFormat',
							label: __('Date Format', 'wp-uswds'),
							value: dateFormat,
							options: dateFormatOptions,
							onChange: function(value) { setAttributes({ dateFormat: value }); }
						}),
						el(TextControl, {
							key: 'defaultDate',
							label: __('Default Date', 'wp-uswds'),
							value: defaultDate,
							help: __('Leave empty for no default date', 'wp-uswds'),
							onChange: function(value) { setAttributes({ defaultDate: value }); }
						}),
						el(TextControl, {
							key: 'minDate',
							label: __('Minimum Date', 'wp-uswds'),
							value: minDate,
							help: __('Format: YYYY-MM-DD (e.g., 2024-01-01)', 'wp-uswds'),
							onChange: function(value) { setAttributes({ minDate: value }); }
						}),
						el(TextControl, {
							key: 'maxDate',
							label: __('Maximum Date', 'wp-uswds'),
							value: maxDate,
							help: __('Format: YYYY-MM-DD (e.g., 2025-12-31)', 'wp-uswds'),
							onChange: function(value) { setAttributes({ maxDate: value }); }
						}),
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					])
				),
				el('div', blockProps, [
					el('label', {
						key: 'label',
						className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId || `date-picker-${clientId}`
					}, [
						el(RichText, {
							tagName: 'span',
							value: label,
							onChange: function(value) { setAttributes({ label: value }); },
							placeholder: __('Enter field label...', 'wp-uswds')
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId || `date-picker-${clientId}`}-hint`
					}, helpText || dateFormat),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId || `date-picker-${clientId}`}-error`,
						role: 'alert'
					}, errorMessage),
					el('div', {
						key: 'picker',
						className: 'usa-date-picker'
					},
						el('input', {
							className: `usa-input${hasError ? ' usa-input--error' : ''}`,
							id: fieldId || `date-picker-${clientId}`,
							name: fieldId || `date-picker-${clientId}`,
							type: 'text',
							placeholder: dateFormat,
							defaultValue: defaultDate,
							disabled: isDisabled,
							required: isRequired,
							'aria-describedby': [
								`${fieldId || `date-picker-${clientId}`}-hint`,
								hasError ? `${fieldId || `date-picker-${clientId}`}-error` : ''
							].filter(Boolean).join(' ') || undefined,
							'data-min-date': minDate || undefined,
							'data-max-date': maxDate || undefined
						})
					)
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, minDate, maxDate, defaultDate, isRequired, isDisabled, hasError, errorMessage, helpText, dateFormat, fieldId } = attributes;

			return el('div', {
				className: 'usa-form-group'
			}, [
				el('label', {
					key: 'label',
					className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
					htmlFor: fieldId
				}, [
					el('span', {
						key: 'text',
						dangerouslySetInnerHTML: { __html: label }
					}),
					isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
				]),
				el('div', {
					key: 'hint',
					className: 'usa-hint',
					id: `${fieldId}-hint`
				}, helpText || dateFormat),
				hasError && el('div', {
					key: 'error',
					className: 'usa-error-message',
					id: `${fieldId}-error`,
					role: 'alert'
				}, errorMessage),
				el('div', {
					key: 'picker',
					className: 'usa-date-picker'
				},
					el('input', {
						className: `usa-input${hasError ? ' usa-input--error' : ''}`,
						id: fieldId,
						name: fieldId,
						type: 'text',
						placeholder: dateFormat,
						defaultValue: defaultDate,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							`${fieldId}-hint`,
							hasError ? `${fieldId}-error` : ''
						].filter(Boolean).join(' ') || undefined,
						'data-min-date': minDate || undefined,
						'data-max-date': maxDate || undefined
					})
				)
			]);
		}
	});

	// Register Character Count Block
	registerBlockType('wp-uswds/character-count', {
		title: __('USWDS Character Count', 'wp-uswds'),
		description: __('A text input or textarea with character limit indicator following USWDS patterns.', 'wp-uswds'),
		category: 'wp-uswds-forms',
		icon: 'editor-spellcheck',
		attributes: {
			label: {
				type: 'string',
				default: 'Text with character limit'
			},
			inputType: {
				type: 'string',
				default: 'input'
			},
			maxLength: {
				type: 'number',
				default: 500
			},
			placeholder: {
				type: 'string',
				default: ''
			},
			rows: {
				type: 'number',
				default: 4
			},
			isRequired: {
				type: 'boolean',
				default: false
			},
			isDisabled: {
				type: 'boolean',
				default: false
			},
			hasError: {
				type: 'boolean',
				default: false
			},
			errorMessage: {
				type: 'string',
				default: 'This field has an error'
			},
			helpText: {
				type: 'string',
				default: ''
			},
			fieldId: {
				type: 'string',
				default: ''
			}
		},
		edit: function(props) {
			const { attributes, setAttributes, clientId } = props;
			const { label, inputType, maxLength, placeholder, rows, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			// Set a unique ID if one doesn't exist
			if (!fieldId) {
				setAttributes({ fieldId: `character-count-${clientId}` });
			}

			const blockProps = useBlockProps({
				className: 'usa-character-count'
			});

			const inputTypeOptions = [
				{ label: __('Text Input', 'wp-uswds'), value: 'input' },
				{ label: __('Textarea', 'wp-uswds'), value: 'textarea' }
			];

			return el('div', null, [
				el(InspectorControls, { key: 'inspector' },
					el(PanelBody, { title: __('Character Count Settings', 'wp-uswds') }, [
						el(SelectControl, {
							key: 'inputType',
							label: __('Input Type', 'wp-uswds'),
							value: inputType,
							options: inputTypeOptions,
							onChange: function(value) { setAttributes({ inputType: value }); }
						}),
						el(RangeControl, {
							key: 'maxLength',
							label: __('Maximum Characters', 'wp-uswds'),
							value: maxLength,
							min: 10,
							max: 2000,
							step: 10,
							onChange: function(value) { setAttributes({ maxLength: value }); }
						}),
						inputType === 'textarea' && el(RangeControl, {
							key: 'rows',
							label: __('Textarea Rows', 'wp-uswds'),
							value: rows,
							min: 2,
							max: 10,
							onChange: function(value) { setAttributes({ rows: value }); }
						}),
						el(TextControl, {
							key: 'placeholder',
							label: __('Placeholder Text', 'wp-uswds'),
							value: placeholder,
							onChange: function(value) { setAttributes({ placeholder: value }); }
						}),
						el(TextControl, {
							key: 'helpText',
							label: __('Help Text', 'wp-uswds'),
							value: helpText,
							onChange: function(value) { setAttributes({ helpText: value }); }
						}),
						el(ToggleControl, {
							key: 'isRequired',
							label: __('Required field', 'wp-uswds'),
							checked: isRequired,
							onChange: function(value) { setAttributes({ isRequired: value }); }
						}),
						el(ToggleControl, {
							key: 'isDisabled',
							label: __('Disabled', 'wp-uswds'),
							checked: isDisabled,
							onChange: function(value) { setAttributes({ isDisabled: value }); }
						}),
						el(ToggleControl, {
							key: 'hasError',
							label: __('Show error state', 'wp-uswds'),
							checked: hasError,
							onChange: function(value) { setAttributes({ hasError: value }); }
						}),
						hasError && el(TextControl, {
							key: 'errorMessage',
							label: __('Error Message', 'wp-uswds'),
							value: errorMessage,
							onChange: function(value) { setAttributes({ errorMessage: value }); }
						})
					])
				),
				el('div', blockProps, [
					el('div', {
						key: 'form-group',
						className: 'usa-form-group'
					}, [
						el('label', {
							key: 'label',
							className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
							htmlFor: fieldId || `character-count-${clientId}`
						}, [
							el(RichText, {
								tagName: 'span',
								value: label,
								onChange: function(value) { setAttributes({ label: value }); },
								placeholder: __('Enter field label...', 'wp-uswds')
							}),
							isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
						]),
						helpText && el('div', {
							key: 'hint',
							className: 'usa-hint',
							id: `${fieldId || `character-count-${clientId}`}-hint`
						}, helpText),
						hasError && el('div', {
							key: 'error',
							className: 'usa-error-message',
							id: `${fieldId || `character-count-${clientId}`}-error`,
							role: 'alert'
						}, errorMessage),
						inputType === 'textarea' ? el('textarea', {
							key: 'textarea',
							className: `usa-textarea usa-character-count__field${hasError ? ' usa-textarea--error' : ''}`,
							id: fieldId || `character-count-${clientId}`,
							name: fieldId || `character-count-${clientId}`,
							rows: rows,
							maxLength: maxLength,
							placeholder: placeholder,
							disabled: isDisabled,
							required: isRequired,
							'aria-describedby': [
								helpText ? `${fieldId || `character-count-${clientId}`}-hint` : '',
								hasError ? `${fieldId || `character-count-${clientId}`}-error` : '',
								`${fieldId || `character-count-${clientId}`}-info`
							].filter(Boolean).join(' ') || undefined
						}) : el('input', {
							key: 'input',
							className: `usa-input usa-character-count__field${hasError ? ' usa-input--error' : ''}`,
							id: fieldId || `character-count-${clientId}`,
							name: fieldId || `character-count-${clientId}`,
							type: 'text',
							maxLength: maxLength,
							placeholder: placeholder,
							disabled: isDisabled,
							required: isRequired,
							'aria-describedby': [
								helpText ? `${fieldId || `character-count-${clientId}`}-hint` : '',
								hasError ? `${fieldId || `character-count-${clientId}`}-error` : '',
								`${fieldId || `character-count-${clientId}`}-info`
							].filter(Boolean).join(' ') || undefined
						})
					]),
					el('span', {
						key: 'message',
						className: 'usa-character-count__message',
						id: `${fieldId || `character-count-${clientId}`}-info`,
						'aria-live': 'polite'
					}, `You can enter up to ${maxLength} characters`)
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { label, inputType, maxLength, placeholder, rows, isRequired, isDisabled, hasError, errorMessage, helpText, fieldId } = attributes;

			return el('div', {
				className: 'usa-character-count'
			}, [
				el('div', {
					key: 'form-group',
					className: 'usa-form-group'
				}, [
					el('label', {
						key: 'label',
						className: `usa-label${isRequired ? ' usa-label--required' : ''}`,
						htmlFor: fieldId
					}, [
						el('span', {
							key: 'text',
							dangerouslySetInnerHTML: { __html: label }
						}),
						isRequired && el('span', { key: 'required', className: 'usa-hint usa-hint--required' }, ' *')
					]),
					helpText && el('div', {
						key: 'hint',
						className: 'usa-hint',
						id: `${fieldId}-hint`
					}, helpText),
					hasError && el('div', {
						key: 'error',
						className: 'usa-error-message',
						id: `${fieldId}-error`,
						role: 'alert'
					}, errorMessage),
					inputType === 'textarea' ? el('textarea', {
						key: 'textarea',
						className: `usa-textarea usa-character-count__field${hasError ? ' usa-textarea--error' : ''}`,
						id: fieldId,
						name: fieldId,
						rows: rows,
						maxLength: maxLength,
						placeholder: placeholder,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId}-hint` : '',
							hasError ? `${fieldId}-error` : '',
							`${fieldId}-info`
						].filter(Boolean).join(' ') || undefined
					}) : el('input', {
						key: 'input',
						className: `usa-input usa-character-count__field${hasError ? ' usa-input--error' : ''}`,
						id: fieldId,
						name: fieldId,
						type: 'text',
						maxLength: maxLength,
						placeholder: placeholder,
						disabled: isDisabled,
						required: isRequired,
						'aria-describedby': [
							helpText ? `${fieldId}-hint` : '',
							hasError ? `${fieldId}-error` : '',
							`${fieldId}-info`
						].filter(Boolean).join(' ') || undefined
					})
				]),
				el('span', {
					key: 'message',
					className: 'usa-character-count__message',
					id: `${fieldId}-info`,
					'aria-live': 'polite'
				}, `You can enter up to ${maxLength} characters`)
			]);
		}
	});

	// Register Table Block
	registerBlockType('wp-uswds/table', {
		title: __('USWDS Table', 'wp-uswds'),
		description: __('Display structured data in a table with USWDS styling and accessibility features.', 'wp-uswds'),
		category: 'wp-uswds',
		icon: 'editor-table',
		attributes: {
			caption: {
				type: 'string',
				default: ''
			},
			variant: {
				type: 'string',
				default: 'default'
			},
			isScrollable: {
				type: 'boolean',
				default: false
			},
			hasStickyHeader: {
				type: 'boolean',
				default: false
			},
			headers: {
				type: 'array',
				default: [
					{ content: 'Header 1', scope: 'col' },
					{ content: 'Header 2', scope: 'col' },
					{ content: 'Header 3', scope: 'col' }
				]
			},
			rows: {
				type: 'array',
				default: [
					{
						cells: [
							{ content: 'Cell 1', isHeader: false },
							{ content: 'Cell 2', isHeader: false },
							{ content: 'Cell 3', isHeader: false }
						]
					},
					{
						cells: [
							{ content: 'Cell 4', isHeader: false },
							{ content: 'Cell 5', isHeader: false },
							{ content: 'Cell 6', isHeader: false }
						]
					}
				]
			}
		},
		edit: function(props) {
			const { attributes, setAttributes } = props;
			const { caption, variant, isScrollable, hasStickyHeader, headers, rows } = attributes;

			const blockProps = useBlockProps({
				className: `uswds-table-editor`
			});

			const tableVariants = [
				{ label: __('Default', 'wp-uswds'), value: 'default' },
				{ label: __('Striped', 'wp-uswds'), value: 'striped' },
				{ label: __('Borderless', 'wp-uswds'), value: 'borderless' },
				{ label: __('Stacked', 'wp-uswds'), value: 'stacked' },
				{ label: __('Stacked Header', 'wp-uswds'), value: 'stacked-header' }
			];

			function updateHeader(index, content) {
				const newHeaders = [...headers];
				newHeaders[index].content = content;
				setAttributes({ headers: newHeaders });
			}

			function updateCell(rowIndex, cellIndex, content) {
				const newRows = [...rows];
				newRows[rowIndex].cells[cellIndex].content = content;
				setAttributes({ rows: newRows });
			}

			function addColumn() {
				const newHeaders = [...headers];
				newHeaders.push({ content: `Header ${headers.length + 1}`, scope: 'col' });
				
				const newRows = rows.map(row => ({
					cells: [...row.cells, { content: '', isHeader: false }]
				}));
				
				setAttributes({ 
					headers: newHeaders,
					rows: newRows 
				});
			}

			function addRow() {
				const newRow = {
					cells: headers.map(() => ({ content: '', isHeader: false }))
				};
				setAttributes({ rows: [...rows, newRow] });
			}

			function removeColumn(index) {
				if (headers.length <= 1) return;
				
				const newHeaders = headers.filter((_, i) => i !== index);
				const newRows = rows.map(row => ({
					cells: row.cells.filter((_, i) => i !== index)
				}));
				
				setAttributes({ 
					headers: newHeaders,
					rows: newRows 
				});
			}

			function removeRow(index) {
				if (rows.length <= 1) return;
				setAttributes({ rows: rows.filter((_, i) => i !== index) });
			}

			const tableClasses = [
				'usa-table',
				variant !== 'default' ? `usa-table--${variant}` : '',
				hasStickyHeader ? 'usa-table--sticky-header' : ''
			].filter(Boolean).join(' ');

			const tableElement = el('table', { className: tableClasses }, [
				caption && el('caption', { key: 'caption' }, caption),
				el('thead', { key: 'thead' }, 
					el('tr', {},
						headers.map((header, index) => 
							el('th', { 
								key: `header-${index}`,
								scope: 'col',
								style: { border: '1px solid #ddd', padding: '8px', background: '#f8f9fa' }
							}, [
								el(RichText, {
									tagName: 'span',
									value: header.content,
									onChange: (value) => updateHeader(index, value),
									placeholder: `Header ${index + 1}`
								}),
								headers.length > 1 && el('button', {
									key: 'remove',
									onClick: () => removeColumn(index),
									style: { 
										marginLeft: '8px', 
										background: '#dc3545', 
										color: 'white', 
										border: 'none', 
										borderRadius: '3px',
										cursor: 'pointer',
										fontSize: '12px',
										padding: '2px 6px'
									}
								}, '×')
							])
						)
					)
				),
				el('tbody', { key: 'tbody' },
					rows.map((row, rowIndex) =>
						el('tr', { key: `row-${rowIndex}` }, [
							...row.cells.map((cell, cellIndex) =>
								el('td', { 
									key: `cell-${rowIndex}-${cellIndex}`,
									style: { border: '1px solid #ddd', padding: '8px' }
								},
									el(RichText, {
										tagName: 'span',
										value: cell.content,
										onChange: (value) => updateCell(rowIndex, cellIndex, value),
										placeholder: `Cell ${rowIndex + 1}-${cellIndex + 1}`
									})
								)
							),
							rows.length > 1 && el('td', {
								key: 'remove-row',
								style: { border: '1px solid #ddd', padding: '4px', textAlign: 'center' }
							},
								el('button', {
									onClick: () => removeRow(rowIndex),
									style: { 
										background: '#dc3545', 
										color: 'white', 
										border: 'none', 
										borderRadius: '3px',
										cursor: 'pointer',
										fontSize: '12px',
										padding: '2px 6px'
									}
								}, 'Remove Row')
							)
						])
					)
				)
			]);

			const tableContent = isScrollable ? 
				el('div', { className: 'usa-table-container--scrollable' }, tableElement) :
				tableElement;

			return el('div', blockProps, [
				el(InspectorControls, { key: 'inspector' }, [
					el(PanelBody, {
						title: __('Table Settings', 'wp-uswds'),
						initialOpen: true
					}, [
						el(TextControl, {
							key: 'caption',
							label: __('Table Caption', 'wp-uswds'),
							value: caption,
							onChange: (value) => setAttributes({ caption: value }),
							help: __('Describe the table content for accessibility', 'wp-uswds')
						}),
						el(SelectControl, {
							key: 'variant',
							label: __('Table Style', 'wp-uswds'),
							value: variant,
							options: tableVariants,
							onChange: (value) => setAttributes({ variant: value })
						}),
						el(ToggleControl, {
							key: 'scrollable',
							label: __('Scrollable Table', 'wp-uswds'),
							checked: isScrollable,
							onChange: (value) => setAttributes({ isScrollable: value }),
							help: __('Wrap table in scrollable container for wide tables', 'wp-uswds')
						}),
						el(ToggleControl, {
							key: 'sticky',
							label: __('Sticky Header', 'wp-uswds'),
							checked: hasStickyHeader,
							onChange: (value) => setAttributes({ hasStickyHeader: value }),
							help: __('Keep table headers visible while scrolling', 'wp-uswds')
						})
					])
				]),
				tableContent,
				el('div', {
					key: 'controls',
					style: { marginTop: '10px', textAlign: 'center' }
				}, [
					el('button', {
						key: 'add-col',
						onClick: addColumn,
						className: 'button button-secondary',
						style: { marginRight: '10px' }
					}, __('Add Column', 'wp-uswds')),
					el('button', {
						key: 'add-row',
						onClick: addRow,
						className: 'button button-secondary'
					}, __('Add Row', 'wp-uswds'))
				])
			]);
		},
		save: function(props) {
			const { attributes } = props;
			const { caption, variant, isScrollable, hasStickyHeader, headers, rows } = attributes;

			const blockProps = useBlockProps.save({
				className: [
					'usa-table',
					variant !== 'default' ? `usa-table--${variant}` : '',
					hasStickyHeader ? 'usa-table--sticky-header' : ''
				].filter(Boolean).join(' ')
			});

			const tableElement = el('table', blockProps, [
				caption && el('caption', { key: 'caption' }, caption),
				el('thead', { key: 'thead' }, 
					el('tr', {},
						headers.map((header, index) => 
							el('th', { 
								key: `header-${index}`,
								scope: header.scope || 'col'
							}, header.content)
						)
					)
				),
				el('tbody', { key: 'tbody' },
					rows.map((row, rowIndex) =>
						el('tr', { key: `row-${rowIndex}` },
							row.cells.map((cell, cellIndex) =>
								el(cell.isHeader ? 'th' : 'td', { 
									key: `cell-${rowIndex}-${cellIndex}`,
									scope: cell.isHeader ? 'row' : undefined
								}, cell.content)
							)
						)
					)
				)
			]);

			return isScrollable ? 
				el('div', { className: 'usa-table-container--scrollable' }, tableElement) :
				tableElement;
		}
	});

})();