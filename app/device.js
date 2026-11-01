/* Public Tizen application APIs. No Mac server, network address or credentials. */
(function () {
  'use strict';
  var IDS = {
    stremio: 'IkWsFHtOY9.Stremio', netflix: 'org.tizen.netflix-app',
    disneyplus: 'MCmYXNxgcu.DisneyPlus', youtube: '9Ur5IzDKqV.TizenYouTube',
    appletv: 'com.samsung.tv.aria-video', primevideo: 'org.tizen.primevideo',
    abciview: 'mWK87Xghap.ABCiview', sbs: 'OyE7OuxlUi.SBSOnDemand',
    applemusic: 'org.tizen.apple.apple-music'
  };
  var STREAMING = ['as6cYRgkPy.Binge', '73iTZRTc34.Stan', '5b8c3eb16b.BeamCTVDev',
    'cj37Ni3qXM.HBONow', 'LBUAQX1exg.Hulu', 'gzcc4LRFBF.Peacock', 'rJyOSqC6Up.CBSAllAccess',
    'OGLLvqej7u.CrunchyrollWebApp', 'X1pKpFCiUu.PlutoTV', 'zo5Zi4mCPv.fuboTV',
    'Rk72oKFsRS.OtterKidsProd', '70fRFUwYlD.OtterGAProd', 'PvWgqxV3Xa.YouTubeTV',
    'XtU8fQk2gN.ESPN', 'ZmmGjO6VKO.slingtv', 'VtuWAiZdHN.STARZPlay', 'ckfgqqzvt0.dplus',
    'kk8MbItQ0H.VUDU', 'Jz7aUrV2Q4.Twitch', 'OK2Rdkjmsi.IMDbTV', 'Ob3XhAVMu6.amcplus',
    'KaLitts8bq.tenplaySamsungTizen', 'eYuOiOLYQX.KayoSports', 'Ne2ZsPWdKl.9NOW',
    '3KA0pm7a7V.TubiTV', 'rJeHak5zRg.Spotify', 'icp4AvUPiA.7plus'];
  var CONSUMER_SYSTEM = ['org.tizen.browser', 'com.microsoft.copilot'];
  var EXTRA_BRANDS = {
    'rJeHak5zRg.Spotify': 'spotify', '5b8c3eb16b.BeamCTVDev': 'hbomax', 'cj37Ni3qXM.HBONow': 'hbomax',
    '3KA0pm7a7V.TubiTV': 'tubi', 'LBUAQX1exg.Hulu': 'hulu', 'rJyOSqC6Up.CBSAllAccess': 'paramountplus',
    'OGLLvqej7u.CrunchyrollWebApp': 'crunchyroll', 'gzcc4LRFBF.Peacock': 'peacock',
    'XtU8fQk2gN.ESPN': 'espn', 'ZmmGjO6VKO.slingtv': 'slingtv', 'Jz7aUrV2Q4.Twitch': 'twitch',
    'Ob3XhAVMu6.amcplus': 'amcplus', 'X1pKpFCiUu.PlutoTV': 'plutotv', 'zo5Zi4mCPv.fuboTV': 'fubotv',
    'AQKO41xyKP.AmazonAlexa': 'amazonalexa', 'org.tizen.browser': 'internet',
    'com.samsung.tv.knox-browser': 'internet', 'niftytizen.NiftyGateway': 'niftygateway',
    'kupCeIdDkX.HueSync': 'huesync', 'GHI3a0zMSx.XboxGamePass': 'xbox',
    'w0wZu3xkQq.GeForceNOW': 'geforcenow', 'CmeyUlnhYY.LunaWebApp': 'luna'
  };
  var CLEAN_NAMES = {'rJeHak5zRg.Spotify': 'Spotify', '3KA0pm7a7V.TubiTV': 'Tubi', 'gzcc4LRFBF.Peacock': 'Peacock'};
  var INTERNAL = ['adplatform.ADPlayer', 'WykOS4t4F0.cmsWebApp', '25emanual3.emanual',
    'd0m1lV1nt2.emanual', '2022ePop01.SmartTV',
    'ZODRT12q2l.WebAccountExtension', 'ByJlgt0XeD.CastSettingsApp', 'tv6pbVMQFF.PrivacyChoices',
    'J9fZJDMi1v.SecurityCenter', 'niftytizen.NiftyGateway'];
  var SELF = 'nClrkHome1.FrameHome';
  function api() { return window.tizen && window.tizen.application; }
  function selfId() {
    try { return api().getCurrentApplication().appInfo.id || SELF; }
    catch (err) { return SELF; }
  }
  function unavailable(done) {
    done({ message: 'Open CleanFrame on the TV to use this control.', detail: 'The web preview cannot control the TV.' });
  }
  function failure(err) {
    return { message: 'The TV could not open this screen.', detail: err && (err.message || err.name) || 'Try again, or press the remote’s Home button to return to CleanFrame.' };
  }
  function bounded(done, timeout) {
    var finished = false, timer = setTimeout(function () { finish({ message: 'The TV did not respond. Please try again.' }); }, timeout || 8000);
    function finish(err, value) { if (finished) return; finished = true; clearTimeout(timer); done(err, value); }
    return finish;
  }
  function launchApp(id, done) {
    if (!api()) { unavailable(done); return; }
    var finish = bounded(done);
    try { api().launch(id, function () { finish(null); }, function (err) { finish(failure(err)); }); }
    catch (err) { finish(failure(err)); }
  }
  function launch(brand, done) {
    if (!IDS[brand]) { done({message: 'This app has no launch target.'}); return; }
    launchApp(IDS[brand], done);
  }
  function art(done) {
    if (!api()) { unavailable(done); return; }
    var finish = bounded(done);
    try {
      var data = [new tizen.ApplicationControlData('mode', ['fullscreen']), new tizen.ApplicationControlData('requester', ['mobile'])];
      var control = new tizen.ApplicationControl('http://tizen.org/appcontrol/operation/default', null, null, null, data);
      api().launchAppControl(control, 'org.tizen.art-app', function () { finish(null); }, function (err) { finish(failure(err)); });
    } catch (err) { finish(failure(err)); }
  }
  function home(done) { launchApp('com.samsung.tv.csfs', done); }
  function settings(done) { launchApp('com.samsung.tv.coba.setting', done); }
  function parseVideoSources(info) {
    var list = [], seen = {};
    function add(raw, connected) {
      if (!raw || !raw.type) return;
      var type = String(raw.type).toUpperCase(), num = Number(raw.number || 1);
      var key = type + (type === 'TV' ? '' : num);
      if (seen[key]) return;
      seen[key] = true;
      var label = raw.name || raw.label || raw.deviceName || raw.osdName || raw.cecName || raw.model || '';
      if (typeof label !== 'string') label = '';
      list.push({
        key: key,
        type: type,
        number: num,
        connected: !!connected,
        signal: !!raw.signal,
        label: label.trim(),
        raw: raw
      });
    }
    if (info && Array.isArray(info.connected)) info.connected.forEach(function (s) { add(s, true); });
    if (info && Array.isArray(info.disconnected)) info.disconnected.forEach(function (s) { add(s, false); });
    return list;
  }
  function sources(done) {
    var sys = window.tizen && window.tizen.systeminfo;
    if (!sys || !sys.getPropertyValue) { done(null, []); return; }
    var finish = bounded(done, 5000);
    try {
      sys.getPropertyValue('VIDEOSOURCE', function (info) {
        finish(null, parseVideoSources(info));
      }, function () { finish(null, []); });
    } catch (err) { finish(null, []); }
  }
  function watchSources(onChange) {
    var sys = window.tizen && window.tizen.systeminfo;
    if (!sys || !sys.addPropertyValueChangeListener) return 0;
    try {
      return sys.addPropertyValueChangeListener('VIDEOSOURCE', function (info) {
        if (onChange) onChange(parseVideoSources(info));
      });
    } catch (err) { return 0; }
  }
  function openTvViewer(sourceCode, finish) {
    var appApi = api();
    if (!appApi) { unavailable(finish); return; }
    try {
      var data = [
        new tizen.ApplicationControlData('source', [sourceCode]),
        new tizen.ApplicationControlData('type', [sourceCode])
      ];
      var control = new tizen.ApplicationControl('http://tizen.org/appcontrol/operation/view', null, null, null, data);
      appApi.launchAppControl(control, 'org.tizen.tv-viewer', function () { finish(null); }, function () {
        appApi.launch('org.tizen.tv-viewer', function () { finish(null); }, function (err2) { finish(failure(err2)); });
      });
    } catch (err) {
      try { appApi.launch('org.tizen.tv-viewer', function () { finish(null); }, function (err2) { finish(failure(err2)); }); }
      catch (err3) { finish(failure(err3)); }
    }
  }
  function launchSource(spec, done) {
    if (!api()) { unavailable(done); return; }
    var finish = bounded(done, 8000);
    var type = spec && spec.type || 'HDMI', num = Number(spec && spec.number || 1);
    var code = type === 'TV' ? 'TV' : type + num;
    var tvw = window.tizen && window.tizen.tvwindow;
    var sys = window.tizen && window.tizen.systeminfo;
    function applyWindow(targetObj) {
      if (!tvw || !tvw.setSource) { openTvViewer(code, finish); return; }
      try {
        tvw.setSource(targetObj, function () {
          openTvViewer(code, finish);
        }, function () {
          openTvViewer(code, finish);
        });
      } catch (err) {
        openTvViewer(code, finish);
      }
    }
    if (sys && sys.getPropertyValue) {
      try {
        sys.getPropertyValue('VIDEOSOURCE', function (info) {
          var all = [].concat(info && info.connected || [], info && info.disconnected || []), match = null, i;
          for (i = 0; i < all.length; i++) {
            if (all[i] && String(all[i].type).toUpperCase() === type && (type === 'TV' || Number(all[i].number) === num)) {
              match = all[i]; break;
            }
          }
          applyWindow(match || { type: type, number: num });
        }, function () { applyWindow({ type: type, number: num }); });
        return;
      } catch (err) {}
    }
    applyWindow({ type: type, number: num });
  }
  function apps(done) {
    if (!api()) { unavailable(done); return; }
    // Large installed catalogues can take longer than a launch response.
    var finish = bounded(done, 20000);
    try {
      api().getAppsInfo(function (list) {
        var known = {}, seen = {}, result = [], self = selfId();
        Object.keys(IDS).forEach(function (brand) { known[IDS[brand]] = brand; });
        list.forEach(function (a) {
          var primary = !!known[a.id], stream = STREAMING.indexOf(a.id) >= 0;
          var consumer = /^[A-Za-z0-9]{10}\.[A-Za-z0-9_-]+$/.test(a.id) || CONSUMER_SYSTEM.indexOf(a.id) >= 0;
          if (a.id === self || INTERNAL.indexOf(a.id) >= 0 || seen[a.id] || !a.name || (!primary && !stream && (!a.show || !consumer))) return;
          if (!primary && /(?:service|worker|preview|promotion|plugin|launcher|test|sdk|^ep[ -]|factory|daemon)/i.test(a.name + ' ' + a.id)) return;
          if (/-dummy$/.test(a.id) || a.id === 'com.samsung.tv.cobalt-yt') return;
          seen[a.id] = true;
          result.push({ appId: a.id, name: CLEAN_NAMES[a.id] || a.name, brand: known[a.id] || EXTRA_BRANDS[a.id] || '', icon: a.iconPath || '', rank: primary ? Object.keys(IDS).indexOf(known[a.id]) : (stream ? 20 : 30) });
        });
        result.sort(function (a, b) { return a.rank - b.rank || a.name.toLowerCase().localeCompare(b.name.toLowerCase()); });
        finish(null, result);
      }, function (err) { finish(failure(err)); });
    } catch (err) { finish(failure(err)); }
  }
  window.FrameDevice = { launch: launch, launchApp: launchApp, launchSource: launchSource, sources: sources, watchSources: watchSources, art: art, home: home, settings: settings, apps: apps };
}());
