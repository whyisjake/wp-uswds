<?php
/**
 * Debug script to check block registration
 * 
 * Add this to your WordPress site and run it to debug block registration issues
 */

// Add this function to check what's happening
function debug_uswds_blocks() {
	$blocks_dir = plugin_dir_path( __FILE__ ) . 'build/blocks/';
	
	echo "<h2>USWDS Blocks Debug</h2>";
	echo "<p><strong>Plugin Path:</strong> " . plugin_dir_path( __FILE__ ) . "</p>";
	echo "<p><strong>Blocks Directory:</strong> " . $blocks_dir . "</p>";
	echo "<p><strong>Directory Exists:</strong> " . (is_dir($blocks_dir) ? 'Yes' : 'No') . "</p>";
	
	if (is_dir($blocks_dir)) {
		$block_folders = array_filter( glob( $blocks_dir . '*' ), 'is_dir' );
		echo "<p><strong>Found Block Folders:</strong></p><ul>";
		
		foreach ($block_folders as $folder) {
			$folder_name = basename($folder);
			$block_json = $folder . '/block.json';
			$block_js = $folder . '/index.js';
			
			echo "<li><strong>$folder_name</strong>";
			echo "<ul>";
			echo "<li>block.json exists: " . (file_exists($block_json) ? 'Yes' : 'No') . "</li>";
			echo "<li>index.js exists: " . (file_exists($block_js) ? 'Yes' : 'No') . "</li>";
			
			if (file_exists($block_json)) {
				$json_content = file_get_contents($block_json);
				$block_data = json_decode($json_content, true);
				echo "<li>Block name: " . ($block_data['name'] ?? 'Not found') . "</li>";
				echo "<li>Block title: " . ($block_data['title'] ?? 'Not found') . "</li>";
			}
			echo "</ul></li>";
		}
		echo "</ul>";
	}
	
	// Check registered blocks
	echo "<h3>Currently Registered Blocks</h3>";
	$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();
	$uswds_blocks = array_filter($registered_blocks, function($block_name) {
		return strpos($block_name, 'wp-uswds/') === 0;
	}, ARRAY_FILTER_USE_KEY);
	
	if (empty($uswds_blocks)) {
		echo "<p>No USWDS blocks are currently registered.</p>";
	} else {
		echo "<ul>";
		foreach ($uswds_blocks as $block_name => $block_type) {
			echo "<li>$block_name</li>";
		}
		echo "</ul>";
	}
}

// Add to WordPress admin
add_action('wp_dashboard_setup', function() {
	wp_add_dashboard_widget('uswds_debug', 'USWDS Blocks Debug', 'debug_uswds_blocks');
});

// Or add to a page template - uncomment the line below and visit any page
// add_action('wp_footer', 'debug_uswds_blocks');