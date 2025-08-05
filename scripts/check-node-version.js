#!/usr/bin/env node

/**
 * Node.js Version Check Script
 * 
 * Ensures the correct Node.js version is being used based on .nvmrc
 */

const fs = require('fs');
const path = require('path');
const semver = require('semver');

class NodeVersionChecker {
	constructor() {
		this.rootDir = path.join(__dirname, '..');
		this.nvmrcPath = path.join(this.rootDir, '.nvmrc');
	}

	/**
	 * Check if the current Node version matches requirements
	 */
	checkVersion() {
		try {
			// Read required version from .nvmrc
			const requiredVersion = this.getRequiredVersion();
			const currentVersion = process.version;

			console.log(`🔍 Checking Node.js version...`);
			console.log(`   Required: ${requiredVersion}`);
			console.log(`   Current:  ${currentVersion}`);

			// Check if current version satisfies requirement
			if (semver.satisfies(currentVersion, `>=${requiredVersion}`)) {
				console.log(`✅ Node.js version is compatible`);
			} else {
				console.error(`❌ Node.js version mismatch!`);
				console.error(`   Please use Node.js ${requiredVersion} or higher`);
				console.error(`   
To fix this issue:
1. Install nvm if you haven't already: https://github.com/nvm-sh/nvm
2. Run: nvm use
3. Or install the required version: nvm install ${requiredVersion}
				`);
				process.exit(1);
			}
		} catch (error) {
			console.warn(`⚠️  Could not check Node.js version: ${error.message}`);
			// Don't exit with error - just warn
		}
	}

	/**
	 * Get required Node version from .nvmrc
	 */
	getRequiredVersion() {
		if (fs.existsSync(this.nvmrcPath)) {
			return fs.readFileSync(this.nvmrcPath, 'utf8').trim();
		}
		
		// Fallback to package.json engines
		const packagePath = path.join(this.rootDir, 'package.json');
		if (fs.existsSync(packagePath)) {
			const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
			if (pkg.engines && pkg.engines.node) {
				return pkg.engines.node.replace(/[^\d.]/g, ''); // Remove >= symbols
			}
		}

		throw new Error('No version requirement found in .nvmrc or package.json');
	}
}

// Only run check if this script is executed directly (not required)
if (require.main === module) {
	// Check if semver is available (might not be installed yet)
	try {
		require('semver');
		const checker = new NodeVersionChecker();
		checker.checkVersion();
	} catch (error) {
		// If semver is not available, just show a simple message
		console.log(`💡 Use 'nvm use' to ensure you're using the correct Node.js version`);
	}
}

module.exports = NodeVersionChecker;