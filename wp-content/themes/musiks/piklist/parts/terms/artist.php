<?php
/*
Title: 
Description: 
Taxonomy: download_artist
Order: 0
*/

  piklist('field', array(
    'type' => 'file'
    ,'field' => 'photo'
    ,'label' => esc_html__('Photo', 'musik')
  ));

  piklist('field', array(
    'type' => 'editor'
    ,'label' => __('Content', 'musik')
    ,'description' => __('This is a content of the artist.', 'musik')
    ,'field' => 'content'
    ,'options' => array (
      'wpautop' => true,
      'media_buttons' => true,
      'shortcode_buttons' => true,
      'teeny' => false,
      'dfw' => false,
      'quicktags' => true,
      'drag_drop_upload' => true,
      'tinymce' => array(
        'resize' => false,
        'wp_autoresize_on' => true
      )
    )
  ));
  
?>
