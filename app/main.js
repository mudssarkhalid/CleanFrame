/* CleanFrame Home. Static materials, local preferences and public Tizen app controls. */
(function () {
  'use strict';

  /* ---------- Bundled data ---------- */
  var ASSETS = 'assets/', ICONS = ASSETS + 'icons/', WP = ASSETS + 'wallpapers/';
  var CAP = 21, SCRIM_Y = 560;
  var DOCK_MODES = { both: { tw: 196, th: 148, pitch: 202 }, text: { tw: 196, th: 96, pitch: 202 }, icons: { tw: 164, th: 128, pitch: 172 } };
  var GRID_ROW = 240, GRID_COL = 344, COLS = 5;
  var ED_ROW = 80, ED_SEP = 56, ED_VIEW = 752;
  var PH_TOP = 220, PH_PITCH = 128, PH_FULL = 5, PH_HEIGHT = 944, PH_COMPACT_TOP = 144, PH_COMPACT_PITCH = 88, PH_COMPACT_VISIBLE = 9;
  var WALL_VISIBLE = 6, WALL_ROW = 92, WALL_DELAY = 200;
  var KEYS = { 37: 'left', 38: 'up', 39: 'right', 40: 'down', 13: 'ok', 27: 'back', 8: 'back', 10009: 'back', 461: 'back' };
  var FULL = 'Home holds 21 apps. Remove one first.', LAST = 'Home needs one app';

  var PRIMARY_APPS = [
    { id: 'appletv', name: 'Apple TV', brand: 'appletv', mark: true, appId: 'com.samsung.tv.aria-video' },
    { id: 'OGLLvqej7u.CrunchyrollWebApp', name: 'Crunchyroll', brand: 'crunchyroll', mark: true, appId: 'OGLLvqej7u.CrunchyrollWebApp' },
    { id: 'disneyplus', name: 'Disney+', brand: 'disneyplus', mark: true, appId: 'MCmYXNxgcu.DisneyPlus' },
    { id: '5b8c3eb16b.BeamCTVDev', name: 'HBO Max', brand: 'hbomax', mark: true, appId: '5b8c3eb16b.BeamCTVDev' },
    { id: 'LBUAQX1exg.Hulu', name: 'Hulu', brand: 'hulu', mark: true, appId: 'LBUAQX1exg.Hulu' },
    { id: 'netflix', name: 'Netflix', brand: 'netflix', mark: true, appId: 'org.tizen.netflix-app' },
    { id: 'rJyOSqC6Up.CBSAllAccess', name: 'Paramount+', brand: 'paramountplus', mark: true, appId: 'rJyOSqC6Up.CBSAllAccess' },
    { id: 'gzcc4LRFBF.Peacock', name: 'Peacock', brand: 'peacock', mark: true, appId: 'gzcc4LRFBF.Peacock' },
    { id: 'primevideo', name: 'Prime Video', brand: 'primevideo', mark: true, appId: 'org.tizen.primevideo' },
    { id: '3KA0pm7a7V.TubiTV', name: 'Tubi', brand: 'tubi', mark: true, appId: '3KA0pm7a7V.TubiTV' },
    { id: 'rJeHak5zRg.Spotify', name: 'Spotify', brand: 'spotify', mark: true, appId: 'rJeHak5zRg.Spotify' },
    { id: 'youtube', name: 'YouTube', brand: 'youtube', mark: true, appId: '9Ur5IzDKqV.TizenYouTube' }
  ];
  var LEGACY_PRIMARY_APPS = [
    { id: 'org.tizen.browser', name: 'Internet', brand: 'internet', mark: true, appId: 'org.tizen.browser' },
    { id: 'AQKO41xyKP.AmazonAlexa', name: 'Amazon Alexa', brand: 'amazonalexa', mark: true, appId: 'AQKO41xyKP.AmazonAlexa' },
    { id: 'stremio', name: 'Stremio', brand: 'stremio', mark: true, appId: 'IkWsFHtOY9.Stremio' },
    { id: 'abciview', name: 'ABC iview', brand: 'abciview', mark: true, appId: 'mWK87Xghap.ABCiview' },
    { id: 'sbs', name: 'SBS On Demand', brand: 'sbs', mark: true, appId: 'OyE7OuxlUi.SBSOnDemand' },
    { id: 'applemusic', name: 'Apple Music', brand: 'applemusic', mark: true, appId: 'org.tizen.apple.apple-music' }
  ];
  var PRIMARY = PRIMARY_APPS.map(function (a) { return a.id; }), APPS = PRIMARY_APPS.concat(LEGACY_PRIMARY_APPS), ALPHA = [];
  var WALLS = window.CleanFrameWallpapers || [{ id: 'misty', name: 'Misty coast', tone: 'light', ut: { tr: 'mist', br: 'mist' }, frostVeil: .20 }];
  var ADAPTIVE_INK = window.CleanFrameAdaptiveInk || {};
  WALLS.forEach(function (w) { w.ut = w.ut || { tr: 'light', br: 'light' }; w.frostVeil = w.frostVeil || .12; });
  var MODES = [
    { id: 'fixed', name: 'Fixed', min: 0 }, { id: 'open', name: 'Each time Home opens', min: 0 },
    { id: '5', name: 'Every 5 minutes', min: 5 }, { id: '15', name: 'Every 15 minutes', min: 15 },
    { id: '60', name: 'Every hour', min: 60 }
  ];
  var KEY = 'cleanframe.home.v1', storageOk = true, catalog = { loading: false, loaded: false, error: null, request: 0, revision: 0 };
  var QA = window.ShoreQA = { minuteMs: window.ShoreQA && window.ShoreQA.minuteMs || 60000 };
  var FONTS = {
    manrope: { name: 'Manrope', family: 'Manrope', display: 600, ui: 500, clock: 500 },
    montreal: { name: 'Neue Montreal', family: 'Study Montreal', display: 300, ui: 400, clock: 300 },
    mori: { name: 'Mori', family: 'Study Mori', display: 200, ui: 400, clock: 200 },
    pangram: { name: 'Pangram Sans', family: 'Study Pangram', display: 300, ui: 400, clock: 300 },
    geist: { name: 'Geist', family: 'Study Geist', display: 300, ui: 400, clock: 300 },
    newsreader: { name: 'Newsreader', family: 'Study Newsreader', display: 400, ui: 400, clock: 400 }
  };
  var PRIVATE_FONTS = window.CleanFramePrivateFontIDs || [], fontMetrics = {}, unavailableFonts = {}, widthCache = {}, fontRevision = 0, fontsReady = false;
  var LOOK_VALUES = {
    bg: ['dark', 'light', 'photo'], layout: ['list', 'dock'],
    dockStyle: ['categorized', 'grid', 'compact', 'floating'],
    clockStyle: ['minimal', 'editorial', 'pill', 'split'],
    widget: ['ambient', 'forecast', 'date', 'none'],
    tempUnit: ['f', 'c'],
    apps: ['icons', 'both', 'text'],
    font: Object.keys(FONTS).filter(function (id) { return id === 'manrope' || PRIVATE_FONTS.indexOf(id) >= 0; }),
    controls: ['icons', 'both', 'text'], focus: ['type', 'glass'], material: ['soft', 'frost', 'tint']
  };
  var LOOK_NAMES = { bg: 'Background', layout: 'Layout', dockStyle: 'Dock style', clockStyle: 'Clock style', widget: 'Widget', tempUnit: 'Temperature', apps: 'Apps', font: 'Font', controls: 'Home controls', focus: 'Focus', material: 'Material' };
  var VALUE_NAMES = {
    dark: 'Dark', light: 'Light', photo: 'Photo', list: 'List', dock: 'Dock',
    categorized: 'Labeled', grid: 'Grid', compact: 'Compact', floating: 'Floating',
    minimal: 'Minimal', editorial: 'Editorial', pill: 'Capsule', split: 'Split',
    ambient: 'Weather + Date', forecast: 'Forecast', date: 'Date', none: 'Off',
    f: 'Fahrenheit (°F)', c: 'Celsius (°C)',
    type: 'Type', glass: 'Glass', soft: 'Soft', frost: 'Frost', tint: 'Clear tint', icons: 'Icons', both: 'Icons and text', text: 'Text'
  };
  var UTIL = { art: ['Art Mode', 'art'], apps: ['All apps', 'apps'], arrange: ['Arrange', 'arrange'], settings: ['Settings', 'settings'] };
  var MSG = {
    leave: { title: 'Leave Home?', line: 'Open Samsung Home?', note: '', actions: [['stay', 'Stay'], ['samsung', 'Samsung Home']] }
  };
  var SVG = {
    art: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="9.8" r="1.5"/><path d="m4.5 17.5 4.5-4.5 3 3 2.5-2.5 5 5"/>',
    apps: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/>',
    arrange: '<path d="M4 8.5h14M15 5.5l3 3-3 3M20 15.5H6M9 12.5l-3 3 3 3"/>',
    settings: '<path d="m9 3-.6 2.4-2 1.2L4 6l-2 3.5L3.8 11v2L2 14.5 4 18l2.4-.6 2 1.2L9 21h6l.6-2.4 2-1.2 2.4.6 2-3.5-1.8-1.5v-2L22 9.5 20 6l-2.4.6-2-1.2L15 3Z"/><circle cx="12" cy="12" r="3.2"/>',
    home: '<path d="M4 11 12 4.5l8 6.5v8a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1Z"/>',
    undo: '<path d="M9 6 5 10l4 4"/><path d="M5 10h9.5a4.5 4.5 0 0 1 0 9H11"/>',
    check: '<path d="m5.5 12.5 4 4 9-9"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    left: '<path d="m14.5 5-7 7 7 7"/>',
    right: '<path d="m9.5 5 7 7-7 7"/>',
    up: '<path d="m5 15.5 7-7 7 7"/>',
    down: '<path d="m5 8.5 7 7 7-7"/>',
    updown: '<path d="m7.5 9.5 4.5-4.5 4.5 4.5M7.5 14.5l4.5 4.5 4.5-4.5"/>',
    tv: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7"/>',
    warn: '<path d="M12 4 2.8 19.5h18.4Z"/><path d="M12 10v4.5M12 17.3v.1"/>',
    wSun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.5 12H2M22 12h-2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8"/>',
    wMoon: '<path d="M20.2 14.8A8.5 8.5 0 0 1 9.2 3.8a8.5 8.5 0 1 0 11 11Z"/>',
    wCloudSun: '<path d="M10 4v1.5M4.8 6.2l1.1 1.1M3 11h1.5M15.2 6.2l-1.1 1.1"/><path d="M8.5 13.5a4 4 0 0 1 5.1-5.1"/><path d="M17.5 19H8a4 4 0 1 1 .8-7.9A5.2 5.2 0 0 1 19 12.5a3.3 3.3 0 0 1-1.5 6.5Z"/>',
    wCloud: '<path d="M17.5 19H7a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19.5 12a3.5 3.5 0 0 1-2 7Z"/>',
    wRain: '<path d="M17.5 15.5H7a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19.5 8.5a3.5 3.5 0 0 1-2 7Z"/><path d="m8.5 18.5-1 3M12.5 18.5l-1 3M16.5 18.5l-1 3"/>',
    wSnow: '<path d="M17.5 15.5H7a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19.5 8.5a3.5 3.5 0 0 1-2 7Z"/><circle cx="8.5" cy="19.5" r="1"/><circle cx="12" cy="20.5" r="1"/><circle cx="15.5" cy="19.5" r="1"/>',
    wStorm: '<path d="M17.5 15H7a4.5 4.5 0 1 1 .9-8.9A6 6 0 0 1 19.5 8a3.5 3.5 0 0 1-2 7Z"/><path d="m13 15-2.5 4h3l-1.5 3.5"/>',
    srcHdmi: '<path d="M4 7.5h16a1.5 1.5 0 0 1 1.5 1.5v3.2a1.5 1.5 0 0 1-.6 1.2l-2.4 1.8a1.5 1.5 0 0 1-.9.3H6.4a1.5 1.5 0 0 1-.9-.3l-2.4-1.8a1.5 1.5 0 0 1-.6-1.2V9A1.5 1.5 0 0 1 4 7.5Z"/><path d="M6.5 11.2h11M8 9.5v1.7M10.7 9.5v1.7M13.3 9.5v1.7M16 9.5v1.7"/>',
    srcConsole: '<path d="M6.2 7.5h11.6a4.2 4.2 0 0 1 4.1 5l-.8 4.2a2.6 2.6 0 0 1-4.5 1.2l-2.1-2.4H9.5l-2.1 2.4a2.6 2.6 0 0 1-4.5-1.2l-.8-4.2a4.2 4.2 0 0 1 4.1-5Z"/><path d="M7.5 10.2v3.6M5.7 12h3.6"/><circle cx="15.6" cy="10.8" r=".9" fill="currentColor"/><circle cx="17.6" cy="12.8" r=".9" fill="currentColor"/>',
    srcPs: '<path d="M9.5 4.5v14.8l3.2 1V7.6c0-.8.5-1.2 1.2-1 .8.2 1.3.9 1.3 1.8v4.2c2.3.5 3.8-.5 3.8-3.1 0-2.7-1.6-4-4.7-4.6L9.5 4.5Z"/><path d="M9.5 13.8 4.4 15.6c-1.8.6-2.4 1.8-.8 2.5 1.5.7 3.7.4 5.9-.4v-2l-2.8 1c-.6.2-1.1 0-.7-.4.4-.3 1.4-.7 3.5-1.4v-1.1Z"/><path d="M14.2 15.1v2l2.6-.9c.7-.2 1.2 0 .7.4-.4.3-1.6.7-3.3 1.3v1.9l5.2-1.8c1.9-.7 2.3-1.9.6-2.6-1.5-.6-3.7-.5-5.8-.3Z"/>',
    srcXbox: '<circle cx="12" cy="12" r="9.2"/><path d="M6.5 6.2c2.2 1.5 4 3.4 5.5 5.6 1.5-2.2 3.3-4.1 5.5-5.6M5.8 17.5c1.5-2.6 3.6-4.7 6.2-6.1 2.6 1.4 4.7 3.5 6.2 6.1"/>',
    srcSwitch: '<rect x="3.5" y="4" width="7.2" height="16" rx="3.2"/><rect x="13.3" y="4" width="7.2" height="16" rx="3.2"/><circle cx="7.1" cy="8.5" r="1.4" fill="currentColor"/><circle cx="16.9" cy="14.2" r="1.4" fill="currentColor"/>',
    srcPc: '<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8 20h8M12 16.5V20"/>',
    srcBox: '<rect x="4" y="7.5" width="16" height="9" rx="3"/><path d="M7.5 12h4"/><circle cx="16.2" cy="12" r="1" fill="currentColor"/>',
    srcDisc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/><path d="M7.2 7.2A6.8 6.8 0 0 1 12 5.2"/>',
    srcAudio: '<rect x="2.5" y="8" width="19" height="8" rx="2.5"/><circle cx="7" cy="12" r="1.8"/><circle cx="17" cy="12" r="1.8"/><circle cx="12" cy="12" r="1"/>',
    srcTv: '<rect x="3" y="6.5" width="18" height="12.5" rx="2"/><path d="m8.5 3 3.5 3.5L15.5 3M8.5 21.5h7"/>'
  };
  var INPUT_ICONS = [
    { id: 'hdmi', label: 'HDMI', svg: 'srcHdmi' },
    { id: 'console', label: 'Console', svg: 'srcConsole' },
    { id: 'ps', label: 'PS5', svg: 'srcPs' },
    { id: 'xbox', label: 'Xbox', svg: 'srcXbox' },
    { id: 'switch', label: 'Switch', svg: 'srcSwitch' },
    { id: 'pc', label: 'PC / Mac', svg: 'srcPc' },
    { id: 'box', label: 'Box', svg: 'srcBox' },
    { id: 'disc', label: 'Disc', svg: 'srcDisc' },
    { id: 'audio', label: 'Audio', svg: 'srcAudio' },
    { id: 'tv', label: 'Live TV', svg: 'srcTv' }
  ];
  var INPUT_DEFS = [
    { id: 'hdmi1', key: 'HDMI1', sourceType: 'HDMI', sourceNum: 1, defaultName: 'HDMI 1', portLabel: 'HDMI 1', defaultIcon: 'hdmi', defaultShow: 'on' },
    { id: 'hdmi2', key: 'HDMI2', sourceType: 'HDMI', sourceNum: 2, defaultName: 'HDMI 2', portLabel: 'HDMI 2', defaultIcon: 'hdmi', defaultShow: 'auto' },
    { id: 'hdmi3', key: 'HDMI3', sourceType: 'HDMI', sourceNum: 3, defaultName: 'HDMI 3', portLabel: 'HDMI 3 (eARC)', defaultIcon: 'hdmi', defaultShow: 'auto' },
    { id: 'hdmi4', key: 'HDMI4', sourceType: 'HDMI', sourceNum: 4, defaultName: 'HDMI 4', portLabel: 'HDMI 4 (Game)', defaultIcon: 'console', defaultShow: 'auto' },
    { id: 'livetv', key: 'TV', sourceType: 'TV', sourceNum: 1, defaultName: 'Live TV', portLabel: 'Live TV', defaultIcon: 'tv', defaultShow: 'off' }
  ];
  var INPUT_IDS = INPUT_DEFS.map(function (d) { return d.id; });
  var sourceRuntime = {};
  function inputDef(id) { for (var i = 0; i < INPUT_DEFS.length; i++) if (INPUT_DEFS[i].id === id) return INPUT_DEFS[i]; return null; }
  function inputIconSvg(iconId) {
    for (var i = 0; i < INPUT_ICONS.length; i++) if (INPUT_ICONS[i].id === iconId) return INPUT_ICONS[i].svg;
    return 'srcHdmi';
  }

  /* ---------- State ---------- */
  var REDUCED_MOTION = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var S = {
    variant: 'B', geom: 'broad', c: null, stack: null,
    sel: null, selIdx: 0, lastUtil: 0, appsFocus: null, settingsFocus: 'background', appearanceFocus: 'bg', detailFocus: {},
    selectedInput: 'hdmi1',
    undo: [], removedAt: {}, note: null, err: null,
    writes: 0, failed: 0, log: [], logN: 0, lastLaunch: null, press: null,
    wallShown: null, wallPending: null, wallError: null,
    shown: null, pending: null, lookError: null, bundleKey: null, previewBundle: null, reflow: false, fontSwitch: false
  };
  var scroll = { first: 0, off: 0, photo: 0, photoArrange: 0 };
  function pick(v, list, fallback) {
    v = String(v || '').toLowerCase();
    for (var i = 0; i < list.length; i++) if (list[i].toLowerCase() === v) return list[i];
    return fallback;
  }
  function lookOf(c) { return { bg: c.bg, wall: c.wall, layout: c.layout, dockStyle: c.dockStyle || 'categorized', clockStyle: c.clockStyle || 'minimal', widget: c.widget || 'ambient', tempUnit: c.tempUnit || 'f', apps: c.apps, font: c.font, controls: c.controls, focus: c.focus, material: c.material }; }
  function materialApplies(c) { c = c || S.c; return c.bg === 'photo' && (c.layout === 'dock' || c.focus === 'glass'); }

  /* ---------- Helpers ---------- */
  function app(id) { for (var i = 0; i < APPS.length; i++) if (APPS[i].id === id) return APPS[i]; return null; }
  function wall(id) { for (var i = 0; i < WALLS.length; i++) if (WALLS[i].id === id) return WALLS[i]; return null; }
  function wallIndex(id) { for (var i = 0; i < WALLS.length; i++) if (WALLS[i].id === id) return i; return 0; }
  function frostClass(w) { var i = [.12, .20, .30, .36, .44].indexOf(w.frostVeil); return i > 0 ? ' fv-' + (i + 1) : ''; }
  function wallClasses(w) { return frostClass(w) + (w.listColumn ? ' lc-' + w.listColumn : '') + (w.dockQuiet ? ' db-quiet' : '') + (w.clockMist ? ' tl-mist' : ''); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function without(list, id) { return list.filter(function (x) { return x !== id; }); }
  function same(a, b) { if (a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function onHome(id) { return S.c.home.indexOf(id) >= 0; }
  function top() { return S.stack[S.stack.length - 1]; }
  function push(e) { S.stack.push(e); return e; }
  function pop() { if (S.stack.length > 1) S.stack.pop(); }
  function px(n) { return n.toFixed(2) + 'px'; }
  function icon(name, cls, underlay) {
    return '<svg class="ico' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">'
      + (underlay ? '<g class="ut-underlay" transform="translate(0 .5)">' + SVG[name] + '</g><g class="ut-ink">' + SVG[name] + '</g>' : SVG[name]) + '</svg>';
  }
  function badge(on) {
    return on
      ? '<svg class="badge is-on" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path class="badge-tick" d="m7.6 12.4 3 3 5.8-6.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : '<svg class="badge is-off" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  }
  function log(text) { S.log.unshift('#' + (++S.logN) + ' ' + text); if (S.log.length > 10) S.log.pop(); }

  var maskSupport = 'webkitMaskImage' in document.documentElement.style || 'maskImage' in document.documentElement.style, markProbes = {};
  function probeMark(id) {
    if (markProbes[id]) return;
    var im = new Image(); markProbes[id] = 'loading';
    im.onload = function () { markProbes[id] = 'ok'; };
    im.onerror = function () {
      markProbes[id] = 'bad';
      Array.prototype.forEach.call(document.querySelectorAll('[data-mark="' + id + '"]'), function (el) { el.className += ' is-bad'; });
    };
    im.src = ICONS + id + '.svg';
  }
  /* Optical placement is identical for the CSS mask and the image fallback. */
  function markHtml(id, w, h, size) {
    var m = window.FrameIconMetrics && window.FrameIconMetrics[id], st;
    if (m) {
      var weight = clamp(Math.pow(0.45 / m.fill, 0.3), 0.84, 1.25);
      var k = Math.min(w / m.w, h / m.h, size * weight / Math.sqrt(m.w * m.h)), s = m.n * k;
      st = 'width:' + px(s) + ';height:' + px(s) + ';left:' + px(w / 2 - (m.x + m.w / 2) * k) + ';top:' + px(h / 2 - (m.y + m.h / 2) * k);
    } else st = 'width:' + w + 'px;height:' + h + 'px;left:0;top:0;object-fit:contain';
    probeMark(id);
    return '<span class="mark' + (markProbes[id] === 'bad' ? ' is-bad' : '') + '" data-mark="' + id + '" style="width:' + w + 'px;height:' + h + 'px">'
      + (maskSupport ? '<span class="mk" style="' + st + ';-webkit-mask-image:url(' + ICONS + id + '.svg);mask-image:url(' + ICONS + id + '.svg)"></span>' : '<img alt="" src="' + ICONS + id + '.svg" style="' + st + '">') + '</span>';
  }
  function appMark(a, w, h, size) {
    if (a.isSource) {
      var svgName = inputIconSvg(a.srcIcon || 'hdmi'), s = Math.round(size * 1.05);
      return '<span class="mark src-mark" style="width:' + w + 'px;height:' + h + 'px">'
        + '<svg class="ico src-ico" viewBox="0 0 24 24" aria-hidden="true" style="width:' + s + 'px;height:' + s + 'px;left:' + px((w - s) / 2) + ';top:' + px((h - s) / 2) + '">' + SVG[svgName] + '</svg>'
        + (a.connected ? '<span class="src-dot' + (a.signal ? ' is-signal' : '') + '" title="Connected"></span>' : '')
        + '</span>';
    }
    if (a.mark && (maskSupport || S.c.bg !== 'light')) return markHtml(a.brand || a.id, w, h, size);
    var words = a.name.split(/\s+/), letters = words[0].charAt(0) + (words.length > 1 ? words[1].charAt(0) : '');
    return '<span class="mark monogram' + (a.icon ? ' native-icon' : '') + '" style="width:' + w + 'px;height:' + h + 'px;font-size:' + Math.round(size * .65) + 'px"><span>' + esc(letters.toUpperCase()) + '</span>'
      + (a.icon ? '<img alt="" data-native-icon="true" src="' + esc(a.icon) + '">' : '') + '</span>';
  }
  function smallMark(a) { return appMark(a, 56, 44, 36); }
  var measureCanvas = document.createElement('canvas'), measureContext = measureCanvas.getContext('2d'), measureSpan = document.createElement('span');
  measureSpan.setAttribute('aria-hidden', 'true');
  measureSpan.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;white-space:pre;font-synthesis:none;';
  document.body.appendChild(measureSpan);
  function homeFont() { return S.shown && S.shown.font || 'manrope'; }
  function fontRole(id, role, size) {
    var f = FONTS[id] || FONTS.manrope, serif = id === 'newsreader';
    return { family: f.family,
      weight: role === 'display' ? f.display : role === 'clock' ? f.clock : serif ? 400 : f.ui,
      opsz: serif ? role === 'display' ? 72 : role === 'clock' ? 48 : role === 'ui' && (!size || size === 28) ? 28 : 36 : 0 };
  }
  function measureFace(id, faces) {
    var result = { roles: {}, digits: [], digitCell: 0 }, roles = { display: [88, 76, 56], clock: [48], primary: [22, 25, 26, 30, 32, 34, 36, 40], ui: [28, 30, 48] };
    var face = id === 'newsreader' ? faces[0][0] : null, original = face ? face.variationSettings : '', r, widths, min, max;
    Object.keys(roles).forEach(function (role) {
      result.roles[role] = {};
      // Canvas has no optical-size property. Set this face's default only while measuring;
      // CSS specifies each rendered role explicitly, and the descriptor is restored below.
      roles[role].forEach(function (size) {
        r = fontRole(id, role, size);
        if (face) face.variationSettings = r.opsz ? '"opsz" ' + r.opsz : original;
        measureContext.font = r.weight + ' ' + size + 'px "' + r.family + '"';
        var m = measureContext.measureText('H'), d = measureContext.measureText('gjpqy');
        result.roles[role][size] = { cap: m.actualBoundingBoxAscent || size * .72, ascent: m.fontBoundingBoxAscent || size * 1.066, descent: m.fontBoundingBoxDescent || size * .3, lower: d.actualBoundingBoxDescent || size * .255 };
      });
    });
    if (face) face.variationSettings = original;
    r = fontRole(id, 'clock');
    measureSpan.style.font = r.weight + ' 48px/64px "' + r.family + '"';
    measureSpan.style.letterSpacing = '0'; measureSpan.style.fontVariantNumeric = 'tabular-nums';
    measureSpan.style.fontVariationSettings = r.opsz ? '"opsz" ' + r.opsz : 'normal';
    widths = '0123456789'.split('').map(function (n) { measureSpan.textContent = n; return measureSpan.getBoundingClientRect().width; });
    min = Math.min.apply(Math, widths); max = Math.max.apply(Math, widths);
    result.digits = widths; result.digitCell = max - min > .02 ? max : 0;
    return result;
  }
  function fontChoices() {
    LOOK_VALUES.font = Object.keys(FONTS).filter(function (id) { return id === 'manrope' || PRIVATE_FONTS.indexOf(id) >= 0 && !unavailableFonts[id]; });
  }
  function retryFontFaces(id) {
    // A rejected CSS FontFace cannot load again. Recreate only that failed family's
    // rules; the displayed family's faces and the rest of the stylesheet stay intact.
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
      var rules, i, rule, family, css;
      try { rules = sheet.cssRules; } catch (e) { return; }
      if (!rules) return;
      for (i = 0; i < rules.length; i++) {
        rule = rules[i];
        if (rule.type !== 5) continue;
        family = rule.style.getPropertyValue('font-family').replace(/["']/g, '').trim();
        if (family !== FONTS[id].family) continue;
        css = rule.cssText; sheet.deleteRule(i); sheet.insertRule(css, i);
      }
    });
  }
  function loadFont(id, done) {
    var f = FONTS[id], weights = [f.display], timer, ended = false;
    if (fontMetrics[id]) { done(true); return; }
    if (!document.fonts || !document.fonts.load) { if (id === 'manrope') { fontMetrics.manrope = measureFace('manrope', []); fontsReady = true; done(true); } else done(false, 'unsupported'); return; }
    if (unavailableFonts[id]) retryFontFaces(id);
    if (id !== 'newsreader' && weights.indexOf(f.ui) < 0) weights.push(f.ui);
    function finish(ok, reason, faces) {
      if (ended) return;
      ended = true; clearTimeout(timer);
      if (ok) {
        fontMetrics[id] = measureFace(id, faces); delete unavailableFonts[id];
        // Measurements and cached markup belong to a particular loaded font.
        widthCache = {}; fontRevision++;
        if (id === 'manrope') fontsReady = true;
      } else if (reason !== 'timeout') unavailableFonts[id] = true;
      fontChoices(); done(ok, reason);
    }
    timer = setTimeout(function () { finish(false, 'timeout'); }, 3000);
    Promise.all(weights.map(function (weight) { return document.fonts.load(weight + ' 88px "' + f.family + '"'); })).then(function (faces) {
      finish(faces.every(function (list) { return list.length > 0 && list.every(function (face) { return face.status === 'loaded'; }); }), 'load', faces);
    }, function () { finish(false, 'load'); });
  }
  var baselineRecovery = false;
  function ensureFont(id, done) {
    loadFont('manrope', function (ok, reason) {
      if (!ok && id === 'manrope') {
        // The local fallback keeps Home usable if the baseline face is slow or missing.
        fontMetrics.manrope = measureFace('manrope', []); fontMetrics.manrope.fallback = true; fontsReady = true;
        done(true, reason);
        if (!baselineRecovery && document.fonts && document.fonts.ready) {
          baselineRecovery = true;
          document.fonts.ready.then(function () {
            delete fontMetrics.manrope; delete unavailableFonts.manrope;
            loadFont('manrope', function (loaded) {
              if (!loaded) { fontMetrics.manrope = measureFace('manrope', []); fontMetrics.manrope.fallback = true; fontsReady = true; }
              render();
            });
          });
        }
        return;
      }
      if (!ok || id === 'manrope') done(ok, reason); else loadFont(id, done);
    });
  }
  function fontShift(role, size) {
    var id = homeFont(), base = fontMetrics.manrope, metrics = fontMetrics[id], a, b;
    if (id === 'manrope' || !base || !metrics) return 0;
    if (!base.roles || !base.roles[role] || !metrics.roles || !metrics.roles[role]) return 0;
    a = base.roles[role][size]; b = metrics.roles[role][size];
    if (!a || !b) return 0;
    return (a.ascent - a.descent - a.cap - b.ascent + b.descent + b.cap) / 2;
  }
  function textWidth(text, size, weight, spacing, role) {
    var id = homeFont(), r = fontRole(id, role || 'ui', size), key, width;
    if (id !== 'manrope') { weight = r.weight; spacing = role === 'display' ? -size * .01 : 0; }
    key = [id, role || 'ui', text, size, weight, spacing].join('|');
    if (widthCache.hasOwnProperty(key)) return widthCache[key];
    if (r.opsz) {
      measureSpan.style.font = weight + ' ' + size + 'px "' + r.family + '"';
      measureSpan.style.fontVariationSettings = '"opsz" ' + r.opsz;
      measureSpan.style.fontVariantNumeric = 'normal'; measureSpan.style.letterSpacing = '0'; measureSpan.textContent = text;
      width = measureSpan.getBoundingClientRect().width;
    } else {
      measureContext.font = (weight || 500) + ' ' + size + 'px "' + r.family + '", Arial, sans-serif';
      width = measureContext.measureText(text).width;
    }
    width += Math.max(0, text.length - 1) * (spacing || 0);
    // Do not retain fallback measurements made before the baseline font is ready.
    if (fontMetrics[id] && !fontMetrics[id].fallback) widthCache[key] = width;
    return width;
  }
  function dockLabelSize(id) { return S.c.apps === 'text' ? (textWidth(app(id).name, 30, 600, -.6, 'primary') > 176 ? 25 : 30) : textWidth(app(id).name, 26, 500, -.5, 'primary') > 180 ? 22 : 26; }
  function reducedDockLabel(id) { return S.c.apps !== 'icons' && dockLabelSize(id) === (S.c.apps === 'text' ? 25 : 22); }
  function actionWidth(text) { return clamp(Math.ceil(textWidth(text, 30, 500, -.3) + 40), 288, 400); }
  function photoLabel(id, compact) {
    var text = app(id).name, size = compact ? 56 : 88, limit = compact ? 640 : 992, width = textWidth(text, size, 600, -1.8, 'display');
    if (!compact && width > limit) { size = 76; width = textWidth(text, size, 600, -1.8, 'display'); }
    // Newsreader's ninth compact Type row otherwise enters the lower fade by .63px.
    return { size: size, top: (compact ? 10.66 : size === 76 ? 10.36 : 9.68) + fontShift('display', size) - (compact && homeFont() === 'newsreader' ? .7 : 0), width: Math.min(limit, width), ellipsis: width > limit };
  }
  function listPlateWidth(id, compact) {
    if (S.c.apps === 'icons') return compact ? 120 : 144;
    var text = S.c.apps === 'text';
    return clamp(Math.ceil(photoLabel(id, compact).width + (text ? 84 : compact ? 156 : 184)), text ? 280 : 360, text ? compact ? 724 : 1076 : compact ? 796 : 1176);
  }

  /* Keyed children: elements persist by key so transforms animate instead of re-creating.
     Children are absolutely positioned, so DOM order never needs to change. */
  function keyed(parent, items, update) {
    var map = parent._k || (parent._k = {}), seen = {}, i, it, el, isNew, k;
    for (i = 0; i < items.length; i++) {
      it = items[i]; el = map[it.key]; isNew = !el;
      if (isNew) { el = document.createElement('div'); map[it.key] = el; }
      update(el, it, i);
      if (isNew) parent.appendChild(el);
      seen[it.key] = 1;
    }
    for (k in map) if (map.hasOwnProperty(k) && !seen[k]) { if (map[k].parentNode === parent) parent.removeChild(map[k]); delete map[k]; }
  }
  function setContent(el, sig, renderContent) {
    sig += '|' + catalog.revision + '|' + fontRevision;
    if (el._sig === sig) return;
    el.innerHTML = renderContent();
    el._sig = sig;
    Array.prototype.forEach.call(el.querySelectorAll('[data-native-icon]'), function (img) {
      function ready() { img.parentNode.classList.add('has-native-icon'); }
      function failed() { img.style.display = 'none'; img.parentNode.classList.remove('has-native-icon'); }
      img.onload = ready; img.onerror = failed;
      if (img.complete) { if (img.naturalWidth) ready(); else failed(); }
    });
  }
  function setHTML(el, html) { if (el._html !== html) { el._html = html; el.innerHTML = html; } }
  function attrs(el, z, i, action) { el.setAttribute('data-z', z); el.setAttribute('data-i', String(i)); el.setAttribute('data-action', action); }

  /* ---------- Saved preferences ---------- */
  function safeId(id) { return typeof id === 'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,160}$/.test(id) && ['constructor', 'prototype', '__proto__'].indexOf(id) < 0; }
  function safeIcon(path) { return typeof path === 'string' && path.length < 2048 && /^(?:\/[^\/]|file:\/\/\/|wgt-package:\/\/\/)/.test(path) ? path : ''; }
  function load() {
    var keys = [KEY, 'cleanframe.shore.v1'], raw, saved, i;
    for (i = 0; i < keys.length; i++) {
      try {
        raw = localStorage.getItem(keys[i]);
        if (!raw) continue;
        saved = JSON.parse(raw);
        if (saved && typeof saved === 'object' && !Array.isArray(saved)) return saved;
      } catch (e) { storageOk = false; }
    }
    return null;
  }
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
  var KNOWN_BRANDS = ['hbomax', 'spotify', 'tubi', 'hulu', 'paramountplus', 'crunchyroll', 'peacock', 'youtubetv', 'espn', 'slingtv', 'twitch', 'amcplus', 'plutotv', 'fubotv', 'amazonalexa', 'internet', 'niftygateway', 'huesync', 'xbox', 'geforcenow', 'luna'];
  function rowMax() { return S.c && S.c.dockStyle === 'compact' ? 10 : 7; }
  var CAT_MEDIA = ['spotify', 'youtube', 'applemusic', 'hdmi1', 'hdmi2', 'hdmi3', 'hdmi4', 'livetv'];
  var CAT_TITLES = ['Streaming', 'Media'];
  var HIDDEN_FROM_DEFAULT_HOME = ['niftytizen.NiftyGateway', 'org.tizen.browser', 'AQKO41xyKP.AmazonAlexa', 'com.samsung.tv.knox-browser', 'com.samsung.tv.gallery', 'org.tizen.smartthings'];
  function resolveBrand(brand, appId, id) {
    var b = EXTRA_BRANDS[appId] || EXTRA_BRANDS[id] || brand || '';
    return KNOWN_BRANDS.indexOf(b) >= 0 ? b : '';
  }
  function copyRowMap(map) {
    var out = {};
    if (map && typeof map === 'object') Object.keys(map).forEach(function (k) { if (map[k] === 0 || map[k] === 1) out[k] = map[k]; });
    return out;
  }
  function cleanInputs(raw) {
    var out = {}, r = raw && typeof raw === 'object' ? raw : {};
    INPUT_DEFS.forEach(function (d) {
      var item = r[d.id] && typeof r[d.id] === 'object' ? r[d.id] : {};
      var name = typeof item.name === 'string' ? item.name.trim().slice(0, 48) : '';
      var iconId = typeof item.icon === 'string' && INPUT_ICONS.some(function (ic) { return ic.id === item.icon; }) ? item.icon : '';
      var show = ['on', 'auto', 'off'].indexOf(item.show) >= 0 ? item.show : d.defaultShow;
      out[d.id] = { name: name, icon: iconId, show: show };
    });
    return out;
  }
  function copyInputs(inputs) {
    return cleanInputs(inputs);
  }
  function detectHardwareSource(s, d) {
    var label = s && s.label ? String(s.label).trim() : '', low = label.toLowerCase();
    if (!label || low === 'hdmi' || low === d.key.toLowerCase() || low === d.defaultName.toLowerCase()) return { name: '', icon: '' };
    if (/ps5|playstation|ps4|dualsense|dualshock|sony/.test(low)) return { name: label, icon: 'ps' };
    if (/xbox/.test(low)) return { name: label, icon: 'xbox' };
    if (/switch|nintendo/.test(low)) return { name: label, icon: 'switch' };
    if (/apple\s*tv/.test(low)) return { name: label, icon: 'box' };
    if (/pc|mac|computer|desktop|laptop|geforce|rtx|radeon/.test(low)) return { name: label, icon: 'pc' };
    if (/blu-?ray|disc|dvd|uhd/.test(low)) return { name: label, icon: 'disc' };
    if (/soundbar|sonos|avr|receiver|denon|yamaha|bose|arc|earc/.test(low)) return { name: label, icon: 'audio' };
    if (/cable|xfinity|fios|spectrum|directv|dish|roku|shield|fire\s*tv|chromecast/.test(low)) return { name: label, icon: 'box' };
    return { name: label.slice(0, 40), icon: d.defaultIcon };
  }
  function syncSourceApps(c) {
    var inputs = c && c.inputs ? c.inputs : cleanInputs(null);
    INPUT_DEFS.forEach(function (d) {
      var cfg = inputs[d.id] || { name: '', icon: '', show: d.defaultShow };
      var rt = sourceRuntime[d.id] || { connected: false, signal: false, detectedName: '', detectedIcon: '' };
      var a = app(d.id);
      if (!a) { a = { id: d.id, isSource: true }; APPS.push(a); }
      a.isSource = true;
      a.sourceType = d.sourceType;
      a.sourceNum = d.sourceNum;
      a.portLabel = d.portLabel;
      a.name = cfg.name || rt.detectedName || d.defaultName;
      a.srcIcon = cfg.icon || rt.detectedIcon || d.defaultIcon;
      a.connected = !!rt.connected;
      a.signal = !!rt.signal;
    });
    widthCache = {};
    catalog.revision++;
  }
  function applyHardwareSources(list) {
    var map = {}, homeChanged = false, h = S.c ? S.c.home.slice() : [];
    (list || []).forEach(function (s) { if (s && s.key) map[s.key] = s; });
    INPUT_DEFS.forEach(function (d) {
      var s = map[d.key];
      var det = s ? detectHardwareSource(s, d) : { name: '', icon: '' };
      sourceRuntime[d.id] = {
        connected: !!(s && s.connected),
        signal: !!(s && s.signal),
        detectedName: det.name,
        detectedIcon: det.icon
      };
      if (S.c && S.c.inputs && S.c.inputs[d.id]) {
        var mode = S.c.inputs[d.id].show;
        if (mode === 'auto' && s && s.connected && h.indexOf(d.id) < 0 && h.length < CAP) {
          h.push(d.id);
          homeChanged = true;
        }
      }
    });
    if (S.c) {
      syncSourceApps(S.c);
      if (homeChanged) {
        var c = next(h, S.c.recent.slice());
        write(c, 'Auto-detected input');
      }
      render();
    }
  }
  function refreshSources() {
    if (!window.FrameDevice || !FrameDevice.sources) return;
    FrameDevice.sources(function (err, list) {
      if (!err && list) applyHardwareSources(list);
    });
  }
  syncSourceApps(null);

  function appCategory(id, customMap) {
    var map = customMap || (S.c && S.c.rowMap);
    if (map && (map[id] === 0 || map[id] === 1)) return map[id];
    var a = app(id), b = a && (a.brand || a.id) || resolveBrand('', id, id) || id;
    if (CAT_MEDIA.indexOf(b) >= 0 || INPUT_IDS.indexOf(id) >= 0) return 1;
    return 0;
  }
  function sortByCategory(ids, customMap, sortAlpha) {
    var buckets = [[], []];
    ids.forEach(function (id) { buckets[appCategory(id, customMap)].push(id); });
    if (sortAlpha) {
      buckets.forEach(function (list) {
        list.sort(function (a, b) {
          var na = (app(a) && app(a).name || a).toLowerCase();
          var nb = (app(b) && app(b).name || b).toLowerCase();
          return na.localeCompare(nb);
        });
      });
    }
    return buckets[0].concat(buckets[1]);
  }
  function homeRows(items, customMap, keepEmpty) {
    var buckets = [[], []], rows = [], rMax = rowMax();
    items.forEach(function (it, idx) {
      var cat = it.kind === 'add' ? 1 : appCategory(it.id, customMap);
      buckets[cat].push({ key: it.key, kind: it.kind, id: it.id, idx: idx, cat: cat });
    });
    buckets.forEach(function (list, cat) {
      if (!list.length && !keepEmpty) return;
      if (!list.length) {
        rows.push({ cat: cat, title: CAT_TITLES[cat], showTitle: true, catSpan: 1, items: [] });
        return;
      }
      var span = Math.ceil(list.length / rMax);
      for (var offset = 0; offset < list.length; offset += rMax) {
        var chunk = list.slice(offset, offset + rMax), r = rows.length;
        chunk.forEach(function (entry, c) { entry.row = r; entry.col = c; });
        rows.push({ cat: cat, title: CAT_TITLES[cat], showTitle: offset === 0, catSpan: span, items: chunk });
      }
    });
    return rows;
  }
  function clean(saved) {
    var s = saved && typeof saved === 'object' ? saved : {}, modern = s.look && typeof s.look === 'object' ? s.look : s;
    var legacyList = s.theme === 'list', h = [], recent = [], records = Array.isArray(s.appRecords) ? s.appRecords : [];
    var rowMap = s.categorizedV2 ? copyRowMap(s.rowMap) : {};
    var inputs = cleanInputs(s.inputs);
    syncSourceApps({ inputs: inputs });
    records.slice(0, 256).forEach(function (a) {
      if (!a || !safeId(a.id) || !safeId(a.appId) || typeof a.name !== 'string' || !a.name.trim() || app(a.id)) return;
      var brand = resolveBrand(a.brand, a.appId, a.id);
      APPS.push({ id: a.id, appId: a.appId, name: (CLEAN_NAMES[a.appId] || a.name).slice(0, 160), brand: brand, mark: !!brand, icon: safeIcon(a.icon) });
    });
    if (s.categorizedV2 || s.categorizedV1) {
      (Array.isArray(s.home) ? s.home : Array.isArray(s.dock) ? s.dock : []).forEach(function (id) {
        if (!safeId(id) || id === 'niftytizen.NiftyGateway' || h.indexOf(id) >= 0 || h.length >= CAP) return;
        if (!s.categorizedV2 && HIDDEN_FROM_DEFAULT_HOME.indexOf(id) >= 0) return;
        if (!app(id) && id.indexOf('.') > 0) {
          var b = resolveBrand('', id, id);
          APPS.push({ id: id, appId: id, name: id.split('.').pop(), brand: b, mark: !!b });
        }
        if (app(id)) h.push(id);
      });
    }
    if (!h.length) h = PRIMARY.slice();
    if (!s.inputsV1 && h.indexOf('hdmi1') < 0 && h.length < CAP) h.push('hdmi1');
    INPUT_DEFS.forEach(function (d) {
      if (inputs[d.id].show === 'on' && h.indexOf(d.id) < 0 && h.length < CAP) h.push(d.id);
      else if (inputs[d.id].show === 'off' && h.indexOf(d.id) >= 0 && h.length > 1) h = without(h, d.id);
    });
    h = sortByCategory(h, rowMap, !s.categorizedV2);
    (Array.isArray(s.recent) ? s.recent : []).forEach(function (id) { if (safeId(id) && app(id) && h.indexOf(id) < 0 && recent.indexOf(id) < 0 && recent.length < 5) recent.push(id); });
    return {
      bg: pick(modern.bg, LOOK_VALUES.bg, legacyList ? 'dark' : 'photo'), layout: pick(modern.layout, LOOK_VALUES.layout, legacyList ? 'list' : 'dock'),
      dockStyle: pick(modern.dockStyle, LOOK_VALUES.dockStyle, 'categorized'),
      clockStyle: pick(modern.clockStyle, LOOK_VALUES.clockStyle, 'minimal'),
      widget: pick(modern.widget, LOOK_VALUES.widget, 'ambient'),
      tempUnit: pick(modern.tempUnit, LOOK_VALUES.tempUnit, 'f'),
      apps: pick(modern.apps, LOOK_VALUES.apps, legacyList ? 'text' : 'both'), controls: pick(modern.controls, LOOK_VALUES.controls, 'both'),
      focus: pick(modern.focus, LOOK_VALUES.focus, legacyList ? 'type' : 'glass'), material: pick(modern.material, LOOK_VALUES.material, 'soft'),
      font: pick(modern.font, LOOK_VALUES.font, 'manrope'), wall: wall(modern.wall || s.wallpaper) ? modern.wall || s.wallpaper : WALLS[0].id,
      home: h, rowMap: rowMap, inputs: inputs, recent: recent, lastApp: h.indexOf(s.lastApp) >= 0 ? s.lastApp : h[0],
      mode: pick(s.mode, MODES.map(function (m) { return m.id; }), 'fixed')
    };
  }
  function serialise(c) {
    var out = {};
    Object.keys(c).forEach(function (key) { out[key] = c[key]; });
    out.version = 2; out.categorizedV1 = true; out.categorizedV2 = true; out.inputsV1 = true; out.rowMap = copyRowMap(c.rowMap); out.inputs = copyInputs(c.inputs); out.look = lookOf(c); out.dock = c.home.slice(); out.wallpaper = c.wall;
    out.theme = c.layout === 'list' ? 'list' : 'shore';
    out.appRecords = [];
    c.home.concat(c.recent).forEach(function (key) {
      var a = app(key);
      if (a && !a.isSource && PRIMARY.indexOf(key) < 0 && !out.appRecords.some(function (r) { return r.id === key; })) out.appRecords.push({ id: a.id, appId: a.appId, name: a.name, brand: a.brand || '', icon: a.icon || '' });
    });
    return out;
  }
  function initialise() {
    var saved = load(), initial; S.c = clean(saved); syncSourceApps(S.c); initial = next(S.c.home.slice(), S.c.recent.slice());
    S.stack = [{ id: 'home', f: { zone: 'apps', u: 0 } }];
    S.sel = S.c.lastApp; S.selIdx = S.c.home.indexOf(S.sel);
    if (saved && initial.mode === 'open') initial.wall = WALLS[(wallIndex(initial.wall) + 1) % WALLS.length].id;
    // Keep the old schema keys alongside the builder values for in-place updates.
    try { localStorage.setItem(KEY, JSON.stringify(serialise(initial))); S.c = initial; storageOk = true; } catch (e) { storageOk = false; }
  }
  function clearSession() { S.undo = []; S.removedAt = {}; S.note = null; S.err = null; }
  function begin() { S.note = null; }
  function next(home, recent) { var c = lookOf(S.c); c.home = home; c.recent = recent; c.lastApp = S.c.lastApp; c.mode = S.c.mode; c.rowMap = copyRowMap(S.c.rowMap); c.inputs = copyInputs(S.c.inputs); return c; }
  function snap() { return { home: S.c.home.slice(), recent: S.c.recent.slice() }; }
  function pushRecent(list, id) { return [id].concat(without(list, id)).slice(0, 5); }
  function write(c, label) {
    try { localStorage.setItem(KEY, JSON.stringify(serialise(c))); }
    catch (e) { storageOk = false; S.failed++; S.err = label; log('Not saved: ' + label); return false; }
    if (c.wall !== S.c.wall || c.mode !== S.c.mode) resetRotation();
    storageOk = true; S.c = c; syncSourceApps(S.c); S.writes++; S.err = null; log('Saved: ' + label);
    return true;
  }
  function errText(lifted) {
    return 'Couldn’t save. Nothing changed.';
  }
  function statusHtml(def, lifted) {
    if (S.err) return '<span class="warn error-chip">' + esc(errText(lifted)) + '</span>';
    return esc(S.note || def);
  }

  function ensureSel() {
    var h = S.c.home, i;
    if (!h.length) { S.sel = null; return -1; }
    i = h.indexOf(S.sel);
    if (i < 0) { i = clamp(S.selIdx, 0, h.length - 1); S.sel = h[i]; }
    S.selIdx = i;
    return i;
  }
  function setSel(id) { S.sel = id; S.selIdx = S.c.home.indexOf(id); }

  /* Membership and order operations shared by B and C. A works on slots (below). */
  function homeRemove(id) {
    var a = app(id), i = S.c.home.indexOf(id), before = snap(), h, c;
    if (i < 0) return false;
    if (S.c.home.length <= 1) { S.note = LAST; return false; }
    h = S.c.home.slice(); h.splice(i, 1);
    c = next(h, pushRecent(S.c.recent, id));
    if (a && a.isSource && c.inputs[id]) c.inputs[id].show = 'off';
    if (!write(c, 'Remove ' + a.name + ' from Home')) return false;
    S.removedAt[id] = i;
    S.undo.push({ label: 'Remove ' + a.name, snap: before });
    return true;
  }
  function homeAdd(id) {
    var a = app(id), before = snap(), h = S.c.home.slice(), at, c;
    if (h.length >= CAP) { S.note = FULL; return false; }
    at = S.removedAt.hasOwnProperty(id) ? Math.min(S.removedAt[id], h.length) : h.length;
    h.splice(at, 0, id);
    c = next(h, without(S.c.recent, id));
    if (a && a.isSource && c.inputs[id]) c.inputs[id].show = 'on';
    if (!write(c, 'Add ' + a.name + ' to Home')) return false;
    S.undo.push({ label: 'Add ' + a.name, snap: before });
    return true;
  }
  function homeMove(order, id, before) {
    var a = app(id);
    if (!write(next(order, S.c.recent.slice()), 'Move ' + a.name)) return false;
    S.undo.push({ label: 'Move ' + a.name, snap: before });
    return true;
  }
  function undoLast(arr) {
    var u = S.undo[S.undo.length - 1];
    if (!u) { S.note = 'Nothing to undo'; return false; }
    if (!write(next(u.snap.home.slice(), u.snap.recent.slice()), 'Undo ' + u.label)) return false;
    S.undo.pop();
    S.note = 'Undone: ' + u.label + '.';
    return true;
  }
  function undoLabel() { var u = S.undo[S.undo.length - 1]; return u ? u.label : ''; }
  function undoCaption() { var label = undoLabel(); return label ? 'Undo ' + label.charAt(0).toLowerCase() + label.slice(1) : 'Nothing to undo'; }
  function editStatus(hint, move) {
    if (S.err) return statusHtml('', !!move);
    if (S.note === FULL || S.note === LAST) return '<span class="warn">' + esc(S.note) + '</span>';
    if (hint === FULL || hint === LAST) return '<span class="warn">' + esc(hint) + '</span>';
    return esc(move || hint || S.note || '');
  }

  var busy = false, busyTimer = 0;
  function release() { busy = false; clearTimeout(busyTimer); S.press = null; }
  function message(title, line, note) {
    push({ id: 'message', msg: 'error', content: { title: title, line: line, note: note || '', actions: [['back', 'Back']] }, f: { b: 0 } });
  }
  function perform(title, run) {
    if (busy) return;
    busy = true; busyTimer = setTimeout(release, 10000);
    run(function (err) {
      release();
      if (err) message(title, err.message || 'The TV could not open this screen.', err.detail || '');
      render(); syncRotation();
    });
  }
  function launch(id) {
    var a = app(id), c;
    if (!a || busy) return;
    if (S.c.home.indexOf(id) >= 0) { c = next(S.c.home.slice(), S.c.recent.slice()); c.lastApp = id; write(c, 'Last app'); }
    S.press = id; S.lastLaunch = a.name;
    if (a.isSource) {
      perform(a.name, function (done) { FrameDevice.launchSource({ type: a.sourceType, number: a.sourceNum }, done); });
      return;
    }
    perform(a.name, function (done) { FrameDevice.launchApp(a.appId, done); });
  }
  function refreshCatalog() {
    var request, oldFocus;
    if (catalog.loading) return;
    request = ++catalog.request; catalog.loading = true; catalog.error = null;
    FrameDevice.apps(function (err, entries) {
      if (request !== catalog.request) return;
      catalog.loading = false;
      if (err) { catalog.error = err.message || 'Could not read installed apps.'; if (!catalog.loaded) ALPHA = []; render(); return; }
      oldFocus = top().id === 'apps' ? ALPHA[top().f.i] : null;
      ALPHA = [];
      entries.forEach(function (entry) {
        var id = PRIMARY.indexOf(entry.brand) >= 0 ? entry.brand : entry.appId, a;
        if (!safeId(id) || !safeId(entry.appId) || ALPHA.indexOf(id) >= 0) return;
        a = app(id);
        if (!a) { a = { id: id }; APPS.push(a); }
        a.appId = entry.appId; a.brand = entry.brand || ''; a.mark = !!entry.brand;
        a.icon = safeIcon(entry.icon);
        a.name = PRIMARY.indexOf(id) >= 0 ? PRIMARY_APPS[PRIMARY.indexOf(id)].name : String(entry.name).slice(0, 160);
        ALPHA.push(id);
      });
      ALPHA.sort(function (a, b) { return app(a).name.toLowerCase().localeCompare(app(b).name.toLowerCase()); });
      catalog.loaded = true; catalog.error = null; catalog.revision++;
      if (top().id === 'apps' && oldFocus && ALPHA.indexOf(oldFocus) >= 0) top().f.i = ALPHA.indexOf(oldFocus);
      norm(); render();
    });
  }

  /* ---------- Navigation targets ---------- */
  function utils() { return ['settings']; }
  /* prev/next run along the apps; out goes to the controls, inn comes back (or to a per-app action). */
  function axes() {
    var v = S.c.layout === 'list';
    return { prev: v ? 'up' : 'left', next: v ? 'down' : 'right', out: v ? 'right' : 'up', inn: v ? 'left' : 'down' };
  }
  function utilAction(u) {
    if (u === 'art') perform('Art Mode', FrameDevice.art);
    else if (u === 'apps') openApps();
    else openSettings();
  }
  function addAppsRoute() { openEditor('home'); }
  function openSettings() { push({ id: 'settings', f: { id: S.settingsFocus } }); }
  function openAppearance(group) {
    var axis = { background: 'bg', clock: 'clockStyle', layout: 'layout', typography: 'font', focus: 'focus' }[group];
    var action = S.detailFocus[group] || (axis ? 'choice.' + axis + '.' + S.c[axis] : group === 'inputs' ? 'input.port.' + (S.selectedInput || 'hdmi1') : group === 'rotation' ? 'rotation.' + S.c.mode : 'samsung.home');
    push({ id: 'appearance', group: group, f: { action: action } });
  }
  function openMessage(key) { push({ id: 'message', msg: key, f: { b: 0 } }); }
  function openApps() {
    var e = { id: 'apps', mode: 'browse', top: 0, f: { zone: 'grid', i: Math.max(0, ALPHA.indexOf(S.appsFocus)), h: 0 } };
    push(e); refreshCatalog(); return e;
  }
  function openEditor(origin) {
    var i = ensureSel();
    clearSession();
    refreshCatalog();
    push({ id: 'editor', origin: origin, lifted: null, top: 0, otherReturn: { id: otherList()[0] || null, index: 0, top: 0 }, f: { zone: S.c.home.length ? 'home' : 'other', i: Math.max(0, i), part: 'name', h: 1, j: 0 } });
  }
  function openWallpaper() {
    var i = wallIndex(S.c.wall);
    S.err = null; S.wallError = null;
    push({ id: 'wallpaper', i: i, top: clamp(i - 2, 0, Math.max(0, WALLS.length - WALL_VISIBLE)), f: { zone: 'photo' },
      previewTimer: 0, previewDue: null, applyPending: null, failedId: null, failedApply: false, retryBundle: null });
  }
  function isSettingsDetail(t) { return t.id === 'appearance' || t.id === 'wallpaper'; }

  var V = {};

  /* ---------- Home (browse & hold-to-move) ---------- */
  function startHomeMove(t) {
    ensureSel();
    if (!S.c.home.length || !S.sel || S.c.layout === 'list') return;
    t.f.zone = 'apps';
    t.lifted = { id: S.sel, order: S.c.home.slice(), rowMap: copyRowMap(S.c.rowMap) };
    render();
  }
  V.home = {
    key: function (t, k) {
      var f = t.f, h = S.c.home, U = utils(), i = ensureSel();
      if (S.c.layout === 'list') { listHomeKey(t, k, i, U); return; }
      if (t.lifted) {
        var lid = t.lifted.id, rMap = t.lifted.rowMap, buckets = [[], []], bCat = 0, bIdx = 0, rMax = rowMax();
        t.lifted.order.forEach(function (id) {
          var cat = appCategory(id, rMap);
          buckets[cat].push(id);
        });
        buckets.forEach(function (list, c) {
          var idx = list.indexOf(lid);
          if (idx >= 0) { bCat = c; bIdx = idx; }
        });
        var curSubRow = Math.floor(bIdx / rMax), curCol = bIdx % rMax;
        var totalSubRows = Math.max(1, Math.ceil(buckets[bCat].length / rMax));
        if (k === 'left' && bIdx > 0) {
          buckets[bCat].splice(bIdx, 1);
          buckets[bCat].splice(bIdx - 1, 0, lid);
          t.lifted.order = buckets[0].concat(buckets[1]);
        } else if (k === 'right' && bIdx < buckets[bCat].length - 1) {
          buckets[bCat].splice(bIdx, 1);
          buckets[bCat].splice(bIdx + 1, 0, lid);
          t.lifted.order = buckets[0].concat(buckets[1]);
        } else if (k === 'up') {
          if (curSubRow > 0) {
            var upIdx = (curSubRow - 1) * rMax + curCol;
            buckets[bCat].splice(bIdx, 1);
            buckets[bCat].splice(upIdx, 0, lid);
            t.lifted.order = buckets[0].concat(buckets[1]);
          } else if (bCat > 0) {
            buckets[bCat].splice(bIdx, 1);
            var prevCat = bCat - 1, prevLen = buckets[prevCat].length;
            var lastRowStart = Math.floor(prevLen / rMax) * rMax;
            buckets[prevCat].splice(Math.min(lastRowStart + curCol, prevLen), 0, lid);
            rMap[lid] = prevCat;
            t.lifted.order = buckets[0].concat(buckets[1]);
          }
        } else if (k === 'down') {
          if (curSubRow < totalSubRows - 1) {
            buckets[bCat].splice(bIdx, 1);
            var downIdx = Math.min((curSubRow + 1) * rMax + curCol, buckets[bCat].length);
            buckets[bCat].splice(downIdx, 0, lid);
            t.lifted.order = buckets[0].concat(buckets[1]);
          } else if (bCat < 1) {
            buckets[bCat].splice(bIdx, 1);
            var nextCat = bCat + 1;
            buckets[nextCat].splice(Math.min(curCol, buckets[nextCat].length), 0, lid);
            rMap[lid] = nextCat;
            t.lifted.order = buckets[0].concat(buckets[1]);
          }
        } else if (k === 'ok') {
          var nextC = next(t.lifted.order.slice(), S.c.recent.slice());
          nextC.rowMap = copyRowMap(rMap);
          nextC.lastApp = lid;
          t.lifted = null;
          write(nextC, 'Move ' + app(lid).name);
          setSel(lid);
        } else if (k === 'back') {
          t.lifted = null;
        }
        return;
      }
      var rows = homeRows(h.map(function (id) { return { key: id, kind: 'app', id: id }; })), curRow = 0, curCol = 0;
      rows.forEach(function (row, r) {
        row.items.forEach(function (it, c) { if (it.id === S.sel) { curRow = r; curCol = c; } });
      });
      if (f.zone === 'util') {
        f.u = clamp(f.u, 0, U.length - 1);
        if (k === 'left' && f.u > 0) f.u--;
        else if (k === 'right' && f.u < U.length - 1) f.u++;
        else if (k === 'down' || k === 'back') {
          f.zone = 'apps';
          if (rows.length && curRow !== 0) setSel(rows[0].items[Math.min(curCol, rows[0].items.length - 1)].id);
        } else if (k === 'ok') { S.lastUtil = f.u; utilAction(U[f.u]); return; }
        S.lastUtil = f.u;
        return;
      }
      f.zone = 'apps';
      if (k === 'back') openMessage('leave');
      else if (!rows.length) { if (k === 'up') { f.zone = 'util'; f.u = clamp(S.lastUtil, 0, U.length - 1); } else if (k === 'ok') addAppsRoute(); }
      else if (k === 'left' && curCol > 0) setSel(rows[curRow].items[curCol - 1].id);
      else if (k === 'right' && curCol < rows[curRow].items.length - 1) setSel(rows[curRow].items[curCol + 1].id);
      else if (k === 'up') {
        if (curRow > 0) setSel(rows[curRow - 1].items[Math.min(curCol, rows[curRow - 1].items.length - 1)].id);
        else { f.zone = 'util'; f.u = clamp(S.lastUtil, 0, U.length - 1); }
      } else if (k === 'down') {
        if (curRow < rows.length - 1) setSel(rows[curRow + 1].items[Math.min(curCol, rows[curRow + 1].items.length - 1)].id);
      } else if (k === 'ok') launch(S.sel);
    },
    point: function (t, z, i) {
      if (t.lifted) { this.key(t, 'ok'); return; }
      if (z === 'util') { t.f.zone = 'util'; t.f.u = i; S.lastUtil = i; }
      else if (z === 'app') { t.f.zone = 'apps'; setSel(S.c.home[i]); }
      else if (z === 'empty') t.f.zone = 'apps';
      else return;
      this.key(t, 'ok');
    }
  };
  function listHomeKey(t, k, i, U) {
    var f = t.f, h = S.c.home;
    if (f.zone === 'util') {
      f.u = clamp(f.u, 0, U.length - 1);
      if (k === 'up' && f.u > 0) f.u--;
      else if (k === 'down' && f.u < U.length - 1) f.u++;
      else if (k === 'left' || k === 'back') f.zone = 'apps';
      else if (k === 'ok') { S.lastUtil = f.u; utilAction(U[f.u]); return; }
      S.lastUtil = f.u;
      return;
    }
    f.zone = 'apps';
    if (k === 'up' && i > 0) setSel(h[i - 1]);
    else if (k === 'right') { f.zone = 'util'; f.u = clamp(S.lastUtil, 0, U.length - 1); }
    else if (k === 'down' && i < h.length - 1) setSel(h[i + 1]);
    else if (k === 'back') openMessage('leave');
    else if (k === 'ok') { if (h.length) launch(S.sel); else addAppsRoute(); }
  }

  /* ---------- Wallpaper child: focus previews, activation applies ---------- */
  function cancelWallpaperTimer(t) {
    clearTimeout(t.previewTimer); t.previewTimer = 0; t.previewDue = null;
  }
  function failWallpaper(t, id, apply, bundle) {
    t.applyPending = null; t.failedId = id; t.failedApply = apply; t.retryBundle = bundle || null;
    restoreLook();
    if (!bundle) S.wallError = id;
  }
  function applyWallpaper(t, prepared) {
    var w = WALLS[t.i], c, bundle = prepared || S.previewBundle;
    if (!prepared && (S.wallPending || t.previewDue || S.wallShown !== w.id || S.wallError)) {
      t.applyPending = w.id;
      if (t.previewDue || S.wallPending !== w.id) { cancelWallpaperTimer(t); loadWallpaperPreview(t); }
      return;
    }
    t.applyPending = null;
    if (w.id === S.c.wall) { S.err = null; t.failedId = null; t.failedApply = false; t.retryBundle = null; return; }
    if (!bundle || bundle.key !== bundleKey({ wall: w.id, material: S.c.material })) { t.applyPending = w.id; loadWallpaperPreview(t); return; }
    c = next(S.c.home.slice(), S.c.recent.slice()); c.wall = w.id;
    if (!write(c, 'Wallpaper ' + w.name)) { failWallpaper(t, w.id, true, bundle); return; }
    installBundle(bundle, c); committedBundle = bundle; S.previewBundle = null;
    t.failedId = null; t.failedApply = false; t.retryBundle = null;
  }
  function loadWallpaperPreview(t) {
    var id = WALLS[t.i].id;
    cancelWallpaperTimer(t);
    showWall(id, function (ok) {
      if (top() !== t || WALLS[t.i].id !== id) return;
      if (!ok) failWallpaper(t, id, t.applyPending === id, null);
      else if (t.applyPending === id) applyWallpaper(t);
      render(); syncRotation();
    });
  }
  function previewWallpaper(t, index, apply, immediate) {
    var id, target;
    cancelWallpaperTimer(t); cancelLook();
    t.i = index; t.f.zone = 'photo'; id = WALLS[index].id;
    t.applyPending = apply ? id : null; t.failedId = null; t.failedApply = false; t.retryBundle = null;
    S.err = null; S.wallError = null;
    if (id === S.c.wall && committedBundle) {
      installBundle(committedBundle, S.c, true); S.previewBundle = null;
      if (apply) applyWallpaper(t);
      return;
    }
    if (S.wallShown === id && S.previewBundle && S.previewBundle.key === bundleKey({ wall: id, material: S.c.material })) {
      if (apply) applyWallpaper(t);
      return;
    }
    if (apply || immediate) { loadWallpaperPreview(t); return; }
    target = lookOf(S.c); target.wall = id;
    S.pending = { patch: { wall: id }, target: target, row: 'bg', preview: true, transient: false, deferred: true };
    t.previewDue = id;
    t.previewTimer = setTimeout(function () { if (top() === t && WALLS[t.i].id === id) loadWallpaperPreview(t); }, WALL_DELAY);
  }
  function retryWallpaper(t) {
    var apply = t.failedApply, bundle = t.retryBundle;
    t.f.zone = 'photo';
    if (bundle && apply) applyWallpaper(t, bundle);
    else previewWallpaper(t, t.i, apply, true);
  }
  function closeWallpaper(t) {
    cancelWallpaperTimer(t); t.applyPending = null; S.err = null; pop(); restoreLook();
    if (top().id === 'appearance' && top().group === 'background') detailFocus(top(), { action: 'background.wallpaper' }, 0);
  }
  V.wallpaper = {
    norm: function (t) {
      t.i = clamp(t.i, 0, WALLS.length - 1);
      if (t.f.zone === 'retry' && !t.failedId) t.f.zone = 'photo';
      if (t.i < t.top) t.top = t.i;
      if (t.i >= t.top + WALL_VISIBLE) t.top = t.i - WALL_VISIBLE + 1;
      t.top = clamp(t.top, 0, Math.max(0, WALLS.length - WALL_VISIBLE));
    },
    key: function (t, k) {
      if (k === 'back') { closeWallpaper(t); return; }
      if (t.f.zone === 'back') {
        if (k === 'ok') closeWallpaper(t);
        else if (k === 'down' || k === 'right') t.f.zone = 'photo';
        return;
      }
      if (t.f.zone === 'retry') {
        if (k === 'ok') retryWallpaper(t);
        else if (k === 'up' || k === 'left') t.f.zone = 'photo';
        return;
      }
      if (k === 'left' || k === 'up' && t.i === 0) { t.f.zone = 'back'; t.applyPending = null; }
      else if (k === 'up' && t.i > 0) previewWallpaper(t, t.i - 1, false);
      else if (k === 'down' && t.i < WALLS.length - 1) previewWallpaper(t, t.i + 1, false);
      else if ((k === 'right' || k === 'down') && t.failedId) t.f.zone = 'retry';
      else if (k === 'ok') { if (t.retryBundle) applyWallpaper(t, t.retryBundle); else applyWallpaper(t); }
    },
    point: function (t, z, i) {
      if (z === 'wall-back') closeWallpaper(t);
      else if (z === 'wall-retry') retryWallpaper(t);
      else if (z === 'wall-choice' && i >= 0 && i < WALLS.length) {
        if (i === t.i) { t.f.zone = 'photo'; this.key(t, 'ok'); }
        else previewWallpaper(t, i, true);
      }
    }
  };

  /* ---------- Installed apps ---------- */
  function appsItems() { return catalog.error ? [] : ALPHA; }
  function appsHead() { return catalog.error ? [['retry', 'Try again', '', '']] : [['editor', 'Apps on Home', '', 'home']]; }
  V.apps = {
    sheet: true,
    norm: function (t) {
      var n = appsItems().length;
      t.f.i = clamp(t.f.i, 0, Math.max(0, n - 1));
      if (!n) t.f.zone = 'head';
    },
    key: function (t, k) {
      var f = t.f, items = appsItems(), n = items.length, col = f.i % COLS, row = Math.floor(f.i / COLS);
      if (k === 'back') { pop(); return; }
      if (f.zone === 'head') {
        if (k === 'down' && n) f.zone = 'grid';
        else if (k === 'ok') { if (catalog.error) refreshCatalog(); else openEditor('apps'); }
        return;
      }
      if (k === 'left' && col > 0) f.i--;
      else if (k === 'right' && col < COLS - 1 && f.i < n - 1) f.i++;
      else if (k === 'down' && row < Math.ceil(n / COLS) - 1) f.i = Math.min(f.i + COLS, n - 1);
      else if (k === 'up') { if (row > 0) f.i -= COLS; else f.zone = 'head'; }
      else if (k === 'ok' && n) launch(items[f.i]);
      S.appsFocus = items[f.i] || null;
    },
    point: function (t, z, i) { if (z === 'grid') { t.f.zone = 'grid'; t.f.i = i; } else if (z === 'head') t.f.zone = 'head'; else return; this.key(t, 'ok'); }
  };

  /* ---------- B: two-zone Home editor ---------- */
  function otherGroups() {
    var rec = S.c.recent.filter(function (id) { return !onHome(id) && app(id); });
    var restInputs = INPUT_IDS.filter(function (id) { return !onHome(id) && rec.indexOf(id) < 0; });
    var restApps = ALPHA.filter(function (id) { return !onHome(id) && rec.indexOf(id) < 0 && INPUT_IDS.indexOf(id) < 0; });
    return { recent: rec, rest: restInputs.concat(restApps) };
  }
  function otherList() { var o = otherGroups(); return o.recent.concat(o.rest); }
  function editorCut() { return 99; }
  function editorHomeY(i) { return i * ED_ROW; }
  function editorOtherY(j) {
    var o = otherGroups();
    return j * ED_ROW + (o.recent.length ? ED_SEP : 0) + (o.recent.length && j >= o.recent.length ? ED_SEP : 0);
  }
  function rememberOther(t) {
    var list = otherList();
    t.otherReturn = { id: list[t.f.j] || null, index: t.f.j, top: t.top };
  }
  function returnOther(t) {
    var list = otherList(), memory = t.otherReturn, i = memory ? list.indexOf(memory.id) : -1;
    t.f.zone = 'other';
    t.f.j = i >= 0 ? i : clamp(memory ? memory.index : 0, 0, Math.max(0, list.length - 1));
    if (memory) t.top = memory.top;
  }
  function nearestHome(t, count) {
    var target = editorOtherY(t.f.j) - t.top + 36, hTop = (t.homeTop || 0) * ED_ROW, best = 0, distance = Infinity, i, d;
    for (i = 0; i < count; i++) {
      d = Math.abs(editorHomeY(i) - hTop + 36 - target);
      if (d < distance) { best = i; distance = d; }
    }
    return best;
  }
  V.editor = {
    sheet: true,
    norm: function (t) {
      var f = t.f, nh = (t.lifted ? t.lifted.order : S.c.home).length, no = otherList().length;
      f.i = clamp(f.i, 0, Math.max(0, nh - 1));
      f.j = clamp(f.j, 0, Math.max(0, no - 1));
      if (f.zone === 'home' && !nh) f.zone = no ? 'other' : 'head';
      if (f.zone === 'other' && !no) f.zone = nh ? 'home' : 'head';
    },
    key: function (t, k) {
      var f = t.f, H = t.lifted ? t.lifted.order : S.c.home, O = otherList(), nh = H.length, no = O.length, d, tmp;
      if (t.lifted) {
        d = k === 'up' ? -1 : k === 'down' ? 1 : 0;
        if (d && f.i + d >= 0 && f.i + d < nh) { tmp = H[f.i + d]; H[f.i + d] = H[f.i]; H[f.i] = tmp; f.i += d; S.err = null; }
        else if (k === 'ok') editorPlace(t);
        else if (k === 'back') { f.i = t.lifted.from; t.lifted = null; S.err = null; }
        return;
      }
      if (k === 'back') { closeEditor(t); return; }
      if (f.zone === 'head') {
        if (k === 'left' && f.h > 0) f.h--;
        else if (k === 'right' && f.h < 1) f.h++;
        else if (k === 'down') { if (no) returnOther(t); else if (nh) f.zone = 'home'; }
        else if (k === 'ok') { begin(); if (f.h === 0) undoLast(null); else closeEditor(t); }
      } else if (f.zone === 'home') {
        if (k === 'up') { if (f.i > 0) f.i--; else f.zone = 'head'; }
        else if (k === 'down') { if (f.i < nh - 1) f.i++; }
        else if (k === 'right') { if (f.part === 'name') f.part = 'remove'; else if (no) returnOther(t); }
        else if (k === 'left') { if (f.part === 'remove') f.part = 'name'; }
        else if (k === 'ok') {
          begin();
          if (f.part === 'name') t.lifted = { id: H[f.i], from: f.i, order: H.slice(), snap: snap() };
          else editorRemove(t, H[f.i]);
        }
      } else {
        if (k === 'up') { if (f.j > 0) { f.j--; rememberOther(t); } else f.zone = 'head'; }
        else if (k === 'down') { if (f.j < no - 1) { f.j++; rememberOther(t); } }
        else if (k === 'left') { if (nh) { rememberOther(t); f.i = nearestHome(t, nh); f.zone = 'home'; f.part = 'name'; } }
        else if (k === 'ok') { begin(); editorAdd(t, O[f.j]); }
      }
    },
    point: function (t, z, i) {
      if (t.lifted) { if (z === 'name' && i === t.f.i) this.key(t, 'ok'); return; }
      if (z === 'name' || z === 'remove') { t.f.zone = 'home'; t.f.i = i; t.f.part = z; }
      else if (z === 'other') { t.f.zone = 'other'; t.f.j = i; rememberOther(t); }
      else if (z === 'head') { t.f.zone = 'head'; t.f.h = i; }
      else return;
      this.key(t, 'ok');
    }
  };
  /* Focus follows the app between zones, so a repeated OK toggles the same app. */
  function editorRemove(t, id) {
    if (!homeRemove(id)) return;
    t.f.zone = 'other'; t.f.j = otherList().indexOf(id);
    S.note = app(id).name + ' is in Recently removed. OK puts it back.';
  }
  function editorAdd(t, id) {
    rememberOther(t);
    if (!homeAdd(id)) return;
    var remaining = otherList(), at = clamp(t.otherReturn.index, 0, Math.max(0, remaining.length - 1));
    t.otherReturn.id = remaining[at] || null; t.otherReturn.index = at;
    t.f.zone = 'home'; t.f.i = S.c.home.indexOf(id); t.f.part = 'remove';
    S.note = app(id).name + ' is on Home, position ' + (t.f.i + 1) + '.';
  }
  function editorPlace(t) {
    var L = t.lifted;
    begin();
    if (same(L.order, S.c.home)) { t.lifted = null; return; }
    if (!homeMove(L.order.slice(), L.id, L.snap)) return;
    t.lifted = null;
    S.note = app(L.id).name + ' moved to position ' + (t.f.i + 1) + '.';
  }
  function closeEditor() { clearSession(); pop(); }

  /* ---------- Settings, Layout and messages ---------- */
  function mode() { for (var i = 0; i < MODES.length; i++) if (MODES[i].id === S.c.mode) return MODES[i]; return MODES[0]; }
  function inputsSummary() {
    var on = INPUT_IDS.filter(function (id) { return onHome(id); });
    if (!on.length) return 'None on Home';
    return on.map(function (id) { return app(id).name; }).join(', ');
  }
  function settingsRows() {
    var n = S.c.home.length;
    return [
      { id: 'background', label: 'Background', value: S.c.bg === 'photo' ? wall(S.c.wall).name : VALUE_NAMES[S.c.bg] },
      { id: 'clock', label: 'Clock & Widgets', value: VALUE_NAMES[S.c.clockStyle] + (S.c.widget !== 'none' ? ', ' + VALUE_NAMES[S.c.widget] : '') },
      { id: 'layout', label: 'Layout', value: VALUE_NAMES[S.c.layout] + (S.c.layout === 'dock' ? ' · ' + VALUE_NAMES[S.c.dockStyle] : '') },
      { id: 'typography', label: 'Typography', value: FONTS[S.c.font].name },
      { id: 'focus', label: 'Focus', value: VALUE_NAMES[S.c.focus] + (materialApplies() ? ', ' + VALUE_NAMES[S.c.material] : '') },
      { id: 'inputs', label: 'TV Inputs', value: inputsSummary() },
      { id: 'editor', label: 'Apps on Home', value: n + (n === 1 ? ' app' : ' apps') },
      { id: 'samsung', label: 'Samsung', value: 'Home and TV settings' }
    ];
  }
  function settingsIds() { return settingsRows().map(function (r) { return r.id; }); }
  V.settings = {
    sheet: true,
    norm: function (t) { var ids = settingsIds(); if (ids.indexOf(t.f.id) < 0) t.f.id = ids[0]; },
    key: function (t, k) {
      var ids = settingsIds(), i = Math.max(0, ids.indexOf(t.f.id));
      if (k === 'up' && i > 0) i--;
      else if (k === 'down' && i < ids.length - 1) i++;
      else if (k === 'back') { pop(); return; }
      t.f.id = ids[i]; S.settingsFocus = ids[i];
      if (k === 'ok') settingsOk(ids[i]);
    },
    point: function (t, z, i, id) { if (z === 'row' && id) { t.f.id = id; this.key(t, 'ok'); } }
  };
  function settingsOk(id) {
    if (id === 'editor') openEditor('settings');
    else {
      if (id === 'inputs') refreshSources();
      openAppearance(id);
    }
  }
  var DETAIL_NAMES = { background: 'Background', clock: 'Clock & Widgets', layout: 'Layout', typography: 'Typography', focus: 'Focus', inputs: 'TV Inputs', rotation: 'Rotation', samsung: 'Samsung' };
  var INPUT_PRESETS_1 = [
    { id: 'default', label: 'Default', name: '', icon: '' },
    { id: 'ps5', label: 'PS5', name: 'PS5', icon: 'ps' },
    { id: 'xbox', label: 'Xbox', name: 'Xbox', icon: 'xbox' },
    { id: 'switch', label: 'Switch', name: 'Switch', icon: 'switch' }
  ];
  var INPUT_PRESETS_2 = [
    { id: 'pc', label: 'PC / Mac', name: 'PC', icon: 'pc' },
    { id: 'appletv', label: 'Apple TV', name: 'Apple TV', icon: 'box' },
    { id: 'soundbar', label: 'Soundbar', name: 'Soundbar', icon: 'audio' },
    { id: 'custom', label: 'Custom…', custom: true }
  ];
  function choice(axis, value, disabled) {
    return { action: axis === 'mode' ? 'rotation.' + value : 'choice.' + axis + '.' + value, axis: axis, value: value, disabled: !!disabled,
      label: axis === 'font' ? FONTS[value].name : axis === 'mode' ? MODES.filter(function (m) { return m.id === value; })[0].name : value === 'both' ? 'Both' : VALUE_NAMES[value] };
  }
  function detailSections(t) {
    var flat = S.c.bg !== 'photo', inactive = !materialApplies(), isList = S.c.layout === 'list';
    function options(axis, values, disabled) { return values.map(function (value) { return choice(axis, value, disabled); }); }
    if (t.group === 'background') return [
      { id: 'bg', title: 'Background type', items: options('bg', ['photo', 'light', 'dark']) },
      { id: 'wall', title: 'Wallpaper', items: [{ action: 'background.wallpaper', label: wall(S.c.wall).name, thumbnail: true, disabled: flat }] },
      { id: 'rotation', title: 'Rotation', items: [{ action: 'background.rotation', label: mode().name, disabled: flat }], reason: flat ? 'Choose Photo to use wallpaper and rotation.' : '' }
    ];
    if (t.group === 'clock') return [
      { id: 'clockStyle', title: 'Clock style', horizontal: true, items: options('clockStyle', ['minimal', 'editorial', 'pill', 'split']) },
      { id: 'widget', title: 'Widget', horizontal: true, items: options('widget', ['ambient', 'forecast', 'date', 'none']) },
      { id: 'tempUnit', title: 'Weather unit', horizontal: true, items: options('tempUnit', ['f', 'c'], S.c.widget === 'date' || S.c.widget === 'none') }
    ];
    if (t.group === 'layout') return [
      { id: 'layout', title: 'Layout', horizontal: true, items: options('layout', ['dock', 'list']) },
      { id: 'dockStyle', title: 'Dock style', horizontal: true, items: options('dockStyle', ['categorized', 'grid', 'compact', 'floating'], isList) },
      { id: 'apps', title: 'App display', horizontal: true, items: options('apps', ['both', 'icons', 'text']) },
      { id: 'controls', title: 'Home controls', horizontal: true, items: options('controls', ['both', 'icons', 'text']) }
    ];
    if (t.group === 'typography') return [{ id: 'font', title: '', items: options('font', LOOK_VALUES.font) }];
    if (t.group === 'focus') return [
      { id: 'focus', title: 'Focus style', horizontal: true, items: options('focus', ['type', 'glass']) },
      { id: 'material', title: 'Material', horizontal: true, items: options('material', ['soft', 'frost', 'tint'], inactive),
        reason: inactive ? flat ? 'Materials are available with a Photo background.' : 'Choose Glass focus or the Dock layout to use materials.' : '' }
    ];
    if (t.group === 'inputs') {
      var selId = S.selectedInput || 'hdmi1', def = inputDef(selId) || INPUT_DEFS[0];
      var cfg = S.c.inputs && S.c.inputs[selId] ? S.c.inputs[selId] : { name: '', icon: '', show: def.defaultShow };
      var rt = sourceRuntime[selId] || { connected: false, signal: false, detectedName: '', detectedIcon: '' };
      var effName = cfg.name || rt.detectedName || def.defaultName;
      var effIcon = cfg.icon || rt.detectedIcon || def.defaultIcon;
      var statusText = def.portLabel + ' · ' + (rt.signal ? 'Active signal' : rt.connected ? 'Connected' : 'No signal detected') + (rt.detectedName ? ' (' + rt.detectedName + ')' : '');
      function mapPreset(p) {
        var isApplied = p.custom ? (cfg.name && !INPUT_PRESETS_1.concat(INPUT_PRESETS_2).some(function (x) { return !x.custom && x.name === cfg.name; })) : (p.id === 'default' ? !cfg.name : cfg.name === p.name);
        return { action: 'input.preset.' + p.id, label: p.custom && isApplied ? cfg.name : p.label, checked: !!isApplied };
      }
      return [
        { id: 'inputPort', title: 'Input source', horizontal: true, items: INPUT_DEFS.map(function (d) {
          var r = sourceRuntime[d.id] || {};
          return { action: 'input.port.' + d.id, label: d.defaultName + (r.connected ? ' •' : ''), checked: d.id === selId };
        }) },
        { id: 'inputShow', title: statusText, horizontal: true, items: [
          { action: 'input.switch.' + selId, label: 'Switch Now' },
          { action: 'input.show.on', label: 'On Home', checked: onHome(selId) && cfg.show !== 'auto' },
          { action: 'input.show.auto', label: 'Auto-Detect', checked: cfg.show === 'auto' },
          { action: 'input.show.off', label: 'Hidden', checked: !onHome(selId) && cfg.show === 'off' }
        ] },
        { id: 'inputPreset1', title: 'Label & device preset (' + effName + ')', horizontal: true, items: INPUT_PRESETS_1.map(mapPreset) },
        { id: 'inputPreset2', title: '', horizontal: true, items: INPUT_PRESETS_2.map(mapPreset) },
        { id: 'inputIcon1', title: 'Icon', horizontal: true, items: INPUT_ICONS.slice(0, 5).map(function (ic) {
          return { action: 'input.icon.' + ic.id, label: ic.label, svgIcon: ic.svg, checked: effIcon === ic.id };
        }) },
        { id: 'inputIcon2', title: '', horizontal: true, items: INPUT_ICONS.slice(5, 10).map(function (ic) {
          return { action: 'input.icon.' + ic.id, label: ic.label, svgIcon: ic.svg, checked: effIcon === ic.id };
        }) }
      ];
    }
    if (t.group === 'rotation') return [{ id: 'mode', title: '', items: options('mode', MODES.map(function (m) { return m.id; }), flat),
      reason: flat ? 'Choose Photo in Background to use rotation.' : 'Timed changes pause while Settings or another panel is open.' }];
    return [{ id: 'samsung', title: '', items: [
      { action: 'samsung.art', label: 'Art Mode', description: 'Switch to Samsung Art Mode' },
      { action: 'samsung.home', label: 'Samsung Home', description: 'Open Samsung’s Home screen' },
      { action: 'samsung.settings', label: 'TV settings', description: 'Picture, sound and network settings' }
    ] }];
  }
  function detailRows(t) {
    var rows = [[{ action: 'settings.back', label: t.group === 'rotation' ? 'Background' : 'Settings' }]];
    detailSections(t).forEach(function (section) {
      var enabled = section.items.filter(function (item) { return !item.disabled; });
      if (section.horizontal && enabled.length) rows.push(enabled);
      else enabled.forEach(function (item) { rows.push([item]); });
    });
    if (S.lookError) rows.push([{ action: 'settings.retry', label: 'Try again' }]);
    return rows;
  }
  function detailLocation(t) {
    var rows = detailRows(t), row = 0, column = 0;
    rows.forEach(function (items, r) { items.forEach(function (item, c) { if (item.action === t.f.action) { row = r; column = c; } }); });
    return { rows: rows, row: row, column: column, item: rows[row][column] };
  }
  function detailFocus(t, item, column) {
    t.f.action = item.action;
    if (item.action !== 'settings.back') S.detailFocus[t.group] = item.action;
    if (column !== undefined) t.f.column = column;
    if (item.axis) S.appearanceFocus = item.axis;
  }
  function applyRotation(value) {
    var c;
    if (S.c.bg !== 'photo') return;
    S.err = null; S.lookError = null;
    if (value === S.c.mode) return;
    c = next(S.c.home.slice(), S.c.recent.slice()); c.mode = value;
    if (!write(c, 'Wallpaper rotation')) S.lookError = { type: 'save', patch: { mode: value }, row: 'mode', transient: false };
  }
  function applyInputChange(mutator, label) {
    var selId = S.selectedInput || 'hdmi1', def = inputDef(selId) || INPUT_DEFS[0];
    var h = S.c.home.slice(), rec = S.c.recent.slice();
    var c = next(h, rec);
    var cfg = c.inputs[selId] || { name: '', icon: '', show: def.defaultShow };
    c.inputs[selId] = cfg;
    mutator(cfg, c, selId, def);
    write(c, label || 'TV Inputs');
    ensureSel();
  }
  function detailBack() { restoreLook(); S.err = null; pop(); }
  function detailOk(t, item) {
    var patch = {}, error = S.lookError;
    if (item.action === 'settings.back') { detailBack(); return; }
    if (item.disabled || S.pending) return;
    if (item.action === 'settings.retry') {
      if (error && error.patch[error.row] !== undefined) detailFocus(t, choice(error.row, error.patch[error.row]), 0);
      if (error && error.row === 'mode') applyRotation(error.patch.mode);
      else if (error) setLook(error.patch, { row: error.row });
    } else if (item.axis === 'mode') applyRotation(item.value);
    else if (item.axis) { patch[item.axis] = item.value; setLook(patch, { row: item.axis }); }
    else if (item.action.indexOf('input.port.') === 0) {
      S.selectedInput = item.action.slice('input.port.'.length);
      refreshSources();
    } else if (item.action.indexOf('input.switch.') === 0) {
      launch(item.action.slice('input.switch.'.length));
    } else if (item.action.indexOf('input.show.') === 0) {
      var modeVal = item.action.slice('input.show.'.length);
      applyInputChange(function (cfg, c, selId) {
        cfg.show = modeVal;
        if (modeVal === 'on' && c.home.indexOf(selId) < 0 && c.home.length < CAP) {
          c.home.push(selId);
          c.recent = without(c.recent, selId);
        } else if (modeVal === 'off' && c.home.indexOf(selId) >= 0 && c.home.length > 1) {
          c.home = without(c.home, selId);
        } else if (modeVal === 'auto') {
          var rt = sourceRuntime[selId];
          if (rt && rt.connected && c.home.indexOf(selId) < 0 && c.home.length < CAP) c.home.push(selId);
        }
      }, 'Input visibility');
    } else if (item.action.indexOf('input.preset.') === 0) {
      var pid = item.action.slice('input.preset.'.length);
      var preset = INPUT_PRESETS_1.concat(INPUT_PRESETS_2).filter(function (p) { return p.id === pid; })[0];
      if (!preset) return;
      if (preset.custom) {
        var selId = S.selectedInput || 'hdmi1', curApp = app(selId);
        var entered = window.prompt ? window.prompt('Enter a custom name for ' + (curApp ? curApp.portLabel : 'input') + ':', curApp ? curApp.name : '') : null;
        if (entered !== null) {
          var cleanName = String(entered).trim().slice(0, 40);
          applyInputChange(function (cfg, c, id) {
            cfg.name = cleanName;
            if (cleanName && c.home.indexOf(id) < 0 && c.home.length < CAP) { cfg.show = 'on'; c.home.push(id); }
          }, 'Rename input');
        }
      } else {
        applyInputChange(function (cfg, c, id) {
          cfg.name = preset.name;
          cfg.icon = preset.icon;
          if (preset.id !== 'default' && c.home.indexOf(id) < 0 && c.home.length < CAP) {
            cfg.show = 'on';
            c.home.push(id);
          }
        }, 'Input preset ' + preset.label);
      }
    } else if (item.action.indexOf('input.icon.') === 0) {
      var icId = item.action.slice('input.icon.'.length);
      applyInputChange(function (cfg) { cfg.icon = icId; }, 'Input icon');
    } else if (item.action === 'background.wallpaper') openWallpaper();
    else if (item.action === 'background.rotation') openAppearance('rotation');
    else if (item.action === 'samsung.art') perform('Art Mode', FrameDevice.art);
    else if (item.action === 'samsung.home') perform('Samsung Home', FrameDevice.home);
    else if (item.action === 'samsung.settings') perform('TV settings', FrameDevice.settings);
  }
  V.appearance = {
    norm: function (t) {
      var rows = detailRows(t), exists = false, applied = null;
      var axis = { background: 'bg', clock: 'clockStyle', layout: 'layout', typography: 'font', focus: 'focus', rotation: 'mode' }[t.group];
      rows.forEach(function (items) { items.forEach(function (item) {
        if (item.action === t.f.action) exists = true;
        if (item.axis === axis && item.value === S.c[axis]) applied = item;
        if (!applied && t.group === 'inputs' && item.action === 'input.port.' + (S.selectedInput || 'hdmi1')) applied = item;
      }); });
      if (!exists) detailFocus(t, applied || (rows[1] || rows[0])[0], 0);
      if (t.f.column === undefined) t.f.column = detailLocation(t).column;
    },
    key: function (t, k) {
      var at = detailLocation(t), row = at.row, column = at.column;
      if (k === 'back') { detailBack(); return; }
      if (k === 'ok') { detailOk(t, at.item); return; }
      if (k === 'up' || k === 'down') {
        row = clamp(row + (k === 'up' ? -1 : 1), 0, at.rows.length - 1);
        column = Math.min(t.f.column || 0, at.rows[row].length - 1);
        detailFocus(t, at.rows[row][column]);
      } else if (k === 'left' || k === 'right') {
        column = clamp(column + (k === 'left' ? -1 : 1), 0, at.rows[row].length - 1);
        detailFocus(t, at.rows[row][column], column);
      }
    },
    point: function (t, z, i, action) {
      if (z !== 'detail') return;
      detailRows(t).some(function (items) { return items.some(function (item, column) {
        if (item.action !== action) return false;
        detailFocus(t, item, column); detailOk(t, item); return true;
      }); });
    }
  };
  function messageContent(t) { return t.content || MSG[t.msg]; }
  V.message = {
    sheet: true,
    key: function (t, k) {
      var A = messageContent(t).actions, a;
      if (k === 'left') t.f.b = Math.max(0, t.f.b - 1);
      else if (k === 'right') t.f.b = Math.min(A.length - 1, t.f.b + 1);
      else if (k === 'back') pop();
      else if (k === 'ok') { a = A[t.f.b][0]; pop(); if (a === 'samsung') perform('Samsung Home', FrameDevice.home); }
    },
    point: function (t, z, i) { if (z === 'act') { t.f.b = i; this.key(t, 'ok'); } }
  };

  /* ---------- Dispatch ---------- */
  function norm() { var t = top(), v = V[t.id]; if (v.norm) v.norm(t); }
  function press(k) {
    norm();
    var t = top();
    V[t.id].key(t, k);
    norm();
    render();
    syncRotation();
  }

  /* ---------- Rendering ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var stage = $('stage'), homeEl = $('home'), caption = $('caption'), utilsEl = $('utils');
  var utilFocusLabel = $('utilFocusLabel'), utilFocusKey = '', appFocusName = $('appFocusName');
  var dock = $('dock'), shelf = $('shelf'), track = $('track'), plate = $('plate'), matScrim = $('matScrim'), dockEmpty = $('dockEmpty');
  var cueL = $('cueL'), cueR = $('cueR'), dockAction = $('dockAction');
  var focusStatus = $('focusStatus'), sceneEl = $('scene'), appearanceEl = $('appearance'), appearanceRows = $('appearanceRows'), appearanceDesc = $('appearanceDesc');
  var appearanceBack = $('appearanceBack'), appearanceTitle = $('appearanceTitle'), appearanceStatus = $('appearanceStatus');
  var phScene = $('phScene'), phPlate = $('phPlate'), phField = $('phField'), phList = $('phList'), phRows = $('phRows'), phAction = $('phAction'), phEmpty = $('phEmpty');
  var phPlates = [phPlate, $('phPlateAlt')], phFields = [phField, $('phFieldAlt')], photoPlateIndex = 0, photoPlateKey = null;
  var utPlates = [$('utLens'), $('utLensAlt')], utFields = [$('utField'), $('utFieldAlt')], utPlateIndex = 0, utPlateKey = null;
  var photoMode = null, photoTransitionToken = 0;
  var sheetEl = $('sheet'), sheetView = $('sheetView');
  var IMG = { photo: $('photo'), mat: $('matImg'), bg: $('sheetBg'), field: $('phFieldImg'), fieldAlt: $('phFieldImgAlt'), utility: $('utFieldImg'), utilityAlt: $('utFieldImgAlt') };
  var sheetKey = '', slotEls = {}, dockEdgeFrame = 0, dockEdgeUntil = 0, dockAnchorCenter = 960;
  var appliedPalette = null, appliedPhoto = null, appliedFont = null, appliedFontMetrics = null;

  /* Curated locked palettes keep the existing rendering path exactly. */
  function applyAdaptiveInk(palette) {
    var active = S.c.bg === 'photo' && palette && !palette.locked && palette.light && palette.tl && palette.tr && palette.br;
    if (appliedPalette === palette && appliedPhoto === (S.c.bg === 'photo')) return !!active;
    appliedPalette = palette; appliedPhoto = S.c.bg === 'photo';
    ['tl', 'tr', 'br'].forEach(function (zone) {
      var r = active ? palette[zone] : null;
      var values = r ? { ink: r.ink, 'clock-ink': r.clockInk || r.ink, 'rest-ink': r.restInk, 'peer-ink': r.peerInk, rest: r.restAlpha, peer: r.peerAlpha, under: r.halo, shadow: r.shadow } : {};
      ['ink', 'clock-ink', 'rest-ink', 'peer-ink', 'rest', 'peer', 'under', 'shadow'].forEach(function (key) {
        var name = '--' + zone + '-' + key, value = values[key];
        if (value !== undefined && value !== null) stage.style.setProperty(name, String(value));
        else stage.style.removeProperty(name);
      });
    });
    if (active && palette.light) stage.style.setProperty('--home-app-ink', palette.light);
    else stage.style.removeProperty('--home-app-ink');
    return !!active;
  }
  function inkRungClasses(palette, active) {
    if (!active) return '';
    return ['tl', 'tr', 'br'].map(function (zone) {
      var rung = palette[zone].rung;
      return ['light', 'mist', 'mist-high', 'dark', 'dark-halo'].indexOf(rung) >= 0 ? ' ink-' + zone + '-' + rung : '';
    }).join('');
  }
  function render() {
    var t = top(), sheet = !!V[t.id].sheet, shown = wall(S.shown ? S.shown.wall : S.c.wall), palette = ADAPTIVE_INK[shown.id];
    var adaptive = applyAdaptiveInk(palette), tr = adaptive && palette.tr ? palette.tr.pol : shown.ut.tr, br = adaptive && palette.br ? palette.br.pol : shown.ut.br;
    stage.className = 'stage bg-' + S.c.bg + ' l-' + S.c.layout + ' v-' + S.variant + ' m-' + (materialApplies() ? S.c.material : 'none') + ' f-' + S.c.focus + ' a-' + S.c.apps + ' u-' + S.c.controls + ' g-' + S.geom + ' tone-' + shown.tone + ' tr-' + tr + ' br-' + br + wallClasses(shown) + inkRungClasses(palette, adaptive) + ' at-' + t.id + ' font-' + homeFont() + (homeFont() !== 'manrope' ? ' font-custom' : '') + (S.fontSwitch ? ' is-font-switch' : '') + (adaptive ? ' has-adaptive-ink adaptive-tl-' + palette.tl.pol : '') + (!adaptive && shown.clockInk ? ' has-clock-ink' : '') + (!adaptive && shown.dockClockInk ? ' has-dock-clock-ink' : '') + (registeredMaterial(shown.id) ? ' registered-material' : '') + (sheet ? ' is-sheet' : '') + (S.reflow ? ' is-reflow' : '');
    if (!adaptive && shown.clockInk) stage.style.setProperty('--clock-ink', shown.clockInk);
    else stage.style.removeProperty('--clock-ink');
    if (!adaptive && shown.dockClockInk) stage.style.setProperty('--dock-clock-ink', shown.dockClockInk);
    else stage.style.removeProperty('--dock-clock-ink');
    try { applyHomeFont(); } catch (e) { if (window.console && console.error) console.error(e); }
    try { if (!sheet) renderHome(t); } catch (e) { if (window.console && console.error) console.error(e); }
    try { renderSheet(t, sheet); } catch (e) { if (window.console && console.error) console.error(e); }
    try { renderAppearance(t); } catch (e) { if (window.console && console.error) console.error(e); }
    try { renderFocusStatus(t); } catch (e) { if (window.console && console.error) console.error(e); }
  }

  function applyHomeFont() {
    var id = homeFont(), f = FONTS[id] || FONTS.manrope, primary = fontRole(id, 'primary'), ui = fontRole(id, 'ui'), metrics = fontMetrics[id];
    if (appliedFont === id && appliedFontMetrics === metrics) return;
    appliedFont = id; appliedFontMetrics = metrics;
    var values = { 'display-family': '"' + f.family + '"', 'ui-family': '"' + ui.family + '"', 'primary-family': '"' + primary.family + '"', 'display-weight': f.display, 'ui-weight': ui.weight, 'primary-weight': primary.weight, 'clock-weight': f.clock,
      'clock-shift': px(fontShift('clock', 48)), 'utility-shift': px(fontShift('ui', 28)), 'action-shift': px(fontShift('ui', 30)), 'heading-shift': px(fontShift('ui', 48)), 'full-name-shift': px(fontShift('primary', 30)), 'clock-digit': px(metrics ? metrics.digitCell : 0) };
    Object.keys(values).forEach(function (key) { homeEl.style.setProperty('--font-' + key, String(values[key])); });
  }

  function homeState(t) {
    var lifted = t.id === 'home' && t.lifted ? t.lifted : null;
    var h = lifted ? lifted.order : S.c.home;
    var selIdx = lifted ? Math.max(0, h.indexOf(lifted.id)) : Math.max(0, ensureSel());
    var hs = { mode: 'browse', zone: null, i: selIdx, u: -1, lifted: !!lifted, rowMap: lifted ? lifted.rowMap : S.c.rowMap, from: -1, arr: null, items: h.map(function (id) { return { key: id, kind: 'app', id: id }; }) };
    if (isSettingsDetail(t)) hs.zone = 'preview';
    else if (t.id === 'home') { hs.zone = t.f.zone; hs.u = t.f.u; }
    return hs;
  }

  function renderHome(t) {
    var hs = homeState(t);
    renderCaption(t, hs);
    renderUtils(hs);
    if (S.c.layout === 'list') renderList(hs);
    else { photoMode = null; renderDock(hs); }
    renderAppFocusName(hs);
  }

  var WEATHER_KEY = 'cleanframe.weather.v1', weatherTimer = 0;
  var weatherState = { lat: 40.7062, lon: -73.6187, tempF: 46, highF: 60, lowF: 39, code: 0, isDay: 0, ts: 0 };
  (function () {
    try {
      var raw = localStorage.getItem(WEATHER_KEY), parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed.tempF === 'number') weatherState = parsed;
    } catch (e) {}
  })();
  function xhrJson(url, cb) {
    try {
      var req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.timeout = 6000;
      req.onload = function () {
        if (req.status >= 200 && req.status < 300) {
          try { cb(JSON.parse(req.responseText)); } catch (e) { cb(null); }
        } else cb(null);
      };
      req.onerror = req.ontimeout = function () { cb(null); };
      req.send();
    } catch (e) { cb(null); }
  }
  function fetchWeather() {
    clearTimeout(weatherTimer);
    weatherTimer = setTimeout(fetchWeather, 20 * 60000);
    function loadMeteo(lat, lon) {
      var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto';
      xhrJson(url, function (data) {
        if (!data || !data.current) return;
        weatherState.lat = lat; weatherState.lon = lon;
        weatherState.tempF = data.current.temperature_2m;
        weatherState.code = data.current.weather_code || 0;
        weatherState.isDay = data.current.is_day ? 1 : 0;
        if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_max.length) {
          weatherState.highF = data.daily.temperature_2m_max[0];
          weatherState.lowF = data.daily.temperature_2m_min[0];
        }
        weatherState.ts = Date.now();
        try { localStorage.setItem(WEATHER_KEY, JSON.stringify(weatherState)); } catch (e) {}
        if (!document.hidden && (top().id === 'home' || isSettingsDetail(top()))) renderCaption(top(), homeState(top()));
      });
    }
    if (!weatherState.ts || Date.now() - weatherState.ts > 6 * 3600000) {
      xhrJson('https://ipwho.is/', function (geo) {
        if (geo && typeof geo.latitude === 'number' && typeof geo.longitude === 'number') loadMeteo(geo.latitude, geo.longitude);
        else loadMeteo(weatherState.lat, weatherState.lon);
      });
    } else {
      loadMeteo(weatherState.lat, weatherState.lon);
    }
  }
  function weatherInfo(code, isDay) {
    if (code === 0) return { icon: isDay ? 'wSun' : 'wMoon', label: 'Clear' };
    if (code === 1 || code === 2) return { icon: isDay ? 'wCloudSun' : 'wCloud', label: 'Partly cloudy' };
    if (code === 3) return { icon: 'wCloud', label: 'Cloudy' };
    if (code === 45 || code === 48) return { icon: 'wCloud', label: 'Foggy' };
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { icon: 'wRain', label: 'Rain' };
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { icon: 'wSnow', label: 'Snow' };
    if (code >= 95) return { icon: 'wStorm', label: 'Storm' };
    return { icon: isDay ? 'wSun' : 'wMoon', label: 'Clear' };
  }
  function fmtTemp(f) {
    var val = S.c && S.c.tempUnit === 'c' ? (f - 32) * 5 / 9 : f;
    return Math.round(val) + '\u00b0';
  }
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function clockText() {
    var d = new Date(), h = d.getHours() % 12 || 12, m = d.getMinutes();
    return h + ':' + (m < 10 ? '0' : '') + m;
  }
  function clockHtml() {
    var text = clockText(), metrics = fontMetrics[homeFont()];
    if (!metrics || !metrics.digitCell) return text;
    return text.replace(/[0-9]/g, function (digit) { return '<span class="clock-digit">' + digit + '</span>'; });
  }
  function widgetHtml(d) {
    var wg = S.c && S.c.widget || 'ambient', wx = weatherInfo(weatherState.code, weatherState.isDay);
    if (wg === 'none') return '';
    if (wg === 'date') return '<span class="cw-widget"><span class="cw-date">' + esc(DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate()) + '</span></span>';
    if (wg === 'forecast') return '<span class="cw-widget"><span class="cw-wx">' + icon(wx.icon, 'cw-ico') + '<span class="cw-temp">' + fmtTemp(weatherState.tempF) + '</span><span class="cw-cond">' + esc(wx.label) + '</span></span><span class="cw-dot">\u00b7</span><span class="cw-hl">H:' + fmtTemp(weatherState.highF) + ' L:' + fmtTemp(weatherState.lowF) + '</span></span>';
    return '<span class="cw-widget"><span class="cw-date">' + esc(SHORT_DAYS[d.getDay()] + ', ' + SHORT_MONTHS[d.getMonth()] + ' ' + d.getDate()) + '</span><span class="cw-dot">\u00b7</span><span class="cw-wx">' + icon(wx.icon, 'cw-ico') + '<span class="cw-temp">' + fmtTemp(weatherState.tempF) + '</span><span class="cw-cond">' + esc(wx.label) + '</span></span></span>';
  }
  function renderCaption(t, hs) {
    var d = new Date(), cs = S.c && S.c.clockStyle || 'minimal', wg = S.c && S.c.widget || 'ambient';
    var wHtml = widgetHtml(d), html = '';
    caption.className = 'caption cs-' + cs + ' wg-' + wg;
    if (cs === 'pill') {
      html += '<div class="cw-block cw-pill"><span class="clock">' + clockHtml() + '</span>' + (wHtml ? '<span class="cw-sep"></span>' + wHtml : '') + '</div>';
    } else if (cs === 'split') {
      var h = d.getHours() % 12 || 12, m = d.getMinutes(), ampm = d.getHours() >= 12 ? 'PM' : 'AM';
      var minStr = (m < 10 ? '0' : '') + m;
      html += '<div class="cw-block cw-split"><span class="clock"><span class="cs-hr">' + h + '</span><span class="cs-bar"></span><span class="cs-min">' + minStr + '</span></span><div class="cs-meta"><span class="cs-ampm">' + ampm + (wg === 'forecast' || wg === 'none' ? ' \u00b7 ' + SHORT_DAYS[d.getDay()].toUpperCase() + ', ' + SHORT_MONTHS[d.getMonth()].toUpperCase() + ' ' + d.getDate() : '') + '</span>' + wHtml + '</div></div>';
    } else {
      html += '<div class="cw-block"><span class="clock">' + clockHtml() + '</span>' + wHtml + '</div>';
    }
    if (hs.lifted && hs.items[hs.i]) html += '<span class="cap-line">Moving ' + esc(app(hs.items[hs.i].id).name) + ' \u00b7 Arrows move, OK places, Back cancels</span>';
    else if (S.c.apps !== 'icons' && hs.items[hs.i] && (S.c.layout === 'list' ? photoLabel(hs.items[hs.i].id, false).size < 88 || photoLabel(hs.items[hs.i].id, false).ellipsis : hs.zone === 'apps' && reducedDockLabel(hs.items[hs.i].id))) html += '<span class="cap-line full-name">' + esc(app(hs.items[hs.i].id).name) + '</span>';
    setHTML(caption, html);
  }

  function utilBtn(z, i, action, inner, extra, name) {
    return '<button type="button" tabindex="-1" class="u' + (extra || '') + '" data-z="' + z + '" data-i="' + i + '" data-action="' + action + '" aria-label="' + esc(name) + '"><span class="u-content">' + inner + '</span></button>';
  }
  function renderUtils(hs) {
    var html = '', style = hs.mode === 'arrange' && S.c.controls !== 'text' ? 'both' : S.c.controls;
    var iconsOnly = style === 'icons', U = utils(), focused = null;
    utilsEl.className = 'utils quiet-utils is-' + style + (hs.zone === 'util' || hs.zone === 'ctl' ? ' is-awake' : '');
    U.forEach(function (u, i) { html += utilBtn('util', i, 'util.' + u, icon(UTIL[u][1], '', true) + '<span class="u-label">' + UTIL[u][0] + '</span>', '', UTIL[u][0]); });
    setHTML(utilsEl, html);
    Array.prototype.forEach.call(utilsEl.querySelectorAll('.u'), function (b) {
      var z = b.getAttribute('data-z'), focus = hs.zone === z && hs.u === Number(b.getAttribute('data-i'));
      b.className = b.className.replace(/\s+is-focus/g, '') + (focus ? ' is-focus' : '');
      if (focus) focused = b;
    });
    renderUtilFocusLabel(iconsOnly ? focused : null);
    renderUtilityLens(focused, iconsOnly);
  }
  function renderUtilFocusLabel(button) {
    var text, key, r, sr, scale, width, x;
    if (!button) { utilFocusLabel.className = 'util-focus-label'; utilFocusKey = ''; return; }
    text = S.err ? 'Not saved. OK tries again.' : button.getAttribute('aria-label');
    key = button.getAttribute('data-action') + '|' + text + '|' + homeFont();
    if (key !== utilFocusKey) {
      utilFocusLabel.className = 'util-focus-label'; utilFocusLabel.textContent = text;
      utilFocusLabel.offsetWidth;
      utilFocusKey = key;
    }
    r = button.getBoundingClientRect(); sr = sceneEl.getBoundingClientRect(); scale = sr.width / 1920 || 1;
    width = Math.ceil(textWidth(text, 28, 500, -.2) + 8); x = (r.left + r.width / 2 - sr.left) / scale - width / 2;
    if (S.c.layout === 'list') x = 1730 - width;
    utilFocusLabel.style.width = width + 'px'; utilFocusLabel.style.left = clamp(x, 112, 1808 - width) + 'px';
    utilFocusLabel.style.top = ((S.c.layout === 'list' ? (r.top + r.height / 2 - sr.top) / scale - 19 : 140) + fontShift('ui', 28)) + 'px';
    utilFocusLabel.className = 'util-focus-label is-on';
  }
  function renderUtilityLens(button, iconsOnly) {
    var r, label, sr, scale, x, y, width, key, el;
    if (!button) {
      utPlates.forEach(function (plateEl) { plateEl.className = 'ph-plate ut-lens is-outgoing'; });
      utPlateKey = null;
      return;
    }
    r = button.getBoundingClientRect(); sr = sceneEl.getBoundingClientRect(); scale = sr.width / 1920 || 1;
    y = (r.top - sr.top) / scale + 2;
    if (S.c.layout === 'list') {
      label = iconsOnly ? utilFocusLabel : button.querySelector('.u-label');
      x = (label.getBoundingClientRect().left - sr.left) / scale - 24;
      width = 1800 - x;
    } else {
      // Dock icons keep a fixed lens; the separate caption cannot overlap its neighbours.
      x = (r.left - sr.left) / scale - (iconsOnly ? 0 : 6); width = r.width / scale + (iconsOnly ? 0 : 12);
    }
    key = button.getAttribute('data-action') + '|' + x + '|' + y + '|' + width;
    if (key !== utPlateKey) {
      utPlates[utPlateIndex].className = 'ph-plate ut-lens is-outgoing';
      utPlateIndex = 1 - utPlateIndex; el = utPlates[utPlateIndex];
      el.className = 'ph-plate ut-lens is-preparing';
      el.style.width = width + 'px'; el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      fieldTransform(utFields[utPlateIndex], x, y, width, 60);
      el.offsetWidth;
      utPlateKey = key;
    }
    fieldTransform(utFields[utPlateIndex], x, y, width, 60);
    utPlates[utPlateIndex].className = 'ph-plate ut-lens is-current on-focus';
  }
  function renderAppFocusName(hs) {
    var it = hs.items[hs.i], width, x, y, placement;
    if (S.c.apps !== 'icons' || hs.mode !== 'browse' || hs.zone !== 'apps' || !it) { appFocusName.className = 'app-focus-name'; return; }
    appFocusName.textContent = app(it.id).name;
    width = Math.min(S.c.layout === 'list' ? 1056 : 1640, Math.ceil(textWidth(app(it.id).name, S.c.layout === 'list' ? 40 : 36, 500, -.6, 'primary') + 8));
    appFocusName.style.width = width + 'px';
    if (S.c.layout === 'list') {
      x = 280; placement = phFields[photoPlateIndex]._placement;
      y = placement.y + placement.height / 2 - 24;
    } else {
      x = clamp(dockAnchorCenter - width / 2, 140, 1780 - width); y = 932;
    }
    appFocusName.style.left = x + 'px'; appFocusName.style.top = (y + fontShift('primary', S.c.layout === 'list' ? 40 : 36)) + 'px';
    appFocusName.className = 'app-focus-name is-on';
  }

  function dockGeom(rows) {
    var ds = S.c && S.c.dockStyle || 'categorized', isCompact = ds === 'compact';
    var m = isCompact ? (S.c.apps === 'text' ? { tw: 154, th: 88, pitch: 160 } : S.c.apps === 'icons' ? { tw: 144, th: 114, pitch: 150 } : { tw: 154, th: 124, pitch: 160 }) : DOCK_MODES[S.c.apps];
    var empty = !rows || !rows.length;
    var rowCount = empty ? 1 : rows.length, rowGap = 12, rowPitch = m.th + rowGap;
    var showLabels = ds === 'categorized' || ds === 'compact';
    var labelColW = showLabels ? (isCompact ? 168 : 196) : 0, maxCols = 0, rMax = rowMax();
    if (!empty) rows.forEach(function (r) { if (r.items.length > maxCols) maxCols = r.items.length; });
    maxCols = Math.max(4, Math.min(rMax, maxCols || rMax));
    var shelfW = empty ? 880 : labelColW + maxCols * m.pitch - 6, w = shelfW + 32;
    var shelfH = empty ? m.th : rowCount * m.th + (rowCount - 1) * rowGap, h = shelfH + 32;
    var y = clamp(1004 - h, 420, 924 - h);
    return { x: Math.round((1920 - w) / 2), y: y, h: h, w: w, shelf: shelfW, shelfH: shelfH, labelColW: labelColW, showLabels: showLabels, rowPitch: rowPitch, vis: maxCols, broad: false, empty: empty, tw: m.tw, th: m.th, pitch: m.pitch };
  }
  function dockOffset() { return 0; }
  function dockTileHtml(it, full) {
    var a, body, isCompact = S.c && S.c.dockStyle === 'compact', lSize;
    if (it.kind === 'add') return '<span class="add">' + icon('plus') + '</span><span class="label">' + (full ? 'Home is full' : 'Add app') + '</span>';
    a = app(it.id);
    lSize = isCompact ? Math.min(22, dockLabelSize(a.id)) : dockLabelSize(a.id);
    body = S.c.apps === 'text' ? '' : appMark(a, S.c.apps === 'icons' ? (isCompact ? 96 : 116) : (isCompact ? 80 : 96), S.c.apps === 'icons' ? (isCompact ? 60 : 72) : (isCompact ? 48 : 56), S.c.apps === 'icons' ? (isCompact ? 48 : 58) : (isCompact ? 38 : 46));
    return body + (S.c.apps === 'icons' ? '' : '<span class="label" style="font-size:' + lSize + 'px;top:' + ((S.c.apps === 'text' ? (isCompact ? 24 : 28) : (isCompact ? 78 : 92)) + fontShift('primary', lSize)) + 'px"><span class="label-ink">' + esc(a.name) + '</span></span>') + '<span class="nudge nudge-l">' + icon('left') + '</span><span class="nudge nudge-r">' + icon('right') + '</span>';
  }
  function syncDockEdges() {}
  function trackDockEdges() { dockEdgeFrame = 0; }

  function renderDock(hs) {
    var items = hs.items, n = items.length, empty = hs.mode !== 'arrange' && !n;
    var rows = empty ? [] : homeRows(items, hs.rowMap, hs.lifted), g = dockGeom(rows);
    var anchor = clamp(hs.i, 0, Math.max(0, n - 1)), full = false, ns = n;
    var tileFocus = hs.zone === 'apps' || hs.zone === 'tiles', tileSel = hs.zone === 'act' || hs.zone === 'ctl' || hs.zone === 'preview';
    var focusItem = items[anchor], activeRow = 0, activeCol = 0, activeCat = 0, renderItems = [], s, ax, label, width;

    rows.forEach(function (row, r) {
      row.items.forEach(function (entry, c) {
        if (entry.idx === anchor) { activeRow = r; activeCol = c; activeCat = row.cat; }
      });
    });
    rows.forEach(function (row, r) {
      if (row.showTitle && g.showLabels) {
        renderItems.push({ key: 'cat-' + row.cat, isCat: true, title: row.title, row: r, span: row.catSpan || 1, active: (tileFocus || tileSel) && row.cat === activeCat });
      }
      row.items.forEach(function (entry) { renderItems.push(entry); });
    });

    var activeRowLen = rows[activeRow] ? rows[activeRow].items.length : g.vis;
    var activeRowOff = !g.showLabels ? Math.round((g.vis - activeRowLen) * g.pitch / 2) : 0;

    dock.className = 'dock ds-' + (S.c.dockStyle || 'categorized') + (empty ? ' is-empty' : '');
    dock.style.left = g.x + 'px'; dock.style.top = g.y + 'px'; dock.style.width = g.w + 'px'; dock.style.height = g.h + 'px';
    dock.style.setProperty('--tile-w', g.tw + 'px'); dock.style.setProperty('--tile-h', g.th + 'px'); dock.style.setProperty('--dock-h', g.h + 'px');
    dock.style.setProperty('--nudge-top', ((g.th - 48) / 2) + 'px');
    dockAnchorCenter = g.x + 16 + g.labelColW + activeRowOff + activeCol * g.pitch + g.tw / 2;
    IMG.mat.style.left = (-g.x) + 'px'; IMG.mat.style.top = (-g.y) + 'px';
    IMG.mat.style.transformOrigin = '960px ' + (g.y + g.h / 2) + 'px';
    matScrim.style.left = (-g.x) + 'px'; matScrim.style.top = (SCRIM_Y - g.y) + 'px';
    matScrim.style.transformOrigin = '960px ' + (g.y + g.h / 2 - SCRIM_Y) + 'px';
    shelf.style.width = g.shelf + 'px';
    shelf.className = 'shelf';

    keyed(track, empty ? [] : renderItems, function (el, it) {
      if (it.isCat) {
        setContent(el, 'cat|' + it.title + '|' + homeFont(), function () { return '<span class="cat-row-text">' + esc(it.title) + '</span>'; });
        el.className = 'cat-row-label' + (it.active ? ' is-active' : '');
        el.style.height = (it.span * g.th + (it.span - 1) * 12) + 'px';
        el.style.transform = 'translate3d(12px,' + (16 + it.row * g.rowPitch) + 'px,0)';
        el.removeAttribute('role'); el.removeAttribute('data-z'); el.removeAttribute('data-action');
        return;
      }
      var rowLen = rows[it.row] ? rows[it.row].items.length : ns;
      var rowOff = !g.showLabels ? Math.round((g.vis - rowLen) * g.pitch / 2) : 0;
      var i = it.idx, a = it.id ? app(it.id) : null, left = g.labelColW + rowOff + it.col * g.pitch, topY = 16 + it.row * g.rowPitch;
      var focus = tileFocus && i === anchor, sel = tileSel && i === anchor, lifted = hs.lifted && i === anchor;
      setContent(el, it.kind + '|' + (it.id || '') + '|' + (it.id ? dockLabelSize(it.id) : full) + '|' + S.c.bg + '|' + S.c.apps + '|' + S.c.dockStyle + '|' + homeFont(), function () { return '<span class="tile-content">' + dockTileHtml(it, full) + '</span>'; });
      el.className = 'tile k-' + it.kind + (focus ? ' is-focus' : '') + (sel ? ' is-sel' : '') + (lifted ? ' is-lifted' : '')
        + (a && !a.mark ? ' is-text' : '') + (it.kind === 'add' && full ? ' is-full' : '') + (it.kind === 'app' && S.press === it.id ? ' is-press' : '')
        + (lifted && it.col === 0 ? ' no-l' : '') + (lifted && it.col >= rowLen - 1 ? ' no-r' : '');
      el.style.transform = 'translate3d(' + left + 'px,' + topY + 'px,0)';
      el.setAttribute('role', 'button');
      if (a) el.setAttribute('aria-label', a.name);
      if (hs.mode === 'arrange') attrs(el, 'tile', i, 'arrange.' + (it.kind === 'add' ? 'add' : (it.kind === 'ph' ? 'placeholder.' : 'tile.') + it.id));
      else attrs(el, 'app', i, 'home.app.' + it.id);
    });
    track.style.transform = 'translate3d(0,0,0)';
    plate.className = 'plate' + (!n || empty || hs.zone === null ? '' : hs.lifted ? ' on-lift' : tileFocus ? ' on-focus' : tileSel ? ' on-sel' : '');
    plate.style.transform = 'translate3d(' + (g.labelColW + activeRowOff + activeCol * g.pitch) + 'px,' + (16 + activeRow * g.rowPitch) + 'px,0)';

    cueL.className = 'cue';
    cueR.className = 'cue';

    ax = g.x + 16 + g.labelColW + activeCol * g.pitch;
    if (hs.mode === 'arrange' && !hs.lifted && (hs.zone === 'tiles' || hs.zone === 'act') && focusItem && focusItem.kind !== 'add') {
      s = hs.arr.slots[anchor];
      label = (s.removed ? 'Restore ' : 'Remove ') + app(s.id).name; width = actionWidth(label);
      ax = clamp(ax + (g.tw - width) / 2, 112, 1808 - width);
      setHTML(dockAction, '<span>' + esc(label) + '</span>');
      dockAction.className = 'dock-action is-on' + (hs.zone === 'act' ? ' is-focus' : '');
      dockAction.style.width = width + 'px';
      dockAction.style.transform = 'translate3d(' + ax + 'px,0,0)';
      attrs(dockAction, 'act', anchor, 'arrange.' + (s.removed ? 'restore.' : 'remove.') + s.id);
    } else {
      dockAction.className = 'dock-action';
      dockAction.removeAttribute('data-z'); dockAction.removeAttribute('data-action');
    }
    setHTML(dockEmpty, empty ? '<p>No apps on Home</p><button type="button" tabindex="-1" class="btn' + (hs.zone === 'empty' ? ' is-focus' : '') + '" data-z="empty" data-i="0" data-action="home.add-apps">' + icon('plus') + '<span>Add apps</span></button>' : '');
  }

  function photoModeTransition(compact) {
    if (photoMode !== null && photoMode !== compact) {
      var ghost = phScene.cloneNode(true), token = ++photoTransitionToken;
      ghost.removeAttribute('id'); ghost.setAttribute('aria-hidden', 'true');
      Array.prototype.forEach.call(ghost.querySelectorAll('[id],[data-action],[data-z]'), function (el) {
        el.removeAttribute('id'); el.removeAttribute('data-action'); el.removeAttribute('data-z');
      });
      ghost.className = 'ph-scene ph-ghost';
      phScene.parentNode.appendChild(ghost);
      phScene.className = 'ph-scene ph-incoming';
      setTimeout(function () {
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
        if (token === photoTransitionToken) phScene.className = 'ph-scene';
      }, 180);
    }
    photoMode = compact;
  }
  /* Each plate keeps a stationary, stage-registered field while its opacity changes.
     Reuse the hidden group for the next label; never animate plate width or position. */
  function renderPhotoPlate(id, width, height, y, state) {
    var key = id + '|' + width + '|' + height + '|' + y, plateEl, fieldEl;
    if (key !== photoPlateKey) {
      phPlates[photoPlateIndex].className = phPlates[photoPlateIndex].className.replace(' is-current', '') + ' is-outgoing';
      photoPlateIndex = 1 - photoPlateIndex;
      plateEl = phPlates[photoPlateIndex]; fieldEl = phFields[photoPlateIndex];
      plateEl.className = 'ph-plate is-preparing';
      plateEl.style.width = width + 'px'; plateEl.style.height = height + 'px';
      plateEl.style.transform = 'translate3d(0,' + y + 'px,0)';
      fieldTransform(fieldEl, 112, y, width, height);
      plateEl.offsetWidth; // Establish zero opacity before the incoming crossfade.
      photoPlateKey = key;
    }
    fieldTransform(phFields[photoPlateIndex], 112, y, width, height);
    phPlates[photoPlateIndex].className = 'ph-plate is-current' + (state ? ' ' + state : '');
  }
  function fieldTransform(el, x, y, width, height) {
    el._placement = { x: x, y: y, width: width, height: height };
    el.style.transformOrigin = (x + width / 2) + 'px ' + (y + height / 2) + 'px';
    el.style.transform = 'translate3d(' + (-x) + 'px,' + (-y) + 'px,0)' + (S.c.bg === 'photo' && S.c.material === 'tint' && !REDUCED_MOTION ? ' scale(1.04)' : '');
  }
  function renderList(hs) {
    var items = hs.items, n = items.length, compact = hs.mode === 'arrange', pitch = compact ? PH_COMPACT_PITCH : PH_PITCH;
    var anchor = clamp(hs.i, 0, Math.max(0, n - 1)), first, off, width, slot, y, s, label, aw, plateState;
    var rowFocus = hs.zone === 'apps' || hs.zone === 'tiles', remembered = hs.zone === 'act' || hs.zone === 'ctl' || hs.zone === 'preview';
    photoModeTransition(compact);
    if (compact) {
      first = clamp(scroll.photoArrange, anchor - 7, anchor - 1);
      first = clamp(first, 0, Math.max(0, n - PH_COMPACT_VISIBLE));
      scroll.photoArrange = first;
    } else {
      first = clamp(scroll.photo, anchor - 3, anchor - 1);
      first = clamp(first, 0, Math.max(0, n - PH_FULL));
      scroll.photo = first;
    }
    off = first * pitch; slot = anchor - first;
    width = items[anchor] ? listPlateWidth(items[anchor].id, compact) : 360;
    phList.className = 'ph-list' + (compact ? ' is-compact' : '');
    phList.style.height = PH_HEIGHT + 'px';
    phRows.style.top = (compact ? 72 : 148) + 'px';
    keyed(phRows, items, function (row, it, i) {
      var typography = photoLabel(it.id, compact), focus = rowFocus && i === anchor, lifted = hs.lifted && i === anchor, markImage, body = '';
      setContent(row, it.id + '|' + typography.size + '|' + S.c.bg + '|' + S.c.apps + '|' + homeFont(), function () {
        if (S.c.apps !== 'text') body += appMark(app(it.id), S.c.apps === 'icons' ? compact ? 64 : 88 : compact ? 60 : 84, S.c.apps === 'icons' ? compact ? 64 : 88 : compact ? 44 : 64, S.c.apps === 'icons' ? compact ? 52 : 72 : compact ? 42 : 54);
        if (S.c.apps !== 'icons') body += '<span class="ph-name" style="font-size:' + typography.size + 'px;top:' + typography.top + 'px">' + esc(app(it.id).name) + '</span>';
        return '<span class="ph-group">' + body + '</span><span class="ph-move ph-move-up">' + icon('up') + '</span><span class="ph-move ph-move-down">' + icon('down') + '</span>';
      });
      markImage = row.querySelector('.mark img');
      if (markImage) {
        markImage.onerror = function () { this.style.visibility = 'hidden'; };
        if (markImage.complete && !markImage.naturalWidth) markImage.style.visibility = 'hidden';
      }
      row.className = 'ph-row k-' + it.kind + (focus ? ' is-focus' : '') + (remembered && i === anchor ? ' is-sel' : '') + (lifted ? ' is-lifted' : '')
        + (lifted && i === 0 ? ' no-up' : '') + (lifted && i === n - 1 ? ' no-down' : '')
        + (it.kind === 'app' && S.press === it.id ? ' is-press' : '');
      row.style.width = (compact ? listPlateWidth(it.id, compact) : 1200) + 'px'; row.style.height = pitch + 'px';
      row.style.transform = 'translate3d(0,' + (i * pitch) + 'px,0)';
      row.setAttribute('role', 'button'); row.setAttribute('aria-label', app(it.id).name);
      attrs(row, compact ? 'tile' : 'app', i, compact ? 'arrange.' + (it.kind === 'ph' ? 'placeholder.' : 'tile.') + it.id : 'home.app.' + it.id);
    });
    phRows.style.transform = 'translate3d(0,' + (-off) + 'px,0)';
    y = (compact ? PH_COMPACT_TOP + 2 : PH_TOP + 1) + slot * pitch;
    plateState = !n || hs.zone === null ? '' : hs.lifted ? 'on-lift' : S.c.focus === 'glass' && rowFocus ? 'on-focus' : S.c.focus === 'glass' && remembered ? 'on-sel' : '';
    renderPhotoPlate(items[anchor] ? items[anchor].id : '', width, compact ? 88 : 134, y, plateState);
    if (compact && !hs.lifted && (hs.zone === 'tiles' || hs.zone === 'act') && items[anchor]) {
      s = hs.arr.slots[anchor]; label = (s.removed ? 'Restore ' : 'Remove ') + app(s.id).name; aw = actionWidth(label);
      setHTML(phAction, '<span>' + esc(label) + '</span>');
      phAction.className = 'ph-action is-on' + (hs.zone === 'act' ? ' is-focus' : '');
      phAction.style.width = aw + 'px';
      phAction.style.transform = 'translate3d(' + (112 + width + 24) + 'px,' + (PH_COMPACT_TOP + slot * pitch + 12) + 'px,0)';
      attrs(phAction, 'act', anchor, 'arrange.' + (s.removed ? 'restore.' : 'remove.') + s.id);
    } else { phAction.className = 'ph-action'; phAction.removeAttribute('data-z'); phAction.removeAttribute('data-action'); }
    phEmpty.className = 'ph-empty' + (!compact && !n ? ' is-on' : '');
    setHTML(phEmpty, !compact && !n ? '<p>No apps on Home</p><button type="button" tabindex="-1" class="btn' + (hs.zone === 'empty' ? ' is-focus' : '') + '" data-z="empty" data-i="0" data-action="home.add-apps">' + icon('plus') + '<span>Add apps</span></button>' : '');
  }

  /* Sheets: a frame is built once per view/mode; fill() updates its slots. Persistent
     scrollers let transforms animate. */
  function renderSheet(t, sheet) {
    var key;
    sheetEl.hidden = !(sheet || isSettingsDetail(t));
    sheetView.hidden = !sheet;
    if (sheet) sheetView.setAttribute('aria-modal', 'true');
    else sheetView.removeAttribute('aria-modal');
    sceneEl.setAttribute('aria-hidden', sheet || isSettingsDetail(t) ? 'true' : 'false');
    if (!sheet) { sheetView.innerHTML = ''; sheetKey = ''; return; }
    key = t.id + '|' + (t.mode || '') + '|' + (t.msg || '') + '|' + S.variant + '|' + S.c.bg;
    if (key !== sheetKey) {
      sheetView.innerHTML = FRAMES[t.id](t);
      sheetKey = key; slotEls = {};
      Array.prototype.forEach.call(sheetView.querySelectorAll('[data-slot]'), function (el) { slotEls[el.getAttribute('data-slot')] = el; });
    }
    FILLS[t.id](t, slotEls);
  }
  function renderAppearance(t) {
    appearanceEl.hidden = !isSettingsDetail(t);
    if (appearanceEl.hidden) { appearanceEl.removeAttribute('aria-modal'); return; }
    appearanceEl.setAttribute('aria-modal', 'true');
    if (t.id === 'wallpaper') { renderWallpaper(t); return; }
    V.appearance.norm(t);
    appearanceEl.className = 'appearance detail-' + t.group;
    appearanceRows.className = 'appearance-rows';
    appearanceTitle.textContent = DETAIL_NAMES[t.group];
    var at = detailLocation(t), selected = at.item, error = S.lookError, status = '', hint;
    function command(item, inner, cls) {
      var hasCheck = !!(item.axis || item.checked !== undefined);
      var applied = item.axis ? S.c[item.axis] === item.value : !!item.checked;
      var loading = !!(item.axis && S.pending && S.pending.target[item.axis] === item.value && S.pending.row === item.axis);
      return '<button type="button" tabindex="-1" class="setting-choice' + (cls ? ' ' + cls : '') + (t.f.action === item.action ? ' is-focus' : '') + (item.disabled ? ' is-disabled' : '') + (applied ? ' is-applied' : '') + (loading ? ' is-loading' : '') + '"'
        + (hasCheck ? ' role="radio" aria-checked="' + !!applied + '"' : '') + ' aria-label="' + esc(item.axis && item.value === 'both' ? 'Icons and text' : item.label) + '" aria-disabled="' + !!item.disabled + '" aria-busy="' + loading + '"'
        + ' data-z="detail" data-i="0" data-id="' + item.action + '" data-action="' + item.action + '">' + inner
        + (hasCheck ? '<span class="setting-tick" aria-hidden="true">' + (applied ? icon('check') : '') + '</span>' : '') + '</button>';
    }
    setHTML(appearanceBack, command({ action: 'settings.back', label: t.group === 'rotation' ? 'Background' : 'Settings' }, icon('left') + '<span>' + (t.group === 'rotation' ? 'Background' : 'Settings') + '</span>', 'setting-back'));
    setHTML(appearanceRows, detailSections(t).map(function (section) {
      return '<section class="setting-section' + (section.horizontal ? ' is-horizontal' : '') + ' section-' + section.id + '">'
        + (section.title ? '<h3 class="setting-label" id="setting-' + section.id + '">' + esc(section.title) + '</h3>' : '')
        + '<div class="setting-options"' + (section.items[0].axis || section.items[0].checked !== undefined ? ' role="radiogroup" aria-label="' + esc(section.title || LOOK_NAMES[section.id] || DETAIL_NAMES[t.group]) + '"' : '') + '>'
        + section.items.map(function (item) {
          var swatch = item.axis === 'bg', hasCheck = !!(item.axis || item.checked !== undefined), body = '';
          if (swatch || item.thumbnail) body += item.value === 'light' || item.value === 'dark'
            ? '<span class="setting-swatch swatch-' + item.value + '" aria-hidden="true"></span>'
            : '<img class="setting-swatch" src="' + WP + S.c.wall + '-thumb.jpg" alt="">';
          if (item.svgIcon) body += icon(item.svgIcon, 'setting-src-ico');
          body += '<span class="setting-copy"><span class="setting-name">' + esc(item.label) + '</span>'
            + (item.description ? '<span class="setting-description">' + esc(item.description) + '</span>' : '') + '</span>';
          if (!hasCheck) body += icon('right', 'setting-forward');
          return command(item, body, (item.description ? 'has-description' : '') + (item.svgIcon ? ' has-src-ico' : ''));
        }).join('') + '</div>'
        + (section.reason ? '<p class="setting-reason">' + esc(section.reason) + '</p>' : '') + '</section>';
    }).join(''));
    if (S.pending) status = '<p>Loading ' + esc(S.pending.row === 'font' ? FONTS[S.pending.target.font].name : 'your choice') + '…</p><p>Back cancels this change.</p>';
    else if (error) {
      status = '<p class="setting-error">' + (error.type === 'save' ? 'Couldn’t save this change.' : error.type === 'font' ? 'Couldn’t load ' + esc(FONTS[error.font].name) + '.' : 'Couldn’t load this appearance.') + ' Your current choice is kept.</p>'
        + command({ action: 'settings.retry', label: 'Try again' }, '<span>Try again</span>', 'setting-retry');
    }
    setHTML(appearanceStatus, status);
    hint = selected.disabled ? '' : selected.action === 'settings.back' ? 'Return to ' + (t.group === 'rotation' ? 'Background' : 'Settings') : selected.action === 'settings.retry' ? 'Retry this change' : selected.axis ? 'Apply selected setting' : selected.action.indexOf('input.port.') === 0 ? 'Configure this input port' : selected.action.indexOf('input.switch.') === 0 ? 'Switch TV to this input' : selected.action.indexOf('input.') === 0 ? 'Apply input setting' : selected.action === 'background.wallpaper' ? 'Choose a wallpaper' : selected.action === 'background.rotation' ? 'Choose a rotation interval' : 'Open on the TV';
    setHTML(appearanceDesc, hint ? '<span class="remote-key">OK</span><span>' + esc(hint) + '</span>' : '');
  }
  function renderWallpaper(t) {
    V.wallpaper.norm(t);
    appearanceEl.className = 'appearance detail-wallpaper';
    appearanceTitle.textContent = 'Wallpaper';
    appearanceRows.className = 'appearance-rows wallpaper-picker';
    setHTML(appearanceBack, '<button type="button" tabindex="-1" class="setting-choice setting-back' + (t.f.zone === 'back' ? ' is-focus' : '') + '" data-z="wall-back" data-action="wallpaper.back">' + icon('left') + '<span>Background</span></button>');
    setHTML(appearanceRows, '<div class="wallpaper-edge wallpaper-before" aria-hidden="true">' + icon('up') + '</div><div class="wallpaper-list" role="radiogroup" aria-label="Wallpaper"><div class="wallpaper-rows"></div></div><div class="wallpaper-edge wallpaper-after" aria-hidden="true">' + icon('down') + '</div>');
    var rows = appearanceRows.querySelector('.wallpaper-rows'), shown = wall(S.wallShown) || wall(S.c.wall), candidate = WALLS[t.i], status, note, hint;
    keyed(rows, WALLS.map(function (w) { return { key: w.id, wall: w }; }), function (row, item, i) {
      var visible = i >= t.top && i < t.top + WALL_VISIBLE, w = item.wall, image;
      setContent(row, w.id + '|' + visible, function () { return '<span class="wallpaper-thumb">' + (visible ? '<img src="' + WP + w.id + '-thumb.jpg" alt="">' : '') + '</span><span class="setting-copy"><span class="setting-name">' + esc(w.name) + '</span></span><span class="setting-tick" aria-hidden="true"></span>'; });
      row.className = 'setting-choice wallpaper-choice' + (t.f.zone === 'photo' && t.i === i ? ' is-focus' : '') + (w.id === S.c.wall ? ' is-applied' : '');
      row.style.transform = 'translate3d(0,' + (i * WALL_ROW) + 'px,0)'; row.style.visibility = visible ? 'visible' : 'hidden';
      row.setAttribute('role', 'radio'); row.setAttribute('tabindex', '-1'); row.setAttribute('aria-label', w.name);
      row.setAttribute('aria-checked', String(w.id === S.c.wall)); row.setAttribute('aria-posinset', String(i + 1)); row.setAttribute('aria-setsize', String(WALLS.length));
      row.setAttribute('aria-busy', String(t.previewDue === w.id || S.wallPending === w.id));
      attrs(row, 'wall-choice', i, 'wallpaper.choose.' + w.id);
      setHTML(row.querySelector('.setting-tick'), w.id === S.c.wall ? icon('check') : '');
      image = row.querySelector('img');
      if (image && !image._wallBound) {
        image._wallBound = true;
        image.onerror = function () { this.parentNode.className = 'wallpaper-thumb is-missing'; };
        if (image.complete && !image.naturalWidth) image.onerror();
      }
    });
    rows.style.transform = 'translate3d(0,' + (-t.top * WALL_ROW) + 'px,0)';
    appearanceRows.querySelector('.wallpaper-before').className = 'wallpaper-edge wallpaper-before' + (t.top > 0 ? ' is-on' : '');
    appearanceRows.querySelector('.wallpaper-after').className = 'wallpaper-edge wallpaper-after' + (t.top + WALL_VISIBLE < WALLS.length ? ' is-on' : '');
    note = t.previewDue ? 'Preparing ' + candidate.name + '…' : S.wallPending ? (t.applyPending ? 'Applying ' : 'Loading ') + candidate.name + '…' : shown.id === S.c.wall ? 'Applied' : 'Preview';
    if (t.failedId) note = S.err ? 'Couldn’t save ' + wall(t.failedId).name + '.' : 'Couldn’t load ' + wall(t.failedId).name + '.';
    status = '<p class="wallpaper-preview-name"><span>' + esc(shown.name) + '</span><span class="wallpaper-count">' + (wallIndex(shown.id) + 1) + ' of ' + WALLS.length + '</span></p><p class="wallpaper-preview-state' + (t.failedId ? ' setting-error' : '') + '">' + esc(note) + '</p>';
    if (t.failedId) status += '<button type="button" tabindex="-1" class="setting-choice setting-retry' + (t.f.zone === 'retry' ? ' is-focus' : '') + '" data-z="wall-retry" data-action="wallpaper.retry">Try again</button>';
    setHTML(appearanceStatus, status);
    hint = t.f.zone === 'back' ? 'Return to Background' : t.f.zone === 'retry' ? 'Retry this photo' : 'Apply selected photo';
    if (t.f.zone === 'photo' && candidate.id === S.c.wall && !S.pending && !t.failedId) hint = '';
    setHTML(appearanceDesc, hint ? '<span class="remote-key">OK</span><span>' + hint + '</span>' : '');
  }
  /* Keep the retry or membership state on the focused control. The stage-level line
     shares its position without changing the control's identity or key behaviour. */
  function renderFocusStatus(t) {
    if (isSettingsDetail(t)) { focusStatus.className = 'focus-status'; return; }
    var root = isSettingsDetail(top()) ? appearanceEl : sheetEl.hidden ? homeEl : sheetEl, active = root.querySelectorAll('.is-focus[data-action]'), target = null, text = S.err ? 'Not saved. OK tries again.' : '', i, r, sr, scale, x, y, w, action, solid, photoRow = false, photoFree = false;
    Array.prototype.forEach.call(stage.querySelectorAll('.has-local-status'), function (el) { el.className = el.className.replace(/\s+has-local-status/g, ''); });
    for (i = 0; i < active.length; i++) if (renderedAction(active[i])) { target = active[i]; break; }
    if (!text && t.id === 'arrange' && (t.f.zone === 'act' || t.f.zone === 'tiles')) {
      var slot = t.slots[t.f.i];
      if (slot && !slot.removed && t.f.zone === 'act' && S.c.home.length === 1) text = LAST;
    }
    if (!text && S.note === LAST && t.id === 'arrange') text = LAST;
    if (!target || !text) { focusStatus.className = 'focus-status'; return; }
    if (target.parentNode === utilsEl && utilsEl.className.indexOf('is-icons') >= 0) { renderUtilFocusLabel(target); focusStatus.className = 'focus-status'; return; }
    // Photo action pills stay on one line; the header already carries this status.
    if (S.c.layout === 'list' && t.id === 'arrange' && !t.lifted && (t.f.zone === 'act' || t.f.zone === 'tiles')) { focusStatus.className = 'focus-status'; return; }
    photoRow = S.c.layout === 'list' && target.className.indexOf('ph-row') >= 0;
    if (photoRow && phAction.className.indexOf('is-on') >= 0) target = phAction;
    else if (photoRow) photoFree = true;
    target.className += ' has-local-status';
    action = target.getAttribute('data-action');
    r = target.getBoundingClientRect(); sr = stage.getBoundingClientRect(); scale = sr.width / 1920 || 1;
    x = (r.left - sr.left) / scale; y = (r.top - sr.top) / scale; w = r.width / scale;
    if (photoFree) { x = 112 + parseFloat(phPlates[photoPlateIndex].style.width) + 24; y += (r.height / scale - 28) / 2; w = 400; }
    else if (action.indexOf('home.app.') === 0 || action.indexOf('arrange.tile.') === 0 || action.indexOf('arrange.placeholder.') === 0) y += 171;
    else if (action.indexOf('apps.order.') === 0) y += 86;
    else if (action.indexOf('apps.toggle.') === 0 || action.indexOf('apps.add.') === 0) y += 164;
    else if (action.indexOf('layout.') === 0) y += 54;
    else y += action.indexOf('arrange.remove.') === 0 || action.indexOf('arrange.restore.') === 0 ? 43 : 40;
    solid = /(?:^|\s)(?:u|btn|er-rm|dock-action|set-row|ph-action)(?:\s|$)/.test(target.className) && target.parentNode !== utilsEl && target.parentNode.className.indexOf('s-head') < 0;
    if (target === phAction && target.className.indexOf('is-focus') < 0) solid = false;
    focusStatus.className = 'focus-status is-on' + (solid ? ' dark-ink' : '') + (photoFree ? ' photo-status' : '');
    focusStatus.textContent = text;
    focusStatus.style.left = clamp(x + 8, 112, 1808 - Math.min(w - 16, 800)) + 'px';
    focusStatus.style.top = clamp(y, 72, 988) + 'px';
    focusStatus.style.width = Math.min(w - 16, 800) + 'px';
  }
  function headButtons(list, fi, prefix) {
    return list.map(function (b, i) {
      return '<button type="button" tabindex="-1" class="btn' + (i === fi ? ' is-focus' : '') + (b[2] ? ' ' + b[2] : '') + '" data-z="head" data-i="' + i + '" data-action="' + prefix + '.' + b[0] + '" aria-label="' + esc(b[0] === 'undo' ? undoCaption() : b[1]) + '">' + (b[3] ? icon(b[3]) : '') + '<span>' + b[1] + '</span></button>';
    }).join('');
  }
  var FRAMES = {
    apps: function () {
      return '<h2 class="s-title" data-slot="title"></h2><p class="s-sub" data-slot="sub"></p><div class="s-head" data-slot="head"></div>'
        + '<div class="grid-view" data-slot="view"><div class="grid-in" data-slot="grid"></div></div>'
        + '<div class="row-cue grid-before" data-slot="before" aria-hidden="true">' + icon('up') + '</div><div class="row-cue grid-after" data-slot="after" aria-hidden="true">' + icon('down') + '</div>';
    },
    editor: function () {
      return '<h2 class="s-title">Apps on Home</h2><p class="s-sub" data-slot="sub"></p><div class="s-head" data-slot="head"></div>'
        + '<p class="s-label z-home" data-slot="lh"></p><p class="s-label z-other">Not on Home</p>'
        + '<div class="ed-home-view" data-slot="hv"><div class="ed-home" data-slot="home"></div></div><div class="ed-order-break" data-slot="break">Then scroll</div><div class="ed-other-view" data-slot="ov"><div class="ed-other" data-slot="other"></div></div><div class="ed-origin" data-slot="origin"></div>'
        + '<div class="row-cue home-before" data-slot="homeBefore" aria-hidden="true">' + icon('up') + '</div><div class="row-cue home-after" data-slot="homeAfter" aria-hidden="true">' + icon('down') + '</div>'
        + '<div class="row-cue editor-before" data-slot="otherBefore" aria-hidden="true">' + icon('up') + '</div><div class="row-cue editor-after" data-slot="otherAfter" aria-hidden="true">' + icon('down') + '</div>';
    },
    settings: function () { return '<h2 class="s-title">Settings</h2><div class="settings-overview" data-slot="list"></div><p class="settings-overview-hint"><span class="remote-key">OK</span><span>Open selected group</span></p>'; },
    message: function (t) {
      var m = messageContent(t);
      return '<h2 class="msg-title">' + esc(m.title) + '</h2><p class="msg-line">' + esc(m.line) + '</p><p class="msg-note">' + esc(m.note) + '</p><div class="msg-acts" data-slot="acts"></div>';
    }
  };
  function gridTileHtml(id) {
    var a = app(id), state = onHome(id) ? badge(true) + '<span>On Home</span>' : '';
    return '<span class="panel-content">' + appMark(a, 120, 72, 58) + '<span class="label">' + esc(a.name) + '</span></span><span class="state">' + state + '</span>';
  }
  var FILLS = {
    apps: function (t, el) {
      var f = t.f, items = appsItems(), n = items.length, rows = Math.ceil(n / COLS), vis = 3, row = Math.floor(f.i / COLS);
      setHTML(el.title, 'All apps');
      setHTML(el.sub, esc(catalog.loading ? 'Loading installed apps…' : catalog.error || (!n ? 'No installed apps found.' : '')));
      setHTML(el.head, headButtons(appsHead(), f.zone === 'head' ? 0 : -1, 'apps'));
      el.head.className = 's-head' + (f.zone === 'head' ? ' is-awake' : '');
      if (f.zone === 'grid') { if (row < t.top) t.top = row; if (row > t.top + vis - 1) t.top = row - vis + 1; }
      t.top = clamp(t.top, 0, Math.max(0, rows - vis));
      keyed(el.grid, items.map(function (id) { return { key: id, id: id }; }), function (tile, it, i) {
        var focus = f.zone === 'grid' && i === f.i;
        setContent(tile, [it.id, app(it.id).name, onHome(it.id)].join('|'), function () { return gridTileHtml(it.id); });
        tile.className = 'gt' + (focus ? ' is-focus' : '');
        tile.style.transform = 'translate3d(' + ((i % COLS) * GRID_COL) + 'px,' + (Math.floor(i / COLS) * GRID_ROW) + 'px,0)';
        tile.setAttribute('role', 'button'); tile.setAttribute('aria-label', app(it.id).name);
        attrs(tile, 'grid', i, 'apps.open.' + it.id);
      });
      el.grid.style.transform = 'translate3d(0,' + (-t.top * GRID_ROW) + 'px,0)';
      el.view.className = 'grid-view' + (t.top > 0 ? ' more-before' : '') + (rows - t.top > vis ? ' more-after' : '');
      el.before.className = 'row-cue grid-before' + (t.top > 0 ? ' is-on' : '');
      el.after.className = 'row-cue grid-after' + (rows - t.top > vis ? ' is-on' : '');
    },
    editor: function (t, el) {
      var f = t.f, H = t.lifted ? t.lifted.order : S.c.home, O = otherGroups(), list = O.recent.concat(O.rest), full = S.c.home.length >= CAP;
      var entries = [], ys = [], y = 0, yf, minTop, maxTop = 0, rowEnd, before = false, afterRows = false;
      var visH = 9, hTop = t.homeTop || 0, hTopPx;
      if (f.zone === 'home') {
        if (f.i < hTop) hTop = f.i;
        if (f.i > hTop + visH - 1) hTop = f.i - visH + 1;
      }
      hTop = clamp(hTop, 0, Math.max(0, H.length - visH));
      t.homeTop = hTop; hTopPx = hTop * ED_ROW;
      var hint = catalog.error ? catalog.error : catalog.loading ? 'Loading installed apps…' : f.zone === 'head' && f.h === 0 ? undoCaption() : f.zone === 'home' && f.part === 'remove' ? (H.length <= 1 ? LAST : app(H[f.i]).name + ' stays installed.') : '';
      setHTML(el.sub, editStatus(hint, t.lifted ? 'Moving ' + app(t.lifted.id).name + '. OK places it, Back puts it back.' : ''));
      setHTML(el.head, headButtons([['undo', 'Undo', S.undo.length ? '' : 'is-idle', 'undo'], ['done', 'Done', '', 'check']], f.zone === 'head' ? f.h : -1, 'editor'));
      el.head.className = 's-head' + (f.zone === 'head' ? ' is-awake' : '');
      setHTML(el.lh, 'On Home <span class="s-count">' + S.c.home.length + ' of ' + CAP + '</span>');
      el['break'].className = 'ed-order-break';

      keyed(el.home, H.map(function (id) { return { key: id, id: id }; }), function (row, it, i) {
        var a = app(it.id), here = f.zone === 'home' && i === f.i, lifted = !!t.lifted && i === f.i, ry = editorHomeY(i);
        setContent(row, it.id, function () { return '<div class="er-name" role="button"><span class="panel-content"><span class="er-num"></span>' + smallMark(a) + '<span class="er-text">' + esc(a.name) + '</span><span class="er-move">' + icon('updown') + '</span></span></div><div class="er-rm" role="button"><span></span></div>'; });
        row.className = 'er' + (here ? ' is-active' : '') + (lifted ? ' is-lifted' : '');
        row.style.transform = 'translate3d(' + (lifted ? 16 : 0) + 'px,' + ry + 'px,0)';
        row.style.visibility = ry >= hTopPx && ry + 72 <= hTopPx + ED_VIEW ? 'visible' : 'hidden';
        row.querySelector('.er-num').textContent = String(i + 1);
        row.firstChild.className = 'er-name' + (here && (f.part === 'name' || lifted) ? ' is-focus' : '');
        row.lastChild.className = 'er-rm' + (here && f.part === 'remove' && !lifted ? ' is-focus' : '') + (H.length <= 1 ? ' is-limit' : '');
        row.lastChild.firstChild.textContent = H.length <= 1 ? LAST : 'Remove from Home';
        attrs(row.firstChild, 'name', i, 'editor.move.' + it.id);
        attrs(row.lastChild, 'remove', i, 'editor.remove.' + it.id);
      });
      el.home.style.transform = 'translate3d(0,' + (-hTopPx) + 'px,0)';
      el.homeBefore.className = 'row-cue home-before' + (hTop > 0 ? ' is-on' : '');
      el.homeAfter.className = 'row-cue home-after' + (H.length - hTop > visH ? ' is-on' : '');
      el.origin.className = 'ed-origin' + (t.lifted && t.lifted.from !== f.i && t.lifted.from >= hTop && t.lifted.from < hTop + visH ? ' is-on' : '');
      if (t.lifted) el.origin.style.transform = 'translate3d(0,' + (264 + editorHomeY(t.lifted.from) - hTopPx + 16) + 'px,0)';

      if (O.recent.length) { entries.push({ key: 'sep-recent', sep: 'Recently removed', y: y }); y += ED_SEP; }
      O.recent.forEach(function (id) { entries.push({ key: id, id: id, y: y }); ys.push(y); y += ED_ROW; });
      if (O.recent.length && O.rest.length) { entries.push({ key: 'sep-rest', sep: 'Other installed apps', y: y }); y += ED_SEP; }
      O.rest.forEach(function (id) { entries.push({ key: id, id: id, y: y }); ys.push(y); y += ED_ROW; });
      if (f.zone === 'other' && ys.length) {
        yf = ys[f.j] - (O.recent.length && (f.j === 0 || f.j === O.recent.length) ? ED_SEP : 0);
        if (yf < t.top) t.top = yf;
        if (ys[f.j] + 72 > t.top + ED_VIEW) {
          minTop = ys[f.j] + 72 - ED_VIEW;
          entries.some(function (it) { if (it.y < minTop) return false; t.top = it.y; return true; });
        }
      }
      entries.some(function (it) { if (it.y < Math.max(0, y - ED_VIEW)) return false; maxTop = it.y; return true; });
      t.top = clamp(t.top, 0, maxTop);
      keyed(el.other, entries, function (row, it) {
        var j, focus, a;
        row.style.transform = 'translate3d(0,' + it.y + 'px,0)';
        rowEnd = it.y + (it.sep ? ED_SEP : 72);
        row.style.visibility = it.y >= t.top && rowEnd <= t.top + ED_VIEW ? 'visible' : 'hidden';
        before = before || it.y < t.top; afterRows = afterRows || rowEnd > t.top + ED_VIEW;
        if (it.sep) { setContent(row, 'sep|' + it.sep, function () { return esc(it.sep); }); row.className = 'eo-sep'; return; }
        j = list.indexOf(it.id); focus = f.zone === 'other' && j === f.j; a = app(it.id);
        setContent(row, it.id, function () { return '<span class="panel-content">' + smallMark(a) + '<span class="eo-text">' + esc(a.name) + '</span><span class="eo-verb"></span></span>'; });
        setHTML(row.querySelector('.eo-verb'), focus ? '<span class="verb' + (full ? ' is-off' : '') + '">' + (full ? 'Home is full' : 'Add to Home') + '</span>' : '');
        row.className = 'eo' + (focus ? ' is-focus' : '');
        row.setAttribute('role', 'button');
        attrs(row, 'other', j, 'editor.add.' + it.id);
      });
      el.other.style.transform = 'translate3d(0,' + (-t.top) + 'px,0)';
      el.ov.className = 'ed-other-view';
      el.otherBefore.className = 'row-cue editor-before' + (before ? ' is-on' : '');
      el.otherAfter.className = 'row-cue editor-after' + (afterRows ? ' is-on' : '');
    },
    settings: function (t, el) {
      var html = '';
      settingsRows().forEach(function (r) {
        html += '<button type="button" tabindex="-1" class="settings-group' + (r.id === t.f.id ? ' is-focus' : '') + '" data-z="row" data-i="0" data-id="' + r.id + '" data-action="settings.' + (r.id === 'editor' ? 'editor' : 'group.' + r.id) + '"><span class="settings-group-copy"><span class="settings-group-name">' + esc(r.label) + '</span><span class="settings-group-value">' + esc(r.value) + '</span></span>' + icon('right') + '</button>';
      });
      setHTML(el.list, html);
    },
    message: function (t, el) {
      setHTML(el.acts, messageContent(t).actions.map(function (a, i) {
        return '<button type="button" tabindex="-1" class="btn' + (i === t.f.b ? ' is-focus' : '') + '" data-z="act" data-i="' + i + '" data-action="message.' + a[0] + '"><span>' + a[1] + '</span></button>';
      }).join(''));
    }
  };

  /* ---------- Atomic appearance bundles ---------- */
  var wallToken = 0, committedBundle = null, reflowToken = 0, fontSwitchToken = 0;
  function registeredMaterial(id) { return S.c.bg === 'photo' && S.c.material === 'soft' && !!wall(id); }
  function matSrc(id, material) { return 'assets/materials/' + id + (material === 'soft' ? '-study-soft.jpg' : material === 'tint' ? '-field-clear.jpg' : '-field-frost.jpg'); }
  function fieldSrc(id, material) { return 'assets/materials/' + id + (material === 'soft' ? '-field-blur.jpg' : material === 'tint' ? '-field-clear.jpg' : '-field-frost.jpg'); }
  function makeImg(cls, src) { var im = document.createElement('img'); im.className = cls; im.alt = ''; im._src = src; im.src = src; return im; }
  function whenReady(im, done) {
    var fin = false, timer = setTimeout(function () { finish(!!(im.complete && im.naturalWidth)); }, document.hidden ? 20000 : 8000);
    function finish(ok) { if (fin) return; fin = true; clearTimeout(timer); done(ok); }
    function ready() {
      // Hidden TV prelaunch may suspend decode even after a valid image loads.
      if (document.hidden || !im.decode) { finish(true); return; }
      im.decode().then(function () { finish(true); }, function () { finish(!!(im.complete && im.naturalWidth)); });
    }
    if (im.complete) { if (im.naturalWidth) ready(); else finish(false); }
    else { im.onload = ready; im.onerror = function () { finish(false); }; }
  }
  function swapImg(k, im) { var old = IMG[k]; if (old === im) return; im.style.cssText = old.style.cssText; if (old.id) im.id = old.id; old.parentNode.replaceChild(im, old); IMG[k] = im; }
  function bundleKey(look) { return look.wall + '|' + look.material; }
  function loadBundle(look, token, done) {
    var imgs = { photo: makeImg('photo', WP + look.wall + '.jpg'), bg: makeImg('sheet-bg', WP + look.wall + '-panel.jpg') }, keys, left, allOk = true;
    imgs.mat = makeImg('mat-img', matSrc(look.wall, look.material));
    imgs.field = makeImg('ph-field-img', fieldSrc(look.wall, look.material));
    imgs.fieldAlt = makeImg('ph-field-img', fieldSrc(look.wall, look.material));
    imgs.utility = makeImg('ph-field-img', fieldSrc(look.wall, look.material));
    imgs.utilityAlt = makeImg('ph-field-img', fieldSrc(look.wall, look.material));
    keys = Object.keys(imgs); left = keys.length;
    keys.forEach(function (k) { whenReady(imgs[k], function (ok) {
      allOk = allOk && ok;
      if (--left || token !== wallToken) return;
      done(allOk ? { key: bundleKey(look), imgs: imgs } : null);
    }); });
  }
  function installBundle(bundle, look, previewOnly) {
    if (bundle) {
      Object.keys(bundle.imgs).forEach(function (k) { if (!previewOnly || k !== 'bg') swapImg(k, bundle.imgs[k]); });
      S.bundleKey = bundle.key;
    }
    S.shown = { bg: look.bg, wall: look.wall, material: look.material, font: look.font };
    phFields.concat(utFields).forEach(function (el) { var p = el._placement; if (p) fieldTransform(el, p.x, p.y, p.width, p.height); });
    S.wallShown = look.wall; S.wallPending = null; S.wallError = null;
  }
  function cleanPatch(patch) {
    var out = {}, k;
    if (!patch || typeof patch !== 'object') throw new Error('look needs an appearance patch');
    for (k in patch) if (patch.hasOwnProperty(k)) {
      if (k === 'wall') { if (!wall(patch[k])) throw new Error('Unknown wallpaper: ' + patch[k]); }
      else if (k === 'font') { if (!FONTS[patch[k]] || patch[k] !== 'manrope' && PRIVATE_FONTS.indexOf(patch[k]) < 0) throw new Error('Unavailable font: ' + patch[k]); }
      else if (!LOOK_VALUES[k] || LOOK_VALUES[k].indexOf(patch[k]) < 0) throw new Error('Invalid appearance value: ' + k);
      out[k] = patch[k];
    }
    return out;
  }
  function cancelLook() { wallToken++; S.pending = null; S.wallPending = null; S.lookError = null; }
  function setLook(patch, options) {
    var opts = options || {}, changes = cleanPatch(patch), target = lookOf(S.c), k, token, needs, needsFont, changed, loadedBundle = null, imageDone, fontDone, failed = false;
    for (k in changes) if (changes.hasOwnProperty(k)) target[k] = changes[k];
    changed = Object.keys(target).some(function (key) { return target[key] !== S.c[key]; });
    cancelLook(); S.err = null; token = wallToken;
    function finish(bundle) {
      var c = next(S.c.home.slice(), S.c.recent.slice()), fontChanged = target.font !== S.c.font, reflow = target.apps !== S.c.apps || target.controls !== S.c.controls || target.dockStyle !== S.c.dockStyle || target.clockStyle !== S.c.clockStyle || target.widget !== S.c.widget || fontChanged, frame, fontFrame;
      Object.keys(target).forEach(function (key) { c[key] = target[key]; });
      S.pending = null; S.wallPending = null;
      if (!opts.transient && changed && !write(c, 'Appearance')) { S.lookError = { type: 'save', patch: changes, row: opts.row || S.appearanceFocus, transient: false }; render(); syncRotation(); return; }
      if (opts.transient) S.c = c;
      if (reflow) { S.reflow = true; frame = ++reflowToken; }
      if (fontChanged) { S.fontSwitch = true; fontFrame = ++fontSwitchToken; }
      installBundle(bundle, target);
      if (bundle) committedBundle = bundle;
      S.lookError = null; S.previewBundle = null;
      render(); syncRotation();
      if (reflow) window.requestAnimationFrame(function () { window.requestAnimationFrame(function () {
        if (frame !== reflowToken) return;
        S.reflow = false; stage.className = stage.className.replace(/\s+is-reflow/g, '');
      }); });
      if (fontChanged) setTimeout(function () {
        if (fontFrame !== fontSwitchToken) return;
        S.fontSwitch = false; stage.className = stage.className.replace(/\s+is-font-switch/g, '');
      }, REDUCED_MOTION ? 130 : 170);
    }
    function fail(type, reason) {
      if (token !== wallToken || failed) return;
      failed = true; S.pending = null; S.wallPending = null;
      if (type === 'load') S.wallError = target.wall;
      S.lookError = { type: type, reason: reason || null, patch: changes, row: opts.row || (type === 'font' ? 'font' : S.appearanceFocus), transient: !!opts.transient, wall: target.wall, font: target.font };
      if (type === 'font') log((opts.startup ? 'font fallback: ' : 'Font kept: ') + (opts.startup ? target.font : FONTS[S.c.font].name) + (opts.startup ? '' : ' (' + reason + ')'));
      if (type === 'font' && opts.startup && target.font !== 'manrope') { setLook({ font: 'manrope' }, { transient: true }); return; }
      render(); syncRotation();
    }
    function complete() {
      if (!imageDone || !fontDone || failed || token !== wallToken) return;
      if (document.hidden) { finish(loadedBundle); return; }
      window.requestAnimationFrame(function () { if (!failed && token === wallToken) finish(loadedBundle); });
    }
    needs = target.bg === 'photo' && S.bundleKey !== bundleKey(target) && (!S.shown || S.shown.bg !== 'photo' || target.wall !== S.c.wall || materialApplies(target));
    needsFont = !fontMetrics[target.font]; imageDone = !needs; fontDone = !needsFont;
    if (!needs && !needsFont) { finish(null); return; }
    S.pending = { patch: changes, target: target, row: opts.row || (needsFont ? 'font' : S.appearanceFocus), transient: !!opts.transient, preview: false };
    if (needs) {
      S.wallPending = target.wall;
      loadBundle(target, token, function (bundle) {
        if (!bundle) { fail('load'); return; }
        loadedBundle = bundle; imageDone = true; complete();
      });
    }
    if (needsFont) ensureFont(target.font, function (ok, reason) {
      if (!ok) { fail('font', reason); return; }
      fontDone = true; complete();
    });
    render();
  }
  function showWall(id, done) {
    var target = lookOf(S.c), token;
    target.bg = 'photo'; target.wall = id;
    cancelLook(); token = wallToken; S.wallError = null;
    S.pending = { patch: { wall: id }, target: target, row: 'bg', preview: true, transient: false }; S.wallPending = id;
    loadBundle(target, token, function (bundle) {
      S.pending = null; S.wallPending = null;
      if (!bundle) { S.wallError = id; done(false); return; }
      S.previewBundle = bundle; installBundle(bundle, target, true); done(true);
    });
    render();
  }
  function restoreLook() {
    cancelLook(); S.previewBundle = null;
    if (S.c.bg === 'photo' && committedBundle && committedBundle.key === bundleKey(S.c)) installBundle(committedBundle, S.c);
    else if (S.c.bg !== 'photo' || S.bundleKey === bundleKey(S.c)) installBundle(null, S.c);
    else setLook({}, { transient: true });
  }

  /* ---------- Lifecycle and remote input ---------- */
  var clockTimer = 0, rotationTimer = 0, activeSince = 0, activeMs = 0, rotationKey = '';
  function rotationActive() { return !document.hidden && top().id === 'home' && S.c.bg === 'photo' && !S.pending && mode().min > 0; }
  function pauseRotation() {
    if (activeSince) { activeMs += Date.now() - activeSince; activeSince = 0; }
    clearTimeout(rotationTimer); rotationTimer = 0;
  }
  function resetRotation() { pauseRotation(); activeMs = 0; rotationKey = ''; }
  function syncRotation() {
    var key = S.c.wall + '|' + S.c.mode;
    pauseRotation();
    if (key !== rotationKey) { activeMs = 0; rotationKey = key; }
    if (!rotationActive()) return;
    activeSince = Date.now();
    rotationTimer = setTimeout(function () {
      pauseRotation(); activeMs = 0;
      if (rotationActive()) setLook({ wall: WALLS[(wallIndex(S.c.wall) + 1) % WALLS.length].id }, { row: 'bg' });
    }, Math.max(10, mode().min * QA.minuteMs - activeMs));
  }
  function updateClock() {
    clearTimeout(clockTimer);
    if (document.hidden) return;
    if (top().id === 'home' || isSettingsDetail(top())) renderCaption(top(), homeState(top()));
    clockTimer = setTimeout(updateClock, 60000 - (Date.now() % 60000) + 30);
  }
  function focusStage() { try { stage.focus({ preventScroll: true }); } catch (e) { stage.focus(); } }
  function after() { norm(); render(); syncRotation(); }
  function goScene(name) {
    if (top().id === 'wallpaper') cancelWallpaperTimer(top());
    S.stack = [S.stack[0]]; S.stack[0].f.zone = 'apps'; clearSession(); restoreLook();
    if (name === 'apps') openApps();
    else if (name === 'settings') openSettings();
    else if (name === 'appearance') { openSettings(); top().f.id = 'background'; S.settingsFocus = 'background'; openAppearance('background'); }
    else if (name === 'editor') { openSettings(); openEditor('settings'); }
    after();
  }
  function fit() {
    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = 'scale(' + scale + ')';
    stage.style.left = ((window.innerWidth - 1920 * scale) / 2) + 'px';
    stage.style.top = ((window.innerHeight - 1080 * scale) / 2) + 'px';
  }
  function renderedAction(el) {
    return el.getClientRects().length > 0 && window.getComputedStyle(el).visibility !== 'hidden';
  }
  function focusedAction() {
    var root = isSettingsDetail(top()) ? appearanceEl : sheetEl.hidden ? homeEl : sheetEl, els = root.querySelectorAll('.is-focus[data-action]'), i;
    for (i = 0; i < els.length; i++) if (renderedAction(els[i])) return els[i].getAttribute('data-action');
    return null;
  }
  function activate(action) {
    var root = isSettingsDetail(top()) ? appearanceEl : sheetEl.hidden ? homeEl : sheetEl, els = root.querySelectorAll('[data-action]'), i;
    if (action === 'appearance.bg' && top().id === 'appearance' && top().group === 'background') action = 'background.wallpaper';
    if (action === 'settings.appearance' && top().id === 'settings') action = 'settings.group.background';
    for (i = 0; i < els.length; i++) if (renderedAction(els[i]) && els[i].getAttribute('data-action') === action) { pointAt(els[i]); return true; }
    return false;
  }
  function pointAt(el) {
    var t = top(), v = V[t.id];
    norm();
    if (v.point) v.point(t, el.getAttribute('data-z'), +el.getAttribute('data-i'), el.getAttribute('data-id'));
    norm();
    render();
    syncRotation();
  }

  utilsEl.addEventListener('mouseover', function (ev) {
    var b = ev.target, t = top(), z, i;
    if (utilsEl.className.indexOf('quiet-utils') < 0 || t.lifted) return;
    while (b && b !== utilsEl && !(b.getAttribute && b.getAttribute('data-z'))) b = b.parentNode;
    if (!b || b === utilsEl || (ev.relatedTarget && b.contains(ev.relatedTarget))) return;
    z = b.getAttribute('data-z'); i = Number(b.getAttribute('data-i'));
    if ((t.id !== 'home' || z !== 'util') && (t.id !== 'arrange' || z !== 'ctl')) return;
    if (t.f.zone === z && t.f.u === i) return;
    t.f.zone = z; t.f.u = i;
    if (z === 'util') S.lastUtil = i;
    render();
  });
  stage.addEventListener('click', function (ev) {
    var el = ev.target;
    while (el && el !== stage && !(el.getAttribute && el.getAttribute('data-z'))) el = el.parentNode;
    focusStage();
    if (!el || el === stage) return;
    pointAt(el);
  });
  var heldKeys = {}, okHoldTimer = 0;
  function clearOkHold() {
    if (okHoldTimer) { clearTimeout(okHoldTimer); okHoldTimer = 0; }
  }
  document.addEventListener('keydown', function (ev) {
    var code = ev.keyCode, k = KEYS[code], t;
    if (code === 9) { ev.preventDefault(); return; }
    if (!k || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    ev.preventDefault();
    if (k === 'ok') {
      if (ev.repeat || heldKeys[code]) return;
      heldKeys[code] = true;
      t = top();
      if (t.id === 'home' && t.f.zone === 'apps' && !t.lifted && S.c.layout !== 'list' && S.c.home.length) {
        clearOkHold();
        okHoldTimer = setTimeout(function () {
          okHoldTimer = 0;
          if (top().id === 'home' && top().f.zone === 'apps' && !top().lifted) startHomeMove(top());
        }, 450);
        return;
      }
      press('ok');
      return;
    }
    clearOkHold();
    if (k === 'back') { if (ev.repeat || heldKeys[code]) return; heldKeys[code] = true; }
    press(k);
  });
  document.addEventListener('keyup', function (ev) {
    var code = ev.keyCode, k = KEYS[code];
    delete heldKeys[code];
    if (k === 'ok' && okHoldTimer) {
      clearOkHold();
      press('ok');
    }
  });
  window.addEventListener('blur', function () { clearOkHold(); heldKeys = {}; });
  window.addEventListener('focus', function () { release(); focusStage(); after(); updateClock(); refreshSources(); });
  document.addEventListener('visibilitychange', function () {
    clearOkHold();
    heldKeys = {};
    if (document.hidden) { pauseRotation(); clearTimeout(clockTimer); }
    else {
      release();
      if (S.c.bg === 'photo' && !S.pending && !S.previewBundle && (!committedBundle || S.bundleKey !== bundleKey(S.c))) setLook({}, { transient: true, startup: true });
      after(); updateClock(); fetchWeather(); refreshSources(); focusStage();
    }
  });
  window.addEventListener('resize', fit);

  /* Readable browser checks use the real state and actions, without fake outcomes. */
  var NAV = { left: 'left', right: 'right', up: 'up', down: 'down', ok: 'ok', enter: 'ok', back: 'back', escape: 'back' };
  QA.state = function () {
    var out = serialise(S.c), t = top(), item = t.id === 'appearance' ? detailLocation(t).item : null;
    out.committed = S.c; out.shown = S.shown; out.pending = S.pending; out.view = t.id; out.selected = S.sel;
    out.focusAction = focusedAction(); out.writes = S.writes; out.failedWrites = S.failed; out.error = S.err;
    out.catalog = { loading: catalog.loading, loaded: catalog.loaded, error: catalog.error, ids: ALPHA.slice() };
    out.fonts = { available: LOOK_VALUES.font.slice(), loaded: Object.keys(fontMetrics).filter(function (id) { return !fontMetrics[id].fallback; }), baselineFallback: !!(fontMetrics.manrope && fontMetrics.manrope.fallback), error: S.lookError && S.lookError.type === 'font' ? S.lookError : null };
    out.rotation = { activeMs: activeMs + (activeSince ? Date.now() - activeSince : 0), active: !!activeSince };
    out.draft = t.lifted ? { id: t.lifted.id, order: t.lifted.order.slice(), rowMap: t.lifted.rowMap ? copyRowMap(t.lifted.rowMap) : null } : null;
    out.settingsGroup = t.id === 'wallpaper' ? 'wallpaper' : t.id === 'appearance' ? t.group : null;
    out.focusedChoice = item && item.axis ? { axis: item.axis, value: item.value, action: item.action, disabled: item.disabled } : null;
    out.candidate = out.focusedChoice ? { axis: item.axis, value: item.value, action: item.action, pending: !!S.pending, pendingTarget: S.pending ? S.pending.target : null } : null;
    out.wallpaperPicker = t.id === 'wallpaper' ? { candidate: WALLS[t.i].id, applied: S.c.wall, shown: S.wallShown, pending: t.previewDue || S.wallPending,
      queuedApplying: !!t.applyPending, applyPending: t.applyPending, failed: t.failedId, zone: t.f.zone, top: t.top, visible: WALL_VISIBLE, backdrop: IMG.bg.src } : null;
    out.undo = S.undo.map(function (u) { return u.label; }); out.storageOk = storageOk;
    return JSON.parse(JSON.stringify(out));
  };
  QA.where = function () {
    var action = focusedAction(), active = stage.querySelectorAll('.is-focus[data-action]'), count = 0, name = '';
    Array.prototype.forEach.call(active, function (el) { if (renderedAction(el)) { count++; if (el.getAttribute('data-action') === action) name = el.getAttribute('aria-label') || el.textContent.replace(/\s+/g, ' ').trim(); } });
    return { view: top().id, settingsGroup: top().id === 'wallpaper' ? 'wallpaper' : top().id === 'appearance' ? top().group : null, focus: name, focusAction: action, focusCount: count, wallpaper: S.wallShown, zone: top().f.zone || null };
  };
  QA.ready = function () { return fontsReady && !S.pending && !!S.shown && S.shown.bg === S.c.bg && S.shown.wall === S.c.wall && S.shown.font === S.c.font; };
  QA.nav = function () { var keys = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments); keys.forEach(function (key) { if (!NAV[key]) throw new Error('Unknown key'); press(NAV[key]); }); return QA.state(); };
  QA.holdOk = function () { if (top().id === 'home') startHomeMove(top()); return QA.state(); };
  QA.look = function (patch) { setLook(patch, {}); return QA.state(); };
  QA.scene = function (name) { if (['home', 'apps', 'settings', 'appearance', 'editor'].indexOf(name) < 0) throw new Error('Unknown view'); goScene(name); return QA.state(); };
  QA.activate = function (action) { return activate(action) ? QA.state() : null; };
  QA.actions = function () { var view = isSettingsDetail(top()) ? appearanceEl : sheetEl.hidden ? homeEl : sheetEl; return Array.prototype.filter.call(view.querySelectorAll('[data-action]'), renderedAction).map(function (el) { return el.getAttribute('data-action'); }); };

  /* ---------- Start ---------- */
  cueL.innerHTML = icon('left'); cueR.innerHTML = icon('right');
  initialise();
  setLook({}, { transient: true, startup: true });
  norm(); render(); fit(); focusStage(); updateClock(); fetchWeather(); refreshSources();
  if (window.FrameDevice && FrameDevice.watchSources) FrameDevice.watchSources(applyHardwareSources);
  syncRotation();
})();
