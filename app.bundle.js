/* Expeditie Werkplezier – gecompileerde bundel (gegenereerd, niet handmatig bewerken).
   Bron: de .jsx-bestanden. Na een wijziging opnieuw compileren. */
"use strict";

/* ===== tweaks-panel.jsx ===== */
/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling – build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react – the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability – if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag – ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char – so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings – map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick – checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor – curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts – a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});

/* ===== data.jsx ===== */
/* Expeditie Werkplezier – content data
   All copy in Agathe's warm, first-person Dutch voice. Exported to window. */

/* --- Offerings / trajecten (3-tier aanbod) --- */
const TRAJECTEN = [{
  key: "coaching",
  accent: "rose",
  icon: "messages-square",
  kicker: "1-op-1",
  title: "Persoonlijke coaching",
  tagline: "Samen, in jouw tempo, naar meer rust en grip.",
  body: "Een intensief 1-op-1 traject waarin we jouw vraagstuk bij de kern aanpakken. Je wordt je bewust van je gedrag en patronen, leert je grenzen kennen én bewaken, en stelt een plan van aanpak op dat bij jóu past.",
  points: ["Intakegesprek + 6 sessies van een uur", "Online of bij mij in Waddinxveen", "Praktische opdrachten tussendoor", "App-contact tussen de sessies door"],
  meta: "Traject van 3 maanden",
  cta: "Plan een kennismaking"
}, {
  key: "training",
  accent: "sky",
  icon: "users",
  kicker: "In een groep",
  title: "Groepstraining",
  tagline: "Leren van én met andere moeders die het herkennen.",
  body: "In een kleine groep werk je aan de thema's die jouw balans beïnvloeden. Je koppelt theorie aan de praktijk van je eigen leven en leert daadwerkelijk nieuw gedrag inzetten – met de steun van vrouwen die precies weten hoe het voelt.",
  points: ["4 bijeenkomsten in een vaste groep", "Maximaal 8 deelnemers", "Werkboek en oefeningen", "Blijvend contact na afloop"],
  meta: "Nieuwe groepen elk seizoen",
  cta: "Bekijk de data"
}, {
  key: "advies",
  accent: "gold",
  icon: "building-2",
  kicker: "Voor organisaties",
  title: "Advies & inhuis",
  tagline: "Duurzame inzetbaarheid die verder gaat dan een fruitmand.",
  body: "Advies en trainingen voor organisaties die hun mensen – en juist de werkende moeders in hun team – echt willen ondersteunen. Zodat medewerkers met plezier blijven werken en de kans op uitval daalt.",
  points: ["Workshops en lezingen op maat", "Advies op het gebied van werkdruk", "Programma's voor (jonge) ouders", "Op locatie of online"],
  meta: "Op aanvraag",
  cta: "Vraag een voorstel aan"
}];

/* --- Echte reviews (ervaringen) ---
   Verzameld van klanten van Expeditie Werkplezier. Portretten zijn anonieme
   illustraties (review-1..6) – mensen blijven vaak liever anoniem. Elke review
   heeft een korte pull-quote (quote) en, waar beschikbaar, het hele verhaal (full). */
const REVIEWS = [{
  id: "karin",
  name: "Karin Aafjes",
  role: "Ondernemer",
  rating: 5,
  portrait: 5,
  quote: "Een van de grootste shifts voor mij was het loslaten van perfectionisme. Daardoor ervaar ik meer rust, heb ik meer grip op mijn gevoel en geniet ik weer van kleine dingen.",
  full: ["In eerste instantie dacht ik dat ik er met rust wel zou komen, maar ergens voelde ik dat ik hulp nodig had. Na het lezen van de website en het e-book wist ik dat dit precies was wat ik nodig had.", "Tijdens het traject heb ik geleerd om beter mijn rust te pakken en hulp te vragen. Ik maak nu bewustere keuzes, laat de boel de boel en durf beter mijn grenzen aan te geven. Een van de grootste shifts voor mij was het loslaten van perfectionisme – ik besef dat het ook op een andere manier goed genoeg is. Daardoor ervaar ik meer rust, heb ik meer grip op mijn gevoel en ik geniet weer van kleine dingen.", "Wat me vooral is bijgebleven, is hoeveel er voor mij is veranderd in hoe ik met mezelf en mijn situatie omga. Ik ben ervan overtuigd dat ik zonder dit traject niet zo snel de stap naar mijn eigen bedrijf had gezet."]
}, {
  id: "shalini",
  name: "Shalini Siwpersad",
  role: "Adviseur/manager projectbeheersing · 39",
  rating: 5,
  portrait: 2,
  quote: "Ik ben zo dankbaar dat ik jou heb leren kennen en voor de inzichten. Zonder jou was ik niet de persoon die ik vandaag ben.",
  full: ["Lieve Agathe, ik wilde je even laten weten hoe blij ik ben met onze sessies van vorig jaar. Ik denk er nog vaak aan terug. Je hebt me zo enorm geholpen – door onze gesprekken ben ik een sterker mens geworden.", "Ik voel me stabiel en sterk, weet steeds beter mijn grenzen aan te geven en focus op de dingen die ik echt belangrijk vind. Op het werk gaat het goed; ik heb een mooie kans gekregen om met een nieuwe functie te starten. Dat komt echt door jouw begeleiding.", "Ik ben zo dankbaar dat ik jou heb leren kennen en voor de inzichten die ik heb gekregen. Nogmaals superveel dank!"]
}, {
  id: "elsbeth",
  name: "Elsbeth P.",
  role: "Moeder van een zoon (19) en dochter (14) · 44",
  rating: 5,
  portrait: 4,
  quote: "Ik voel me zelfverzekerder, kan mijn grenzen beter aangeven en ik voel dat ik veel meer kan bereiken dan ik voorheen dacht. Dit geeft mij moed om door te gaan.",
  full: ["Voordat ik bij Agathe kwam, kon ik mijn emoties niet onder woorden brengen. Ik ging helemaal op in negatieve gevoelens, voelde me onzeker en had moeite om beslissingen te nemen.", "Agathe had geduld. Ze leerde mij zelf na te denken over mijn problemen. Ik heb haar ervaren als een warm persoon die het beste met mij voorhad. In de sessies zijn we echt de diepte ingedoken en kwam ik snel tot de kern.", "De grootste ontwikkeling is dat ik minder afhankelijk ben van anderen en veel zelfstandiger en zelfverzekerder ben geworden. Mijn grootste inzicht: ik kan meer bereiken dan ik dacht. Al met al ervaar ik meer rust en vertrouwen dat wat ik doe goed genoeg is."]
}, {
  id: "km",
  name: "K.M.",
  role: "Senior sales- & business development manager · moeder van twee · 39",
  rating: 5,
  portrait: 3,
  quote: "Ik ben blijer, energieker en meer gefocust. Ik krijg meer gedaan op een dag en dit geeft voldoening en rust. Dit straalt direct door naar mijn gezin. Kortom: win-win-win!",
  full: ["De uitdagingen waar ik tegenaan liep waren divers. Ik ben moeder van twee schatten van kinderen, werk fulltime in een uitdagende functie en heb best wat ballen hoog te houden. Omdat ik vrij perfectionistisch ben, had ik behoefte om me minder schuldig te voelen en beter voor mezelf te zorgen.", "Agathe heeft met haar rust alle tijd genomen, vragen gesteld, gespiegeld én theorieën geboden. Het prettige vond ik dat ze zowel op het vlak van opvoeden, op werkgebied als sociaal inzicht zonder oordeel een spiegel voorhoudt.", "Na afronding kan ik me weer beter focussen en kiezen welke activiteiten ik wanneer aandacht geef. Ik krijg letterlijk meer gedaan op een dag. Dat brengt rust en geduld, wat direct doorstraalt naar mijn gezin. Ik ben leuker voor mijn gezin én productiever op mijn werk én liever voor mezelf. Win, win, win."]
}, {
  id: "consultant52",
  name: "Nicolette",
  role: "Consultant",
  rating: 5,
  portrait: 1,
  quote: "Ik voel me goed en energiek. Jouw kennis en kunde en de manier van benaderen heeft mijn vertrouwen versterkt, waardoor ik de juiste keuzes en acties ben gaan inzetten.",
  full: ["Je hebt mij in staat gesteld mijn vraagstukken aan te pakken door me bewuster te maken van mijn gedachten, reactie en handelen. Dit heeft me veel rust opgeleverd en nog steeds, een half jaar na het traject, gaat het heel goed met me. Ik heb meer energie dan ooit.", "Ik heb je ervaren als benaderbaar, toegankelijk, vertrouwenwekkend en ondersteunend. Je bent een prettig en leuk mens – absoluut geen grijze, muizerige psycholoog.", "Je stemt goed af op wie er tegenover je zit en spitst je manier van werken daarop toe. Die combinatie van talenten maakte jou uniek in ons contact."]
}, {
  id: "gva",
  name: "G.v.A., 26",
  role: "",
  rating: 5,
  portrait: 2,
  quote: "Ik vond de sleutel naar mijn eigen geluk.",
  full: ["Ik startte met als belangrijkste doel: voor mezelf durven kiezen en mezelf accepteren. Al lange tijd had ik het gevoel vast te zitten in een leven dat ik eigenlijk niet wilde, in combinatie met een dwang tot perfectie en een laag zelfbeeld.", "Ik heb geleerd mezelf te accepteren en mijn perfectionisme deels los te laten. Mijn grootste eyeopener: de enige die iets kon veranderen, was ikzelf. Dat besef voelde eerst zwaar, maar op den duur zag ik het als de sleutel naar geluk.", "Agathe's begeleiding was rustig en vriendelijk, maar ook heel direct. Ik had het gevoel dat ik mezelf mocht zijn. The best project you'll ever work on is you!"]
}, {
  id: "rk",
  name: "R.K.",
  role: "Arbeidshygiënist",
  rating: 5,
  portrait: 3,
  quote: "Je hebt me de weg gewezen in de wanorde. Van een vol hoofd naar rust.",
  full: ["Je hebt me de weg gewezen in de wanorde door me methodes en technieken te laten zien die helpen bij het beheersbaar houden van stressvolle perioden.", "Je neemt geen genoegen met het eerste antwoord, maar prikt door tot de kern is bereikt. De rust die je uitstraalt komt fijn over en je werkt respectvol – dat geeft een veilig gevoel.", "Ik kwam binnen met een hoofd vol dingen. Nu is het veel rustiger en heb ik tools om dat zo te houden. Ik heb er veel vertrouwen in dat het gaat lukken. En ik heb er weer zin in!"]
}, {
  id: "lh",
  name: "L.H., 27",
  role: "",
  rating: 5,
  portrait: 4,
  quote: "Ik kon mijn belemmerende gedachten ombuigen en hierdoor mijn ‘pusherige ik’ vervangen voor een ‘ik’ die veel functioneler is.",
  full: ["Ik ervoer stress doordat ik mezelf te veel druk oplegde. Die stress vertaalde zich in lichamelijke klachten – de aanleiding om een traject bij Agathe te starten.", "Ik heb geleerd om te gaan met belemmerende gedachten: ik kan ze nu beter afremmen en in een andere richting sturen. Daardoor voel ik me lichamelijk een stuk beter en ga ik makkelijker om met stressvolle situaties.", "Ik voelde me serieus genomen. Je staat nuchter in het leven en begrijpt dat 2 uur mindfulness niet voor iedereen de oplossing is. Het heeft me enorm geholpen!"]
}, {
  id: "ellen",
  name: "Ellen",
  role: "Directiesecretaresse",
  rating: 5,
  portrait: 6,
  quote: "Agathe hield me een spiegel voor. Ik kreeg heldere inzichten waardoor ik weer plezier kreeg in mijn werk. Mijn work-life balance verbeterde waardoor ik meer energie kreeg.",
  full: ["De sessies bij Agathe hebben mij erg goed gedaan. Al enkele jaren liep ik te tobben, was oververmoeid en had geen energie om leuke dingen te doen. Negatieve gevoelens kregen de overhand.", "Aan de hand van praktische oefeningen werd duidelijk hoe ik op diverse zaken reageerde. Agathe hield me een spiegel voor waarmee ik aan de slag kon.", "Met behulp van de coaching heb ik weer plezier in mijn werk. De work-life balance is verbeterd waardoor ik weer meer energie heb."]
}, {
  id: "sema",
  name: "Sema",
  role: "Communicatieadviseur",
  rating: 5,
  portrait: 2,
  quote: "Je hebt me laten ervaren dat ik er als individu mag zijn. Ik begon weer in mijzelf te geloven en heb een geweldige nieuwe baan gevonden.",
  full: ["Jij hebt mij het inzicht gegeven dat ik er als individu mag zijn. Ik begon weer in mezelf te geloven. Dankzij het traject heb ik voor mezelf durven kiezen, een punt achter mijn vorige baan gezet en een nieuwe baan gevonden.", "Je hebt me aan het denken gezet om dieper te graven, kritisch naar mezelf te kijken en in verbinding te komen met mezelf. Je blijft objectief en benadert de zaken vanuit alle kanten.", "Ik vind je een warm en hartelijk persoon. Zelfs na afronding blijf je interesse tonen en vraag je hoe het gaat. Dat vind ik zo bijzonder aan jou."]
}, {
  id: "it29",
  name: "Vrouw, 29",
  role: "IT Consultant",
  rating: 5,
  portrait: 6,
  quote: "Ik ben er beter en sterker uitgekomen voor de rest van mijn leven.",
  full: ["Jong, energiek en niet te stoppen – zo was ik. Tot ik op mijn 26ste last kreeg van vreemde lichamelijke klachten die ik niet kon plaatsen: kortademig, hoofdpijn, duizeligheid en een heel afwezig gevoel.", "Medisch bleek alles in orde, maar ik was geen stap verder. Vanuit mijn werkgever startte ik een traject met een psycholoog – zo kwam ik bij Agathe. Samen werkten we aan een persoonlijk plan.", "Zelfs een jaar later merk ik nog profijt. Ik heb leren omgaan met mijn gedachtegang in specifieke situaties. Agathe komt over als iemand met kennis van zaken, en als persoon iemand bij wie je je gemakkelijk openstelt."]
}, {
  id: "pc",
  name: "P.C., 31",
  role: "",
  rating: 5,
  portrait: 5,
  quote: "Je bent een anker of spiegel waartegen ik hardop kan reflecteren over mijn gedachtegang. Je hebt me meegenomen op mijn persoonlijke ontdekkingsreis.",
  full: ["Hoewel het programma een gestructureerd pad is, schroom jij je niet ervan af te wijken wanneer je denkt dat ik daar beter bij geholpen ben. Flexibel ingesteld, zonder hierin door te schieten.", "Je denkt verder dan het programma en geeft handvatten daarbuiten. Ik vind het prettig dat je me deelgenoot maakt van waar je naartoe wilt met je vragen. Dat maakt een sessie minder zweverig en ik kan gerichter nadenken over het antwoord."]
}, {
  id: "rvd",
  name: "R.v.D., 45",
  role: "",
  rating: 5,
  portrait: 4,
  quote: "Tijdens het traject heb ik mezelf volledig teruggevonden. Ik was al mijn motivatie en enthousiasme kwijt, maar heb dit volledig teruggevonden. Net als mijn energie.",
  full: ["Voordat ik startte had ik enorm last van het feit dat ik al mijn motivatie en enthousiasme kwijt was. Ik had geen doel meer en voelde me lusteloos en enorm vermoeid.", "Gedurende het traject heb ik gerust, gesport en meer tijd voor mezelf vrijgemaakt. Het werd duidelijk wat ik wilde. Ik heb mezelf weer teruggevonden – en ook mijn positieve energie, enthousiasme en motivatie.", "Ik had direct het gevoel dat ik echt mijn ei kwijt kon bij Agathe. Tijdens dit traject heb ik geleerd mijn grenzen aan te geven en dat geeft echt rust."]
}, {
  id: "nh",
  name: "N.H., 37",
  role: "",
  rating: 5,
  portrait: 3,
  quote: "Ik voel me veel meer ontspannen. Je bent voor mij uniek omdat je me echt met een andere bril hebt leren kijken. Ik wist niet dat dit zo veel invloed kon hebben op hoe ik me voel.",
  full: ["Ik heb je ervaren als iemand die graag anderen helpt in moeilijke tijden. Voor mij heb je veel betekend, omdat je me weer op de goede weg hebt gezet waar ik even van af was gegleden.", "Je grootste talenten: je kunt heel goed luisteren en je goed inleven. Je hebt me op een andere manier leren denken – een manier waar ik zelf nooit op zou komen.", "Ik voel me een stuk rustiger in mijn werk en ervaar veel minder druk. Het is er nog wel, maar ik ga er echt anders mee om."]
}, {
  id: "kvb",
  name: "K.v.B., 53",
  role: "Automatiseerder",
  rating: 5,
  portrait: 1,
  quote: "Ik heb de teugels van mijn eigen leven weer in handen en voel me beter dan ooit.",
  full: ["Na onze gesprekken is er veel gebeurd. Door jouw begeleiding heb ik de teugels van mijn eigen leven weer in eigen handen gekregen. Ik voel me veel beter, en volgens mijn werkgever straal ik dat ook uit.", "Je laat zien dat er meerdere manieren zijn om naar een situatie te kijken. Dat genereert positiviteit en leidt tot inzichten om tot oplossingen te komen. Je grootste talenten zijn je positieve uitstraling en de oprechte aandacht die je geeft.", "Ik heb heel veel gehad aan jouw hulp en ben je er erg dankbaar voor."]
}, {
  id: "ro",
  name: "R.O.",
  role: "",
  rating: 5,
  portrait: 2,
  quote: "Agathe is een coach pur sang. Ik heb absoluut meer inzicht gekregen in mijn gedrag, drijfveren en valkuilen en kan nu veel beter mijn grenzen aangeven en bewaken.",
  full: ["Het totale traject heb ik niet alleen als heel zinvol, maar ook als erg prettig ervaren. Agathe is in haar benadering heel beheerst, rustig en weldadig relaxt. Hierdoor voelde ik me direct bij de intake op mijn gemak.", "Doordat zij kalm en intensief luistert, voel je je gehoord. Een grote kwaliteit is dat zij stuurt zonder dat je je daarvan bewust bent. Ergo: een coach pur sang.", "De rode draad van mijn valkuilen was die van een ‘pleaser’. Nu ik een aantal keer duidelijk ‘nee’ heb verkocht, merk ik dat dit juist vrijwel altijd begrepen en geaccepteerd wordt."]
}, {
  id: "instrumentmaker",
  name: "Vrouw",
  role: "Instrumentmaker",
  rating: 5,
  portrait: 5,
  quote: "Ik sta weer in mijn kracht door deze resultaatgerichte coaching. Agathe’s manier van begeleiden werkt snel en effectief waardoor mijn stress al snel verminderde.",
  full: ["Mijn reden van aanmelding: burn-out, zowel fysiek als mentaal het gevoel op een dood punt te zijn, ondanks een prettige werksfeer.", "De methode bestond uit drie sessies van drie à vier uur, waarin verleden, heden en toekomst worden besproken. De sessies leken me aanvankelijk lang, maar bleken juist door hun lengte zeer effectief.", "Ik leerde hoe ik beter in mijn eigen kracht kan staan, situaties positiever kan benaderen en stress kan verminderen. Ik vond Agathe betrouwbaar, professioneel en to the point – zonder dat dit ten koste ging van warmte en betrokkenheid."]
}];
const reviewById = Object.fromEntries(REVIEWS.map(r => [r.id, r]));
const pickReviews = ids => ids.map(id => reviewById[id]).filter(Boolean);

/* Curated subsets per surface (distinct portraits within each set) */
const TESTIMONIALS = pickReviews(["km", "shalini", "consultant52", "rvd", "ellen"]);
const OA_REVIEWS = pickReviews(["consultant52", "sema", "km"]);
const DEEPDIVE_REVIEWS = pickReviews(["gva", "rk", "ro"]);
const TRAJECT_REVIEWS = pickReviews(["sema", "consultant52", "nh", "it29"]);
const BEDANKT_REVIEWS = pickReviews(["km", "gva", "nh"]);

/* --- Blog posts --- */
const POSTS = [{
  cat: "Rust in je hoofd",
  accent: "sage",
  title: "Waarom jouw to-do-lijst nooit af is (en dat oké is)",
  excerpt: "Het gevoel dat je nooit klaar bent, herken je dat? In dit artikel deel ik waarom je hoofd zo vol zit – en drie manieren om weer overzicht te krijgen.",
  read: "5 min",
  date: "12 mei 2026"
}, {
  cat: "Energie",
  accent: "rose",
  title: "Het emmertje dat overloopt: zo herken je de signalen op tijd",
  excerpt: "Burn-out komt zelden uit het niets. Deze subtiele signalen geeft je lijf af – lang voordat het licht uitgaat.",
  read: "6 min",
  date: "28 april 2026"
}, {
  cat: "Loslaten",
  accent: "sky",
  title: "Werk loslaten na 17:00 uur: 5 dingen die mij hielpen",
  excerpt: "Mentaal afsluiten is een vaardigheid, geen karaktertrek. Deze vijf rituelen maakten voor mij het verschil.",
  read: "4 min",
  date: "9 april 2026"
}, {
  cat: "Grenzen",
  accent: "gold",
  title: "Nee zeggen zonder schuldgevoel – een kleine handleiding",
  excerpt: "Grenzen stellen voelt voor veel moeders als egoïsme. Ik leg uit waarom het juist het tegenovergestelde is.",
  read: "5 min",
  date: "21 maart 2026"
}, {
  cat: "Genieten",
  accent: "sage",
  title: "Aandacht is het mooiste cadeau (ook aan jezelf)",
  excerpt: "‘Alles wat je aandacht geeft groeit.’ Wat gebeurt er als je die aandacht eens naar binnen richt?",
  read: "4 min",
  date: "3 maart 2026"
}, {
  cat: "Balans",
  accent: "rose",
  title: "De mythe van de perfecte balans tussen werk en gezin",
  excerpt: "Balans is geen weegschaal die altijd recht hangt. Een eerlijk verhaal over schipperen, kiezen en loslaten.",
  read: "7 min",
  date: "16 februari 2026"
}];

/* --- FAQ --- */
const FAQ = [{
  q: "Voor wie is Expeditie Werkplezier precies?",
  a: "Voor ambitieuze, werkende moeders met jonge kinderen die een uitdagende baan of eigen onderneming combineren met hun gezin – en merken dat het te veel wordt. Herken je je daarin? Dan ben je hier op de juiste plek."
}, {
  q: "Ben je een psycholoog? Krijg ik dan een ‘diagnose’?",
  a: "Ik ben arbeids- en organisatiepsycholoog en stresscoach. Ik werk praktisch en oplossingsgericht, niet met diagnoses of langdurige therapie. We kijken naar wat jou helpt om weer met rust en plezier te leven en werken."
}, {
  q: "Hoe ziet een coachingstraject eruit?",
  a: "We starten met een kennismaking. Daarna volgen we samen een traject van een aantal sessies, met praktische opdrachten ertussendoor en app-contact als je het nodig hebt. Alles in jouw tempo en afgestemd op jouw situatie."
}, {
  q: "Kan het ook online?",
  a: "Zeker. Veel moeders vinden online juist fijn omdat het makkelijk in te plannen is rond werk en gezin. Liever live? Dan ben je welkom bij mij in Waddinxveen."
}, {
  q: "Vergoedt mijn werkgever dit?",
  a: "Steeds vaker wel. Coaching valt regelmatig onder een persoonlijk ontwikkelbudget of duurzame-inzetbaarheidsregeling. Ik denk graag mee over hoe je dit bespreekbaar maakt."
}, {
  q: "Ik twijfel nog of dit iets voor mij is.",
  a: "Helemaal logisch. Begin gerust met het gratis ebook, of plan een vrijblijvende kennismaking. Geen verplichtingen – gewoon even kennismaken en kijken of het klikt."
}];

/* --- Trust / social proof stats --- */
const TRUST = [["20+", "jaar als psycholoog & HR"], ["150+", "moeders begeleid"], ["4,9", "gemiddelde waardering"], ["1", "eerlijk verhaal, uit ervaring"]];

/* --- 1-op-1 programmanaam --- */
const PROGRAMMA = {
  naam: "Rust Ruimte Regie",
  sub: "Het complete 1-op-1 herstel- en groeitraject"
};

/* --- Home testimonials --- */
const HOME_REVIEWS = pickReviews(["karin", "shalini", "consultant52"]);
Object.assign(window, {
  TRAJECTEN,
  TESTIMONIALS,
  REVIEWS,
  pickReviews,
  OA_REVIEWS,
  DEEPDIVE_REVIEWS,
  TRAJECT_REVIEWS,
  BEDANKT_REVIEWS,
  POSTS,
  FAQ,
  TRUST,
  HOME_REVIEWS,
  PROGRAMMA
});

/* ===== core.jsx ===== */
/* Expeditie Werkplezier – core components
   Icon, Button, Header, EbookModal, VideoLightbox, Footer. Exported to window. */
const {
  useState,
  useEffect,
  useRef
} = React;
function Icon({
  name,
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: style
  });
}
function Button({
  variant = "primary",
  size,
  block,
  icon,
  iconRight,
  children,
  onClick,
  type,
  href,
  target
}) {
  const cls = ["ewk-btn", `ewk-btn--${variant}`, size === "lg" ? "ewk-btn--lg" : "", size === "sm" ? "ewk-btn--sm" : "", block ? "ewk-btn--block" : ""].filter(Boolean).join(" ");
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon
  }), children, iconRight && /*#__PURE__*/React.createElement(Icon, {
    name: iconRight
  }));
  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      className: cls,
      href: href,
      target: target,
      rel: target === "_blank" ? "noopener noreferrer" : undefined,
      onClick: onClick
    }, inner);
  }
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    onClick: onClick,
    type: type || "button"
  }, inner);
}
const NAV = ["Home", "Over Agathe", "Aanbod", "Ervaringen", "Contact"];
function Header({
  scrolled,
  active,
  onNav,
  onScan,
  onMenu,
  menuOpen
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "ewk-header" + (scrolled ? " is-scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ewk-header__logo",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Home");
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-full.svg",
    alt: "Expeditie Werkplezier"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "ewk-nav"
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    className: active === n ? "is-active" : "",
    onClick: e => {
      e.preventDefault();
      onNav(n);
    }
  }, n))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-header__actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-social"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ewk-iconbtn",
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/agathe-hania-893577338/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ewk-iconbtn",
    title: "Instagram",
    href: "https://www.instagram.com/agathehania/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-show-desktop"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onScan,
    icon: "clipboard-list"
  }, "Gratis scan")), /*#__PURE__*/React.createElement("button", {
    className: "ewk-iconbtn ewk-hamb",
    onClick: onMenu,
    title: "Menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: menuOpen ? "x" : "menu"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-mobile" + (menuOpen ? " is-open" : "")
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    className: active === n ? "is-active" : "",
    onClick: e => {
      e.preventDefault();
      onNav(n);
    }
  }, n)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "clipboard-list",
    onClick: onScan
  }, "Doe de gratis scan"))));
}
const MODAL_CONTENT = {
  ebook: {
    title: "In 7 stappen van werkdruk naar werkgeluk",
    desc: "Gratis en vooral praktisch ebook met de 7 stappen naar een energiek en comfortabel leven. Vul je gegevens in en je ontvangt hem direct in je inbox.",
    button: "Stuur mij het ebook",
    success: "Je ebook is onderweg naar"
  },
  scan: {
    title: "Doe de gratis Stress & Energiescan",
    desc: "Ontdek of jouw lichaam al signalen geeft dat het te veel wordt – en wat je kunt doen om weer rust en energie te krijgen. Je ontvangt de scan direct in je inbox.",
    button: "Stuur mij de scan",
    success: "Je Stress & Energiescan is onderweg naar"
  }
};
function EbookModal({
  open,
  kind = "ebook",
  onClose
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const c = MODAL_CONTENT[kind] || MODAL_CONTENT.ebook;
  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setName("");
      setEmail("");
    }
  }, [open]);
  function submit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-modal__scrim" + (open ? " is-open" : ""),
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "ewk-modal__close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), !submitted ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    className: "ewk-modal__mark",
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("h3", null, c.title), /*#__PURE__*/React.createElement("p", null, c.desc), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-field"
  }, /*#__PURE__*/React.createElement("label", null, "Je naam"), /*#__PURE__*/React.createElement("input", {
    className: "ewk-input",
    placeholder: "Sanne",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-field"
  }, /*#__PURE__*/React.createElement("label", null, "E-mailadres"), /*#__PURE__*/React.createElement("input", {
    className: "ewk-input",
    type: "email",
    placeholder: "jij@voorbeeld.nl",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    type: "submit",
    iconRight: "arrow-right"
  }, c.button)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--ew-ink-400)",
      margin: "14px 0 0",
      textAlign: "center"
    }
  }, "Geen spam. Je kunt je altijd weer afmelden."))) : /*#__PURE__*/React.createElement("div", {
    className: "ewk-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-success__ring"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("h3", null, "Check je inbox", name ? `, ${name}` : "", "!"), /*#__PURE__*/React.createElement("p", null, c.success, " ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ew-pine-600)"
    }
  }, email), ". En zet vooral die eerste stap."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    onClick: onClose
  }, "Sluiten"))));
}
function VideoLightbox({
  open,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-modal__scrim" + (open ? " is-open" : ""),
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "min(880px,100%)",
      aspectRatio: "16/9",
      background: "#1f3d3d",
      borderRadius: 20,
      boxShadow: "var(--ew-shadow-lg)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "ewk-modal__close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), open && /*#__PURE__*/React.createElement("video", {
    src: "assets/bedrijfsvideo.mp4",
    controls: true,
    autoPlay: true,
    playsInline: true,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      background: "#1f3d3d"
    }
  })));
}
function Footer({
  onScan,
  onNav,
  onCookiePrefs
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "ewk-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-footer__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    className: "foot-logo",
    src: "assets/logo-full-contra.svg",
    alt: "Expeditie Werkplezier"
  }), /*#__PURE__*/React.createElement("p", null, "Speciaal voor werkende moeders die meer grip willen op hun overvolle agenda \xE9n hoofd \u2013 zodat ze weer kunnen genieten van wat echt belangrijk is."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-footer__social"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/agathe-hania-893577338/",
    title: "LinkedIn",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/agathehania/",
    title: "Instagram",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram"
  })), /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl",
    title: "Mail"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Menu"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-footer__links"
  }, NAV.map(n => /*#__PURE__*/React.createElement("li", {
    key: n
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(n);
    }
  }, n))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Gratis ", /*#__PURE__*/React.createElement("b", null, "scan")), /*#__PURE__*/React.createElement("p", null, "Ontdek in 10 minuten wat er \xE9cht speelt in jouw brein en lichaam \u2013 en wat jouw eerste stap is naar meer rust en energie."), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    onClick: onScan,
    icon: "clipboard-list"
  }, "Doe de gratis scan"))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-footer__bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 Agathe Hania \xB7 Expeditie Werkplezier \xB7 Waddinxveen \xB7 KVK 57284946 \xB7 BTW NL001412727B96"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Voorwaarden");
    }
  }, "Algemene Voorwaarden"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Privacy");
    }
  }, "Privacyverklaring"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Cookies");
    }
  }, "Cookiebeleid"), " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onCookiePrefs && onCookiePrefs();
    }
  }, "Cookievoorkeuren")))));
}

/* ---------------- Cookie consent ---------------- */
const EWK_CONSENT_KEY = "ewk-cookie-consent";
function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(EWK_CONSENT_KEY) || "null");
  } catch (e) {
    return null;
  }
}
function writeConsent(val) {
  try {
    localStorage.setItem(EWK_CONSENT_KEY, JSON.stringify({
      ...val,
      ts: Date.now()
    }));
  } catch (e) {}
}
function CookieBanner({
  open,
  onChoice,
  onNav
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-cookie",
    role: "dialog",
    "aria-label": "Cookievoorkeuren",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-cookie__card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-cookie__ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cookie"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-cookie__body"
  }, /*#__PURE__*/React.createElement("h4", null, "Even over cookies"), /*#__PURE__*/React.createElement("p", null, "Ik gebruik alleen ", /*#__PURE__*/React.createElement("b", null, "functionele cookies"), " om de site goed te laten werken. Analytische cookies (geanonimiseerd) plaats ik alleen met jouw toestemming \u2013 nooit voor advertenties of tracking. Meer lezen? Zie mijn", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Cookies");
    }
  }, "cookiebeleid"), "."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-cookie__actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onChoice({
      functional: true,
      analytics: true
    })
  }, "Alle cookies accepteren"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => onChoice({
      functional: true,
      analytics: false
    })
  }, "Alleen functioneel"))), /*#__PURE__*/React.createElement("button", {
    className: "ewk-cookie__close",
    title: "Alleen functioneel",
    "aria-label": "Sluiten \u2013 alleen functionele cookies",
    onClick: () => onChoice({
      functional: true,
      analytics: false
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))));
}
Object.assign(window, {
  Icon,
  Button,
  Header,
  EbookModal,
  VideoLightbox,
  Footer,
  NAV,
  CookieBanner,
  readConsent,
  writeConsent
});

/* ===== sections.jsx ===== */
/* Expeditie Werkplezier – page sections & reusable blocks */
const {
  useState: useSt,
  useEffect: useEf,
  useRef: useRf
} = React;

/* ---------- Reusable portrait in the gradient ring ---------- */
function Portrait({
  size,
  label,
  play,
  onPlay,
  src
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-portrait",
    style: size ? {
      width: size
    } : null
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-portrait__inner"
  }, /*#__PURE__*/React.createElement("img", {
    src: src || "assets/photos/portrait-9295.jpg",
    alt: label || "Agathe Hania"
  })), play && /*#__PURE__*/React.createElement("button", {
    className: "ewk-play",
    onClick: onPlay
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-play__dot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play"
  })), /*#__PURE__*/React.createElement("span", null, "Bekijk mijn verhaal")));
}
function Eyebrow({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "ewk-eyebrow"
  }, children);
}

/* Avatar for review cards – anonymous illustrated portrait, or initial fallback */
function ReviewAvatar({
  r
}) {
  if (r && r.portrait) {
    return /*#__PURE__*/React.createElement("span", {
      className: "ewk-avatar ewk-avatar--photo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/reviews/review-" + r.portrait + ".jpg",
      alt: "",
      loading: "lazy"
    }));
  }
  return /*#__PURE__*/React.createElement("span", {
    className: "ewk-avatar"
  }, r && r.name ? r.name[0] : "?");
}
function SectionHead({
  eyebrow,
  title,
  sub,
  align
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-section__head" + (align === "left" ? " is-left" : "")
  }, eyebrow && /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), sub && /*#__PURE__*/React.createElement("p", {
    className: "ewk-section__sub"
  }, sub));
}

/* =========================================================================
   TRUST BAR (standalone, for non-statement heroes)
   ========================================================================= */
function TrustBar() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-trustbar",
    style: {
      backgroundColor: "rgb(19, 106, 106)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-trust"
  }, TRUST.map(([n, l]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-trust__item",
    key: l
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-trust__num"
  }, n), /*#__PURE__*/React.createElement("span", {
    className: "ewk-trust__lbl"
  }, l)))));
}

/* =========================================================================
   RECOGNITION + BENEFITS
   ========================================================================= */
const SYMPTOMS = [["zap", "Ik ben ", "continu moe", " en heb weinig energie."], ["flame", "Ik heb een ", "kort lontje", "."], ["briefcase", "Ik kan mijn werk ", "moeilijk loslaten", "."], ["waves", "Ik heb moeite om me ", "volledig te ontspannen", "."], ["cloud-rain", "Ik voel me ", "onrustig en pieker", " veel."], ["brain", "Mijn hoofd is ", "overprikkeld", ", ik concentreer me slecht."]];
const BENEFITS = [["Je ", "meer rust", " hebt in je hoofd en lijf."], ["Je meer energie hebt en ", "beter slaapt", "."], ["Je af en toe ", "de boel de boel", " kunt laten."], ["Je veel meer kunt ", "genieten", " van het moment."], ["Meer zou kunnen toegeven aan je ", "eigen behoeftes", "."], ["Je je ", "werk beter zou kunnen loslaten", "."]];
function Recognition() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Je bent niet de enige",
    title: "Ben jij een <em>ambitieuze moeder</em> en herken jij je hierin?"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-list"
  }, SYMPTOMS.map(([ic, a, b, c], i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic
  })), /*#__PURE__*/React.createElement("span", null, a, /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, b), c)))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "Dit kan echt anders!")));
}
function Benefits() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Stel je eens voor",
    title: "Hoe zou jij je voelen als.."
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-list"
  }, BENEFITS.map(([a, b, c], i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("span", null, a, /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, b), c))))));
}

/* =========================================================================
   AANBOD – three variants: cards · tiers · spotlight
   ========================================================================= */
function Aanbod({
  variant,
  onNav,
  sand
}) {
  const Inner = variant === "tiers" ? AanbodTiers : variant === "spotlight" ? AanbodSpotlight : AanbodCards;
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section" + (sand ? " ewk-section--sand" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Werk samen met mij",
    title: "Hoe ik je kan helpen",
    sub: "Of je nu liever 1-op-1 werkt, de kracht van een groep zoekt of binnen je organisatie iets wilt veranderen \u2013 er is een vorm die bij je past."
  }), /*#__PURE__*/React.createElement(Inner, {
    onNav: onNav
  })));
}

/* A – three even cards */
function AanbodCards({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-cards"
  }, TRAJECTEN.map(o => /*#__PURE__*/React.createElement("div", {
    className: "ewk-offer ewk-offer--" + o.accent,
    key: o.key
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-offer__ic ewk-offer__ic--" + o.accent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: o.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__kicker"
  }, o.kicker), /*#__PURE__*/React.createElement("h3", null, o.title), /*#__PURE__*/React.createElement("p", null, o.body), /*#__PURE__*/React.createElement("a", {
    className: "ewk-offer__link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(o.key === "coaching" ? "Traject" : "Aanbod");
    }
  }, "Meer weten ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right"
  })))));
}

/* B – numbered horizontal tiers with included-points */
function AanbodTiers({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-tiers"
  }, TRAJECTEN.map((o, i) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-tier ewk-tier--" + o.accent,
    key: o.key
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-tier__num"
  }, /*#__PURE__*/React.createElement("span", null, String(i + 1).padStart(2, "0"))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-tier__main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__kicker"
  }, o.kicker), /*#__PURE__*/React.createElement("h3", null, o.title), /*#__PURE__*/React.createElement("p", {
    className: "ewk-tier__tag"
  }, o.tagline), /*#__PURE__*/React.createElement("p", null, o.body)), /*#__PURE__*/React.createElement("div", {
    className: "ewk-tier__side"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "ewk-checks"
  }, o.points.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), p))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-tier__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-tier__meta"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), o.meta), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconRight: "arrow-right",
    onClick: () => onNav(o.key === "coaching" ? "Traject" : "Contact")
  }, o.cta))))));
}

/* C – one spotlight offer + two compact */
function AanbodSpotlight({
  onNav
}) {
  const [main, ...rest] = TRAJECTEN;
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-spotlight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-spot ewk-spot--main ewk-offer--" + main.accent
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-spot__badge"
  }, "Meest gekozen"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-offer__ic ewk-offer__ic--" + main.accent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: main.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__kicker"
  }, main.kicker), /*#__PURE__*/React.createElement("h3", null, main.title), /*#__PURE__*/React.createElement("p", {
    className: "ewk-tier__tag"
  }, main.tagline), /*#__PURE__*/React.createElement("p", null, main.body), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-checks ewk-checks--2col"
  }, main.points.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), p))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-spot__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-tier__meta"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), main.meta), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav("Traject")
  }, main.cta))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-spot__col"
  }, rest.map(o => /*#__PURE__*/React.createElement("div", {
    className: "ewk-spot ewk-spot--mini ewk-offer--" + o.accent,
    key: o.key
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-offer__ic ewk-offer__ic--" + o.accent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: o.icon
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__kicker"
  }, o.kicker), /*#__PURE__*/React.createElement("h3", null, o.title), /*#__PURE__*/React.createElement("p", null, o.tagline), /*#__PURE__*/React.createElement("a", {
    className: "ewk-offer__link",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Aanbod");
    }
  }, "Meer weten ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right"
  })))))));
}

/* =========================================================================
   ABOUT TEASER (home) – split photo + story intro
   ========================================================================= */
function AboutTeaser({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__photo"
  }, /*#__PURE__*/React.createElement(Portrait, {
    size: "100%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Over Agathe"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Ik heb het zelf meegemaakt \u2013 daarom snap ik je."), /*#__PURE__*/React.createElement("p", null, "Ik ben Agathe, psycholoog en stresscoach, vrouw van Bas en moeder van twee meiden. Jaren werkte ik als HR-manager, vol energie en drive. Tot na de geboorte van mijn eerste dochter", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " zo maar, pats boem, het licht uitging"), "."), /*#__PURE__*/React.createElement("p", null, "Die burn-out leerde me hoe het anders kan. Nu help ik andere moeders om diezelfde weg te vinden \u2013 no-nonsense, gebaseerd op feiten en super praktisch."), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    iconRight: "arrow-right",
    onClick: () => onNav("Over Agathe")
  }, "Lees mijn verhaal"))));
}

/* =========================================================================
   MISSION band
   ========================================================================= */
function Mission() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-mission"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ewk-mission__mark",
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-mission__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-mission__eyebrow"
  }, "Missie"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-mission__quote"
  }, "\u201CIk geloof in een wereld waarin ", /*#__PURE__*/React.createElement("b", null, "vrouwelijke professionals met jonge kinderen"), " zich krachtig staande kunnen houden. Een wereld waarin zij een uitdagende baan kan combineren met haar gezin ", /*#__PURE__*/React.createElement("b", null, "zonder dat zij zichzelf voorbij loopt."), "\u201D"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-aristotle"
  }, /*#__PURE__*/React.createElement("p", null, "\u201CAlles wat je aandacht geeft groeit\u201D"), /*#__PURE__*/React.createElement("span", null, "~ Aristoteles \xB7 Filosoof"))));
}

/* =========================================================================
   TESTIMONIALS carousel
   ========================================================================= */
function Testimonials({
  wash
}) {
  const [i, setI] = useSt(0);
  const n = TESTIMONIALS.length;
  const go = d => setI(p => (p + d + n) % n);
  useEf(() => {
    const t = setInterval(() => setI(p => (p + 1) % n), 7000);
    return () => clearInterval(t);
  }, [n]);
  const t = TESTIMONIALS[i];
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section" + (wash ? " ewk-section--wash" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Ervaringen",
    title: "Wat moeders v\xF3\xF3r jou ervoeren",
    sub: "Echte verhalen van vrouwen die de stap zetten \u2013 van overleven naar weer genieten."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-carousel"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ewk-carousel__arrow",
    onClick: () => go(-1),
    "aria-label": "Vorige"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-quotebig"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    style: {
      width: 40,
      height: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, Array.from({
    length: t.rating
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-quotebig__q"
  }, t.quote), /*#__PURE__*/React.createElement("div", {
    className: "ewk-quotebig__who"
  }, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: t
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("br", null), t.role))), /*#__PURE__*/React.createElement("button", {
    className: "ewk-carousel__arrow",
    onClick: () => go(1),
    "aria-label": "Volgende"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-dots"
  }, TESTIMONIALS.map((_, k) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "ewk-dot" + (k === i ? " is-active" : ""),
    onClick: () => setI(k),
    "aria-label": "Ga naar " + (k + 1)
  })))));
}

/* =========================================================================
   BLOG teaser (3 latest)
   ========================================================================= */
function BlogTeaser({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-section__head is-left ewk-blog__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Van het blog"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Lees, herken, en zet de eerste stap")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    onClick: () => onNav("Blog")
  }, "Alle artikelen")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-cards"
  }, POSTS.slice(0, 3).map(p => /*#__PURE__*/React.createElement(PostCard, {
    key: p.title,
    p: p,
    onNav: onNav
  })))));
}
function PostCard({
  p,
  onNav
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "ewk-post",
    onClick: () => onNav("Blog")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-post__img ewk-post__img--" + p.accent
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-chip ewk-chip--" + p.accent
  }, p.cat)), /*#__PURE__*/React.createElement("div", {
    className: "ewk-post__body"
  }, /*#__PURE__*/React.createElement("h3", null, p.title), /*#__PURE__*/React.createElement("p", null, p.excerpt), /*#__PURE__*/React.createElement("div", {
    className: "ewk-post__meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar"
  }), p.date), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), p.read))));
}

/* =========================================================================
   FINAL CTA
   ========================================================================= */
function FinalCTA({
  onNav,
  onScan,
  onEbook
}) {
  const goScan = onScan || onEbook;
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Klaar voor de eerste stap?"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Het kan \xE9cht anders. Laten we kennismaken."), /*#__PURE__*/React.createElement("p", null, "Geen verplichtingen \u2013 gewoon een eerlijk gesprek over waar jij tegenaan loopt en wat je nodig hebt."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Plan een kennismaking"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    icon: "clipboard-list",
    onClick: goScan
  }, "Doe de gratis scan"))));
}

/* =========================================================================
   SCAN CTA band (free lead magnet) – replaces the old ebook split
   ========================================================================= */
function ScanCTA({
  onScan
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Gratis eerste stap",
    title: "Begin vandaag \u2013 met de gratis Stress & Energiescan",
    sub: "Je hoofd staat nooit stil en stoppen lukt niet meer? Ontdek in 10 minuten wat er \xE9cht speelt in jouw brein en lichaam \u2013 en wat jouw eerste stap is naar meer rust en energie."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-ebook"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-ebook__cover"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "scan")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Stress & Energiescan"), /*#__PURE__*/React.createElement("p", null, "Geen standaardtest, maar concreet inzicht in jouw stressprofiel. Je stopt met twijfelen aan jezelf en weet wat je nodig hebt. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Gratis"), ", in een paar minuten, met direct inzicht."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "clipboard-list",
    onClick: onScan
  }, "Doe de gratis scan"))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-quotecard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-quotecard__q"
  }, "\u201CIk dacht echt dat het aan mij lag. Maar door de uitleg viel alles op zijn plek. Dat gaf zoveel rust in mijn hoofd.\u201D"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-quotecard__who"
  }, "Uit de Stress & Energiescan")))));
}

/* =========================================================================
   FAQ accordion (used on Aanbod & Contact)
   ========================================================================= */
function FaqList({
  items
}) {
  const list = items || FAQ;
  const [open, setOpen] = useSt(0);
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-faq"
  }, list.map((f, i) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-faq__item" + (open === i ? " is-open" : ""),
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    className: "ewk-faq__q",
    onClick: () => setOpen(open === i ? -1 : i)
  }, /*#__PURE__*/React.createElement("span", null, f.q), /*#__PURE__*/React.createElement(Icon, {
    name: open === i ? "minus" : "plus"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-faq__a"
  }, /*#__PURE__*/React.createElement("p", null, f.a)))));
}
Object.assign(window, {
  Portrait,
  Eyebrow,
  SectionHead,
  ReviewAvatar,
  TrustBar,
  Recognition,
  Benefits,
  Aanbod,
  AboutTeaser,
  Mission,
  Testimonials,
  ScanCTA,
  BlogTeaser,
  PostCard,
  FinalCTA,
  FaqList
});

/* ===== traject.jsx ===== */
/* Expeditie Werkplezier – 1-op-1 traject salespagina */

const TRJ_RECOG = ["Je hebt een groot verantwoordelijkheidsgevoel en vindt het moeilijk om dingen los te laten.", "Je legt de lat hoog voor jezelf, op je werk, thuis en in alles wat je doet.", "Je bent gewend om door te gaan, ook als je eigenlijk al over je grens heen bent.", "Je voelt je regelmatig opgejaagd, overprikkeld of moe.", "Je slaapt minder diep, herstelt minder goed en hebt minder geduld dan je zou willen.", "Je weet ergens wel dat het anders moet, maar het lukt niet om dat vast te houden in je dagelijks leven."];
const TRJ_KRIJG = ["Een uitgebreide intake, zodat we helder in kaart brengen wat er speelt, waar je vastloopt en wat je nodig hebt.", "Persoonlijke coachingsessies, volledig afgestemd op jouw situatie.", "1-op-1 begeleiding op maat – geen standaardaanpak, maar passend bij jouw leven en persoonlijkheid.", "Een duidelijk en uitgewerkt stappenplan, zodat je niet blijft hangen in losse inzichten.", "De juiste stappen in de juiste volgorde, zodat je niet hoeft te gokken wat je wanneer doet.", "Een concreet persoonlijk plan voor je dagelijkse leven, om rust, energie en balans vast te houden.", "Handvatten om terugval te voorkomen, zodat je niet alleen herstelt maar duurzaam anders gaat leven."];
const TRJ_WERK = ["meer focus", "meer overzicht", "meer mentale scherpte", "beter prioriteren", "helderder nadenken", "efficiënter werken"];
const TRJ_STAPPEN = [["Inzicht in jouw persoonlijkheid in relatie tot stress", "Je hebt vast mooie eigenschappen zoals zorgzaamheid, perfectionisme en doorzettingsvermogen. Alleen: als je die altijd automatisch inzet, werken ze tegen je. Je ontdekt welke patronen jou gevoeliger maken voor stress en wat je écht nodig hebt. Want zelfkennis is de eerste stap naar meer regie."], ["Ontspanning, herstel & energie", "Even bijkomen. Dat klinkt misschien te  simpel, maar is echt de basis van alles. Je leert hoe je ontspanning inbouwt zodat lichaam en hoofd kunnen herstellen. Met meer energie kun je helder denken en pas dan kun je bewuste keuzes maken."], ["Mindset", "Soms weet je precies wat je wilt veranderen, maar lukt het toch niet. Dat komt vaak door overtuigingen die je onbewust tegenhouden. Je maakt ze zichtbaar en leert vanuit een positievere blik naar jezelf te kijken, zodat verandering beklijft."], ["Omgeving", "Jij staat nu steviger. Maar de wereld om je heen verandert niet zomaar mee. Je ontdekt hoe je omgaat met veeleisende situaties en verwachtingen van anderen, zónder jezelf te verliezen, zelfs in drukke tijden."], ["Plan van aanpak", "Alle inzichten en nieuwe gewoontes leg je vast in een persoonlijk plan. Concreet, overzichtelijk en gemaakt om op terug te vallen. Zo weet je altijd waar je naartoe werkt en val je niet terug in oude patronen."]];
const TRJ_FAQ = [{
  q: "Hoe weet ik of dit traject bij mij past?",
  a: "Daar is het kennismakingsgesprek voor. We kijken samen waar je nu staat, waar je in vastloopt en of dit traject past bij wat jij nodig hebt."
}, {
  q: "Ik functioneer nog wel. Is dit traject dan wel voor mij?",
  a: "Ja, juist ook dan. Veel vrouwen die bij mij komen, functioneren aan de buitenkant nog best goed, terwijl het van binnen steeds meer energie kost. Juist dan is het waardevol om op tijd in te grijpen."
}, {
  q: "Is dit traject ook geschikt als ik al in een burn-out zit?",
  a: "Ja. Het liefst begeleid ik je natuurlijk al vóórdat je echt uitvalt, maar dit traject helpt je om op tijd bij te sturen én om te herstellen als je al bent vastgelopen."
}, {
  q: "Ik heb al veel geprobeerd. Wat maakt dit anders?",
  a: "Je krijgt geen losse tips of standaardadviezen, maar een helder stappenplan in de juiste volgorde. Juist die structuur en de combinatie van wetenschap, praktijk en persoonlijke afstemming maakt het verschil."
}, {
  q: "Mijn werk blijft druk. Heeft het dan wel zin?",
  a: "Ja. Het doel is niet altijd dat je leven ineens minder druk wordt, maar dat jij er anders mee leert omgaan. Een eerdere cliënt verwoordde het mooi: de werkdruk was niet veranderd, maar zij kon er veel beter sturing aan geven en hield meer ruimte over voor haar privéleven."
}, {
  q: "Krijg ik vooral inzicht, of ook concrete handvatten?",
  a: "Allebei. Je begrijpt beter wat er met je gebeurt én je krijgt concrete stappen en een persoonlijk plan voor je dagelijks leven. Theorie en praktijk verbinden – dat is precies waar ik voor sta."
}, {
  q: "Kan ik dit combineren met een druk gezin en werk?",
  a: "Ja, juist daarvoor is het bedoeld. Het traject is afgestemd op vrouwen die werk en gezin combineren en behoefte hebben aan een haalbare, realistische aanpak."
}];
function TrajectPage({
  onNav,
  onPlay,
  portret
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-hero ewk-hero--quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-hero__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-trj-herotext"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Rust Ruimte Regie \xB7 1-op-1 traject"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-hero__quote"
  }, "Voor ambitieuze moeders die verlangen naar rust, energie en grip"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead"
  }, "Je bent gedreven, slim, betrokken en verantwoordelijk. En toch merk je dat het steeds meer energie kost om alles draaiende te houden. Je wilt het goed doen op je werk, er zijn voor je kinderen, een fijne partner zijn \u2013 en ergens tussendoor ook nog ruimte houden voor jezelf."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-trj-signals"
  }, ["Je hoofd staat altijd aan.", "Je energie raakt langzaam op.", "Je verliest het overzicht.", "Je bent alleen nog aan het rennen en regelen.", "Echt tot rust komen lukt niet meer."].map(s => /*#__PURE__*/React.createElement("span", {
    key: s
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), s))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead ewk-trj-lead2",
    style: {
      marginTop: 22
    }
  }, "Misschien functioneer je nog. Misschien ziet de buitenwereld niet eens hoeveel het van je vraagt. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Maar jij voelt het wel. Zo wil je niet doorgaan.")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Vrijblijvend kennismaken"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "play",
    onClick: onPlay
  }, "Bekijk mijn verhaal"))), /*#__PURE__*/React.createElement(Portrait, {
    play: true,
    onPlay: onPlay,
    src: portret
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Herken je dit?",
    title: "Misschien voelt het in de praktijk vaak anders"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-trj-recog"
  }, TRJ_RECOG.map(r => /*#__PURE__*/React.createElement("li", {
    key: r
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), r))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "Dan is dit traject er voor jou."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose",
    style: {
      textAlign: "center",
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Het traject"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px auto 24px"
    }
  }, "In 3 maanden stap voor stap naar rust, energie en grip"), /*#__PURE__*/React.createElement("p", null, "In het 1 op 1 traject werken we in drie maanden stap voor stap toe naar meer ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "rust, ruimte en regie"), ". Het traject is speciaal voor gedreven, hoogopgeleide moeders zoals jij \u2013 met een verantwoordelijke baan of onderneming, die merken dat ze zichzelf onderweg zijn kwijtgeraakt. Je hebt een groot verantwoordelijkheidsgevoel, bent gewend om door te gaan en voelt dat het zo niet langer werkt."), /*#__PURE__*/React.createElement("p", null, "Maar verandering gaat niet zomaar. Het vraagt de bereidheid om eerlijk te kijken naar jouw patronen. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Juist daar ligt vaak de sleutel naar echte, duurzame verandering.")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Dit krijg je in het traject",
    title: "Begeleiding op maat, met een helder plan"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-krijg-card"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "ewk-checks ewk-checks--2col"
  }, TRJ_KRIJG.map(k => /*#__PURE__*/React.createElement("li", {
    key: k
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), k)))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat dit traject jou oplevert",
    title: "Weer rust in je hoofd en ruimte in je lijf",
    sub: "Je leeft niet langer op de automatische piloot, maar krijgt weer grip op je energie, je grenzen en je dagelijks leven. Niet omdat je harder werkt maar omdat je niet meer continu in de overlevingsstand staat."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-oplevert"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-oplevert__block"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement(Icon, {
    name: "briefcase"
  }), "Op je werk"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-checks ewk-checks--2col"
  }, TRJ_WERK.map(w => /*#__PURE__*/React.createElement("li", {
    key: w
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), w))), /*#__PURE__*/React.createElement("p", null, "Daardoor kost werken je minder energie en houd je aan het einde van de dag meer over voor jezelf en voor thuis.")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-oplevert__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-oplevert__block"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement(Icon, {
    name: "home"
  }), "Thuis"), /*#__PURE__*/React.createElement("p", null, "Meer geduld, meer aanwezigheid en meer verbinding met de mensen van wie je houdt. Minder kortaf, minder prikkelbaar en minder met je hoofd nog half op je werk.")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-oplevert__block"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement(Icon, {
    name: "heart"
  }), "Voor jezelf"), /*#__PURE__*/React.createElement("p", null, "Je vindt jezelf weer terug. Je begrijpt waarom je vastliep en leert hoe je perfectionisme, altijd maar doorgaan, verantwoordelijkheidsgevoel en andere patronen duurzaam doorbreekt. Je leert meer vertrouwen op jezelf en laat je minder leiden door anderen.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Ja, ik wil kennismaken")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-story"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-prose"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Waarom dit traject werkt"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 24px"
    }
  }, "De juiste stappen in de juiste volgorde"), /*#__PURE__*/React.createElement("p", null, "Omdat jij geen losse tips nodig hebt, maar de juiste stappen in de juiste volgorde. Als je hoofd overvol is en je lichaam al te lang in de overlevingsstand staat, kun je vaak best bedenken wat je anders zou moeten doen maar lukt het niet om het vol te houden."), /*#__PURE__*/React.createElement("p", null, "Daarom beginnen we niet bij n\xF3g harder proberen, maar bij rust, herstel en ruimte in je systeem. Van daaruit kijken we stap voor stap naar de patronen, overtuigingen en omgevingsfactoren die jou uit balans hebben gebracht. Geen standaardaanpak, maar een helder en persoonlijk stappenplan."), /*#__PURE__*/React.createElement("p", null, "Juist de combinatie van mijn wetenschappelijke achtergrond, praktijkervaring en ervaringsdeskundigheid maakt het verschil. Ik help je niet alleen begrijpen w\xE1t er met je gebeurt, maar ook h\xF3e je daar \u2013 op een manier die bij jou past \u2013 duurzaam uitkomt.")), /*#__PURE__*/React.createElement("figure", {
    className: "ewk-photofig ewk-story__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/work-9331.jpg",
    alt: "Agathe geconcentreerd aan het werk",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Geen standaardaanpak, maar de juiste stappen in de juiste volgorde.")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Dit is wat we gaan doen",
    title: "Het traject in 5 stappen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-tsteps"
  }, TRJ_STAPPEN.map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-tstep",
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-tstep__num"
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    className: "ewk-tstep__body"
  }, /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d))))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-pricebox"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__kicker"
  }, "Jouw investering"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-pricebox__price"
  }, "\u20AC 1.997", /*#__PURE__*/React.createElement("span", null, "incl. btw")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-pricebox__meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), "Duur: 3 maanden"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "messages-square"
  }), "Intake + persoonlijke sessies"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "file-check"
  }), "Concreet plan van aanpak"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Ja, dit wil ik")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Ervaringen",
    title: "Wat eerdere cli\xEBnten ervoeren"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-testgrid"
  }, TRAJECT_REVIEWS.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    className: "ewk-testcard",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, [0, 1, 2, 3, 4].map(k => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", null, t.quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: t
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("br", null), t.role))))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Kennismaken?"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Denk je: \u201CDit gaat over mij\u201D maar ook: \u201Chelp, wat komt er op me af?\u201D"), /*#__PURE__*/React.createElement("p", null, "Wees gerust. Je hoeft het niet alleen uit te zoeken. Verlang je naar meer rust, energie en grip en voel je dat het tijd is om het \xE9cht anders te doen? Dan ben je welkom voor een kennismakingsgesprek, zodat jij helder kunt voelen of dit de juiste volgende stap is."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Ja, ik wil kennismaken")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Voor wie",
    title: "Is dit traject iets voor jou?"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--ben"
  }, /*#__PURE__*/React.createElement("h4", null, "Dit traject is voor jou als\u2026"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), "je een sterke, hoogopgeleide moeder bent met een verantwoordelijke baan of onderneming."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), "je het goed wilt doen op je werk \xE9n thuis, met een groot verantwoordelijkheidsgevoel."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), "je hoofd altijd aanstaat, je energie opraakt en je verlangt naar rust, overzicht en grip."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), "je bereid bent eerlijk naar je eigen patronen te kijken."))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--niet"
  }, /*#__PURE__*/React.createElement("h4", null, "Dit traject is niet voor jou als\u2026"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--niet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), "je alleen op zoek bent naar een snelle tip of oppervlakkige quick fix."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--niet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), "je een standaard lijstje verwacht dat voor iedereen werkt."), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--niet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), "je nog volledig in ontkenning zit en geen verantwoordelijkheid wilt nemen voor je eigen proces.")))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-faqwrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Veelgestelde vragen",
    title: "Misschien vraag je je af.."
  }), /*#__PURE__*/React.createElement(FaqList, {
    items: TRJ_FAQ
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Klaar voor de volgende stap?"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Begin met meer rust, ruimte en regie, het start met \xE9\xE9n gesprek"), /*#__PURE__*/React.createElement("p", null, "Geen verplichtingen, gewoon even kennismaken. We kijken samen waar jij nu staat en of dit traject past bij wat jij nodig hebt."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Plan een kennismaking")))));
}
Object.assign(window, {
  TrajectPage
});

/* ===== deepdive.jsx ===== */
/* Expeditie Werkplezier – 1-op-1 Deep Dive salespagina (€147) */

const DD_CHECKOUT = "https://expeditiewerkplezier.plugandpay.com/checkout/1-op-1-deep-dive";
const DD_GAINS = [["lightbulb", "sky", "Helderheid in 60 minuten", "Je ziet wat er bij jou speelt – niet in losse stukjes, maar als één geheel."], ["repeat", "rose", "Doorbraak van patronen", "Je ontdekt welk onbewust patroon jou hier heeft gebracht en waarom je blijft doorgaan terwijl het te veel is."], ["target", "gold", "Eén concrete focus", "Je weet precies waar je mee begint, in plaats van alles tegelijk te willen oplossen."], ["clipboard-list", "sage", "Een persoonlijk plan", "Afgestemd op jouw situatie, jouw leven en wat voor jou werkt."], ["wind", "sky", "Rust in je hoofd", "Vaak al direct na de sessie voelbaar."]];
const DD_PAIN = ["steeds maar door te gaan terwijl je voelt dat het eigenlijk te veel is", "van alles te proberen, maar niet echt verschil te merken", "een vol hoofd te hebben dat maar blijft doorgaan", "te twijfelen wat nu écht de juiste stap is", "alles tegelijk te willen oplossen en daardoor vast te blijven zitten", "de dag moe af te sluiten, zonder het gevoel dat je echt verder komt"];
const DD_GAIN = ["je weer overzicht voelt in je hoofd, in plaats van chaos", "je precies weet waar je moet beginnen, zonder te blijven twijfelen", "je niet meer alles tegelijk hoeft op te lossen, maar stap voor stap vooruitgaat", "je meer rust ervaart in je lichaam, ook op drukke dagen", "je weer met aandacht aanwezig bent thuis, zonder dat je hoofd ergens anders zit", "je de dag afsluit met het gevoel dat het genoeg is geweest"];
const DD_VOORWIE = ["een drukke vrouw bent met een verantwoordelijke rol en veel op je bord", "snel schakelt, vooruitdenkt en verantwoordelijkheid pakt, op je werk én thuis", "blijft doorgaan terwijl je voelt dat het eigenlijk te veel is", "de lat hoog legt, ook als je allang over je grens zit", "thuis bent, maar je werk niet los kunt laten", "blijft zoeken naar hoe het anders moet, maar geen grip krijgt"];

/* DEEPDIVE_REVIEWS komt uit data.jsx (echte reviews) */

const DD_FAQ = [{
  q: "Wat levert één sessie me op?",
  a: "Helderheid, richting en een concreet plan waar je direct mee verder kunt. De meeste vrouwen gaan naar huis met een inzicht dat alles op z'n plek laat vallen. Vaak ervaar je al tijdens de sessie meer rust in je hoofd."
}, {
  q: "Moet ik alles al goed kunnen uitleggen?",
  a: "Nee. Kom zoals je bent. Je hoeft je situatie niet perfect te verwoorden – dat is precies waar ik je bij help. We zoeken het samen uit."
}, {
  q: "Is één sessie genoeg?",
  a: "Veel vrouwen ervaren na één sessie een duidelijk inzicht en weten welke eerste stap ze kunnen zetten. Verandering vasthouden is iets anders. Als je merkt dat je daarin begeleiding wilt, bespreken we dat aan het einde van de sessie."
}, {
  q: "Hoe plan ik een sessie?",
  a: "Via de knop boek je de 1-op-1 sessie. Na boeking ontvang je direct een uitnodiging om een moment te kiezen dat jou uitkomt. De beschikbare dagen zijn maandag t/m vrijdag tussen 13.30 en 17.00 uur."
}, {
  q: "Wat als ik het spannend vind om mijn verhaal te delen?",
  a: "Dat is heel normaal. De sessie is volledig vertrouwelijk en afgestemd op jou. Er is geen goed of fout antwoord. Veel vrouwen merken dat het al opluchting geeft om hun verhaal hardop uit te spreken."
}, {
  q: "Hoe snel kan ik terecht?",
  a: "Na je boeking ontvang je direct een bevestiging en een link om een moment te kiezen. Meestal kun je binnen een week terecht."
}, {
  q: "Wat als ik twijfel of dit iets voor mij is?",
  a: "Dan is dat juist een teken dat je er klaar voor bent. Twijfel betekent dat je voelt dat er iets moet veranderen, maar nog niet weet hoe. Dat is precies waar we in de sessie mee beginnen."
}];
function DeepDivePage({
  onNav,
  onPlay,
  portret
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-hero ewk-hero--quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-hero__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "1-op-1 Deep Dive"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-hero__quote"
  }, "In 60 minuten meer rust door ", /*#__PURE__*/React.createElement("em", null, "helderheid en richting")), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead"
  }, "Voor werkende moeders die zich weer ontspannen en energiek willen voelen. Met deze Deep Dive weet jij binnen een uur wat jouw ineffectieve patronen zijn \u2013 en heb je een", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " persoonlijk plan"), " om mee aan de slag te gaan."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: DD_CHECKOUT
  }, "Boek een Deep Dive sessie"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "play",
    onClick: onPlay
  }, "Bekijk mijn verhaal")), /*#__PURE__*/React.createElement("p", {
    className: "ewk-dd-meta"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), "1-op-1 \xA0\xB7\xA0 ", /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), "60\u201390 minuten \xA0\xB7\xA0 ", /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles"
  }), "volledig afgestemd op jou")), /*#__PURE__*/React.createElement(Portrait, {
    play: true,
    onPlay: onPlay,
    src: portret
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose",
    style: {
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Misschien herken je dit"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 24px"
    }
  }, "Je weet dat er iets moet veranderen. Maar wat precies \u2013 en waar begin je?"), /*#__PURE__*/React.createElement("p", null, "Veel vrouwen herkennen zichzelf volledig in de signalen en zien precies waar het schuurt. Ze voelen dat het zo niet langer kan, maar het lukt ze niet om iets aan de situatie te veranderen."), /*#__PURE__*/React.createElement("p", null, "Niet omdat ze de vaardigheden niet hebben, maar omdat ze niet goed weten waar ze moeten beginnen. Ze blijven nadenken en twijfelen, of proberen van alles tegelijk \u2013 waardoor het overzicht juist weer verdwijnt. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Als je eerlijk bent, herken je dat misschien ook wel.")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat deze sessie je oplevert",
    title: "In \xE9\xE9n sessie van stilstand naar een concrete eerste stap",
    sub: "We kijken samen naar jouw situatie \u2013 niet in losse stukjes, maar als geheel. We maken scherp wat er onder je klachten zit en wat jou nu het meest helpt."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-gains"
  }, DD_GAINS.map(([ic, accent, t, d]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-gain ewk-offer--" + accent,
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__ic ewk-offer__ic--" + accent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic
  })), /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d)))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Ben je het zat?",
    title: "Van blijven doorgaan naar weer ruimte voelen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--niet"
  }, /*#__PURE__*/React.createElement("h4", null, "Ben je het zat om\u2026"), /*#__PURE__*/React.createElement("ul", null, DD_PAIN.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--niet"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), p)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--ben"
  }, /*#__PURE__*/React.createElement("h4", null, "Stel je eens voor dat\u2026"), /*#__PURE__*/React.createElement("ul", null, DD_GAIN.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), p))))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "Je hoeft het niet alleen uit te zoeken."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center",
    style: {
      marginTop: "32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: DD_CHECKOUT
  }, "Boek een Deep Dive sessie")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Voor wie is dit?",
    title: "Deze sessie is voor jou als je\u2026"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-trj-recog"
  }, DD_VOORWIE.map(r => /*#__PURE__*/React.createElement("li", {
    key: r
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), r))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "En ergens weet je: zo wil je je niet blijven voelen."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__photo"
  }, /*#__PURE__*/React.createElement(Portrait, {
    size: "100%",
    src: portret
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Even voorstellen"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Ik ben Agathe, arbeids- en organisatiepsycholoog"), /*#__PURE__*/React.createElement("p", null, "Al meer dan 10 jaar help ik drukke vrouwen die vastlopen in de combinatie van werk en gezin. Ik heb zelf ook ervaren hoe het is om jezelf daarin kwijt te raken."), /*#__PURE__*/React.createElement("p", null, "En wat ik elke dag zie: het gaat niet om harder je best doen. Het gaat om begrijpen wat er in je systeem gebeurt. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Dat inzicht is de eerste stap naar rust, overzicht en energie"), " \u2013 en daar helpt deze sessie bij.")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat andere vrouwen zeggen",
    title: "E\xE9n gesprek, dat alles op z'n plek laat vallen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-testgrid"
  }, DEEPDIVE_REVIEWS.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    className: "ewk-testcard",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, Array.from({
    length: t.rating
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", null, t.quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: t
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("br", null), t.role))))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-pricebox"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__kicker"
  }, "Jouw investering"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-pricebox__price"
  }, "\u20AC 147", /*#__PURE__*/React.createElement("span", null, "incl. btw")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-pricebox__meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), "E\xE9n sessie van 60 minuten"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "video"
  }), "Online, op een moment dat jou uitkomt"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "file-check"
  }), "Persoonlijk plan om mee verder te gaan"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: DD_CHECKOUT
  }, "Ja, ik boek een sessie")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-faqwrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Veelgestelde vragen",
    title: "Misschien vraag je je af.."
  }), /*#__PURE__*/React.createElement(FaqList, {
    items: DD_FAQ
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tot slot"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Voel je dat dit over jou gaat?"), /*#__PURE__*/React.createElement("p", null, "Dan is dit misschien precies wat je nu nodig hebt. Je hoeft het niet alleen uit te zoeken."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: DD_CHECKOUT
  }, "Plan je Deep Dive sessie"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: () => onNav("Contact")
  }, "Eerst een vraag stellen")))));
}
Object.assign(window, {
  DeepDivePage
});

/* ===== scan.jsx ===== */
/* Expeditie Werkplezier – Gratis Stress & Energiescan salespagina */
const {
  useState: useScanState
} = React;
const SCAN_GAINS = [["bar-chart-3", "sky", "Inzicht in jouw stressprofiel", "Je ziet precies hoe jouw stress zich op dit moment laat zien."], ["heart-pulse", "rose", "Begrip van je klachten", "Je begrijpt waar die vermoeidheid, prikkelbaarheid en onrust vandaan komen."], ["hand-heart", "sage", "Erkenning", "Je stopt met denken dat het aan jou ligt."], ["footprints", "gold", "Concrete eerste stappen", "Je weet wat jij nu nodig hebt om je systeem tot rust te brengen."], ["wind", "sky", "Meer rust in je hoofd", "Vaak al direct na de scan voelbaar."]];
const SCAN_REVIEWS = [{
  q: "Ik dacht echt dat het aan mij lag. Maar door de uitleg viel alles op zijn plek. Dat gaf zoveel rust in mijn hoofd.",
  name: "Marleen K."
}, {
  q: "Ik functioneerde nog wel, maar alles kostte me zoveel energie. De scan liet me zien wat er écht speelde.",
  name: "Joëlle V."
}, {
  q: "Door dit inzicht kon ik eindelijk stoppen met mezelf pushen.",
  name: "Sanne T."
}];
const SCAN_VOORWIE = ["een gedreven moeder bent die werkt in een kennisintensieve organisatie of onderneming", "veel verantwoordelijkheid draagt, op je werk én thuis", "dingen graag goed wilt doen en snel een stapje verder gaat", "niet meer continu “aan” wilt staan, maar niet weet hoe je dat stopt", "gewend bent om door te gaan, ook als het eigenlijk te veel wordt", "steeds kortaf reageert en je je daar vervolgens schuldig over voelt", "het gevoel hebt dat je tekortschiet, terwijl je zo je best doet"];
const SCAN_FAQ = [{
  q: "Is dit gratis?",
  a: "Ja, volledig gratis. Je vult je naam en e-mailadres in en krijgt direct toegang. De scan bestaat uit een korte vragenlijst. Na het berekenen van de score weet je waar jouw grootste lichamelijke, mentale of emotionele uitdagingen liggen – met handvatten om de eerste stappen te zetten."
}, {
  q: "Hoe lang duurt het?",
  a: "Een paar minuten. Kort en direct waardevol."
}, {
  q: "Is dit een standaard test?",
  a: "Nee. Je krijgt inzicht in wat er onder jouw klachten ligt, vanuit brein en lichaam. Geen generieke uitslag, maar iets wat echt bij jou past."
}, {
  q: "Wat als ik veel herken?",
  a: "Dan is dat juist waardevol. Het betekent dat je systeem al een tijdje signalen geeft – en dat je nu weet waar je moet beginnen."
}, {
  q: "Wat gebeurt er na de scan?",
  a: "Je ziet direct jouw resultaten. Wil je daarna meer weten over hoe je verder kunt? Dan vertel ik je graag meer."
}];

/* Opt-in kaart (hero + afsluiting) – de inschrijving zelf gebeurt op de
   externe checkout (plug&pay), dus dit is een CTA-kaart, geen formulier. */
function ScanOptin({
  compact,
  onCheckout
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-scanform" + (compact ? " ewk-scanform--compact" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-scanform__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-scanform__badge"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clipboard-list"
  }), "Gratis"), /*#__PURE__*/React.createElement("h3", null, "Doe de gratis scan"), /*#__PURE__*/React.createElement("p", null, "Ontdek in 10 minuten wat er \xE9cht speelt en wat jouw eerste stap is naar meer rust en energie.")), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-scanform__list"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Een paar minuten"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Direct inzicht in je inbox"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Geen verplichtingen")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    iconRight: "arrow-right",
    onClick: onCheckout
  }, "Doe de gratis scan")), !compact && /*#__PURE__*/React.createElement("p", {
    className: "ewk-scanform__note"
  }, "Je wordt doorgestuurd naar een korte, beveiligde aanmelding. Je kunt je altijd weer afmelden."));
}

/* Terugkerende CTA-band: linkt direct door naar de plug&pay-checkout. */
function ScanCtaBand({
  onCheckout,
  eyebrow,
  title,
  sub,
  label
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-ctaband"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-ctaband__inner"
  }, eyebrow && /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, title), sub && /*#__PURE__*/React.createElement("p", null, sub), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    onClick: onCheckout
  }, label || "Doe de gratis scan")));
}
function ScanPage({
  onNav,
  onCheckout
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-hero ewk-hero--quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-hero__grid ewk-scan-hero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Gratis Stress & Energiescan"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-hero__quote"
  }, "Ontdek wat er ", /*#__PURE__*/React.createElement("em", null, "\xE9cht speelt"), " in jouw brein en lichaam"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead"
  }, "Je houdt alles draaiende. Je hoofd staat nooit stil en stoppen lukt niet meer. Ontdek in", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "10 minuten"), " wat er onder die vermoeidheid, onrust en prikkelbaarheid ligt."), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-trj-signals"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Geen standaardtest, maar inzicht dat bij j\xF3u past"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Stop met twijfelen aan jezelf"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Weet wat je nodig hebt"))), /*#__PURE__*/React.createElement(ScanOptin, {
    onCheckout: onCheckout
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose",
    style: {
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "In 10 minuten meer rust, overzicht en regie"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 24px"
    }
  }, "Het rare is: Je functioneert nog, maar het kost je steeds meer energie."), /*#__PURE__*/React.createElement("p", null, "Je bent gewend om veel te dragen. Op je werk wordt veel van je gevraagd, en thuis zie jij wat er moet gebeuren en pak jij het op. Maar de laatste tijd merk je dat het steeds meer energie kost. Je hoofd is nooit echt stil."), /*#__PURE__*/React.createElement("p", null, "En hoe harder je probeert om het onder controle te krijgen, hoe minder grip je lijkt te hebben. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "En ergens weet je: zo wil je je niet blijven voelen."), "De scan laat je zien wat er onder die vermoeidheid, onrust en prikkelbaar ligt. Niet als standaard test, maar als concreet inzicht wat er in jouw brein en lichaam speelt. Zodat je stopt met twijfelen aan jezelf en exact weet wat je nodig hebt."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat je krijgt",
    title: "Concreet inzicht, geen vage uitslag"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-gains"
  }, SCAN_GAINS.map(([ic, accent, t, d]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-gain ewk-offer--" + accent,
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__ic ewk-offer__ic--" + accent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic
  })), /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d)))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat andere vrouwen zeggen",
    title: "\u201CDoor de uitleg viel alles op zijn plek\u201D"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-testgrid"
  }, SCAN_REVIEWS.map((r, i) => /*#__PURE__*/React.createElement("figure", {
    className: "ewk-testcard",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, [0, 1, 2, 3, 4].map(k => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", null, r.q), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-testcard__tag"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote"
  }), r.name))))))), /*#__PURE__*/React.createElement(ScanCtaBand, {
    onCheckout: onCheckout,
    eyebrow: "Geen vage uitslag",
    title: "Dit wil ik ook ervaren",
    sub: "Concreet inzicht in jouw brein en lichaam en je eerste stap naar rust.",
    label: "Yes, geef mij die scan!"
  }), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Voor wie is deze scan?",
    title: "Deze scan is voor jou als je\u2026"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-trj-recog"
  }, SCAN_VOORWIE.map(r => /*#__PURE__*/React.createElement("li", {
    key: r
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), r))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "Herken jij dit? Dan is de scan voor jou."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__photo"
  }, /*#__PURE__*/React.createElement(Portrait, {
    size: "100%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Even voorstellen"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Ik ben Agathe, arbeids- en organisatiepsycholoog"), /*#__PURE__*/React.createElement("p", null, "Al meer dan 10 jaar help ik hoogopgeleide vrouwen die vastlopen in de combinatie van werk en gezin. Ik heb zelf ook ervaren hoe het is om jezelf daarin kwijt te raken."), /*#__PURE__*/React.createElement("p", null, "En wat ik elke dag zie: het gaat niet om harder je best doen. Het gaat om begrijpen wat er in je systeem gebeurt. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Dat inzicht is de eerste stap naar rust, overzicht en energie."))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-faqwrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Veelgestelde vragen",
    title: "Misschien vraag je je af.."
  }), /*#__PURE__*/React.createElement(FaqList, {
    items: SCAN_FAQ
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta ewk-finalcta--scan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-scan-close"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-scan-close__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tot slot"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Je probeert al lang genoeg alleen"), /*#__PURE__*/React.createElement("p", null, "Als jij ergens voelt dat dit over jou gaat, dan is dit misschien precies wat je nu nodig hebt. Je probeert het al lang genoeg alleen. Soms is het gewoon fijn om even uit je eigen denk-cirkel te komen en met een frisse blik naar jouw uitdagingen te kijken. Hierdoor heb je direct helder wat je te doen staat.")), /*#__PURE__*/React.createElement(ScanOptin, {
    compact: true,
    onCheckout: onCheckout
  }))));
}
Object.assign(window, {
  ScanPage,
  ScanOptin,
  ScanCtaBand
});

/* ===== pages.jsx ===== */
/* Expeditie Werkplezier – pages */
const {
  useState: useStP
} = React;

/* Reusable inner-page header band */
function PageHeader({
  eyebrow,
  title,
  sub,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-pagehead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-pagehead__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-pagehead__title",
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), sub && /*#__PURE__*/React.createElement("p", {
    className: "ewk-pagehead__sub"
  }, sub), children));
}

/* ===================== HOME lives in home.jsx ===================== */

/* ===================== OVER AGATHE ===================== */
const OA_REASONS = [["heart-handshake", "rose", "Psycholoog én ervaringsdeskundige", "Ik combineer wetenschappelijke kennis met persoonlijke ervaring. Daardoor begrijp ik zowel de theorie als de realiteit van ambitieuze moeders. Je voelt je gezien en gehoord – en dat is, verrassend genoeg, een hele belangrijke stap naar herstel."], ["search", "sky", "Snel inzicht in patronen", "Ik help je patronen herkennen die onder je stress liggen: zoals perfectionisme, pleasegedrag, gewoon doorgaan en een groot verantwoordelijkheidsgevoel. Herkennen is de eerste stap. Daarna verkennen we samen wat er voor jou mogelijk is – opties die je zelf niet zo snel had bedacht."], ["activity", "sage", "Hoofd én lichaam aanpak", "Stress zit niet alleen in je hoofd. Daarom werk ik ook met technieken die je zenuwstelsel helpen herstellen: lichaamsgerichte oefeningen waarbij je leert signalen van ‘veiligheid’ tussen brein en lichaam te sturen, zodat je blijvend rust voelt in je hele systeem."], ["compass", "gold", "Inzicht én praktische stappen", "Je krijgt niet alleen helderheid, maar ook concrete handvatten om weer grip te krijgen op je energie en je leven. We maken het samen glashelder en we sluiten af met een duidelijk plan van aanpak met concrete acties, voor nu en voor de toekomst."]];
const OA_OPLEIDINGEN = ["Universitaire opleiding Arbeids- & Organisatiepsychologie", "NLP", "Oplossingsgericht coachen", "Vitaliteitsmanagement", "EMDR", "NEI (Neuro Emotionele Integratie)", "EFT (Emotional Freedom Technique)", "ACT (Acceptance & Commitment Therapy)"];
const OA_ORGS = ["TNO", "Yacht", "Randstad", "Capgemini", "Sogeti", "Belastingdienst", "RWV advocaten"];
const OA_PATROON = ["een groot verantwoordelijkheidsgevoel", "perfectionisme en hoge verwachtingen van jezelf", "altijd doorgaan, ook wanneer het eigenlijk te veel wordt", "moeite met grenzen aangeven", "gevoelig zijn voor erkenning en waardering", "hard werken als vanzelfsprekende norm"];
const OA_HELP = ["weer grip krijgen op je leven", "een gezonde balans ervaren tussen een uitdagende baan en een fijn gezinsleven", "je eigen verlangens en grenzen haarscherp in beeld krijgen en ernaar handelen", "meer rust, ontspanning en oprechte flow ervaren in plaats van constante druk"];

/* OA_REVIEWS komt uit data.jsx (echte reviews) */

function OverAgathe({
  onScan,
  onNav,
  onPlay,
  portret
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-hero ewk-hero--quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-hero__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Over Agathe"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-hero__quote"
  }, "Je probeert alles goed te doen. Voor je werk, je gezin, voor iedereen."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-oa-hook"
  }, "Maar ergens onderweg ben je jezelf kwijtgeraakt."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead"
  }, "Je houdt van je werk. Je houdt van je gezin. En meestal lukt het ook om alles draaiende te houden \u2013 totdat je merkt dat het steeds meer energie kost. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Ik weet hoe dat voelt."), " Want ik stond ooit precies daar waar jij nu staat."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "clipboard-list",
    onClick: onScan
  }, "Doe de gratis scan"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "play",
    onClick: onPlay
  }, "Bekijk mijn verhaal"))), /*#__PURE__*/React.createElement(Portrait, {
    play: true,
    onPlay: onPlay,
    src: portret
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-story"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-prose"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Mijn verhaal"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 26px"
    }
  }, "Toen mijn lichaam op de rem trapte"), /*#__PURE__*/React.createElement("p", null, "Na mijn zwangerschapsverlof ging ik weer aan het werk. Parttime \u2013 dat leek een goede keuze. Alleen mijn takenpakket was niet minder geworden. Ik wilde alles goed doen, voor mijn werk \xE9n voor mijn gezin. Dus ik ging door. Steeds harder. Totdat het niet meer ging."), /*#__PURE__*/React.createElement("blockquote", {
    className: "ewk-pullquote"
  }, "Van de ene op de andere dag moest ik alles loslaten. Mijn lichaam trok de stekker eruit."), /*#__PURE__*/React.createElement("p", null, "Achteraf was het eigenlijk heel logisch. Ik probeerde alles tegelijk te zijn: een betrokken professional, een liefdevolle moeder en iemand die overal verantwoordelijkheid voor nam. Maar ergens onderweg raakte ik mezelf kwijt. Tijdens mijn herstel begon ik te begrijpen wat er werkelijk speelde."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-oa-patterns"
  }, [["sparkles", "Perfectionisme"], ["shield", "Een groot verantwoordelijkheidsgevoel"], ["repeat", "Altijd doorgaan"]].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-oa-pattern",
    key: t
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic
  }), /*#__PURE__*/React.createElement("span", null, t))))), /*#__PURE__*/React.createElement("figure", {
    className: "ewk-photofig ewk-story__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/story-9371.jpg",
    alt: "Agathe in gedachten",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("figcaption", null, "Tijdens mijn herstel begon ik te begrijpen wat er werkelijk speelde.")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Wat mij daarna opviel"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 26px"
    }
  }, "Mijn verhaal stond niet op zichzelf"), /*#__PURE__*/React.createElement("p", null, "Toen ik later vrouwen begon te begeleiden, viel mij iets op. Ik zag dezelfde patronen steeds opnieuw terug bij ambitieuze vrouwen die hun werk combineren met een gezin. Hun hoofd staat altijd al bij de volgende taak \u2013 zelfs wanneer ze met hun kinderen zijn."), /*#__PURE__*/React.createElement("blockquote", {
    className: "ewk-pullquote"
  }, "Ze zijn er wel. Maar niet \xE9cht aanwezig. En dat doet pijn."), /*#__PURE__*/React.createElement("p", null, "Op dat moment besefte ik dat dit geen individueel probleem is. Hier worstelen heel veel vrouwen mee. Daaruit ontstond mijn missie."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "ewk-photoband"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/agathe-9505.jpg",
    alt: "Agathe kijkt naar een wereldkaart van sloophout",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-eyebrow"
  }, "De expeditie"), /*#__PURE__*/React.createElement("p", null, "Geen quick fix, maar een reis terug naar jezelf \u2013 stap voor stap."))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-mission"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ewk-mission__mark",
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-mission__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-mission__eyebrow"
  }, "Mijn missie"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-mission__quote"
  }, "Een wereld cre\xEBren waarin ", /*#__PURE__*/React.createElement("b", null, "vrouwelijke professionals hun carri\xE8re en gezin kunnen combineren zonder zichzelf te verliezen"), ". Ik help gedreven moeders hun eigen behoeften weer helder te krijgen, zodat ze leven vanuit ", /*#__PURE__*/React.createElement("b", null, "rust, energie en plezier"), " in plaats van overleven op wilskracht."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-aristotle"
  }, /*#__PURE__*/React.createElement("p", null, "\u201CWhen we have been prevented from learning how to say no, our bodies may end up saying it for us.\u201D"), /*#__PURE__*/React.createElement("span", null, "~ Gabor Mat\xE9")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Waarom vrouwen voor mij kiezen",
    title: "Geen quick fix, maar blijvende verandering"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-reasons"
  }, OA_REASONS.map(([ic, accent, t, d]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-reason ewk-offer--" + accent,
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__ic ewk-offer__ic--" + accent
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic
  })), /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d)))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-bg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-bg__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Mijn achtergrond"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Meer dan 10 jaar ervaring met gedreven vrouwen"), /*#__PURE__*/React.createElement("p", null, "Ik begeleid al meer dan tien jaar hoogopgeleide vrouwen die werken in kennisintensieve organisaties. In mijn begeleiding combineer ik psychologie, wetenschappelijke inzichten en lichaamsgerichte technieken met praktische stappen die je direct kunt toepassen."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-orgs"
  }, OA_ORGS.map(o => /*#__PURE__*/React.createElement("span", {
    className: "ewk-org",
    key: o
  }, o)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-bg__card"
  }, /*#__PURE__*/React.createElement("h4", null, /*#__PURE__*/React.createElement(Icon, {
    name: "graduation-cap"
  }), "Opleidingen & trainingen"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-checks"
  }, OA_OPLEIDINGEN.map(o => /*#__PURE__*/React.createElement("li", {
    key: o
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), o)))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Voor wie",
    title: "Werk jij hard, maar raakt de rek eruit?",
    sub: "Ik werk met hoogopgeleide vrouwen met jonge kinderen die een verantwoordelijke functie hebben of een eigen onderneming runnen. Veel van hen functioneren lang op hoog niveau, tot ze merken dat het te veel wordt."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--sym"
  }, /*#__PURE__*/React.createElement("h4", null, "Herken je je hierin?"), /*#__PURE__*/React.createElement("ul", null, OA_PATROON.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "dot"
  })), p)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--ben"
  }, /*#__PURE__*/React.createElement("h4", null, "Dit gaan we samen bereiken"), /*#__PURE__*/React.createElement("ul", null, OA_HELP.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), p))))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat klanten zeggen",
    title: "Verhalen van vrouwen die je voorgingen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-testgrid"
  }, OA_REVIEWS.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    className: "ewk-testcard",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, [0, 1, 2, 3, 4].map(k => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", null, t.quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: t
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("br", null), t.role))))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note",
    style: {
      marginTop: 40
    }
  }, "\u201CIk ben blijer, energieker en meer gefocust en dat straalt direct door naar mijn gezin. WIN-WIN-WIN!\u201D"))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta ewk-finalcta--scan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Misschien herken je jezelf hierin"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Uitputting verdwijnt zelden vanzelf"), /*#__PURE__*/React.createElement("p", null, "Veel vrouwen wachten te lang. Ze denken: \u201CHet gaat vanzelf wel weer over\u201D of \u201Cik moet gewoon even doorzetten.\u201D Maar uitputting verdwijnt zelden van zelf. Het begint met het herkennen van de signalen. Daarom maakte ik een scan met signalen die vaak voorafgaan aan overbelasting of een burn-out."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "clipboard-list",
    onClick: onScan
  }, "Download de Stress & Energiescan"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Plan een kennismaking")))));
}

/* ===================== AANBOD ===================== */
function AanbodPage({
  onScan,
  onEbook,
  onNav
}) {
  const goScan = onScan || onEbook;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Aanbod",
    title: "Zo werken we samen aan jouw <em>werkgeluk</em>",
    sub: "Drie manieren om met me te werken \u2013 van een gratis scan tot een compleet 1-op-1 traject. Kies wat bij jou past, of twijfel je? Dan denk ik graag met je mee."
  }), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(WerkLadder, {
    onScan: goScan,
    onNav: onNav
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-howgrid"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "ewk-photofig ewk-howgrid__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/work-9321.jpg",
    alt: "Agathe tijdens een online sessie",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    align: "left",
    eyebrow: "Hoe het werkt",
    title: "Van eerste contact tot blijvende verandering"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-steps ewk-steps--2"
  }, [["Kennismaken", "Een vrijblijvend gesprek waarin we kijken of het klikt en wat je nodig hebt."], ["Jouw plan", "We brengen je situatie in kaart en stellen samen een aanpak op die bij jóu past."], ["Aan de slag", "Sessies, praktische opdrachten en app-contact – in jouw tempo."], ["Blijvend resultaat", "Je houdt de tools in handen om zelf grip te houden, ook daarna."]].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-step",
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-step__num"
  }, i + 1), /*#__PURE__*/React.createElement("h4", null, t), /*#__PURE__*/React.createElement("p", null, d))))))), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-faqwrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Veelgestelde vragen",
    title: "Misschien vraag je je af.."
  }), /*#__PURE__*/React.createElement(FaqList, null))), /*#__PURE__*/React.createElement(FinalCTA, {
    onNav: onNav,
    onScan: goScan
  }));
}

/* ===================== ERVARINGEN ===================== */
function ErvaringenPage({
  onScan,
  onNav,
  onPlay
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Ervaringen",
    title: "Van overleven naar weer <em>genieten</em>",
    sub: "De mooiste graadmeter zijn de verhalen van vrouwen die je voorgingen. Lees hoe zij hun rust, energie en plezier terugvonden."
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "play",
    onClick: onPlay
  }, "Bekijk het verhaal van Agathe"))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(ReviewWall, {
    items: REVIEWS
  }), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note",
    style: {
      marginTop: 44
    }
  }, "De portretten zijn illustraties \u2013 veel vrouwen blijven liever anoniem, hun woorden zijn echt."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("figure", {
    className: "ewk-photoband"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/agathe-9485.jpg",
    alt: "Agathe ontspannen aan tafel",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-eyebrow"
  }, "Achter de verhalen"), /*#__PURE__*/React.createElement("p", null, "Weer ruimte om te genieten van wat echt belangrijk is."))))), /*#__PURE__*/React.createElement(Mission, null), /*#__PURE__*/React.createElement(ScanCTA, {
    onScan: onScan
  }), /*#__PURE__*/React.createElement(FinalCTA, {
    onNav: onNav,
    onScan: onScan
  }));
}

/* ===================== BLOG ===================== */
function BlogPage({
  onNav,
  onScan
}) {
  const [cat, setCat] = useStP("Alles");
  const cats = ["Alles", ...Array.from(new Set(POSTS.map(p => p.cat)))];
  const list = cat === "Alles" ? POSTS : POSTS.filter(p => p.cat === cat);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Blog",
    title: "Praktische inzichten voor <em>meer rust</em>",
    sub: "No-nonsense artikelen over werkdruk, energie, grenzen en genieten \u2013 om te lezen, te herkennen en mee aan de slag te gaan."
  }), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-filters"
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: "ewk-filter" + (c === cat ? " is-active" : ""),
    onClick: () => setCat(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-cards"
  }, list.map(p => /*#__PURE__*/React.createElement(PostCard, {
    key: p.title,
    p: p,
    onNav: onNav
  }))))), /*#__PURE__*/React.createElement(FinalCTA, {
    onNav: onNav,
    onScan: onScan
  }));
}

/* ===================== CONTACT ===================== */
function ContactPage({
  onNav,
  portret
}) {
  const [sent, setSent] = useStP(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState("");
  const [form, setForm] = useStP({
    naam: "",
    email: "",
    bericht: "",
    onderwerp: "Stress & Energiescan"
  });
  const set = k => e => setForm({
    ...form,
    [k]: e.target.value
  });
  async function submit(e) {
    e.preventDefault();
    if (sending || !form.email || !form.naam) return;
    setError("");
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/agathe@agathehania.nl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Naam: form.naam,
          "E-mailadres": form.email,
          Onderwerp: form.onderwerp,
          Bericht: form.bericht,
          _subject: "Nieuw bericht via de site – " + form.onderwerp,
          _template: "table"
        })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.success === "true" || data.success === true)) {
        setSent(true);
      } else {
        setError("Het versturen lukte niet. Probeer het zo nog eens, of mail me direct via agathe@agathehania.nl.");
      }
    } catch (err) {
      setError("Het versturen lukte niet. Probeer het zo nog eens, of mail me direct via agathe@agathehania.nl.");
    } finally {
      setSending(false);
    }
  }
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHeader, {
    eyebrow: "Contact",
    title: "Laten we <em>kennismaken</em>",
    sub: "Heb je een vraag, of wil je een vrijblijvende kennismaking plannen? Stuur me een bericht \u2013 ik reageer meestal binnen twee werkdagen."
  }), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-contact__form"
  }, !sent ? /*#__PURE__*/React.createElement("form", {
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-field"
  }, /*#__PURE__*/React.createElement("label", null, "Je naam"), /*#__PURE__*/React.createElement("input", {
    className: "ewk-input",
    placeholder: "Sanne de Vries",
    value: form.naam,
    onChange: set("naam"),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-field"
  }, /*#__PURE__*/React.createElement("label", null, "E-mailadres"), /*#__PURE__*/React.createElement("input", {
    className: "ewk-input",
    type: "email",
    placeholder: "jij@voorbeeld.nl",
    value: form.email,
    onChange: set("email"),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-field"
  }, /*#__PURE__*/React.createElement("label", null, "Waar gaat het over?"), /*#__PURE__*/React.createElement("select", {
    className: "ewk-input",
    value: form.onderwerp,
    onChange: set("onderwerp")
  }, /*#__PURE__*/React.createElement("option", null, "Stress & Energiescan"), /*#__PURE__*/React.createElement("option", null, "1-op-1 Deep Dive"), /*#__PURE__*/React.createElement("option", null, "Rust Ruimte Regie (traject)"), /*#__PURE__*/React.createElement("option", null, "Iets anders"))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-field"
  }, /*#__PURE__*/React.createElement("label", null, "Je bericht"), /*#__PURE__*/React.createElement("textarea", {
    className: "ewk-input",
    rows: "5",
    placeholder: "Vertel me kort waar je tegenaan loopt..",
    value: form.bericht,
    onChange: set("bericht")
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    type: "submit",
    iconRight: sending ? null : "arrow-right"
  }, sending ? "Bezig met versturen…" : "Verstuur bericht"), error && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--ew-error)",
      margin: "12px 0 0",
      textAlign: "center"
    }
  }, error), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: "var(--ew-ink-400)",
      margin: "14px 0 0",
      textAlign: "center"
    }
  }, "Je gegevens gebruik ik alleen om te reageren op je bericht.")) : /*#__PURE__*/React.createElement("div", {
    className: "ewk-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-success__ring"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("h3", null, "Dankjewel, ", form.naam, "!"), /*#__PURE__*/React.createElement("p", null, "Je bericht is verstuurd. Ik neem snel contact met je op via ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--ew-pine-600)"
    }
  }, form.email), "."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => onNav("Home")
  }, "Terug naar home"))), /*#__PURE__*/React.createElement("aside", {
    className: "ewk-contact__side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-contact__card"
  }, /*#__PURE__*/React.createElement("h4", null, "Direct contact"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl"
  }, "agathe@agathehania.nl")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin"
  }), "Waddinxveen, Nederland"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), "Reactie binnen 2 werkdagen")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-contact__social"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.linkedin.com/in/agathe-hania-893577338/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "LinkedIn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "linkedin"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://www.instagram.com/agathehania/",
    target: "_blank",
    rel: "noopener noreferrer",
    title: "Instagram"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-contact__portrait"
  }, /*#__PURE__*/React.createElement(Portrait, {
    size: "100%",
    src: portret
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-faqwrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Veelgestelde vragen",
    title: "Misschien vraag je je af.."
  }), /*#__PURE__*/React.createElement(FaqList, null))));
}
Object.assign(window, {
  PageHeader,
  OverAgathe,
  AanbodPage,
  ErvaringenPage,
  BlogPage,
  ContactPage
});

/* ===== reviews.jsx ===== */
/* Expeditie Werkplezier – Ervaringen: volledige reviewmuur met inklapbare verhalen.
   Gebruikt de echte REVIEWS uit data.jsx en ReviewAvatar uit sections.jsx. */
const {
  useState: useStRv
} = React;
function ReviewCard({
  r
}) {
  const [open, setOpen] = useStRv(false);
  const hasFull = r.full && r.full.length;
  return /*#__PURE__*/React.createElement("figure", {
    className: "ewk-rev" + (open ? " is-open" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-rev__mark"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, [0, 1, 2, 3, 4].map(k => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", {
    className: "ewk-rev__quote"
  }, r.quote), hasFull && open && /*#__PURE__*/React.createElement("div", {
    className: "ewk-rev__full"
  }, r.full.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, p))), /*#__PURE__*/React.createElement("figcaption", {
    className: "ewk-rev__foot"
  }, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: r
  }), /*#__PURE__*/React.createElement("span", {
    className: "ewk-rev__who"
  }, /*#__PURE__*/React.createElement("b", null, r.name), r.role ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), r.role) : null)), hasFull && /*#__PURE__*/React.createElement("button", {
    className: "ewk-rev__more",
    onClick: () => setOpen(!open)
  }, open ? "Lees minder" : "Lees het hele verhaal", /*#__PURE__*/React.createElement(Icon, {
    name: open ? "chevron-up" : "chevron-down"
  })));
}
function ReviewWall({
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-revwall"
  }, items.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    r: r
  })));
}
Object.assign(window, {
  ReviewCard,
  ReviewWall
});

/* ===== privacy.jsx ===== */
/* Expeditie Werkplezier – Privacyverklaring
   Calm, readable legal page: sticky TOC + prose, on-brand. */
const {
  useState: useStPv,
  useEffect: useEffPv
} = React;
const PV_SECTIONS = [{
  id: "wie",
  n: "1",
  title: "Wie ben ik?"
}, {
  id: "gegevens",
  n: "2",
  title: "Welke gegevens verzamel ik?"
}, {
  id: "doelen",
  n: "3",
  title: "Waarvoor gebruik ik jouw gegevens?"
}, {
  id: "bewaren",
  n: "4",
  title: "Hoe lang bewaar ik jouw gegevens?"
}, {
  id: "delen",
  n: "5",
  title: "Deel ik gegevens met anderen?"
}, {
  id: "beveiliging",
  n: "6",
  title: "Beveiliging"
}, {
  id: "rechten",
  n: "7",
  title: "Jouw rechten"
}, {
  id: "wijzigingen",
  n: "8",
  title: "Wijzigingen"
}, {
  id: "contact",
  n: "9",
  title: "Contact"
}];
const PV_DOELEN = [["Beantwoorden van jouw bericht of vraag", "Gerechtvaardigd belang / uitvoering overeenkomst"], ["Uitvoeren van een coachtraject", "Uitvoering overeenkomst"], ["Facturatie en administratie", "Wettelijke verplichting"], ["Verbetering van de website", "Gerechtvaardigd belang"], ["Versturen van een nieuwsbrief (indien aangemeld)", "Toestemming"]];
const PV_BEWAREN = [["Contactberichten", "maximaal 1 jaar na het laatste contact"], ["Coachingsdossiers", "2 jaar na afronding van het traject"], ["Financiële administratie", "7 jaar (wettelijke bewaarplicht Belastingdienst)"], ["Nieuwsbriefabonnees", "zolang je ingeschreven blijft; na afmelding direct verwijderd"]];
const PV_RECHTEN = [["Inzage", "je kunt opvragen welke gegevens ik van je verwerk"], ["Rectificatie", "je kunt onjuiste gegevens laten corrigeren"], ["Verwijdering", "je kunt verzoeken om verwijdering van jouw gegevens (“recht om vergeten te worden”)"], ["Beperking", "je kunt vragen de verwerking tijdelijk te beperken"], ["Bezwaar", "je kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang"], ["Overdraagbaarheid", "je kunt jouw gegevens in een gangbaar formaat opvragen"]];
function PvH({
  s
}) {
  return /*#__PURE__*/React.createElement("h2", {
    className: "ewk-legal__h",
    id: s.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__hn"
  }, s.n), s.title);
}
function PrivacyPage({
  onNav
}) {
  const [active, setActive] = useStPv("wie");

  // highlight the TOC item for the section currently in view
  useEffPv(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    });
    PV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  }
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-pagehead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-pagehead__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Privacy"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-pagehead__title"
  }, "Jouw gegevens, in ", /*#__PURE__*/React.createElement("em", null, "vertrouwde"), " handen"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-pagehead__sub"
  }, "Ik ga zorgvuldig en eerlijk om met je persoonsgegevens. Hieronder leg ik zo helder mogelijk uit welke gegevens ik verwerk, waarvoor, en welke rechten je hebt."), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__updated"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check"
  }), "Laatst bijgewerkt: mei 2025"))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-legal"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ewk-legal__toc"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__toc-label"
  }, "Op deze pagina"), /*#__PURE__*/React.createElement("nav", null, PV_SECTIONS.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: "#" + s.id,
    className: "ewk-legal__toc-link" + (active === s.id ? " is-active" : ""),
    onClick: e => jump(e, s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__toc-n"
  }, s.n), s.title)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__body"
  }, /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[0]
  }), /*#__PURE__*/React.createElement("p", null, "Ik ben Agathe Hania, zelfstandig psycholoog en coach onder de naam", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " Expeditie Werkplezier"), ". Ik ben gevestigd in Waddinxveen en ingeschreven bij de Kamer van Koophandel."), /*#__PURE__*/React.createElement("p", null, "Als verwerkingsverantwoordelijke bepaal ik welke persoonsgegevens ik verzamel, hoe ik die gebruik en hoe lang ik ze bewaar. In deze privacyverklaring leg ik dat zo helder mogelijk uit."), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[1]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__cards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__card-ic ewk-legal__card-ic--rose"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  })), /*#__PURE__*/React.createElement("h4", null, "Contactformulier en e-mail"), /*#__PURE__*/React.createElement("p", null, "Wanneer je contact met me opneemt, verwerk ik:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__ticks"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Naam"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "E-mailadres"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "De inhoud van je bericht"))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__card-ic ewk-legal__card-ic--sage"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "messages-square"
  })), /*#__PURE__*/React.createElement("h4", null, "Kennismaking en coaching"), /*#__PURE__*/React.createElement("p", null, "In een (gratis) kennismakingsgesprek of coachtraject verwerk ik:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__ticks"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Naam en contactgegevens"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Wat je deelt over je werk- en priv\xE9situatie"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Voortgang en aantekeningen (enkel intern, nooit gedeeld)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Facturatiegegevens (naam, adres, e-mail)"))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__card-ic ewk-legal__card-ic--sky"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe"
  })), /*#__PURE__*/React.createElement("h4", null, "Website en cookies"), /*#__PURE__*/React.createElement("p", null, "Bij een bezoek aan mijn website kunnen technische gegevens worden vastgelegd:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__ticks"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "IP-adres (geanonimiseerd)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Browsertype en -versie"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Bezochte pagina's en tijdstip")))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cookie"
  }), "Ik gebruik uitsluitend functionele cookies die nodig zijn voor het correct werken van de website. Er worden geen tracking- of advertentiecookies geplaatst zonder jouw toestemming."), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[2]
  }), /*#__PURE__*/React.createElement("p", null, "Ik verwerk jouw gegevens alleen voor deze doelen, telkens op een wettelijke grondslag:"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__table",
    role: "table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__tr ewk-legal__tr--head",
    role: "row"
  }, /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Doel"), /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Grondslag")), PV_DOELEN.map(([doel, grond]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__tr",
    role: "row",
    key: doel
  }, /*#__PURE__*/React.createElement("span", {
    role: "cell"
  }, doel), /*#__PURE__*/React.createElement("span", {
    role: "cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__pill"
  }, grond))))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__lead"
  }, "Ik gebruik jouw gegevens nooit voor andere doeleinden dan hierboven vermeld, en", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " verkoop ze nooit aan derden"), "."), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[3]
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__deflist"
  }, PV_BEWAREN.map(([t, d]) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defterm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), t), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defdesc"
  }, d)))), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[4]
  }), /*#__PURE__*/React.createElement("p", null, "Ik deel jouw gegevens in principe niet met derden. In een beperkt aantal gevallen is dat wel nodig:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__bullets"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calculator"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Boekhouder / accountant"), " \u2014 voor de financi\xEBle administratie, onder strikte geheimhoudingsplicht.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "server"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "E-mailprovider / hostingpartij"), " \u2014 voor de technische verwerking van berichten en de website; zij mogen de gegevens uitsluitend gebruiken om hun dienst te leveren.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "scale"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Wettelijke verplichting"), " \u2014 indien een bevoegde instantie hierom vraagt."))), /*#__PURE__*/React.createElement("p", null, "Met alle verwerkers heb ik een verwerkersovereenkomst afgesloten of zijn passende contractuele afspraken gemaakt."), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[5]
  }), /*#__PURE__*/React.createElement("p", null, "Ik neem passende technische en organisatorische maatregelen om jouw persoonsgegevens te beschermen tegen verlies, misbruik of onbevoegde toegang. Denk aan:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__ticks ewk-legal__ticks--inline"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "lock"
  }), "Versleutelde verbindingen (HTTPS)"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "user-check"
  }), "Toegang tot dossiers uitsluitend voor mijzelf"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "hard-drive"
  }), "Regelmatige back-ups")), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[6]
  }), /*#__PURE__*/React.createElement("p", null, "Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je de volgende rechten:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__deflist ewk-legal__deflist--rights"
  }, PV_RECHTEN.map(([t, d]) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defterm"
  }, t), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defdesc",
    dangerouslySetInnerHTML: {
      __html: d
    }
  })))), /*#__PURE__*/React.createElement("p", null, "Om een verzoek in te dienen, stuur een e-mail naar", " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl"
  }, "agathe@agathehania.nl"), ". Ik reageer binnen 4 weken."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-alert"
  }), "Heb je een klacht over de manier waarop ik met jouw gegevens omga? Dan kun je een klacht indienen bij de ", /*#__PURE__*/React.createElement("a", {
    href: "https://www.autoriteitpersoonsgegevens.nl",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Autoriteit Persoonsgegevens"), "."), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[7]
  }), /*#__PURE__*/React.createElement("p", null, "Ik behoud het recht deze privacyverklaring te wijzigen. De actuele versie staat altijd op deze pagina. Bij ingrijpende wijzigingen ontvangen actieve klanten en nieuwsbriefabonnees een bericht."), /*#__PURE__*/React.createElement(PvH, {
    s: PV_SECTIONS[8]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__contact"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ewk-legal__contact-mark",
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__contact-q"
  }, "Heb je vragen over deze privacyverklaring? Neem gerust contact op."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__contact-rows"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), /*#__PURE__*/React.createElement("b", null, "Agathe Hania"), " \u2014 Expeditie Werkplezier"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl"
  }, "agathe@agathehania.nl")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin"
  }), "Waddinxveen, Nederland")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--ew-space-5)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Stuur me een bericht"))))))));
}
Object.assign(window, {
  PrivacyPage
});

/* ===== cookies.jsx ===== */
/* Expeditie Werkplezier – Cookiebeleid
   Reuses the .ewk-legal layout (sticky TOC + prose) from privacy.jsx / styles.css. */
const {
  useState: useStCk,
  useEffect: useEffCk
} = React;
const CK_SECTIONS = [{
  id: "ck-wat",
  n: "1",
  title: "Wat zijn cookies?"
}, {
  id: "ck-welke",
  n: "2",
  title: "Welke cookies gebruik ik?"
}, {
  id: "ck-derden",
  n: "3",
  title: "Cookies van derden"
}, {
  id: "ck-toestemming",
  n: "4",
  title: "Toestemming en cookievoorkeur"
}, {
  id: "ck-verwijderen",
  n: "5",
  title: "Hoe verwijder ik cookies?"
}, {
  id: "ck-wijzigingen",
  n: "6",
  title: "Wijzigingen"
}, {
  id: "ck-contact",
  n: "7",
  title: "Contact"
}];
const CK_FUNCTIONEEL = [["Sessiecookie", "Onthoudt je sessie-instellingen", "Sessie (verdwijnt als je de browser sluit)"], ["Voorkeurscookie", "Slaat weergavevoorkeuren op (bijv. taalinstelling)", "Max. 1 jaar"]];
const CK_ANALYTISCH = [["Analysecookie", "Geanonimiseerde paginastatistieken", "Max. 13 maanden"]];
const CK_BROWSERS = [["Chrome", "Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens"], ["Firefox", "Instellingen → Privacy & Beveiliging → Cookies en sitegegevens"], ["Safari", "Voorkeuren → Privacy → Beheer websitegegevens"], ["Edge", "Instellingen → Privacy, zoeken en services → Browsing-gegevens wissen"]];
function CkH({
  s
}) {
  return /*#__PURE__*/React.createElement("h2", {
    className: "ewk-legal__h",
    id: s.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__hn"
  }, s.n), s.title);
}
function CkTable({
  rows
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__table ewk-legal__table--3",
    role: "table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__tr ewk-legal__tr--head",
    role: "row"
  }, /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Cookie"), /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Doel"), /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Bewaartermijn")), rows.map(([c, d, b]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__tr",
    role: "row",
    key: c
  }, /*#__PURE__*/React.createElement("span", {
    role: "cell"
  }, c), /*#__PURE__*/React.createElement("span", {
    role: "cell",
    className: "ewk-legal__td-muted"
  }, d), /*#__PURE__*/React.createElement("span", {
    role: "cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__pill"
  }, b)))));
}
function CookiesPage({
  onNav
}) {
  const [active, setActive] = useStCk("ck-wat");
  useEffCk(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    });
    CK_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 110,
      behavior: "smooth"
    });
  }
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-pagehead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-pagehead__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Cookies"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-pagehead__title"
  }, "Een ", /*#__PURE__*/React.createElement("em", null, "schone"), " website, zonder gevolg"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-pagehead__sub"
  }, "Ik houd mijn website zo licht en privacy-vriendelijk mogelijk. Hieronder lees je welke cookies ik gebruik, waarom, en hoe je zelf de regie houdt."), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__updated"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check"
  }), "Laatst bijgewerkt: mei 2025"))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-legal"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ewk-legal__toc"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__toc-label"
  }, "Op deze pagina"), /*#__PURE__*/React.createElement("nav", null, CK_SECTIONS.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: "#" + s.id,
    className: "ewk-legal__toc-link" + (active === s.id ? " is-active" : ""),
    onClick: e => jump(e, s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__toc-n"
  }, s.n), s.title)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__body"
  }, /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[0]
  }), /*#__PURE__*/React.createElement("p", null, "Cookies zijn kleine tekstbestanden die door een website op je apparaat worden opgeslagen wanneer je de site bezoekt. Ze helpen de website correct te functioneren en kunnen informatie onthouden over je bezoek."), /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[1]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__catrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__cat-ic ewk-legal__cat-ic--sage"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "ewk-legal__cat-title"
  }, "Functionele cookies ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__tag ewk-legal__tag--on"
  }, "Altijd actief")), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__cat-desc"
  }, "Noodzakelijk voor het goed functioneren van de website. Zonder deze cookies werken bepaalde onderdelen niet naar behoren. Ze worden niet gebruikt om je te volgen of te profileren."))), /*#__PURE__*/React.createElement(CkTable, {
    rows: CK_FUNCTIONEEL
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__catrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__cat-ic ewk-legal__cat-ic--sky"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bar-chart-3"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "ewk-legal__cat-title"
  }, "Analytische cookies ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__tag ewk-legal__tag--opt"
  }, "Alleen met toestemming")), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__cat-desc"
  }, "Ik gebruik privacy-vriendelijke webstatistieken om te begrijpen hoe bezoekers de website gebruiken. De gegevens zijn geanonimiseerd en worden niet gedeeld met derden."))), /*#__PURE__*/React.createElement(CkTable, {
    rows: CK_ANALYTISCH
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__catrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__cat-ic ewk-legal__cat-ic--rose"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ban"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "ewk-legal__cat-title"
  }, "Marketing- en trackingcookies"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__cat-desc"
  }, "Ik plaats ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "geen"), " marketing- of trackingcookies zonder jouw uitdrukkelijke toestemming."))), /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[2]
  }), /*#__PURE__*/React.createElement("p", null, "Op sommige pagina's kan content van derden worden getoond (zoals een ingesloten video). Deze partijen kunnen eigen cookies plaatsen. Ik heb geen controle over de cookies van derden. Raadpleeg het privacybeleid van de betreffende partij voor meer informatie."), /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[3]
  }), /*#__PURE__*/React.createElement("p", null, "Bij je eerste bezoek aan de website verschijnt een cookiemelding. Hier kun je aangeven welke cookies je accepteert. Je kunt je voorkeur op elk moment wijzigen:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__bullets"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders-horizontal"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Via de cookiebanner"), " \u2014 klik op \u201CCookievoorkeuren\u201D onderaan de website.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Via je browser"), " \u2014 de meeste browsers bieden de mogelijkheid cookies te beheren, te blokkeren of te verwijderen."))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info"
  }), "Let op: het uitschakelen van functionele cookies kan de werking van de website be\xEFnvloeden."), /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[4]
  }), /*#__PURE__*/React.createElement("p", null, "Je kunt cookies verwijderen via de instellingen van je browser. Hieronder vind je het pad voor de meestgebruikte browsers:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__deflist"
  }, CK_BROWSERS.map(([b, path]) => /*#__PURE__*/React.createElement("li", {
    key: b
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defterm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right"
  }), b), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defdesc"
  }, path)))), /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[5]
  }), /*#__PURE__*/React.createElement("p", null, "Ik behoud het recht dit cookiebeleid te wijzigen. De actuele versie staat altijd op deze pagina. Controleer deze pagina regelmatig voor de meest recente informatie."), /*#__PURE__*/React.createElement(CkH, {
    s: CK_SECTIONS[6]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__contact"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ewk-legal__contact-mark",
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__contact-q"
  }, "Heb je vragen over het gebruik van cookies op deze website? Neem gerust contact op."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__contact-rows"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), /*#__PURE__*/React.createElement("b", null, "Agathe Hania"), " \u2014 Expeditie Werkplezier"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl"
  }, "agathe@agathehania.nl")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin"
  }), "Waddinxveen, Nederland")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--ew-space-5)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Stuur me een bericht"))))))));
}
Object.assign(window, {
  CookiesPage
});

/* ===== voorwaarden.jsx ===== */
/* Expeditie Werkplezier – Algemene Voorwaarden
   Same calm legal layout as privacy.jsx / cookies.jsx: sticky TOC + prose. */
const {
  useState: useStAv,
  useEffect: useEffAv
} = React;
const AV_SECTIONS = [{
  id: "definities",
  n: "1",
  title: "Definities"
}, {
  id: "toepasselijkheid",
  n: "2",
  title: "Toepasselijkheid"
}, {
  id: "overeenkomst",
  n: "3",
  title: "Totstandkoming van de overeenkomst"
}, {
  id: "tarieven",
  n: "4",
  title: "Tarieven en betaling"
}, {
  id: "annulering",
  n: "5",
  title: "Annuleren en verzetten"
}, {
  id: "uitvoering",
  n: "6",
  title: "Uitvoering van het traject"
}, {
  id: "vertrouwelijkheid",
  n: "7",
  title: "Vertrouwelijkheid"
}, {
  id: "aansprakelijkheid",
  n: "8",
  title: "Aansprakelijkheid"
}, {
  id: "eigendom",
  n: "9",
  title: "Intellectueel eigendom"
}, {
  id: "klachten",
  n: "10",
  title: "Klachten"
}, {
  id: "recht",
  n: "11",
  title: "Toepasselijk recht"
}, {
  id: "contact",
  n: "12",
  title: "Contact"
}];
const AV_DEFINITIES = [["Coach", "Agathe Hania, handelend onder de naam Expeditie Werkplezier, gevestigd in Waddinxveen en ingeschreven bij de Kamer van Koophandel onder nummer 57284946."], ["Klant", "de natuurlijke persoon die een sessie, traject of andere dienst bij de Coach afneemt of daarover een offerte ontvangt."], ["Diensten", "coaching, 1-op-1 sessies (waaronder de Deep Dive), trainingen en advies, in welke vorm dan ook aangeboden."], ["Overeenkomst", "elke afspraak tussen de Coach en de Klant over het leveren van Diensten, inclusief een boeking via de website."]];
const AV_ANNULERING = [["Kosteloos verzetten", "tot uiterlijk 48 uur vóór de afspraak"], ["Annuleren binnen 48 uur", "50% van het overeengekomen tarief is verschuldigd"], ["Niet verschijnen of niet annuleren", "het volledige tarief is verschuldigd"]];
function AvH({
  s
}) {
  return /*#__PURE__*/React.createElement("h2", {
    className: "ewk-legal__h",
    id: s.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__hn"
  }, s.n), s.title);
}
function VoorwaardenPage({
  onNav
}) {
  const [active, setActive] = useStAv("definities");
  useEffAv(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    });
    AV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  }
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    className: "ewk-pagehead"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-pagehead__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Algemene voorwaarden"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-pagehead__title"
  }, "Duidelijke ", /*#__PURE__*/React.createElement("em", null, "afspraken"), ", zodat we ontspannen kunnen werken"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-pagehead__sub"
  }, "Hieronder lees je de voorwaarden die gelden voor mijn sessies, trajecten en andere diensten. Helder en zonder kleine lettertjes \u2014 zodat je precies weet waar je aan toe bent."), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__updated"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check"
  }), "Laatst bijgewerkt: juni 2026"))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-legal"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "ewk-legal__toc"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__toc-label"
  }, "Op deze pagina"), /*#__PURE__*/React.createElement("nav", null, AV_SECTIONS.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: "#" + s.id,
    className: "ewk-legal__toc-link" + (active === s.id ? " is-active" : ""),
    onClick: e => jump(e, s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__toc-n"
  }, s.n), s.title)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__body"
  }, /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[0]
  }), /*#__PURE__*/React.createElement("p", null, "In deze algemene voorwaarden bedoel ik met de volgende begrippen:"), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__deflist"
  }, AV_DEFINITIES.map(([t, d]) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defterm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark"
  }), t), /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__defdesc"
  }, d)))), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[1]
  }), /*#__PURE__*/React.createElement("p", null, "Deze voorwaarden zijn van toepassing op elke offerte, aanbieding en Overeenkomst tussen de Coach en de Klant, en op alle Diensten die daaruit voortvloeien."), /*#__PURE__*/React.createElement("p", null, "Afwijkingen van deze voorwaarden gelden alleen wanneer die", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " vooraf en schriftelijk"), " zijn overeengekomen. Als een bepaling nietig of vernietigbaar blijkt, blijven de overige bepalingen onverkort gelden."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[2]
  }), /*#__PURE__*/React.createElement("p", null, "Een Overeenkomst komt tot stand wanneer je een sessie of traject boekt via de website, een offerte schriftelijk akkoord geeft, of wanneer ik je opdracht bevestig per e-mail."), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__bullets"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-check"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Boeking"), " \u2014 bij een online boeking ontvang je direct een bevestiging en een uitnodiging om een moment te kiezen.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Offerte"), " \u2014 een offerte is vrijblijvend en 30 dagen geldig, tenzij anders vermeld."))), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[3]
  }), /*#__PURE__*/React.createElement("p", null, "De tarieven staan vermeld op de website of in de offerte en zijn voor consumenten ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "inclusief btw"), ", tenzij anders aangegeven."), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__ticks ewk-legal__ticks--inline"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Online boekingen worden vooraf voldaan"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Facturen: betaling binnen 14 dagen"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Bij trajecten is betaling in termijnen bespreekbaar")), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info"
  }), "Blijft betaling uit, dan stuur ik eerst een kosteloze herinnering. Pas daarna kunnen eventuele incassokosten in rekening worden gebracht conform de wettelijke regeling."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[4]
  }), /*#__PURE__*/React.createElement("p", null, "Het kan gebeuren dat een afspraak niet uitkomt. Laat het me dan zo snel mogelijk weten, dan plannen we samen een nieuw moment. Voor het verzetten of annuleren geldt:"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__table",
    role: "table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__tr ewk-legal__tr--head",
    role: "row"
  }, /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Situatie"), /*#__PURE__*/React.createElement("span", {
    role: "columnheader"
  }, "Wat betekent dat")), AV_ANNULERING.map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__tr",
    role: "row",
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    role: "cell"
  }, t), /*#__PURE__*/React.createElement("span", {
    role: "cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__pill"
  }, d))))), /*#__PURE__*/React.createElement("p", null, "Bij ziekte of overmacht zoeken we altijd samen naar een passende oplossing. Moet ik zelf een afspraak verzetten, dan bied ik je zo snel mogelijk een nieuw moment aan."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[5]
  }), /*#__PURE__*/React.createElement("p", null, "Ik voer elke opdracht uit naar mijn beste inzicht en vermogen, op basis van een", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " inspanningsverplichting"), ". Coaching is maatwerk en persoonlijke ontwikkeling; ik kan daarom geen specifiek resultaat garanderen."), /*#__PURE__*/React.createElement("p", null, "Voor een goed verloop ga ik ervan uit dat je open en eerlijk deelt wat relevant is. Jouw eigen inzet is een belangrijke voorwaarde voor het effect van het traject."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[6]
  }), /*#__PURE__*/React.createElement("p", null, "Alles wat je met me deelt, behandel ik ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "strikt vertrouwelijk"), ". Ik bespreek jouw situatie niet met derden zonder jouw uitdrukkelijke toestemming, behalve wanneer een wettelijke verplichting mij daartoe dwingt."), /*#__PURE__*/React.createElement("p", null, "De manier waarop ik met je persoonsgegevens omga staat beschreven in mijn", " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("Privacy");
    }
  }, "privacyverklaring"), "."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[7]
  }), /*#__PURE__*/React.createElement("p", null, "Coaching en advies zijn ondersteunend van aard. Je blijft te allen tijde zelf verantwoordelijk voor de keuzes die je maakt en het handelen op basis daarvan."), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-legal__bullets"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield"
  })), /*#__PURE__*/React.createElement("span", null, "Mijn aansprakelijkheid is beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht.")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "ewk-legal__bdot"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart-pulse"
  })), /*#__PURE__*/React.createElement("span", null, "Coaching is geen vervanging van medische of psychologische behandeling. Bij ernstige klachten verwijs ik je door naar je huisarts of een passende behandelaar."))), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[8]
  }), /*#__PURE__*/React.createElement("p", null, "Alle materialen die ik ontwikkel \u2014 werkbladen, oefeningen, teksten en de inhoud van deze website \u2014 blijven mijn intellectueel eigendom. Je mag ze gebruiken binnen jouw eigen traject, maar niet zonder toestemming vermenigvuldigen of delen met derden."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[9]
  }), /*#__PURE__*/React.createElement("p", null, "Ben je ergens niet tevreden over? Laat het me dan weten \u2014 ik los het graag samen met je op. Stuur je klacht naar", " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl"
  }, "agathe@agathehania.nl"), "; je ontvangt binnen 5 werkdagen een reactie en we zoeken naar een passende oplossing."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[10]
  }), /*#__PURE__*/React.createElement("p", null, "Op alle Overeenkomsten en deze voorwaarden is het ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Nederlands recht"), " ", "van toepassing. Komen we er samen niet uit, dan leggen we het geschil voor aan de bevoegde rechter in het arrondissement waar ik gevestigd ben."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info"
  }), "Ik behoud het recht deze voorwaarden te wijzigen. De actuele versie staat altijd op deze pagina."), /*#__PURE__*/React.createElement(AvH, {
    s: AV_SECTIONS[11]
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__contact"
  }, /*#__PURE__*/React.createElement("img", {
    className: "ewk-legal__contact-mark",
    src: "assets/logo-mark.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ewk-legal__contact-q"
  }, "Heb je vragen over deze voorwaarden? Neem gerust contact op."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-legal__contact-rows"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), /*#__PURE__*/React.createElement("b", null, "Agathe Hania"), " \u2014 Expeditie Werkplezier"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), /*#__PURE__*/React.createElement("a", {
    href: "mailto:agathe@agathehania.nl"
  }, "agathe@agathehania.nl")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin"
  }), "Waddinxveen, Nederland")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--ew-space-5)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right",
    onClick: () => onNav("Contact")
  }, "Stuur me een bericht"))))))));
}
Object.assign(window, {
  VoorwaardenPage
});

/* ===== home.jsx ===== */
/* Expeditie Werkplezier – Home (rewritten copy)
   "Van altijd 'aan' naar rust, energie en regie" */

const HOME_SYMPTOMS = [["zap", "Ik ben ", "continu moe", " en heb weinig energie."], ["flame", "Ik heb een ", "kort lontje", "."], ["briefcase", "Ik kan mijn werk ", "moeilijk loslaten", "."], ["waves", "Ik heb moeite om me ", "volledig te ontspannen", "."], ["cloud-rain", "Ik voel me ", "onrustig en pieker", " veel."], ["brain", "Mijn hoofd is ", "overprikkeld", ", ik concentreer me slecht."]];
const HOME_BENEFITS = [["Je ", "meer rust", " hebt in je hoofd en lijf."], ["Je weer ", "energie voelt", " en beter slaapt."], ["Je af en toe ", "de boel de boel", " kunt laten, zonder schuldgevoel."], ["Je veel meer kunt ", "genieten", " van het moment."], ["Je beter voelt ", "wat je nodig hebt", " – en daar ook naar handelt."], ["Je je ", "werk weer loslaat", ", zodat je écht aanwezig bent thuis."]];

/* ---- Hero, two layouts (tweakable) ---- */
function HomeHero({
  homeHero,
  onScan,
  onNav,
  onPlay,
  portret
}) {
  if (homeHero === "statement") {
    return /*#__PURE__*/React.createElement("section", {
      className: "ewk-hero ewk-hero--statement"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ewk-wrap ewk-hero__center"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Van werkdruk naar werkgeluk"), /*#__PURE__*/React.createElement("h1", {
      className: "ewk-hero__big"
    }, "Van altijd \u2018aan\u2019", /*#__PURE__*/React.createElement("br", null), "naar ", /*#__PURE__*/React.createElement("em", null, "rust, energie en regie")), /*#__PURE__*/React.createElement("p", {
      className: "ewk-hero__lead is-center"
    }, "Ik help hoogopgeleide moeders die vastlopen in de combinatie van werk en gezin om hun stress te doorbreken en weer rust, energie en regie te ervaren."), /*#__PURE__*/React.createElement("div", {
      className: "ewk-hero__cta is-center"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      icon: "clipboard-list",
      onClick: onScan
    }, "Start de gratis Stress & Energiescan"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "lg",
      onClick: () => onNav("Over Agathe")
    }, "Lees mijn verhaal"))));
  }
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-hero ewk-hero--quote"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-hero__grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Van werkdruk naar werkgeluk"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-hero__quote"
  }, "Van altijd \u2018aan\u2019 naar ", /*#__PURE__*/React.createElement("em", null, "rust, energie en regie")), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead"
  }, "Ik help hoogopgeleide moeders die vastlopen in de combinatie van werk en gezin en continu", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " \u201Caan\u201D staan"), ", om hun stress te doorbreken en weer", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " rust, energie en regie"), " te ervaren."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-hero__lead",
    style: {
      marginTop: 16
    }
  }, "Met een heldere aanpak gericht op jouw brein, lichaam en patronen ontdek je wat je kunt doen om uit die overdrive te komen, zodat je weer keuzes maakt die echt bij je passen."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "clipboard-list",
    onClick: onScan
  }, "Start de gratis Stress & Energiescan"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    onClick: () => onNav("Over Agathe")
  }, "Lees mijn verhaal"))), /*#__PURE__*/React.createElement(Portrait, {
    play: true,
    onPlay: onPlay,
    src: portret
  })));
}

/* ---- "Ben jij dit?" recognition ---- */
function HomeRecognition() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-recogtop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-prose"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Ben jij dit?"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 22px"
    }
  }, "Je houdt alles draaiende maar het kost je steeds meer"), /*#__PURE__*/React.createElement("p", null, "Je draagt veel verantwoordelijkheid en werkt in een omgeving waar veel van je gevraagd wordt. Je zorgt voor anderen, ziet wat er moet gebeuren en wilt het graag goed doen. Op je werk \xE9n thuis. Dat maakt je betrouwbaar en loyaal."), /*#__PURE__*/React.createElement("p", null, "Maar het is ook precies waar het begint te wringen. Want ergens onderweg ben je jezelf voorbijgelopen. Je staat vaak ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "\u201Caan\u201D"), " en de uitknop is niet altijd meer goed te vinden. Herkenbaar?")), /*#__PURE__*/React.createElement("figure", {
    className: "ewk-photofig ewk-recogtop__media"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/photos/cta-9403.jpg",
    alt: "Agathe wijst naar je",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-list",
    style: {
      marginTop: 16
    }
  }, HOME_SYMPTOMS.map(([ic, a, b, c], i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic
  })), /*#__PURE__*/React.createElement("span", null, a, /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, b), c)))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "En hoe harder je probeert, hoe minder grip je lijkt te hebben.")));
}

/* ---- "Wat is er aan de hand?" ---- */
function HomeProblem({
  onScan
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose",
    style: {
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Wat is er aan de hand?"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 24px"
    }
  }, "Het echte probleem is geen gebrek aan discipline"), /*#__PURE__*/React.createElement("p", null, "Je zit in een patroon dat zich langzaam heeft opgebouwd, waarin je gewend bent om door te gaan, verantwoordelijkheid te nemen en alles zo goed mogelijk te doen. Juist als het drukker wordt of zwaarder voelt, ga je automatisch een stapje harder lopen."), /*#__PURE__*/React.createElement("p", null, "Dat geeft op de korte termijn het gevoel dat je controle houdt. Maar ondertussen neem je steeds minder echte rust, blijf je vooral in je hoofd zitten en raak je verder verwijderd van wat je nodig hebt. Waardoor dat gevoel van onrust, vermoeidheid en een vol hoofd juist blijft.", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "En dat is precies wat het zo frustrerend maakt. Je doet z\xF3 je best, maar het levert niet meer op wat het vroeger deed.")), /*#__PURE__*/React.createElement("p", null, "De eerste stap is dan ook niet n\xF3g harder je best doen, maar inzicht krijgen in wat er bij jou speelt. Waar zit jouw spanning? Welke signalen geeft je lichaam? En waarom blijf je doen wat je doet? Dat is precies waar de Stress & Energiescan je bij helpt."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "clipboard-list",
    onClick: onScan
  }, "Start de gratis Stress & Energiescan"))));
}

/* ---- "Het kan ook anders" benefits ---- */
function HomeBenefits() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Het kan ook anders",
    title: "Wat als je maar <em>\xE9\xE9n stap</em> verwijderd bent van een ander leven?",
    sub: "Een leven waarin:"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-list"
  }, HOME_BENEFITS.map(([a, b, c], i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("span", null, a, /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, b), c)))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-section__sub ewk-section__sub--after"
  }, "Ook al blijft jouw omgeving hetzelfde, jij leert anders omgaan met wat er speelt op een manier die voor jou werkt.")));
}

/* ---- Over mij teaser ---- */
function HomeAbout({
  onNav,
  portret
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__photo"
  }, /*#__PURE__*/React.createElement(Portrait, {
    size: "100%",
    src: "assets/photos/portrait-9371.jpg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Over mij"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Van overleven op wilskracht naar rust, energie en regie"), /*#__PURE__*/React.createElement("p", null, "Ik ben Agathe, psycholoog en moeder, en ik help al meer dan 10 jaar hoogopgeleide moeders die vastlopen in de combinatie van werk en gezin. Na mijn zwangerschapsverlof ging ik parttime werken, maar mijn taken bleven gelijk. Ik bleef doorgaan, tot mijn lichaam op de rem trapte."), /*#__PURE__*/React.createElement("p", null, "Tijdens mijn herstel begon ik te begrijpen wat er werkelijk speelde: een groot verantwoodelijkheidsgevoel, altijd doorgaan en het gevoel dat het nooit genoegd was. Dit zelfde patroon zag ik later steeds terugzag bij de vrouwen die ik begeleid. Ik combineer psychologie, wetenschappelijke inzichten en lichaamsgerichte technieken met", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "praktische stappen die direct toepasbaar zijn"), ". Zodat dat je niet alleen begrijpt wat er met je gebeurt maar ook weet wat je kunt doen om weer rust, energie en regie te ervaren."), /*#__PURE__*/React.createElement(Button, {
    variant: "solid",
    iconRight: "arrow-right",
    onClick: () => onNav("Over Agathe")
  }, "Lees meer over mij"))));
}

/* ---- Shared offer ladder (also used on Aanbod page) ---- */
function WerkLadder({
  onScan,
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-ladder"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ewk-rung ewk-rung--sky",
    onClick: onScan
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-rung__step"
  }, "Gratis"), /*#__PURE__*/React.createElement("h3", null, "Stress & Energiescan"), /*#__PURE__*/React.createElement("p", null, "Ontdek in 10 minuten wat er \xE9cht speelt in jouw brein en lichaam. En wat je nu al kunt doen."), /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__link"
  }, "Doe de gratis scan ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "ewk-rung ewk-rung--gold",
    onClick: () => onNav("Deep Dive")
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-rung__step"
  }, "Losse sessie \xB7 \u20AC\xA0147"), /*#__PURE__*/React.createElement("h3", null, "1-op-1 Deep Dive"), /*#__PURE__*/React.createElement("p", null, "In \xE9\xE9n sessie van 60 minuten helderheid, richting en een concreet plan."), /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__link"
  }, "Bekijk de Deep Dive ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "ewk-rung ewk-rung--rose",
    onClick: () => onNav("Traject")
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-rung__step"
  }, "Begeleidingstraject"), /*#__PURE__*/React.createElement("h3", null, PROGRAMMA.naam), /*#__PURE__*/React.createElement("p", null, PROGRAMMA.sub, ", in 3 maanden duurzaam naar rust, energie en regie."), /*#__PURE__*/React.createElement("span", {
    className: "ewk-offer__link"
  }, "Bekijk het traject ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right"
  }))));
}
function HomeAanbod({
  onScan,
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Zo kun je met me werken",
    title: "Klaar om het niet langer alleen te doen?",
    sub: "Drie manieren om met me te werken \u2013 van een gratis scan tot een compleet 1-op-1 traject. Kies wat bij jou past."
  }), /*#__PURE__*/React.createElement(WerkLadder, {
    onScan: onScan,
    onNav: onNav
  })));
}

/* ---- Ervaringen ---- */
function HomeErvaringen() {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Ervaringen",
    title: "Verhalen van vrouwen die je voorgingen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-testgrid"
  }, HOME_REVIEWS.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    className: "ewk-testcard",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, Array.from({
    length: t.rating
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", null, t.quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: t
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("br", null), t.role)))))));
}

/* ---- Afsluiting ---- */
function HomeAfsluiting({
  onScan,
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta ewk-finalcta--scan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tot slot"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Er is niets mis met jou"), /*#__PURE__*/React.createElement("p", null, "Misschien herken je jezelf in dit verhaal. Weet dan: je systeem is gewoon overbelast geraakt. En daar kun je iets aan doen. Begin met de Stress & Energiescan."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    icon: "clipboard-list",
    onClick: onScan
  }, "Doe de gratis scan"))));
}
function Home({
  homeHero,
  showTrust,
  onScan,
  onNav,
  onPlay,
  portret
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(HomeHero, {
    homeHero: homeHero,
    onScan: onScan,
    onNav: onNav,
    onPlay: onPlay,
    portret: portret
  }), showTrust !== false && /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(HomeRecognition, null), /*#__PURE__*/React.createElement(HomeProblem, {
    onScan: onScan
  }), /*#__PURE__*/React.createElement(HomeBenefits, null), /*#__PURE__*/React.createElement(HomeAbout, {
    onNav: onNav,
    portret: portret
  }), /*#__PURE__*/React.createElement(HomeAanbod, {
    onScan: onScan,
    onNav: onNav
  }), /*#__PURE__*/React.createElement(HomeErvaringen, null), /*#__PURE__*/React.createElement(HomeAfsluiting, {
    onScan: onScan,
    onNav: onNav
  }));
}
Object.assign(window, {
  Home,
  WerkLadder
});

/* ===== bedankt.jsx ===== */
/* Expeditie Werkplezier – Bedankpagina Stress & Energiescan (OTO: Deep Dive €97)
   Niet in de navigatie. Bereikbaar via #bedankt-scan – de redirect-bestemming
   na aankoop/aanvraag op plug&pay. */

/* Eigen aanbod-checkout voor de scan-bedankpagina (OTO €97). */
const BDK_CHECKOUT = "https://expeditiewerkplezier.plugandpay.com/checkout/1-op-1-deep-dive-oto";
const BDK_VIDEO = "assets/bedrijfsvideo.mp4";
const BDK_OPLEVERT = ["Helderheid over wat er bij jou speelt, niet in losse stukjes, maar als één geheel", "Inzicht in het patroon dat maakt dat je blijft doorgaan terwijl het te veel is", "Eén concrete focus om mee te starten, in plaats van alles tegelijk te willen oplossen", "Een persoonlijk plan dat past bij jouw situatie en jouw leven", "Rust in je hoofd, vaak al direct na de sessie voelbaar"];
const BDK_PAIN = ["steeds maar door te gaan terwijl je voelt dat het eigenlijk te veel is", "van alles te proberen, maar niet echt verschil te merken", "een vol hoofd te hebben dat maar blijft doorgaan", "te twijfelen wat nu écht de juiste stap is", "alles tegelijk te willen oplossen en daardoor vast te blijven zitten", "aan het einde van de dag moe te zijn, zonder het gevoel dat je echt verder komt", "het idee te hebben dat je dit alleen moet uitzoeken"];
const BDK_GAIN = ["je weer overzicht voelt in je hoofd, in plaats van chaos", "je precies weet waar je moet beginnen, zonder te blijven twijfelen", "je niet meer alles tegelijk hoeft op te lossen, maar stap voor stap vooruitgaat", "je meer rust ervaart in je lichaam, ook op drukke dagen", "je weer met aandacht aanwezig bent thuis, zonder dat je hoofd ergens anders zit", "je de dag afsluit met het gevoel dat het genoeg is geweest"];

/* BEDANKT_REVIEWS komt uit data.jsx (echte reviews) */

const BDK_FAQ = [{
  q: "Wat levert één sessie me op?",
  a: "Helderheid, richting en een concreet plan waar je direct mee verder kunt. De meeste vrouwen gaan naar huis met een inzicht dat alles op z'n plek laat vallen. Vaak ervaar je al tijdens de sessie meer rust in je hoofd."
}, {
  q: "Moet ik alles al goed kunnen uitleggen?",
  a: "Nee. Kom zoals je bent. Je hoeft je situatie niet perfect te verwoorden, dat is precies waar ik je bij help. We zoeken het samen uit."
}, {
  q: "Is één sessie genoeg?",
  a: "Veel vrouwen ervaren na één sessie een duidelijk inzicht en weten welke eerste stap ze kunnen zetten. Verandering vasthouden is iets anders. Als je merkt dat je daarin begeleiding wilt, bespreken we dat aan het einde van de sessie."
}, {
  q: "Wat als ik het spannend vind om mijn verhaal te delen?",
  a: "Dat is heel normaal. De sessie is volledig vertrouwelijk en afgestemd op jou. Er is geen goed of fout antwoord. Veel vrouwen merken dat het al opluchting geeft om hun verhaal hardop te zeggen."
}, {
  q: "Hoe snel kan ik terecht?",
  a: "Na je boeking ontvang je direct een bevestiging en een link om een moment te kiezen dat jou uitkomt. Meestal kun je binnen een week terecht."
}, {
  q: "Hoe plan ik een sessie?",
  a: "Via de knop boek je de 1-op-1 sessie. Na boeking ontvang je direct een uitnodiging om een moment te kiezen dat jou uitkomt. De beschikbare dagen zijn maandag t/m vrijdag tussen 13.30 en 17.00 uur."
}, {
  q: "Wat als ik twijfel of dit iets voor mij is?",
  a: "Dan is dat juist een teken dat je er klaar voor bent. Twijfel betekent dat je voelt dat er iets moet veranderen, maar nog niet weet hoe. Dat is precies waar we in de sessie mee beginnen."
}];
function BdkPrijsCta({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-offerbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-offerbar__price"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-offerbar__kicker"
  }, "1-op-1 Deep Dive sessie \xB7 60 minuten"), /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-offerbar__amount"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-now"
  }, "\u20AC 97"), /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-was"
  }, "\u20AC 147"), /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-save"
  }, "je bespaart \u20AC 50"))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: BDK_CHECKOUT
  }, label || "Boek een Deep Dive sessie"));
}
function ScanBedankt({
  onNav
}) {
  return /*#__PURE__*/React.createElement("main", {
    className: "ewk-bdk"
  }, /*#__PURE__*/React.createElement("section", {
    className: "ewk-bdk-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-bdk-hero__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-badge"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), " Gelukt \u2013 je scan is onderweg"), /*#__PURE__*/React.createElement("h1", {
    className: "ewk-bdk-hero__title"
  }, "Hier is ie!"), /*#__PURE__*/React.createElement("p", {
    className: "ewk-bdk-hero__sub"
  }, "De ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Stress & Energiescan"), " om in 10 minuten meer", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, " rust, overzicht en regie"), " te ervaren is onderweg naar je inbox."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-bdk-hero__lead"
  }, "Maar voordat je naar je mailbox snelt om alles te bekijken, wil ik eerst dit met je delen."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-video"
  }, /*#__PURE__*/React.createElement("video", {
    src: BDK_VIDEO,
    controls: true,
    playsInline: true,
    poster: "assets/cover-photo.png",
    preload: "metadata"
  })), /*#__PURE__*/React.createElement("p", {
    className: "ewk-bdk-hero__after"
  }, "Yesss, superfijn dat je deze scan hebt aangevraagd. Deze scan gaat je heel veel inzichten geven. Je krijgt niet alleen kennis en algemene inzichten \u2013 je ontdekt ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "jouw persoonlijke stressprofiel"), ", zodat je direct heel gericht weet wat er speelt."), /*#__PURE__*/React.createElement("p", {
    className: "ewk-bdk-hero__after"
  }, "Wil je niet wachten en meteen doorpakken? Dan heb ik hier een toffe aanbieding voor je."))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose ewk-bdk-center"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Eenmalige aanbieding"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 20px"
    }
  }, "Ben je klaar met alles steeds ", /*#__PURE__*/React.createElement("em", null, "alleen"), " uitzoeken?"), /*#__PURE__*/React.createElement("p", null, "Deze Deep Dive is voor jou als je een sterke, hoogopgeleide moeder bent met een verantwoordelijke baan of onderneming en merkt dat je jezelf onderweg bent kwijtgeraakt."), /*#__PURE__*/React.createElement("p", null, "Je wilt het goed doen op je werk \xE9n thuis. Je hebt een groot verantwoordelijkheidsgevoel, bent gewend om door te gaan, maar voelt dat het zo niet langer gaat. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Je weet dat er iets moet veranderen."), " Maar wat precies \u2013 en waar begin je?"), /*#__PURE__*/React.createElement("p", null, "In \xE9\xE9n sessie brengen we samen in kaart wat er bij jou speelt, welk patroon jou hier heeft gebracht en wat jou nu het meest helpt. Je gaat naar huis met scherpe inzichten en een concreet plan om anders te gaan leven en werken."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(BdkPrijsCta, {
    label: "Boek een 1-op-1 Deep Dive sessie"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__photo"
  }, /*#__PURE__*/React.createElement(Portrait, {
    size: "100%"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ewk-about__text"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Waarom verandert er vaak niets?"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Veel vrouwen weten niet waar te beginnen"), /*#__PURE__*/React.createElement("p", null, "Ze herkennen zichzelf volledig in de signalen en zien precies waar het schuurt. Ze voelen dat het zo niet langer kan, maar het lukt ze niet om iets aan de situatie te veranderen."), /*#__PURE__*/React.createElement("p", null, "Niet omdat ze de vaardigheden niet hebben, maar omdat ze niet goed weten waar ze moeten beginnen. Ze blijven nadenken en twijfelen, of proberen van alles tegelijk, waardoor het overzicht juist weer verdwijnt.", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Als je eerlijk bent, herken je dat misschien ook wel."), " Daarom heb ik dit voor je ontwikkeld.")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat deze sessie je oplevert",
    title: "In \xE9\xE9n sessie van stilstand naar een concrete eerste stap",
    sub: "We kijken samen naar jouw situatie, niet in losse stukjes, maar als geheel. We maken inzichtelijk wat er onder jouw klachten zit, waar jij jezelf onbewust voorbij loopt en wat jou nu het meest helpt."
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ewk-bdk-checklist"
  }, BDK_OPLEVERT.map(o => /*#__PURE__*/React.createElement("li", {
    key: o
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), o))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-center",
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: BDK_CHECKOUT
  }, "Ja, ik wil direct aan de slag")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Wat andere vrouwen zeggen",
    title: "E\xE9n gesprek dat alles op z'n plek laat vallen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-testgrid"
  }, BEDANKT_REVIEWS.map((t, i) => /*#__PURE__*/React.createElement("figure", {
    className: "ewk-testcard",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-stars"
  }, Array.from({
    length: t.rating
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star"
  }))), /*#__PURE__*/React.createElement("blockquote", null, t.quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(ReviewAvatar, {
    r: t
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("br", null), t.role))))))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--wash"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Ben je het zat?",
    title: "Van blijven doorgaan naar weer ruimte voelen"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--sym"
  }, /*#__PURE__*/React.createElement("h4", null, "Ben je het zat om\u2026"), /*#__PURE__*/React.createElement("ul", null, BDK_PAIN.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--sym"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  })), p)))), /*#__PURE__*/React.createElement("div", {
    className: "ewk-forwho__col ewk-forwho__col--ben"
  }, /*#__PURE__*/React.createElement("h4", null, "Stel je eens voor dat\u2026"), /*#__PURE__*/React.createElement("ul", null, BDK_GAIN.map(p => /*#__PURE__*/React.createElement("li", {
    key: p
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-ic ewk-ic--ben"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), p))))), /*#__PURE__*/React.createElement("p", {
    className: "ewk-list-note"
  }, "Je hoeft het niet alleen uit te zoeken."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-center",
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(BdkPrijsCta, {
    label: "Ja, dit wil ik"
  })))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-prose ewk-bdk-center"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Voor wie deze Deep Dive is"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2",
    style: {
      margin: "12px 0 20px"
    }
  }, "Herken jij jezelf hierin?"), /*#__PURE__*/React.createElement("p", null, "Deze Deep Dive is voor jou als je een sterke, hoogopgeleide moeder bent met een verantwoordelijke baan of onderneming, en merkt dat je jezelf onderweg bent kwijtgeraakt."), /*#__PURE__*/React.createElement("p", null, "Je wilt het goed doen op je werk \xE9n thuis. Je hebt een groot verantwoordelijkheidsgevoel, bent gewend om door te gaan en voelt dat het zo niet langer werkt. ", /*#__PURE__*/React.createElement("span", {
    className: "ewk-key"
  }, "Je hoofd staat altijd aan, je energie raakt op"), " en je verlangt naar rust, overzicht en grip."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: BDK_CHECKOUT
  }, "Ja, ik wil dit")))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-section ewk-section--sand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-faqwrap"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Veelgestelde vragen",
    title: "Misschien vraag je je af.."
  }), /*#__PURE__*/React.createElement(FaqList, {
    items: BDK_FAQ
  }))), /*#__PURE__*/React.createElement("section", {
    className: "ewk-finalcta ewk-finalcta--scan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ewk-wrap ewk-finalcta__inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Tot slot"), /*#__PURE__*/React.createElement("h2", {
    className: "ewk-h2"
  }, "Voel je dat dit over jou gaat?"), /*#__PURE__*/React.createElement("p", null, "Dan is dit misschien precies wat je nu nodig hebt. Je hoeft het niet alleen uit te zoeken."), /*#__PURE__*/React.createElement("div", {
    className: "ewk-bdk-finalprice"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-now ewk-bdk-now--light"
  }, "\u20AC 97"), /*#__PURE__*/React.createElement("span", {
    className: "ewk-bdk-was ewk-bdk-was--light"
  }, "\u20AC 147")), /*#__PURE__*/React.createElement("div", {
    className: "ewk-hero__cta is-center"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: "arrow-right",
    href: BDK_CHECKOUT
  }, "Plan je Deep Dive sessie \u2013 nu \u20AC 97"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: () => onNav("Contact")
  }, "Eerst een vraag stellen")))));
}
Object.assign(window, {
  ScanBedankt
});

/* ===== app.jsx ===== */
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Expeditie Werkplezier – App shell voor de statische multi-page build.
   Welke pagina getoond wordt, zet elke HTML-pagina via window.__PAGE__.
   Navigatie gebruikt echte pagina-URL's, zodat elk onderdeel een eigen
   deploybaar HTML-bestand is (geschikt voor GitHub + Netlify). */
const {
  useState: useA,
  useEffect: useAE
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeHero": "portret",
  "showTrust": true,
  "portret": "lachend"
} /*EDITMODE-END*/;
const PORTRETTEN = {
  lachend: "assets/photos/portrait-9295.jpg",
  zacht: "assets/photos/portrait-9314.jpg"
};

// Paginanaam -> deploybaar HTML-bestand
const PAGE_FILES = {
  "Home": "index.html",
  "Over Agathe": "over-agathe.html",
  "Aanbod": "aanbod.html",
  "Ervaringen": "ervaringen.html",
  "Contact": "contact.html",
  "Traject": "traject.html",
  "Deep Dive": "deep-dive.html",
  "Gratis scan": "gratis-scan.html",
  "Bedankt scan": "bedankt-scan.html",
  "Privacy": "privacy.html",
  "Cookies": "cookies.html",
  "Voorwaarden": "voorwaarden.html"
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrolled, setScrolled] = useA(false);
  const [menuOpen, setMenuOpen] = useA(false);
  const [videoOpen, setVideoOpen] = useA(false);
  const [cookieOpen, setCookieOpen] = useA(false);

  // Huidige pagina komt uit window.__PAGE__ (per HTML-bestand gezet)
  const page = typeof window !== "undefined" && window.__PAGE__ || "Home";

  // toon de cookiebanner bij een eerste bezoek (nog geen keuze opgeslagen)
  useAE(() => {
    if (!readConsent()) setCookieOpen(true);
  }, []);
  function chooseCookies(val) {
    writeConsent(val);
    setCookieOpen(false);
  }
  function openCookiePrefs() {
    setCookieOpen(true);
  }
  useAE(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // (her)teken lucide-iconen na elke betekenisvolle render
  useAE(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  // Navigatie tussen losse pagina's via echte URL's
  function nav(n) {
    setMenuOpen(false);
    const target = PAGE_FILES[n] || "index.html";
    const here = window.location.pathname.split("/").pop() || "index.html" || "index.html";
    if (target === here || target === "index.html" && here === "") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }
    window.location.href = target;
  }

  // Gratis Stress & Energiescan – CTA's openen de salespagina; de opt-in op die
  // pagina handelt de inschrijving extern af (plug&pay).
  const SCAN_CHECKOUT = "https://expeditiewerkplezier.plugandpay.com/checkout/gratis-stress-energiescan";
  const goCheckout = () => {
    window.location.href = SCAN_CHECKOUT;
  };
  const openScan = () => {
    nav("Gratis scan");
  };
  const openVideo = () => setVideoOpen(true);
  const common = {
    onScan: openScan,
    onEbook: openScan,
    onNav: nav,
    onPlay: openVideo,
    onCheckout: goCheckout,
    portret: PORTRETTEN[t.portret] || PORTRETTEN.lachend
  };
  let body;
  if (page === "Over Agathe") body = /*#__PURE__*/React.createElement(OverAgathe, common);else if (page === "Aanbod") body = /*#__PURE__*/React.createElement(AanbodPage, common);else if (page === "Deep Dive") body = /*#__PURE__*/React.createElement(DeepDivePage, common);else if (page === "Gratis scan") body = /*#__PURE__*/React.createElement(ScanPage, common);else if (page === "Bedankt scan") body = /*#__PURE__*/React.createElement(ScanBedankt, common);else if (page === "Ervaringen") body = /*#__PURE__*/React.createElement(ErvaringenPage, common);else if (page === "Traject") body = /*#__PURE__*/React.createElement(TrajectPage, common);else if (page === "Contact") body = /*#__PURE__*/React.createElement(ContactPage, common);else if (page === "Privacy") body = /*#__PURE__*/React.createElement(PrivacyPage, common);else if (page === "Cookies") body = /*#__PURE__*/React.createElement(CookiesPage, common);else if (page === "Voorwaarden") body = /*#__PURE__*/React.createElement(VoorwaardenPage, common);else body = /*#__PURE__*/React.createElement(Home, _extends({
    homeHero: t.homeHero,
    showTrust: t.showTrust
  }, common));
  const active = page === "Traject" || page === "Deep Dive" || page === "Gratis scan" ? "Aanbod" : page;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    scrolled: scrolled,
    active: active,
    onNav: nav,
    onScan: openScan,
    onMenu: () => setMenuOpen(!menuOpen),
    menuOpen: menuOpen
  }), body, /*#__PURE__*/React.createElement(Footer, {
    onScan: openScan,
    onNav: nav,
    onCookiePrefs: openCookiePrefs
  }), /*#__PURE__*/React.createElement(VideoLightbox, {
    open: videoOpen,
    onClose: () => setVideoOpen(false)
  }), /*#__PURE__*/React.createElement(CookieBanner, {
    open: cookieOpen,
    onChoice: chooseCookies,
    onNav: nav
  }), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Home \u2013 hero"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Hero-stijl",
    value: t.homeHero,
    options: ["portret", "statement"],
    onChange: v => setTweak("homeHero", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Toon vertrouwensbalk",
    value: t.showTrust,
    onChange: v => setTweak("showTrust", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Portret van Agathe"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Foto",
    value: t.portret,
    options: ["lachend", "zacht"],
    onChange: v => setTweak("portret", v)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
