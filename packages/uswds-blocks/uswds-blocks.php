<?php
/**
 * Plugin Name:       USWDS Blocks
 * Description:       Gutenberg blocks based on the U.S. Web Design System (USWDS)
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Version:           1.0.0
 * Author:            WordPress USWDS Team
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-uswds
 * Domain Path:       /languages
 */

namespace WP_USWDS\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'WP_USWDS_BLOCKS_VERSION', '1.0.0' );
define( 'WP_USWDS_BLOCKS_PLUGIN_FILE', __FILE__ );
define( 'WP_USWDS_BLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'WP_USWDS_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Block registration is now handled by simple-blocks.js
 * All blocks are registered client-side using wp.blocks.registerBlockType
 */

/**
 * Add USWDS block category
 */
function add_block_categories( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'wp-uswds',
				'title' => __( 'USWDS Components', 'wp-uswds' ),
				'icon'  => 'star-filled',
			),
			array(
				'slug'  => 'wp-uswds-forms',
				'title' => __( 'USWDS Form Components', 'wp-uswds' ),
				'icon'  => 'feedback',
			),
		)
	);
}
add_filter( 'block_categories_all', __NAMESPACE__ . '\add_block_categories' );

/**
 * Enqueue USWDS assets
 */
function enqueue_uswds_assets() {
	// Enqueue USWDS CSS from CDN for now
	wp_enqueue_style(
		'uswds-styles',
		'https://unpkg.com/@uswds/uswds@latest/dist/css/uswds.min.css',
		array(),
		WP_USWDS_BLOCKS_VERSION
	);

	// Enqueue USWDS JavaScript
	wp_enqueue_script(
		'uswds-js',
		WP_USWDS_BLOCKS_PLUGIN_URL . 'assets/js/uswds.min.js',
		array(),
		WP_USWDS_BLOCKS_VERSION,
		true
	);
}

/**
 * Enqueue block editor assets
 */
function enqueue_block_editor_assets() {
	// Enqueue our simple block registration
	wp_enqueue_script(
		'uswds-blocks-editor',
		WP_USWDS_BLOCKS_PLUGIN_URL . 'simple-blocks.js',
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
		WP_USWDS_BLOCKS_VERSION,
		true
	);

	// Make sprite URL available to JavaScript
	wp_localize_script(
		'uswds-blocks-editor',
		'uswdsBlocks',
		array(
			'spriteUrl' => WP_USWDS_BLOCKS_PLUGIN_URL . 'assets/images/sprite.svg'
		)
	);

	// Enqueue USWDS CSS for editor
	wp_enqueue_style(
		'uswds-styles',
		'https://unpkg.com/@uswds/uswds@latest/dist/css/uswds.min.css',
		array(),
		WP_USWDS_BLOCKS_VERSION
	);
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_uswds_assets' );
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );

/**
 * Load plugin textdomain
 */
function load_textdomain() {
	load_plugin_textdomain(
		'wp-uswds',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', __NAMESPACE__ . '\load_textdomain' );

// Temporary debug - remove after testing
if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
	include_once __DIR__ . '/debug.php';
}

/**
 * Debug function to check block content rendering
 */
function debug_block_content( $content ) {
	if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
		error_log( 'Block content length: ' . strlen( $content ) );
		error_log( 'Block content preview: ' . substr( $content, 0, 200 ) );
	}
	return $content;
}
add_filter( 'the_content', __NAMESPACE__ . '\debug_block_content' );

/**
 * USWDS Breadcrumb Widget
 */
class USWDS_Breadcrumb_Widget extends \WP_Widget {

	public function __construct() {
		parent::__construct(
			'uswds_breadcrumb_widget',
			__( 'USWDS Breadcrumb', 'wp-uswds' ),
			array(
				'description' => __( 'Displays navigation breadcrumbs using USWDS styling.', 'wp-uswds' ),
				'classname' => 'uswds-breadcrumb-widget',
			)
		);
	}

	public function widget( $args, $instance ) {
		echo $args['before_widget'];

		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}

		// Get breadcrumb items from widget settings or generate automatically
		$items = $this->get_breadcrumb_items( $instance );

		if ( ! empty( $items ) ) {
			echo '<nav class="usa-breadcrumb" aria-label="Breadcrumbs">';
			echo '<ol class="usa-breadcrumb__list">';
			
			foreach ( $items as $index => $item ) {
				$is_last = ( $index === count( $items ) - 1 );
				$class = 'usa-breadcrumb__list-item';
				if ( $is_last ) {
					$class .= ' usa-current';
				}
				
				echo '<li class="' . esc_attr( $class ) . '">';
				if ( $is_last ) {
					echo '<span>' . esc_html( $item['text'] ) . '</span>';
				} else {
					echo '<a href="' . esc_url( $item['url'] ) . '" class="usa-breadcrumb__link">' . esc_html( $item['text'] ) . '</a>';
				}
				echo '</li>';
			}
			
			echo '</ol>';
			echo '</nav>';
		}

		echo $args['after_widget'];
	}

	public function form( $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$auto_generate = ! empty( $instance['auto_generate'] ) ? $instance['auto_generate'] : true;
		$custom_items = ! empty( $instance['custom_items'] ) ? $instance['custom_items'] : '';
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_html_e( 'Title:', 'wp-uswds' ); ?></label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
		</p>
		<p>
			<input class="checkbox" type="checkbox" <?php checked( $auto_generate ); ?> id="<?php echo esc_attr( $this->get_field_id( 'auto_generate' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'auto_generate' ) ); ?>" />
			<label for="<?php echo esc_attr( $this->get_field_id( 'auto_generate' ) ); ?>"><?php esc_html_e( 'Auto-generate breadcrumbs from page hierarchy', 'wp-uswds' ); ?></label>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'custom_items' ) ); ?>"><?php esc_html_e( 'Custom breadcrumb items (JSON format):', 'wp-uswds' ); ?></label>
			<textarea class="widefat" rows="4" id="<?php echo esc_attr( $this->get_field_id( 'custom_items' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'custom_items' ) ); ?>" placeholder='[{"text":"Home","url":"/"},{"text":"About","url":"/about/"}]'><?php echo esc_textarea( $custom_items ); ?></textarea>
			<small><?php esc_html_e( 'Only used if auto-generate is disabled. Use JSON format with "text" and "url" properties.', 'wp-uswds' ); ?></small>
		</p>
		<?php
	}

	public function update( $new_instance, $old_instance ) {
		$instance = array();
		$instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';
		$instance['auto_generate'] = ! empty( $new_instance['auto_generate'] );
		$instance['custom_items'] = ( ! empty( $new_instance['custom_items'] ) ) ? sanitize_textarea_field( $new_instance['custom_items'] ) : '';

		return $instance;
	}

	private function get_breadcrumb_items( $instance ) {
		$items = array();

		// If auto-generate is enabled, build breadcrumbs from page hierarchy
		if ( ! empty( $instance['auto_generate'] ) ) {
			$items[] = array(
				'text' => __( 'Home', 'wp-uswds' ),
				'url' => home_url( '/' )
			);

			if ( is_single() ) {
				// For posts, add the blog page if it exists
				$blog_page_id = get_option( 'page_for_posts' );
				if ( $blog_page_id ) {
					$items[] = array(
						'text' => get_the_title( $blog_page_id ),
						'url' => get_permalink( $blog_page_id )
					);
				}
				
				// Add categories for posts
				$categories = get_the_category();
				if ( ! empty( $categories ) ) {
					$category = $categories[0];
					$items[] = array(
						'text' => $category->name,
						'url' => get_category_link( $category->term_id )
					);
				}
			} elseif ( is_page() ) {
				// For pages, add parent pages
				$ancestors = get_post_ancestors( get_the_ID() );
				$ancestors = array_reverse( $ancestors );
				
				foreach ( $ancestors as $ancestor_id ) {
					$items[] = array(
						'text' => get_the_title( $ancestor_id ),
						'url' => get_permalink( $ancestor_id )
					);
				}
			} elseif ( is_category() ) {
				$category = get_queried_object();
				$blog_page_id = get_option( 'page_for_posts' );
				if ( $blog_page_id ) {
					$items[] = array(
						'text' => get_the_title( $blog_page_id ),
						'url' => get_permalink( $blog_page_id )
					);
				}
			} elseif ( is_archive() ) {
				// Add appropriate archive breadcrumbs
				if ( is_author() ) {
					$items[] = array(
						'text' => __( 'Authors', 'wp-uswds' ),
						'url' => ''
					);
				}
			}

			// Add current page as last item
			if ( is_singular() ) {
				$items[] = array(
					'text' => get_the_title(),
					'url' => ''
				);
			} elseif ( is_category() ) {
				$items[] = array(
					'text' => single_cat_title( '', false ),
					'url' => ''
				);
			} elseif ( is_archive() ) {
				$items[] = array(
					'text' => get_the_archive_title(),
					'url' => ''
				);
			}
		} else {
			// Use custom items from widget settings
			if ( ! empty( $instance['custom_items'] ) ) {
				$custom_items = json_decode( $instance['custom_items'], true );
				if ( is_array( $custom_items ) ) {
					$items = $custom_items;
				}
			}
		}

		return $items;
	}
}

/**
 * Register USWDS widgets
 */
function register_uswds_widgets() {
	register_widget( __NAMESPACE__ . '\USWDS_Breadcrumb_Widget' );
}
add_action( 'widgets_init', __NAMESPACE__ . '\register_uswds_widgets' );

/**
 * Register USWDS block patterns
 */
function register_uswds_patterns() {
	// Register pattern categories
	register_block_pattern_category(
		'uswds',
		array(
			'label' => __( 'USWDS Patterns', 'wp-uswds' ),
		)
	);

	// Manually register each pattern for better control
	register_individual_patterns();
}

/**
 * Register individual patterns manually
 */
function register_individual_patterns() {
	// Hero Banner Pattern
	register_block_pattern(
		'uswds/hero-banner',
		array(
			'title'       => __( 'USWDS Hero Banner', 'wp-uswds' ),
			'description' => __( 'A prominent hero section with USWDS banner, heading, and call-to-action button', 'wp-uswds' ),
			'categories'  => array( 'uswds', 'header', 'featured' ),
			'keywords'    => array( 'hero', 'banner', 'header', 'landing' ),
			'content'     => get_pattern_content( 'hero-banner' ),
		)
	);

	// Process Steps Pattern
	register_block_pattern(
		'uswds/process-steps',
		array(
			'title'       => __( 'USWDS Process Steps', 'wp-uswds' ),
			'description' => __( 'A step-by-step process layout using USWDS step indicator and process list components', 'wp-uswds' ),
			'categories'  => array( 'uswds', 'text', 'featured' ),
			'keywords'    => array( 'process', 'steps', 'workflow', 'guide' ),
			'content'     => get_pattern_content( 'process-steps' ),
		)
	);

	// Alert Section Pattern
	register_block_pattern(
		'uswds/alert-section',
		array(
			'title'       => __( 'USWDS Alert Section', 'wp-uswds' ),
			'description' => __( 'Multiple USWDS alerts demonstrating different alert types for notifications and important information', 'wp-uswds' ),
			'categories'  => array( 'uswds', 'text', 'call-to-action' ),
			'keywords'    => array( 'alerts', 'notifications', 'emergency', 'warning', 'info' ),
			'content'     => get_pattern_content( 'alert-section' ),
		)
	);

	// Card Grid Pattern
	register_block_pattern(
		'uswds/card-grid',
		array(
			'title'       => __( 'USWDS Card Grid', 'wp-uswds' ),
			'description' => __( 'A responsive grid of USWDS cards showcasing services, features, or content categories', 'wp-uswds' ),
			'categories'  => array( 'uswds', 'text', 'featured' ),
			'keywords'    => array( 'cards', 'grid', 'services', 'features', 'layout' ),
			'content'     => get_pattern_content( 'card-grid' ),
		)
	);

	// Summary Box Highlight Pattern
	register_block_pattern(
		'uswds/summary-box-highlight',
		array(
			'title'       => __( 'USWDS Summary Box Highlight', 'wp-uswds' ),
			'description' => __( 'A summary box pattern highlighting key information with supporting content and call-to-action', 'wp-uswds' ),
			'categories'  => array( 'uswds', 'text', 'call-to-action' ),
			'keywords'    => array( 'summary', 'highlight', 'important', 'key information' ),
			'content'     => get_pattern_content( 'summary-box-highlight' ),
		)
	);

	// Landing Page Layout Pattern
	register_block_pattern(
		'uswds/landing-page-layout',
		array(
			'title'       => __( 'USWDS Landing Page Layout', 'wp-uswds' ),
			'description' => __( 'Complete landing page layout with banner, hero section, services grid, and key information', 'wp-uswds' ),
			'categories'  => array( 'uswds', 'featured', 'header' ),
			'keywords'    => array( 'landing', 'homepage', 'government', 'layout', 'complete' ),
			'content'     => get_pattern_content( 'landing-page-layout' ),
		)
	);
}

/**
 * Get pattern content from file
 */
function get_pattern_content( $pattern_name ) {
	$pattern_file = WP_USWDS_BLOCKS_PLUGIN_PATH . 'patterns/' . $pattern_name . '.php';
	
	if ( ! file_exists( $pattern_file ) ) {
		return '';
	}
	
	$file_content = file_get_contents( $pattern_file );
	
	// Extract content after the closing PHP tag
	if ( preg_match( '/\?>\s*(.+)/s', $file_content, $match ) ) {
		return trim( $match[1] );
	}
	
	return '';
}
add_action( 'init', __NAMESPACE__ . '\register_uswds_patterns' );

/**
 * Server-side render for auto-generated breadcrumbs
 */
function render_breadcrumb_block( $attributes, $content ) {
	// Only render if auto-generate is enabled
	if ( empty( $attributes['autoGenerate'] ) ) {
		return $content;
	}

	$show_home = ! isset( $attributes['showHome'] ) || $attributes['showHome'];
	$home_text = ! empty( $attributes['homeText'] ) ? $attributes['homeText'] : __( 'Home', 'wp-uswds' );
	$show_category = ! isset( $attributes['showCategory'] ) || $attributes['showCategory'];
	$max_depth = isset( $attributes['maxDepth'] ) ? intval( $attributes['maxDepth'] ) : 0;

	$items = array();

	// Add home link if enabled
	if ( $show_home ) {
		$items[] = array(
			'text' => $home_text,
			'url' => home_url( '/' )
		);
	}

	if ( is_single() ) {
		// For posts, add the blog page if it exists
		$blog_page_id = get_option( 'page_for_posts' );
		if ( $blog_page_id ) {
			$items[] = array(
				'text' => get_the_title( $blog_page_id ),
				'url' => get_permalink( $blog_page_id )
			);
		}
		
		// Add categories for posts if enabled
		if ( $show_category ) {
			$categories = get_the_category();
			if ( ! empty( $categories ) ) {
				$category = $categories[0];
				$items[] = array(
					'text' => $category->name,
					'url' => get_category_link( $category->term_id )
				);
			}
		}
	} elseif ( is_page() ) {
		// For pages, add parent pages
		$ancestors = get_post_ancestors( get_the_ID() );
		$ancestors = array_reverse( $ancestors );
		
		// Limit depth if specified
		if ( $max_depth > 0 && count( $ancestors ) > $max_depth - 1 ) {
			$ancestors = array_slice( $ancestors, -( $max_depth - 1 ) );
		}
		
		foreach ( $ancestors as $ancestor_id ) {
			$items[] = array(
				'text' => get_the_title( $ancestor_id ),
				'url' => get_permalink( $ancestor_id )
			);
		}
	} elseif ( is_category() ) {
		$blog_page_id = get_option( 'page_for_posts' );
		if ( $blog_page_id ) {
			$items[] = array(
				'text' => get_the_title( $blog_page_id ),
				'url' => get_permalink( $blog_page_id )
			);
		}
	} elseif ( is_archive() ) {
		// Add appropriate archive breadcrumbs
		if ( is_author() ) {
			$items[] = array(
				'text' => __( 'Authors', 'wp-uswds' ),
				'url' => ''
			);
		}
	}

	// Add current page as last item
	if ( is_singular() ) {
		$items[] = array(
			'text' => get_the_title(),
			'url' => ''
		);
	} elseif ( is_category() ) {
		$items[] = array(
			'text' => single_cat_title( '', false ),
			'url' => ''
		);
	} elseif ( is_archive() ) {
		$items[] = array(
			'text' => get_the_archive_title(),
			'url' => ''
		);
	}

	// If no items, return empty
	if ( empty( $items ) ) {
		return '';
	}

	// Build the breadcrumb HTML
	$output = '<nav class="usa-breadcrumb" aria-label="Breadcrumbs">';
	$output .= '<ol class="usa-breadcrumb__list">';
	
	foreach ( $items as $index => $item ) {
		$is_last = ( $index === count( $items ) - 1 );
		$class = 'usa-breadcrumb__list-item';
		if ( $is_last ) {
			$class .= ' usa-current';
		}
		
		$output .= '<li class="' . esc_attr( $class ) . '">';
		if ( $is_last ) {
			$output .= '<span>' . esc_html( $item['text'] ) . '</span>';
		} else {
			$output .= '<a href="' . esc_url( $item['url'] ) . '" class="usa-breadcrumb__link">' . esc_html( $item['text'] ) . '</a>';
		}
		$output .= '</li>';
	}
	
	$output .= '</ol>';
	$output .= '</nav>';

	return $output;
}

/**
 * Hook into the_content to replace breadcrumb block placeholder
 */
function render_breadcrumb_in_content( $content ) {
	// Check if content contains breadcrumb block placeholder
	if ( strpos( $content, 'wp-block-uswds-breadcrumb' ) !== false && strpos( $content, 'data-auto-generate="true"' ) !== false ) {
		// Use regex to find and replace breadcrumb block placeholders
		$content = preg_replace_callback(
			'/<div class="[^"]*wp-block-uswds-breadcrumb[^"]*"[^>]*data-auto-generate="true"[^>]*data-show-home="([^"]*)"[^>]*data-home-text="([^"]*)"[^>]*data-show-category="([^"]*)"[^>]*data-max-depth="([^"]*)"[^>]*><\/div>/',
			function( $matches ) {
				$attributes = array(
					'autoGenerate' => true,
					'showHome' => $matches[1] === 'true',
					'homeText' => $matches[2],
					'showCategory' => $matches[3] === 'true',
					'maxDepth' => intval( $matches[4] )
				);
				return render_breadcrumb_block( $attributes, '' );
			},
			$content
		);
	}
	
	return $content;
}
add_filter( 'the_content', __NAMESPACE__ . '\render_breadcrumb_in_content' );