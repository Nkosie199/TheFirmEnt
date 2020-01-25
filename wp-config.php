<?php
/* For solving HTTP error when uploading files */
define( 'WP_MEMORY_LIMIT', '64M' );
define('WP_CACHE', false);

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
define('DB_NAME', 'wordpress_fb');

/** MySQL database username */
define('DB_USER', 'wordpress_b');

/** MySQL database password */
define('DB_PASSWORD', '1xm4TJ!9Xh');

/** MySQL hostname */
define('DB_HOST', '188.121.44.180:3306');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '0&b2A7&OGLJ6)^YXOGl)MtpnxMX)qZVn6kI8ySR&XPuoyPR@RTpM0&i2awcCoRTl');
define('SECURE_AUTH_KEY',  '!pzWwsqYANZT*lKZ10yY9xtTotm#2^L&8JDZRmag^0KYtatllTc&0d0bDJaBacu0');
define('LOGGED_IN_KEY',    '!SL*Z93TvRlbOKKjYbdD2AcNOLRD%iF6l%!%8jUyb#GOI4AaytewNPA4baxwa%Hu');
define('NONCE_KEY',        '&xpVp9Wp@ZugeHNTQ#7d3u7Rd#xUYDnqDkIWoCf0d9w7HndClKRo3dhwiIFRHdYV');
define('AUTH_SALT',        'yvDv5Be3wLZWDBtK1^GnfPM(@A4WaIvn(ocSYJbRMi%jLAk*Nelq!&OMl9UMYzkG');
define('SECURE_AUTH_SALT', '727DAo(pDvZWn2vL2f9^LLwVEVvWU10G16@B8g!Zca&i@2tTySuhccBk6NjmMtqP');
define('LOGGED_IN_SALT',   'CNj@gXDu^lX#6(tamhqtCwkwJLhXv5qQ%@b!AbUSbJYXbeDkw(rjs8z64*eJ6W1O');
define('NONCE_SALT',       'ccpE)@p^UXxs@ieqy0a2o5b3(KKK#WE0it^e5FlLM7oSz06*zJNOBtBlc!2x8i5q');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'WJ3280ya_';

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
// Enable WP debug mode
define('WP_DEBUG', true);

// Enable debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

define( 'WP_ALLOW_MULTISITE', true );

define ('FS_METHOD', 'direct');
?>