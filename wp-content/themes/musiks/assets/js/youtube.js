/**
 * 0.1.0
 * jPlayer youtube api
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */
(function($, undefined) {

	YTPlayer = function(cssSelector, player, setting) {
		var self = this;
		this.cssSelector = $.extend({}, this._cssSelector, cssSelector);

		this.cssSelector.play = this.cssSelector.cssSelectorAncestor + " .jp-play";
		this.cssSelector.pause = this.cssSelector.cssSelectorAncestor + " .jp-pause";
		this.cssSelector.unmute = this.cssSelector.cssSelectorAncestor + " .jp-unmute";
		this.cssSelector.currentTime = this.cssSelector.cssSelectorAncestor + " .jp-current-time";
		this.cssSelector.duration = this.cssSelector.cssSelectorAncestor + " .jp-duration";
		this.cssSelector.seekBar = this.cssSelector.cssSelectorAncestor + " .jp-progress .jp-seek-bar";
		this.cssSelector.playBar = this.cssSelector.cssSelectorAncestor + " .jp-progress .jp-play-bar";
		this.cssSelector.remove = this.cssSelector.cssSelectorAncestor + " .jp-playlist-item-remove";
		this.cssSelector.playme = ".play-me";

		this.player = player;
		this.setting = setting;

	    $(this.cssSelector.jPlayer).bind($.jPlayer.event.setmedia, function(event){
	        if(self._isYoutube()){
	          self._start();
	        }else{
	          self._stop();
	        }
	    });

	    $(this.cssSelector.play).on('click', function(event){
	        if(self._isYoutube()){
	          if($('body').hasClass('is-seeking')) return;
	          self._play();
	          $(self.cssSelector.jPlayer).trigger($.jPlayer.event.play);
	        }
	    });

	    $(this.cssSelector.pause).on('click', function(event){
	        if(self._isYoutube()){
	          if($('body').hasClass('is-seeking')) return;
	          self._pause();
	          $(self.cssSelector.jPlayer).trigger($.jPlayer.event.pause);
	        }
	    });

	    $(document).on('click', this.cssSelector.playme, function(event){
	        if(self._isYoutube()){
	          if($('body').hasClass('is-seeking')) return;
	          if( self.is_playing ){
	          	self._pause();
	          }else{
	          	self._play();
	          }
	        }
	    });

	    $(this.cssSelector.seekBar).on('click', function(event){
	        if(self._isYoutube()){
	          var posX = $(this).offset().left, posWidth = $(this).width();
			  posX = (event.pageX-posX)/posWidth;
			  $(self.cssSelector.playBar).width( (posX*100)+'%' );
		      self._seek(posX);
			  $(self.cssSelector.jPlayer).trigger($.jPlayer.event.seeking);
	        }
	    });

	    $(this.cssSelector.jPlayer).bind($.jPlayer.event.volumechange, function(event){
	        var vol = event.jPlayer.options.volume * 100;
	        if($(self.cssSelector.unmute).is(':visible')){
	          vol = 0;
	        }
	        self._volume(vol);
	    });

	    $(this.cssSelector.jPlayer).bind('youtube-ready', function(event){
	        if(self._isYoutube()){
	        	setting.play && self._start();
	        }
	    });

	    this._init();
	};

	YTPlayer.prototype = {
		loaded: false
		, id: null
		, is_playing: false
		, yt_player: false
		, yt_interval: 0
		, yt_frequency: 100
		, _cssSelector: {
			jPlayer: "#jplayer",
			ytPlayer: "#yt_player",
			cssSelectorAncestor: "#jp_container"
		}

		, _init: function(){
			this._log("_init()");
			var self = this;
			var script = document.createElement('script');
			script.src = "//www.youtube.com/iframe_api";
			var tag = document.getElementsByTagName('script')[0];
			tag.parentNode.insertBefore(script, tag);
			script.onload = function (e) {
				self._log("Youtube api ready");
				self.loaded = true;
				setTimeout(function(){ $(self.cssSelector.jPlayer).trigger('youtube-ready'); }, 2000);
			};
		}
		, _start: function(id){
	        this._log("Youtube start");
			
            $(this.cssSelector.jPlayer).jPlayer("clearMedia");
            $('body').addClass('is-seeking');
		    $(this.cssSelector.pause).show();
		    $(this.cssSelector.play).hide();
		    this.is_playing = true;
	        this._updateDisplay();

			if(this.yt_player)
			{
				this.yt_player.loadVideoById(this.id,0,'small');
			}
			else
			{
				this._loadAPI(this.id);
			}
		}
		, _play : function(){
			if(!this.yt_player) return;
	        this._log("Youtube play");
			this.yt_player.playVideo();
		}
		, _pause : function(){
			if(!this.yt_player) return;
	        this._log("Youtube pause");
			this.yt_player.pauseVideo();
		}
		, _seek : function(posX){
			if(!this.yt_player) return;
			this._log("Youtube seek");
			var posX = Math.round((posX)*this.yt_player.getDuration());
			this.yt_player.seekTo(posX, true);
		}
		, _volume : function(vol){
			if(!this.yt_player) return;
			this._log("Youtube volume change");
			this.yt_player.setVolume(vol);
		}
		, _stop : function(){
			if(!this.yt_player) return;
			this._log("Youtube stop");
			$(this.cssSelector.cssSelectorAncestor).removeClass('is-youtube');
			clearInterval(this.yt_interval);  // stop
			try{
				this.yt_player.stopVideo();	
			}catch(e){
				this._log('Youtube Error: '+e);
			}
		}
		, _loadAPI : function(id){
			var self = this;
			self._log("Youtube iframe loading");
			try{
				self.yt_player = new YT.Player('yt_player',{
					height		: '200',
					width		: '200',
					videoId		: id,
					playerVars:{
						'autohide':			1,
						'autoplay':			1,
						'controls': 		0,
						'fs':				1,
						'disablekb':		0,
						'modestbranding':	1,
						// 'cc_load_policy': 1, // forces closed captions on
						'iv_load_policy':	3, // annotations, 1=on, 3=off
						// 'playlist': videoID, videoID, videoID, etc,
						'rel':				0,
						'showinfo':			0,
						'theme':			'dark',	// dark, light
						'color':			'white',	// red, white
						'webkit-playsinline': '1',
						'allowfullscreen'	: '0'
						
					},
					events:{
						'onReady': $.proxy( self._onPlayerReady, self ),
						'onPlaybackQualityChange': $.proxy( self._onPlayerPlaybackQualityChange, self ),
						'onPlaybackRateChange' : $.proxy( self._onPlaybackRateChange, self ),
						'onStateChange': $.proxy( self._onPlayerStateChange, self ),
						'onError': $.proxy( self._onPlayerError, self )
						}
					}
				);
			}catch(e){
				self._log('Youtube Error: ' + e);
				setTimeout(function(){ $(self.cssSelector.jPlayer).trigger($.jPlayer.event.ended); }, 1500);
			}
		}
		, _onPlayerReady : function(){
			var self = this;
			self._log("Youtube iframe ready");
		}
		, _onPlayerPlaybackQualityChange : function(){
			
		}
		, _onPlaybackRateChange : function(){
			
		}
		, _onPlayerStateChange : function(state){
			var self = this;
			switch(state.data){
				case -1: //unstarted
					/* do something */
					break;
				case 0: // ended
					self._log("Youtube ended");
					self.is_playing = false;
					$(self.cssSelector.pause).show();
					$(self.cssSelector.play).hide();
					$(self.cssSelector.jPlayer).trigger($.jPlayer.event.ended);
					self._clearYoutubeTime();
					self._updateDisplay();
					break;
				case 1: // playing
					self._log("Youtube playing");
					$('body').removeClass('is-seeking');
					$(self.cssSelector.cssSelectorAncestor).addClass('is-youtube');
					self.is_playing = true;
					$(self.cssSelector.pause).show();
					$(self.cssSelector.play).hide();
					$(self.cssSelector.seekBar).width('100%');
					$(self.cssSelector.duration).text(self._toHHMMSS(self.yt_player.getDuration()));
					self._startYoutubeTime();
					self._updateDisplay();
					break;
				case 2: // paused
					self._log("Youtube paused");
					$('body').removeClass('is-seeking');
					self.is_playing = false;
					$(self.cssSelector.pause).hide();
					$(self.cssSelector.play).show();
					self._updateDisplay();
					break;
				case 3: // buffering
					self._log("Youtube buffering");
					$('body').addClass('is-seeking');
					self.is_playing = true;
					$(self.cssSelector.pause).show();
					$(self.cssSelector.play).hide();
					self._clearYoutubeTime();
					self._updateDisplay();
					/* do something */
					break;
				case 5: // video cued
					/* do something */
					break;
				default:
					// do nothing
			}

		}
		, _onPlayerError : function(error){
			this._log(error);
		}
		, _startYoutubeTime : function(){
			var self = this;
			self._log("Youtube time update");
			if(self.yt_interval > 0) clearInterval(self.yt_interval);  // stop
			self.yt_interval = setInterval( $.proxy( self._updateYoutubeTime, self ), self.yt_frequency );  // run
		}
		, _updateYoutubeTime : function(){
			var self = this;
			$(self.cssSelector.currentTime).text( self._toHHMMSS(self.yt_player.getCurrentTime()) );
			$(self.cssSelector.playBar).width( ((self.yt_player.getCurrentTime()/self.yt_player.getDuration())*100)+'%' );
		}
		, _clearYoutubeTime : function(){
			var self = this;
			if(self.yt_interval > 0) clearInterval(self.yt_interval);
		}
		, _updateDisplay : function(){
			var self = this;
			self._log('Youtube update display');
			if(self._isYoutube()){
				$(this.cssSelector.playme).removeClass('active');
			    if( self.player.playlist[self.player.current] ){
			        var current = $('a[data-id='+self.player.playlist[self.player.current]['id']+']'+', '+'a[data-id='+self.player.playlist[self.player.current]['ids']+']');
			        self.is_playing ? current.addClass('active') : current.removeClass('active');
			    }
		    }
		}
		, _toHHMMSS : function (secs) {
		    var d = Number(secs);
			var h = Math.floor(d / 3600);
			var m = Math.floor(d % 3600 / 60);
			var s = Math.floor(d % 3600 % 60);
			return ( (h > 0 ? h + ":" : "")   +   (m < 10 ? "0" : "") + m + ":"   +   (s < 10 ? "0" : "") + s);
		}
		, _isYoutube : function(){
			var item = this.player.playlist[this.player.current];
	        if(item && item.youtube){
				var _id = item.mp3;
	        	// youtu.be url from share button
				if (_id.lastIndexOf("youtu.be") != -1) {
					this.id = _id.substr(_id.lastIndexOf('/')+1);
					if (this.id.indexOf('?') != -1) {
						this.id = this.id.substr(0, this.id.indexOf('?'));
					}
				}
				else 
				{
					this.id = _id.substr(_id.lastIndexOf('=')+1);
				}
	        	return true; 
	        }
	        return false;
		}
		, _log : function(log){
			//console.log(log);
		}
	}
})(jQuery);
