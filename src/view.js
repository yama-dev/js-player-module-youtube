/*
 * viewPlayer
 * viewPlayerUi
 * viewPlayerStyle
 */

export let viewPlayerMain = `
<iframe id="{{ player_id }}" type="text/html" width="{{ width }}" height="{{ height }}"
  src="//www.youtube.com/embed/{{ videoid }}?enablejsapi=1&origin={{ origin }}"
  frameborder="0">
</iframe>`;

export let viewPlayerUi = `
  <div class="display_time">00:00</div>
  <div class="display_time_now">00:00</div>
  <div class="display_time_total">00:00</div>
  <div class="display_time_par">0%</div>
  <button class="btn_play btn">play</button>
  <button class="btn_pause btn">pause</button>
  <button class="btn_stop btn">stop</button>
  <button class="btn_mute btn">mute</button>
  <button class="btn_full btn">full screen</button>
  <div class="seekbar_time"><div class="seekbar_time_bg"></div><span></span></div>
  <div class="seekbar_vol"><div class="seekbar_vol_bg"></div><span></span></div>
  <button class="btn_volon btn">volume on</button>
  <button class="btn_voloff btn">volume off</button>
  <div class="display_poster"><img src="" alt=""></div>
  <div class="display_poster_background"></div>
  <div class="display_name"></div>
`;

export let viewPlayerStyle = `
#{{ id }} {
  position: relative;
}
#{{ id }} .on {
  display: none;
}
#{{ id }} .off {
  display: block;
}
#{{ id }} .btn_play {
  width: 120px;
  display: block;
  cursor: pointer;
}
#{{ id }} .btn_play.active {
  display: none;
}
#{{ id }} .btn_play:hover .on {
  display: block;
}
#{{ id }} .btn_play:hover .off {
  display: none;
}
#{{ id }} .btn_pause {
  width: 120px;
  display: none;
  cursor: pointer;
}
#{{ id }} .btn_pause.active {
  display: block;
}
#{{ id }} .btn_pause:hover .on {
  display: block;
}
#{{ id }} .btn_pause:hover .off {
  display: none;
}
#{{ id }} .btn_stop {
  width: 120px;
  cursor: pointer;
}
#{{ id }} .btn_stop.active {
  display: block;
}
#{{ id }} .btn_stop:hover .on {
  display: block;
}
#{{ id }} .btn_stop:hover .off {
  display: none;
}
#{{ id }} .btn_mute {
  width: 120px;
  cursor: pointer;
}
#{{ id }} .btn_mute.active .on {
  display: block;
}
#{{ id }} .btn_mute.active .off {
  display: none;
}
#{{ id }} .seekbar_vol {
  width: 100%;
  height: 13px;
  padding: 4px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#{{ id }} .seekbar_vol .seekbar_vol_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 4px 0;
}
#{{ id }} .seekbar_vol span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
  transition: all .1s ease 0s;
}
#{{ id }} .seekbar_time {
  width: 100%;
  height: 13px;
  padding: 4px 0;
  position: relative;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#{{ id }} .seekbar_time .seekbar_time_bg {
  width: 100%;
  height: 5px;
  background: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  margin: 4px 0;
}
#{{ id }} .seekbar_time span {
  display: block;
  width: 0%;
  height: 100%;
  background: #666;
  position: relative;
  transition: all .1s ease 0s;
}
#{{ id }} .display_poster img {
  max-width: 100%;
}
`;
