<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'wordpress' );

/** MySQL database password */
define( 'DB_PASSWORD', 'ingTDF.19' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'U=VN^ht&xM<eoM:bN]!]e9@H*|6hvl(;P=pKQh,zUOo Ff41Fpt4f{1e/X#3iZ9/');
define('SECURE_AUTH_KEY',  'g?u|rO-edXMR/O(N1zFH_k7]-fciI)L- ]Zg;*RfoBw6y^[kWMz[i#N.QFgUv#@r');
define('LOGGED_IN_KEY',    'zV5AOMf{b|B 1Q-?@*UPse@z wfdkd<Q<_y6NYhe?{<C*V%Vt6&zLpE @ yj_>5P');
define('NONCE_KEY',        'aEky,#>i7Sa&+ tA|3%)|hOMLy@EPB+kL$k^@b f1VJuJp{h|lE}mu08{0EAc7KB');
define('AUTH_SALT',        'qKBhwuhyV-CXi}>(`/bo-sy5:oXrI>6}@|{<8i|.9]tT|h40pTuRj;JtzKxbP!3z');
define('SECURE_AUTH_SALT', 'S_K 9=-WX23![q61hegL6!=[Q}o3f49~f)[Y.1U:gcUP1?w?;P!6c90)d^jD+]Mi');
define('LOGGED_IN_SALT',   ' `g )/(SMIwc(8CIx*qAwIA>ZPX4TN#$->b+Zv5AAG- SLF,v_FJl6$cI-H9[G!9');
define('NONCE_SALT',       '-]Y3#SA1nuJ2+9n{,Y-V9plG-;FrodH# `=1H93k^*f0a}:+j9)7N7+jT/+?)|RW');
// Auth JWT
define('JWT_AUTH_SECRET_KEY', 'your-top-secret-key');
define('JWT_AUTH_CORS_ENABLE', true);

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );

/** 
 * ADICIONALES
 */


// /** WP URL */
// define( 'WP_SITEURL', 'http://' . $_SERVER['SERVER_NAME'] . '/wordpress' );

// /** Dynamically set WP_HOME based on $_SERVER[‘HTTP_HOST’] */
// define( 'WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] . '/wordpress' );

// /** Set WP_CONTENT_DIR to the full local path of this directory (no trailing slash) */
// define( 'WP_CONTENT_DIR', dirname(__FILE__) . '/wordpress/wp-content' );

// /** Set WP_CONTENT_URL to the full URL of this directory (no trailing slash) */
// define( 'WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/wordpress/wp-content' );

// /** Set UPLOADS to : */
// define( 'UPLOADS', 'wordpress/wp-content/uploads' );

// define( 'AUTOSAVE_INTERVAL', 160 ); // Seconds
// define( 'WP_POST_REVISIONS', false );

// define( 'COOKIE_DOMAIN', 'http://localhost' );

// define( 'WP_ALLOW_MULTISITE', true );

// define( 'NOBLOGREDIRECT', 'http://localhost' );

// define( 'WP_MEMORY_LIMIT', '96M' );

// define( 'WP_MAX_MEMORY_LIMIT', '256M' );

// define( 'WP_LANG_DIR', dirname(__FILE__) . 'wordpress/languages' );


// /** Override of default file permissions */
// define( 'FS_CHMOD_DIR', ( 0755 & ~ umask() ) );
// define( 'FS_CHMOD_FILE', ( 0644 & ~ umask() ) );


// define( 'FS_METHOD', 'ftpext' );
// define( 'FTP_BASE', dirname(__FILE__) .'/wordpress/' );
// define( 'FTP_CONTENT_DIR', dirname(__FILE__) .'/wordpress/wp-content/' );
// define( 'FTP_PLUGIN_DIR ', dirname(__FILE__) .'/wordpress/wp-content/plugins/' );
// define( 'FTP_PUBKEY', '/home/username/.ssh/id_rsa.pub' );
// define( 'FTP_PRIKEY', '/home/username/.ssh/id_rsa' );
// define( 'FTP_USER', 'citdf' );
// define( 'FTP_PASS', 'ingTDF.19' );
// define( 'FTP_HOST', 'ftp.localhost' );
// define( 'FTP_SSL', false );

// // define( 'DO_NOT_UPGRADE_GLOBAL_TABLES', true );

// define( 'DISALLOW_FILE_EDIT', true );

// define( 'DISALLOW_FILE_MODS', true );

// define( 'AUTOMATIC_UPDATER_DISABLED', true );

// # Disable all core updates:
// define( 'WP_AUTO_UPDATE_CORE', false );

@ini_set( 'upload_max_size' , '12M' );
@ini_set( 'post_max_size', '13M');
@ini_set( 'memory_limit', '15M' );
