#!/usr/bin/env node

/**
 * USWDS Component Reference Tool
 * 
 * This script provides component discovery and reference information
 * for USWDS components. It analyzes the current block library in
 * simple-blocks.js and suggests missing components for future development.
 * 
 * Current Status: 40+ blocks implemented including comprehensive form library
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const USWDS_COMPONENTS = [
	'accordion',
	'alert',
	'banner',
	'breadcrumb',
	'button',
	'button-group',
	'card',
	'character-count',
	'checkbox',
	'collection',
	'combo-box',
	'date-picker',
	'date-range-picker',
	'file-input',
	'footer',
	'form',
	'header',
	'icon',
	'icon-list',
	'identifier',
	'in-page-navigation',
	'input-mask',
	'input-prefix-suffix',
	'language-selector',
	'link',
	'list',
	'memorable-date',
	'modal',
	'pagination',
	'process-list',
	'prose',
	'radio-buttons',
	'range-slider',
	'search',
	'select',
	'side-navigation',
	'site-alert',
	'step-indicator',
	'summary-box',
	'table',
	'tag',
	'text-input',
	'time-picker',
	'tooltip',
	'validation'
];

class ComponentReferenceGenerator {
	constructor() {
		this.pluginDir = path.join(__dirname, '..', 'packages', 'uswds-blocks');
		this.simpleBlocksFile = path.join(this.pluginDir, 'simple-blocks.js');
	}

	/**
	 * Analyze existing blocks and suggest missing components
	 */
	async analyzeComponents() {
		console.log('🔍 Analyzing USWDS components and existing blocks...');
		
		const existingBlocks = await this.getExistingBlocks();
		const missingComponents = this.findMissingComponents(existingBlocks);
		const componentInfo = await this.getComponentInfo();
		
		this.displayAnalysis(existingBlocks, missingComponents, componentInfo);
	}

	/**
	 * Get existing blocks from simple-blocks.js
	 */
	async getExistingBlocks() {
		try {
			if (!fs.existsSync(this.simpleBlocksFile)) {
				return [];
			}
			
			const content = fs.readFileSync(this.simpleBlocksFile, 'utf8');
			const blockNames = [];
			
			// Extract block names from registerBlockType calls
			const regex = /registerBlockType\s*\(\s*['"`]wp-uswds\/([^'"`]+)/g;
			let match;
			while ((match = regex.exec(content)) !== null) {
				blockNames.push(match[1]);
			}
			
			return blockNames;
		} catch (error) {
			console.error('Error reading existing blocks:', error.message);
			return [];
		}
	}

	/**
	 * Find missing components not yet implemented
	 */
	findMissingComponents(existingBlocks) {
		return USWDS_COMPONENTS.filter(component => !existingBlocks.includes(component));
	}

	/**
	 * Get component information from USWDS package
	 */
	async getComponentInfo() {
		const uswdsPath = path.join(__dirname, '../node_modules/@uswds/uswds');
		const componentInfo = {};
		
		for (const componentName of USWDS_COMPONENTS) {
			const componentPath = path.join(uswdsPath, 'packages', `usa-${componentName}`);
			
			componentInfo[componentName] = {
				name: componentName,
				title: this.formatTitle(componentName),
				description: `USWDS ${this.formatTitle(componentName)} component`,
				exists: fs.existsSync(componentPath),
				attributes: this.inferAttributes(componentName)
			};

			// Try to read component package.json for metadata
			try {
				const packagePath = path.join(componentPath, 'package.json');
				if (fs.existsSync(packagePath)) {
					const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
					componentInfo[componentName].description = packageData.description || componentInfo[componentName].description;
				}
			} catch (error) {
				// Use default data if package.json doesn't exist
			}
		}

		return componentInfo;
	}

	/**
	 * Display analysis results
	 */
	displayAnalysis(existingBlocks, missingComponents, componentInfo) {
		console.log('\n📊 USWDS Block Analysis Report');
		console.log('=' .repeat(50));
		
		console.log(`\n✅ Existing Blocks (${existingBlocks.length}):`);
		existingBlocks.sort().forEach(block => {
			const info = componentInfo[block];
			console.log(`  • ${block} - ${info ? info.title : 'Unknown'}`);
		});
		
		console.log(`\n🔨 Missing Components (${missingComponents.length}):`);
		missingComponents.sort().forEach(component => {
			const info = componentInfo[component];
			const status = info && info.exists ? '📦' : '❓';
			console.log(`  ${status} ${component} - ${info ? info.title : 'Unknown'}`);
		});
		
		console.log(`\n📈 Progress: ${existingBlocks.length}/${USWDS_COMPONENTS.length} components implemented (${Math.round(existingBlocks.length / USWDS_COMPONENTS.length * 100)}%)`);
		
		if (missingComponents.length > 0) {
			console.log('\n💡 Suggested next components to implement:');
			const priorityComponents = ['button-group', 'form', 'input-mask', 'modal', 'pagination', 'table'];
			const suggestions = missingComponents.filter(c => priorityComponents.includes(c));
			
			if (suggestions.length > 0) {
				suggestions.forEach(component => {
					const info = componentInfo[component];
					console.log(`  🎯 ${component} - ${info ? info.title : 'Unknown'}`);
				});
			} else {
				missingComponents.slice(0, 5).forEach(component => {
					const info = componentInfo[component];
					console.log(`  • ${component} - ${info ? info.title : 'Unknown'}`);
				});
			}
		}
		
		console.log('\n📝 Note: This script now provides analysis only.');
		console.log('   Manual block implementation in simple-blocks.js is preserved.');
	}

	/**
	 * Infer common attributes for component
	 */
	inferAttributes(componentName) {
		const commonAttributes = {
			content: {
				type: 'string',
				default: ''
			}
		};

		// Component-specific attributes
		switch (componentName) {
			case 'alert':
				return {
					type: {
						type: 'string',
						default: 'info',
						enum: ['info', 'warning', 'error', 'success', 'emergency']
					},
					heading: {
						type: 'string',
						default: ''
					},
					content: {
						type: 'string',
						default: ''
					},
					slim: {
						type: 'boolean',
						default: false
					},
					noIcon: {
						type: 'boolean',
						default: false
					}
				};
			
			case 'button':
				return {
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
						default: 'default',
						enum: ['default', 'secondary', 'accent-cool', 'accent-warm', 'base', 'outline', 'big', 'unstyled']
					},
					size: {
						type: 'string',
						default: 'default',
						enum: ['default', 'big']
					}
				};
			
			case 'card':
				return {
					title: {
						type: 'string',
						default: ''
					},
					content: {
						type: 'string',
						default: ''
					},
					imageUrl: {
						type: 'string',
						default: ''
					},
					linkUrl: {
						type: 'string',
						default: ''
					},
					linkText: {
						type: 'string',
						default: ''
					}
				};
			
			case 'accordion':
				return {
					items: {
						type: 'array',
						default: [
							{
								title: 'First Amendment',
								content: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.'
							}
						]
					},
					bordered: {
						type: 'boolean',
						default: false
					},
					multiselectable: {
						type: 'boolean',
						default: false
					}
				};
			
			default:
				return commonAttributes;
		}
	}

	/**
	 * Generate reference template for a component (for manual implementation)
	 */
	generateReferenceTemplate(componentName) {
		const componentData = {
			name: componentName,
			title: this.formatTitle(componentName),
			attributes: this.inferAttributes(componentName)
		};
		
		console.log(`\n📋 Reference template for ${componentName}:`);
		console.log('=' .repeat(40));
		console.log(`
// Add this to simple-blocks.js:
wp.blocks.registerBlockType('wp-uswds/${componentName}', {
	title: 'USWDS ${componentData.title}',
	description: 'USWDS ${componentData.title} component',
	category: 'wp-uswds',
	icon: 'admin-generic',
	attributes: ${JSON.stringify(componentData.attributes, null, '\t\t').replace(/\n/g, '\n\t\t')},
	edit: function(props) {
		const { attributes, setAttributes } = props;
		
		return el('div', {
			className: 'usa-${componentName}'
		}, [
			// Add component content here
			el('p', {}, 'USWDS ${componentData.title} block content')
		]);
	},
	save: function(props) {
		const { attributes } = props;
		
		return el('div', {
			className: 'usa-${componentName}'
		}, [
			// Add component save content here
		]);
	}
});
`);
	}

	/**
	 * Format component name to title case
	 */
	formatTitle(name) {
		return name
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	/**
	 * Get appropriate WordPress icon name
	 */
	getIconName(componentName) {
		const iconMap = {
			'accordion': 'list',
			'alert': 'warning',
			'banner': 'flag',
			'breadcrumb': 'arrow-right',
			'button': 'button',
			'card': 'media-default',
			'modal': 'admin-page',
			'search': 'search',
			'table': 'editor-table',
			'tag': 'tag'
		};

		return iconMap[componentName] || 'admin-generic';
	}
}

// Run the reference tool
if (require.main === module) {
	const generator = new ComponentReferenceGenerator();
	
	// Parse command line arguments
	const args = process.argv.slice(2);
	
	if (args.length > 0) {
		const command = args[0];
		
		if (command === 'template' && args[1]) {
			// Generate reference template for specific component
			const componentName = args[1];
			if (USWDS_COMPONENTS.includes(componentName)) {
				generator.generateReferenceTemplate(componentName);
			} else {
				console.error(`❌ Component "${componentName}" not found in USWDS_COMPONENTS list`);
				console.log('Available components:', USWDS_COMPONENTS.join(', '));
			}
		} else {
			console.log('Usage:');
			console.log('  npm run generate:blocks              - Analyze existing blocks');
			console.log('  npm run generate:blocks template <name> - Generate reference template');
		}
	} else {
		// Default: run analysis
		generator.analyzeComponents().catch(console.error);
	}
}

module.exports = ComponentReferenceGenerator;