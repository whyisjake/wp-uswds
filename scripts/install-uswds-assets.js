#!/usr/bin/env node

/**
 * USWDS Asset Installation Script
 * 
 * Copies USWDS assets (fonts, images, JavaScript) to the appropriate locations
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class USWDSAssetInstaller {
	constructor() {
		this.rootDir = path.join(__dirname, '..');
		this.uswdsPath = path.join(this.rootDir, 'node_modules/@uswds/uswds');
		this.blocksAssetsDir = path.join(this.rootDir, 'packages/uswds-blocks/assets');
		this.themeAssetsDir = path.join(this.rootDir, 'packages/uswds-theme/assets');
	}

	/**
	 * Install USWDS assets
	 */
	async install() {
		console.log('📦 Installing USWDS assets...');
		
		try {
			// Create asset directories
			await this.createDirectories();
			
			// Copy USWDS fonts
			await this.copyFonts();
			
			// Copy USWDS images
			await this.copyImages();
			
			// Copy USWDS JavaScript
			await this.copyJavaScript();
			
			console.log('✅ USWDS assets installed successfully!');
			
		} catch (error) {
			console.error('❌ Asset installation failed:', error.message);
			process.exit(1);
		}
	}

	/**
	 * Create asset directories
	 */
	async createDirectories() {
		console.log('📁 Creating asset directories...');
		
		const directories = [
			path.join(this.blocksAssetsDir, 'fonts'),
			path.join(this.blocksAssetsDir, 'images'),
			path.join(this.blocksAssetsDir, 'js'),
			path.join(this.themeAssetsDir, 'fonts'),
			path.join(this.themeAssetsDir, 'images'),
			path.join(this.themeAssetsDir, 'js'),
		];

		directories.forEach(dir => {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
		});
	}

	/**
	 * Copy USWDS fonts
	 */
	async copyFonts() {
		console.log('🔤 Copying USWDS fonts...');
		
		const uswdsFonts = path.join(this.uswdsPath, 'dist/fonts');
		
		if (fs.existsSync(uswdsFonts)) {
			// Copy to blocks assets
			await execAsync(`cp -r "${uswdsFonts}"/* "${path.join(this.blocksAssetsDir, 'fonts')}"`);
			
			// Copy to theme assets
			await execAsync(`cp -r "${uswdsFonts}"/* "${path.join(this.themeAssetsDir, 'fonts')}"`);
			
			console.log('✅ Fonts copied');
		} else {
			console.warn('⚠️ USWDS fonts not found, skipping...');
		}
	}

	/**
	 * Copy USWDS images
	 */
	async copyImages() {
		console.log('🖼️ Copying USWDS images...');
		
		const uswdsImages = path.join(this.uswdsPath, 'dist/img');
		
		if (fs.existsSync(uswdsImages)) {
			// Copy to blocks assets
			await execAsync(`cp -r "${uswdsImages}"/* "${path.join(this.blocksAssetsDir, 'images')}"`);
			
			// Copy to theme assets  
			await execAsync(`cp -r "${uswdsImages}"/* "${path.join(this.themeAssetsDir, 'images')}"`);
			
			console.log('✅ Images copied');
		} else {
			console.warn('⚠️ USWDS images not found, skipping...');
		}
	}

	/**
	 * Copy USWDS JavaScript
	 */
	async copyJavaScript() {
		console.log('📜 Copying USWDS JavaScript...');
		
		const uswdsJS = path.join(this.uswdsPath, 'dist/js/uswds.min.js');
		
		if (fs.existsSync(uswdsJS)) {
			// Copy to blocks assets
			fs.copyFileSync(uswdsJS, path.join(this.blocksAssetsDir, 'js/uswds.min.js'));
			
			// Copy to theme assets
			fs.copyFileSync(uswdsJS, path.join(this.themeAssetsDir, 'js/uswds.min.js'));
			
			console.log('✅ JavaScript copied');
		} else {
			console.warn('⚠️ USWDS JavaScript not found, skipping...');
		}
	}
}

// Run installation if called directly
if (require.main === module) {
	const installer = new USWDSAssetInstaller();
	installer.install().catch(console.error);
}

module.exports = USWDSAssetInstaller;