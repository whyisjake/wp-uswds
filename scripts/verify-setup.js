#!/usr/bin/env node

/**
 * Setup Verification Script
 * 
 * Verifies that the project setup is correct and all dependencies are properly configured
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SetupVerifier {
	constructor() {
		this.rootDir = path.join(__dirname, '..');
		this.errors = [];
		this.warnings = [];
	}

	/**
	 * Run all verification checks
	 */
	verify() {
		console.log('🔍 Verifying WordPress USWDS setup...\n');

		this.checkNodeVersion();
		this.checkNvmrcFiles();
		this.checkDependencies();
		this.checkUSWDSPackage();
		this.checkBuildOutput();

		this.printResults();
	}

	/**
	 * Check Node.js version
	 */
	checkNodeVersion() {
		const currentVersion = process.version;
		const nvmrcPath = path.join(this.rootDir, '.nvmrc');
		
		if (fs.existsSync(nvmrcPath)) {
			const requiredVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();
			console.log(`✅ Node.js version: ${currentVersion} (required: ${requiredVersion})`);
		} else {
			this.warnings.push('No .nvmrc file found in root directory');
		}
	}

	/**
	 * Check .nvmrc files exist
	 */
	checkNvmrcFiles() {
		const nvmrcFiles = [
			'.nvmrc',
			'packages/uswds-blocks/.nvmrc',
			'packages/uswds-theme/.nvmrc'
		];

		nvmrcFiles.forEach(file => {
			const filePath = path.join(this.rootDir, file);
			if (fs.existsSync(filePath)) {
				console.log(`✅ Found ${file}`);
			} else {
				this.errors.push(`Missing ${file}`);
			}
		});
	}

	/**
	 * Check if dependencies are installed
	 */
	checkDependencies() {
		const nodeModulesPath = path.join(this.rootDir, 'node_modules');
		if (fs.existsSync(nodeModulesPath)) {
			console.log('✅ Root dependencies installed');
		} else {
			this.errors.push('Root node_modules not found - run npm install');
		}

		// Check blocks dependencies
		const blocksNodeModules = path.join(this.rootDir, 'packages/uswds-blocks/node_modules');
		if (fs.existsSync(blocksNodeModules)) {
			console.log('✅ Blocks dependencies installed');
		} else {
			this.warnings.push('Blocks dependencies not installed - they may be hoisted to root');
		}
	}

	/**
	 * Check USWDS package is correctly installed
	 */
	checkUSWDSPackage() {
		const uswdsPath = path.join(this.rootDir, 'node_modules/@uswds/uswds');
		if (fs.existsSync(uswdsPath)) {
			console.log('✅ @uswds/uswds package found');
			
			// Check for key USWDS files
			const uswdsCss = path.join(uswdsPath, 'dist/css/uswds.min.css');
			const uswdsJs = path.join(uswdsPath, 'dist/js/uswds.min.js');
			
			if (fs.existsSync(uswdsCss)) {
				console.log('✅ USWDS CSS found');
			} else {
				this.errors.push('USWDS CSS not found');
			}
			
			if (fs.existsSync(uswdsJs)) {
				console.log('✅ USWDS JavaScript found');
			} else {
				this.errors.push('USWDS JavaScript not found');
			}
		} else {
			this.errors.push('@uswds/uswds package not found - run npm install');
		}
	}

	/**
	 * Check build output exists
	 */
	checkBuildOutput() {
		const buildPath = path.join(this.rootDir, 'packages/uswds-blocks/build');
		if (fs.existsSync(buildPath)) {
			console.log('✅ Build output directory exists');
			
			// Check for specific block builds
			const alertBuild = path.join(buildPath, 'blocks/alert/index.js');
			const buttonBuild = path.join(buildPath, 'blocks/button/index.js');
			
			if (fs.existsSync(alertBuild)) {
				console.log('✅ Alert block build found');
			} else {
				this.warnings.push('Alert block not built - run npm run build');
			}
			
			if (fs.existsSync(buttonBuild)) {
				console.log('✅ Button block build found');
			} else {
				this.warnings.push('Button block not built - run npm run build');
			}
		} else {
			this.warnings.push('No build output found - run npm run build');
		}
	}

	/**
	 * Print verification results
	 */
	printResults() {
		console.log('\n' + '='.repeat(50));
		
		if (this.errors.length === 0 && this.warnings.length === 0) {
			console.log('🎉 Setup verification passed! Everything looks good.');
		} else {
			if (this.errors.length > 0) {
				console.log('❌ Errors found:');
				this.errors.forEach(error => console.log(`   • ${error}`));
			}
			
			if (this.warnings.length > 0) {
				console.log('⚠️  Warnings:');
				this.warnings.forEach(warning => console.log(`   • ${warning}`));
			}
		}
		
		console.log('\n💡 Quick commands:');
		console.log('   nvm use              # Use correct Node version');
		console.log('   npm install          # Install dependencies');
		console.log('   npm run build        # Build the project');
		console.log('   npm run dev          # Start development mode');
	}
}

// Run verification if called directly
if (require.main === module) {
	const verifier = new SetupVerifier();
	verifier.verify();
}

module.exports = SetupVerifier;