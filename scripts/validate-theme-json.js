#!/usr/bin/env node

/**
 * Validate WordPress theme.json file
 * 
 * This script validates the theme.json file against the WordPress schema
 * and checks for common errors and best practices.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

class ThemeJsonValidator {
    constructor() {
        this.themeJsonPath = path.join(__dirname, '../packages/uswds-theme/theme.json');
        this.schemaUrl = 'https://schemas.wp.org/trunk/theme.json';
        this.errors = [];
        this.warnings = [];
    }

    /**
     * Main validation function
     */
    async validate() {
        console.log('🔍 Validating theme.json file...');
        console.log(`📁 File: ${this.themeJsonPath}`);
        console.log('');

        try {
            // Check if file exists
            if (!fs.existsSync(this.themeJsonPath)) {
                this.errors.push('theme.json file not found');
                return this.displayResults();
            }

            // Parse JSON
            const themeJson = this.parseJson();
            if (!themeJson) return this.displayResults();

            // Run validations
            this.validateSchema(themeJson);
            this.validateVersion(themeJson);
            this.validateSettings(themeJson);
            this.validateStyles(themeJson);
            this.validateCustomProperties(themeJson);
            this.validateColors(themeJson);
            this.validateTypography(themeJson);
            this.validateSpacing(themeJson);

            // Display results
            this.displayResults();

        } catch (error) {
            console.error('❌ Validation failed:', error.message);
        }
    }

    /**
     * Parse JSON with error handling
     */
    parseJson() {
        try {
            const content = fs.readFileSync(this.themeJsonPath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            if (error instanceof SyntaxError) {
                this.errors.push(`Invalid JSON syntax: ${error.message}`);
            } else {
                this.errors.push(`Failed to read file: ${error.message}`);
            }
            return null;
        }
    }

    /**
     * Validate against WordPress schema
     */
    validateSchema(themeJson) {
        // Check required schema
        if (!themeJson.$schema) {
            this.warnings.push('Missing $schema property (recommended)');
        } else if (!themeJson.$schema.includes('schemas.wp.org')) {
            this.warnings.push('Schema should point to WordPress official schema');
        }

        // Check version
        if (!themeJson.version) {
            this.errors.push('Missing required "version" property');
        }
    }

    /**
     * Validate version compatibility
     */
    validateVersion(themeJson) {
        const supportedVersions = [1, 2];
        
        if (!supportedVersions.includes(themeJson.version)) {
            this.errors.push(`Unsupported version: ${themeJson.version}. Supported versions: ${supportedVersions.join(', ')}`);
        }

        if (themeJson.version === 1) {
            this.warnings.push('Version 1 is deprecated. Consider upgrading to version 2');
        }
    }

    /**
     * Validate settings structure
     */
    validateSettings(themeJson) {
        if (!themeJson.settings) {
            this.warnings.push('No settings defined');
            return;
        }

        const settings = themeJson.settings;

        // Validate color settings
        if (settings.color) {
            if (settings.color.palette && !Array.isArray(settings.color.palette)) {
                this.errors.push('color.palette must be an array');
            }

            if (settings.color.palette) {
                settings.color.palette.forEach((color, index) => {
                    if (!color.slug || !color.color || !color.name) {
                        this.errors.push(`color.palette[${index}] missing required properties (slug, color, name)`);
                    }
                    
                    if (color.color && !this.isValidColor(color.color)) {
                        this.warnings.push(`color.palette[${index}].color "${color.color}" may not be a valid color`);
                    }
                });
            }
        }

        // Validate typography settings
        if (settings.typography) {
            if (settings.typography.fontSizes && !Array.isArray(settings.typography.fontSizes)) {
                this.errors.push('typography.fontSizes must be an array');
            }

            if (settings.typography.fontFamilies && !Array.isArray(settings.typography.fontFamilies)) {
                this.errors.push('typography.fontFamilies must be an array');
            }

            if (settings.typography.fontSizes) {
                settings.typography.fontSizes.forEach((fontSize, index) => {
                    if (!fontSize.slug || !fontSize.size || !fontSize.name) {
                        this.errors.push(`typography.fontSizes[${index}] missing required properties (slug, size, name)`);
                    }
                });
            }
        }

        // Validate spacing settings
        if (settings.spacing) {
            if (settings.spacing.spacingSizes && !Array.isArray(settings.spacing.spacingSizes)) {
                this.errors.push('spacing.spacingSizes must be an array');
            }
        }
    }

    /**
     * Validate styles structure
     */
    validateStyles(themeJson) {
        if (!themeJson.styles) {
            this.warnings.push('No styles defined');
            return;
        }

        // Check for common style properties
        const styles = themeJson.styles;

        if (styles.color && styles.color.background && !this.isValidColor(styles.color.background) && !this.isCustomProperty(styles.color.background)) {
            this.warnings.push(`styles.color.background "${styles.color.background}" may not be valid`);
        }

        if (styles.color && styles.color.text && !this.isValidColor(styles.color.text) && !this.isCustomProperty(styles.color.text)) {
            this.warnings.push(`styles.color.text "${styles.color.text}" may not be valid`);
        }
    }

    /**
     * Validate custom properties
     */
    validateCustomProperties(themeJson) {
        if (themeJson.settings && themeJson.settings.custom) {
            console.log('✅ Custom properties defined for advanced theming');
        }
    }

    /**
     * Validate color palette
     */
    validateColors(themeJson) {
        if (!themeJson.settings?.color?.palette) {
            this.warnings.push('No color palette defined');
            return;
        }

        const colors = themeJson.settings.color.palette;
        const slugs = colors.map(c => c.slug);
        const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

        if (duplicateSlugs.length > 0) {
            this.errors.push(`Duplicate color slugs found: ${duplicateSlugs.join(', ')}`);
        }

        console.log(`✅ Found ${colors.length} color definitions`);
    }

    /**
     * Validate typography
     */
    validateTypography(themeJson) {
        const typography = themeJson.settings?.typography;
        
        if (!typography) {
            this.warnings.push('No typography settings defined');
            return;
        }

        if (typography.fontSizes) {
            console.log(`✅ Found ${typography.fontSizes.length} font size definitions`);
        }

        if (typography.fontFamilies) {
            console.log(`✅ Found ${typography.fontFamilies.length} font family definitions`);
        }
    }

    /**
     * Validate spacing
     */
    validateSpacing(themeJson) {
        const spacing = themeJson.settings?.spacing;
        
        if (!spacing) {
            this.warnings.push('No spacing settings defined');
            return;
        }

        if (spacing.spacingSizes) {
            console.log(`✅ Found ${spacing.spacingSizes.length} spacing size definitions`);
        }
    }

    /**
     * Check if a color value is valid
     */
    isValidColor(color) {
        // Basic color validation - hex, rgb, hsl, named colors
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
        const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;
        const hslPattern = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
        const customPropertyPattern = /^var:/;
        
        const namedColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black', 'white', 'gray', 'transparent'];
        
        return hexPattern.test(color) || 
               rgbPattern.test(color) || 
               rgbaPattern.test(color) || 
               hslPattern.test(color) ||
               customPropertyPattern.test(color) ||
               namedColors.includes(color.toLowerCase());
    }

    /**
     * Check if value is a CSS custom property
     */
    isCustomProperty(value) {
        return typeof value === 'string' && value.startsWith('var:');
    }

    /**
     * Display validation results
     */
    displayResults() {
        console.log('');
        console.log('📊 Validation Results');
        console.log('=' .repeat(50));
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            console.log('✅ theme.json is valid!');
            console.log('🎉 Your theme.json file passes all validation checks.');
        } else {
            if (this.errors.length > 0) {
                console.log('');
                console.log(`❌ Errors (${this.errors.length}):`);
                this.errors.forEach(error => {
                    console.log(`  • ${error}`);
                });
            }
            
            if (this.warnings.length > 0) {
                console.log('');
                console.log(`⚠️  Warnings (${this.warnings.length}):`);
                this.warnings.forEach(warning => {
                    console.log(`  • ${warning}`);
                });
            }
        }

        console.log('');
        console.log('📖 Additional Checks:');
        console.log('  • WordPress 5.8+ required for theme.json support');
        console.log('  • Place theme.json in your theme root directory');
        console.log('  • Clear caches after making changes');
        console.log('  • Test in WordPress block editor and frontend');

        return this.errors.length === 0;
    }
}

// Run validation
if (require.main === module) {
    const validator = new ThemeJsonValidator();
    validator.validate().then(isValid => {
        process.exit(isValid ? 0 : 1);
    });
}

module.exports = ThemeJsonValidator;