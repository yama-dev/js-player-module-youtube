!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var n in i)("object"==typeof exports?exports:e)[n]=i[n]}}(window,function(){return function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=1)}([function(e,t,i){window,e.exports=function(e){var t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}return i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t),i.d(t,"PARSE_MODULE",function(){return a});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,null,[{key:"Str2AutoLink",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";return!!e&&e.replace(/((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:\/~?%&;=+#',()*!]+))/g,function(e,i,n,a){return'<a href="'+(n+a)+'" target="'+t+'">'+i+"</a>"})}},{key:"Str2AutoLinkHashtag",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"_blank";return!!e&&e.replace(/\#(\S*)\s?/g,'<a href="https://twitter.com/search?q=%23$1" target="'+t+'">#$1</a>')}},{key:"Str2DateFormat",value:function(e){if(!e)return!1;var t=e.split(/\D/);if(t.length>=4){var i=[];t.map(function(e,t){if(""==e)return!1;i.push(e)}),t=i}return(t=t.map(function(e,t){var i=e;return Number(e)<=9&&(i="0"+Number(e)),i})).join("-")}},{key:"Str2Mustache",value:function(e,t){if(!e)return!1;for(var i in t){new RegExp("({{.?"+i+".?}})","g");var n=new RegExp("{{.?("+i+").?}}","g");e.match(n);var a=RegExp.$1;e=e.replace(n,t[a])}return e}}]),e}();
/*!
 * JS PARSE_MODULE (JavaScript Library)
 *   js-parse-module.js
 * Version 0.0.4
 * Repository https://github.com/yama-dev/js-parse-module
 * Author yama-dev
 * Licensed under the MIT license.
 */}])},function(e,t,i){"use strict";i.r(t);var n=i(0),a=function(e){try{return e instanceof HTMLElement}catch(e){return!1}},o=function(e){var t=void 0;if(!Array.isArray(e)&&!e.length||function(e){try{return"string"==typeof e}catch(e){return!1}}(e))t=a(e)?Array(e):Array.prototype.slice.call(document.querySelectorAll(e));else{if(!a(e[0]))return!1;t=Array.prototype.slice.call(e)}return t},s=function(e,t){o(e).map(function(e,i){e.classList.add(t)})},r=function(e,t){o(e).map(function(e,i){e.classList.remove(t)})},l=function(e,t){o(e).map(function(e,i){e.innerHTML=t})},u=function(e,t,i){e===window?window.addEventListener(t,i):o(e).map(function(e,n){e.addEventListener(t,i)})},h='\n<iframe id="{{ player_id }}" type="text/html" width="{{ width }}" height="{{ height }}"\n  src="//www.youtube.com/embed/{{ videoid }}?enablejsapi=1&origin={{ origin }}"\n  frameborder="0">\n</iframe>',d='\n  <div class="display_time">00:00</div>\n  <div class="display_time_now">00:00</div>\n  <div class="display_time_total">00:00</div>\n  <div class="display_time_par">0%</div>\n  <button class="btn_play btn btn-secondary">play</button>\n  <button class="btn_pause btn btn-secondary">pause</button>\n  <button class="btn_stop btn btn-secondary">stop</button>\n  <button class="btn_mute btn btn-secondary">mute</button>\n  <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>\n  <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>\n  <button class="btn_volon btn btn-secondary">volume on</button>\n  <button class="btn_voloff btn btn-secondary">volume off</button>\n  <div class="display_poster"><img src="" alt=""></div>\n  <div class="display_name"></div>\n',p="\n#{{ id }} {\n  position: relative;\n}\n#{{ id }} .on {\n  display: none;\n}\n#{{ id }} .off {\n  display: block;\n}\n#{{ id }} .btn_play {\n  width: 120px;\n  display: block;\n  cursor: pointer;\n}\n#{{ id }} .btn_play.active {\n  display: none;\n}\n#{{ id }} .btn_play:hover .on {\n  display: block;\n}\n#{{ id }} .btn_play:hover .off {\n  display: none;\n}\n#{{ id }} .btn_pause {\n  width: 120px;\n  display: none;\n  cursor: pointer;\n}\n#{{ id }} .btn_pause.active {\n  display: block;\n}\n#{{ id }} .btn_pause:hover .on {\n  display: block;\n}\n#{{ id }} .btn_pause:hover .off {\n  display: none;\n}\n#{{ id }} .btn_stop {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .btn_stop.active {\n  display: block;\n}\n#{{ id }} .btn_stop:hover .on {\n  display: block;\n}\n#{{ id }} .btn_stop:hover .off {\n  display: none;\n}\n#{{ id }} .btn_mute {\n  width: 120px;\n  cursor: pointer;\n}\n#{{ id }} .btn_mute.active .on {\n  display: block;\n}\n#{{ id }} .btn_mute.active .off {\n  display: none;\n}\n#{{ id }} .seekbar_vol {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#{{ id }} .seekbar_vol .seekbar_vol_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .seekbar_vol span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n  transition: all .1s ease 0s;\n}\n#{{ id }} .seekbar_time {\n  width: 100%;\n  height: 13px;\n  padding: 4px 0;\n  position: relative;\n  cursor: pointer;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n#{{ id }} .seekbar_time .seekbar_time_bg {\n  width: 100%;\n  height: 5px;\n  background: #ddd;\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 4px 0;\n}\n#{{ id }} .seekbar_time span {\n  display: block;\n  width: 0%;\n  height: 100%;\n  background: #666;\n  position: relative;\n  transition: all .1s ease 0s;\n}\n#{{ id }} .display_poster img {\n  max-width: 100%;\n}\n";i.d(t,"PLAYER_MODULE_YOUTUBE",function(){return c});var y=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}();
/*!
 * JS PLAYER MODULE YOUTUBE (JavaScript Library)
 *   js-player-module-youtube.js
 * Version 0.0.1
 * Repository https://github.com/yama-dev/js-player-module-youtube
 * Copyright yama-dev
 * Licensed under the MIT license.
 */
var c=function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.VERSION="0.0.1",this.currentUrl=location.href,this.CONFIG={mode:i.mode||"movie",responsive:!0===i.responsive,id:i.id||"pmy",player_id:i.id+"_player"||"pmy_player",player_id_wrap:i.id+"_player_wrap"||"pmy_player_wrap",player_ui_id:i.id+"_ui"||"pmy_ui",player_style_id:i.id+"_style"||"pmy_style",videoid:i.videoid||"",width:i.width||"",height:i.height||"",volume:i.volume||100,playsinline:!1!==i.playsinline?"playsinline":"",loop:!0===i.loop?"loop":"",muted:!0===i.muted,ui_controls:!0===i.ui_controls?"controls":"",ui_autoplay:!0===i.ui_autoplay?"autoplay":"",ui_default:!1!==i.ui_default,ui_default_css:!1!==i.ui_default_css,stop_outfocus:!0===i.stop_outfocus,poster:i.poster||"//i.ytimg.com/vi/"+i.videoid+"/maxresdefault.jpg",style_text:i.style_text||"",other:i.other||""},i.on||(i.on={}),this.on={Play:i.on.Play||"",Pause:i.on.Pause||"",Stop:i.on.Stop||"",StopAll:i.on.StopAll||"",Change:i.on.Change||""},this.PlayerMediaInfo={},this.Player="",this.PlayerChangeSeekingFlg=!1,this.PlayerChangeLoadFlg=!0,this.playerHtml=h,this.playerUiHtml=d,this.playerCss=p,"audio"==this.CONFIG.mode&&(this.CONFIG.width=1,this.CONFIG.height=1,this.playerCss+="#"+this.CONFIG.player_id+" { opacity: 0; }"),this.CONFIG.responsive&&(this.playerCss+="\n        #"+this.CONFIG.player_id_wrap+" {\n          position: relative;\n          width: 100%;\n          height: 0;\n          padding-bottom: 56.25%;\n          overflow: hidden;\n        }\n        #"+this.CONFIG.player_id_wrap+" iframe {\n          width: 100%;\n          height: 100%;\n          position: absolute;\n          top: 0;\n          left: 0;\n        }\n      "),this.playerHtml=n.PARSE_MODULE.Str2Mustache(this.playerHtml,this.CONFIG),this.playerCss=n.PARSE_MODULE.Str2Mustache(this.playerCss,this.CONFIG),this.$playerElem=o("#"+this.CONFIG.id);var a=document.createElement("div"),s=document.createElement("div");a.id=this.CONFIG.player_id,s.id=this.CONFIG.player_id_wrap,o("#"+this.CONFIG.id+" iframe").length?(a.innerHTML=this.playerHtml,s.appendChild(a),this.$playerElem[0].appendChild(s)):(s.appendChild(a),this.$playerElem[0].appendChild(s));var r=document.createElement("div");r.id=this.CONFIG.player_ui_id,r.innerHTML=this.playerUiHtml,this.CONFIG.ui_default&&this.$playerElem[0].appendChild(r);var l=document.createElement("style");l.id=this.CONFIG.player_style_id,l.innerHTML=this.playerCss,this.CONFIG.ui_default_css&&this.$playerElem[0].appendChild(l),document.addEventListener("DOMContentLoaded",function(e){t.CheckYouTubeApiScript()})}return y(e,[{key:"CheckYouTubeApiScript",value:function(){var e=this;if(window.YT)this.CheckYouTubeApiInstance();else{var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i),t.onload=function(){e.CheckYouTubeApiInstance()}}}},{key:"CheckYouTubeApiInstance",value:function(){var e=this,t=0,i=setInterval(function(){t>=100?(clearInterval(i),console.log("ERROR: not movie loaded.")):t++,YT.loaded&&(clearInterval(i),e.YouTubeApiInstance())},10)}},{key:"YouTubeApiInstance",value:function(){var e=this,t=this;this.Player=new YT.Player(""+this.CONFIG.player_id,{width:this.CONFIG.width,height:this.CONFIG.height,videoId:this.CONFIG.videoid,playerVars:{fs:0,rel:0,wmode:"transparent",enablejsapi:1,playlist:this.CONFIG.videoid,showinfo:0,controls:1,modestbranding:1,loop:1,autoplay:1,playsinline:1},events:{onReady:function(e){t.SetPlayer()},onStateChange:function(t){t.data==YT.PlayerState.PLAYING&&e.ClassOn(),t.data==YT.PlayerState.ENDED&&e.ClassOff(),t.data==YT.PlayerState.PAUSED&&e.ClassOff(),t.data==YT.PlayerState.BUFFERING&&e.ClassOff(),t.data==YT.PlayerState.CUED&&e.ClassOff()},onError:function(){}}})}},{key:"SetPlayer",value:function(){var e=this;this.CacheElement(),this.SetVolume(),this.SetPoster(),this.EventPlay(),this.EventPause(),this.EventStop(),this.EventChangeVideo(),this.EventMute(),this.EventVolon(),this.EventVoloff(),this.EventSeekbarVol(),this.EventSeekbarTime(),setInterval(function(){e.Update(),e.CONFIG.muted?e.$uiSeekbarVolCover[0].style.width="0%":e.$uiSeekbarVolCover[0].style.width=e.Player.getVolume()+"%"},10),setInterval(function(){e.Player.isMuted()?e.CONFIG.muted||(e.CONFIG.muted=!0):e.CONFIG.muted&&(e.CONFIG.muted=!1)},300),void 0===window.PLAYER_MODULE_YOUTUBE_PLATLIST?(window.PLAYER_MODULE_YOUTUBE_PLATLIST=[],window.PLAYER_MODULE_YOUTUBE_PLATLIST.push({Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})):window.PLAYER_MODULE_YOUTUBE_PLATLIST.push({Player:this.Player,videoid:this.CONFIG.videoid,id:this.CONFIG.id,player_id:this.CONFIG.player_id})}},{key:"CacheElement",value:function(){this.$uiBtnPlay=o("#"+this.CONFIG.id+" .btn_play"),this.$uiBtnStop=o("#"+this.CONFIG.id+" .btn_stop"),this.$uiBtnPause=o("#"+this.CONFIG.id+" .btn_pause"),this.$uiBtnMute=o("#"+this.CONFIG.id+" .btn_mute"),this.$uiBtnVolon=o("#"+this.CONFIG.id+" .btn_volon"),this.$uiBtnVoloff=o("#"+this.CONFIG.id+" .btn_voloff"),this.$uiBtnFull=o("#"+this.CONFIG.id+" .btn_full"),this.$uiDisplayTime=o("#"+this.CONFIG.id+" .display_time"),this.$uiDisplayTimeNow=o("#"+this.CONFIG.id+" .display_time_now"),this.$uiDisplayTimeTotal=o("#"+this.CONFIG.id+" .display_time_total"),this.$uiDisplayTimeDown=o("#"+this.CONFIG.id+" .display_time_down"),this.$uiDisplayTimePar=o("#"+this.CONFIG.id+" .display_time_par"),this.$uiDisplayPoster=o("#"+this.CONFIG.id+" .display_poster"),this.$uiDisplayName=o("#"+this.CONFIG.id+" .display_name"),this.$uiSeekbarVol=o("#"+this.CONFIG.id+" .seekbar_vol"),this.$uiSeekbarVolBg=o("#"+this.CONFIG.id+" .seekbar_vol .seekbar_vol_bg"),this.$uiSeekbarVolCover=o("#"+this.CONFIG.id+" .seekbar_vol span"),this.$uiSeekbarTime=o("#"+this.CONFIG.id+" .seekbar_time"),this.$uiSeekbarTimeBg=o("#"+this.CONFIG.id+" .seekbar_time .seekbar_time_bg"),this.$uiSeekbarTimeCover=o("#"+this.CONFIG.id+" .seekbar_time span"),this.$uiBtnChange=o("#"+this.CONFIG.id+" .btn_change"),this.$uiBtnChangeDisplayTime=o("#"+this.CONFIG.id+" .display_time"),this.$uiBtnChangeDisplayTimeDown=o("#"+this.CONFIG.id+" .display_time_down"),this.$uiBtnDataId=o("[data-PMY-id]")}},{key:"EventPlay",value:function(){var e=this;this.$uiBtnPlay.length&&u(this.$uiBtnPlay,"click",function(t){1!=e.Player.getPlayerState()?e.Play():e.Pause()})}},{key:"EventPause",value:function(){var e=this;this.$uiBtnPause.length&&u(this.$uiBtnPause,"click",function(t){e.Pause()})}},{key:"EventStop",value:function(){var e=this;this.$uiBtnStop.length&&u(this.$uiBtnStop,"click",function(t){e.Stop()}),u(window,"blur",function(t){e.CONFIG.stop_outfocus&&e.Stop()})}},{key:"EventMute",value:function(){var e=this;this.$uiBtnMute.length&&u(this.$uiBtnMute,"click",function(t){e.Mute()})}},{key:"EventVolon",value:function(){var e=this;this.$uiBtnVolon.length&&u(this.$uiBtnVolon,"click",function(t){e.Player.setVolume(e.CONFIG.volume),r(e.$uiBtnVolon,"active")})}},{key:"EventVoloff",value:function(){var e=this;this.$uiBtnVoloff.length&&u(this.$uiBtnVoloff,"click",function(t){e.Player.setVolume(0),s(e.$uiBtnVoloff,"active")})}},{key:"EventSeekbarVol",value:function(){var e=this;if(this.$uiSeekbarVol.length){var t=!1;this.$uiSeekbarVolCover[0].style.width="100%",u(this.$uiSeekbarVol,"mousedown",function(i){t=!0;var n=i.currentTarget.clientWidth,a=i.currentTarget.getBoundingClientRect().left,o=(i.pageX-a)/n*100;e.Player.setVolume(o),e.Player.unMute(),e.CONFIG.volume=o}),u(this.$uiSeekbarVol,"mouseleave",function(e){t=!1}),u(this.$uiSeekbarVol,"mouseup",function(e){t=!1}),u(this.$uiSeekbarVol,"mousemove",function(i){if(!0===t){var n=i.currentTarget.clientWidth,a=i.currentTarget.getBoundingClientRect().left,o=(i.pageX-a)/n*100;e.Player.unMute(),e.Player.setVolume(o),e.CONFIG.volume=o}})}}},{key:"EventSeekbarTime",value:function(){var e=this;if(this.$uiSeekbarTime.length){var t=0;u(this.$uiSeekbarTime,"mousedown",function(i){e.PlayerChangeSeekingFlg=!0,e.Pause();var n=i.currentTarget.clientWidth,a=i.currentTarget.getBoundingClientRect().left,o=(i.pageX-a)/n;t=e.Player.getDuration()*o,e.$uiSeekbarTimeCover[0].style.width=100*o+"%"}),u(this.$uiSeekbarTime,"mouseleave",function(i){e.PlayerChangeSeekingFlg&&(e.Player.seekTo(t,!0),setTimeout(function(){e.Play(),e.PlayerChangeSeekingFlg=!1},100))}),u(this.$uiSeekbarTime,"mouseup",function(i){e.PlayerChangeSeekingFlg&&(e.Player.seekTo(t,!0),setTimeout(function(){e.Play(),e.PlayerChangeSeekingFlg=!1},100))}),u(this.$uiSeekbarTime,"mousemove",function(i){if(console.log(t),e.PlayerChangeSeekingFlg){var n=i.currentTarget.clientWidth,a=i.currentTarget.getBoundingClientRect().left,o=(i.pageX-a)/n;t=e.Player.getDuration()*o,e.$uiSeekbarTimeCover[0].style.width=100*o+"%",e.Player.seekTo(t,!0)}})}}},{key:"EventChangeVideo",value:function(){var e=this;this.$uiBtnChange.length&&u(this.$uiBtnChange,"click",function(t){var i=t.currentTarget.dataset.pmyId;e.Change(i)})}},{key:"ClassOn",value:function(){var e=this;this.$uiBtnPlay.length&&s(this.$uiBtnPlay,"active"),this.$uiBtnPause.length&&s(this.$uiBtnPause,"active"),this.$uiBtnDataId.length&&this.$uiBtnDataId.map(function(t,i){e.CONFIG.videoid==t.getAttribute("data-PMY-id")&&s(t,"active")})}},{key:"ClassOff",value:function(){this.$uiBtnPlay.length&&r(this.$uiBtnPlay,"active"),this.$uiBtnPause.length&&r(this.$uiBtnPause,"active"),this.$uiBtnDataId.length&&r(this.$uiBtnDataId,"active")}},{key:"Update",value:function(){this.PlayerChangeSeekingFlg||(this.PlayerChangeLoadFlg?(l(this.$uiDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),l(this.$uiDisplayTimeNow,this.GetTime()),l(this.$uiDisplayTimeTotal,this.GetTimeMax()),l(this.$uiBtnChangeDisplayTime,this.GetTime()+"/"+this.GetTimeMax()),l(this.$uiDisplayTimeDown,this.GetTimeDown()),l(this.$uiBtnChangeDisplayTimeDown,this.GetTimeDown()),l(this.$uiDisplayTimePar,this.GetTimePar()),this.$uiSeekbarTimeCover[0].style.width=this.GetTimePar()):(l(this.$uiDisplayTime,"00:00"),l(this.$uiDisplayTimeNow,"00:00"),l(this.$uiDisplayTimeTotal,"00:00"),l(this.$uiBtnChangeDisplayTime,"00:00"),l(this.$uiDisplayTimeDown,"00:00"),l(this.$uiBtnChangeDisplayTimeDown,"00:00"),l(this.$uiDisplayTimePar,"0%"),this.$uiSeekbarTimeCover[0].style.width="0%"))}},{key:"Play",value:function(e){this.$uiBtnPlay.length&&(1!=this.Player.getPlayerState()?(this.Player.playVideo(),this.ClassOn()):(this.Pause(),this.ClassOff())),!this.on.Play&&e&&(this.on.Play=e),this.on.Play&&"function"==typeof this.on.Play&&this.on.Play()}},{key:"Stop",value:function(e){this.Player.stopVideo(),this.ClassOff(),!this.on.Stop&&e&&(this.on.Stop=e),this.on.Stop&&"function"==typeof this.on.Stop&&this.on.Stop()}},{key:"Pause",value:function(e){this.Player.pauseVideo(),this.ClassOff(),!this.on.Pause&&e&&(this.on.Pause=e),this.on.Pause&&"function"==typeof this.on.Pause&&this.on.Pause()}},{key:"Mute",value:function(){this.Player.isMuted()?(this.CONFIG.muted=!1,this.Player.unMute(),this.Player.setVolume(this.CONFIG.volume),this.$uiSeekbarVolCover[0].style.width="0%",r(this.$uiBtnMute,"active")):(this.CONFIG.muted=!0,this.Player.mute(),this.Player.setVolume(0),s(this.$uiBtnMute,"active"))}},{key:"Change",value:function(e,t){var i=this;if(""==e||null==e||void 0==e)return!1;this.CONFIG.videoid!==e?(this.PlayerChangeLoadFlg=!1,this.CONFIG.videoid=e,this.Player.loadVideoById(e,0),this.ClassOff(),this.Player.mute(),this.Player.clearVideo(),this.SetPoster(),setTimeout(function(){i.ClassOn(),i.Player.playVideo(),i.Player.unMute()},100),setTimeout(function(){i.PlayerChangeLoadFlg=!0,!i.on.Change&&t&&(i.on.Change=t),i.on.Change&&"function"==typeof i.on.Change&&i.on.Change()},1e3)):(this.Stop(),!this.on.Change&&t&&(this.on.Change=t),this.on.Change&&"function"==typeof this.on.Change&&this.on.Change())}},{key:"StopAll",value:function(e){window.PLAYER_MODULE_YOUTUBE_PLATLIST.map(function(e,t){e.Player.stopVideo()}),!this.on.StopAll&&e&&(this.on.StopAll=e),this.on.StopAll&&"function"==typeof this.on.StopAll&&this.on.StopAll()}},{key:"GetTime",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}var t=e(Math.floor(this.Player.getCurrentTime()/60)),i=e(Math.floor(this.Player.getCurrentTime()%60));return isFinite(i)&&isFinite(t)?t+":"+i:"00:00"}},{key:"GetTimeDown",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}var t=this.Player.getDuration()-this.Player.getCurrentTime(),i=e(Math.floor(t/60)),n=e(Math.floor(t%60));return isFinite(n)&&isFinite(i)?i+":"+n:"00:00"}},{key:"GetTimeMax",value:function(){function e(e){return"number"==typeof e&&(e=String(e)),e<10?"0"+e:e>=10?e:void 0}return e(Math.floor(this.Player.getDuration()/60))+":"+e(Math.floor(this.Player.getDuration()%60))}},{key:"GetTimeRatio",value:function(){return Math.floor(this.Player.getCurrentTime()/this.Player.getDuration()*1e3)/1e3}},{key:"GetTimePar",value:function(){var e=Math.floor(this.Player.getCurrentTime()/this.Player.getDuration()*1e3)/10;return isFinite(e)?e+"%":"0%"}},{key:"SetVolume",value:function(e){this.CONFIG.volume=e||this.CONFIG.volume,this.Player.setVolume(this.CONFIG.volume)}},{key:"SetPoster",value:function(){0!=this.CONFIG.poster&&(this.CONFIG.poster="//i.ytimg.com/vi/"+this.CONFIG.videoid+"/maxresdefault.jpg"),this.$uiDisplayPoster.length&&("audio"==this.CONFIG.mode?l(this.$uiDisplayPoster,""):l(this.$uiDisplayPoster,'<img src="'+this.CONFIG.poster+'" alt="">'))}},{key:"Destroy",value:function(){this.Player.destroy()}}]),e}()}])});