+function ($) {
  $(document).ready(function(){
    var storage  = $.localStorage,
        playlist = storage.get('playlist') || [],
        setting  = storage.get('setting') || {},
        bundle   = false;

    var player   = new jPlayerPlaylist(
      {
        jPlayer: "#jplayer",
        cssSelectorAncestor: "#jp_container"
      },
      playlist,
      {
        playlistOptions: {
          enableRemoveControls: true
        },
        loop: setting.repeat,
        swfPath: "/wp-content/themes/musiks/js/jPlayer",
        supplied: "webmv, webma, ogv, oga, m4v, m4a, mp3",
        smoothPlayBar: true,
        keyEnabled: true,
        audioFullScreen: false
      }
    );

    var ytPlayer = new YTPlayer({
        jPlayer: "#jplayer"
    }, player, setting);

    $('#jplayer').bind($.jPlayer.event.ready, function() {
      if( playlist.length && setting.currentIndex > -1 ){
          player.select(setting.currentIndex);
          
          // mobile does not have the autoplay feature
          $('html').hasClass('touch') && (setting.play = false);
          
          $(this).jPlayer("playHead", setting.percent);
          setting.play && $(this).jPlayer("play", setting.currentTime);
          setting.volume && $(this).jPlayer( "volume", setting.volume );
          setting.shuffle && player.shuffle(true);
          updateDisplay();
      }
      setupListener();
    });

    $(document).on('click', '#playlist .dropdown-menu', function(e){
        e.stopPropagation();
    });

    // setup Listener
    function setupListener(){
      $('#jplayer').bind($.jPlayer.event.timeupdate, function(event){
        setting.currentTime = event.jPlayer.status.currentTime;
        setting.duration = event.jPlayer.status.duration;
        setting.percent = event.jPlayer.status.currentPercentAbsolute;
        setting.currentIndex = player.current;
        setting.shuffle = player.shuffled;
        updateSetting();
      })
      .bind($.jPlayer.event.pause, function(event){
        setting.play = false;
        updateSetting();
        updateDisplay();
        $('body').removeClass('is-seeking');
      })
      .bind($.jPlayer.event.play, function(){
        setting.play = true;
        updateSetting();
        updateDisplay();
      })
      .bind($.jPlayer.event.repeat, function(event){
        setting.repeat = event.jPlayer.options.loop;
        updateSetting();
      })
      .bind($.jPlayer.event.volumechange, function(event){
        setting.volume = event.jPlayer.options.volume;
        updateSetting();
      })
      .bind($.jPlayer.event.playing, function(event){
        $('body').removeClass('is-seeking');
      })
      .bind($.jPlayer.event.waiting, function(event){
        $('body').addClass('is-seeking');
      })
      .bind($.jPlayer.event.seeking, function(event){
        $('body').addClass('is-seeking');
      })
      .bind($.jPlayer.event.seeked, function(event){
        $('body').removeClass('is-seeking');
      })
      .bind($.jPlayer.event.setmedia, function(){
        var media = $('#jplayer').find('audio, video');
        if(playlist[player.current] && media){
          media.attr('title', ( playlist[player.current]['title'].replace(/<(?:.|\n)*?>/gm, '') ) );
          media.attr('poster', ( playlist[player.current]['poster'] ) );
        }
      })
      ;

      // remove item from player gui
      $(document).on('click', '.jp-playlist-item-remove', function(e){
        window.setTimeout(updatePlaylist, 500);
      });
      
    }

    // bind click on play-me element.
    $(document).on('click', '.play-me', function(e){
      e.stopPropagation();
      var id = $(this).attr("data-id");
      var i = inObj(id, playlist);
      if( i == -1){
        $.ajax({
           type : "get",
           dataType : "json",
           url : ajax_object.ajaxurl,
           data : {action: "get_media", id : id},
           async: false,
           success: function(obj) {
              if(obj.length == 1){
                player.add( obj[0] );
                player.play(-1);
                updatePlaylist();
              }else if(obj.length > 1){
                player.setPlaylist(obj);
                player.play(0);
                updatePlaylist();
              }
           }
        });
      }else{
        if( player.current == i ){
          setting.play ? player.pause() : player.play();
        } else {
          player.play( i );
        }
      }
    });

    // update ui
    function updateDisplay(){
      $('.play-me').removeClass('active');
      if( playlist[player.current] ){
        var current = $('a[data-id='+playlist[player.current]['id']+']'+', '+'a[data-id='+playlist[player.current]['ids']+']');
        setting.play ? current.addClass('active') : current.removeClass('active');
      }
    }

    $( document ).on( "pjaxEnd", function() {
      updateDisplay();
    });

    // update setting 
    function updateSetting(){
      storage.set( 'setting', setting );
    }

    // update playlist
    function updatePlaylist(){
      updateDisplay();
      playlist = player.playlist;
      storage.set( 'playlist', playlist );
    }

    // check exist
    function inObj(id, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if ( (list[i]['id'] == id) || (list[i]['ids'] == id) ) {
                return i;
            }
        }
        return -1;
    }

  });
}(jQuery);
