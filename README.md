# WordPress USWDS

A comprehensive WordPress solution that converts U.S. Web Design System (USWDS) components into Gutenberg blocks and provides a complete WordPress theme for government websites.

## Overview

This project provides two main packages:

1. **USWDS Blocks** (`packages/uswds-blocks/`) - A complete library of 40+ Gutenberg blocks based on USWDS components
2. **USWDS Theme** (`packages/uswds-theme/`) - A complete WordPress theme that includes the blocks library and provides USWDS styling

## Features

### USWDS Blocks Library
- ✅ **40+ Gutenberg blocks** covering USWDS components
- ✅ **Complete Form Components Library** - 9 comprehensive form blocks
- ✅ **Two organized categories** - "USWDS Components" and "USWDS Form Components"
- ✅ **Full accessibility support** following USWDS standards
- ✅ **Single registration system** - Clean, maintainable codebase
- ✅ **WCAG 2.1 AA compliance** - Government-grade accessibility

### USWDS WordPress Theme
- ✅ **Complete WordPress theme** based on USWDS
- ✅ **Government-ready design patterns** and templates
- ✅ **Block patterns** for quick page building
- ✅ **Accessibility-first approach** - Section 508 compliant
- ✅ **Mobile-responsive design** - Mobile-first USWDS patterns
- ✅ **WordPress admin integration** - Seamless admin experience

## Quick Start

### Prerequisites
- **Node.js 18+** and npm 8.0.0+
- WordPress 6.3+
- PHP 7.4+

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd wp-uswds
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install USWDS assets (fonts, images, CSS, JS):**
```bash
npm run install:assets
```

4. **Deploy to WordPress:**
```bash
# Copy blocks plugin
cp -r packages/uswds-blocks /path/to/wordpress/wp-content/plugins/

# Copy theme
cp -r packages/uswds-theme /path/to/wordpress/wp-content/themes/
```

5. **Activate in WordPress:**
   - Activate "USWDS Blocks" plugin
   - Activate "USWDS Theme" theme

## Form Components Library

### Complete Form Building System
Build government-compliant forms with these comprehensive form blocks:

#### **Form Container**
- ✅ **USWDS Form** - Container block with InnerBlocks support
- ✅ Configurable form title, description, and submit button
- ✅ Form method (POST/GET) and action URL settings
- ✅ Proper `<form>` HTML element with USWDS styling

#### **Input Components (8 blocks)**
- ✅ **Text Input** - Multi-type support (text, email, password, number, tel, url)
- ✅ **Textarea** - Configurable rows for longer text input
- ✅ **Checkbox** - Single checkbox with proper USWDS styling
- ✅ **Radio Buttons** - Dynamic option groups with mutual exclusion logic
- ✅ **Select** - Dropdown with configurable options and placeholder text
- ✅ **File Input** - File upload with type restrictions and multiple file support
- ✅ **Date Picker** - Calendar widget with min/max date constraints and format options
- ✅ **Character Count** - Text input/textarea with character limits (10-2000 characters)

#### **Form Features**
- ✅ **Full accessibility** - ARIA attributes, proper labeling, screen reader support
- ✅ **Validation states** - Error handling, required fields, help text
- ✅ **USWDS compliance** - Exact CSS classes and HTML structure per documentation
- ✅ **Flexible building** - Drag and drop any form components into Form block
- ✅ **Government-ready** - Meets federal form requirements and accessibility standards

### Form Building Workflow
```bash
1. Add "USWDS Form" block to your page
2. Inside the form, add any combination of form components:
   - Text inputs for names, emails, phone numbers
   - Textareas for messages and longer content
   - Checkboxes and radio buttons for selections
   - Select dropdowns for options
   - File inputs for document uploads
   - Date pickers for appointments and dates
   - Character count fields for limited text input
3. Configure validation, help text, and accessibility for each field
4. Form automatically includes proper USWDS styling and structure
```

## UI Components Library

### Currently Implemented (30+ blocks)
#### **Navigation Components**
- ✅ **Header** - 4 variants (Basic, Extended, with/without Megamenu)
- ✅ **Breadcrumb** - Auto-generating and custom breadcrumb navigation
- ✅ **Footer** - Government website footers

#### **Content Components**
- ✅ **Alert** - All USWDS variants (info, warning, error, success, emergency)
- ✅ **Button** - Complete button system with all USWDS variants
- ✅ **Hero** - Hero sections with USWDS styling
- ✅ **Card** - Content cards with media support
- ✅ **Banner** - Government website banners
- ✅ **Accordion** - Expandable content sections

#### **Layout Components**
- ✅ **Process List** - Step-by-step process indicators
- ✅ **Icon** - USWDS icon system integration
- ✅ **Icon List** - Lists with USWDS icons
- ✅ **Button Group** - Grouped button layouts
- ✅ **Collection** - Content collection displays

#### **And many more UI components...**

## Project Structure

```
wp-uswds/
├── packages/
│   ├── uswds-blocks/              # Gutenberg blocks plugin
│   │   ├── simple-blocks.js       # All block registrations (40+ blocks)
│   │   ├── uswds-blocks.php       # WordPress plugin file
│   │   ├── assets/                # USWDS assets (fonts, images, CSS, JS)
│   │   └── patterns/              # Block patterns for quick page building
│   │
│   └── uswds-theme/               # WordPress theme
│       ├── functions.php          # Theme functionality
│       ├── templates/             # Block templates
│       ├── template-parts/        # Template parts
│       └── inc/                   # PHP includes
│
├── scripts/
│   ├── install-uswds-assets.js   # Asset installation script
│   └── generate-blocks.js        # Component reference tool
└── package.json                  # Root package configuration
```

## Development

### Available Scripts

```bash
# Install USWDS assets (fonts, images, CSS, JS)
npm run install:assets

# Check component reference information
npm run generate:blocks

# Node.js version management
npm run nvm:use
```

### Development Workflow

The project uses a **single registration system** via `simple-blocks.js`:
- ✅ **No complex build process** - Direct JavaScript registration
- ✅ **40+ blocks in one file** - Easy to maintain and debug
- ✅ **Immediate changes** - No compilation step required
- ✅ **Clean architecture** - Removed webpack complexity

### Adding New Blocks

All blocks are registered in `packages/uswds-blocks/simple-blocks.js`:

1. **Add block registration** using `wp.blocks.registerBlockType`
2. **Follow USWDS patterns** for HTML structure and CSS classes
3. **Include accessibility features** - ARIA attributes, proper labeling
4. **Add to appropriate category** - 'wp-uswds' or 'wp-uswds-forms'
5. **Test in WordPress** - Verify editor and frontend functionality

## Government Compliance

### Accessibility Standards
- ✅ **Section 508 compliance** - All blocks meet federal accessibility requirements
- ✅ **WCAG 2.1 AA** - Web Content Accessibility Guidelines compliance
- ✅ **Screen reader support** - Proper ARIA attributes and semantic HTML
- ✅ **Keyboard navigation** - All interactive components keyboard accessible
- ✅ **Color contrast** - USWDS color system ensures proper contrast ratios

### Federal Web Standards
- ✅ **USWDS design patterns** - Official U.S. government design system
- ✅ **Performance optimized** - Fast loading, minimal JavaScript
- ✅ **Security best practices** - Government-grade security standards
- ✅ **Mobile-first design** - Responsive across all device sizes

## Deployment

### Production Deployment
1. **Install USWDS assets:**
   ```bash
   npm run install:assets
   ```

2. **Deploy blocks plugin:**
   - Copy `packages/uswds-blocks/` to WordPress `/wp-content/plugins/`
   - Activate "USWDS Blocks" plugin in WordPress admin

3. **Deploy theme:**
   - Copy `packages/uswds-theme/` to WordPress `/wp-content/themes/`
   - Activate "USWDS Theme" in WordPress admin

4. **Start building:**
   - Use "USWDS Components" and "USWDS Form Components" in Gutenberg editor
   - Create government-compliant pages with pre-built block patterns

### WordPress Multisite
The plugin and theme architecture supports:
- ✅ **Network installations** - Works with WordPress multisite
- ✅ **Multiple sites** - Consistent USWDS experience across sites
- ✅ **Centralized management** - Plugin/theme updates from network admin

## Use Cases

### Perfect for Government Websites
- ✅ **Federal agencies** - Meets all federal web requirements
- ✅ **State government** - Adaptable for state-level websites
- ✅ **Local government** - Municipal and county websites
- ✅ **Government contractors** - Vendors building government sites
- ✅ **Educational institutions** - Universities and schools receiving federal funding

### Form Building Use Cases
- ✅ **Contact forms** - Public inquiry forms
- ✅ **Application forms** - Government program applications
- ✅ **Survey forms** - Public feedback and surveys
- ✅ **Registration forms** - Event and service registration
- ✅ **Document submission** - File upload and document collection

## Support & Documentation

- **USWDS Documentation**: [designsystem.digital.gov](https://designsystem.digital.gov/)
- **WordPress Block Editor**: [WordPress.org/support/article/wordpress-editor](https://wordpress.org/support/article/wordpress-editor/)
- **Accessibility Guidelines**: [Section508.gov](https://section508.gov/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following USWDS patterns
4. Test accessibility compliance
5. Submit a pull request

## License

This project is licensed under the GPL v2 or later - see the LICENSE file for details.

## Credits

- Built on the [U.S. Web Design System](https://designsystem.digital.gov/) by the U.S. General Services Administration
- Developed for WordPress and Gutenberg block editor
- Follows WordPress and USWDS coding standards
- **40+ blocks and comprehensive form library** - Ready for government website deployment

---

**Ready to build government-compliant WordPress websites with the complete USWDS component library!** 🏛️