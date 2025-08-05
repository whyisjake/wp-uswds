# WordPress USWDS

A comprehensive WordPress solution that converts U.S. Web Design System (USWDS) components into Gutenberg blocks and provides a complete WordPress theme.

## Overview

This project provides two main packages:

1. **USWDS Blocks** (`packages/uswds-blocks/`) - A library of Gutenberg blocks based on all USWDS components
2. **USWDS Theme** (`packages/uswds-theme/`) - A complete WordPress theme that includes the blocks library and provides USWDS styling

## Features

### USWDS Blocks Library
- ✅ 47+ Gutenberg blocks covering all USWDS components
- ✅ Automatic conversion system from USWDS to WordPress blocks
- ✅ Full accessibility support following USWDS standards
- ✅ Block editor integration with WordPress
- ✅ Customizable block attributes and settings

### USWDS WordPress Theme
- ✅ Complete WordPress theme based on USWDS
- ✅ Full Site Editing (FSE) support
- ✅ Government-ready design patterns
- ✅ Accessibility-first approach
- ✅ Mobile-responsive design
- ✅ WordPress admin bar compatibility
- ✅ Customizer integration

## Quick Start

### Prerequisites
- **Node.js 18+** and npm 8.0.0+
- WordPress 6.3+
- PHP 7.4+

### Node.js Version Management
This project uses Node.js 18+. If you use nvm:

```bash
# Use the correct Node version
nvm use

# Or install it if you don't have it
nvm install 18
nvm use 18
```

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wp-uswds
```

2. Install dependencies:
```bash
npm install
```

3. Build the packages:
```bash
npm run build
```

### Development

1. Start development servers:
```bash
npm run dev
```

2. Generate additional blocks from USWDS components:
```bash
npm run generate:blocks
```

### Current Status

Currently implemented and working:
- ✅ **Alert Block** - Fully functional with all USWDS alert variants
- ✅ **Button Block** - Complete with all USWDS button styles and link functionality
- ✅ **Build System** - Working webpack configuration with USWDS integration
- ✅ **Asset Pipeline** - Automatic USWDS asset installation and management

To add more blocks:
```bash
npm run generate:blocks [component-name]
```

## Project Structure

```
wp-uswds/
├── packages/
│   ├── uswds-blocks/          # Gutenberg blocks library
│   │   ├── src/
│   │   │   ├── blocks/        # Individual block components
│   │   │   ├── components/    # Shared components
│   │   │   └── utils/         # Utility functions
│   │   └── uswds-blocks.php   # WordPress plugin file
│   │
│   └── uswds-theme/           # WordPress theme
│       ├── src/
│       │   ├── js/           # Theme JavaScript
│       │   └── scss/         # Theme styles
│       ├── inc/              # PHP includes
│       ├── template-parts/   # Template parts
│       └── templates/        # Block templates
│
├── scripts/
│   └── generate-blocks.js     # Block generation script
└── package.json              # Root package configuration
```

## Available USWDS Components

The following USWDS components are converted to Gutenberg blocks:

### Form Components
- Checkbox
- Combo box
- Date picker
- Date range picker
- File input
- Input mask
- Input prefix/suffix
- Radio buttons
- Range slider
- Select
- Text input
- Time picker
- Validation

### Navigation Components
- Breadcrumb
- Header
- Footer
- In-page navigation
- Pagination
- Side navigation
- Step indicator

### UI Components
- Accordion
- Alert
- Banner
- Button
- Button group
- Card
- Collection
- Icon
- Icon list
- Link
- List
- Modal
- Process list
- Search
- Summary box
- Table
- Tag
- Tooltip

### Content Components
- Character count
- Data visualizations
- Identifier
- Language selector
- Memorable date
- Prose
- Site alert
- Typography

## Block Development

### Creating a New Block

1. Create block directory:
```bash
mkdir packages/uswds-blocks/src/blocks/my-component
```

2. Generate block files:
```bash
node scripts/generate-blocks.js my-component
```

3. Customize the generated files as needed

### Block Structure

Each block consists of:
- `block.json` - Block metadata and configuration
- `index.js` - Block registration
- `edit.js` - Editor component
- `save.js` - Frontend output
- `style.scss` - Frontend styles
- `editor.scss` - Editor-specific styles

## Theme Development

### Customization

The theme provides extensive customization options through:
- WordPress Customizer
- USWDS design tokens
- Sass variables
- Block patterns
- Template parts

### USWDS Integration

The theme automatically:
- Imports USWDS styles and JavaScript
- Maps WordPress components to USWDS patterns
- Ensures accessibility compliance
- Provides government-ready templates

## Build Process

### Available Scripts

```bash
# Build all packages
npm run build

# Start development mode
npm run dev

# Build blocks only
npm run build:blocks

# Build theme only
npm run build:theme

# Generate blocks from USWDS
node scripts/generate-blocks.js
```

### Deployment

1. Build production assets:
```bash
npm run build
```

2. Deploy blocks plugin:
   - Copy `packages/uswds-blocks/` to WordPress plugins directory
   - Activate "USWDS Blocks" plugin

3. Deploy theme:
   - Copy `packages/uswds-theme/` to WordPress themes directory
   - Activate "USWDS WordPress Theme"

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the GPL v2 or later - see the LICENSE file for details.

## Government Use

This project is designed specifically for U.S. government websites and follows:
- Section 508 accessibility requirements
- USWDS design standards
- Federal web standards
- Security best practices

## Support

- Documentation: [Link to docs]
- Issues: [GitHub Issues]
- Email: [Support email]

## Credits

- Built on the [U.S. Web Design System](https://designsystem.digital.gov/) by the U.S. General Services Administration
- Developed for WordPress and Gutenberg block editor
- Follows WordPress and USWDS coding standards
- Created with assistance from Claude (Anthropic)