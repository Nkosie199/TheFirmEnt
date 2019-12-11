=== musik ===

== Installation ==
	
Read the documentation.pdf

== Changelog ==

= 1.0 - 30 July 15 =
* Initial release

= 1.1 - 13 August 15 =
* Add Edtior when add artist
* Add musik remote url when post music
* Add Radio station
* Add SoundCloud
* Add Event category
* Add video category

* Improvement on mobile

= 1.1.1 - 14 August 15 =

* Fix the demo content.xml
* Add version log


= 1.2 

NOTICE: the slug "musics" changed to "music", you need go to the "Settings>Permalinks" to update the slug for the whole site.

* Add shortcode support on the text widgets
* Add custom style on the default video player

* Add option to disable register/cart
* Add option to disable the bjax loading style
* Add option to disable player
* Add option to disable search on top bar

* Select music by ids on music widget
* Select taxonomy by ids on music terms widget

* Add link group field when post music
* Add option for disable the play icon on list or detail page for each music
* Add purchase button on list
* Add download button on list and detail page

* Add custom category template when create/edit category
	(removed category-event.php, and move category-video.php to "template-parts/template-video.php")

* Add child theme example code
* Allow override the edd.php functions in child theme

* Add BuddyPress ready

* Fix white background sub menu


= 1.2.1

* Add option to disable the share button.
	inc/customizer-theme.php, template-parts/content-single-download.php
* Fix double logo on mobile when chose img logo type.
	header.php
* Fix the "?>" on footer.php
	footer.php


= 1.3

* Add ajax when page switch
	lot of files changed
* Add soundcloud trackid support.
	inc/customizer-theme.php, piklist/parts/meta-boxes/music.php
* Add pagination for artists and their music
	taxonomy-download-artist.php
* Add link for music title on the player
	inc/edd.php, template-parts/player.php
* Add template which disable the left nav or top nav.
    add header-dummy.php, template-parts/template-dummy.php
* Add html tag support on music widget subtitle
	inc/widgets/*
* Add top bar widgets area
	inc/sidebars.php, header.php
* Add FES preview field(preview_vendor) to play verdor's music preview file
	inc/edd.php
* Add option to disable the purchase button on whole site.
	inc/customizer-theme.php
* Add option to disable the play button on whole site.
	inc/customizer-theme.php
* update fontawesome
	assets/fonts/
* disable variation pricing display on grid list
	template-parts/content-download.php
* fix playlist disappear when click the remove btn
	assets/js/player.js
* Fix custom link with loading style bug
	move to pjax function
* fix the iframe on google ad
	style.css
* fix lower size of the artist photo
	taxonomy-download_artist.php
* Add option to change the music title
	inc/customizer-theme.php
* Add option to show purchase button on list
	template-parts/content-download.php, template-parts/content-download-list.php
* Add option to show upload user profile on list and grid
	template-parts/content-download.php, template-parts/content-download-list.php
* Add upload user profile on music detail page
	template-parts/content-single-download.php
* Add BuddyPress integration
	style.css
* update documention
	
= 1.3.1

* Change the medium size to thumbnail for the grid music image
	template-parts/content-download.php


= 2.0

* Add widget shortcode
	musiks-child/shortcode.php, inlucde this file in the functions.php
	for post: [widget type="music_post_widget" title="Music" count="12" display="list" pagination="on"]

* Add category/tag/artist filter on music post widget
	inc/widgets/widget-music-post.php
	
* Soundcloud url support
	input the soundcloud track url to get the trackid

* Category template with player
	Category with player

* Category template with thumbnail
	Category with thumbnail

* Link _blank to new tab and allow custom css
	template-parts/content-single-download.php
	
* Add page size option for artists, albums and tracks
	go to "Appearance > Customize > Misc" to set them

* Add ajax player on buddypress pages

* FES template
	replace [downloads] shortcode to replace the FES template, code included in the child theme. the main theme not allowed to use the add_shortcode function from "Theme check" plugin

* Music plays
	show play counts on music detail page
	
* Playlist
	user create playlist and show on buddypress tab

* Like
	add favorites plugin

* Update buddypress to 2.4.0 with profile cover image feature
* Deactive BuddyPress Cover Photo plugin
* Fix event category when click browser back button
* Fix comment login link to wordpress default login page
* Fix player seekbar on mobile
* Fix variable price on grid list


2.0.1

* Fix player stop on mobile.
* Fix player progress bar jump on mobile
* Fix missing files (pjax.js and nprogress) even if it exist in folder
* Update musik.pot file

2.1

* Ajax search for tracks and artists 
* Player on search results page 
* Playlist archive page 
* Add exlude on the music post widget 
* Add filter by plays on music post widget 
* Popup price chosen on variable prices item 
* Close left menu when page switched on mobile 
* Optimize on genres page on mobile 
* Force download media file 

2.1.1

* Update to wordpress 4.5
* Update piklist to 0.9.4.30 to fix taxonomy not saved on wp4.5
* Fix ajax search result font color
* Fix getcurrentuser_info() -> get_crrent_user()
* Order the tracks in album with edd drag & drop
* Auto fix pagination on home static page when updated to wp4.5

2.1.2
* Update to wordpress 4.5.2
* Update piklist to 0.9.9.9
  new piklist update table, need change the group fields.
  inc/edd.php, template-parts/content-single-download.php
* Fixed EDD & piklist error when post music
  You need change file
  "wp-content/plugins/easy-digital-downloads/includes/class-edd-register-meta.php" 
  find the "function sanitize_files"
  
  add one line code:
  if ( is_serialized( $files ) ) $files = unserialize( $files );

  final code below:
  function sanitize_files( $files = array() ) {
		$files = $this->remove_blank_rows( $files );
		if ( is_serialized( $files ) ) $files = unserialize( $files ); ////////////// add code at here
		// Clean up filenames to ensure whitespaces are stripped
		foreach( $files as $id => $file ) {

			if( ! empty( $files[ $id ]['file'] ) ) {
				$files[ $id ]['file'] = trim( $file['file'] );
			}

			if( ! empty( $files[ $id ]['name'] ) ) {
				$files[ $id ]['name'] = trim( $file['name'] );
			}
		}

		// Make sure all files are rekeyed starting at 0
		return $files;
	}

2.1.3
* Update to wordpress 4.5.3
* Add loading status icon on bottom player
* Add tinymce on artist content field
* Add filter by aritst in admin music post list.
* Fix favorite/likes bug on member profile page
* Fix nav selected issue

2.2.0
* Fix facebook share with wrong image
* Fix piklist/parts/terms/artist.php missing ","

2.2.1
* Remove site name when share to Facebook
* Add widget id
* Add youtube support
  inc/edd.php  assets/js/youtube.js  assets/js/player.js

2.2.2
* Fix youtube.js error on safari
  assets/js/youtube.js

2.2.3
* Add page sidebar
* Fix ios lock mode title
* Fix add_filter in helper.php error on some php version

2.3.0
* Fix thumbnail play button not working on mobile.
  assets/js/player.js

2.3.1
* Fix post widgets order by plays & sales
  inc/widgets/widget-music-post.php
* Fix album sort order
  inc/edd.php
* Fix playlist add order (add first on the top)
  assets/js/playlist.js    template-parts/content-single-playlist.php
* Fix login blank page if does not config the login page. 
  header.php line 141
  inc/edd.php line 182

2.3.2
* Fix a php error
  inc/edd.php
