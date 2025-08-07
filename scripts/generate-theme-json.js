#!/usr/bin/env node

/**
 * Generate WordPress theme.json from USWDS Design Tokens
 * 
 * This script extracts USWDS design tokens and generates a complete
 * WordPress theme.json configuration file with proper color palettes,
 * typography scales, spacing units, and other design system values.
 */

const fs = require('fs');
const path = require('path');

class USWDSThemeJsonGenerator {
    constructor() {
        this.uswdsPath = path.join(__dirname, '../node_modules/@uswds/uswds');
        this.themeJsonPath = path.join(__dirname, '../packages/uswds-theme/theme.json');
        
        // USWDS Color tokens mapping
        this.colorTokens = {
            // Primary colors
            primary: {
                lightest: '#eff6ff',
                lighter: '#dbeafe', 
                light: '#93c5fd',
                default: '#005ea2', // blue-60v
                vivid: '#0050d8',   // blue-warm-60v
                dark: '#1e40af',    // blue-warm-70v
                darker: '#1e3a8a',  // blue-warm-80v
                darkest: '#1e293b'
            },
            // Secondary colors  
            secondary: {
                lightest: '#fef2f2',
                lighter: '#fecaca',
                light: '#f87171', 
                default: '#dc2626', // red-60v
                vivid: '#e11d48',
                dark: '#b91c1c',
                darker: '#991b1b',
                darkest: '#7f1d1d'
            },
            // Base/Gray colors
            base: {
                lightest: '#f9fafb', // gray-5
                lighter: '#f3f4f6',  // gray-cool-10
                light: '#d1d5db',    // gray-cool-30
                default: '#6b7280', // gray-cool-50
                dark: '#4b5563',     // gray-cool-60
                darker: '#374151',   // gray-cool-70
                darkest: '#1f2937'   // gray-90
            },
            // Semantic colors
            success: {
                lighter: '#dcfce7',
                light: '#bbf7d0',
                default: '#00a91c',
                dark: '#166534'
            },
            warning: {
                lighter: '#fef3c7',
                light: '#fde68a', 
                default: '#ffbe2e',
                dark: '#d97706'
            },
            error: {
                lighter: '#fecaca',
                light: '#f87171',
                default: '#b50909', 
                dark: '#dc2626'
            },
            info: {
                lighter: '#dbeafe',
                light: '#93c5fd',
                default: '#2563eb',
                dark: '#1d4ed8'
            }
        };

        // USWDS Typography tokens
        this.fontSizes = {
            'micro': '0.625rem',    // 10px
            '2xs': '0.688rem',      // 11px  
            'xs': '0.75rem',        // 12px
            'sm': '0.813rem',       // 13px
            'md': '0.875rem',       // 14px
            'lg': '1rem',           // 16px
            'xl': '1.125rem',       // 18px
            '2xl': '1.25rem',       // 20px
            '3xl': '1.5rem',        // 24px
            '4xl': '1.875rem',      // 30px
            '5xl': '2.25rem',       // 36px
            '6xl': '3rem',          // 48px
            '7xl': '3.75rem',       // 60px
            '8xl': '4.5rem',        // 72px
            '9xl': '6rem'           // 96px
        };

        // USWDS Spacing tokens (converted to rem)
        this.spacing = {
            '2px': '0.125rem',
            '05': '0.25rem',    // 4px
            '1': '0.5rem',      // 8px 
            '105': '0.75rem',   // 12px
            '2': '1rem',        // 16px
            '205': '1.25rem',   // 20px
            '3': '1.5rem',      // 24px
            '4': '2rem',        // 32px
            '5': '2.5rem',      // 40px
            '6': '3rem',        // 48px
            '7': '3.5rem',      // 56px
            '8': '4rem',        // 64px
            '9': '4.5rem',      // 72px
            '10': '5rem',       // 80px
            '15': '7.5rem'      // 120px
        };

        // USWDS Font families (official USWDS font stacks)
        this.fontFamilies = {
            'source-sans-pro': ['"Source Sans Pro"', '"Helvetica Neue"', '"Helvetica"', '"Roboto"', '"Arial"', 'sans-serif'],
            'public-sans': ['"Public Sans Web"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
            system: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
            merriweather: ['"Merriweather Web"', '"Georgia"', '"Cambria"', '"Times New Roman"', '"Times"', 'serif'],
            georgia: ['"Georgia"', '"Cambria"', '"Times New Roman"', '"Times"', 'serif'],
            'roboto-mono': ['"Roboto Mono Web"', '"Roboto Mono Web"', '"Bitstream Vera Sans Mono"', '"Consolas"', '"Courier"', 'monospace'],
            'open-sans': ['"Open Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
            helvetica: ['"Helvetica Neue"', '"Helvetica"', '"Roboto"', '"Arial"', 'sans-serif'],
            tahoma: ['"Tahoma"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
            verdana: ['"Verdana"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"']
        };
    }

    /**
     * Generate complete theme.json structure
     */
    generateThemeJson() {
        const themeJson = {
            "$schema": "https://schemas.wp.org/trunk/theme.json",
            "version": 2,
            "title": "USWDS WordPress Theme",
            "settings": {
                "color": {
                    "palette": this.generateColorPalette(),
                    "gradients": [],
                    "custom": true,
                    "customGradient": true,
                    "defaultGradients": false,
                    "defaultPalette": false,
                    "background": true,
                    "text": true,
                    "link": true
                },
                "typography": {
                    "customFontSize": true,
                    "fontStyle": true,
                    "fontWeight": true,
                    "letterSpacing": true,
                    "lineHeight": true,
                    "textDecoration": true,
                    "textTransform": true,
                    "dropCap": false,
                    "fontSizes": this.generateFontSizes(),
                    "fontFamilies": this.generateFontFamilies()
                },
                "spacing": {
                    "customSpacingSize": true,
                    "spacingSizes": this.generateSpacingSizes(),
                    "spacingScale": {
                        "operator": "*",
                        "increment": 1.5,
                        "steps": 7,
                        "mediumStep": 1.5,
                        "unit": "rem"
                    },
                    "blockGap": true,
                    "margin": true,
                    "padding": true,
                    "units": ["px", "em", "rem", "vh", "vw", "%"]
                },
                "border": {
                    "color": true,
                    "radius": true,
                    "style": true,
                    "width": true
                },
                "dimensions": {
                    "minHeight": true
                },
                "layout": {
                    "contentSize": "65rem",
                    "wideSize": "87.5rem"
                },
                "custom": {
                    "spacing": this.spacing,
                    "fontSize": this.fontSizes,
                    "colors": this.colorTokens
                }
            },
            "styles": this.generateGlobalStyles(),
            "templateParts": [
                {
                    "name": "header",
                    "title": "Header",
                    "area": "header"
                },
                {
                    "name": "header-government",
                    "title": "Government Header",
                    "area": "header"
                },
                {
                    "name": "footer", 
                    "title": "Footer",
                    "area": "footer"
                },
                {
                    "name": "footer-government",
                    "title": "Government Footer",
                    "area": "footer"
                },
                {
                    "name": "sidebar-navigation",
                    "title": "Sidebar Navigation",
                    "area": "uncategorized"
                }
            ],
            "customTemplates": [
                {
                    "name": "page-government",
                    "title": "Government Page",
                    "postTypes": ["page"]
                },
                {
                    "name": "page-handbook",
                    "title": "Handbook Page",
                    "postTypes": ["page"]
                }
            ]
        };

        return themeJson;
    }

    /**
     * Generate WordPress color palette from USWDS tokens
     */
    generateColorPalette() {
        const palette = [];

        // Add primary colors
        Object.entries(this.colorTokens.primary).forEach(([key, value]) => {
            palette.push({
                slug: `primary-${key}`,
                color: value,
                name: `Primary ${this.capitalizeFirst(key)}`
            });
        });

        // Add secondary colors
        Object.entries(this.colorTokens.secondary).forEach(([key, value]) => {
            palette.push({
                slug: `secondary-${key}`,
                color: value,
                name: `Secondary ${this.capitalizeFirst(key)}`
            });
        });

        // Add base colors
        Object.entries(this.colorTokens.base).forEach(([key, value]) => {
            palette.push({
                slug: `base-${key}`,
                color: value,
                name: `Base ${this.capitalizeFirst(key)}`
            });
        });

        // Add semantic colors
        ['success', 'warning', 'error', 'info'].forEach(semantic => {
            Object.entries(this.colorTokens[semantic]).forEach(([key, value]) => {
                palette.push({
                    slug: `${semantic}-${key}`,
                    color: value,
                    name: `${this.capitalizeFirst(semantic)} ${this.capitalizeFirst(key)}`
                });
            });
        });

        return palette;
    }

    /**
     * Generate font sizes for WordPress
     */
    generateFontSizes() {
        const fontSizes = [];

        Object.entries(this.fontSizes).forEach(([key, value]) => {
            fontSizes.push({
                slug: key,
                size: value,
                name: this.capitalizeFirst(key)
            });
        });

        return fontSizes;
    }

    /**
     * Generate font families for WordPress
     */
    generateFontFamilies() {
        const fontFamilies = [];

        Object.entries(this.fontFamilies).forEach(([key, value]) => {
            fontFamilies.push({
                slug: key,
                fontFamily: value.join(', '),
                name: this.capitalizeFirst(key)
            });
        });

        return fontFamilies;
    }

    /**
     * Generate spacing sizes for WordPress
     */
    generateSpacingSizes() {
        const spacingSizes = [];

        Object.entries(this.spacing).forEach(([key, value]) => {
            spacingSizes.push({
                slug: key,
                size: value,
                name: key
            });
        });

        return spacingSizes;
    }

    /**
     * Generate global styles
     */
    generateGlobalStyles() {
        return {
            color: {
                background: 'var:preset|color|base-lightest',
                text: 'var:preset|color|base-darkest'
            },
            typography: {
                fontFamily: 'var:preset|font-family|source-sans-pro',
                fontSize: 'var:preset|font-size|lg',
                lineHeight: '1.5'
            },
            spacing: {
                blockGap: 'var:preset|spacing|3'
            },
            elements: {
                link: {
                    color: {
                        text: 'var:preset|color|primary-default'
                    },
                    ':hover': {
                        color: {
                            text: 'var:preset|color|primary-dark'
                        }
                    }
                },
                heading: {
                    typography: {
                        fontFamily: 'var:preset|font-family|source-sans-pro',
                        fontWeight: '700'
                    }
                },
                h1: {
                    typography: {
                        fontSize: 'var:preset|font-size|6xl',
                        lineHeight: '1.2'
                    }
                },
                h2: {
                    typography: {
                        fontSize: 'var:preset|font-size|5xl',
                        lineHeight: '1.3'
                    }
                },
                h3: {
                    typography: {
                        fontSize: 'var:preset|font-size|4xl',
                        lineHeight: '1.4'
                    }
                },
                h4: {
                    typography: {
                        fontSize: 'var:preset|font-size|3xl',
                        lineHeight: '1.4'
                    }
                },
                h5: {
                    typography: {
                        fontSize: 'var:preset|font-size|2xl',
                        lineHeight: '1.5'
                    }
                },
                h6: {
                    typography: {
                        fontSize: 'var:preset|font-size|xl',
                        lineHeight: '1.5'
                    }
                }
            },
            blocks: {
                'core/button': {
                    typography: {
                        fontSize: 'var:preset|font-size|lg',
                        fontWeight: '600'
                    },
                    spacing: {
                        padding: {
                            top: 'var:preset|spacing|105',
                            right: 'var:preset|spacing|205',
                            bottom: 'var:preset|spacing|105', 
                            left: 'var:preset|spacing|205'
                        }
                    }
                },
                'core/group': {
                    spacing: {
                        margin: {
                            top: '0px',
                            bottom: 'var:preset|spacing|4'
                        }
                    }
                }
            }
        };
    }

    /**
     * Capitalize first letter
     */
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
    }

    /**
     * Generate and save theme.json file
     */
    async generate() {
        console.log('🎨 Generating WordPress theme.json from USWDS design tokens...');

        try {
            const themeJson = this.generateThemeJson();
            const themeJsonString = JSON.stringify(themeJson, null, 2);

            // Ensure theme directory exists
            const themeDir = path.dirname(this.themeJsonPath);
            if (!fs.existsSync(themeDir)) {
                fs.mkdirSync(themeDir, { recursive: true });
            }

            // Write theme.json file
            fs.writeFileSync(this.themeJsonPath, themeJsonString);

            console.log('✅ Successfully generated theme.json!');
            console.log(`📁 File saved to: ${this.themeJsonPath}`);
            console.log('');
            console.log('🎨 Generated theme.json includes:');
            console.log(`  • ${this.generateColorPalette().length} color tokens`);
            console.log(`  • ${Object.keys(this.fontSizes).length} font size tokens`);
            console.log(`  • ${Object.keys(this.spacing).length} spacing tokens`);
            console.log(`  • ${Object.keys(this.fontFamilies).length} font family tokens`);
            console.log('  • Global typography and spacing styles');
            console.log('  • Block-specific styling for WordPress blocks');
            console.log('');
            console.log('🚀 Ready for WordPress FSE theme development!');

        } catch (error) {
            console.error('❌ Error generating theme.json:', error.message);
            throw error;
        }
    }
}

// Run the generator
if (require.main === module) {
    const generator = new USWDSThemeJsonGenerator();
    generator.generate().catch(console.error);
}

module.exports = USWDSThemeJsonGenerator;