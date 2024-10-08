/*! JS PLAYER MODULE YOUTUBE (JavaScript Library) v0.4.6 Copyright yama-dev Licensed MIT */

import { Str2Mustache } from '@yama-dev/js-parse-module/libs';

import { selectDom, hasClass, addClass, removeClass, toggleClass, setHtml, appendHtml, addEvent } from './util.js';

import { viewPlayerMain, viewPlayerUi, viewPlayerStyle } from './view.js';

export class PLAYER_MODULE_YOUTUBE {

  constructor(options = {}){

    // Set Change Flgs.
    this.PlayerChangeSeekingFlg = false;
    this.PlayerChangeLoadFlg = true;

    if(!options.id || !options.videoid){
      console.log('Inadequate parameters (id, videoid)');
      return false;
    }

    // Set config, options.
    this.CONFIG = {
      mode             : options.mode||'movie',
      responsive       : options.responsive === true ? true : false,
      id               : options.id||'pmy',

      player_id        : `${options.id}_player`||'pmy_player',
      player_id_wrap   : `${options.id}_player_wrap`||'pmy_player_wrap',
      player_ui_id     : `${options.id}_ui`||'pmy_ui',
      player_style_id  : `${options.id}_style`||'pmy_style',

      videoid          : options.videoid||'',
      width            : options.width||'',
      height           : options.height||'',
      volume           : options.volume||100,

      ui_clickable     : options.ui_clickable === false ? false : true,

      muted            : options.muted === true ? true : false,

      loop            : options.loop||false,

      playlist: options.playlist || [options.videoid],

      playerVars: {
        fs: 1,
        rel: 0,
        wmode: 'transparent',
        enablejsapi: 1,
        html5: 1,
        iv_load_policy: 3,
        disablekb: 1,

        autoplay: 0,
        loop: 0,
        // playlist: '',

        controls: 0,
        modestbranding: 1,

        playsinline: 1
      },

      ui_default_parts : options.ui_default_parts === false ? false : true,
      ui_default_css   : options.ui_default_css === false ? false : true,

      stop_outfocus    : options.stop_outfocus === true ? true : false,
      poster           : options.poster||`//i.ytimg.com/vi/${options.videoid}/maxresdefault.jpg`,

      add_style        : options.add_style||'',

      classname_active : 'is-active',
      classname_playing : 'is-playing'
    }

    // Set config, options.
    this.STATE = {
      playlist: this.CONFIG.playlist,
      playlist_index: 0,
    }

    // Merge Options.
    if(options.playerVars){
      Object.assign(this.CONFIG.playerVars,options.playerVars);
    }

    // Set config, callback functions.
    if(!options.on){
      options.on = {}
    }
    this.on = {
      Play    : options.on.Play||'',
      PlayPrep: options.on.PlayPrep||'',
      Pause   : options.on.Pause||'',
      Stop    : options.on.Stop||'',
      End     : options.on.End||'',
      StopAll : options.on.StopAll||'',
      Change  : options.on.Change||'',
      PlayerPlay     : options.on.PlayerPlay||'', 
      PlayerPause    : options.on.PlayerPause||'', 
      PlayerEnded    : options.on.PlayerEnded||'',
      PlayerBuffering: options.on.PlayerBuffering||'',
      PlayerCued     : options.on.PlayerCued||''
    }

    // YoutubePlayer Instance.
    this.Player = null;

    // Player wrapper.
    this.$playerElem = selectDom(`#${this.CONFIG.id}`);

    // Import Views.
    this.playerHtml   = viewPlayerMain;
    this.playerUiHtml = viewPlayerUi;
    this.playerCss    = viewPlayerStyle;
    this.playerCssOption = '';

    // Set Options
    // -> playerHtml
    // -> playerCss
    this.playerHtml = Str2Mustache(this.playerHtml, this.CONFIG);
    this.playerCss  = Str2Mustache(this.playerCss, this.CONFIG);

    // Check Audio mode.
    if(this.CONFIG.mode == 'audio'){
      this.CONFIG.width  = 1;
      this.CONFIG.height = 1;
      this.playerCssOption += `#${this.CONFIG.player_id} { opacity: 0; }`;
    }

    // Check Responsive.
    if(this.CONFIG.responsive){
      this.playerCssOption += `
        #${this.CONFIG.player_id_wrap} {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          overflow: hidden;
        }
        #${this.CONFIG.player_id_wrap} iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      `;
    }

    // Check Clickable.
    if(!this.CONFIG.ui_clickable){
      this.playerCssOption += `
        #${this.CONFIG.player_id_wrap} {
          position: relative;
        }
        #${this.CONFIG.player_id_wrap}::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `;
    }

    // Check Add Style.
    if(this.CONFIG.add_style){
      this.playerCssOption += this.CONFIG.add_style;
    }

    // SetPlayer
    if(document.readyState == 'complete'){
      this.BuildPlayer();
    } else {
      document.addEventListener('DOMContentLoaded', (event) => {
        this.BuildPlayer();
      });
    }
  }

  BuildPlayer(){
    // Player UI.
    let playerUiHtmlDom       = document.createElement('div');
    playerUiHtmlDom.id        = this.CONFIG.player_ui_id;
    playerUiHtmlDom.innerHTML = this.playerUiHtml;
    if(this.CONFIG.ui_default_parts){
      if(!selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_ui_id}`).length){
        // this.$playerElem[0].appendChild(playerUiHtmlDom);
        this.$playerElem[0].insertBefore(playerUiHtmlDom, this.$playerElem[0].firstElementChild);
      }
    }

    // Player Main.
    let playerHtmlDom     = document.createElement('div');
    let playerHtmlDomWrap = document.createElement('div');
    playerHtmlDom.id      = this.CONFIG.player_id;
    playerHtmlDomWrap.id  = this.CONFIG.player_id_wrap;
    if(selectDom(`#${this.CONFIG.id} iframe`).length){
      playerHtmlDom.innerHTML   = this.playerHtml;
      playerHtmlDomWrap.appendChild(playerHtmlDom);
      // this.$playerElem[0].appendChild(playerHtmlDomWrap);
      this.$playerElem[0].insertBefore(playerHtmlDomWrap, this.$playerElem[0].firstElementChild);
    } else {
      playerHtmlDomWrap.appendChild(playerHtmlDom);
      // this.$playerElem[0].appendChild(playerHtmlDomWrap);
      this.$playerElem[0].insertBefore(playerHtmlDomWrap, this.$playerElem[0].firstElementChild);
    }

    // Player Styles.
    let playerCssDom       = document.createElement('style');
    playerCssDom.id        = this.CONFIG.player_style_id;
    if(this.CONFIG.ui_default_css){
      playerCssDom.innerHTML = this.playerCss;
      playerCssDom.innerHTML += this.playerCssOption;
      if(!selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_style_id}`).length){
        this.$playerElem[0].appendChild(playerCssDom);
      }
    } else {
      playerCssDom.innerHTML = this.playerCssOption;
      if(!selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_style_id}`).length){
        this.$playerElem[0].appendChild(playerCssDom);
      }
    }

    this.CheckYouTubeApiScript();
  }

  CheckYouTubeApiScript(){
    let _that = this;

    if(window.YT){
      this.CheckYouTubeApiInstance();
    } else {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      tag.onload = ()=>{
        _that.CheckYouTubeApiInstance();
      };
    }

  }

  CheckYouTubeApiInstance(){
    let _that = this;

    let _count       = 0;
    let _count_limit = 100;

    let checkPlayer = setInterval(()=>{

      // Check upper limit of action to try.
      if(_count >= _count_limit){
        clearInterval(checkPlayer);
        console.log('ERROR: not movie loaded.');
      } else {
        _count++;
      }

      if(YT.loaded){
        clearInterval(checkPlayer);
        _that.YouTubeApiInstance();
      }
    },10);
  }

  YouTubeApiInstance(){
    let _that = this;

    let onPlayerReady = (event)=>{
      _that.SetPlayer();
    };

    let onPlayerStateChange = (event)=>{
      if (event.data == YT.PlayerState.PLAYING) {
        addClass(this.$playerElem, this.CONFIG.classname_active);
        this.ClassOn();
        if(this.on.PlayerPlay && typeof(this.on.PlayerPlay) === 'function') this.on.PlayerPlay(this.Player, this.CONFIG);
      }
      if (event.data == YT.PlayerState.ENDED) {
        this.Player.stopVideo();
        this.ClassOff();

        if(this.on.PlayerEnded && typeof(this.on.PlayerEnded) === 'function') this.on.PlayerEnded(this.Player, this.CONFIG);

        if(this.STATE.playlist_index + 1 == this.STATE.playlist.length){
          // 最後のIDの場合
          this.STATE.playlist_index = 0;
          if(this.CONFIG.loop){
            this.Player.clearVideo();
            this.Player.loadVideoById(this.STATE.playlist[this.STATE.playlist_index], 0, 'large');
            this.SetPoster();
            this.Player.playVideo();
          }
        } else {
          this.STATE.playlist_index++;
          this.Player.clearVideo();
          this.Player.loadVideoById(this.STATE.playlist[this.STATE.playlist_index], 0, 'large');
          this.SetPoster();
          this.Player.playVideo();
        }
      }
      if (event.data == YT.PlayerState.PAUSED) {
        this.ClassOff();
        if(this.on.PlayerPause && typeof(this.on.PlayerPause) === 'function') this.on.PlayerPause(this.Player, this.CONFIG);
      }
      if (event.data == YT.PlayerState.BUFFERING) {
        addClass(this.$playerElem, this.CONFIG.classname_active);
        if(this.on.PlayerBuffering && typeof(this.on.PlayerBuffering) === 'function') this.on.PlayerBuffering(this.Player, this.CONFIG);
      }
      if (event.data == YT.PlayerState.CUED) {
        removeClass(this.$playerElem, this.CONFIG.classname_active);
        if(this.on.PlayerCued && typeof(this.on.PlayerCued) === 'function') this.on.PlayerCued(this.Player, this.CONFIG);
      }

      this.Update();
    };

    let onPlayerError = (data)=>{
      console.log(data);
    }

    this.Player = new YT.Player(`${this.CONFIG.player_id}`, {
      width: this.CONFIG.width,
      height: this.CONFIG.height,
      videoId: this.STATE.playlist[this.STATE.playlist_index],
      playerVars: this.CONFIG.playerVars,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError
      }
    });

  }

  SetPlayer(){
    let _that = this;

    if(this.CONFIG.muted){
      this.Player.mute();
    }

    if(this.CONFIG.playerVars.autoplay){
      this.Player.playVideo();
    }

    // CacheElement
    this.CacheElement();

    this.SetVolume();
    this.SetPoster();

    // Set Event.
    this.EventPlay();
    this.EventPause();
    this.EventStop();

    this.EventChangeVideo();
    this.EventFullscreen();

    this.EventMute();
    this.EventVolon();
    this.EventVoloff();

    this.EventSeekbarVol();
    this.EventSeekbarTime();

    this.WatchPlayer();

    this.AddGlobalObject();
  }

  WatchPlayer(){

    let _frame = 0;
    let _animation = ()=>{
      requestAnimationFrame(_animation);

      _frame++;

      if (_frame % 3 != 0) { // FPS 20
        return false;
      }

      let _state = this.Player.getPlayerState();

      if(_state !== -1 && _state !== 2 && _state !== 5){
        // For Timeupdate.
        this.Update();

        // For Volume change.
        if(this.$uiSeekbarVolCover.length){
          if(this.Player.isMuted() == true){
            this.$uiSeekbarVolCover[0].style.width = '0%';
          } else if(this.Player.isMuted() == false){
            this.$uiSeekbarVolCover[0].style.width = `${this.Player.getVolume()}%`;
          }
        }
      }

    };
    requestAnimationFrame(_animation);
  }

  AddGlobalObject(){
    // windowオブジェクトへインスタンスしたPlayerを配列で管理(Player-IDを文字列で追加)
    // -> window.PLAYER_MODULE_YOUTUBE_PLATLIST

    if(window.PLAYER_MODULE_YOUTUBE_PLATLIST === undefined){
      window.PLAYER_MODULE_YOUTUBE_PLATLIST = [];
      window.PLAYER_MODULE_YOUTUBE_PLATLIST.push({
        Player: this.Player,
        id: this.CONFIG.id,
        player_id: this.CONFIG.player_id
      });
    }else{
      window.PLAYER_MODULE_YOUTUBE_PLATLIST.push({
        Player: this.Player,
        id: this.CONFIG.id,
        player_id: this.CONFIG.player_id
      });
    }
  }

  CacheElement(){
    this.$playerElem                 = selectDom(`#${this.CONFIG.id}`);
    this.$playerElemMain             = selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_id}`);
    this.$playerElemMainWrap         = selectDom(`#${this.CONFIG.id} #${this.CONFIG.player_id_wrap}`);

    this.$uiBtnPlay                  = selectDom('#'+this.CONFIG.id+' .btn_play');
    this.$uiBtnStop                  = selectDom('#'+this.CONFIG.id+' .btn_stop');
    this.$uiBtnPause                 = selectDom('#'+this.CONFIG.id+' .btn_pause');
    this.$uiBtnMute                  = selectDom('#'+this.CONFIG.id+' .btn_mute');
    this.$uiBtnVolon                 = selectDom('#'+this.CONFIG.id+' .btn_volon');
    this.$uiBtnVoloff                = selectDom('#'+this.CONFIG.id+' .btn_voloff');
    this.$uiBtnFull                  = selectDom('#'+this.CONFIG.id+' .btn_full');

    this.$uiDisplayTime              = selectDom('#'+this.CONFIG.id+' .display_time');
    this.$uiDisplayTimeNow           = selectDom('#'+this.CONFIG.id+' .display_time_now');
    this.$uiDisplayTimeTotal         = selectDom('#'+this.CONFIG.id+' .display_time_total');
    this.$uiDisplayTimeDown          = selectDom('#'+this.CONFIG.id+' .display_time_down');
    this.$uiDisplayTimePar           = selectDom('#'+this.CONFIG.id+' .display_time_par');
    this.$uiDisplayPoster            = selectDom('#'+this.CONFIG.id+' .display_poster');
    this.$uiDisplayPosterBg          = selectDom('#'+this.CONFIG.id+' .display_poster_background');
    this.$uiDisplayName              = selectDom('#'+this.CONFIG.id+' .display_name');

    this.$uiSeekbarVol               = selectDom('#'+this.CONFIG.id+' .seekbar_vol');
    this.$uiSeekbarVolBg             = selectDom('#'+this.CONFIG.id+' .seekbar_vol .seekbar_vol_bg');
    this.$uiSeekbarVolCover          = selectDom('#'+this.CONFIG.id+' .seekbar_vol span');
    this.$uiSeekbarTime              = selectDom('#'+this.CONFIG.id+' .seekbar_time');
    this.$uiSeekbarTimeBg            = selectDom('#'+this.CONFIG.id+' .seekbar_time .seekbar_time_bg');
    this.$uiSeekbarTimeCover         = selectDom('#'+this.CONFIG.id+' .seekbar_time span');

    this.$uiBtnChange                = selectDom('#'+this.CONFIG.id+' .btn_change');
    this.$uiBtnChangeDisplayTime     = selectDom('#'+this.CONFIG.id+' .display_time');
    this.$uiBtnChangeDisplayTimeDown = selectDom('#'+this.CONFIG.id+' .display_time_down');

    this.$uiBtnDataId                = selectDom('[data-PMY-id]');
  }

  EventPlay(){
    if(this.$uiBtnPlay.length){
      addEvent(this.$uiBtnPlay, 'click' , (event) => {
        if(this.Player.getPlayerState() != 1){
          this.Play();
        } else {
          this.Pause();
        }
      });
    }
  }

  EventPause(){
    if(this.$uiBtnPause.length){
      addEvent(this.$uiBtnPause, 'click' , (event) => {
        this.Pause();
      });
    }
  }

  EventStop(){
    let _that = this;
    if(this.$uiBtnStop.length){
      addEvent(this.$uiBtnStop, 'click' , (event) => {
        this.Stop();
      });
    }

    addEvent(window, 'blur' , (event) => {
      if(this.CONFIG.stop_outfocus) this.Stop();
    });
  }

  EventMute(){
    if(this.$uiBtnMute.length){
      addEvent(this.$uiBtnMute, 'click' , (event) => {
        this.Mute();
      });
    }
  }

  EventVolon(){
    if(this.$uiBtnVolon.length){
      addEvent(this.$uiBtnVolon, 'click' , (event) => {
        this.Player.setVolume(this.CONFIG.volume);
        removeClass(this.$uiBtnVolon, this.CONFIG.classname_playing);
      });
    }
  }

  EventVoloff(){
    if(this.$uiBtnVoloff.length){
      addEvent(this.$uiBtnVoloff, 'click' , (event) => {
        this.Player.setVolume(0);
        addClass(this.$uiBtnVoloff, this.CONFIG.classname_playing);
      });
    }
  }

  /**
   * When dragging a seek bar(volume).
   */
  EventSeekbarVol(){
    if(this.$uiSeekbarVol.length){
      let _flag = false;

      if(this.$uiSeekbarVolCover.length){
        if(this.Player.isMuted() == true){
          this.$uiSeekbarVolCover[0].style.width = '0%';
        } else if(this.Player.isMuted() == false){
          this.$uiSeekbarVolCover[0].style.width = `${this.Player.getVolume()}%`;
        }
      }

      addEvent(this.$uiSeekbarVol, 'mousedown' , (event) => {
        _flag = true;
        let _currentWidth    = event.currentTarget.clientWidth;
        let _clickPosition  = event.currentTarget.getBoundingClientRect().left;
        let _targetWidth = (event.pageX - _clickPosition) / _currentWidth * 100;
        this.Player.setVolume(_targetWidth);
        this.Player.unMute();
        this.CONFIG.volume = _targetWidth;
      });

      addEvent(this.$uiSeekbarVol, 'mouseleave' , (event) => {
        _flag = false;
      });
      addEvent(this.$uiSeekbarVol, 'mouseup' , (event) => {
        _flag = false;
      });

      addEvent(this.$uiSeekbarVol, 'mousemove' , (event) => {
        if(_flag === true){
          let _currentWidth    = event.currentTarget.clientWidth;
          let _clickPosition  = event.currentTarget.getBoundingClientRect().left;
          let _targetWidth = (event.pageX - _clickPosition) / _currentWidth * 100;
          this.Player.unMute();
          this.Player.setVolume(_targetWidth);
          this.CONFIG.volume = _targetWidth;
        }
      });

    }
  }

  /**
   * When dragging a seek bar(time).
   */
  EventSeekbarTime(){
    let _that = this;

    if(this.$uiSeekbarTime.length){

      let _targetTime = 0;

      addEvent(this.$uiSeekbarTime, 'mousedown', (event) => {
        this.PlayerChangeSeekingFlg = true;
        let _currentWidth  = event.currentTarget.clientWidth;
        let _clickPosition = event.currentTarget.getBoundingClientRect().left;
        let _targetWidth   = (event.pageX - _clickPosition) / _currentWidth;
        _targetTime    = this.Player.getDuration() * _targetWidth;
        this.$uiSeekbarTimeCover[0].style.width = (_targetWidth * 100) + '%';
      });

      addEvent(this.$uiSeekbarTime, 'mouseleave', (event) => {
        if(this.PlayerChangeSeekingFlg){
          this.Player.seekTo(_targetTime, true);
          setTimeout(()=>{
            this.Play();
            this.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      addEvent(this.$uiSeekbarTime, 'mouseup', (event) => {
        if(this.PlayerChangeSeekingFlg){
          this.Player.seekTo(_targetTime, true);
          setTimeout(()=>{
            this.Play();
            this.PlayerChangeSeekingFlg = false;
          }, 100);
        }
      });

      addEvent(this.$uiSeekbarTime, 'mousemove', (event) => {
        if(this.PlayerChangeSeekingFlg){
          let _currentWidth  = event.currentTarget.clientWidth;
          let _clickPosition = event.currentTarget.getBoundingClientRect().left;
          let _targetWidth   = (event.pageX - _clickPosition) / _currentWidth;
          _targetTime    = this.Player.getDuration() * _targetWidth;
          this.$uiSeekbarTimeCover[0].style.width = (_targetWidth * 100) + '%';
          this.Player.seekTo(_targetTime, true);
        }
      });

    }

  }

  EventChangeVideo(){
    let _that = this;

    if(this.$uiBtnChange.length){
      addEvent(this.$uiBtnChange, 'click' , (event) => {
        // Get video-id.
        // -> <data-PMY-id="">
        let id = event.currentTarget.dataset.pmyId;
        this.Change(id);
      });
    }
  }

  EventFullscreen(){
    let _that = this;

    if(this.$uiBtnFull.length){
      addEvent(this.$uiBtnFull, 'click' , (event) => {
        this.Fullscreen();
      });
    }
  }

  Fullscreen(){
    if (document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if (document.body.msRequestFullscreen) {
      document.body.msRequestFullscreen();
    } else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else if (document.body.webkitRequestFullscreen) {
      document.body.webkitRequestFullscreen();
    }
  }

  ClassOn(){
    addClass(this.$playerElem, this.CONFIG.classname_playing);

    // Add className Play-Button.
    if(this.$uiBtnPlay.length) addClass(this.$uiBtnPlay, this.CONFIG.classname_playing);

    // Add className Pause-Button.
    if(this.$uiBtnPause.length) addClass(this.$uiBtnPause, this.CONFIG.classname_playing);

    // Add className MediaChange-Button.
    if(this.$uiBtnDataId.length){
      this.$uiBtnDataId.map((item,index)=>{
        if(this.CONFIG.videoid == item.getAttribute('data-PMY-id')){
          addClass(item, this.CONFIG.classname_playing);
        }
      });
    }
  }

  ClassOff(){
    removeClass(this.$playerElem, this.CONFIG.classname_playing);

    // Add className Play-Button.
    if(this.$uiBtnPlay.length) removeClass(this.$uiBtnPlay, this.CONFIG.classname_playing);

    // Add className Pause-Button.
    if(this.$uiBtnPause.length) removeClass(this.$uiBtnPause, this.CONFIG.classname_playing);

    // Remove className MediaChange-Button.
    if(this.$uiBtnDataId.length) removeClass(this.$uiBtnDataId, this.CONFIG.classname_playing);
  }

  Update(){

    // シーク中は値を更新しない
    if(this.PlayerChangeSeekingFlg) return

    // メディアを変更中を判定
    if(this.PlayerChangeLoadFlg){
      // 再生時間の更新(分秒)
      if(this.$uiDisplayTime.length) setHtml( this.$uiDisplayTime, this.GetTime()+'/'+this.GetTimeMax() );
      if(this.$uiDisplayTimeNow.length) setHtml( this.$uiDisplayTimeNow, this.GetTime() );
      if(this.$uiDisplayTimeTotal.length) setHtml( this.$uiDisplayTimeTotal, this.GetTimeMax() );
      if(this.$uiDisplayTimeDown.length) setHtml( this.$uiDisplayTimeDown, this.GetTimeDown() );
      if(this.$uiBtnChangeDisplayTime.length) setHtml( this.$uiBtnChangeDisplayTime, this.GetTime()+'/'+this.GetTimeMax() );
      if(this.$uiBtnChangeDisplayTimeDown.length) setHtml( this.$uiBtnChangeDisplayTimeDown, this.GetTimeDown() );

      // 再生時間の更新(％)
      if(this.$uiDisplayTimePar.length) setHtml( this.$uiDisplayTimePar, this.GetTimePar() );

      // シークバーの更新(％)
      if(this.$uiSeekbarTimeCover.length) this.$uiSeekbarTimeCover[0].style.width = this.GetTimePar();
    } else {
      // 再生時間の更新(分秒)
      if(this.$uiDisplayTime.length) setHtml( this.$uiDisplayTime, '00:00' );
      if(this.$uiDisplayTimeNow.length) setHtml( this.$uiDisplayTimeNow, '00:00' );
      if(this.$uiDisplayTimeTotal.length) setHtml( this.$uiDisplayTimeTotal, '00:00' );
      if(this.$uiDisplayTimeDown.length) setHtml( this.$uiDisplayTimeDown, '00:00' );
      if(this.$uiBtnChangeDisplayTime.length) setHtml( this.$uiBtnChangeDisplayTime, '00:00' );
      if(this.$uiBtnChangeDisplayTimeDown.length) setHtml( this.$uiBtnChangeDisplayTimeDown, '00:00' );

      // 再生時間の更新(％)
      if(this.$uiDisplayTimePar.length) setHtml( this.$uiDisplayTimePar, '0%' );

      // シークバーの更新(％)
      if(this.$uiSeekbarTimeCover.length) this.$uiSeekbarTimeCover[0].style.width = '0%';
    }

  }

  Play(callback){
    let _that = this;
    if(this.$uiBtnPlay.length){
      if(this.Player.getPlayerState() != 1){
        if(this.on.PlayPrep && typeof(this.on.PlayPrep) === 'function') this.on.PlayPrep(this, this.Player);

        // When the player is stopped.
        this.Player.playVideo();
        this.ClassOn();

        if(!this.on.Play && callback) this.on.Play = callback;
        if(this.on.Play && typeof(this.on.Play) === 'function') this.on.Play(this.Player, this.CONFIG);
      } else {
        // When the player is playing.
        _that.Pause();
        this.ClassOff();
      }
    }

  }

  Stop(callback){
    this.Player.stopVideo();
    this.ClassOff();

    if(!this.on.Stop && callback) this.on.Stop = callback;
    if(this.on.Stop && typeof(this.on.Stop) === 'function') this.on.Stop(this.Player, this.CONFIG);
  }

  Pause(callback){
    this.Player.pauseVideo();
    this.ClassOff();

    if(!this.on.Pause && callback) this.on.Pause = callback;
    if(this.on.Pause && typeof(this.on.Pause) === 'function') this.on.Pause(this.Player, this.CONFIG);
  }

  Mute(){
    if(this.Player.isMuted()){
      this.CONFIG.muted = false;

      this.Player.unMute();
      this.Player.setVolume(this.CONFIG.volume);

      if(this.$uiSeekbarVolCover.length){
        this.$uiSeekbarVolCover[0].style.width = '0%';
      }

      removeClass(this.$uiBtnMute, this.CONFIG.classname_playing);
    }else{
      this.CONFIG.muted = true;

      this.Player.mute();
      this.Player.setVolume(0);

      addClass(this.$uiBtnMute, this.CONFIG.classname_playing);
    }
  }

  /**
   * When Media change.
   *
   * id       | str      | media-id.
   * callback | function | callback function after changed.
   */
  Change(id, callback){
    let _that = this;

    // 動画IDが取得出来ない場合は処理を中止
    if(id == '' || id == null || id == undefined) return false;

    // Check if it is the same media.
    if(this.CONFIG.videoid !== id){

      this.PlayerChangeLoadFlg = false;

      // Overwrite video id.
      this.CONFIG.videoid = id;

      this.Player.loadVideoById(id, 0);

      this.ClassOff();
      this.Player.mute();
      this.Player.clearVideo();

      // Set Information.
      this.SetPoster();

      // 変更後に再生
      setTimeout( () => {
        this.ClassOn();
        if(this.CONFIG.playerVars.autoplay){
          this.Player.playVideo();
        }

        if(this.CONFIG.muted){
          this.Player.mute();
        } else {
          this.Player.unMute();
        }
      }, 100);

      setTimeout( () => {
        this.PlayerChangeLoadFlg = true;

        if(!this.on.Change && callback) this.on.Change = callback;
        if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change(this.Player, this.CONFIG);
      }, 300);
    } else {
      this.Play();

      if(!this.on.Change && callback) this.on.Change = callback;
      if(this.on.Change && typeof(this.on.Change) === 'function') this.on.Change(this.Player, this.CONFIG);
    }

  }

  PauseAll(callback){
    window.PLAYER_MODULE_YOUTUBE_PLATLIST.map((item,index)=>{
      item.Player.pauseVideo();
    });

    if(!this.on.PauseAll && callback) this.on.PauseAll = callback;
    if(this.on.PauseAll && typeof(this.on.PauseAll) === 'function') this.on.PauseAll(this.Player, this.CONFIG);
  }

  StopAll(callback){
    window.PLAYER_MODULE_YOUTUBE_PLATLIST.map((item,index)=>{
      item.Player.stopVideo();
    });

    if(!this.on.StopAll && callback) this.on.StopAll = callback;
    if(this.on.StopAll && typeof(this.on.StopAll) === 'function') this.on.StopAll(this.Player, this.CONFIG);
  }

  GetTime(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _m = parseNumber(Math.floor(this.Player.getCurrentTime()/60));
    let _s = parseNumber(Math.floor(this.Player.getCurrentTime()%60));
    if(isFinite(_s) && isFinite(_m)) return _m+':'+_s;
    else return '00:00';
  }

  GetTimeDown(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _countDownTime = this.Player.getDuration() - this.Player.getCurrentTime();
    let _m_down        = parseNumber(Math.floor(_countDownTime / 60));
    let _s_down        = parseNumber(Math.floor(_countDownTime % 60));
    if(isFinite(_s_down) && isFinite(_m_down)) return _m_down+':'+_s_down;
    else return '00:00';
  }

  GetTimeMax(){
    function parseNumber(num) {
      if(typeof(num) === 'number') num = String(num);
      if (num < 10) return '0'+num;
      if (num >= 10) return num;
    }
    let _m_max = parseNumber(Math.floor(this.Player.getDuration()/60));
    let _s_max = parseNumber(Math.floor(this.Player.getDuration()%60));
    return _m_max+':'+_s_max;
  }

  GetTimeRatio(){
    return Math.floor(this.Player.getCurrentTime() / this.Player.getDuration() * 1000) / 1000;
  }

  GetTimePar(){
    let _time = Math.floor(this.Player.getCurrentTime() / this.Player.getDuration() * 1000) / 10;
    if(isFinite(_time)) return _time + '%';
    else return '0%';
  }

  SetVolume(vol){
    this.CONFIG.volume = vol ? vol : this.CONFIG.volume;
    this.Player.setVolume(this.CONFIG.volume);
  }

  SetPoster(){
    if(this.CONFIG.poster != false){
      this.CONFIG.poster = `//i.ytimg.com/vi/${this.STATE.playlist[this.STATE.playlist_index]}/maxresdefault.jpg`;
    }

    if(this.$uiDisplayPoster.length){
      if(this.CONFIG.mode == 'audio'){
        setHtml(this.$uiDisplayPoster, '');
      } else {
        setHtml(this.$uiDisplayPoster, `<img src="${this.CONFIG.poster}" alt="">`);
      }
    }

    if(this.$uiDisplayPosterBg.length && this.CONFIG.mode != 'audio'){
      this.$uiDisplayPosterBg[0].style.backgroundImage = `url(${this.CONFIG.poster})`;
    }

  }

  Destroy(){
    this.Player.destroy();
  }

}
