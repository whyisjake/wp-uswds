#!/usr/bin/env node

/**
 * Deployment Script for WordPress USWDS
 * 
 * Builds and packages the blocks plugin and theme for deployment
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const archiver = require('archiver');

const execAsync = promisify(exec);

class Deployer {
	constructor() {
		this.rootDir = path.join(__dirname, '..');
		this.distDir = path.join(this.rootDir, 'dist');
		this.blocksDir = path.join(this.rootDir, 'packages/uswds-blocks');
		this.themeDir = path.join(this.rootDir, 'packages/uswds-theme');
	}

	/**
	 * Main deployment process
	 */
	async deploy() {
		console.log('🚀 Starting deployment process...');
		
		try {
			// Clean and create dist directory
			await this.setupDistDirectory();
			
			// Build all packages
			await this.buildPackages();
			
			// Package blocks plugin
			await this.packageBlocks();
			
			// Package theme
			await this.packageTheme();
			
			console.log('✅ Deployment complete!');
			console.log(`📦 Packages created in: ${this.distDir}`);
			
		} catch (error) {
			console.error('❌ Deployment failed:', error.message);
			process.exit(1);
		}
	}

	/**
	 * Setup distribution directory
	 */
	async setupDistDirectory() {
		console.log('📁 Setting up distribution directory...');
		
		// Remove existing dist directory
		if (fs.existsSync(this.distDir)) {
			await execAsync(`rm -rf ${this.distDir}`);
		}
		
		// Create new dist directory
		fs.mkdirSync(this.distDir, { recursive: true });
	}

	/**
	 * Build all packages
	 */
	async buildPackages() {
		console.log('🔨 Building packages...');
		
		// Build from root to handle workspace dependencies
		await execAsync('npm run build', { cwd: this.rootDir });
		
		console.log('✅ Build complete');
	}

	/**
	 * Package blocks plugin
	 */
	async packageBlocks() {
		console.log('📦 Packaging USWDS Blocks plugin...');
		
		const pluginZip = path.join(this.distDir, 'uswds-blocks.zip');
		const output = fs.createWriteStream(pluginZip);
		const archive = archiver('zip', { zlib: { level: 9 } });

		return new Promise((resolve, reject) => {
			output.on('close', () => {
				console.log(`✅ Plugin packaged: ${archive.pointer()} bytes`);
				resolve();
			});

			archive.on('error', reject);
			archive.pipe(output);

			// Add plugin files
			archive.directory(path.join(this.blocksDir, 'build'), 'uswds-blocks/build');
			archive.file(path.join(this.blocksDir, 'uswds-blocks.php'), { name: 'uswds-blocks/uswds-blocks.php' });
			archive.file(path.join(this.blocksDir, 'package.json'), { name: 'uswds-blocks/package.json' });
			
			// Add README for plugin
			const pluginReadme = this.generatePluginReadme();
			archive.append(pluginReadme, { name: 'uswds-blocks/README.txt' });

			archive.finalize();
		});
	}

	/**
	 * Package theme
	 */
	async packageTheme() {
		console.log('🎨 Packaging USWDS Theme...');
		
		const themeZip = path.join(this.distDir, 'uswds-theme.zip');
		const output = fs.createWriteStream(themeZip);
		const archive = archiver('zip', { zlib: { level: 9 } });

		return new Promise((resolve, reject) => {
			output.on('close', () => {
				console.log(`✅ Theme packaged: ${archive.pointer()} bytes`);
				resolve();
			});

			archive.on('error', reject);
			archive.pipe(output);

			// Add theme files
			archive.glob('**/*', {
				cwd: this.themeDir,
				ignore: [
					'node_modules/**',
					'src/**',
					'webpack.config.js',
					'package.json',
					'package-lock.json'
				]
			});

			archive.finalize();
		});
	}

	/**
	 * Generate WordPress plugin readme
	 */
	generatePluginReadme() {
		return `=== USWDS Blocks ===
Contributors: wp-uswds-team
Tags: gutenberg, blocks, uswds, government, accessibility
Requires at least: 6.3
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Gutenberg blocks based on the U.S. Web Design System (USWDS)

== Description ==

USWDS Blocks provides a comprehensive library of Gutenberg blocks based on all U.S. Web Design System (USWDS) components. Perfect for government websites and organizations that need to follow federal design standards.

Features:
* 47+ blocks covering all USWDS components
* Full accessibility support
* Section 508 compliant
* Mobile-responsive design
* Government-ready patterns

== Installation ==

1. Upload the plugin files to the \`/wp-content/plugins/uswds-blocks\` directory
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Start using USWDS blocks in the Gutenberg editor

== Frequently Asked Questions ==

= What is USWDS? =
The U.S. Web Design System (USWDS) is a toolkit of principles, guidance, and code to help government teams design and build accessible, mobile-friendly government websites.

= Is this plugin Section 508 compliant? =
Yes, all blocks follow USWDS accessibility standards and are Section 508 compliant.

== Changelog ==

= 1.0.0 =
* Initial release
* 47+ USWDS components as Gutenberg blocks
* Full accessibility support
* Mobile-responsive design`;
	}
}

// Run deployment if called directly
if (require.main === module) {
	const deployer = new Deployer();
	deployer.deploy().catch(console.error);
}

module.exports = Deployer;