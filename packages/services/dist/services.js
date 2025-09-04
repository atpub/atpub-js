class W {
  constructor(t, u) {
    this.id = t, this.config = Object.assign({
      urlPattern: "https://{identifier}"
    }, u);
  }
  name() {
    return this.config.name;
  }
  identityUrl(t) {
    return this.config.urlPattern.replace("{identifier}", t);
  }
  identifierRender(t) {
    const u = this.config.renderFormat ? this.config.renderFormat.replace("{identifier}", t) : t;
    return u.length > 48 ? u.substring(0, 10) + "…" + u.substring(t.length - 5) : u;
  }
  icon() {
    return this.config.icon ? this.config.icon : null;
  }
  async verifyProof(t, u, s) {
    const n = { proofMethod: s.method }, r = (E) => Object.assign(n, { ok: E }), d = (this.config.verificationMethods || [])[s.method];
    if (!d)
      return r(!1);
    const h = await d({ did: t, claim: u, proof: s });
    return h && typeof h != "boolean" ? Object.assign(h, n) : r(h || !1);
  }
}
var R;
(function(e) {
  e.Root = "root", e.Text = "text", e.Directive = "directive", e.Comment = "comment", e.Script = "script", e.Style = "style", e.Tag = "tag", e.CDATA = "cdata", e.Doctype = "doctype";
})(R || (R = {}));
function Ea(e) {
  return e.type === R.Tag || e.type === R.Script || e.type === R.Style;
}
const Xt = R.Root, zu = R.Text, Ta = R.Directive, Zu = R.Comment, ma = R.Script, ba = R.Style, Bt = R.Tag, _a = R.CDATA, Aa = R.Doctype;
class Ju {
  constructor() {
    this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(t) {
    this.parent = t;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(t) {
    this.prev = t;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(t) {
    this.next = t;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(t = !1) {
    return Ue(this, t);
  }
}
class $t extends Ju {
  /**
   * @param data The content of the data node
   */
  constructor(t) {
    super(), this.data = t;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(t) {
    this.data = t;
  }
}
class Fe extends $t {
  constructor() {
    super(...arguments), this.type = R.Text;
  }
  get nodeType() {
    return 3;
  }
}
class Kt extends $t {
  constructor() {
    super(...arguments), this.type = R.Comment;
  }
  get nodeType() {
    return 8;
  }
}
class zt extends $t {
  constructor(t, u) {
    super(u), this.name = t, this.type = R.Directive;
  }
  get nodeType() {
    return 1;
  }
}
class Zt extends Ju {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(t) {
    super(), this.children = t;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var t;
    return (t = this.children[0]) !== null && t !== void 0 ? t : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(t) {
    this.children = t;
  }
}
class es extends Zt {
  constructor() {
    super(...arguments), this.type = R.CDATA;
  }
  get nodeType() {
    return 4;
  }
}
class de extends Zt {
  constructor() {
    super(...arguments), this.type = R.Root;
  }
  get nodeType() {
    return 9;
  }
}
class Jt extends Zt {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(t, u, s = [], n = t === "script" ? R.Script : t === "style" ? R.Style : R.Tag) {
    super(s), this.name = t, this.attribs = u, this.type = n;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(t) {
    this.name = t;
  }
  get attributes() {
    return Object.keys(this.attribs).map((t) => {
      var u, s;
      return {
        name: t,
        value: this.attribs[t],
        namespace: (u = this["x-attribsNamespace"]) === null || u === void 0 ? void 0 : u[t],
        prefix: (s = this["x-attribsPrefix"]) === null || s === void 0 ? void 0 : s[t]
      };
    });
  }
}
function O(e) {
  return Ea(e);
}
function ht(e) {
  return e.type === R.CDATA;
}
function z(e) {
  return e.type === R.Text;
}
function ft(e) {
  return e.type === R.Comment;
}
function wt(e) {
  return e.type === R.Directive;
}
function ne(e) {
  return e.type === R.Root;
}
function M(e) {
  return Object.prototype.hasOwnProperty.call(e, "children");
}
function Ue(e, t = !1) {
  let u;
  if (z(e))
    u = new Fe(e.data);
  else if (ft(e))
    u = new Kt(e.data);
  else if (O(e)) {
    const s = t ? It(e.children) : [], n = new Jt(e.name, { ...e.attribs }, s);
    s.forEach((r) => r.parent = n), e.namespace != null && (n.namespace = e.namespace), e["x-attribsNamespace"] && (n["x-attribsNamespace"] = { ...e["x-attribsNamespace"] }), e["x-attribsPrefix"] && (n["x-attribsPrefix"] = { ...e["x-attribsPrefix"] }), u = n;
  } else if (ht(e)) {
    const s = t ? It(e.children) : [], n = new es(s);
    s.forEach((r) => r.parent = n), u = n;
  } else if (ne(e)) {
    const s = t ? It(e.children) : [], n = new de(s);
    s.forEach((r) => r.parent = n), e["x-mode"] && (n["x-mode"] = e["x-mode"]), u = n;
  } else if (wt(e)) {
    const s = new zt(e.name, e.data);
    e["x-name"] != null && (s["x-name"] = e["x-name"], s["x-publicId"] = e["x-publicId"], s["x-systemId"] = e["x-systemId"]), u = s;
  } else
    throw new Error(`Not implemented yet: ${e.type}`);
  return u.startIndex = e.startIndex, u.endIndex = e.endIndex, e.sourceCodeLocation != null && (u.sourceCodeLocation = e.sourceCodeLocation), u;
}
function It(e) {
  const t = e.map((u) => Ue(u, !0));
  for (let u = 1; u < t.length; u++)
    t[u].prev = t[u - 1], t[u - 1].next = t[u];
  return t;
}
const bu = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
class ga {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(t, u, s) {
    this.dom = [], this.root = new de(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof u == "function" && (s = u, u = bu), typeof t == "object" && (u = t, t = void 0), this.callback = t ?? null, this.options = u ?? bu, this.elementCB = s ?? null;
  }
  onparserinit(t) {
    this.parser = t;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new de(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
  }
  onerror(t) {
    this.handleCallback(t);
  }
  onclosetag() {
    this.lastNode = null;
    const t = this.tagStack.pop();
    this.options.withEndIndices && (t.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(t);
  }
  onopentag(t, u) {
    const s = this.options.xmlMode ? R.Tag : void 0, n = new Jt(t, u, void 0, s);
    this.addNode(n), this.tagStack.push(n);
  }
  ontext(t) {
    const { lastNode: u } = this;
    if (u && u.type === R.Text)
      u.data += t, this.options.withEndIndices && (u.endIndex = this.parser.endIndex);
    else {
      const s = new Fe(t);
      this.addNode(s), this.lastNode = s;
    }
  }
  oncomment(t) {
    if (this.lastNode && this.lastNode.type === R.Comment) {
      this.lastNode.data += t;
      return;
    }
    const u = new Kt(t);
    this.addNode(u), this.lastNode = u;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const t = new Fe(""), u = new es([t]);
    this.addNode(u), t.parent = u, this.lastNode = t;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(t, u) {
    const s = new zt(t, u);
    this.addNode(s);
  }
  handleCallback(t) {
    if (typeof this.callback == "function")
      this.callback(t, this.dom);
    else if (t)
      throw t;
  }
  addNode(t) {
    const u = this.tagStack[this.tagStack.length - 1], s = u.children[u.children.length - 1];
    this.options.withStartIndices && (t.startIndex = this.parser.startIndex), this.options.withEndIndices && (t.endIndex = this.parser.endIndex), u.children.push(t), s && (t.prev = s, s.next = t), t.parent = u, this.lastNode = null;
  }
}
const _u = /["&'<>$\x80-\uFFFF]/g, pa = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]), Na = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (e, t) => e.codePointAt(t) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (e, t) => (e.charCodeAt(t) & 64512) === 55296 ? (e.charCodeAt(t) - 55296) * 1024 + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t)
  )
);
function ts(e) {
  let t = "", u = 0, s;
  for (; (s = _u.exec(e)) !== null; ) {
    const n = s.index, r = e.charCodeAt(n), i = pa.get(r);
    i !== void 0 ? (t += e.substring(u, n) + i, u = n + 1) : (t += `${e.substring(u, n)}&#x${Na(e, n).toString(16)};`, u = _u.lastIndex += +((r & 64512) === 55296));
  }
  return t + e.substr(u);
}
function us(e, t) {
  return function(s) {
    let n, r = 0, i = "";
    for (; n = e.exec(s); )
      r !== n.index && (i += s.substring(r, n.index)), i += t.get(n[0].charCodeAt(0)), r = n.index + 1;
    return i + s.substring(r);
  };
}
const Ia = us(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
])), Ca = us(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
])), Sa = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), Oa = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), La = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function Da(e) {
  return e.replace(/"/g, "&quot;");
}
function Ra(e, t) {
  var u;
  if (!e)
    return;
  const s = ((u = t.encodeEntities) !== null && u !== void 0 ? u : t.decodeEntities) === !1 ? Da : t.xmlMode || t.encodeEntities !== "utf8" ? ts : Ia;
  return Object.keys(e).map((n) => {
    var r, i;
    const d = (r = e[n]) !== null && r !== void 0 ? r : "";
    return t.xmlMode === "foreign" && (n = (i = Oa.get(n)) !== null && i !== void 0 ? i : n), !t.emptyAttrs && !t.xmlMode && d === "" ? n : `${n}="${s(d)}"`;
  }).join(" ");
}
const Au = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function Et(e, t = {}) {
  const u = "length" in e ? e : [e];
  let s = "";
  for (let n = 0; n < u.length; n++)
    s += xa(u[n], t);
  return s;
}
function xa(e, t) {
  switch (e.type) {
    case Xt:
      return Et(e.children, t);
    // @ts-expect-error We don't use `Doctype` yet
    case Aa:
    case Ta:
      return ka(e);
    case Zu:
      return Fa(e);
    case _a:
      return wa(e);
    case ma:
    case ba:
    case Bt:
      return Ma(e, t);
    case zu:
      return Ba(e, t);
  }
}
const Pa = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), ya = /* @__PURE__ */ new Set(["svg", "math"]);
function Ma(e, t) {
  var u;
  t.xmlMode === "foreign" && (e.name = (u = Sa.get(e.name)) !== null && u !== void 0 ? u : e.name, e.parent && Pa.has(e.parent.name) && (t = { ...t, xmlMode: !1 })), !t.xmlMode && ya.has(e.name) && (t = { ...t, xmlMode: "foreign" });
  let s = `<${e.name}`;
  const n = Ra(e.attribs, t);
  return n && (s += ` ${n}`), e.children.length === 0 && (t.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    t.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    t.selfClosingTags && Au.has(e.name)
  )) ? (t.xmlMode || (s += " "), s += "/>") : (s += ">", e.children.length > 0 && (s += Et(e.children, t)), (t.xmlMode || !Au.has(e.name)) && (s += `</${e.name}>`)), s;
}
function ka(e) {
  return `<${e.data}>`;
}
function Ba(e, t) {
  var u;
  let s = e.data || "";
  return ((u = t.encodeEntities) !== null && u !== void 0 ? u : t.decodeEntities) !== !1 && !(!t.xmlMode && e.parent && La.has(e.parent.name)) && (s = t.xmlMode || t.encodeEntities !== "utf8" ? ts(s) : Ca(s)), s;
}
function wa(e) {
  return `<![CDATA[${e.children[0].data}]]>`;
}
function Fa(e) {
  return `<!--${e.data}-->`;
}
function ss(e, t) {
  return Et(e, t);
}
function Ua(e, t) {
  return M(e) ? e.children.map((u) => ss(u, t)).join("") : "";
}
function Je(e) {
  return Array.isArray(e) ? e.map(Je).join("") : O(e) ? e.name === "br" ? `
` : Je(e.children) : ht(e) ? Je(e.children) : z(e) ? e.data : "";
}
function Ae(e) {
  return Array.isArray(e) ? e.map(Ae).join("") : M(e) && !ft(e) ? Ae(e.children) : z(e) ? e.data : "";
}
function tt(e) {
  return Array.isArray(e) ? e.map(tt).join("") : M(e) && (e.type === R.Tag || ht(e)) ? tt(e.children) : z(e) ? e.data : "";
}
function Tt(e) {
  return M(e) ? e.children : [];
}
function as(e) {
  return e.parent || null;
}
function ns(e) {
  const t = as(e);
  if (t != null)
    return Tt(t);
  const u = [e];
  let { prev: s, next: n } = e;
  for (; s != null; )
    u.unshift(s), { prev: s } = s;
  for (; n != null; )
    u.push(n), { next: n } = n;
  return u;
}
function Ha(e, t) {
  var u;
  return (u = e.attribs) === null || u === void 0 ? void 0 : u[t];
}
function va(e, t) {
  return e.attribs != null && Object.prototype.hasOwnProperty.call(e.attribs, t) && e.attribs[t] != null;
}
function Ya(e) {
  return e.name;
}
function eu(e) {
  let { next: t } = e;
  for (; t !== null && !O(t); )
    ({ next: t } = t);
  return t;
}
function tu(e) {
  let { prev: t } = e;
  for (; t !== null && !O(t); )
    ({ prev: t } = t);
  return t;
}
function fe(e) {
  if (e.prev && (e.prev.next = e.next), e.next && (e.next.prev = e.prev), e.parent) {
    const t = e.parent.children, u = t.lastIndexOf(e);
    u >= 0 && t.splice(u, 1);
  }
  e.next = null, e.prev = null, e.parent = null;
}
function qa(e, t) {
  const u = t.prev = e.prev;
  u && (u.next = t);
  const s = t.next = e.next;
  s && (s.prev = t);
  const n = t.parent = e.parent;
  if (n) {
    const r = n.children;
    r[r.lastIndexOf(e)] = t, e.parent = null;
  }
}
function Va(e, t) {
  if (fe(t), t.next = null, t.parent = e, e.children.push(t) > 1) {
    const u = e.children[e.children.length - 2];
    u.next = t, t.prev = u;
  } else
    t.prev = null;
}
function Ga(e, t) {
  fe(t);
  const { parent: u } = e, s = e.next;
  if (t.next = s, t.prev = e, e.next = t, t.parent = u, s) {
    if (s.prev = t, u) {
      const n = u.children;
      n.splice(n.lastIndexOf(s), 0, t);
    }
  } else u && u.children.push(t);
}
function Qa(e, t) {
  if (fe(t), t.parent = e, t.prev = null, e.children.unshift(t) !== 1) {
    const u = e.children[1];
    u.prev = t, t.next = u;
  } else
    t.next = null;
}
function Wa(e, t) {
  fe(t);
  const { parent: u } = e;
  if (u) {
    const s = u.children;
    s.splice(s.indexOf(e), 0, t);
  }
  e.prev && (e.prev.next = t), t.parent = u, t.prev = e.prev, t.next = e, e.prev = t;
}
function Ve(e, t, u = !0, s = 1 / 0) {
  return uu(e, Array.isArray(t) ? t : [t], u, s);
}
function uu(e, t, u, s) {
  const n = [], r = [Array.isArray(t) ? t : [t]], i = [0];
  for (; ; ) {
    if (i[0] >= r[0].length) {
      if (i.length === 1)
        return n;
      r.shift(), i.shift();
      continue;
    }
    const d = r[0][i[0]++];
    if (e(d) && (n.push(d), --s <= 0))
      return n;
    u && M(d) && d.children.length > 0 && (i.unshift(0), r.unshift(d.children));
  }
}
function ja(e, t) {
  return t.find(e);
}
function su(e, t, u = !0) {
  const s = Array.isArray(t) ? t : [t];
  for (let n = 0; n < s.length; n++) {
    const r = s[n];
    if (O(r) && e(r))
      return r;
    if (u && M(r) && r.children.length > 0) {
      const i = su(e, r.children, !0);
      if (i)
        return i;
    }
  }
  return null;
}
function rs(e, t) {
  return (Array.isArray(t) ? t : [t]).some((u) => O(u) && e(u) || M(u) && rs(e, u.children));
}
function Xa(e, t) {
  const u = [], s = [Array.isArray(t) ? t : [t]], n = [0];
  for (; ; ) {
    if (n[0] >= s[0].length) {
      if (s.length === 1)
        return u;
      s.shift(), n.shift();
      continue;
    }
    const r = s[0][n[0]++];
    O(r) && e(r) && u.push(r), M(r) && r.children.length > 0 && (n.unshift(0), s.unshift(r.children));
  }
}
const ut = {
  tag_name(e) {
    return typeof e == "function" ? (t) => O(t) && e(t.name) : e === "*" ? O : (t) => O(t) && t.name === e;
  },
  tag_type(e) {
    return typeof e == "function" ? (t) => e(t.type) : (t) => t.type === e;
  },
  tag_contains(e) {
    return typeof e == "function" ? (t) => z(t) && e(t.data) : (t) => z(t) && t.data === e;
  }
};
function au(e, t) {
  return typeof t == "function" ? (u) => O(u) && t(u.attribs[e]) : (u) => O(u) && u.attribs[e] === t;
}
function $a(e, t) {
  return (u) => e(u) || t(u);
}
function is(e) {
  const t = Object.keys(e).map((u) => {
    const s = e[u];
    return Object.prototype.hasOwnProperty.call(ut, u) ? ut[u](s) : au(u, s);
  });
  return t.length === 0 ? null : t.reduce($a);
}
function Ka(e, t) {
  const u = is(e);
  return u ? u(t) : !0;
}
function za(e, t, u, s = 1 / 0) {
  const n = is(e);
  return n ? Ve(n, t, u, s) : [];
}
function Za(e, t, u = !0) {
  return Array.isArray(t) || (t = [t]), su(au("id", e), t, u);
}
function pe(e, t, u = !0, s = 1 / 0) {
  return Ve(ut.tag_name(e), t, u, s);
}
function Ja(e, t, u = !0, s = 1 / 0) {
  return Ve(au("class", e), t, u, s);
}
function en(e, t, u = !0, s = 1 / 0) {
  return Ve(ut.tag_type(e), t, u, s);
}
function tn(e) {
  let t = e.length;
  for (; --t >= 0; ) {
    const u = e[t];
    if (t > 0 && e.lastIndexOf(u, t - 1) >= 0) {
      e.splice(t, 1);
      continue;
    }
    for (let s = u.parent; s; s = s.parent)
      if (e.includes(s)) {
        e.splice(t, 1);
        break;
      }
  }
  return e;
}
var G;
(function(e) {
  e[e.DISCONNECTED = 1] = "DISCONNECTED", e[e.PRECEDING = 2] = "PRECEDING", e[e.FOLLOWING = 4] = "FOLLOWING", e[e.CONTAINS = 8] = "CONTAINS", e[e.CONTAINED_BY = 16] = "CONTAINED_BY";
})(G || (G = {}));
function cs(e, t) {
  const u = [], s = [];
  if (e === t)
    return 0;
  let n = M(e) ? e : e.parent;
  for (; n; )
    u.unshift(n), n = n.parent;
  for (n = M(t) ? t : t.parent; n; )
    s.unshift(n), n = n.parent;
  const r = Math.min(u.length, s.length);
  let i = 0;
  for (; i < r && u[i] === s[i]; )
    i++;
  if (i === 0)
    return G.DISCONNECTED;
  const d = u[i - 1], h = d.children, E = u[i], b = s[i];
  return h.indexOf(E) > h.indexOf(b) ? d === t ? G.FOLLOWING | G.CONTAINED_BY : G.FOLLOWING : d === e ? G.PRECEDING | G.CONTAINS : G.PRECEDING;
}
function Ne(e) {
  return e = e.filter((t, u, s) => !s.includes(t, u + 1)), e.sort((t, u) => {
    const s = cs(t, u);
    return s & G.PRECEDING ? -1 : s & G.FOLLOWING ? 1 : 0;
  }), e;
}
function un(e) {
  const t = st(cn, e);
  return t ? t.name === "feed" ? sn(t) : an(t) : null;
}
function sn(e) {
  var t;
  const u = e.children, s = {
    type: "atom",
    items: pe("entry", u).map((i) => {
      var d;
      const { children: h } = i, E = { media: os(h) };
      Y(E, "id", "id", h), Y(E, "title", "title", h);
      const b = (d = st("link", h)) === null || d === void 0 ? void 0 : d.attribs.href;
      b && (E.link = b);
      const g = se("summary", h) || se("content", h);
      g && (E.description = g);
      const p = se("updated", h);
      return p && (E.pubDate = new Date(p)), E;
    })
  };
  Y(s, "id", "id", u), Y(s, "title", "title", u);
  const n = (t = st("link", u)) === null || t === void 0 ? void 0 : t.attribs.href;
  n && (s.link = n), Y(s, "description", "subtitle", u);
  const r = se("updated", u);
  return r && (s.updated = new Date(r)), Y(s, "author", "email", u, !0), s;
}
function an(e) {
  var t, u;
  const s = (u = (t = st("channel", e.children)) === null || t === void 0 ? void 0 : t.children) !== null && u !== void 0 ? u : [], n = {
    type: e.name.substr(0, 3),
    id: "",
    items: pe("item", e.children).map((i) => {
      const { children: d } = i, h = { media: os(d) };
      Y(h, "id", "guid", d), Y(h, "title", "title", d), Y(h, "link", "link", d), Y(h, "description", "description", d);
      const E = se("pubDate", d) || se("dc:date", d);
      return E && (h.pubDate = new Date(E)), h;
    })
  };
  Y(n, "title", "title", s), Y(n, "link", "link", s), Y(n, "description", "description", s);
  const r = se("lastBuildDate", s);
  return r && (n.updated = new Date(r)), Y(n, "author", "managingEditor", s, !0), n;
}
const nn = ["url", "type", "lang"], rn = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function os(e) {
  return pe("media:content", e).map((t) => {
    const { attribs: u } = t, s = {
      medium: u.medium,
      isDefault: !!u.isDefault
    };
    for (const n of nn)
      u[n] && (s[n] = u[n]);
    for (const n of rn)
      u[n] && (s[n] = parseInt(u[n], 10));
    return u.expression && (s.expression = u.expression), s;
  });
}
function st(e, t) {
  return pe(e, t, !0, 1)[0];
}
function se(e, t, u = !1) {
  return Ae(pe(e, t, u, 1)).trim();
}
function Y(e, t, u, s, n = !1) {
  const r = se(u, s, n);
  r && (e[t] = r);
}
function cn(e) {
  return e === "rss" || e === "feed" || e === "rdf:RDF";
}
const mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return G;
  },
  append: Ga,
  appendChild: Va,
  compareDocumentPosition: cs,
  existsOne: rs,
  filter: Ve,
  find: uu,
  findAll: Xa,
  findOne: su,
  findOneChild: ja,
  getAttributeValue: Ha,
  getChildren: Tt,
  getElementById: Za,
  getElements: za,
  getElementsByClassName: Ja,
  getElementsByTagName: pe,
  getElementsByTagType: en,
  getFeed: un,
  getInnerHTML: Ua,
  getName: Ya,
  getOuterHTML: ss,
  getParent: as,
  getSiblings: ns,
  getText: Je,
  hasAttrib: va,
  hasChildren: M,
  innerText: tt,
  isCDATA: ht,
  isComment: ft,
  isDocument: ne,
  isTag: O,
  isText: z,
  nextElementSibling: eu,
  prepend: Wa,
  prependChild: Qa,
  prevElementSibling: tu,
  removeElement: fe,
  removeSubsets: tn,
  replaceElement: qa,
  testElement: Ka,
  textContent: Ae,
  uniqueSort: Ne
}, Symbol.toStringTag, { value: "Module" })), on = {
  _useHtmlParser2: !1
};
function Ft(e, t) {
  if (!e)
    return t ?? on;
  const u = {
    _useHtmlParser2: !!e.xmlMode,
    ...t,
    ...e
  };
  return e.xml ? (u._useHtmlParser2 = !0, u.xmlMode = !0, e.xml !== !0 && Object.assign(u, e.xml)) : e.xmlMode && (u._useHtmlParser2 = !0), u;
}
function ls(e, t, u) {
  return e ? e(t ?? e._root.children, null, void 0, u).toString() : "";
}
function ln(e, t) {
  return typeof e == "object" && e != null && !("length" in e) && !("type" in e);
}
function dn(e, t) {
  const u = ln(e) ? (t = e, void 0) : e, s = {
    ...this === null || this === void 0 ? void 0 : this._options,
    ...Ft(t)
  };
  return ls(this, u, s);
}
function hn(e) {
  const t = { ...this._options, xmlMode: !0 };
  return ls(this, e, t);
}
function He(e) {
  const t = e ?? (this ? this.root() : []);
  let u = "";
  for (let s = 0; s < t.length; s++)
    u += Ae(t[s]);
  return u;
}
function fn(e, t, u = typeof t == "boolean" ? t : !1) {
  if (!e || typeof e != "string")
    return null;
  typeof t == "boolean" && (u = t);
  const s = this.load(e, this._options, !1);
  return u || s("script").remove(), [...s.root()[0].children];
}
function En() {
  return this(this._root);
}
function ds(e, t) {
  if (t === e)
    return !1;
  let u = t;
  for (; u && u !== u.parent; )
    if (u = u.parent, u === e)
      return !0;
  return !1;
}
function Tn(e) {
  return this.root().extract(e);
}
function mn(e, t) {
  if (!gu(e) || !gu(t))
    return;
  let u = e.length;
  const s = +t.length;
  for (let n = 0; n < s; n++)
    e[u++] = t[n];
  return e.length = u, e;
}
function gu(e) {
  if (Array.isArray(e))
    return !0;
  if (typeof e != "object" || e === null || !("length" in e) || typeof e.length != "number" || e.length < 0)
    return !1;
  for (let t = 0; t < e.length; t++)
    if (!(t in e))
      return !1;
  return !0;
}
const bn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  contains: ds,
  extract: Tn,
  html: dn,
  merge: mn,
  parseHTML: fn,
  root: En,
  text: He,
  xml: hn
}, Symbol.toStringTag, { value: "Module" }));
function ee(e) {
  return e.cheerio != null;
}
function _n(e) {
  return e.replace(/[._-](\w|$)/g, (t, u) => u.toUpperCase());
}
function An(e) {
  return e.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function y(e, t) {
  const u = e.length;
  for (let s = 0; s < u; s++)
    t(e[s], s);
  return e;
}
var oe;
(function(e) {
  e[e.LowerA = 97] = "LowerA", e[e.LowerZ = 122] = "LowerZ", e[e.UpperA = 65] = "UpperA", e[e.UpperZ = 90] = "UpperZ", e[e.Exclamation = 33] = "Exclamation";
})(oe || (oe = {}));
function Ut(e) {
  const t = e.indexOf("<");
  if (t === -1 || t > e.length - 3)
    return !1;
  const u = e.charCodeAt(t + 1);
  return (u >= oe.LowerA && u <= oe.LowerZ || u >= oe.UpperA && u <= oe.UpperZ || u === oe.Exclamation) && e.includes(">", t + 2);
}
const hs = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ 'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), gn = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var Ct;
const pn = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), pu = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (Ct = String.fromCodePoint) !== null && Ct !== void 0 ? Ct : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function Nn(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = pn.get(e)) !== null && t !== void 0 ? t : e;
}
var U;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(U || (U = {}));
const In = 32;
var ae;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(ae || (ae = {}));
function Ht(e) {
  return e >= U.ZERO && e <= U.NINE;
}
function Cn(e) {
  return e >= U.UPPER_A && e <= U.UPPER_F || e >= U.LOWER_A && e <= U.LOWER_F;
}
function Sn(e) {
  return e >= U.UPPER_A && e <= U.UPPER_Z || e >= U.LOWER_A && e <= U.LOWER_Z || Ht(e);
}
function On(e) {
  return e === U.EQUALS || Sn(e);
}
var F;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(F || (F = {}));
var Q;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(Q || (Q = {}));
class fs {
  constructor(t, u, s) {
    this.decodeTree = t, this.emitCodePoint = u, this.errors = s, this.state = F.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = Q.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = F.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, u) {
    switch (this.state) {
      case F.EntityStart:
        return t.charCodeAt(u) === U.NUM ? (this.state = F.NumericStart, this.consumed += 1, this.stateNumericStart(t, u + 1)) : (this.state = F.NamedEntity, this.stateNamedEntity(t, u));
      case F.NumericStart:
        return this.stateNumericStart(t, u);
      case F.NumericDecimal:
        return this.stateNumericDecimal(t, u);
      case F.NumericHex:
        return this.stateNumericHex(t, u);
      case F.NamedEntity:
        return this.stateNamedEntity(t, u);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, u) {
    return u >= t.length ? -1 : (t.charCodeAt(u) | In) === U.LOWER_X ? (this.state = F.NumericHex, this.consumed += 1, this.stateNumericHex(t, u + 1)) : (this.state = F.NumericDecimal, this.stateNumericDecimal(t, u));
  }
  addToNumericResult(t, u, s, n) {
    if (u !== s) {
      const r = s - u;
      this.result = this.result * Math.pow(n, r) + Number.parseInt(t.substr(u, r), n), this.consumed += r;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, u) {
    const s = u;
    for (; u < t.length; ) {
      const n = t.charCodeAt(u);
      if (Ht(n) || Cn(n))
        u += 1;
      else
        return this.addToNumericResult(t, s, u, 16), this.emitNumericEntity(n, 3);
    }
    return this.addToNumericResult(t, s, u, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, u) {
    const s = u;
    for (; u < t.length; ) {
      const n = t.charCodeAt(u);
      if (Ht(n))
        u += 1;
      else
        return this.addToNumericResult(t, s, u, 10), this.emitNumericEntity(n, 2);
    }
    return this.addToNumericResult(t, s, u, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, u) {
    var s;
    if (this.consumed <= u)
      return (s = this.errors) === null || s === void 0 || s.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === U.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === Q.Strict)
      return 0;
    return this.emitCodePoint(Nn(this.result), this.consumed), this.errors && (t !== U.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, u) {
    const { decodeTree: s } = this;
    let n = s[this.treeIndex], r = (n & ae.VALUE_LENGTH) >> 14;
    for (; u < t.length; u++, this.excess++) {
      const i = t.charCodeAt(u);
      if (this.treeIndex = Ln(s, n, this.treeIndex + Math.max(1, r), i), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === Q.Attribute && // We shouldn't have consumed any characters after the entity,
        (r === 0 || // And there should be no invalid characters.
        On(i)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (n = s[this.treeIndex], r = (n & ae.VALUE_LENGTH) >> 14, r !== 0) {
        if (i === U.SEMI)
          return this.emitNamedEntityData(this.treeIndex, r, this.consumed + this.excess);
        this.decodeMode !== Q.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: u, decodeTree: s } = this, n = (s[u] & ae.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(u, n, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, u, s) {
    const { decodeTree: n } = this;
    return this.emitCodePoint(u === 1 ? n[t] & ~ae.VALUE_LENGTH : n[t + 1], s), u === 3 && this.emitCodePoint(n[t + 2], s), s;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case F.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== Q.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case F.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case F.NumericHex:
        return this.emitNumericEntity(0, 3);
      case F.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case F.EntityStart:
        return 0;
    }
  }
}
function Ln(e, t, u, s) {
  const n = (t & ae.BRANCH_LENGTH) >> 7, r = t & ae.JUMP_TABLE;
  if (n === 0)
    return r !== 0 && s === r ? u : -1;
  if (r) {
    const h = s - r;
    return h < 0 || h >= n ? -1 : e[u + h] - 1;
  }
  let i = u, d = i + n - 1;
  for (; i <= d; ) {
    const h = i + d >>> 1, E = e[h];
    if (E < s)
      i = h + 1;
    else if (E > s)
      d = h - 1;
    else
      return e[h + n];
  }
  return -1;
}
var C;
(function(e) {
  e[e.Tab = 9] = "Tab", e[e.NewLine = 10] = "NewLine", e[e.FormFeed = 12] = "FormFeed", e[e.CarriageReturn = 13] = "CarriageReturn", e[e.Space = 32] = "Space", e[e.ExclamationMark = 33] = "ExclamationMark", e[e.Number = 35] = "Number", e[e.Amp = 38] = "Amp", e[e.SingleQuote = 39] = "SingleQuote", e[e.DoubleQuote = 34] = "DoubleQuote", e[e.Dash = 45] = "Dash", e[e.Slash = 47] = "Slash", e[e.Zero = 48] = "Zero", e[e.Nine = 57] = "Nine", e[e.Semi = 59] = "Semi", e[e.Lt = 60] = "Lt", e[e.Eq = 61] = "Eq", e[e.Gt = 62] = "Gt", e[e.Questionmark = 63] = "Questionmark", e[e.UpperA = 65] = "UpperA", e[e.LowerA = 97] = "LowerA", e[e.UpperF = 70] = "UpperF", e[e.LowerF = 102] = "LowerF", e[e.UpperZ = 90] = "UpperZ", e[e.LowerZ = 122] = "LowerZ", e[e.LowerX = 120] = "LowerX", e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(C || (C = {}));
var _;
(function(e) {
  e[e.Text = 1] = "Text", e[e.BeforeTagName = 2] = "BeforeTagName", e[e.InTagName = 3] = "InTagName", e[e.InSelfClosingTag = 4] = "InSelfClosingTag", e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName", e[e.InClosingTagName = 6] = "InClosingTagName", e[e.AfterClosingTagName = 7] = "AfterClosingTagName", e[e.BeforeAttributeName = 8] = "BeforeAttributeName", e[e.InAttributeName = 9] = "InAttributeName", e[e.AfterAttributeName = 10] = "AfterAttributeName", e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue", e[e.InAttributeValueDq = 12] = "InAttributeValueDq", e[e.InAttributeValueSq = 13] = "InAttributeValueSq", e[e.InAttributeValueNq = 14] = "InAttributeValueNq", e[e.BeforeDeclaration = 15] = "BeforeDeclaration", e[e.InDeclaration = 16] = "InDeclaration", e[e.InProcessingInstruction = 17] = "InProcessingInstruction", e[e.BeforeComment = 18] = "BeforeComment", e[e.CDATASequence = 19] = "CDATASequence", e[e.InSpecialComment = 20] = "InSpecialComment", e[e.InCommentLike = 21] = "InCommentLike", e[e.BeforeSpecialS = 22] = "BeforeSpecialS", e[e.BeforeSpecialT = 23] = "BeforeSpecialT", e[e.SpecialStartSequence = 24] = "SpecialStartSequence", e[e.InSpecialTag = 25] = "InSpecialTag", e[e.InEntity = 26] = "InEntity";
})(_ || (_ = {}));
function Z(e) {
  return e === C.Space || e === C.NewLine || e === C.Tab || e === C.FormFeed || e === C.CarriageReturn;
}
function $e(e) {
  return e === C.Slash || e === C.Gt || Z(e);
}
function Dn(e) {
  return e >= C.LowerA && e <= C.LowerZ || e >= C.UpperA && e <= C.UpperZ;
}
var K;
(function(e) {
  e[e.NoValue = 0] = "NoValue", e[e.Unquoted = 1] = "Unquoted", e[e.Single = 2] = "Single", e[e.Double = 3] = "Double";
})(K || (K = {}));
const k = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ]),
  // `</textarea`
  XmpEnd: new Uint8Array([60, 47, 120, 109, 112])
  // `</xmp`
};
let Rn = class {
  constructor({ xmlMode: t = !1, decodeEntities: u = !0 }, s) {
    this.cbs = s, this.state = _.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = _.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.xmlMode = t, this.decodeEntities = u, this.entityDecoder = new fs(t ? gn : hs, (n, r) => this.emitCodePoint(n, r));
  }
  reset() {
    this.state = _.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = _.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(t) {
    this.offset += this.buffer.length, this.buffer = t, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  stateText(t) {
    t === C.Lt || !this.decodeEntities && this.fastForwardTo(C.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = _.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && t === C.Amp && this.startEntity();
  }
  stateSpecialStartSequence(t) {
    const u = this.sequenceIndex === this.currentSequence.length;
    if (!(u ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      $e(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.isSpecial = !1;
    else if (!u) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = _.InTagName, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === C.Gt || Z(t)) {
        const u = this.index - this.currentSequence.length;
        if (this.sectionStart < u) {
          const s = this.index;
          this.index = u, this.cbs.ontext(this.sectionStart, u), this.index = s;
        }
        this.isSpecial = !1, this.sectionStart = u + 2, this.stateInClosingTagName(t);
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === k.TitleEnd ? this.decodeEntities && t === C.Amp && this.startEntity() : this.fastForwardTo(C.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === C.Lt);
  }
  stateCDATASequence(t) {
    t === k.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === k.Cdata.length && (this.state = _.InCommentLike, this.currentSequence = k.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = _.InDeclaration, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === t)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === k.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = _.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(t) {
    return this.xmlMode ? !$e(t) : Dn(t);
  }
  startSpecial(t, u) {
    this.isSpecial = !0, this.currentSequence = t, this.sequenceIndex = u, this.state = _.SpecialStartSequence;
  }
  stateBeforeTagName(t) {
    if (t === C.ExclamationMark)
      this.state = _.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (t === C.Questionmark)
      this.state = _.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(t)) {
      const u = t | 32;
      this.sectionStart = this.index, this.xmlMode ? this.state = _.InTagName : u === k.ScriptEnd[2] ? this.state = _.BeforeSpecialS : u === k.TitleEnd[2] || u === k.XmpEnd[2] ? this.state = _.BeforeSpecialT : this.state = _.InTagName;
    } else t === C.Slash ? this.state = _.BeforeClosingTagName : (this.state = _.Text, this.stateText(t));
  }
  stateInTagName(t) {
    $e(t) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = _.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateBeforeClosingTagName(t) {
    Z(t) || (t === C.Gt ? this.state = _.Text : (this.state = this.isTagStartChar(t) ? _.InClosingTagName : _.InSpecialComment, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === C.Gt || Z(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = _.AfterClosingTagName, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    (t === C.Gt || this.fastForwardTo(C.Gt)) && (this.state = _.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(t) {
    t === C.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = _.InSpecialTag, this.sequenceIndex = 0) : this.state = _.Text, this.sectionStart = this.index + 1) : t === C.Slash ? this.state = _.InSelfClosingTag : Z(t) || (this.state = _.InAttributeName, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === C.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = _.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : Z(t) || (this.state = _.BeforeAttributeName, this.stateBeforeAttributeName(t));
  }
  stateInAttributeName(t) {
    (t === C.Eq || $e(t)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = this.index, this.state = _.AfterAttributeName, this.stateAfterAttributeName(t));
  }
  stateAfterAttributeName(t) {
    t === C.Eq ? this.state = _.BeforeAttributeValue : t === C.Slash || t === C.Gt ? (this.cbs.onattribend(K.NoValue, this.sectionStart), this.sectionStart = -1, this.state = _.BeforeAttributeName, this.stateBeforeAttributeName(t)) : Z(t) || (this.cbs.onattribend(K.NoValue, this.sectionStart), this.state = _.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(t) {
    t === C.DoubleQuote ? (this.state = _.InAttributeValueDq, this.sectionStart = this.index + 1) : t === C.SingleQuote ? (this.state = _.InAttributeValueSq, this.sectionStart = this.index + 1) : Z(t) || (this.sectionStart = this.index, this.state = _.InAttributeValueNq, this.stateInAttributeValueNoQuotes(t));
  }
  handleInAttributeValue(t, u) {
    t === u || !this.decodeEntities && this.fastForwardTo(u) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(u === C.DoubleQuote ? K.Double : K.Single, this.index + 1), this.state = _.BeforeAttributeName) : this.decodeEntities && t === C.Amp && this.startEntity();
  }
  stateInAttributeValueDoubleQuotes(t) {
    this.handleInAttributeValue(t, C.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(t) {
    this.handleInAttributeValue(t, C.SingleQuote);
  }
  stateInAttributeValueNoQuotes(t) {
    Z(t) || t === C.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(K.Unquoted, this.index), this.state = _.BeforeAttributeName, this.stateBeforeAttributeName(t)) : this.decodeEntities && t === C.Amp && this.startEntity();
  }
  stateBeforeDeclaration(t) {
    t === C.OpeningSquareBracket ? (this.state = _.CDATASequence, this.sequenceIndex = 0) : this.state = t === C.Dash ? _.BeforeComment : _.InDeclaration;
  }
  stateInDeclaration(t) {
    (t === C.Gt || this.fastForwardTo(C.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = _.Text, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === C.Gt || this.fastForwardTo(C.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = _.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === C.Dash ? (this.state = _.InCommentLike, this.currentSequence = k.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = _.InDeclaration;
  }
  stateInSpecialComment(t) {
    (t === C.Gt || this.fastForwardTo(C.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = _.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    const u = t | 32;
    u === k.ScriptEnd[3] ? this.startSpecial(k.ScriptEnd, 4) : u === k.StyleEnd[3] ? this.startSpecial(k.StyleEnd, 4) : (this.state = _.InTagName, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    switch (t | 32) {
      case k.TitleEnd[3]: {
        this.startSpecial(k.TitleEnd, 4);
        break;
      }
      case k.TextareaEnd[3]: {
        this.startSpecial(k.TextareaEnd, 4);
        break;
      }
      case k.XmpEnd[3]: {
        this.startSpecial(k.XmpEnd, 4);
        break;
      }
      default:
        this.state = _.InTagName, this.stateInTagName(t);
    }
  }
  startEntity() {
    this.baseState = this.state, this.state = _.InEntity, this.entityStart = this.index, this.entityDecoder.startEntity(this.xmlMode ? Q.Strict : this.baseState === _.Text || this.baseState === _.InSpecialTag ? Q.Legacy : Q.Attribute);
  }
  stateInEntity() {
    const t = this.entityDecoder.write(this.buffer, this.index - this.offset);
    t >= 0 ? (this.state = this.baseState, t === 0 && (this.index = this.entityStart)) : this.index = this.offset + this.buffer.length - 1;
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === _.Text || this.state === _.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === _.InAttributeValueDq || this.state === _.InAttributeValueSq || this.state === _.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const t = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case _.Text: {
          this.stateText(t);
          break;
        }
        case _.SpecialStartSequence: {
          this.stateSpecialStartSequence(t);
          break;
        }
        case _.InSpecialTag: {
          this.stateInSpecialTag(t);
          break;
        }
        case _.CDATASequence: {
          this.stateCDATASequence(t);
          break;
        }
        case _.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(t);
          break;
        }
        case _.InAttributeName: {
          this.stateInAttributeName(t);
          break;
        }
        case _.InCommentLike: {
          this.stateInCommentLike(t);
          break;
        }
        case _.InSpecialComment: {
          this.stateInSpecialComment(t);
          break;
        }
        case _.BeforeAttributeName: {
          this.stateBeforeAttributeName(t);
          break;
        }
        case _.InTagName: {
          this.stateInTagName(t);
          break;
        }
        case _.InClosingTagName: {
          this.stateInClosingTagName(t);
          break;
        }
        case _.BeforeTagName: {
          this.stateBeforeTagName(t);
          break;
        }
        case _.AfterAttributeName: {
          this.stateAfterAttributeName(t);
          break;
        }
        case _.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(t);
          break;
        }
        case _.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(t);
          break;
        }
        case _.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(t);
          break;
        }
        case _.AfterClosingTagName: {
          this.stateAfterClosingTagName(t);
          break;
        }
        case _.BeforeSpecialS: {
          this.stateBeforeSpecialS(t);
          break;
        }
        case _.BeforeSpecialT: {
          this.stateBeforeSpecialT(t);
          break;
        }
        case _.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(t);
          break;
        }
        case _.InSelfClosingTag: {
          this.stateInSelfClosingTag(t);
          break;
        }
        case _.InDeclaration: {
          this.stateInDeclaration(t);
          break;
        }
        case _.BeforeDeclaration: {
          this.stateBeforeDeclaration(t);
          break;
        }
        case _.BeforeComment: {
          this.stateBeforeComment(t);
          break;
        }
        case _.InProcessingInstruction: {
          this.stateInProcessingInstruction(t);
          break;
        }
        case _.InEntity: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === _.InEntity && (this.entityDecoder.end(), this.state = this.baseState), this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length + this.offset;
    this.sectionStart >= t || (this.state === _.InCommentLike ? this.currentSequence === k.CdataEnd ? this.cbs.oncdata(this.sectionStart, t, 0) : this.cbs.oncomment(this.sectionStart, t, 0) : this.state === _.InTagName || this.state === _.BeforeAttributeName || this.state === _.BeforeAttributeValue || this.state === _.AfterAttributeName || this.state === _.InAttributeName || this.state === _.InAttributeValueSq || this.state === _.InAttributeValueDq || this.state === _.InAttributeValueNq || this.state === _.InClosingTagName || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, u) {
    this.baseState !== _.Text && this.baseState !== _.InSpecialTag ? (this.sectionStart < this.entityStart && this.cbs.onattribdata(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + u, this.index = this.sectionStart - 1, this.cbs.onattribentity(t)) : (this.sectionStart < this.entityStart && this.cbs.ontext(this.sectionStart, this.entityStart), this.sectionStart = this.entityStart + u, this.index = this.sectionStart - 1, this.cbs.ontextentity(t, this.sectionStart));
  }
};
const be = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), x = /* @__PURE__ */ new Set(["p"]), Nu = /* @__PURE__ */ new Set(["thead", "tbody"]), Iu = /* @__PURE__ */ new Set(["dd", "dt"]), Cu = /* @__PURE__ */ new Set(["rt", "rp"]), xn = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", x],
  ["h1", x],
  ["h2", x],
  ["h3", x],
  ["h4", x],
  ["h5", x],
  ["h6", x],
  ["select", be],
  ["input", be],
  ["output", be],
  ["button", be],
  ["datalist", be],
  ["textarea", be],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Iu],
  ["dt", Iu],
  ["address", x],
  ["article", x],
  ["aside", x],
  ["blockquote", x],
  ["details", x],
  ["div", x],
  ["dl", x],
  ["fieldset", x],
  ["figcaption", x],
  ["figure", x],
  ["footer", x],
  ["form", x],
  ["header", x],
  ["hr", x],
  ["main", x],
  ["nav", x],
  ["ol", x],
  ["pre", x],
  ["section", x],
  ["table", x],
  ["ul", x],
  ["rt", Cu],
  ["rp", Cu],
  ["tbody", Nu],
  ["tfoot", Nu]
]), Pn = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), Su = /* @__PURE__ */ new Set(["math", "svg"]), Ou = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), yn = /\s|\//;
let Mn = class {
  constructor(t, u = {}) {
    var s, n, r, i, d, h;
    this.options = u, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = t ?? {}, this.htmlMode = !this.options.xmlMode, this.lowerCaseTagNames = (s = u.lowerCaseTags) !== null && s !== void 0 ? s : this.htmlMode, this.lowerCaseAttributeNames = (n = u.lowerCaseAttributeNames) !== null && n !== void 0 ? n : this.htmlMode, this.recognizeSelfClosing = (r = u.recognizeSelfClosing) !== null && r !== void 0 ? r : !this.htmlMode, this.tokenizer = new ((i = u.Tokenizer) !== null && i !== void 0 ? i : Rn)(this.options, this), this.foreignContext = [!this.htmlMode], (h = (d = this.cbs).onparserinit) === null || h === void 0 || h.call(d, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(t, u) {
    var s, n;
    const r = this.getSlice(t, u);
    this.endIndex = u - 1, (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, r), this.startIndex = u;
  }
  /** @internal */
  ontextentity(t, u) {
    var s, n;
    this.endIndex = u - 1, (n = (s = this.cbs).ontext) === null || n === void 0 || n.call(s, pu(t)), this.startIndex = u;
  }
  /**
   * Checks if the current tag is a void element. Override this if you want
   * to specify your own additional void elements.
   */
  isVoidElement(t) {
    return this.htmlMode && Pn.has(t);
  }
  /** @internal */
  onopentagname(t, u) {
    this.endIndex = u;
    let s = this.getSlice(t, u);
    this.lowerCaseTagNames && (s = s.toLowerCase()), this.emitOpenTag(s);
  }
  emitOpenTag(t) {
    var u, s, n, r;
    this.openTagStart = this.startIndex, this.tagname = t;
    const i = this.htmlMode && xn.get(t);
    if (i)
      for (; this.stack.length > 0 && i.has(this.stack[0]); ) {
        const d = this.stack.shift();
        (s = (u = this.cbs).onclosetag) === null || s === void 0 || s.call(u, d, !0);
      }
    this.isVoidElement(t) || (this.stack.unshift(t), this.htmlMode && (Su.has(t) ? this.foreignContext.unshift(!0) : Ou.has(t) && this.foreignContext.unshift(!1))), (r = (n = this.cbs).onopentagname) === null || r === void 0 || r.call(n, t), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(t) {
    var u, s;
    this.startIndex = this.openTagStart, this.attribs && ((s = (u = this.cbs).onopentag) === null || s === void 0 || s.call(u, this.tagname, this.attribs, t), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(t) {
    this.endIndex = t, this.endOpenTag(!1), this.startIndex = t + 1;
  }
  /** @internal */
  onclosetag(t, u) {
    var s, n, r, i, d, h, E, b;
    this.endIndex = u;
    let g = this.getSlice(t, u);
    if (this.lowerCaseTagNames && (g = g.toLowerCase()), this.htmlMode && (Su.has(g) || Ou.has(g)) && this.foreignContext.shift(), this.isVoidElement(g))
      this.htmlMode && g === "br" && ((i = (r = this.cbs).onopentagname) === null || i === void 0 || i.call(r, "br"), (h = (d = this.cbs).onopentag) === null || h === void 0 || h.call(d, "br", {}, !0), (b = (E = this.cbs).onclosetag) === null || b === void 0 || b.call(E, "br", !1));
    else {
      const p = this.stack.indexOf(g);
      if (p !== -1)
        for (let N = 0; N <= p; N++) {
          const S = this.stack.shift();
          (n = (s = this.cbs).onclosetag) === null || n === void 0 || n.call(s, S, N !== p);
        }
      else this.htmlMode && g === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = u + 1;
  }
  /** @internal */
  onselfclosingtag(t) {
    this.endIndex = t, this.recognizeSelfClosing || this.foreignContext[0] ? (this.closeCurrentTag(!1), this.startIndex = t + 1) : this.onopentagend(t);
  }
  closeCurrentTag(t) {
    var u, s;
    const n = this.tagname;
    this.endOpenTag(t), this.stack[0] === n && ((s = (u = this.cbs).onclosetag) === null || s === void 0 || s.call(u, n, !t), this.stack.shift());
  }
  /** @internal */
  onattribname(t, u) {
    this.startIndex = t;
    const s = this.getSlice(t, u);
    this.attribname = this.lowerCaseAttributeNames ? s.toLowerCase() : s;
  }
  /** @internal */
  onattribdata(t, u) {
    this.attribvalue += this.getSlice(t, u);
  }
  /** @internal */
  onattribentity(t) {
    this.attribvalue += pu(t);
  }
  /** @internal */
  onattribend(t, u) {
    var s, n;
    this.endIndex = u, (n = (s = this.cbs).onattribute) === null || n === void 0 || n.call(s, this.attribname, this.attribvalue, t === K.Double ? '"' : t === K.Single ? "'" : t === K.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(t) {
    const u = t.search(yn);
    let s = u < 0 ? t : t.substr(0, u);
    return this.lowerCaseTagNames && (s = s.toLowerCase()), s;
  }
  /** @internal */
  ondeclaration(t, u) {
    this.endIndex = u;
    const s = this.getSlice(t, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`!${n}`, `!${s}`);
    }
    this.startIndex = u + 1;
  }
  /** @internal */
  onprocessinginstruction(t, u) {
    this.endIndex = u;
    const s = this.getSlice(t, u);
    if (this.cbs.onprocessinginstruction) {
      const n = this.getInstructionName(s);
      this.cbs.onprocessinginstruction(`?${n}`, `?${s}`);
    }
    this.startIndex = u + 1;
  }
  /** @internal */
  oncomment(t, u, s) {
    var n, r, i, d;
    this.endIndex = u, (r = (n = this.cbs).oncomment) === null || r === void 0 || r.call(n, this.getSlice(t, u - s)), (d = (i = this.cbs).oncommentend) === null || d === void 0 || d.call(i), this.startIndex = u + 1;
  }
  /** @internal */
  oncdata(t, u, s) {
    var n, r, i, d, h, E, b, g, p, N;
    this.endIndex = u;
    const S = this.getSlice(t, u - s);
    !this.htmlMode || this.options.recognizeCDATA ? ((r = (n = this.cbs).oncdatastart) === null || r === void 0 || r.call(n), (d = (i = this.cbs).ontext) === null || d === void 0 || d.call(i, S), (E = (h = this.cbs).oncdataend) === null || E === void 0 || E.call(h)) : ((g = (b = this.cbs).oncomment) === null || g === void 0 || g.call(b, `[CDATA[${S}]]`), (N = (p = this.cbs).oncommentend) === null || N === void 0 || N.call(p)), this.startIndex = u + 1;
  }
  /** @internal */
  onend() {
    var t, u;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let s = 0; s < this.stack.length; s++)
        this.cbs.onclosetag(this.stack[s], !0);
    }
    (u = (t = this.cbs).onend) === null || u === void 0 || u.call(t);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var t, u, s, n;
    (u = (t = this.cbs).onreset) === null || u === void 0 || u.call(t), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (n = (s = this.cbs).onparserinit) === null || n === void 0 || n.call(s, this), this.buffers.length = 0, this.foreignContext.length = 0, this.foreignContext.unshift(!this.htmlMode), this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(t) {
    this.reset(), this.end(t);
  }
  getSlice(t, u) {
    for (; t - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let s = this.buffers[0].slice(t - this.bufferOffset, u - this.bufferOffset);
    for (; u - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), s += this.buffers[0].slice(0, u - this.bufferOffset);
    return s;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(t) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null || s === void 0 || s.call(u, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(t), this.tokenizer.running && (this.tokenizer.write(t), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(t) {
    var u, s;
    if (this.ended) {
      (s = (u = this.cbs).onerror) === null || s === void 0 || s.call(u, new Error(".end() after done!"));
      return;
    }
    t && this.write(t), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(t) {
    this.write(t);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(t) {
    this.end(t);
  }
};
function kn(e, t) {
  const u = new ga(void 0, t);
  return new Mn(u, t).end(e), u.root;
}
var St;
const ve = (
  // @ts-expect-error `hasOwn` is a standard object method
  (St = Object.hasOwn) !== null && St !== void 0 ? St : ((e, t) => Object.prototype.hasOwnProperty.call(e, t))
), Ye = /\s+/, vt = "data-", nu = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Bn = /^{[^]*}$|^\[[^]*]$/;
function at(e, t, u) {
  var s;
  if (!(!e || !O(e))) {
    if ((s = e.attribs) !== null && s !== void 0 || (e.attribs = {}), !t)
      return e.attribs;
    if (ve(e.attribs, t))
      return !u && nu.test(t) ? t : e.attribs[t];
    if (e.name === "option" && t === "value")
      return He(e.children);
    if (e.name === "input" && (e.attribs.type === "radio" || e.attribs.type === "checkbox") && t === "value")
      return "on";
  }
}
function _e(e, t, u) {
  u === null ? Ts(e, t) : e.attribs[t] = `${u}`;
}
function wn(e, t) {
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e != "string")
        throw new Error("Bad combination of arguments.");
      return y(this, (u, s) => {
        O(u) && _e(u, e, t.call(u, s, u.attribs[e]));
      });
    }
    return y(this, (u) => {
      if (O(u))
        if (typeof e == "object")
          for (const s of Object.keys(e)) {
            const n = e[s];
            _e(u, s, n);
          }
        else
          _e(u, e, t);
    });
  }
  return arguments.length > 1 ? this : at(this[0], e, this.options.xmlMode);
}
function Lu(e, t, u) {
  return t in e ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    e[t]
  ) : !u && nu.test(t) ? at(e, t, !1) !== void 0 : at(e, t, u);
}
function Ot(e, t, u, s) {
  t in e ? e[t] = u : _e(e, t, !s && nu.test(t) ? u ? "" : null : `${u}`);
}
function Fn(e, t) {
  var u;
  if (typeof e == "string" && t === void 0) {
    const s = this[0];
    if (!s)
      return;
    switch (e) {
      case "style": {
        const n = this.css(), r = Object.keys(n);
        for (let i = 0; i < r.length; i++)
          n[i] = r[i];
        return n.length = r.length, n;
      }
      case "tagName":
      case "nodeName":
        return O(s) ? s.name.toUpperCase() : void 0;
      case "href":
      case "src": {
        if (!O(s))
          return;
        const n = (u = s.attribs) === null || u === void 0 ? void 0 : u[e];
        return typeof URL < "u" && (e === "href" && (s.tagName === "a" || s.tagName === "link") || e === "src" && (s.tagName === "img" || s.tagName === "iframe" || s.tagName === "audio" || s.tagName === "video" || s.tagName === "source")) && n !== void 0 && this.options.baseURI ? new URL(n, this.options.baseURI).href : n;
      }
      case "innerText":
        return tt(s);
      case "textContent":
        return Ae(s);
      case "outerHTML":
        return s.type === Xt ? this.html() : this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return O(s) ? Lu(s, e, this.options.xmlMode) : void 0;
    }
  }
  if (typeof e == "object" || t !== void 0) {
    if (typeof t == "function") {
      if (typeof e == "object")
        throw new TypeError("Bad combination of arguments.");
      return y(this, (s, n) => {
        O(s) && Ot(s, e, t.call(s, n, Lu(s, e, this.options.xmlMode)), this.options.xmlMode);
      });
    }
    return y(this, (s) => {
      if (O(s))
        if (typeof e == "object")
          for (const n of Object.keys(e)) {
            const r = e[n];
            Ot(s, n, r, this.options.xmlMode);
          }
        else
          Ot(s, e, t, this.options.xmlMode);
    });
  }
}
function Du(e, t, u) {
  var s;
  (s = e.data) !== null && s !== void 0 || (e.data = {}), typeof t == "object" ? Object.assign(e.data, t) : typeof t == "string" && u !== void 0 && (e.data[t] = u);
}
function Un(e) {
  for (const t of Object.keys(e.attribs)) {
    if (!t.startsWith(vt))
      continue;
    const u = _n(t.slice(vt.length));
    ve(e.data, u) || (e.data[u] = Es(e.attribs[t]));
  }
  return e.data;
}
function Hn(e, t) {
  const u = vt + An(t), s = e.data;
  if (ve(s, t))
    return s[t];
  if (ve(e.attribs, u))
    return s[t] = Es(e.attribs[u]);
}
function Es(e) {
  if (e === "null")
    return null;
  if (e === "true")
    return !0;
  if (e === "false")
    return !1;
  const t = Number(e);
  if (e === String(t))
    return t;
  if (Bn.test(e))
    try {
      return JSON.parse(e);
    } catch {
    }
  return e;
}
function vn(e, t) {
  var u;
  const s = this[0];
  if (!s || !O(s))
    return;
  const n = s;
  return (u = n.data) !== null && u !== void 0 || (n.data = {}), e == null ? Un(n) : typeof e == "object" || t !== void 0 ? (y(this, (r) => {
    O(r) && (typeof e == "object" ? Du(r, e) : Du(r, e, t));
  }), this) : Hn(n, e);
}
function Yn(e) {
  const t = arguments.length === 0, u = this[0];
  if (!u || !O(u))
    return t ? void 0 : this;
  switch (u.name) {
    case "textarea":
      return this.text(e);
    case "select": {
      const s = this.find("option:selected");
      if (!t) {
        if (this.attr("multiple") == null && typeof e == "object")
          return this;
        this.find("option").removeAttr("selected");
        const n = typeof e == "object" ? e : [e];
        for (const r of n)
          this.find(`option[value="${r}"]`).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? s.toArray().map((n) => He(n.children)) : s.attr("value");
    }
    case "input":
    case "option":
      return t ? this.attr("value") : this.attr("value", e);
  }
}
function Ts(e, t) {
  !e.attribs || !ve(e.attribs, t) || delete e.attribs[t];
}
function nt(e) {
  return e ? e.trim().split(Ye) : [];
}
function qn(e) {
  const t = nt(e);
  for (const u of t)
    y(this, (s) => {
      O(s) && Ts(s, u);
    });
  return this;
}
function Vn(e) {
  return this.toArray().some((t) => {
    const u = O(t) && t.attribs.class;
    let s = -1;
    if (u && e.length > 0)
      for (; (s = u.indexOf(e, s + 1)) > -1; ) {
        const n = s + e.length;
        if ((s === 0 || Ye.test(u[s - 1])) && (n === u.length || Ye.test(u[n])))
          return !0;
      }
    return !1;
  });
}
function ms(e) {
  if (typeof e == "function")
    return y(this, (s, n) => {
      if (O(s)) {
        const r = s.attribs.class || "";
        ms.call([s], e.call(s, n, r));
      }
    });
  if (!e || typeof e != "string")
    return this;
  const t = e.split(Ye), u = this.length;
  for (let s = 0; s < u; s++) {
    const n = this[s];
    if (!O(n))
      continue;
    const r = at(n, "class", !1);
    if (r) {
      let i = ` ${r} `;
      for (const d of t) {
        const h = `${d} `;
        i.includes(` ${h}`) || (i += h);
      }
      _e(n, "class", i.trim());
    } else
      _e(n, "class", t.join(" ").trim());
  }
  return this;
}
function bs(e) {
  if (typeof e == "function")
    return y(this, (n, r) => {
      O(n) && bs.call([n], e.call(n, r, n.attribs.class || ""));
    });
  const t = nt(e), u = t.length, s = arguments.length === 0;
  return y(this, (n) => {
    if (O(n))
      if (s)
        n.attribs.class = "";
      else {
        const r = nt(n.attribs.class);
        let i = !1;
        for (let d = 0; d < u; d++) {
          const h = r.indexOf(t[d]);
          h !== -1 && (r.splice(h, 1), i = !0, d--);
        }
        i && (n.attribs.class = r.join(" "));
      }
  });
}
function _s(e, t) {
  if (typeof e == "function")
    return y(this, (i, d) => {
      O(i) && _s.call([i], e.call(i, d, i.attribs.class || "", t), t);
    });
  if (!e || typeof e != "string")
    return this;
  const u = e.split(Ye), s = u.length, n = typeof t == "boolean" ? t ? 1 : -1 : 0, r = this.length;
  for (let i = 0; i < r; i++) {
    const d = this[i];
    if (!O(d))
      continue;
    const h = nt(d.attribs.class);
    for (let E = 0; E < s; E++) {
      const b = h.indexOf(u[E]);
      n >= 0 && b === -1 ? h.push(u[E]) : n <= 0 && b !== -1 && h.splice(b, 1);
    }
    d.attribs.class = h.join(" ");
  }
  return this;
}
const Gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass: ms,
  attr: wn,
  data: vn,
  hasClass: Vn,
  prop: Fn,
  removeAttr: qn,
  removeClass: bs,
  toggleClass: _s,
  val: Yn
}, Symbol.toStringTag, { value: "Module" }));
var I;
(function(e) {
  e.Attribute = "attribute", e.Pseudo = "pseudo", e.PseudoElement = "pseudo-element", e.Tag = "tag", e.Universal = "universal", e.Adjacent = "adjacent", e.Child = "child", e.Descendant = "descendant", e.Parent = "parent", e.Sibling = "sibling", e.ColumnCombinator = "column-combinator";
})(I || (I = {}));
var w;
(function(e) {
  e.Any = "any", e.Element = "element", e.End = "end", e.Equals = "equals", e.Exists = "exists", e.Hyphen = "hyphen", e.Not = "not", e.Start = "start";
})(w || (w = {}));
const Ru = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, Qn = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, Wn = /* @__PURE__ */ new Map([
  [126, w.Element],
  [94, w.Start],
  [36, w.End],
  [42, w.Any],
  [33, w.Not],
  [124, w.Hyphen]
]), jn = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function Pe(e) {
  switch (e.type) {
    case I.Adjacent:
    case I.Child:
    case I.Descendant:
    case I.Parent:
    case I.Sibling:
    case I.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const Xn = /* @__PURE__ */ new Set(["contains", "icontains"]);
function $n(e, t, u) {
  const s = parseInt(t, 16) - 65536;
  return s !== s || u ? t : s < 0 ? (
    // BMP codepoint
    String.fromCharCode(s + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(s >> 10 | 55296, s & 1023 | 56320)
  );
}
function Le(e) {
  return e.replace(Qn, $n);
}
function Lt(e) {
  return e === 39 || e === 34;
}
function xu(e) {
  return e === 32 || e === 9 || e === 10 || e === 12 || e === 13;
}
function bt(e) {
  const t = [], u = As(t, `${e}`, 0);
  if (u < e.length)
    throw new Error(`Unmatched selector: ${e.slice(u)}`);
  return t;
}
function As(e, t, u) {
  let s = [];
  function n(p) {
    const N = t.slice(u + p).match(Ru);
    if (!N)
      throw new Error(`Expected name, found ${t.slice(u)}`);
    const [S] = N;
    return u += p + S.length, Le(S);
  }
  function r(p) {
    for (u += p; u < t.length && xu(t.charCodeAt(u)); )
      u++;
  }
  function i() {
    u += 1;
    const p = u;
    let N = 1;
    for (; N > 0 && u < t.length; u++)
      t.charCodeAt(u) === 40 && !d(u) ? N++ : t.charCodeAt(u) === 41 && !d(u) && N--;
    if (N)
      throw new Error("Parenthesis not matched");
    return Le(t.slice(p, u - 1));
  }
  function d(p) {
    let N = 0;
    for (; t.charCodeAt(--p) === 92; )
      N++;
    return (N & 1) === 1;
  }
  function h() {
    if (s.length > 0 && Pe(s[s.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function E(p) {
    if (s.length > 0 && s[s.length - 1].type === I.Descendant) {
      s[s.length - 1].type = p;
      return;
    }
    h(), s.push({ type: p });
  }
  function b(p, N) {
    s.push({
      type: I.Attribute,
      name: p,
      action: N,
      value: n(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function g() {
    if (s.length && s[s.length - 1].type === I.Descendant && s.pop(), s.length === 0)
      throw new Error("Empty sub-selector");
    e.push(s);
  }
  if (r(0), t.length === u)
    return u;
  e: for (; u < t.length; ) {
    const p = t.charCodeAt(u);
    switch (p) {
      // Whitespace
      case 32:
      case 9:
      case 10:
      case 12:
      case 13: {
        (s.length === 0 || s[0].type !== I.Descendant) && (h(), s.push({ type: I.Descendant })), r(1);
        break;
      }
      // Traversals
      case 62: {
        E(I.Child), r(1);
        break;
      }
      case 60: {
        E(I.Parent), r(1);
        break;
      }
      case 126: {
        E(I.Sibling), r(1);
        break;
      }
      case 43: {
        E(I.Adjacent), r(1);
        break;
      }
      // Special attribute selectors: .class, #id
      case 46: {
        b("class", w.Element);
        break;
      }
      case 35: {
        b("id", w.Equals);
        break;
      }
      case 91: {
        r(1);
        let N, S = null;
        t.charCodeAt(u) === 124 ? N = n(1) : t.startsWith("*|", u) ? (S = "*", N = n(2)) : (N = n(0), t.charCodeAt(u) === 124 && t.charCodeAt(u + 1) !== 61 && (S = N, N = n(1))), r(0);
        let B = w.Exists;
        const j = Wn.get(t.charCodeAt(u));
        if (j) {
          if (B = j, t.charCodeAt(u + 1) !== 61)
            throw new Error("Expected `=`");
          r(2);
        } else t.charCodeAt(u) === 61 && (B = w.Equals, r(1));
        let Te = "", me = null;
        if (B !== "exists") {
          if (Lt(t.charCodeAt(u))) {
            const Xe = t.charCodeAt(u);
            let ie = u + 1;
            for (; ie < t.length && (t.charCodeAt(ie) !== Xe || d(ie)); )
              ie += 1;
            if (t.charCodeAt(ie) !== Xe)
              throw new Error("Attribute value didn't end");
            Te = Le(t.slice(u + 1, ie)), u = ie + 1;
          } else {
            const Xe = u;
            for (; u < t.length && (!xu(t.charCodeAt(u)) && t.charCodeAt(u) !== 93 || d(u)); )
              u += 1;
            Te = Le(t.slice(Xe, u));
          }
          r(0);
          const Oe = t.charCodeAt(u) | 32;
          Oe === 115 ? (me = !1, r(1)) : Oe === 105 && (me = !0, r(1));
        }
        if (t.charCodeAt(u) !== 93)
          throw new Error("Attribute selector didn't terminate");
        u += 1;
        const Se = {
          type: I.Attribute,
          name: N,
          action: B,
          value: Te,
          namespace: S,
          ignoreCase: me
        };
        s.push(Se);
        break;
      }
      case 58: {
        if (t.charCodeAt(u + 1) === 58) {
          s.push({
            type: I.PseudoElement,
            name: n(2).toLowerCase(),
            data: t.charCodeAt(u) === 40 ? i() : null
          });
          continue;
        }
        const N = n(1).toLowerCase();
        let S = null;
        if (t.charCodeAt(u) === 40)
          if (jn.has(N)) {
            if (Lt(t.charCodeAt(u + 1)))
              throw new Error(`Pseudo-selector ${N} cannot be quoted`);
            if (S = [], u = As(S, t, u + 1), t.charCodeAt(u) !== 41)
              throw new Error(`Missing closing parenthesis in :${N} (${t})`);
            u += 1;
          } else {
            if (S = i(), Xn.has(N)) {
              const B = S.charCodeAt(0);
              B === S.charCodeAt(S.length - 1) && Lt(B) && (S = S.slice(1, -1));
            }
            S = Le(S);
          }
        s.push({ type: I.Pseudo, name: N, data: S });
        break;
      }
      case 44: {
        g(), s = [], r(1);
        break;
      }
      default: {
        if (t.startsWith("/*", u)) {
          const B = t.indexOf("*/", u + 2);
          if (B < 0)
            throw new Error("Comment was not terminated");
          u = B + 2, s.length === 0 && r(0);
          break;
        }
        let N = null, S;
        if (p === 42)
          u += 1, S = "*";
        else if (p === 124) {
          if (S = "", t.charCodeAt(u + 1) === 124) {
            E(I.ColumnCombinator), r(2);
            break;
          }
        } else if (Ru.test(t.slice(u)))
          S = n(0);
        else
          break e;
        t.charCodeAt(u) === 124 && t.charCodeAt(u + 1) !== 124 && (N = S, t.charCodeAt(u + 1) === 42 ? (S = "*", u += 2) : S = n(1)), s.push(S === "*" ? { type: I.Universal, namespace: N } : { type: I.Tag, name: S, namespace: N });
      }
    }
  }
  return g(), u;
}
function Kn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Dt, Pu;
function zn() {
  return Pu || (Pu = 1, Dt = {
    trueFunc: function() {
      return !0;
    },
    falseFunc: function() {
      return !1;
    }
  }), Dt;
}
var rt = zn();
const L = /* @__PURE__ */ Kn(rt), gs = /* @__PURE__ */ new Map([
  [I.Universal, 50],
  [I.Tag, 30],
  [I.Attribute, 1],
  [I.Pseudo, 0]
]);
function ru(e) {
  return !gs.has(e.type);
}
const Zn = /* @__PURE__ */ new Map([
  [w.Exists, 10],
  [w.Equals, 8],
  [w.Not, 7],
  [w.Start, 6],
  [w.End, 6],
  [w.Any, 5]
]);
function Jn(e) {
  const t = e.map(ps);
  for (let u = 1; u < e.length; u++) {
    const s = t[u];
    if (!(s < 0))
      for (let n = u - 1; n >= 0 && s < t[n]; n--) {
        const r = e[n + 1];
        e[n + 1] = e[n], e[n] = r, t[n + 1] = t[n], t[n] = s;
      }
  }
}
function ps(e) {
  var t, u;
  let s = (t = gs.get(e.type)) !== null && t !== void 0 ? t : -1;
  return e.type === I.Attribute ? (s = (u = Zn.get(e.action)) !== null && u !== void 0 ? u : 4, e.action === w.Equals && e.name === "id" && (s = 9), e.ignoreCase && (s >>= 1)) : e.type === I.Pseudo && (e.data ? e.name === "has" || e.name === "contains" ? s = 0 : Array.isArray(e.data) ? (s = Math.min(...e.data.map((n) => Math.min(...n.map(ps)))), s < 0 && (s = 0)) : s = 2 : s = 3), s;
}
const er = /[-[\]{}()*+?.,\\^$|#\s]/g;
function yu(e) {
  return e.replace(er, "\\$&");
}
const tr = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function ce(e, t) {
  return typeof e.ignoreCase == "boolean" ? e.ignoreCase : e.ignoreCase === "quirks" ? !!t.quirksMode : !t.xmlMode && tr.has(e.name);
}
const ur = {
  equals(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: r } = t;
    return ce(t, u) ? (r = r.toLowerCase(), (i) => {
      const d = s.getAttributeValue(i, n);
      return d != null && d.length === r.length && d.toLowerCase() === r && e(i);
    }) : (i) => s.getAttributeValue(i, n) === r && e(i);
  },
  hyphen(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: r } = t;
    const i = r.length;
    return ce(t, u) ? (r = r.toLowerCase(), function(h) {
      const E = s.getAttributeValue(h, n);
      return E != null && (E.length === i || E.charAt(i) === "-") && E.substr(0, i).toLowerCase() === r && e(h);
    }) : function(h) {
      const E = s.getAttributeValue(h, n);
      return E != null && (E.length === i || E.charAt(i) === "-") && E.substr(0, i) === r && e(h);
    };
  },
  element(e, t, u) {
    const { adapter: s } = u, { name: n, value: r } = t;
    if (/\s/.test(r))
      return L.falseFunc;
    const i = new RegExp(`(?:^|\\s)${yu(r)}(?:$|\\s)`, ce(t, u) ? "i" : "");
    return function(h) {
      const E = s.getAttributeValue(h, n);
      return E != null && E.length >= r.length && i.test(E) && e(h);
    };
  },
  exists(e, { name: t }, { adapter: u }) {
    return (s) => u.hasAttrib(s, t) && e(s);
  },
  start(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: r } = t;
    const i = r.length;
    return i === 0 ? L.falseFunc : ce(t, u) ? (r = r.toLowerCase(), (d) => {
      const h = s.getAttributeValue(d, n);
      return h != null && h.length >= i && h.substr(0, i).toLowerCase() === r && e(d);
    }) : (d) => {
      var h;
      return !!(!((h = s.getAttributeValue(d, n)) === null || h === void 0) && h.startsWith(r)) && e(d);
    };
  },
  end(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: r } = t;
    const i = -r.length;
    return i === 0 ? L.falseFunc : ce(t, u) ? (r = r.toLowerCase(), (d) => {
      var h;
      return ((h = s.getAttributeValue(d, n)) === null || h === void 0 ? void 0 : h.substr(i).toLowerCase()) === r && e(d);
    }) : (d) => {
      var h;
      return !!(!((h = s.getAttributeValue(d, n)) === null || h === void 0) && h.endsWith(r)) && e(d);
    };
  },
  any(e, t, u) {
    const { adapter: s } = u, { name: n, value: r } = t;
    if (r === "")
      return L.falseFunc;
    if (ce(t, u)) {
      const i = new RegExp(yu(r), "i");
      return function(h) {
        const E = s.getAttributeValue(h, n);
        return E != null && E.length >= r.length && i.test(E) && e(h);
      };
    }
    return (i) => {
      var d;
      return !!(!((d = s.getAttributeValue(i, n)) === null || d === void 0) && d.includes(r)) && e(i);
    };
  },
  not(e, t, u) {
    const { adapter: s } = u, { name: n } = t;
    let { value: r } = t;
    return r === "" ? (i) => !!s.getAttributeValue(i, n) && e(i) : ce(t, u) ? (r = r.toLowerCase(), (i) => {
      const d = s.getAttributeValue(i, n);
      return (d == null || d.length !== r.length || d.toLowerCase() !== r) && e(i);
    }) : (i) => s.getAttributeValue(i, n) !== r && e(i);
  }
}, sr = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), Mu = 48, ar = 57;
function nr(e) {
  if (e = e.trim().toLowerCase(), e === "even")
    return [2, 0];
  if (e === "odd")
    return [2, 1];
  let t = 0, u = 0, s = r(), n = i();
  if (t < e.length && e.charAt(t) === "n" && (t++, u = s * (n ?? 1), d(), t < e.length ? (s = r(), d(), n = i()) : s = n = 0), n === null || t < e.length)
    throw new Error(`n-th rule couldn't be parsed ('${e}')`);
  return [u, s * n];
  function r() {
    return e.charAt(t) === "-" ? (t++, -1) : (e.charAt(t) === "+" && t++, 1);
  }
  function i() {
    const h = t;
    let E = 0;
    for (; t < e.length && e.charCodeAt(t) >= Mu && e.charCodeAt(t) <= ar; )
      E = E * 10 + (e.charCodeAt(t) - Mu), t++;
    return t === h ? null : E;
  }
  function d() {
    for (; t < e.length && sr.has(e.charCodeAt(t)); )
      t++;
  }
}
function rr(e) {
  const t = e[0], u = e[1] - 1;
  if (u < 0 && t <= 0)
    return L.falseFunc;
  if (t === -1)
    return (r) => r <= u;
  if (t === 0)
    return (r) => r === u;
  if (t === 1)
    return u < 0 ? L.trueFunc : (r) => r >= u;
  const s = Math.abs(t), n = (u % s + s) % s;
  return t > 1 ? (r) => r >= u && r % s === n : (r) => r <= u && r % s === n;
}
function Ke(e) {
  return rr(nr(e));
}
function ze(e, t) {
  return (u) => {
    const s = t.getParent(u);
    return s != null && t.isTag(s) && e(u);
  };
}
const Yt = {
  contains(e, t, { adapter: u }) {
    return function(n) {
      return e(n) && u.getText(n).includes(t);
    };
  },
  icontains(e, t, { adapter: u }) {
    const s = t.toLowerCase();
    return function(r) {
      return e(r) && u.getText(r).toLowerCase().includes(s);
    };
  },
  // Location specific methods
  "nth-child"(e, t, { adapter: u, equals: s }) {
    const n = Ke(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? ze(e, u) : function(i) {
      const d = u.getSiblings(i);
      let h = 0;
      for (let E = 0; E < d.length && !s(i, d[E]); E++)
        u.isTag(d[E]) && h++;
      return n(h) && e(i);
    };
  },
  "nth-last-child"(e, t, { adapter: u, equals: s }) {
    const n = Ke(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? ze(e, u) : function(i) {
      const d = u.getSiblings(i);
      let h = 0;
      for (let E = d.length - 1; E >= 0 && !s(i, d[E]); E--)
        u.isTag(d[E]) && h++;
      return n(h) && e(i);
    };
  },
  "nth-of-type"(e, t, { adapter: u, equals: s }) {
    const n = Ke(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? ze(e, u) : function(i) {
      const d = u.getSiblings(i);
      let h = 0;
      for (let E = 0; E < d.length; E++) {
        const b = d[E];
        if (s(i, b))
          break;
        u.isTag(b) && u.getName(b) === u.getName(i) && h++;
      }
      return n(h) && e(i);
    };
  },
  "nth-last-of-type"(e, t, { adapter: u, equals: s }) {
    const n = Ke(t);
    return n === L.falseFunc ? L.falseFunc : n === L.trueFunc ? ze(e, u) : function(i) {
      const d = u.getSiblings(i);
      let h = 0;
      for (let E = d.length - 1; E >= 0; E--) {
        const b = d[E];
        if (s(i, b))
          break;
        u.isTag(b) && u.getName(b) === u.getName(i) && h++;
      }
      return n(h) && e(i);
    };
  },
  // TODO determine the actual root element
  root(e, t, { adapter: u }) {
    return (s) => {
      const n = u.getParent(s);
      return (n == null || !u.isTag(n)) && e(s);
    };
  },
  scope(e, t, u, s) {
    const { equals: n } = u;
    return !s || s.length === 0 ? Yt.root(e, t, u) : s.length === 1 ? (r) => n(s[0], r) && e(r) : (r) => s.includes(r) && e(r);
  },
  hover: Rt("isHovered"),
  visited: Rt("isVisited"),
  active: Rt("isActive")
};
function Rt(e) {
  return function(u, s, { adapter: n }) {
    const r = n[e];
    return typeof r != "function" ? L.falseFunc : function(d) {
      return r(d) && u(d);
    };
  };
}
const ku = {
  empty(e, { adapter: t }) {
    return !t.getChildren(e).some((u) => (
      // FIXME: `getText` call is potentially expensive.
      t.isTag(u) || t.getText(u) !== ""
    ));
  },
  "first-child"(e, { adapter: t, equals: u }) {
    if (t.prevElementSibling)
      return t.prevElementSibling(e) == null;
    const s = t.getSiblings(e).find((n) => t.isTag(n));
    return s != null && u(e, s);
  },
  "last-child"(e, { adapter: t, equals: u }) {
    const s = t.getSiblings(e);
    for (let n = s.length - 1; n >= 0; n--) {
      if (u(e, s[n]))
        return !0;
      if (t.isTag(s[n]))
        break;
    }
    return !1;
  },
  "first-of-type"(e, { adapter: t, equals: u }) {
    const s = t.getSiblings(e), n = t.getName(e);
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      if (u(e, i))
        return !0;
      if (t.isTag(i) && t.getName(i) === n)
        break;
    }
    return !1;
  },
  "last-of-type"(e, { adapter: t, equals: u }) {
    const s = t.getSiblings(e), n = t.getName(e);
    for (let r = s.length - 1; r >= 0; r--) {
      const i = s[r];
      if (u(e, i))
        return !0;
      if (t.isTag(i) && t.getName(i) === n)
        break;
    }
    return !1;
  },
  "only-of-type"(e, { adapter: t, equals: u }) {
    const s = t.getName(e);
    return t.getSiblings(e).every((n) => u(e, n) || !t.isTag(n) || t.getName(n) !== s);
  },
  "only-child"(e, { adapter: t, equals: u }) {
    return t.getSiblings(e).every((s) => u(e, s) || !t.isTag(s));
  }
};
function Bu(e, t, u, s) {
  if (u === null) {
    if (e.length > s)
      throw new Error(`Pseudo-class :${t} requires an argument`);
  } else if (e.length === s)
    throw new Error(`Pseudo-class :${t} doesn't have any arguments`);
}
const ir = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
}, Ns = {};
function cr(e, t) {
  return e === L.falseFunc ? L.falseFunc : (u) => t.isTag(u) && e(u);
}
function Is(e, t) {
  const u = t.getSiblings(e);
  if (u.length <= 1)
    return [];
  const s = u.indexOf(e);
  return s < 0 || s === u.length - 1 ? [] : u.slice(s + 1).filter(t.isTag);
}
function qt(e) {
  return {
    xmlMode: !!e.xmlMode,
    lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
    lowerCaseTags: !!e.lowerCaseTags,
    quirksMode: !!e.quirksMode,
    cacheResults: !!e.cacheResults,
    pseudos: e.pseudos,
    adapter: e.adapter,
    equals: e.equals
  };
}
const xt = (e, t, u, s, n) => {
  const r = n(t, qt(u), s);
  return r === L.trueFunc ? e : r === L.falseFunc ? L.falseFunc : (i) => r(i) && e(i);
}, Pt = {
  is: xt,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: xt,
  where: xt,
  not(e, t, u, s, n) {
    const r = n(t, qt(u), s);
    return r === L.falseFunc ? e : r === L.trueFunc ? L.falseFunc : (i) => !r(i) && e(i);
  },
  has(e, t, u, s, n) {
    const { adapter: r } = u, i = qt(u);
    i.relativeSelector = !0;
    const d = t.some((b) => b.some(ru)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [Ns]
    ) : void 0, h = n(t, i, d);
    if (h === L.falseFunc)
      return L.falseFunc;
    const E = cr(h, r);
    if (d && h !== L.trueFunc) {
      const { shouldTestNextSiblings: b = !1 } = h;
      return (g) => {
        if (!e(g))
          return !1;
        d[0] = g;
        const p = r.getChildren(g), N = b ? [...p, ...Is(g, r)] : p;
        return r.existsOne(E, N);
      };
    }
    return (b) => e(b) && r.existsOne(E, r.getChildren(b));
  }
};
function or(e, t, u, s, n) {
  var r;
  const { name: i, data: d } = t;
  if (Array.isArray(d)) {
    if (!(i in Pt))
      throw new Error(`Unknown pseudo-class :${i}(${d})`);
    return Pt[i](e, d, u, s, n);
  }
  const h = (r = u.pseudos) === null || r === void 0 ? void 0 : r[i], E = typeof h == "string" ? h : ir[i];
  if (typeof E == "string") {
    if (d != null)
      throw new Error(`Pseudo ${i} doesn't have any arguments`);
    const b = bt(E);
    return Pt.is(e, b, u, s, n);
  }
  if (typeof h == "function")
    return Bu(h, i, d, 1), (b) => h(b, d) && e(b);
  if (i in Yt)
    return Yt[i](e, d, u, s);
  if (i in ku) {
    const b = ku[i];
    return Bu(b, i, d, 2), (g) => b(g, u, d) && e(g);
  }
  throw new Error(`Unknown pseudo-class :${i}`);
}
function yt(e, t) {
  const u = t.getParent(e);
  return u && t.isTag(u) ? u : null;
}
function lr(e, t, u, s, n) {
  const { adapter: r, equals: i } = u;
  switch (t.type) {
    case I.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case I.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case I.Attribute: {
      if (t.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!u.xmlMode || u.lowerCaseAttributeNames) && (t.name = t.name.toLowerCase()), ur[t.action](e, t, u);
    }
    case I.Pseudo:
      return or(e, t, u, s, n);
    // Tags
    case I.Tag: {
      if (t.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      let { name: d } = t;
      return (!u.xmlMode || u.lowerCaseTags) && (d = d.toLowerCase()), function(E) {
        return r.getName(E) === d && e(E);
      };
    }
    // Traversal
    case I.Descendant: {
      if (u.cacheResults === !1 || typeof WeakSet > "u")
        return function(E) {
          let b = E;
          for (; b = yt(b, r); )
            if (e(b))
              return !0;
          return !1;
        };
      const d = /* @__PURE__ */ new WeakSet();
      return function(E) {
        let b = E;
        for (; b = yt(b, r); )
          if (!d.has(b)) {
            if (r.isTag(b) && e(b))
              return !0;
            d.add(b);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(h) {
        let E = h;
        do
          if (e(E))
            return !0;
        while (E = yt(E, r));
        return !1;
      };
    case I.Parent:
      return function(h) {
        return r.getChildren(h).some((E) => r.isTag(E) && e(E));
      };
    case I.Child:
      return function(h) {
        const E = r.getParent(h);
        return E != null && r.isTag(E) && e(E);
      };
    case I.Sibling:
      return function(h) {
        const E = r.getSiblings(h);
        for (let b = 0; b < E.length; b++) {
          const g = E[b];
          if (i(h, g))
            break;
          if (r.isTag(g) && e(g))
            return !0;
        }
        return !1;
      };
    case I.Adjacent:
      return r.prevElementSibling ? function(h) {
        const E = r.prevElementSibling(h);
        return E != null && e(E);
      } : function(h) {
        const E = r.getSiblings(h);
        let b;
        for (let g = 0; g < E.length; g++) {
          const p = E[g];
          if (i(h, p))
            break;
          r.isTag(p) && (b = p);
        }
        return !!b && e(b);
      };
    case I.Universal: {
      if (t.namespace != null && t.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return e;
    }
  }
}
function Cs(e) {
  return e.type === I.Pseudo && (e.name === "scope" || Array.isArray(e.data) && e.data.some((t) => t.some(Cs)));
}
const dr = { type: I.Descendant }, hr = {
  type: "_flexibleDescendant"
}, fr = {
  type: I.Pseudo,
  name: "scope",
  data: null
};
function Er(e, { adapter: t }, u) {
  const s = !!u?.every((n) => {
    const r = t.isTag(n) && t.getParent(n);
    return n === Ns || r && t.isTag(r);
  });
  for (const n of e) {
    if (!(n.length > 0 && ru(n[0]) && n[0].type !== I.Descendant)) if (s && !n.some(Cs))
      n.unshift(dr);
    else
      continue;
    n.unshift(fr);
  }
}
function Ss(e, t, u) {
  var s;
  e.forEach(Jn), u = (s = t.context) !== null && s !== void 0 ? s : u;
  const n = Array.isArray(u), r = u && (Array.isArray(u) ? u : [u]);
  if (t.relativeSelector !== !1)
    Er(e, t, r);
  else if (e.some((h) => h.length > 0 && ru(h[0])))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let i = !1;
  const d = e.map((h) => {
    if (h.length >= 2) {
      const [E, b] = h;
      E.type !== I.Pseudo || E.name !== "scope" || (n && b.type === I.Descendant ? h[1] = hr : (b.type === I.Adjacent || b.type === I.Sibling) && (i = !0));
    }
    return Tr(h, t, r);
  }).reduce(mr, L.falseFunc);
  return d.shouldTestNextSiblings = i, d;
}
function Tr(e, t, u) {
  var s;
  return e.reduce((n, r) => n === L.falseFunc ? L.falseFunc : lr(n, r, t, u, Ss), (s = t.rootFunc) !== null && s !== void 0 ? s : L.trueFunc);
}
function mr(e, t) {
  return t === L.falseFunc || e === L.trueFunc ? e : e === L.falseFunc || t === L.trueFunc ? t : function(s) {
    return e(s) || t(s);
  };
}
const Os = (e, t) => e === t, br = {
  adapter: mt,
  equals: Os
};
function _r(e) {
  var t, u, s, n;
  const r = e ?? br;
  return (t = r.adapter) !== null && t !== void 0 || (r.adapter = mt), (u = r.equals) !== null && u !== void 0 || (r.equals = (n = (s = r.adapter) === null || s === void 0 ? void 0 : s.equals) !== null && n !== void 0 ? n : Os), r;
}
function Ar(e) {
  return function(u, s, n) {
    const r = _r(s);
    return e(u, r, n);
  };
}
const iu = Ar(Ss);
function Ls(e, t, u = !1) {
  return u && (e = gr(e, t)), Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e);
}
function gr(e, t) {
  const u = Array.isArray(e) ? e.slice(0) : [e], s = u.length;
  for (let n = 0; n < s; n++) {
    const r = Is(u[n], t);
    u.push(...r);
  }
  return u;
}
const pr = /* @__PURE__ */ new Set([
  "first",
  "last",
  "eq",
  "gt",
  "nth",
  "lt",
  "even",
  "odd"
]);
function it(e) {
  return e.type !== "pseudo" ? !1 : pr.has(e.name) ? !0 : e.name === "not" && Array.isArray(e.data) ? e.data.some((t) => t.some(it)) : !1;
}
function Nr(e, t, u) {
  const s = t != null ? parseInt(t, 10) : NaN;
  switch (e) {
    case "first":
      return 1;
    case "nth":
    case "eq":
      return isFinite(s) ? s >= 0 ? s + 1 : 1 / 0 : 0;
    case "lt":
      return isFinite(s) ? s >= 0 ? Math.min(s, u) : 1 / 0 : 0;
    case "gt":
      return isFinite(s) ? 1 / 0 : 0;
    case "odd":
      return 2 * u;
    case "even":
      return 2 * u - 1;
    case "last":
    case "not":
      return 1 / 0;
  }
}
function Ir(e) {
  for (; e.parent; )
    e = e.parent;
  return e;
}
function cu(e) {
  const t = [], u = [];
  for (const s of e)
    s.some(it) ? t.push(s) : u.push(s);
  return [u, t];
}
const Cr = {
  type: I.Universal,
  namespace: null
}, Sr = {
  type: I.Pseudo,
  name: "scope",
  data: null
};
function Ds(e, t, u = {}) {
  return Rs([e], t, u);
}
function Rs(e, t, u = {}) {
  if (typeof t == "function")
    return e.some(t);
  const [s, n] = cu(bt(t));
  return s.length > 0 && e.some(iu(s, u)) || n.some((r) => ys(r, e, u).length > 0);
}
function Or(e, t, u, s) {
  const n = typeof u == "string" ? parseInt(u, 10) : NaN;
  switch (e) {
    case "first":
    case "lt":
      return t;
    case "last":
      return t.length > 0 ? [t[t.length - 1]] : t;
    case "nth":
    case "eq":
      return isFinite(n) && Math.abs(n) < t.length ? [n < 0 ? t[t.length + n] : t[n]] : [];
    case "gt":
      return isFinite(n) ? t.slice(n + 1) : [];
    case "even":
      return t.filter((r, i) => i % 2 === 0);
    case "odd":
      return t.filter((r, i) => i % 2 === 1);
    case "not": {
      const r = new Set(Ps(u, t, s));
      return t.filter((i) => !r.has(i));
    }
  }
}
function xs(e, t, u = {}) {
  return Ps(bt(e), t, u);
}
function Ps(e, t, u) {
  if (t.length === 0)
    return [];
  const [s, n] = cu(e);
  let r;
  if (s.length) {
    const i = Gt(t, s, u);
    if (n.length === 0)
      return i;
    i.length && (r = new Set(i));
  }
  for (let i = 0; i < n.length && r?.size !== t.length; i++) {
    const d = n[i];
    if ((r ? t.filter((b) => O(b) && !r.has(b)) : t).length === 0)
      break;
    const E = ys(d, t, u);
    if (E.length)
      if (r)
        E.forEach((b) => r.add(b));
      else {
        if (i === n.length - 1)
          return E;
        r = new Set(E);
      }
  }
  return typeof r < "u" ? r.size === t.length ? t : (
    // Filter elements to preserve order
    t.filter((i) => r.has(i))
  ) : [];
}
function ys(e, t, u) {
  var s;
  if (e.some(Pe)) {
    const n = (s = u.root) !== null && s !== void 0 ? s : Ir(t[0]), r = { ...u, context: t, relativeSelector: !1 };
    return e.push(Sr), ct(n, e, r, !0, t.length);
  }
  return ct(t, e, u, !1, t.length);
}
function Lr(e, t, u = {}, s = 1 / 0) {
  if (typeof e == "function")
    return Ms(t, e);
  const [n, r] = cu(bt(e)), i = r.map((d) => ct(t, d, u, !0, s));
  return n.length && i.push(Vt(t, n, u, s)), i.length === 0 ? [] : i.length === 1 ? i[0] : Ne(i.reduce((d, h) => [...d, ...h]));
}
function ct(e, t, u, s, n) {
  const r = t.findIndex(it), i = t.slice(0, r), d = t[r], h = t.length - 1 === r ? n : 1 / 0, E = Nr(d.name, d.data, h);
  if (E === 0)
    return [];
  const g = (i.length === 0 && !Array.isArray(e) ? Tt(e).filter(O) : i.length === 0 ? (Array.isArray(e) ? e : [e]).filter(O) : s || i.some(Pe) ? Vt(e, [i], u, E) : Gt(e, [i], u)).slice(0, E);
  let p = Or(d.name, g, d.data, u);
  if (p.length === 0 || t.length === r + 1)
    return p;
  const N = t.slice(r + 1), S = N.some(Pe);
  if (S) {
    if (Pe(N[0])) {
      const { type: B } = N[0];
      (B === I.Sibling || B === I.Adjacent) && (p = Ls(p, mt, !0)), N.unshift(Cr);
    }
    u = {
      ...u,
      // Avoid absolutizing the selector
      relativeSelector: !1,
      /*
       * Add a custom root func, to make sure traversals don't match elements
       * that aren't a part of the considered tree.
       */
      rootFunc: (B) => p.includes(B)
    };
  } else u.rootFunc && u.rootFunc !== rt.trueFunc && (u = { ...u, rootFunc: rt.trueFunc });
  return N.some(it) ? ct(p, N, u, !1, n) : S ? (
    // Query existing elements to resolve traversal.
    Vt(p, [N], u, n)
  ) : (
    // If we don't have any more traversals, simply filter elements.
    Gt(p, [N], u)
  );
}
function Vt(e, t, u, s) {
  const n = iu(t, u, e);
  return Ms(e, n, s);
}
function Ms(e, t, u = 1 / 0) {
  const s = Ls(e, mt, t.shouldTestNextSiblings);
  return uu((n) => O(n) && t(n), s, !0, u);
}
function Gt(e, t, u) {
  const s = (Array.isArray(e) ? e : [e]).filter(O);
  if (s.length === 0)
    return s;
  const n = iu(t, u);
  return n === rt.trueFunc ? s : s.filter(n);
}
const Dr = /^\s*[+~]/;
function Rr(e) {
  if (!e)
    return this._make([]);
  if (typeof e != "string") {
    const t = ee(e) ? e.toArray() : [e], u = this.toArray();
    return this._make(t.filter((s) => u.some((n) => ds(n, s))));
  }
  return this._findBySelector(e, Number.POSITIVE_INFINITY);
}
function xr(e, t) {
  var u;
  const s = this.toArray(), n = Dr.test(e) ? s : this.children().toArray(), r = {
    context: s,
    root: (u = this._root) === null || u === void 0 ? void 0 : u[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(Lr(e, n, r, t));
}
function ou(e) {
  return function(t, ...u) {
    return function(s) {
      var n;
      let r = e(t, this);
      return s && (r = hu(r, s, this.options.xmlMode, (n = this._root) === null || n === void 0 ? void 0 : n[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && r.length > 1 ? u.reduce((i, d) => d(i), r) : r
      );
    };
  };
}
const Ge = ou((e, t) => {
  let u = [];
  for (let s = 0; s < t.length; s++) {
    const n = e(t[s]);
    n.length > 0 && (u = u.concat(n));
  }
  return u;
}), lu = ou((e, t) => {
  const u = [];
  for (let s = 0; s < t.length; s++) {
    const n = e(t[s]);
    n !== null && u.push(n);
  }
  return u;
});
function du(e, ...t) {
  let u = null;
  const s = ou((n, r) => {
    const i = [];
    return y(r, (d) => {
      for (let h; (h = n(d)) && !u?.(h, i.length); d = h)
        i.push(h);
    }), i;
  })(e, ...t);
  return function(n, r) {
    u = typeof n == "string" ? (d) => Ds(d, n, this.options) : n ? Qe(n) : null;
    const i = s.call(this, r);
    return u = null, i;
  };
}
function Ie(e) {
  return e.length > 1 ? Array.from(new Set(e)) : e;
}
const Pr = lu(({ parent: e }) => e && !ne(e) ? e : null, Ie), yr = Ge((e) => {
  const t = [];
  for (; e.parent && !ne(e.parent); )
    t.push(e.parent), e = e.parent;
  return t;
}, Ne, (e) => e.reverse()), Mr = du(({ parent: e }) => e && !ne(e) ? e : null, Ne, (e) => e.reverse());
function kr(e) {
  var t;
  const u = [];
  if (!e)
    return this._make(u);
  const s = {
    xmlMode: this.options.xmlMode,
    root: (t = this._root) === null || t === void 0 ? void 0 : t[0]
  }, n = typeof e == "string" ? (r) => Ds(r, e, s) : Qe(e);
  return y(this, (r) => {
    for (r && !ne(r) && !O(r) && (r = r.parent); r && O(r); ) {
      if (n(r, 0)) {
        u.includes(r) || u.push(r);
        break;
      }
      r = r.parent;
    }
  }), this._make(u);
}
const Br = lu((e) => eu(e)), wr = Ge((e) => {
  const t = [];
  for (; e.next; )
    e = e.next, O(e) && t.push(e);
  return t;
}, Ie), Fr = du((e) => eu(e), Ie), Ur = lu((e) => tu(e)), Hr = Ge((e) => {
  const t = [];
  for (; e.prev; )
    e = e.prev, O(e) && t.push(e);
  return t;
}, Ie), vr = du((e) => tu(e), Ie), Yr = Ge((e) => ns(e).filter((t) => O(t) && t !== e), Ne), qr = Ge((e) => Tt(e).filter(O), Ie);
function Vr() {
  const e = this.toArray().reduce((t, u) => M(u) ? t.concat(u.children) : t, []);
  return this._make(e);
}
function Gr(e) {
  let t = 0;
  const u = this.length;
  for (; t < u && e.call(this[t], t, this[t]) !== !1; )
    ++t;
  return this;
}
function Qr(e) {
  let t = [];
  for (let u = 0; u < this.length; u++) {
    const s = this[u], n = e.call(s, u, s);
    n != null && (t = t.concat(n));
  }
  return this._make(t);
}
function Qe(e) {
  return typeof e == "function" ? (t, u) => e.call(t, u, t) : ee(e) ? (t) => Array.prototype.includes.call(e, t) : function(t) {
    return e === t;
  };
}
function Wr(e) {
  var t;
  return this._make(hu(this.toArray(), e, this.options.xmlMode, (t = this._root) === null || t === void 0 ? void 0 : t[0]));
}
function hu(e, t, u, s) {
  return typeof t == "string" ? xs(t, e, { xmlMode: u, root: s }) : e.filter(Qe(t));
}
function jr(e) {
  const t = this.toArray();
  return typeof e == "string" ? Rs(t.filter(O), e, this.options) : e ? t.some(Qe(e)) : !1;
}
function Xr(e) {
  let t = this.toArray();
  if (typeof e == "string") {
    const u = new Set(xs(e, t, this.options));
    t = t.filter((s) => !u.has(s));
  } else {
    const u = Qe(e);
    t = t.filter((s, n) => !u(s, n));
  }
  return this._make(t);
}
function $r(e) {
  return this.filter(typeof e == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    `:has(${e})`
  ) : (t, u) => this._make(u).find(e).length > 0);
}
function Kr() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function zr() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function Zr(e) {
  var t;
  return e = +e, e === 0 && this.length <= 1 ? this : (e < 0 && (e = this.length + e), this._make((t = this[e]) !== null && t !== void 0 ? t : []));
}
function Jr(e) {
  return e == null ? this.toArray() : this[e < 0 ? this.length + e : e];
}
function ei() {
  return Array.prototype.slice.call(this);
}
function ti(e) {
  let t, u;
  return e == null ? (t = this.parent().children(), u = this[0]) : typeof e == "string" ? (t = this._make(e), u = this[0]) : (t = this, u = ee(e) ? e[0] : e), Array.prototype.indexOf.call(t, u);
}
function ui(e, t) {
  return this._make(Array.prototype.slice.call(this, e, t));
}
function si() {
  var e;
  return (e = this.prevObject) !== null && e !== void 0 ? e : this._make([]);
}
function ai(e, t) {
  const u = this._make(e, t), s = Ne([...this.get(), ...u.get()]);
  return this._make(s);
}
function ni(e) {
  return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this;
}
const ri = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _findBySelector: xr,
  add: ai,
  addBack: ni,
  children: qr,
  closest: kr,
  contents: Vr,
  each: Gr,
  end: si,
  eq: Zr,
  filter: Wr,
  filterArray: hu,
  find: Rr,
  first: Kr,
  get: Jr,
  has: $r,
  index: ti,
  is: jr,
  last: zr,
  map: Qr,
  next: Br,
  nextAll: wr,
  nextUntil: Fr,
  not: Xr,
  parent: Pr,
  parents: yr,
  parentsUntil: Mr,
  prev: Ur,
  prevAll: Hr,
  prevUntil: vr,
  siblings: Yr,
  slice: ui,
  toArray: ei
}, Symbol.toStringTag, { value: "Module" }));
function ii(e) {
  return function(u, s, n, r) {
    if (typeof Buffer < "u" && Buffer.isBuffer(u) && (u = u.toString()), typeof u == "string")
      return e(u, s, n, r);
    const i = u;
    if (!Array.isArray(i) && ne(i))
      return i;
    const d = new de([]);
    return he(i, d), d;
  };
}
function he(e, t) {
  const u = Array.isArray(e) ? e : [e];
  t ? t.children = u : t = null;
  for (let s = 0; s < u.length; s++) {
    const n = u[s];
    n.parent && n.parent.children !== u && fe(n), t ? (n.prev = u[s - 1] || null, n.next = u[s + 1] || null) : n.prev = n.next = null, n.parent = t;
  }
  return t;
}
function ci(e, t) {
  if (e == null)
    return [];
  if (typeof e == "string")
    return this._parse(e, this.options, !1, null).children.slice(0);
  if ("length" in e) {
    if (e.length === 1)
      return this._makeDomArray(e[0], t);
    const u = [];
    for (let s = 0; s < e.length; s++) {
      const n = e[s];
      if (typeof n == "object") {
        if (n == null)
          continue;
        if (!("length" in n)) {
          u.push(t ? Ue(n, !0) : n);
          continue;
        }
      }
      u.push(...this._makeDomArray(n, t));
    }
    return u;
  }
  return [t ? Ue(e, !0) : e];
}
function ks(e) {
  return function(...t) {
    const u = this.length - 1;
    return y(this, (s, n) => {
      if (!M(s))
        return;
      const r = typeof t[0] == "function" ? t[0].call(s, n, this._render(s.children)) : t, i = this._makeDomArray(r, n < u);
      e(i, s.children, s);
    });
  };
}
function re(e, t, u, s, n) {
  var r, i;
  const d = [
    t,
    u,
    ...s
  ], h = t === 0 ? null : e[t - 1], E = t + u >= e.length ? null : e[t + u];
  for (let b = 0; b < s.length; ++b) {
    const g = s[b], p = g.parent;
    if (p) {
      const S = p.children.indexOf(g);
      S !== -1 && (p.children.splice(S, 1), n === p && t > S && d[0]--);
    }
    g.parent = n, g.prev && (g.prev.next = (r = g.next) !== null && r !== void 0 ? r : null), g.next && (g.next.prev = (i = g.prev) !== null && i !== void 0 ? i : null), g.prev = b === 0 ? h : s[b - 1], g.next = b === s.length - 1 ? E : s[b + 1];
  }
  return h && (h.next = s[0]), E && (E.prev = s[s.length - 1]), e.splice(...d);
}
function oi(e) {
  return (ee(e) ? e : this._make(e)).append(this), this;
}
function li(e) {
  return (ee(e) ? e : this._make(e)).prepend(this), this;
}
const di = ks((e, t, u) => {
  re(t, t.length, 0, e, u);
}), hi = ks((e, t, u) => {
  re(t, 0, 0, e, u);
});
function Bs(e) {
  return function(t) {
    const u = this.length - 1, s = this.parents().last();
    for (let n = 0; n < this.length; n++) {
      const r = this[n], i = typeof t == "function" ? t.call(r, n, r) : typeof t == "string" && !Ut(t) ? s.find(t).clone() : t, [d] = this._makeDomArray(i, n < u);
      if (!d || !M(d))
        continue;
      let h = d, E = 0;
      for (; E < h.children.length; ) {
        const b = h.children[E];
        O(b) ? (h = b, E = 0) : E++;
      }
      e(r, h, [d]);
    }
    return this;
  };
}
const fi = Bs((e, t, u) => {
  const { parent: s } = e;
  if (!s)
    return;
  const n = s.children, r = n.indexOf(e);
  he([e], t), re(n, r, 0, u, s);
}), Ei = Bs((e, t, u) => {
  M(e) && (he(e.children, t), he(u, e));
});
function Ti(e) {
  return this.parent(e).not("body").each((t, u) => {
    this._make(u).replaceWith(u.children);
  }), this;
}
function mi(e) {
  const t = this[0];
  if (t) {
    const u = this._make(typeof e == "function" ? e.call(t, 0, t) : e).insertBefore(t);
    let s;
    for (let r = 0; r < u.length; r++)
      u[r].type === Bt && (s = u[r]);
    let n = 0;
    for (; s && n < s.children.length; ) {
      const r = s.children[n];
      r.type === Bt ? (s = r, n = 0) : n++;
    }
    s && this._make(s).append(this);
  }
  return this;
}
function bi(...e) {
  const t = this.length - 1;
  return y(this, (u, s) => {
    if (!M(u) || !u.parent)
      return;
    const n = u.parent.children, r = n.indexOf(u);
    if (r === -1)
      return;
    const i = typeof e[0] == "function" ? e[0].call(u, s, this._render(u.children)) : e, d = this._makeDomArray(i, s < t);
    re(n, r + 1, 0, d, u.parent);
  });
}
function _i(e) {
  typeof e == "string" && (e = this._make(e)), this.remove();
  const t = [];
  for (const u of this._makeDomArray(e)) {
    const s = this.clone().toArray(), { parent: n } = u;
    if (!n)
      continue;
    const r = n.children, i = r.indexOf(u);
    i !== -1 && (re(r, i + 1, 0, s, n), t.push(...s));
  }
  return this._make(t);
}
function Ai(...e) {
  const t = this.length - 1;
  return y(this, (u, s) => {
    if (!M(u) || !u.parent)
      return;
    const n = u.parent.children, r = n.indexOf(u);
    if (r === -1)
      return;
    const i = typeof e[0] == "function" ? e[0].call(u, s, this._render(u.children)) : e, d = this._makeDomArray(i, s < t);
    re(n, r, 0, d, u.parent);
  });
}
function gi(e) {
  const t = this._make(e);
  this.remove();
  const u = [];
  return y(t, (s) => {
    const n = this.clone().toArray(), { parent: r } = s;
    if (!r)
      return;
    const i = r.children, d = i.indexOf(s);
    d !== -1 && (re(i, d, 0, n, r), u.push(...n));
  }), this._make(u);
}
function pi(e) {
  const t = e ? this.filter(e) : this;
  return y(t, (u) => {
    fe(u), u.prev = u.next = u.parent = null;
  }), this;
}
function Ni(e) {
  return y(this, (t, u) => {
    const { parent: s } = t;
    if (!s)
      return;
    const n = s.children, r = typeof e == "function" ? e.call(t, u, t) : e, i = this._makeDomArray(r);
    he(i, null);
    const d = n.indexOf(t);
    re(n, d, 1, i, s), i.includes(t) || (t.parent = t.prev = t.next = null);
  });
}
function Ii() {
  return y(this, (e) => {
    if (M(e)) {
      for (const t of e.children)
        t.next = t.prev = t.parent = null;
      e.children.length = 0;
    }
  });
}
function Ci(e) {
  if (e === void 0) {
    const t = this[0];
    return !t || !M(t) ? null : this._render(t.children);
  }
  return y(this, (t) => {
    if (!M(t))
      return;
    for (const s of t.children)
      s.next = s.prev = s.parent = null;
    const u = ee(e) ? e.toArray() : this._parse(`${e}`, this.options, !1, t).children;
    he(u, t);
  });
}
function Si() {
  return this._render(this);
}
function Oi(e) {
  return e === void 0 ? He(this) : typeof e == "function" ? y(this, (t, u) => this._make(t).text(e.call(t, u, He([t])))) : y(this, (t) => {
    if (!M(t))
      return;
    for (const s of t.children)
      s.next = s.prev = s.parent = null;
    const u = new Fe(`${e}`);
    he(u, t);
  });
}
function Li() {
  const e = Array.prototype.map.call(this.get(), (u) => Ue(u, !0)), t = new de(e);
  for (const u of e)
    u.parent = t;
  return this._make(e);
}
const Di = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _makeDomArray: ci,
  after: bi,
  append: di,
  appendTo: oi,
  before: Ai,
  clone: Li,
  empty: Ii,
  html: Ci,
  insertAfter: _i,
  insertBefore: gi,
  prepend: hi,
  prependTo: li,
  remove: pi,
  replaceWith: Ni,
  text: Oi,
  toString: Si,
  unwrap: Ti,
  wrap: fi,
  wrapAll: mi,
  wrapInner: Ei
}, Symbol.toStringTag, { value: "Module" }));
function Ri(e, t) {
  if (e != null && t != null || // When `prop` is a "plain" object
  typeof e == "object" && !Array.isArray(e))
    return y(this, (u, s) => {
      O(u) && ws(u, e, t, s);
    });
  if (this.length !== 0)
    return Fs(this[0], e);
}
function ws(e, t, u, s) {
  if (typeof t == "string") {
    const n = Fs(e), r = typeof u == "function" ? u.call(e, s, n[t]) : u;
    r === "" ? delete n[t] : r != null && (n[t] = r), e.attribs.style = xi(n);
  } else if (typeof t == "object") {
    const n = Object.keys(t);
    for (let r = 0; r < n.length; r++) {
      const i = n[r];
      ws(e, i, t[i], r);
    }
  }
}
function Fs(e, t) {
  if (!e || !O(e))
    return;
  const u = Pi(e.attribs.style);
  if (typeof t == "string")
    return u[t];
  if (Array.isArray(t)) {
    const s = {};
    for (const n of t)
      u[n] != null && (s[n] = u[n]);
    return s;
  }
  return u;
}
function xi(e) {
  return Object.keys(e).reduce((t, u) => `${t}${t ? " " : ""}${u}: ${e[u]};`, "");
}
function Pi(e) {
  if (e = (e || "").trim(), !e)
    return {};
  const t = {};
  let u;
  for (const s of e.split(";")) {
    const n = s.indexOf(":");
    if (n < 1 || n === s.length - 1) {
      const r = s.trimEnd();
      r.length > 0 && u !== void 0 && (t[u] += `;${r}`);
    } else
      u = s.slice(0, n).trim(), t[u] = s.slice(n + 1).trim();
  }
  return t;
}
const yi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  css: Ri
}, Symbol.toStringTag, { value: "Module" })), wu = "input,select,textarea,keygen", Mi = /%20/g, Fu = /\r?\n/g;
function ki() {
  return this.serializeArray().map((u) => `${encodeURIComponent(u.name)}=${encodeURIComponent(u.value)}`).join("&").replace(Mi, "+");
}
function Bi() {
  return this.map((e, t) => {
    const u = this._make(t);
    return O(t) && t.name === "form" ? u.find(wu).toArray() : u.filter(wu).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
  ).map((e, t) => {
    var u;
    const s = this._make(t), n = s.attr("name"), r = (u = s.val()) !== null && u !== void 0 ? u : "";
    return Array.isArray(r) ? r.map((i) => (
      /*
       * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
       * These can occur inside of `<textarea>'s`
       */
      { name: n, value: i.replace(Fu, `\r
`) }
    )) : { name: n, value: r.replace(Fu, `\r
`) };
  }).toArray();
}
const wi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  serialize: ki,
  serializeArray: Bi
}, Symbol.toStringTag, { value: "Module" }));
function Fi(e) {
  var t;
  return typeof e == "string" ? { selector: e, value: "textContent" } : {
    selector: e.selector,
    value: (t = e.value) !== null && t !== void 0 ? t : "textContent"
  };
}
function Ui(e) {
  const t = {};
  for (const u in e) {
    const s = e[u], n = Array.isArray(s), { selector: r, value: i } = Fi(n ? s[0] : s), d = typeof i == "function" ? i : typeof i == "string" ? (h) => this._make(h).prop(i) : (h) => this._make(h).extract(i);
    if (n)
      t[u] = this._findBySelector(r, Number.POSITIVE_INFINITY).map((h, E) => d(E, u, t)).get();
    else {
      const h = this._findBySelector(r, 1);
      t[u] = h.length > 0 ? d(h[0], u, t) : void 0;
    }
  }
  return t;
}
const Hi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  extract: Ui
}, Symbol.toStringTag, { value: "Module" }));
class We {
  /**
   * Instance of cheerio. Methods are specified in the modules. Usage of this
   * constructor is not recommended. Please use `$.load` instead.
   *
   * @private
   * @param elements - The new selection.
   * @param root - Sets the root node.
   * @param options - Options for the instance.
   */
  constructor(t, u, s) {
    if (this.length = 0, this.options = s, this._root = u, t) {
      for (let n = 0; n < t.length; n++)
        this[n] = t[n];
      this.length = t.length;
    }
  }
}
We.prototype.cheerio = "[cheerio object]";
We.prototype.splice = Array.prototype.splice;
We.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(We.prototype, Gn, ri, Di, yi, wi, Hi);
function vi(e, t) {
  return function u(s, n, r = !0) {
    if (s == null)
      throw new Error("cheerio.load() expects a string");
    const i = Ft(n), d = e(s, i, r, null);
    class h extends We {
      _make(g, p) {
        const N = E(g, p);
        return N.prevObject = this, N;
      }
      _parse(g, p, N, S) {
        return e(g, p, N, S);
      }
      _render(g) {
        return t(g, this.options);
      }
    }
    function E(b, g, p = d, N) {
      if (b && ee(b))
        return b;
      const S = Ft(N, i), B = typeof p == "string" ? [e(p, S, !1, null)] : "length" in p ? p : [p], j = ee(B) ? B : new h(B, null, S);
      if (j._root = j, !b)
        return new h(void 0, j, S);
      const Te = typeof b == "string" && Ut(b) ? (
        // $(<html>)
        e(b, S, !1, null).children
      ) : Yi(b) ? (
        // $(dom)
        [b]
      ) : Array.isArray(b) ? (
        // $([dom])
        b
      ) : void 0, me = new h(Te, j, S);
      if (Te)
        return me;
      if (typeof b != "string")
        throw new TypeError("Unexpected type of selector");
      let Se = b;
      const Oe = g ? (
        // If we don't have a context, maybe we have a root, from loading
        typeof g == "string" ? Ut(g) ? (
          // $('li', '<ul>...</ul>')
          new h([e(g, S, !1, null)], j, S)
        ) : (
          // $('li', 'ul')
          (Se = `${g} ${Se}`, j)
        ) : ee(g) ? (
          // $('li', $)
          g
        ) : (
          // $('li', node), $('li', [nodes])
          new h(Array.isArray(g) ? g : [g], j, S)
        )
      ) : j;
      return Oe ? Oe.find(Se) : me;
    }
    return Object.assign(E, bn, {
      load: u,
      // `_root` and `_options` are used in static methods.
      _root: d,
      _options: i,
      // Add `fn` for plugins
      fn: h.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: h.prototype
    }), E;
  };
}
function Yi(e) {
  return (
    // @ts-expect-error: TS doesn't know about the `name` property.
    !!e.name || // @ts-expect-error: TS doesn't know about the `type` property.
    e.type === Xt || // @ts-expect-error: TS doesn't know about the `type` property.
    e.type === zu || // @ts-expect-error: TS doesn't know about the `type` property.
    e.type === Zu
  );
}
const qi = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]), P = "�";
var c;
(function(e) {
  e[e.EOF = -1] = "EOF", e[e.NULL = 0] = "NULL", e[e.TABULATION = 9] = "TABULATION", e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", e[e.LINE_FEED = 10] = "LINE_FEED", e[e.FORM_FEED = 12] = "FORM_FEED", e[e.SPACE = 32] = "SPACE", e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK", e[e.AMPERSAND = 38] = "AMPERSAND", e[e.APOSTROPHE = 39] = "APOSTROPHE", e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", e[e.SOLIDUS = 47] = "SOLIDUS", e[e.DIGIT_0 = 48] = "DIGIT_0", e[e.DIGIT_9 = 57] = "DIGIT_9", e[e.SEMICOLON = 59] = "SEMICOLON", e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN", e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", e[e.QUESTION_MARK = 63] = "QUESTION_MARK", e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z";
})(c || (c = {}));
const v = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function Us(e) {
  return e >= 55296 && e <= 57343;
}
function Vi(e) {
  return e >= 56320 && e <= 57343;
}
function Gi(e, t) {
  return (e - 55296) * 1024 + 9216 + t;
}
function Hs(e) {
  return e !== 32 && e !== 10 && e !== 13 && e !== 9 && e !== 12 && e >= 1 && e <= 31 || e >= 127 && e <= 159;
}
function vs(e) {
  return e >= 64976 && e <= 65007 || qi.has(e);
}
var T;
(function(e) {
  e.controlCharacterInInputStream = "control-character-in-input-stream", e.noncharacterInInputStream = "noncharacter-in-input-stream", e.surrogateInInputStream = "surrogate-in-input-stream", e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", e.endTagWithAttributes = "end-tag-with-attributes", e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", e.unexpectedSolidusInTag = "unexpected-solidus-in-tag", e.unexpectedNullCharacter = "unexpected-null-character", e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", e.missingEndTagName = "missing-end-tag-name", e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", e.unknownNamedCharacterReference = "unknown-named-character-reference", e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", e.eofBeforeTagName = "eof-before-tag-name", e.eofInTag = "eof-in-tag", e.missingAttributeValue = "missing-attribute-value", e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", e.cdataInHtmlContent = "cdata-in-html-content", e.incorrectlyOpenedComment = "incorrectly-opened-comment", e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", e.eofInDoctype = "eof-in-doctype", e.nestedComment = "nested-comment", e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", e.eofInComment = "eof-in-comment", e.incorrectlyClosedComment = "incorrectly-closed-comment", e.eofInCdata = "eof-in-cdata", e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", e.nullCharacterReference = "null-character-reference", e.surrogateCharacterReference = "surrogate-character-reference", e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", e.controlCharacterReference = "control-character-reference", e.noncharacterCharacterReference = "noncharacter-character-reference", e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", e.missingDoctypeName = "missing-doctype-name", e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", e.duplicateAttribute = "duplicate-attribute", e.nonConformingDoctype = "non-conforming-doctype", e.missingDoctype = "missing-doctype", e.misplacedDoctype = "misplaced-doctype", e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", e.openElementsLeftAfterEof = "open-elements-left-after-eof", e.abandonedHeadElementChild = "abandoned-head-element-child", e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", e.nestedNoscriptInHead = "nested-noscript-in-head", e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(T || (T = {}));
const Qi = 65536;
class Wi {
  constructor(t) {
    this.handler = t, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = Qi, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(t, u) {
    const { line: s, col: n, offset: r } = this, i = n + u, d = r + u;
    return {
      code: t,
      startLine: s,
      endLine: s,
      startCol: i,
      endCol: i,
      startOffset: d,
      endOffset: d
    };
  }
  _err(t) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(t, 0)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(t) {
    if (this.pos !== this.html.length - 1) {
      const u = this.html.charCodeAt(this.pos + 1);
      if (Vi(u))
        return this.pos++, this._addGap(), Gi(t, u);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, c.EOF;
    return this._err(T.surrogateInInputStream), t;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(t, u) {
    this.html.length > 0 ? this.html += t : this.html = t, this.endOfChunkHit = !1, this.lastChunkWritten = u;
  }
  insertHtmlAtCurrentPos(t) {
    this.html = this.html.substring(0, this.pos + 1) + t + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(t, u) {
    if (this.pos + t.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (u)
      return this.html.startsWith(t, this.pos);
    for (let s = 0; s < t.length; s++)
      if ((this.html.charCodeAt(this.pos + s) | 32) !== t.charCodeAt(s))
        return !1;
    return !0;
  }
  peek(t) {
    const u = this.pos + t;
    if (u >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, c.EOF;
    const s = this.html.charCodeAt(u);
    return s === c.CARRIAGE_RETURN ? c.LINE_FEED : s;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, c.EOF;
    let t = this.html.charCodeAt(this.pos);
    return t === c.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, c.LINE_FEED) : t === c.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, Us(t) && (t = this._processSurrogate(t)), this.handler.onParseError === null || t > 31 && t < 127 || t === c.LINE_FEED || t === c.CARRIAGE_RETURN || t > 159 && t < 64976 || this._checkForProblematicCharacters(t), t);
  }
  _checkForProblematicCharacters(t) {
    Hs(t) ? this._err(T.controlCharacterInInputStream) : vs(t) && this._err(T.noncharacterInInputStream);
  }
  retreat(t) {
    for (this.pos -= t; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var D;
(function(e) {
  e[e.CHARACTER = 0] = "CHARACTER", e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER", e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", e[e.START_TAG = 3] = "START_TAG", e[e.END_TAG = 4] = "END_TAG", e[e.COMMENT = 5] = "COMMENT", e[e.DOCTYPE = 6] = "DOCTYPE", e[e.EOF = 7] = "EOF", e[e.HIBERNATION = 8] = "HIBERNATION";
})(D || (D = {}));
function Ys(e, t) {
  for (let u = e.attrs.length - 1; u >= 0; u--)
    if (e.attrs[u].name === t)
      return e.attrs[u].value;
  return null;
}
var m;
(function(e) {
  e.HTML = "http://www.w3.org/1999/xhtml", e.MATHML = "http://www.w3.org/1998/Math/MathML", e.SVG = "http://www.w3.org/2000/svg", e.XLINK = "http://www.w3.org/1999/xlink", e.XML = "http://www.w3.org/XML/1998/namespace", e.XMLNS = "http://www.w3.org/2000/xmlns/";
})(m || (m = {}));
var le;
(function(e) {
  e.TYPE = "type", e.ACTION = "action", e.ENCODING = "encoding", e.PROMPT = "prompt", e.NAME = "name", e.COLOR = "color", e.FACE = "face", e.SIZE = "size";
})(le || (le = {}));
var V;
(function(e) {
  e.NO_QUIRKS = "no-quirks", e.QUIRKS = "quirks", e.LIMITED_QUIRKS = "limited-quirks";
})(V || (V = {}));
var f;
(function(e) {
  e.A = "a", e.ADDRESS = "address", e.ANNOTATION_XML = "annotation-xml", e.APPLET = "applet", e.AREA = "area", e.ARTICLE = "article", e.ASIDE = "aside", e.B = "b", e.BASE = "base", e.BASEFONT = "basefont", e.BGSOUND = "bgsound", e.BIG = "big", e.BLOCKQUOTE = "blockquote", e.BODY = "body", e.BR = "br", e.BUTTON = "button", e.CAPTION = "caption", e.CENTER = "center", e.CODE = "code", e.COL = "col", e.COLGROUP = "colgroup", e.DD = "dd", e.DESC = "desc", e.DETAILS = "details", e.DIALOG = "dialog", e.DIR = "dir", e.DIV = "div", e.DL = "dl", e.DT = "dt", e.EM = "em", e.EMBED = "embed", e.FIELDSET = "fieldset", e.FIGCAPTION = "figcaption", e.FIGURE = "figure", e.FONT = "font", e.FOOTER = "footer", e.FOREIGN_OBJECT = "foreignObject", e.FORM = "form", e.FRAME = "frame", e.FRAMESET = "frameset", e.H1 = "h1", e.H2 = "h2", e.H3 = "h3", e.H4 = "h4", e.H5 = "h5", e.H6 = "h6", e.HEAD = "head", e.HEADER = "header", e.HGROUP = "hgroup", e.HR = "hr", e.HTML = "html", e.I = "i", e.IMG = "img", e.IMAGE = "image", e.INPUT = "input", e.IFRAME = "iframe", e.KEYGEN = "keygen", e.LABEL = "label", e.LI = "li", e.LINK = "link", e.LISTING = "listing", e.MAIN = "main", e.MALIGNMARK = "malignmark", e.MARQUEE = "marquee", e.MATH = "math", e.MENU = "menu", e.META = "meta", e.MGLYPH = "mglyph", e.MI = "mi", e.MO = "mo", e.MN = "mn", e.MS = "ms", e.MTEXT = "mtext", e.NAV = "nav", e.NOBR = "nobr", e.NOFRAMES = "noframes", e.NOEMBED = "noembed", e.NOSCRIPT = "noscript", e.OBJECT = "object", e.OL = "ol", e.OPTGROUP = "optgroup", e.OPTION = "option", e.P = "p", e.PARAM = "param", e.PLAINTEXT = "plaintext", e.PRE = "pre", e.RB = "rb", e.RP = "rp", e.RT = "rt", e.RTC = "rtc", e.RUBY = "ruby", e.S = "s", e.SCRIPT = "script", e.SEARCH = "search", e.SECTION = "section", e.SELECT = "select", e.SOURCE = "source", e.SMALL = "small", e.SPAN = "span", e.STRIKE = "strike", e.STRONG = "strong", e.STYLE = "style", e.SUB = "sub", e.SUMMARY = "summary", e.SUP = "sup", e.TABLE = "table", e.TBODY = "tbody", e.TEMPLATE = "template", e.TEXTAREA = "textarea", e.TFOOT = "tfoot", e.TD = "td", e.TH = "th", e.THEAD = "thead", e.TITLE = "title", e.TR = "tr", e.TRACK = "track", e.TT = "tt", e.U = "u", e.UL = "ul", e.SVG = "svg", e.VAR = "var", e.WBR = "wbr", e.XMP = "xmp";
})(f || (f = {}));
var a;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.A = 1] = "A", e[e.ADDRESS = 2] = "ADDRESS", e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML", e[e.APPLET = 4] = "APPLET", e[e.AREA = 5] = "AREA", e[e.ARTICLE = 6] = "ARTICLE", e[e.ASIDE = 7] = "ASIDE", e[e.B = 8] = "B", e[e.BASE = 9] = "BASE", e[e.BASEFONT = 10] = "BASEFONT", e[e.BGSOUND = 11] = "BGSOUND", e[e.BIG = 12] = "BIG", e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE", e[e.BODY = 14] = "BODY", e[e.BR = 15] = "BR", e[e.BUTTON = 16] = "BUTTON", e[e.CAPTION = 17] = "CAPTION", e[e.CENTER = 18] = "CENTER", e[e.CODE = 19] = "CODE", e[e.COL = 20] = "COL", e[e.COLGROUP = 21] = "COLGROUP", e[e.DD = 22] = "DD", e[e.DESC = 23] = "DESC", e[e.DETAILS = 24] = "DETAILS", e[e.DIALOG = 25] = "DIALOG", e[e.DIR = 26] = "DIR", e[e.DIV = 27] = "DIV", e[e.DL = 28] = "DL", e[e.DT = 29] = "DT", e[e.EM = 30] = "EM", e[e.EMBED = 31] = "EMBED", e[e.FIELDSET = 32] = "FIELDSET", e[e.FIGCAPTION = 33] = "FIGCAPTION", e[e.FIGURE = 34] = "FIGURE", e[e.FONT = 35] = "FONT", e[e.FOOTER = 36] = "FOOTER", e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", e[e.FORM = 38] = "FORM", e[e.FRAME = 39] = "FRAME", e[e.FRAMESET = 40] = "FRAMESET", e[e.H1 = 41] = "H1", e[e.H2 = 42] = "H2", e[e.H3 = 43] = "H3", e[e.H4 = 44] = "H4", e[e.H5 = 45] = "H5", e[e.H6 = 46] = "H6", e[e.HEAD = 47] = "HEAD", e[e.HEADER = 48] = "HEADER", e[e.HGROUP = 49] = "HGROUP", e[e.HR = 50] = "HR", e[e.HTML = 51] = "HTML", e[e.I = 52] = "I", e[e.IMG = 53] = "IMG", e[e.IMAGE = 54] = "IMAGE", e[e.INPUT = 55] = "INPUT", e[e.IFRAME = 56] = "IFRAME", e[e.KEYGEN = 57] = "KEYGEN", e[e.LABEL = 58] = "LABEL", e[e.LI = 59] = "LI", e[e.LINK = 60] = "LINK", e[e.LISTING = 61] = "LISTING", e[e.MAIN = 62] = "MAIN", e[e.MALIGNMARK = 63] = "MALIGNMARK", e[e.MARQUEE = 64] = "MARQUEE", e[e.MATH = 65] = "MATH", e[e.MENU = 66] = "MENU", e[e.META = 67] = "META", e[e.MGLYPH = 68] = "MGLYPH", e[e.MI = 69] = "MI", e[e.MO = 70] = "MO", e[e.MN = 71] = "MN", e[e.MS = 72] = "MS", e[e.MTEXT = 73] = "MTEXT", e[e.NAV = 74] = "NAV", e[e.NOBR = 75] = "NOBR", e[e.NOFRAMES = 76] = "NOFRAMES", e[e.NOEMBED = 77] = "NOEMBED", e[e.NOSCRIPT = 78] = "NOSCRIPT", e[e.OBJECT = 79] = "OBJECT", e[e.OL = 80] = "OL", e[e.OPTGROUP = 81] = "OPTGROUP", e[e.OPTION = 82] = "OPTION", e[e.P = 83] = "P", e[e.PARAM = 84] = "PARAM", e[e.PLAINTEXT = 85] = "PLAINTEXT", e[e.PRE = 86] = "PRE", e[e.RB = 87] = "RB", e[e.RP = 88] = "RP", e[e.RT = 89] = "RT", e[e.RTC = 90] = "RTC", e[e.RUBY = 91] = "RUBY", e[e.S = 92] = "S", e[e.SCRIPT = 93] = "SCRIPT", e[e.SEARCH = 94] = "SEARCH", e[e.SECTION = 95] = "SECTION", e[e.SELECT = 96] = "SELECT", e[e.SOURCE = 97] = "SOURCE", e[e.SMALL = 98] = "SMALL", e[e.SPAN = 99] = "SPAN", e[e.STRIKE = 100] = "STRIKE", e[e.STRONG = 101] = "STRONG", e[e.STYLE = 102] = "STYLE", e[e.SUB = 103] = "SUB", e[e.SUMMARY = 104] = "SUMMARY", e[e.SUP = 105] = "SUP", e[e.TABLE = 106] = "TABLE", e[e.TBODY = 107] = "TBODY", e[e.TEMPLATE = 108] = "TEMPLATE", e[e.TEXTAREA = 109] = "TEXTAREA", e[e.TFOOT = 110] = "TFOOT", e[e.TD = 111] = "TD", e[e.TH = 112] = "TH", e[e.THEAD = 113] = "THEAD", e[e.TITLE = 114] = "TITLE", e[e.TR = 115] = "TR", e[e.TRACK = 116] = "TRACK", e[e.TT = 117] = "TT", e[e.U = 118] = "U", e[e.UL = 119] = "UL", e[e.SVG = 120] = "SVG", e[e.VAR = 121] = "VAR", e[e.WBR = 122] = "WBR", e[e.XMP = 123] = "XMP";
})(a || (a = {}));
const ji = /* @__PURE__ */ new Map([
  [f.A, a.A],
  [f.ADDRESS, a.ADDRESS],
  [f.ANNOTATION_XML, a.ANNOTATION_XML],
  [f.APPLET, a.APPLET],
  [f.AREA, a.AREA],
  [f.ARTICLE, a.ARTICLE],
  [f.ASIDE, a.ASIDE],
  [f.B, a.B],
  [f.BASE, a.BASE],
  [f.BASEFONT, a.BASEFONT],
  [f.BGSOUND, a.BGSOUND],
  [f.BIG, a.BIG],
  [f.BLOCKQUOTE, a.BLOCKQUOTE],
  [f.BODY, a.BODY],
  [f.BR, a.BR],
  [f.BUTTON, a.BUTTON],
  [f.CAPTION, a.CAPTION],
  [f.CENTER, a.CENTER],
  [f.CODE, a.CODE],
  [f.COL, a.COL],
  [f.COLGROUP, a.COLGROUP],
  [f.DD, a.DD],
  [f.DESC, a.DESC],
  [f.DETAILS, a.DETAILS],
  [f.DIALOG, a.DIALOG],
  [f.DIR, a.DIR],
  [f.DIV, a.DIV],
  [f.DL, a.DL],
  [f.DT, a.DT],
  [f.EM, a.EM],
  [f.EMBED, a.EMBED],
  [f.FIELDSET, a.FIELDSET],
  [f.FIGCAPTION, a.FIGCAPTION],
  [f.FIGURE, a.FIGURE],
  [f.FONT, a.FONT],
  [f.FOOTER, a.FOOTER],
  [f.FOREIGN_OBJECT, a.FOREIGN_OBJECT],
  [f.FORM, a.FORM],
  [f.FRAME, a.FRAME],
  [f.FRAMESET, a.FRAMESET],
  [f.H1, a.H1],
  [f.H2, a.H2],
  [f.H3, a.H3],
  [f.H4, a.H4],
  [f.H5, a.H5],
  [f.H6, a.H6],
  [f.HEAD, a.HEAD],
  [f.HEADER, a.HEADER],
  [f.HGROUP, a.HGROUP],
  [f.HR, a.HR],
  [f.HTML, a.HTML],
  [f.I, a.I],
  [f.IMG, a.IMG],
  [f.IMAGE, a.IMAGE],
  [f.INPUT, a.INPUT],
  [f.IFRAME, a.IFRAME],
  [f.KEYGEN, a.KEYGEN],
  [f.LABEL, a.LABEL],
  [f.LI, a.LI],
  [f.LINK, a.LINK],
  [f.LISTING, a.LISTING],
  [f.MAIN, a.MAIN],
  [f.MALIGNMARK, a.MALIGNMARK],
  [f.MARQUEE, a.MARQUEE],
  [f.MATH, a.MATH],
  [f.MENU, a.MENU],
  [f.META, a.META],
  [f.MGLYPH, a.MGLYPH],
  [f.MI, a.MI],
  [f.MO, a.MO],
  [f.MN, a.MN],
  [f.MS, a.MS],
  [f.MTEXT, a.MTEXT],
  [f.NAV, a.NAV],
  [f.NOBR, a.NOBR],
  [f.NOFRAMES, a.NOFRAMES],
  [f.NOEMBED, a.NOEMBED],
  [f.NOSCRIPT, a.NOSCRIPT],
  [f.OBJECT, a.OBJECT],
  [f.OL, a.OL],
  [f.OPTGROUP, a.OPTGROUP],
  [f.OPTION, a.OPTION],
  [f.P, a.P],
  [f.PARAM, a.PARAM],
  [f.PLAINTEXT, a.PLAINTEXT],
  [f.PRE, a.PRE],
  [f.RB, a.RB],
  [f.RP, a.RP],
  [f.RT, a.RT],
  [f.RTC, a.RTC],
  [f.RUBY, a.RUBY],
  [f.S, a.S],
  [f.SCRIPT, a.SCRIPT],
  [f.SEARCH, a.SEARCH],
  [f.SECTION, a.SECTION],
  [f.SELECT, a.SELECT],
  [f.SOURCE, a.SOURCE],
  [f.SMALL, a.SMALL],
  [f.SPAN, a.SPAN],
  [f.STRIKE, a.STRIKE],
  [f.STRONG, a.STRONG],
  [f.STYLE, a.STYLE],
  [f.SUB, a.SUB],
  [f.SUMMARY, a.SUMMARY],
  [f.SUP, a.SUP],
  [f.TABLE, a.TABLE],
  [f.TBODY, a.TBODY],
  [f.TEMPLATE, a.TEMPLATE],
  [f.TEXTAREA, a.TEXTAREA],
  [f.TFOOT, a.TFOOT],
  [f.TD, a.TD],
  [f.TH, a.TH],
  [f.THEAD, a.THEAD],
  [f.TITLE, a.TITLE],
  [f.TR, a.TR],
  [f.TRACK, a.TRACK],
  [f.TT, a.TT],
  [f.U, a.U],
  [f.UL, a.UL],
  [f.SVG, a.SVG],
  [f.VAR, a.VAR],
  [f.WBR, a.WBR],
  [f.XMP, a.XMP]
]);
function _t(e) {
  var t;
  return (t = ji.get(e)) !== null && t !== void 0 ? t : a.UNKNOWN;
}
const A = a, Xi = {
  [m.HTML]: /* @__PURE__ */ new Set([
    A.ADDRESS,
    A.APPLET,
    A.AREA,
    A.ARTICLE,
    A.ASIDE,
    A.BASE,
    A.BASEFONT,
    A.BGSOUND,
    A.BLOCKQUOTE,
    A.BODY,
    A.BR,
    A.BUTTON,
    A.CAPTION,
    A.CENTER,
    A.COL,
    A.COLGROUP,
    A.DD,
    A.DETAILS,
    A.DIR,
    A.DIV,
    A.DL,
    A.DT,
    A.EMBED,
    A.FIELDSET,
    A.FIGCAPTION,
    A.FIGURE,
    A.FOOTER,
    A.FORM,
    A.FRAME,
    A.FRAMESET,
    A.H1,
    A.H2,
    A.H3,
    A.H4,
    A.H5,
    A.H6,
    A.HEAD,
    A.HEADER,
    A.HGROUP,
    A.HR,
    A.HTML,
    A.IFRAME,
    A.IMG,
    A.INPUT,
    A.LI,
    A.LINK,
    A.LISTING,
    A.MAIN,
    A.MARQUEE,
    A.MENU,
    A.META,
    A.NAV,
    A.NOEMBED,
    A.NOFRAMES,
    A.NOSCRIPT,
    A.OBJECT,
    A.OL,
    A.P,
    A.PARAM,
    A.PLAINTEXT,
    A.PRE,
    A.SCRIPT,
    A.SECTION,
    A.SELECT,
    A.SOURCE,
    A.STYLE,
    A.SUMMARY,
    A.TABLE,
    A.TBODY,
    A.TD,
    A.TEMPLATE,
    A.TEXTAREA,
    A.TFOOT,
    A.TH,
    A.THEAD,
    A.TITLE,
    A.TR,
    A.TRACK,
    A.UL,
    A.WBR,
    A.XMP
  ]),
  [m.MATHML]: /* @__PURE__ */ new Set([A.MI, A.MO, A.MN, A.MS, A.MTEXT, A.ANNOTATION_XML]),
  [m.SVG]: /* @__PURE__ */ new Set([A.TITLE, A.FOREIGN_OBJECT, A.DESC]),
  [m.XLINK]: /* @__PURE__ */ new Set(),
  [m.XML]: /* @__PURE__ */ new Set(),
  [m.XMLNS]: /* @__PURE__ */ new Set()
}, Qt = /* @__PURE__ */ new Set([A.H1, A.H2, A.H3, A.H4, A.H5, A.H6]), $i = /* @__PURE__ */ new Set([
  f.STYLE,
  f.SCRIPT,
  f.XMP,
  f.IFRAME,
  f.NOEMBED,
  f.NOFRAMES,
  f.PLAINTEXT
]);
function Ki(e, t) {
  return $i.has(e) || t && e === f.NOSCRIPT;
}
var o;
(function(e) {
  e[e.DATA = 0] = "DATA", e[e.RCDATA = 1] = "RCDATA", e[e.RAWTEXT = 2] = "RAWTEXT", e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA", e[e.PLAINTEXT = 4] = "PLAINTEXT", e[e.TAG_OPEN = 5] = "TAG_OPEN", e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN", e[e.TAG_NAME = 7] = "TAG_NAME", e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", e[e.COMMENT_START = 42] = "COMMENT_START", e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", e[e.COMMENT = 44] = "COMMENT", e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", e[e.COMMENT_END = 50] = "COMMENT_END", e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", e[e.DOCTYPE = 52] = "DOCTYPE", e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", e[e.CDATA_SECTION = 68] = "CDATA_SECTION", e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", e[e.AMBIGUOUS_AMPERSAND = 72] = "AMBIGUOUS_AMPERSAND";
})(o || (o = {}));
const q = {
  DATA: o.DATA,
  RCDATA: o.RCDATA,
  RAWTEXT: o.RAWTEXT,
  SCRIPT_DATA: o.SCRIPT_DATA,
  PLAINTEXT: o.PLAINTEXT,
  CDATA_SECTION: o.CDATA_SECTION
};
function zi(e) {
  return e >= c.DIGIT_0 && e <= c.DIGIT_9;
}
function xe(e) {
  return e >= c.LATIN_CAPITAL_A && e <= c.LATIN_CAPITAL_Z;
}
function Zi(e) {
  return e >= c.LATIN_SMALL_A && e <= c.LATIN_SMALL_Z;
}
function te(e) {
  return Zi(e) || xe(e);
}
function Uu(e) {
  return te(e) || zi(e);
}
function Ze(e) {
  return e + 32;
}
function qs(e) {
  return e === c.SPACE || e === c.LINE_FEED || e === c.TABULATION || e === c.FORM_FEED;
}
function Hu(e) {
  return qs(e) || e === c.SOLIDUS || e === c.GREATER_THAN_SIGN;
}
function Ji(e) {
  return e === c.NULL ? T.nullCharacterReference : e > 1114111 ? T.characterReferenceOutsideUnicodeRange : Us(e) ? T.surrogateCharacterReference : vs(e) ? T.noncharacterCharacterReference : Hs(e) || e === c.CARRIAGE_RETURN ? T.controlCharacterReference : null;
}
class e0 {
  constructor(t, u) {
    this.options = t, this.handler = u, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = o.DATA, this.returnState = o.DATA, this.entityStartPos = 0, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new Wi(u), this.currentLocation = this.getCurrentLocation(-1), this.entityDecoder = new fs(hs, (s, n) => {
      this.preprocessor.pos = this.entityStartPos + n - 1, this._flushCodePointConsumedAsCharacterReference(s);
    }, u.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(T.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (s) => {
        this._err(T.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + s);
      },
      validateNumericCharacterReference: (s) => {
        const n = Ji(s);
        n && this._err(n, 1);
      }
    } : void 0);
  }
  //Errors
  _err(t, u = 0) {
    var s, n;
    (n = (s = this.handler).onParseError) === null || n === void 0 || n.call(s, this.preprocessor.getError(t, u));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(t) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - t,
      startOffset: this.preprocessor.offset - t,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const t = this._consume();
        this._ensureHibernation() || this._callState(t);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(t) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || t?.());
  }
  write(t, u, s) {
    this.active = !0, this.preprocessor.write(t, u), this._runParsingLoop(), this.paused || s?.();
  }
  insertHtmlAtCurrentPos(t) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(t), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this.preprocessor.retreat(this.consumedAfterSnapshot), this.consumedAfterSnapshot = 0, this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _advanceBy(t) {
    this.consumedAfterSnapshot += t;
    for (let u = 0; u < t; u++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(t, u) {
    return this.preprocessor.startsWith(t, u) ? (this._advanceBy(t.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: D.START_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: D.END_TAG,
      tagName: "",
      tagID: a.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(t) {
    this.currentToken = {
      type: D.COMMENT,
      data: "",
      location: this.getCurrentLocation(t)
    };
  }
  _createDoctypeToken(t) {
    this.currentToken = {
      type: D.DOCTYPE,
      name: t,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(t, u) {
    this.currentCharacterToken = {
      type: t,
      chars: u,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(t) {
    this.currentAttr = {
      name: t,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var t, u;
    const s = this.currentToken;
    if (Ys(s, this.currentAttr.name) === null) {
      if (s.attrs.push(this.currentAttr), s.location && this.currentLocation) {
        const n = (t = (u = s.location).attrs) !== null && t !== void 0 ? t : u.attrs = /* @__PURE__ */ Object.create(null);
        n[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(T.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(t) {
    this._emitCurrentCharacterToken(t.location), this.currentToken = null, t.location && (t.location.endLine = this.preprocessor.line, t.location.endCol = this.preprocessor.col + 1, t.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const t = this.currentToken;
    this.prepareToken(t), t.tagID = _t(t.tagName), t.type === D.START_TAG ? (this.lastStartTagName = t.tagName, this.handler.onStartTag(t)) : (t.attrs.length > 0 && this._err(T.endTagWithAttributes), t.selfClosing && this._err(T.endTagWithTrailingSolidus), this.handler.onEndTag(t)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(t) {
    this.prepareToken(t), this.handler.onComment(t), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(t) {
    this.prepareToken(t), this.handler.onDoctype(t), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(t) {
    if (this.currentCharacterToken) {
      switch (t && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = t.startLine, this.currentCharacterToken.location.endCol = t.startCol, this.currentCharacterToken.location.endOffset = t.startOffset), this.currentCharacterToken.type) {
        case D.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case D.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case D.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const t = this.getCurrentLocation(0);
    t && (t.endLine = t.startLine, t.endCol = t.startCol, t.endOffset = t.startOffset), this._emitCurrentCharacterToken(t), this.handler.onEof({ type: D.EOF, location: t }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: The specification uses only one type of character token (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(t, u) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type === t) {
        this.currentCharacterToken.chars += u;
        return;
      } else
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
    this._createCharacterToken(t, u);
  }
  _emitCodePoint(t) {
    const u = qs(t) ? D.WHITESPACE_CHARACTER : t === c.NULL ? D.NULL_CHARACTER : D.CHARACTER;
    this._appendCharToCurrentCharacterToken(u, String.fromCodePoint(t));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(t) {
    this._appendCharToCurrentCharacterToken(D.CHARACTER, t);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state, this.state = o.CHARACTER_REFERENCE, this.entityStartPos = this.preprocessor.pos, this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? Q.Attribute : Q.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === o.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === o.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(t) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(t) : this._emitCodePoint(t);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(t) {
    switch (this.state) {
      case o.DATA: {
        this._stateData(t);
        break;
      }
      case o.RCDATA: {
        this._stateRcdata(t);
        break;
      }
      case o.RAWTEXT: {
        this._stateRawtext(t);
        break;
      }
      case o.SCRIPT_DATA: {
        this._stateScriptData(t);
        break;
      }
      case o.PLAINTEXT: {
        this._statePlaintext(t);
        break;
      }
      case o.TAG_OPEN: {
        this._stateTagOpen(t);
        break;
      }
      case o.END_TAG_OPEN: {
        this._stateEndTagOpen(t);
        break;
      }
      case o.TAG_NAME: {
        this._stateTagName(t);
        break;
      }
      case o.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(t);
        break;
      }
      case o.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(t);
        break;
      }
      case o.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(t);
        break;
      }
      case o.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(t);
        break;
      }
      case o.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(t);
        break;
      }
      case o.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(t);
        break;
      }
      case o.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(t);
        break;
      }
      case o.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(t);
        break;
      }
      case o.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(t);
        break;
      }
      case o.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(t);
        break;
      }
      case o.ATTRIBUTE_NAME: {
        this._stateAttributeName(t);
        break;
      }
      case o.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(t);
        break;
      }
      case o.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(t);
        break;
      }
      case o.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(t);
        break;
      }
      case o.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(t);
        break;
      }
      case o.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(t);
        break;
      }
      case o.BOGUS_COMMENT: {
        this._stateBogusComment(t);
        break;
      }
      case o.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(t);
        break;
      }
      case o.COMMENT_START: {
        this._stateCommentStart(t);
        break;
      }
      case o.COMMENT_START_DASH: {
        this._stateCommentStartDash(t);
        break;
      }
      case o.COMMENT: {
        this._stateComment(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(t);
        break;
      }
      case o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(t);
        break;
      }
      case o.COMMENT_END_DASH: {
        this._stateCommentEndDash(t);
        break;
      }
      case o.COMMENT_END: {
        this._stateCommentEnd(t);
        break;
      }
      case o.COMMENT_END_BANG: {
        this._stateCommentEndBang(t);
        break;
      }
      case o.DOCTYPE: {
        this._stateDoctype(t);
        break;
      }
      case o.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(t);
        break;
      }
      case o.DOCTYPE_NAME: {
        this._stateDoctypeName(t);
        break;
      }
      case o.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(t);
        break;
      }
      case o.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(t);
        break;
      }
      case o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(t);
        break;
      }
      case o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(t);
        break;
      }
      case o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(t);
        break;
      }
      case o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(t);
        break;
      }
      case o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(t);
        break;
      }
      case o.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(t);
        break;
      }
      case o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(t);
        break;
      }
      case o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(t);
        break;
      }
      case o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(t);
        break;
      }
      case o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(t);
        break;
      }
      case o.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(t);
        break;
      }
      case o.CDATA_SECTION: {
        this._stateCdataSection(t);
        break;
      }
      case o.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(t);
        break;
      }
      case o.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(t);
        break;
      }
      case o.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case o.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(t);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(t) {
    switch (t) {
      case c.LESS_THAN_SIGN: {
        this.state = o.TAG_OPEN;
        break;
      }
      case c.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitCodePoint(t);
        break;
      }
      case c.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(t) {
    switch (t) {
      case c.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(t) {
    switch (t) {
      case c.LESS_THAN_SIGN: {
        this.state = o.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(t) {
    switch (t) {
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(t) {
    switch (t) {
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(t) {
    if (te(t))
      this._createStartTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case c.EXCLAMATION_MARK: {
          this.state = o.MARKUP_DECLARATION_OPEN;
          break;
        }
        case c.SOLIDUS: {
          this.state = o.END_TAG_OPEN;
          break;
        }
        case c.QUESTION_MARK: {
          this._err(T.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
          break;
        }
        case c.EOF: {
          this._err(T.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(T.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = o.DATA, this._stateData(t);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(t) {
    if (te(t))
      this._createEndTagToken(), this.state = o.TAG_NAME, this._stateTagName(t);
    else
      switch (t) {
        case c.GREATER_THAN_SIGN: {
          this._err(T.missingEndTagName), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(T.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(T.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case c.SOLIDUS: {
        this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.tagName += P;
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        u.tagName += String.fromCodePoint(xe(t) ? Ze(t) : t);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(t) {
    t === c.SOLIDUS ? this.state = o.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(t) {
    te(t) ? (this.state = o.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(t)) : (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  handleSpecialEndTag(t) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const u = this.currentToken;
    switch (u.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = o.BEFORE_ATTRIBUTE_NAME, !1;
      case c.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = o.SELF_CLOSING_START_TAG, !1;
      case c.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = o.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RCDATA, this._stateRcdata(t));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(t) {
    t === c.SOLIDUS ? this.state = o.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(t) {
    te(t) ? (this.state = o.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(t)) : (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.RAWTEXT, this._stateRawtext(t));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(t) {
    switch (t) {
      case c.SOLIDUS: {
        this.state = o.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case c.EXCLAMATION_MARK: {
        this.state = o.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = o.SCRIPT_DATA, this._stateScriptData(t);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(t) {
    te(t) ? (this.state = o.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(t) {
    t === c.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(t) {
    t === c.HYPHEN_MINUS ? (this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = o.SCRIPT_DATA, this._stateScriptData(t));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_ESCAPED, this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(t) {
    t === c.SOLIDUS ? this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : te(t) ? (this._emitChars("<"), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(t)) : (this._emitChars("<"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(t) {
    te(t) ? (this.state = o.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(t)) : (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(t) {
    this.handleSpecialEndTag(t) && (this._emitChars("</"), this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(t) {
    if (this.preprocessor.startsWith(v.SCRIPT, !1) && Hu(this.preprocessor.peek(v.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < v.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else this._ensureHibernation() || (this.state = o.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(t));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case c.LESS_THAN_SIGN: {
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(P);
        break;
      }
      case c.EOF: {
        this._err(T.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(t);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(t) {
    t === c.SOLIDUS ? (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(t) {
    if (this.preprocessor.startsWith(v.SCRIPT, !1) && Hu(this.preprocessor.peek(v.SCRIPT.length))) {
      this._emitCodePoint(t);
      for (let u = 0; u < v.SCRIPT.length; u++)
        this._emitCodePoint(this._consume());
      this.state = o.SCRIPT_DATA_ESCAPED;
    } else this._ensureHibernation() || (this.state = o.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(t));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.SOLIDUS:
      case c.GREATER_THAN_SIGN:
      case c.EOF: {
        this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case c.EQUALS_SIGN: {
        this._err(T.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = o.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
      case c.SOLIDUS:
      case c.GREATER_THAN_SIGN:
      case c.EOF: {
        this._leaveAttrName(), this.state = o.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(t);
        break;
      }
      case c.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = o.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case c.QUOTATION_MARK:
      case c.APOSTROPHE:
      case c.LESS_THAN_SIGN: {
        this._err(T.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(t);
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.name += P;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(xe(t) ? Ze(t) : t);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.SOLIDUS: {
        this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case c.EQUALS_SIGN: {
        this.state = o.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = o.ATTRIBUTE_NAME, this._stateAttributeName(t);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.QUOTATION_MARK: {
        this.state = o.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        this.state = o.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.missingAttributeValue), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = o.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(t);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(t) {
    switch (t) {
      case c.QUOTATION_MARK: {
        this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case c.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(t) {
    switch (t) {
      case c.APOSTROPHE: {
        this.state = o.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case c.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case c.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), this.currentAttr.value += P;
        break;
      }
      case c.QUOTATION_MARK:
      case c.APOSTROPHE:
      case c.LESS_THAN_SIGN:
      case c.EQUALS_SIGN:
      case c.GRAVE_ACCENT: {
        this._err(T.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(t);
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(t);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this._leaveAttrValue(), this.state = o.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case c.SOLIDUS: {
        this._leaveAttrValue(), this.state = o.SELF_CLOSING_START_TAG;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingWhitespaceBetweenAttributes), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(t) {
    switch (t) {
      case c.GREATER_THAN_SIGN: {
        const u = this.currentToken;
        u.selfClosing = !0, this.state = o.DATA, this.emitCurrentTagToken();
        break;
      }
      case c.EOF: {
        this._err(T.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.unexpectedSolidusInTag), this.state = o.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(t);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(t) {
    const u = this.currentToken;
    switch (t) {
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case c.EOF: {
        this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.data += P;
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(t) {
    this._consumeSequenceIfMatch(v.DASH_DASH, !0) ? (this._createCommentToken(v.DASH_DASH.length + 1), this.state = o.COMMENT_START) : this._consumeSequenceIfMatch(v.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(v.DOCTYPE.length + 1), this.state = o.DOCTYPE) : this._consumeSequenceIfMatch(v.CDATA_START, !0) ? this.inForeignNode ? this.state = o.CDATA_SECTION : (this._err(T.cdataInHtmlContent), this._createCommentToken(v.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = o.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(T.incorrectlyOpenedComment), this._createCommentToken(2), this.state = o.BOGUS_COMMENT, this._stateBogusComment(t));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(t) {
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.COMMENT_START_DASH;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.abruptClosingOfEmptyComment), this.state = o.DATA;
        const u = this.currentToken;
        this.emitCurrentComment(u);
        break;
      }
      default:
        this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(t) {
    const u = this.currentToken;
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.COMMENT_END;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.abruptClosingOfEmptyComment), this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(t) {
    const u = this.currentToken;
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.COMMENT_END_DASH;
        break;
      }
      case c.LESS_THAN_SIGN: {
        u.data += "<", this.state = o.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.data += P;
        break;
      }
      case c.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += String.fromCodePoint(t);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(t) {
    const u = this.currentToken;
    switch (t) {
      case c.EXCLAMATION_MARK: {
        u.data += "!", this.state = o.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case c.LESS_THAN_SIGN: {
        u.data += "<";
        break;
      }
      default:
        this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(t) {
    t === c.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = o.COMMENT, this._stateComment(t));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(t) {
    t === c.HYPHEN_MINUS ? this.state = o.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = o.COMMENT_END_DASH, this._stateCommentEndDash(t));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(t) {
    t !== c.GREATER_THAN_SIGN && t !== c.EOF && this._err(T.nestedComment), this.state = o.COMMENT_END, this._stateCommentEnd(t);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(t) {
    const u = this.currentToken;
    switch (t) {
      case c.HYPHEN_MINUS: {
        this.state = o.COMMENT_END;
        break;
      }
      case c.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "-", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(t) {
    const u = this.currentToken;
    switch (t) {
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case c.EXCLAMATION_MARK: {
        this.state = o.COMMENT_END_BANG;
        break;
      }
      case c.HYPHEN_MINUS: {
        u.data += "-";
        break;
      }
      case c.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(t) {
    const u = this.currentToken;
    switch (t) {
      case c.HYPHEN_MINUS: {
        u.data += "--!", this.state = o.COMMENT_END_DASH;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.incorrectlyClosedComment), this.state = o.DATA, this.emitCurrentComment(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInComment), this.emitCurrentComment(u), this._emitEOFToken();
        break;
      }
      default:
        u.data += "--!", this.state = o.COMMENT, this._stateComment(t);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(t) {
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_NAME;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), this._createDoctypeToken(null);
        const u = this.currentToken;
        u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingWhitespaceBeforeDoctypeName), this.state = o.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(t);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(t) {
    if (xe(t))
      this._createDoctypeToken(String.fromCharCode(Ze(t))), this.state = o.DOCTYPE_NAME;
    else
      switch (t) {
        case c.SPACE:
        case c.LINE_FEED:
        case c.TABULATION:
        case c.FORM_FEED:
          break;
        case c.NULL: {
          this._err(T.unexpectedNullCharacter), this._createDoctypeToken(P), this.state = o.DOCTYPE_NAME;
          break;
        }
        case c.GREATER_THAN_SIGN: {
          this._err(T.missingDoctypeName), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
          break;
        }
        case c.EOF: {
          this._err(T.eofInDoctype), this._createDoctypeToken(null);
          const u = this.currentToken;
          u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(t)), this.state = o.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this.state = o.AFTER_DOCTYPE_NAME;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.name += P;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.name += String.fromCodePoint(xe(t) ? Ze(t) : t);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(v.PUBLIC, !1) ? this.state = o.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(v.SYSTEM, !1) ? this.state = o.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(T.invalidCharacterSequenceAfterDoctypeName), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case c.QUOTATION_MARK: {
        this._err(T.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        this._err(T.missingWhitespaceAfterDoctypePublicKeyword), u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.QUOTATION_MARK: {
        u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        u.publicId = "", this.state = o.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypePublicIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case c.QUOTATION_MARK: {
        this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.publicId += P;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case c.APOSTROPHE: {
        this.state = o.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.publicId += P;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypePublicIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.publicId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this.state = o.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.QUOTATION_MARK: {
        this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        this._err(T.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.QUOTATION_MARK: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED: {
        this.state = o.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case c.QUOTATION_MARK: {
        this._err(T.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        this._err(T.missingWhitespaceAfterDoctypeSystemKeyword), u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.QUOTATION_MARK: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case c.APOSTROPHE: {
        u.systemId = "", this.state = o.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.missingDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.DATA, this.emitCurrentDoctype(u);
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.missingQuoteBeforeDoctypeSystemIdentifier), u.forceQuirks = !0, this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case c.QUOTATION_MARK: {
        this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.systemId += P;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(t) {
    const u = this.currentToken;
    switch (t) {
      case c.APOSTROPHE: {
        this.state = o.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter), u.systemId += P;
        break;
      }
      case c.GREATER_THAN_SIGN: {
        this._err(T.abruptDoctypeSystemIdentifier), u.forceQuirks = !0, this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        u.systemId += String.fromCodePoint(t);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(t) {
    const u = this.currentToken;
    switch (t) {
      case c.SPACE:
      case c.LINE_FEED:
      case c.TABULATION:
      case c.FORM_FEED:
        break;
      case c.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.EOF: {
        this._err(T.eofInDoctype), u.forceQuirks = !0, this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
      default:
        this._err(T.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = o.BOGUS_DOCTYPE, this._stateBogusDoctype(t);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(t) {
    const u = this.currentToken;
    switch (t) {
      case c.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(u), this.state = o.DATA;
        break;
      }
      case c.NULL: {
        this._err(T.unexpectedNullCharacter);
        break;
      }
      case c.EOF: {
        this.emitCurrentDoctype(u), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(t) {
    switch (t) {
      case c.RIGHT_SQUARE_BRACKET: {
        this.state = o.CDATA_SECTION_BRACKET;
        break;
      }
      case c.EOF: {
        this._err(T.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(t);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(t) {
    t === c.RIGHT_SQUARE_BRACKET ? this.state = o.CDATA_SECTION_END : (this._emitChars("]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(t) {
    switch (t) {
      case c.GREATER_THAN_SIGN: {
        this.state = o.DATA;
        break;
      }
      case c.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = o.CDATA_SECTION, this._stateCdataSection(t);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference() {
    let t = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
    if (t < 0)
      if (this.preprocessor.lastChunkWritten)
        t = this.entityDecoder.end();
      else {
        this.active = !1, this.preprocessor.pos = this.preprocessor.html.length - 1, this.consumedAfterSnapshot = 0, this.preprocessor.endOfChunkHit = !0;
        return;
      }
    t === 0 ? (this.preprocessor.pos = this.entityStartPos, this._flushCodePointConsumedAsCharacterReference(c.AMPERSAND), this.state = !this._isCharacterReferenceInAttribute() && Uu(this.preprocessor.peek(1)) ? o.AMBIGUOUS_AMPERSAND : this.returnState) : this.state = this.returnState;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(t) {
    Uu(t) ? this._flushCodePointConsumedAsCharacterReference(t) : (t === c.SEMICOLON && this._err(T.unknownNamedCharacterReference), this.state = this.returnState, this._callState(t));
  }
}
const Vs = /* @__PURE__ */ new Set([a.DD, a.DT, a.LI, a.OPTGROUP, a.OPTION, a.P, a.RB, a.RP, a.RT, a.RTC]), vu = /* @__PURE__ */ new Set([
  ...Vs,
  a.CAPTION,
  a.COLGROUP,
  a.TBODY,
  a.TD,
  a.TFOOT,
  a.TH,
  a.THEAD,
  a.TR
]), ot = /* @__PURE__ */ new Set([
  a.APPLET,
  a.CAPTION,
  a.HTML,
  a.MARQUEE,
  a.OBJECT,
  a.TABLE,
  a.TD,
  a.TEMPLATE,
  a.TH
]), t0 = /* @__PURE__ */ new Set([...ot, a.OL, a.UL]), u0 = /* @__PURE__ */ new Set([...ot, a.BUTTON]), Yu = /* @__PURE__ */ new Set([a.ANNOTATION_XML, a.MI, a.MN, a.MO, a.MS, a.MTEXT]), qu = /* @__PURE__ */ new Set([a.DESC, a.FOREIGN_OBJECT, a.TITLE]), s0 = /* @__PURE__ */ new Set([a.TR, a.TEMPLATE, a.HTML]), a0 = /* @__PURE__ */ new Set([a.TBODY, a.TFOOT, a.THEAD, a.TEMPLATE, a.HTML]), n0 = /* @__PURE__ */ new Set([a.TABLE, a.TEMPLATE, a.HTML]), r0 = /* @__PURE__ */ new Set([a.TD, a.TH]);
class i0 {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(t, u, s) {
    this.treeAdapter = u, this.handler = s, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = a.UNKNOWN, this.current = t;
  }
  //Index of element
  _indexOf(t) {
    return this.items.lastIndexOf(t, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === a.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === m.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(t, u) {
    this.stackTop++, this.items[this.stackTop] = t, this.current = t, this.tagIDs[this.stackTop] = u, this.currentTagId = u, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(t, u, !0);
  }
  pop() {
    const t = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !0);
  }
  replace(t, u) {
    const s = this._indexOf(t);
    this.items[s] = u, s === this.stackTop && (this.current = u);
  }
  insertAfter(t, u, s) {
    const n = this._indexOf(t) + 1;
    this.items.splice(n, 0, u), this.tagIDs.splice(n, 0, s), this.stackTop++, n === this.stackTop && this._updateCurrentElement(), this.current && this.currentTagId !== void 0 && this.handler.onItemPush(this.current, this.currentTagId, n === this.stackTop);
  }
  popUntilTagNamePopped(t) {
    let u = this.stackTop + 1;
    do
      u = this.tagIDs.lastIndexOf(t, u - 1);
    while (u > 0 && this.treeAdapter.getNamespaceURI(this.items[u]) !== m.HTML);
    this.shortenToLength(Math.max(u, 0));
  }
  shortenToLength(t) {
    for (; this.stackTop >= t; ) {
      const u = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(u, this.stackTop < t);
    }
  }
  popUntilElementPopped(t) {
    const u = this._indexOf(t);
    this.shortenToLength(Math.max(u, 0));
  }
  popUntilPopped(t, u) {
    const s = this._indexOfTagNames(t, u);
    this.shortenToLength(Math.max(s, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(Qt, m.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(r0, m.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(t, u) {
    for (let s = this.stackTop; s >= 0; s--)
      if (t.has(this.tagIDs[s]) && this.treeAdapter.getNamespaceURI(this.items[s]) === u)
        return s;
    return -1;
  }
  clearBackTo(t, u) {
    const s = this._indexOfTagNames(t, u);
    this.shortenToLength(s + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(n0, m.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(a0, m.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(s0, m.HTML);
  }
  remove(t) {
    const u = this._indexOf(t);
    u >= 0 && (u === this.stackTop ? this.pop() : (this.items.splice(u, 1), this.tagIDs.splice(u, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(t, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === a.BODY ? this.items[1] : null;
  }
  contains(t) {
    return this._indexOf(t) > -1;
  }
  getCommonAncestor(t) {
    const u = this._indexOf(t) - 1;
    return u >= 0 ? this.items[u] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === a.HTML;
  }
  //Element in scope
  hasInDynamicScope(t, u) {
    for (let s = this.stackTop; s >= 0; s--) {
      const n = this.tagIDs[s];
      switch (this.treeAdapter.getNamespaceURI(this.items[s])) {
        case m.HTML: {
          if (n === t)
            return !0;
          if (u.has(n))
            return !1;
          break;
        }
        case m.SVG: {
          if (qu.has(n))
            return !1;
          break;
        }
        case m.MATHML: {
          if (Yu.has(n))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInScope(t) {
    return this.hasInDynamicScope(t, ot);
  }
  hasInListItemScope(t) {
    return this.hasInDynamicScope(t, t0);
  }
  hasInButtonScope(t) {
    return this.hasInDynamicScope(t, u0);
  }
  hasNumberedHeaderInScope() {
    for (let t = this.stackTop; t >= 0; t--) {
      const u = this.tagIDs[t];
      switch (this.treeAdapter.getNamespaceURI(this.items[t])) {
        case m.HTML: {
          if (Qt.has(u))
            return !0;
          if (ot.has(u))
            return !1;
          break;
        }
        case m.SVG: {
          if (qu.has(u))
            return !1;
          break;
        }
        case m.MATHML: {
          if (Yu.has(u))
            return !1;
          break;
        }
      }
    }
    return !0;
  }
  hasInTableScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === m.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case a.TABLE:
          case a.HTML:
            return !1;
        }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let t = this.stackTop; t >= 0; t--)
      if (this.treeAdapter.getNamespaceURI(this.items[t]) === m.HTML)
        switch (this.tagIDs[t]) {
          case a.TBODY:
          case a.THEAD:
          case a.TFOOT:
            return !0;
          case a.TABLE:
          case a.HTML:
            return !1;
        }
    return !0;
  }
  hasInSelectScope(t) {
    for (let u = this.stackTop; u >= 0; u--)
      if (this.treeAdapter.getNamespaceURI(this.items[u]) === m.HTML)
        switch (this.tagIDs[u]) {
          case t:
            return !0;
          case a.OPTION:
          case a.OPTGROUP:
            break;
          default:
            return !1;
        }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; this.currentTagId !== void 0 && Vs.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; this.currentTagId !== void 0 && vu.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(t) {
    for (; this.currentTagId !== void 0 && this.currentTagId !== t && vu.has(this.currentTagId); )
      this.pop();
  }
}
const Mt = 3;
var $;
(function(e) {
  e[e.Marker = 0] = "Marker", e[e.Element = 1] = "Element";
})($ || ($ = {}));
const Vu = { type: $.Marker };
class c0 {
  constructor(t) {
    this.treeAdapter = t, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(t, u) {
    const s = [], n = u.length, r = this.treeAdapter.getTagName(t), i = this.treeAdapter.getNamespaceURI(t);
    for (let d = 0; d < this.entries.length; d++) {
      const h = this.entries[d];
      if (h.type === $.Marker)
        break;
      const { element: E } = h;
      if (this.treeAdapter.getTagName(E) === r && this.treeAdapter.getNamespaceURI(E) === i) {
        const b = this.treeAdapter.getAttrList(E);
        b.length === n && s.push({ idx: d, attrs: b });
      }
    }
    return s;
  }
  _ensureNoahArkCondition(t) {
    if (this.entries.length < Mt)
      return;
    const u = this.treeAdapter.getAttrList(t), s = this._getNoahArkConditionCandidates(t, u);
    if (s.length < Mt)
      return;
    const n = new Map(u.map((i) => [i.name, i.value]));
    let r = 0;
    for (let i = 0; i < s.length; i++) {
      const d = s[i];
      d.attrs.every((h) => n.get(h.name) === h.value) && (r += 1, r >= Mt && this.entries.splice(d.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(Vu);
  }
  pushElement(t, u) {
    this._ensureNoahArkCondition(t), this.entries.unshift({
      type: $.Element,
      element: t,
      token: u
    });
  }
  insertElementAfterBookmark(t, u) {
    const s = this.entries.indexOf(this.bookmark);
    this.entries.splice(s, 0, {
      type: $.Element,
      element: t,
      token: u
    });
  }
  removeEntry(t) {
    const u = this.entries.indexOf(t);
    u !== -1 && this.entries.splice(u, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const t = this.entries.indexOf(Vu);
    t === -1 ? this.entries.length = 0 : this.entries.splice(0, t + 1);
  }
  //Search
  getElementEntryInScopeWithTagName(t) {
    const u = this.entries.find((s) => s.type === $.Marker || this.treeAdapter.getTagName(s.element) === t);
    return u && u.type === $.Element ? u : null;
  }
  getElementEntry(t) {
    return this.entries.find((u) => u.type === $.Element && u.element === t);
  }
}
const J = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: V.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(e, t, u) {
    return {
      nodeName: e,
      tagName: e,
      attrs: u,
      namespaceURI: t,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(e) {
    return {
      nodeName: "#comment",
      data: e,
      parentNode: null
    };
  },
  createTextNode(e) {
    return {
      nodeName: "#text",
      value: e,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(e, t) {
    e.childNodes.push(t), t.parentNode = e;
  },
  insertBefore(e, t, u) {
    const s = e.childNodes.indexOf(u);
    e.childNodes.splice(s, 0, t), t.parentNode = e;
  },
  setTemplateContent(e, t) {
    e.content = t;
  },
  getTemplateContent(e) {
    return e.content;
  },
  setDocumentType(e, t, u, s) {
    const n = e.childNodes.find((r) => r.nodeName === "#documentType");
    if (n)
      n.name = t, n.publicId = u, n.systemId = s;
    else {
      const r = {
        nodeName: "#documentType",
        name: t,
        publicId: u,
        systemId: s,
        parentNode: null
      };
      J.appendChild(e, r);
    }
  },
  setDocumentMode(e, t) {
    e.mode = t;
  },
  getDocumentMode(e) {
    return e.mode;
  },
  detachNode(e) {
    if (e.parentNode) {
      const t = e.parentNode.childNodes.indexOf(e);
      e.parentNode.childNodes.splice(t, 1), e.parentNode = null;
    }
  },
  insertText(e, t) {
    if (e.childNodes.length > 0) {
      const u = e.childNodes[e.childNodes.length - 1];
      if (J.isTextNode(u)) {
        u.value += t;
        return;
      }
    }
    J.appendChild(e, J.createTextNode(t));
  },
  insertTextBefore(e, t, u) {
    const s = e.childNodes[e.childNodes.indexOf(u) - 1];
    s && J.isTextNode(s) ? s.value += t : J.insertBefore(e, J.createTextNode(t), u);
  },
  adoptAttributes(e, t) {
    const u = new Set(e.attrs.map((s) => s.name));
    for (let s = 0; s < t.length; s++)
      u.has(t[s].name) || e.attrs.push(t[s]);
  },
  //Tree traversing
  getFirstChild(e) {
    return e.childNodes[0];
  },
  getChildNodes(e) {
    return e.childNodes;
  },
  getParentNode(e) {
    return e.parentNode;
  },
  getAttrList(e) {
    return e.attrs;
  },
  //Node data
  getTagName(e) {
    return e.tagName;
  },
  getNamespaceURI(e) {
    return e.namespaceURI;
  },
  getTextNodeContent(e) {
    return e.value;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    return e.name;
  },
  getDocumentTypeNodePublicId(e) {
    return e.publicId;
  },
  getDocumentTypeNodeSystemId(e) {
    return e.systemId;
  },
  //Node types
  isTextNode(e) {
    return e.nodeName === "#text";
  },
  isCommentNode(e) {
    return e.nodeName === "#comment";
  },
  isDocumentTypeNode(e) {
    return e.nodeName === "#documentType";
  },
  isElementNode(e) {
    return Object.prototype.hasOwnProperty.call(e, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    e.sourceCodeLocation = { ...e.sourceCodeLocation, ...t };
  }
}, Gs = "html", o0 = "about:legacy-compat", l0 = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", Qs = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], d0 = [
  ...Qs,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], h0 = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), Ws = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], f0 = [
  ...Ws,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Gu(e, t) {
  return t.some((u) => e.startsWith(u));
}
function E0(e) {
  return e.name === Gs && e.publicId === null && (e.systemId === null || e.systemId === o0);
}
function T0(e) {
  if (e.name !== Gs)
    return V.QUIRKS;
  const { systemId: t } = e;
  if (t && t.toLowerCase() === l0)
    return V.QUIRKS;
  let { publicId: u } = e;
  if (u !== null) {
    if (u = u.toLowerCase(), h0.has(u))
      return V.QUIRKS;
    let s = t === null ? d0 : Qs;
    if (Gu(u, s))
      return V.QUIRKS;
    if (s = t === null ? Ws : f0, Gu(u, s))
      return V.LIMITED_QUIRKS;
  }
  return V.NO_QUIRKS;
}
const Qu = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, m0 = "definitionurl", b0 = "definitionURL", _0 = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((e) => [e.toLowerCase(), e])), A0 = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: m.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: m.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: m.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: m.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: m.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: m.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: m.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: m.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: m.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: m.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: m.XMLNS }]
]), g0 = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((e) => [e.toLowerCase(), e])), p0 = /* @__PURE__ */ new Set([
  a.B,
  a.BIG,
  a.BLOCKQUOTE,
  a.BODY,
  a.BR,
  a.CENTER,
  a.CODE,
  a.DD,
  a.DIV,
  a.DL,
  a.DT,
  a.EM,
  a.EMBED,
  a.H1,
  a.H2,
  a.H3,
  a.H4,
  a.H5,
  a.H6,
  a.HEAD,
  a.HR,
  a.I,
  a.IMG,
  a.LI,
  a.LISTING,
  a.MENU,
  a.META,
  a.NOBR,
  a.OL,
  a.P,
  a.PRE,
  a.RUBY,
  a.S,
  a.SMALL,
  a.SPAN,
  a.STRONG,
  a.STRIKE,
  a.SUB,
  a.SUP,
  a.TABLE,
  a.TT,
  a.U,
  a.UL,
  a.VAR
]);
function N0(e) {
  const t = e.tagID;
  return t === a.FONT && e.attrs.some(({ name: s }) => s === le.COLOR || s === le.SIZE || s === le.FACE) || p0.has(t);
}
function js(e) {
  for (let t = 0; t < e.attrs.length; t++)
    if (e.attrs[t].name === m0) {
      e.attrs[t].name = b0;
      break;
    }
}
function Xs(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = _0.get(e.attrs[t].name);
    u != null && (e.attrs[t].name = u);
  }
}
function fu(e) {
  for (let t = 0; t < e.attrs.length; t++) {
    const u = A0.get(e.attrs[t].name);
    u && (e.attrs[t].prefix = u.prefix, e.attrs[t].name = u.name, e.attrs[t].namespace = u.namespace);
  }
}
function I0(e) {
  const t = g0.get(e.tagName);
  t != null && (e.tagName = t, e.tagID = _t(e.tagName));
}
function C0(e, t) {
  return t === m.MATHML && (e === a.MI || e === a.MO || e === a.MN || e === a.MS || e === a.MTEXT);
}
function S0(e, t, u) {
  if (t === m.MATHML && e === a.ANNOTATION_XML) {
    for (let s = 0; s < u.length; s++)
      if (u[s].name === le.ENCODING) {
        const n = u[s].value.toLowerCase();
        return n === Qu.TEXT_HTML || n === Qu.APPLICATION_XML;
      }
  }
  return t === m.SVG && (e === a.FOREIGN_OBJECT || e === a.DESC || e === a.TITLE);
}
function O0(e, t, u, s) {
  return (!s || s === m.HTML) && S0(e, t, u) || (!s || s === m.MATHML) && C0(e, t);
}
const L0 = "hidden", D0 = 8, R0 = 3;
var l;
(function(e) {
  e[e.INITIAL = 0] = "INITIAL", e[e.BEFORE_HTML = 1] = "BEFORE_HTML", e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD", e[e.IN_HEAD = 3] = "IN_HEAD", e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", e[e.AFTER_HEAD = 5] = "AFTER_HEAD", e[e.IN_BODY = 6] = "IN_BODY", e[e.TEXT = 7] = "TEXT", e[e.IN_TABLE = 8] = "IN_TABLE", e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", e[e.IN_CAPTION = 10] = "IN_CAPTION", e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", e[e.IN_ROW = 13] = "IN_ROW", e[e.IN_CELL = 14] = "IN_CELL", e[e.IN_SELECT = 15] = "IN_SELECT", e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE", e[e.AFTER_BODY = 18] = "AFTER_BODY", e[e.IN_FRAMESET = 19] = "IN_FRAMESET", e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(l || (l = {}));
const x0 = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, $s = /* @__PURE__ */ new Set([a.TABLE, a.TBODY, a.TFOOT, a.THEAD, a.TR]), Wu = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: J,
  onParseError: null
};
class Ks {
  constructor(t, u, s = null, n = null) {
    this.fragmentContext = s, this.scriptHandler = n, this.currentToken = null, this.stopped = !1, this.insertionMode = l.INITIAL, this.originalInsertionMode = l.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...Wu,
      ...t
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = u ?? this.treeAdapter.createDocument(), this.tokenizer = new e0(this.options, this), this.activeFormattingElements = new c0(this.treeAdapter), this.fragmentContextID = s ? _t(this.treeAdapter.getTagName(s)) : a.UNKNOWN, this._setContextModes(s ?? this.document, this.fragmentContextID), this.openElements = new i0(this.document, this.treeAdapter, this);
  }
  // API
  static parse(t, u) {
    const s = new this(u);
    return s.tokenizer.write(t, !0), s.document;
  }
  static getFragmentParser(t, u) {
    const s = {
      ...Wu,
      ...u
    };
    t ?? (t = s.treeAdapter.createElement(f.TEMPLATE, m.HTML, []));
    const n = s.treeAdapter.createElement("documentmock", m.HTML, []), r = new this(s, n, t);
    return r.fragmentContextID === a.TEMPLATE && r.tmplInsertionModeStack.unshift(l.IN_TEMPLATE), r._initTokenizerForFragmentParsing(), r._insertFakeRootElement(), r._resetInsertionMode(), r._findFormInFragmentContext(), r;
  }
  getFragment() {
    const t = this.treeAdapter.getFirstChild(this.document), u = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(t, u), u;
  }
  //Errors
  /** @internal */
  _err(t, u, s) {
    var n;
    if (!this.onParseError)
      return;
    const r = (n = t.location) !== null && n !== void 0 ? n : x0, i = {
      code: u,
      startLine: r.startLine,
      startCol: r.startCol,
      startOffset: r.startOffset,
      endLine: s ? r.startLine : r.endLine,
      endCol: s ? r.startCol : r.endCol,
      endOffset: s ? r.startOffset : r.endOffset
    };
    this.onParseError(i);
  }
  //Stack events
  /** @internal */
  onItemPush(t, u, s) {
    var n, r;
    (r = (n = this.treeAdapter).onItemPush) === null || r === void 0 || r.call(n, t), s && this.openElements.stackTop > 0 && this._setContextModes(t, u);
  }
  /** @internal */
  onItemPop(t, u) {
    var s, n;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(t, this.currentToken), (n = (s = this.treeAdapter).onItemPop) === null || n === void 0 || n.call(s, t, this.openElements.current), u) {
      let r, i;
      this.openElements.stackTop === 0 && this.fragmentContext ? (r = this.fragmentContext, i = this.fragmentContextID) : { current: r, currentTagId: i } = this.openElements, this._setContextModes(r, i);
    }
  }
  _setContextModes(t, u) {
    const s = t === this.document || t && this.treeAdapter.getNamespaceURI(t) === m.HTML;
    this.currentNotInHTML = !s, this.tokenizer.inForeignNode = !s && t !== void 0 && u !== void 0 && !this._isIntegrationPoint(u, t);
  }
  /** @protected */
  _switchToTextParsing(t, u) {
    this._insertElement(t, m.HTML), this.tokenizer.state = u, this.originalInsertionMode = this.insertionMode, this.insertionMode = l.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = l.TEXT, this.originalInsertionMode = l.IN_BODY, this.tokenizer.state = q.PLAINTEXT;
  }
  //Fragment parsing
  /** @protected */
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  /** @protected */
  _findFormInFragmentContext() {
    let t = this.fragmentContext;
    for (; t; ) {
      if (this.treeAdapter.getTagName(t) === f.FORM) {
        this.formElement = t;
        break;
      }
      t = this.treeAdapter.getParentNode(t);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== m.HTML))
      switch (this.fragmentContextID) {
        case a.TITLE:
        case a.TEXTAREA: {
          this.tokenizer.state = q.RCDATA;
          break;
        }
        case a.STYLE:
        case a.XMP:
        case a.IFRAME:
        case a.NOEMBED:
        case a.NOFRAMES:
        case a.NOSCRIPT: {
          this.tokenizer.state = q.RAWTEXT;
          break;
        }
        case a.SCRIPT: {
          this.tokenizer.state = q.SCRIPT_DATA;
          break;
        }
        case a.PLAINTEXT: {
          this.tokenizer.state = q.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(t) {
    const u = t.name || "", s = t.publicId || "", n = t.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, u, s, n), t.location) {
      const i = this.treeAdapter.getChildNodes(this.document).find((d) => this.treeAdapter.isDocumentTypeNode(d));
      i && this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
    }
  }
  /** @protected */
  _attachElementToTree(t, u) {
    if (this.options.sourceCodeLocationInfo) {
      const s = u && {
        ...u,
        startTag: u
      };
      this.treeAdapter.setNodeSourceCodeLocation(t, s);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(t);
    else {
      const s = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(s ?? this.document, t);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(t, u) {
    const s = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(s, t.location);
  }
  /** @protected */
  _insertElement(t, u) {
    const s = this.treeAdapter.createElement(t.tagName, u, t.attrs);
    this._attachElementToTree(s, t.location), this.openElements.push(s, t.tagID);
  }
  /** @protected */
  _insertFakeElement(t, u) {
    const s = this.treeAdapter.createElement(t, m.HTML, []);
    this._attachElementToTree(s, null), this.openElements.push(s, u);
  }
  /** @protected */
  _insertTemplate(t) {
    const u = this.treeAdapter.createElement(t.tagName, m.HTML, t.attrs), s = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(u, s), this._attachElementToTree(u, t.location), this.openElements.push(u, t.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const t = this.treeAdapter.createElement(f.HTML, m.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(t, null), this.treeAdapter.appendChild(this.openElements.current, t), this.openElements.push(t, a.HTML);
  }
  /** @protected */
  _appendCommentNode(t, u) {
    const s = this.treeAdapter.createCommentNode(t.data);
    this.treeAdapter.appendChild(u, s), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, t.location);
  }
  /** @protected */
  _insertCharacters(t) {
    let u, s;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: u, beforeElement: s } = this._findFosterParentingLocation(), s ? this.treeAdapter.insertTextBefore(u, t.chars, s) : this.treeAdapter.insertText(u, t.chars)) : (u = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(u, t.chars)), !t.location)
      return;
    const n = this.treeAdapter.getChildNodes(u), r = s ? n.lastIndexOf(s) : n.length, i = n[r - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(i)) {
      const { endLine: h, endCol: E, endOffset: b } = t.location;
      this.treeAdapter.updateNodeSourceCodeLocation(i, { endLine: h, endCol: E, endOffset: b });
    } else this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(i, t.location);
  }
  /** @protected */
  _adoptNodes(t, u) {
    for (let s = this.treeAdapter.getFirstChild(t); s; s = this.treeAdapter.getFirstChild(t))
      this.treeAdapter.detachNode(s), this.treeAdapter.appendChild(u, s);
  }
  /** @protected */
  _setEndLocation(t, u) {
    if (this.treeAdapter.getNodeSourceCodeLocation(t) && u.location) {
      const s = u.location, n = this.treeAdapter.getTagName(t), r = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        u.type === D.END_TAG && n === u.tagName ? {
          endTag: { ...s },
          endLine: s.endLine,
          endCol: s.endCol,
          endOffset: s.endOffset
        } : {
          endLine: s.startLine,
          endCol: s.startCol,
          endOffset: s.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(t, r);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(t) {
    if (!this.currentNotInHTML)
      return !1;
    let u, s;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, s = this.fragmentContextID) : { current: u, currentTagId: s } = this.openElements, t.tagID === a.SVG && this.treeAdapter.getTagName(u) === f.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(u) === m.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (t.tagID === a.MGLYPH || t.tagID === a.MALIGNMARK) && s !== void 0 && !this._isIntegrationPoint(s, u, m.HTML)
    );
  }
  /** @protected */
  _processToken(t) {
    switch (t.type) {
      case D.CHARACTER: {
        this.onCharacter(t);
        break;
      }
      case D.NULL_CHARACTER: {
        this.onNullCharacter(t);
        break;
      }
      case D.COMMENT: {
        this.onComment(t);
        break;
      }
      case D.DOCTYPE: {
        this.onDoctype(t);
        break;
      }
      case D.START_TAG: {
        this._processStartTag(t);
        break;
      }
      case D.END_TAG: {
        this.onEndTag(t);
        break;
      }
      case D.EOF: {
        this.onEof(t);
        break;
      }
      case D.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(t);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(t, u, s) {
    const n = this.treeAdapter.getNamespaceURI(u), r = this.treeAdapter.getAttrList(u);
    return O0(t, n, r, s);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const t = this.activeFormattingElements.entries.length;
    if (t) {
      const u = this.activeFormattingElements.entries.findIndex((n) => n.type === $.Marker || this.openElements.contains(n.element)), s = u === -1 ? t - 1 : u - 1;
      for (let n = s; n >= 0; n--) {
        const r = this.activeFormattingElements.entries[n];
        this._insertElement(r.token, this.treeAdapter.getNamespaceURI(r.element)), r.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = l.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(a.P), this.openElements.popUntilTagNamePopped(a.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let t = this.openElements.stackTop; t >= 0; t--)
      switch (t === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[t]) {
        case a.TR: {
          this.insertionMode = l.IN_ROW;
          return;
        }
        case a.TBODY:
        case a.THEAD:
        case a.TFOOT: {
          this.insertionMode = l.IN_TABLE_BODY;
          return;
        }
        case a.CAPTION: {
          this.insertionMode = l.IN_CAPTION;
          return;
        }
        case a.COLGROUP: {
          this.insertionMode = l.IN_COLUMN_GROUP;
          return;
        }
        case a.TABLE: {
          this.insertionMode = l.IN_TABLE;
          return;
        }
        case a.BODY: {
          this.insertionMode = l.IN_BODY;
          return;
        }
        case a.FRAMESET: {
          this.insertionMode = l.IN_FRAMESET;
          return;
        }
        case a.SELECT: {
          this._resetInsertionModeForSelect(t);
          return;
        }
        case a.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case a.HTML: {
          this.insertionMode = this.headElement ? l.AFTER_HEAD : l.BEFORE_HEAD;
          return;
        }
        case a.TD:
        case a.TH: {
          if (t > 0) {
            this.insertionMode = l.IN_CELL;
            return;
          }
          break;
        }
        case a.HEAD: {
          if (t > 0) {
            this.insertionMode = l.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = l.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(t) {
    if (t > 0)
      for (let u = t - 1; u > 0; u--) {
        const s = this.openElements.tagIDs[u];
        if (s === a.TEMPLATE)
          break;
        if (s === a.TABLE) {
          this.insertionMode = l.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = l.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(t) {
    return $s.has(t);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let t = this.openElements.stackTop; t >= 0; t--) {
      const u = this.openElements.items[t];
      switch (this.openElements.tagIDs[t]) {
        case a.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(u) === m.HTML)
            return { parent: this.treeAdapter.getTemplateContent(u), beforeElement: null };
          break;
        }
        case a.TABLE: {
          const s = this.treeAdapter.getParentNode(u);
          return s ? { parent: s, beforeElement: u } : { parent: this.openElements.items[t - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(t) {
    const u = this._findFosterParentingLocation();
    u.beforeElement ? this.treeAdapter.insertBefore(u.parent, t, u.beforeElement) : this.treeAdapter.appendChild(u.parent, t);
  }
  //Special elements
  /** @protected */
  _isSpecialElement(t, u) {
    const s = this.treeAdapter.getNamespaceURI(t);
    return Xi[s].has(u);
  }
  /** @internal */
  onCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      ro(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        ye(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Me(this, t);
        break;
      }
      case l.IN_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Be(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        we(this, t);
        break;
      }
      case l.IN_BODY:
      case l.IN_CAPTION:
      case l.IN_CELL:
      case l.IN_TEMPLATE: {
        Zs(this, t);
        break;
      }
      case l.TEXT:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        kt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        aa(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        lt(this, t);
        break;
      }
      case l.AFTER_BODY: {
        dt(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        et(this, t);
        break;
      }
    }
  }
  /** @internal */
  onNullCharacter(t) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      no(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        ye(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Me(this, t);
        break;
      }
      case l.IN_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Be(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        we(this, t);
        break;
      }
      case l.TEXT: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        kt(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        lt(this, t);
        break;
      }
      case l.AFTER_BODY: {
        dt(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        et(this, t);
        break;
      }
    }
  }
  /** @internal */
  onComment(t) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Wt(this, t);
      return;
    }
    switch (this.insertionMode) {
      case l.INITIAL:
      case l.BEFORE_HTML:
      case l.BEFORE_HEAD:
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD:
      case l.IN_BODY:
      case l.IN_TABLE:
      case l.IN_CAPTION:
      case l.IN_COLUMN_GROUP:
      case l.IN_TABLE_BODY:
      case l.IN_ROW:
      case l.IN_CELL:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE:
      case l.IN_TEMPLATE:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET: {
        Wt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Re(this, t);
        break;
      }
      case l.AFTER_BODY: {
        F0(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        U0(this, t);
        break;
      }
    }
  }
  /** @internal */
  onDoctype(t) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case l.INITIAL: {
        H0(this, t);
        break;
      }
      case l.BEFORE_HEAD:
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD: {
        this._err(t, T.misplacedDoctype);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Re(this, t);
        break;
      }
    }
  }
  /** @internal */
  onStartTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this._processStartTag(t), t.selfClosing && !t.ackSelfClosing && this._err(t, T.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   * @protected
   */
  _processStartTag(t) {
    this.shouldProcessStartTagTokenInForeignContent(t) ? io(this, t) : this._startTagOutsideForeignContent(t);
  }
  /** @protected */
  _startTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        v0(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        q0(this, t);
        break;
      }
      case l.IN_HEAD: {
        X(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Q0(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        j0(this, t);
        break;
      }
      case l.IN_BODY: {
        H(this, t);
        break;
      }
      case l.IN_TABLE: {
        ge(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Re(this, t);
        break;
      }
      case l.IN_CAPTION: {
        Vc(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        mu(this, t);
        break;
      }
      case l.IN_TABLE_BODY: {
        pt(this, t);
        break;
      }
      case l.IN_ROW: {
        Nt(this, t);
        break;
      }
      case l.IN_CELL: {
        Wc(this, t);
        break;
      }
      case l.IN_SELECT: {
        ia(this, t);
        break;
      }
      case l.IN_SELECT_IN_TABLE: {
        Xc(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        Kc(this, t);
        break;
      }
      case l.AFTER_BODY: {
        Zc(this, t);
        break;
      }
      case l.IN_FRAMESET: {
        Jc(this, t);
        break;
      }
      case l.AFTER_FRAMESET: {
        to(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        so(this, t);
        break;
      }
      case l.AFTER_AFTER_FRAMESET: {
        ao(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEndTag(t) {
    this.skipNextNewLine = !1, this.currentToken = t, this.currentNotInHTML ? co(this, t) : this._endTagOutsideForeignContent(t);
  }
  /** @protected */
  _endTagOutsideForeignContent(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        Y0(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        V0(this, t);
        break;
      }
      case l.IN_HEAD: {
        G0(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        W0(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        X0(this, t);
        break;
      }
      case l.IN_BODY: {
        gt(this, t);
        break;
      }
      case l.TEXT: {
        Mc(this, t);
        break;
      }
      case l.IN_TABLE: {
        qe(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Re(this, t);
        break;
      }
      case l.IN_CAPTION: {
        Gc(this, t);
        break;
      }
      case l.IN_COLUMN_GROUP: {
        Qc(this, t);
        break;
      }
      case l.IN_TABLE_BODY: {
        jt(this, t);
        break;
      }
      case l.IN_ROW: {
        ra(this, t);
        break;
      }
      case l.IN_CELL: {
        jc(this, t);
        break;
      }
      case l.IN_SELECT: {
        ca(this, t);
        break;
      }
      case l.IN_SELECT_IN_TABLE: {
        $c(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        zc(this, t);
        break;
      }
      case l.AFTER_BODY: {
        la(this, t);
        break;
      }
      case l.IN_FRAMESET: {
        eo(this, t);
        break;
      }
      case l.AFTER_FRAMESET: {
        uo(this, t);
        break;
      }
      case l.AFTER_AFTER_BODY: {
        et(this, t);
        break;
      }
    }
  }
  /** @internal */
  onEof(t) {
    switch (this.insertionMode) {
      case l.INITIAL: {
        De(this, t);
        break;
      }
      case l.BEFORE_HTML: {
        ye(this, t);
        break;
      }
      case l.BEFORE_HEAD: {
        Me(this, t);
        break;
      }
      case l.IN_HEAD: {
        ke(this, t);
        break;
      }
      case l.IN_HEAD_NO_SCRIPT: {
        Be(this, t);
        break;
      }
      case l.AFTER_HEAD: {
        we(this, t);
        break;
      }
      case l.IN_BODY:
      case l.IN_TABLE:
      case l.IN_CAPTION:
      case l.IN_COLUMN_GROUP:
      case l.IN_TABLE_BODY:
      case l.IN_ROW:
      case l.IN_CELL:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE: {
        ua(this, t);
        break;
      }
      case l.TEXT: {
        kc(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        Re(this, t);
        break;
      }
      case l.IN_TEMPLATE: {
        oa(this, t);
        break;
      }
      case l.AFTER_BODY:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET:
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        Tu(this, t);
        break;
      }
    }
  }
  /** @internal */
  onWhitespaceCharacter(t) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, t.chars.charCodeAt(0) === c.LINE_FEED)) {
      if (t.chars.length === 1)
        return;
      t.chars = t.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(t);
      return;
    }
    switch (this.insertionMode) {
      case l.IN_HEAD:
      case l.IN_HEAD_NO_SCRIPT:
      case l.AFTER_HEAD:
      case l.TEXT:
      case l.IN_COLUMN_GROUP:
      case l.IN_SELECT:
      case l.IN_SELECT_IN_TABLE:
      case l.IN_FRAMESET:
      case l.AFTER_FRAMESET: {
        this._insertCharacters(t);
        break;
      }
      case l.IN_BODY:
      case l.IN_CAPTION:
      case l.IN_CELL:
      case l.IN_TEMPLATE:
      case l.AFTER_BODY:
      case l.AFTER_AFTER_BODY:
      case l.AFTER_AFTER_FRAMESET: {
        zs(this, t);
        break;
      }
      case l.IN_TABLE:
      case l.IN_TABLE_BODY:
      case l.IN_ROW: {
        kt(this, t);
        break;
      }
      case l.IN_TABLE_TEXT: {
        sa(this, t);
        break;
      }
    }
  }
}
function P0(e, t) {
  let u = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
  return u ? e.openElements.contains(u.element) ? e.openElements.hasInScope(t.tagID) || (u = null) : (e.activeFormattingElements.removeEntry(u), u = null) : ta(e, t), u;
}
function y0(e, t) {
  let u = null, s = e.openElements.stackTop;
  for (; s >= 0; s--) {
    const n = e.openElements.items[s];
    if (n === t.element)
      break;
    e._isSpecialElement(n, e.openElements.tagIDs[s]) && (u = n);
  }
  return u || (e.openElements.shortenToLength(Math.max(s, 0)), e.activeFormattingElements.removeEntry(t)), u;
}
function M0(e, t, u) {
  let s = t, n = e.openElements.getCommonAncestor(t);
  for (let r = 0, i = n; i !== u; r++, i = n) {
    n = e.openElements.getCommonAncestor(i);
    const d = e.activeFormattingElements.getElementEntry(i), h = d && r >= R0;
    !d || h ? (h && e.activeFormattingElements.removeEntry(d), e.openElements.remove(i)) : (i = k0(e, d), s === t && (e.activeFormattingElements.bookmark = d), e.treeAdapter.detachNode(s), e.treeAdapter.appendChild(i, s), s = i);
  }
  return s;
}
function k0(e, t) {
  const u = e.treeAdapter.getNamespaceURI(t.element), s = e.treeAdapter.createElement(t.token.tagName, u, t.token.attrs);
  return e.openElements.replace(t.element, s), t.element = s, s;
}
function B0(e, t, u) {
  const s = e.treeAdapter.getTagName(t), n = _t(s);
  if (e._isElementCausesFosterParenting(n))
    e._fosterParentElement(u);
  else {
    const r = e.treeAdapter.getNamespaceURI(t);
    n === a.TEMPLATE && r === m.HTML && (t = e.treeAdapter.getTemplateContent(t)), e.treeAdapter.appendChild(t, u);
  }
}
function w0(e, t, u) {
  const s = e.treeAdapter.getNamespaceURI(u.element), { token: n } = u, r = e.treeAdapter.createElement(n.tagName, s, n.attrs);
  e._adoptNodes(t, r), e.treeAdapter.appendChild(t, r), e.activeFormattingElements.insertElementAfterBookmark(r, n), e.activeFormattingElements.removeEntry(u), e.openElements.remove(u.element), e.openElements.insertAfter(t, r, n.tagID);
}
function Eu(e, t) {
  for (let u = 0; u < D0; u++) {
    const s = P0(e, t);
    if (!s)
      break;
    const n = y0(e, s);
    if (!n)
      break;
    e.activeFormattingElements.bookmark = s;
    const r = M0(e, n, s.element), i = e.openElements.getCommonAncestor(s.element);
    e.treeAdapter.detachNode(r), i && B0(e, i, r), w0(e, n, s);
  }
}
function Wt(e, t) {
  e._appendCommentNode(t, e.openElements.currentTmplContentOrNode);
}
function F0(e, t) {
  e._appendCommentNode(t, e.openElements.items[0]);
}
function U0(e, t) {
  e._appendCommentNode(t, e.document);
}
function Tu(e, t) {
  if (e.stopped = !0, t.location) {
    const u = e.fragmentContext ? 0 : 2;
    for (let s = e.openElements.stackTop; s >= u; s--)
      e._setEndLocation(e.openElements.items[s], t);
    if (!e.fragmentContext && e.openElements.stackTop >= 0) {
      const s = e.openElements.items[0], n = e.treeAdapter.getNodeSourceCodeLocation(s);
      if (n && !n.endTag && (e._setEndLocation(s, t), e.openElements.stackTop >= 1)) {
        const r = e.openElements.items[1], i = e.treeAdapter.getNodeSourceCodeLocation(r);
        i && !i.endTag && e._setEndLocation(r, t);
      }
    }
  }
}
function H0(e, t) {
  e._setDocumentType(t);
  const u = t.forceQuirks ? V.QUIRKS : T0(t);
  E0(t) || e._err(t, T.nonConformingDoctype), e.treeAdapter.setDocumentMode(e.document, u), e.insertionMode = l.BEFORE_HTML;
}
function De(e, t) {
  e._err(t, T.missingDoctype, !0), e.treeAdapter.setDocumentMode(e.document, V.QUIRKS), e.insertionMode = l.BEFORE_HTML, e._processToken(t);
}
function v0(e, t) {
  t.tagID === a.HTML ? (e._insertElement(t, m.HTML), e.insertionMode = l.BEFORE_HEAD) : ye(e, t);
}
function Y0(e, t) {
  const u = t.tagID;
  (u === a.HTML || u === a.HEAD || u === a.BODY || u === a.BR) && ye(e, t);
}
function ye(e, t) {
  e._insertFakeRootElement(), e.insertionMode = l.BEFORE_HEAD, e._processToken(t);
}
function q0(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.HEAD: {
      e._insertElement(t, m.HTML), e.headElement = e.openElements.current, e.insertionMode = l.IN_HEAD;
      break;
    }
    default:
      Me(e, t);
  }
}
function V0(e, t) {
  const u = t.tagID;
  u === a.HEAD || u === a.BODY || u === a.HTML || u === a.BR ? Me(e, t) : e._err(t, T.endTagWithoutMatchingOpenElement);
}
function Me(e, t) {
  e._insertFakeElement(f.HEAD, a.HEAD), e.headElement = e.openElements.current, e.insertionMode = l.IN_HEAD, e._processToken(t);
}
function X(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META: {
      e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TITLE: {
      e._switchToTextParsing(t, q.RCDATA);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? e._switchToTextParsing(t, q.RAWTEXT) : (e._insertElement(t, m.HTML), e.insertionMode = l.IN_HEAD_NO_SCRIPT);
      break;
    }
    case a.NOFRAMES:
    case a.STYLE: {
      e._switchToTextParsing(t, q.RAWTEXT);
      break;
    }
    case a.SCRIPT: {
      e._switchToTextParsing(t, q.SCRIPT_DATA);
      break;
    }
    case a.TEMPLATE: {
      e._insertTemplate(t), e.activeFormattingElements.insertMarker(), e.framesetOk = !1, e.insertionMode = l.IN_TEMPLATE, e.tmplInsertionModeStack.unshift(l.IN_TEMPLATE);
      break;
    }
    case a.HEAD: {
      e._err(t, T.misplacedStartTagForHeadElement);
      break;
    }
    default:
      ke(e, t);
  }
}
function G0(e, t) {
  switch (t.tagID) {
    case a.HEAD: {
      e.openElements.pop(), e.insertionMode = l.AFTER_HEAD;
      break;
    }
    case a.BODY:
    case a.BR:
    case a.HTML: {
      ke(e, t);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    default:
      e._err(t, T.endTagWithoutMatchingOpenElement);
  }
}
function Ee(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(), e.openElements.currentTagId !== a.TEMPLATE && e._err(t, T.closingOfElementWithOpenChildElements), e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode()) : e._err(t, T.endTagWithoutMatchingOpenElement);
}
function ke(e, t) {
  e.openElements.pop(), e.insertionMode = l.AFTER_HEAD, e._processToken(t);
}
function Q0(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.BASEFONT:
    case a.BGSOUND:
    case a.HEAD:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.STYLE: {
      X(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e._err(t, T.nestedNoscriptInHead);
      break;
    }
    default:
      Be(e, t);
  }
}
function W0(e, t) {
  switch (t.tagID) {
    case a.NOSCRIPT: {
      e.openElements.pop(), e.insertionMode = l.IN_HEAD;
      break;
    }
    case a.BR: {
      Be(e, t);
      break;
    }
    default:
      e._err(t, T.endTagWithoutMatchingOpenElement);
  }
}
function Be(e, t) {
  const u = t.type === D.EOF ? T.openElementsLeftAfterEof : T.disallowedContentInNoscriptInHead;
  e._err(t, u), e.openElements.pop(), e.insertionMode = l.IN_HEAD, e._processToken(t);
}
function j0(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.BODY: {
      e._insertElement(t, m.HTML), e.framesetOk = !1, e.insertionMode = l.IN_BODY;
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, m.HTML), e.insertionMode = l.IN_FRAMESET;
      break;
    }
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      e._err(t, T.abandonedHeadElementChild), e.openElements.push(e.headElement, a.HEAD), X(e, t), e.openElements.remove(e.headElement);
      break;
    }
    case a.HEAD: {
      e._err(t, T.misplacedStartTagForHeadElement);
      break;
    }
    default:
      we(e, t);
  }
}
function X0(e, t) {
  switch (t.tagID) {
    case a.BODY:
    case a.HTML:
    case a.BR: {
      we(e, t);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    default:
      e._err(t, T.endTagWithoutMatchingOpenElement);
  }
}
function we(e, t) {
  e._insertFakeElement(f.BODY, a.BODY), e.insertionMode = l.IN_BODY, At(e, t);
}
function At(e, t) {
  switch (t.type) {
    case D.CHARACTER: {
      Zs(e, t);
      break;
    }
    case D.WHITESPACE_CHARACTER: {
      zs(e, t);
      break;
    }
    case D.COMMENT: {
      Wt(e, t);
      break;
    }
    case D.START_TAG: {
      H(e, t);
      break;
    }
    case D.END_TAG: {
      gt(e, t);
      break;
    }
    case D.EOF: {
      ua(e, t);
      break;
    }
  }
}
function zs(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t);
}
function Zs(e, t) {
  e._reconstructActiveFormattingElements(), e._insertCharacters(t), e.framesetOk = !1;
}
function $0(e, t) {
  e.openElements.tmplCount === 0 && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
}
function K0(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  u && e.openElements.tmplCount === 0 && (e.framesetOk = !1, e.treeAdapter.adoptAttributes(u, t.attrs));
}
function z0(e, t) {
  const u = e.openElements.tryPeekProperlyNestedBodyElement();
  e.framesetOk && u && (e.treeAdapter.detachNode(u), e.openElements.popAllUpToHtmlElement(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_FRAMESET);
}
function Z0(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML);
}
function J0(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e.openElements.currentTagId !== void 0 && Qt.has(e.openElements.currentTagId) && e.openElements.pop(), e._insertElement(t, m.HTML);
}
function ec(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), e.skipNextNewLine = !0, e.framesetOk = !1;
}
function tc(e, t) {
  const u = e.openElements.tmplCount > 0;
  (!e.formElement || u) && (e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), u || (e.formElement = e.openElements.current));
}
function uc(e, t) {
  e.framesetOk = !1;
  const u = t.tagID;
  for (let s = e.openElements.stackTop; s >= 0; s--) {
    const n = e.openElements.tagIDs[s];
    if (u === a.LI && n === a.LI || (u === a.DD || u === a.DT) && (n === a.DD || n === a.DT)) {
      e.openElements.generateImpliedEndTagsWithExclusion(n), e.openElements.popUntilTagNamePopped(n);
      break;
    }
    if (n !== a.ADDRESS && n !== a.DIV && n !== a.P && e._isSpecialElement(e.openElements.items[s], n))
      break;
  }
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML);
}
function sc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), e.tokenizer.state = q.PLAINTEXT;
}
function ac(e, t) {
  e.openElements.hasInScope(a.BUTTON) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.BUTTON)), e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.framesetOk = !1;
}
function nc(e, t) {
  const u = e.activeFormattingElements.getElementEntryInScopeWithTagName(f.A);
  u && (Eu(e, t), e.openElements.remove(u.element), e.activeFormattingElements.removeEntry(u)), e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function rc(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function ic(e, t) {
  e._reconstructActiveFormattingElements(), e.openElements.hasInScope(a.NOBR) && (Eu(e, t), e._reconstructActiveFormattingElements()), e._insertElement(t, m.HTML), e.activeFormattingElements.pushElement(e.openElements.current, t);
}
function cc(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.activeFormattingElements.insertMarker(), e.framesetOk = !1;
}
function oc(e, t) {
  e.treeAdapter.getDocumentMode(e.document) !== V.QUIRKS && e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._insertElement(t, m.HTML), e.framesetOk = !1, e.insertionMode = l.IN_TABLE;
}
function Js(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, m.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function ea(e) {
  const t = Ys(e, le.TYPE);
  return t != null && t.toLowerCase() === L0;
}
function lc(e, t) {
  e._reconstructActiveFormattingElements(), e._appendElement(t, m.HTML), ea(t) || (e.framesetOk = !1), t.ackSelfClosing = !0;
}
function dc(e, t) {
  e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
}
function hc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._appendElement(t, m.HTML), e.framesetOk = !1, t.ackSelfClosing = !0;
}
function fc(e, t) {
  t.tagName = f.IMG, t.tagID = a.IMG, Js(e, t);
}
function Ec(e, t) {
  e._insertElement(t, m.HTML), e.skipNextNewLine = !0, e.tokenizer.state = q.RCDATA, e.originalInsertionMode = e.insertionMode, e.framesetOk = !1, e.insertionMode = l.TEXT;
}
function Tc(e, t) {
  e.openElements.hasInButtonScope(a.P) && e._closePElement(), e._reconstructActiveFormattingElements(), e.framesetOk = !1, e._switchToTextParsing(t, q.RAWTEXT);
}
function mc(e, t) {
  e.framesetOk = !1, e._switchToTextParsing(t, q.RAWTEXT);
}
function ju(e, t) {
  e._switchToTextParsing(t, q.RAWTEXT);
}
function bc(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML), e.framesetOk = !1, e.insertionMode = e.insertionMode === l.IN_TABLE || e.insertionMode === l.IN_CAPTION || e.insertionMode === l.IN_TABLE_BODY || e.insertionMode === l.IN_ROW || e.insertionMode === l.IN_CELL ? l.IN_SELECT_IN_TABLE : l.IN_SELECT;
}
function _c(e, t) {
  e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML);
}
function Ac(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTags(), e._insertElement(t, m.HTML);
}
function gc(e, t) {
  e.openElements.hasInScope(a.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(a.RTC), e._insertElement(t, m.HTML);
}
function pc(e, t) {
  e._reconstructActiveFormattingElements(), js(t), fu(t), t.selfClosing ? e._appendElement(t, m.MATHML) : e._insertElement(t, m.MATHML), t.ackSelfClosing = !0;
}
function Nc(e, t) {
  e._reconstructActiveFormattingElements(), Xs(t), fu(t), t.selfClosing ? e._appendElement(t, m.SVG) : e._insertElement(t, m.SVG), t.ackSelfClosing = !0;
}
function Xu(e, t) {
  e._reconstructActiveFormattingElements(), e._insertElement(t, m.HTML);
}
function H(e, t) {
  switch (t.tagID) {
    case a.I:
    case a.S:
    case a.B:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      rc(e, t);
      break;
    }
    case a.A: {
      nc(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      J0(e, t);
      break;
    }
    case a.P:
    case a.DL:
    case a.OL:
    case a.UL:
    case a.DIV:
    case a.DIR:
    case a.NAV:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.DETAILS:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.SEARCH:
    case a.SECTION:
    case a.SUMMARY:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      Z0(e, t);
      break;
    }
    case a.LI:
    case a.DD:
    case a.DT: {
      uc(e, t);
      break;
    }
    case a.BR:
    case a.IMG:
    case a.WBR:
    case a.AREA:
    case a.EMBED:
    case a.KEYGEN: {
      Js(e, t);
      break;
    }
    case a.HR: {
      hc(e, t);
      break;
    }
    case a.RB:
    case a.RTC: {
      Ac(e, t);
      break;
    }
    case a.RT:
    case a.RP: {
      gc(e, t);
      break;
    }
    case a.PRE:
    case a.LISTING: {
      ec(e, t);
      break;
    }
    case a.XMP: {
      Tc(e, t);
      break;
    }
    case a.SVG: {
      Nc(e, t);
      break;
    }
    case a.HTML: {
      $0(e, t);
      break;
    }
    case a.BASE:
    case a.LINK:
    case a.META:
    case a.STYLE:
    case a.TITLE:
    case a.SCRIPT:
    case a.BGSOUND:
    case a.BASEFONT:
    case a.TEMPLATE: {
      X(e, t);
      break;
    }
    case a.BODY: {
      K0(e, t);
      break;
    }
    case a.FORM: {
      tc(e, t);
      break;
    }
    case a.NOBR: {
      ic(e, t);
      break;
    }
    case a.MATH: {
      pc(e, t);
      break;
    }
    case a.TABLE: {
      oc(e, t);
      break;
    }
    case a.INPUT: {
      lc(e, t);
      break;
    }
    case a.PARAM:
    case a.TRACK:
    case a.SOURCE: {
      dc(e, t);
      break;
    }
    case a.IMAGE: {
      fc(e, t);
      break;
    }
    case a.BUTTON: {
      ac(e, t);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      cc(e, t);
      break;
    }
    case a.IFRAME: {
      mc(e, t);
      break;
    }
    case a.SELECT: {
      bc(e, t);
      break;
    }
    case a.OPTION:
    case a.OPTGROUP: {
      _c(e, t);
      break;
    }
    case a.NOEMBED:
    case a.NOFRAMES: {
      ju(e, t);
      break;
    }
    case a.FRAMESET: {
      z0(e, t);
      break;
    }
    case a.TEXTAREA: {
      Ec(e, t);
      break;
    }
    case a.NOSCRIPT: {
      e.options.scriptingEnabled ? ju(e, t) : Xu(e, t);
      break;
    }
    case a.PLAINTEXT: {
      sc(e, t);
      break;
    }
    case a.COL:
    case a.TH:
    case a.TD:
    case a.TR:
    case a.HEAD:
    case a.FRAME:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.CAPTION:
    case a.COLGROUP:
      break;
    default:
      Xu(e, t);
  }
}
function Ic(e, t) {
  if (e.openElements.hasInScope(a.BODY) && (e.insertionMode = l.AFTER_BODY, e.options.sourceCodeLocationInfo)) {
    const u = e.openElements.tryPeekProperlyNestedBodyElement();
    u && e._setEndLocation(u, t);
  }
}
function Cc(e, t) {
  e.openElements.hasInScope(a.BODY) && (e.insertionMode = l.AFTER_BODY, la(e, t));
}
function Sc(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u));
}
function Oc(e) {
  const t = e.openElements.tmplCount > 0, { formElement: u } = e;
  t || (e.formElement = null), (u || t) && e.openElements.hasInScope(a.FORM) && (e.openElements.generateImpliedEndTags(), t ? e.openElements.popUntilTagNamePopped(a.FORM) : u && e.openElements.remove(u));
}
function Lc(e) {
  e.openElements.hasInButtonScope(a.P) || e._insertFakeElement(f.P, a.P), e._closePElement();
}
function Dc(e) {
  e.openElements.hasInListItemScope(a.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(a.LI), e.openElements.popUntilTagNamePopped(a.LI));
}
function Rc(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTagsWithExclusion(u), e.openElements.popUntilTagNamePopped(u));
}
function xc(e) {
  e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilNumberedHeaderPopped());
}
function Pc(e, t) {
  const u = t.tagID;
  e.openElements.hasInScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker());
}
function yc(e) {
  e._reconstructActiveFormattingElements(), e._insertFakeElement(f.BR, a.BR), e.openElements.pop(), e.framesetOk = !1;
}
function ta(e, t) {
  const u = t.tagName, s = t.tagID;
  for (let n = e.openElements.stackTop; n > 0; n--) {
    const r = e.openElements.items[n], i = e.openElements.tagIDs[n];
    if (s === i && (s !== a.UNKNOWN || e.treeAdapter.getTagName(r) === u)) {
      e.openElements.generateImpliedEndTagsWithExclusion(s), e.openElements.stackTop >= n && e.openElements.shortenToLength(n);
      break;
    }
    if (e._isSpecialElement(r, i))
      break;
  }
}
function gt(e, t) {
  switch (t.tagID) {
    case a.A:
    case a.B:
    case a.I:
    case a.S:
    case a.U:
    case a.EM:
    case a.TT:
    case a.BIG:
    case a.CODE:
    case a.FONT:
    case a.NOBR:
    case a.SMALL:
    case a.STRIKE:
    case a.STRONG: {
      Eu(e, t);
      break;
    }
    case a.P: {
      Lc(e);
      break;
    }
    case a.DL:
    case a.UL:
    case a.OL:
    case a.DIR:
    case a.DIV:
    case a.NAV:
    case a.PRE:
    case a.MAIN:
    case a.MENU:
    case a.ASIDE:
    case a.BUTTON:
    case a.CENTER:
    case a.FIGURE:
    case a.FOOTER:
    case a.HEADER:
    case a.HGROUP:
    case a.DIALOG:
    case a.ADDRESS:
    case a.ARTICLE:
    case a.DETAILS:
    case a.SEARCH:
    case a.SECTION:
    case a.SUMMARY:
    case a.LISTING:
    case a.FIELDSET:
    case a.BLOCKQUOTE:
    case a.FIGCAPTION: {
      Sc(e, t);
      break;
    }
    case a.LI: {
      Dc(e);
      break;
    }
    case a.DD:
    case a.DT: {
      Rc(e, t);
      break;
    }
    case a.H1:
    case a.H2:
    case a.H3:
    case a.H4:
    case a.H5:
    case a.H6: {
      xc(e);
      break;
    }
    case a.BR: {
      yc(e);
      break;
    }
    case a.BODY: {
      Ic(e, t);
      break;
    }
    case a.HTML: {
      Cc(e, t);
      break;
    }
    case a.FORM: {
      Oc(e);
      break;
    }
    case a.APPLET:
    case a.OBJECT:
    case a.MARQUEE: {
      Pc(e, t);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    default:
      ta(e, t);
  }
}
function ua(e, t) {
  e.tmplInsertionModeStack.length > 0 ? oa(e, t) : Tu(e, t);
}
function Mc(e, t) {
  var u;
  t.tagID === a.SCRIPT && ((u = e.scriptHandler) === null || u === void 0 || u.call(e, e.openElements.current)), e.openElements.pop(), e.insertionMode = e.originalInsertionMode;
}
function kc(e, t) {
  e._err(t, T.eofInElementThatCanContainOnlyText), e.openElements.pop(), e.insertionMode = e.originalInsertionMode, e.onEof(t);
}
function kt(e, t) {
  if (e.openElements.currentTagId !== void 0 && $s.has(e.openElements.currentTagId))
    switch (e.pendingCharacterTokens.length = 0, e.hasNonWhitespacePendingCharacterToken = !1, e.originalInsertionMode = e.insertionMode, e.insertionMode = l.IN_TABLE_TEXT, t.type) {
      case D.CHARACTER: {
        aa(e, t);
        break;
      }
      case D.WHITESPACE_CHARACTER: {
        sa(e, t);
        break;
      }
    }
  else
    je(e, t);
}
function Bc(e, t) {
  e.openElements.clearBackToTableContext(), e.activeFormattingElements.insertMarker(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_CAPTION;
}
function wc(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_COLUMN_GROUP;
}
function Fc(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(f.COLGROUP, a.COLGROUP), e.insertionMode = l.IN_COLUMN_GROUP, mu(e, t);
}
function Uc(e, t) {
  e.openElements.clearBackToTableContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_TABLE_BODY;
}
function Hc(e, t) {
  e.openElements.clearBackToTableContext(), e._insertFakeElement(f.TBODY, a.TBODY), e.insertionMode = l.IN_TABLE_BODY, pt(e, t);
}
function vc(e, t) {
  e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode(), e._processStartTag(t));
}
function Yc(e, t) {
  ea(t) ? e._appendElement(t, m.HTML) : je(e, t), t.ackSelfClosing = !0;
}
function qc(e, t) {
  !e.formElement && e.openElements.tmplCount === 0 && (e._insertElement(t, m.HTML), e.formElement = e.openElements.current, e.openElements.pop());
}
function ge(e, t) {
  switch (t.tagID) {
    case a.TD:
    case a.TH:
    case a.TR: {
      Hc(e, t);
      break;
    }
    case a.STYLE:
    case a.SCRIPT:
    case a.TEMPLATE: {
      X(e, t);
      break;
    }
    case a.COL: {
      Fc(e, t);
      break;
    }
    case a.FORM: {
      qc(e, t);
      break;
    }
    case a.TABLE: {
      vc(e, t);
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      Uc(e, t);
      break;
    }
    case a.INPUT: {
      Yc(e, t);
      break;
    }
    case a.CAPTION: {
      Bc(e, t);
      break;
    }
    case a.COLGROUP: {
      wc(e, t);
      break;
    }
    default:
      je(e, t);
  }
}
function qe(e, t) {
  switch (t.tagID) {
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TABLE) && (e.openElements.popUntilTagNamePopped(a.TABLE), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      je(e, t);
  }
}
function je(e, t) {
  const u = e.fosterParentingEnabled;
  e.fosterParentingEnabled = !0, At(e, t), e.fosterParentingEnabled = u;
}
function sa(e, t) {
  e.pendingCharacterTokens.push(t);
}
function aa(e, t) {
  e.pendingCharacterTokens.push(t), e.hasNonWhitespacePendingCharacterToken = !0;
}
function Re(e, t) {
  let u = 0;
  if (e.hasNonWhitespacePendingCharacterToken)
    for (; u < e.pendingCharacterTokens.length; u++)
      je(e, e.pendingCharacterTokens[u]);
  else
    for (; u < e.pendingCharacterTokens.length; u++)
      e._insertCharacters(e.pendingCharacterTokens[u]);
  e.insertionMode = e.originalInsertionMode, e._processToken(t);
}
const na = /* @__PURE__ */ new Set([a.CAPTION, a.COL, a.COLGROUP, a.TBODY, a.TD, a.TFOOT, a.TH, a.THEAD, a.TR]);
function Vc(e, t) {
  const u = t.tagID;
  na.has(u) ? e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_TABLE, ge(e, t)) : H(e, t);
}
function Gc(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.CAPTION:
    case a.TABLE: {
      e.openElements.hasInTableScope(a.CAPTION) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(a.CAPTION), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_TABLE, u === a.TABLE && qe(e, t));
      break;
    }
    case a.BODY:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TBODY:
    case a.TD:
    case a.TFOOT:
    case a.TH:
    case a.THEAD:
    case a.TR:
      break;
    default:
      gt(e, t);
  }
}
function mu(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.COL: {
      e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.TEMPLATE: {
      X(e, t);
      break;
    }
    default:
      lt(e, t);
  }
}
function Qc(e, t) {
  switch (t.tagID) {
    case a.COLGROUP: {
      e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = l.IN_TABLE);
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
    case a.COL:
      break;
    default:
      lt(e, t);
  }
}
function lt(e, t) {
  e.openElements.currentTagId === a.COLGROUP && (e.openElements.pop(), e.insertionMode = l.IN_TABLE, e._processToken(t));
}
function pt(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.clearBackToTableBodyContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_ROW;
      break;
    }
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableBodyContext(), e._insertFakeElement(f.TR, a.TR), e.insertionMode = l.IN_ROW, Nt(e, t);
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE, ge(e, t));
      break;
    }
    default:
      ge(e, t);
  }
}
function jt(e, t) {
  const u = t.tagID;
  switch (t.tagID) {
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.openElements.hasInTableScope(u) && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE);
      break;
    }
    case a.TABLE: {
      e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE, qe(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
    case a.TR:
      break;
    default:
      qe(e, t);
  }
}
function Nt(e, t) {
  switch (t.tagID) {
    case a.TH:
    case a.TD: {
      e.openElements.clearBackToTableRowContext(), e._insertElement(t, m.HTML), e.insertionMode = l.IN_CELL, e.activeFormattingElements.insertMarker();
      break;
    }
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, pt(e, t));
      break;
    }
    default:
      ge(e, t);
  }
}
function ra(e, t) {
  switch (t.tagID) {
    case a.TR: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY);
      break;
    }
    case a.TABLE: {
      e.openElements.hasInTableScope(a.TR) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, jt(e, t));
      break;
    }
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(a.TR)) && (e.openElements.clearBackToTableRowContext(), e.openElements.pop(), e.insertionMode = l.IN_TABLE_BODY, jt(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
    case a.TD:
    case a.TH:
      break;
    default:
      qe(e, t);
  }
}
function Wc(e, t) {
  const u = t.tagID;
  na.has(u) ? (e.openElements.hasInTableScope(a.TD) || e.openElements.hasInTableScope(a.TH)) && (e._closeTableCell(), Nt(e, t)) : H(e, t);
}
function jc(e, t) {
  const u = t.tagID;
  switch (u) {
    case a.TD:
    case a.TH: {
      e.openElements.hasInTableScope(u) && (e.openElements.generateImpliedEndTags(), e.openElements.popUntilTagNamePopped(u), e.activeFormattingElements.clearToLastMarker(), e.insertionMode = l.IN_ROW);
      break;
    }
    case a.TABLE:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD:
    case a.TR: {
      e.openElements.hasInTableScope(u) && (e._closeTableCell(), ra(e, t));
      break;
    }
    case a.BODY:
    case a.CAPTION:
    case a.COL:
    case a.COLGROUP:
    case a.HTML:
      break;
    default:
      gt(e, t);
  }
}
function ia(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e._insertElement(t, m.HTML);
      break;
    }
    case a.OPTGROUP: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._insertElement(t, m.HTML);
      break;
    }
    case a.HR: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop(), e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.INPUT:
    case a.KEYGEN:
    case a.TEXTAREA:
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), t.tagID !== a.SELECT && e._processStartTag(t));
      break;
    }
    case a.SCRIPT:
    case a.TEMPLATE: {
      X(e, t);
      break;
    }
  }
}
function ca(e, t) {
  switch (t.tagID) {
    case a.OPTGROUP: {
      e.openElements.stackTop > 0 && e.openElements.currentTagId === a.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === a.OPTGROUP && e.openElements.pop(), e.openElements.currentTagId === a.OPTGROUP && e.openElements.pop();
      break;
    }
    case a.OPTION: {
      e.openElements.currentTagId === a.OPTION && e.openElements.pop();
      break;
    }
    case a.SELECT: {
      e.openElements.hasInSelectScope(a.SELECT) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode());
      break;
    }
    case a.TEMPLATE: {
      Ee(e, t);
      break;
    }
  }
}
function Xc(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e._processStartTag(t)) : ia(e, t);
}
function $c(e, t) {
  const u = t.tagID;
  u === a.CAPTION || u === a.TABLE || u === a.TBODY || u === a.TFOOT || u === a.THEAD || u === a.TR || u === a.TD || u === a.TH ? e.openElements.hasInTableScope(u) && (e.openElements.popUntilTagNamePopped(a.SELECT), e._resetInsertionMode(), e.onEndTag(t)) : ca(e, t);
}
function Kc(e, t) {
  switch (t.tagID) {
    // First, handle tags that can start without a mode change
    case a.BASE:
    case a.BASEFONT:
    case a.BGSOUND:
    case a.LINK:
    case a.META:
    case a.NOFRAMES:
    case a.SCRIPT:
    case a.STYLE:
    case a.TEMPLATE:
    case a.TITLE: {
      X(e, t);
      break;
    }
    // Re-process the token in the appropriate mode
    case a.CAPTION:
    case a.COLGROUP:
    case a.TBODY:
    case a.TFOOT:
    case a.THEAD: {
      e.tmplInsertionModeStack[0] = l.IN_TABLE, e.insertionMode = l.IN_TABLE, ge(e, t);
      break;
    }
    case a.COL: {
      e.tmplInsertionModeStack[0] = l.IN_COLUMN_GROUP, e.insertionMode = l.IN_COLUMN_GROUP, mu(e, t);
      break;
    }
    case a.TR: {
      e.tmplInsertionModeStack[0] = l.IN_TABLE_BODY, e.insertionMode = l.IN_TABLE_BODY, pt(e, t);
      break;
    }
    case a.TD:
    case a.TH: {
      e.tmplInsertionModeStack[0] = l.IN_ROW, e.insertionMode = l.IN_ROW, Nt(e, t);
      break;
    }
    default:
      e.tmplInsertionModeStack[0] = l.IN_BODY, e.insertionMode = l.IN_BODY, H(e, t);
  }
}
function zc(e, t) {
  t.tagID === a.TEMPLATE && Ee(e, t);
}
function oa(e, t) {
  e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(a.TEMPLATE), e.activeFormattingElements.clearToLastMarker(), e.tmplInsertionModeStack.shift(), e._resetInsertionMode(), e.onEof(t)) : Tu(e, t);
}
function Zc(e, t) {
  t.tagID === a.HTML ? H(e, t) : dt(e, t);
}
function la(e, t) {
  var u;
  if (t.tagID === a.HTML) {
    if (e.fragmentContext || (e.insertionMode = l.AFTER_AFTER_BODY), e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === a.HTML) {
      e._setEndLocation(e.openElements.items[0], t);
      const s = e.openElements.items[1];
      s && !(!((u = e.treeAdapter.getNodeSourceCodeLocation(s)) === null || u === void 0) && u.endTag) && e._setEndLocation(s, t);
    }
  } else
    dt(e, t);
}
function dt(e, t) {
  e.insertionMode = l.IN_BODY, At(e, t);
}
function Jc(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.FRAMESET: {
      e._insertElement(t, m.HTML);
      break;
    }
    case a.FRAME: {
      e._appendElement(t, m.HTML), t.ackSelfClosing = !0;
      break;
    }
    case a.NOFRAMES: {
      X(e, t);
      break;
    }
  }
}
function eo(e, t) {
  t.tagID === a.FRAMESET && !e.openElements.isRootHtmlElementCurrent() && (e.openElements.pop(), !e.fragmentContext && e.openElements.currentTagId !== a.FRAMESET && (e.insertionMode = l.AFTER_FRAMESET));
}
function to(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.NOFRAMES: {
      X(e, t);
      break;
    }
  }
}
function uo(e, t) {
  t.tagID === a.HTML && (e.insertionMode = l.AFTER_AFTER_FRAMESET);
}
function so(e, t) {
  t.tagID === a.HTML ? H(e, t) : et(e, t);
}
function et(e, t) {
  e.insertionMode = l.IN_BODY, At(e, t);
}
function ao(e, t) {
  switch (t.tagID) {
    case a.HTML: {
      H(e, t);
      break;
    }
    case a.NOFRAMES: {
      X(e, t);
      break;
    }
  }
}
function no(e, t) {
  t.chars = P, e._insertCharacters(t);
}
function ro(e, t) {
  e._insertCharacters(t), e.framesetOk = !1;
}
function da(e) {
  for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== m.HTML && e.openElements.currentTagId !== void 0 && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
    e.openElements.pop();
}
function io(e, t) {
  if (N0(t))
    da(e), e._startTagOutsideForeignContent(t);
  else {
    const u = e._getAdjustedCurrentElement(), s = e.treeAdapter.getNamespaceURI(u);
    s === m.MATHML ? js(t) : s === m.SVG && (I0(t), Xs(t)), fu(t), t.selfClosing ? e._appendElement(t, s) : e._insertElement(t, s), t.ackSelfClosing = !0;
  }
}
function co(e, t) {
  if (t.tagID === a.P || t.tagID === a.BR) {
    da(e), e._endTagOutsideForeignContent(t);
    return;
  }
  for (let u = e.openElements.stackTop; u > 0; u--) {
    const s = e.openElements.items[u];
    if (e.treeAdapter.getNamespaceURI(s) === m.HTML) {
      e._endTagOutsideForeignContent(t);
      break;
    }
    const n = e.treeAdapter.getTagName(s);
    if (n.toLowerCase() === t.tagName) {
      t.tagName = n, e.openElements.shortenToLength(u);
      break;
    }
  }
}
function ha(e, t) {
  return function(s) {
    let n, r = 0, i = "";
    for (; n = e.exec(s); )
      r !== n.index && (i += s.substring(r, n.index)), i += t.get(n[0].charCodeAt(0)), r = n.index + 1;
    return i + s.substring(r);
  };
}
const oo = /* @__PURE__ */ ha(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
])), lo = /* @__PURE__ */ ha(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
])), ho = /* @__PURE__ */ new Set([
  f.AREA,
  f.BASE,
  f.BASEFONT,
  f.BGSOUND,
  f.BR,
  f.COL,
  f.EMBED,
  f.FRAME,
  f.HR,
  f.IMG,
  f.INPUT,
  f.KEYGEN,
  f.LINK,
  f.META,
  f.PARAM,
  f.SOURCE,
  f.TRACK,
  f.WBR
]);
function fo(e, t) {
  return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === m.HTML && ho.has(t.treeAdapter.getTagName(e));
}
const Eo = { treeAdapter: J, scriptingEnabled: !0 };
function To(e, t) {
  const u = { ...Eo, ...t };
  return fa(e, u);
}
function mo(e, t) {
  let u = "";
  const s = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === f.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === m.HTML ? t.treeAdapter.getTemplateContent(e) : e, n = t.treeAdapter.getChildNodes(s);
  if (n)
    for (const r of n)
      u += fa(r, t);
  return u;
}
function fa(e, t) {
  return t.treeAdapter.isElementNode(e) ? bo(e, t) : t.treeAdapter.isTextNode(e) ? Ao(e, t) : t.treeAdapter.isCommentNode(e) ? go(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? po(e, t) : "";
}
function bo(e, t) {
  const u = t.treeAdapter.getTagName(e);
  return `<${u}${_o(e, t)}>${fo(e, t) ? "" : `${mo(e, t)}</${u}>`}`;
}
function _o(e, { treeAdapter: t }) {
  let u = "";
  for (const s of t.getAttrList(e)) {
    if (u += " ", s.namespace)
      switch (s.namespace) {
        case m.XML: {
          u += `xml:${s.name}`;
          break;
        }
        case m.XMLNS: {
          s.name !== "xmlns" && (u += "xmlns:"), u += s.name;
          break;
        }
        case m.XLINK: {
          u += `xlink:${s.name}`;
          break;
        }
        default:
          u += `${s.prefix}:${s.name}`;
      }
    else
      u += s.name;
    u += `="${oo(s.value)}"`;
  }
  return u;
}
function Ao(e, t) {
  const { treeAdapter: u } = t, s = u.getTextNodeContent(e), n = u.getParentNode(e), r = n && u.isElementNode(n) && u.getTagName(n);
  return r && u.getNamespaceURI(n) === m.HTML && Ki(r, t.scriptingEnabled) ? s : lo(s);
}
function go(e, { treeAdapter: t }) {
  return `<!--${t.getCommentNodeContent(e)}-->`;
}
function po(e, { treeAdapter: t }) {
  return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`;
}
function No(e, t) {
  return Ks.parse(e, t);
}
function Io(e, t, u) {
  typeof e == "string" && (u = t, t = e, e = null);
  const s = Ks.getFragmentParser(e, u);
  return s.tokenizer.write(t, !0), s.getFragment();
}
function $u(e) {
  const t = e.includes('"') ? "'" : '"';
  return t + e + t;
}
function Co(e, t, u) {
  let s = "!DOCTYPE ";
  return e && (s += e), t ? s += ` PUBLIC ${$u(t)}` : u && (s += " SYSTEM"), u && (s += ` ${$u(u)}`), s;
}
const ue = {
  // Re-exports from domhandler
  isCommentNode: ft,
  isElementNode: O,
  isTextNode: z,
  //Node construction
  createDocument() {
    const e = new de([]);
    return e["x-mode"] = V.NO_QUIRKS, e;
  },
  createDocumentFragment() {
    return new de([]);
  },
  createElement(e, t, u) {
    const s = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
    for (let d = 0; d < u.length; d++) {
      const h = u[d].name;
      s[h] = u[d].value, n[h] = u[d].namespace, r[h] = u[d].prefix;
    }
    const i = new Jt(e, s, []);
    return i.namespace = t, i["x-attribsNamespace"] = n, i["x-attribsPrefix"] = r, i;
  },
  createCommentNode(e) {
    return new Kt(e);
  },
  createTextNode(e) {
    return new Fe(e);
  },
  //Tree mutation
  appendChild(e, t) {
    const u = e.children[e.children.length - 1];
    u && (u.next = t, t.prev = u), e.children.push(t), t.parent = e;
  },
  insertBefore(e, t, u) {
    const s = e.children.indexOf(u), { prev: n } = u;
    n && (n.next = t, t.prev = n), u.prev = t, t.next = u, e.children.splice(s, 0, t), t.parent = e;
  },
  setTemplateContent(e, t) {
    ue.appendChild(e, t);
  },
  getTemplateContent(e) {
    return e.children[0];
  },
  setDocumentType(e, t, u, s) {
    const n = Co(t, u, s);
    let r = e.children.find((i) => wt(i) && i.name === "!doctype");
    r ? r.data = n ?? null : (r = new zt("!doctype", n), ue.appendChild(e, r)), r["x-name"] = t, r["x-publicId"] = u, r["x-systemId"] = s;
  },
  setDocumentMode(e, t) {
    e["x-mode"] = t;
  },
  getDocumentMode(e) {
    return e["x-mode"];
  },
  detachNode(e) {
    if (e.parent) {
      const t = e.parent.children.indexOf(e), { prev: u, next: s } = e;
      e.prev = null, e.next = null, u && (u.next = s), s && (s.prev = u), e.parent.children.splice(t, 1), e.parent = null;
    }
  },
  insertText(e, t) {
    const u = e.children[e.children.length - 1];
    u && z(u) ? u.data += t : ue.appendChild(e, ue.createTextNode(t));
  },
  insertTextBefore(e, t, u) {
    const s = e.children[e.children.indexOf(u) - 1];
    s && z(s) ? s.data += t : ue.insertBefore(e, ue.createTextNode(t), u);
  },
  adoptAttributes(e, t) {
    for (let u = 0; u < t.length; u++) {
      const s = t[u].name;
      e.attribs[s] === void 0 && (e.attribs[s] = t[u].value, e["x-attribsNamespace"][s] = t[u].namespace, e["x-attribsPrefix"][s] = t[u].prefix);
    }
  },
  //Tree traversing
  getFirstChild(e) {
    return e.children[0];
  },
  getChildNodes(e) {
    return e.children;
  },
  getParentNode(e) {
    return e.parent;
  },
  getAttrList(e) {
    return e.attributes;
  },
  //Node data
  getTagName(e) {
    return e.name;
  },
  getNamespaceURI(e) {
    return e.namespace;
  },
  getTextNodeContent(e) {
    return e.data;
  },
  getCommentNodeContent(e) {
    return e.data;
  },
  getDocumentTypeNodeName(e) {
    var t;
    return (t = e["x-name"]) !== null && t !== void 0 ? t : "";
  },
  getDocumentTypeNodePublicId(e) {
    var t;
    return (t = e["x-publicId"]) !== null && t !== void 0 ? t : "";
  },
  getDocumentTypeNodeSystemId(e) {
    var t;
    return (t = e["x-systemId"]) !== null && t !== void 0 ? t : "";
  },
  //Node types
  isDocumentTypeNode(e) {
    return wt(e) && e.name === "!doctype";
  },
  // Source code location
  setNodeSourceCodeLocation(e, t) {
    t && (e.startIndex = t.startOffset, e.endIndex = t.endOffset), e.sourceCodeLocation = t;
  },
  getNodeSourceCodeLocation(e) {
    return e.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(e, t) {
    t.endOffset != null && (e.endIndex = t.endOffset), e.sourceCodeLocation = {
      ...e.sourceCodeLocation,
      ...t
    };
  }
};
function So(e, t, u, s) {
  var n;
  return (n = t.treeAdapter) !== null && n !== void 0 || (t.treeAdapter = ue), t.scriptingEnabled !== !1 && (t.scriptingEnabled = !0), u ? No(e, t) : Io(s, e, t);
}
const Oo = { treeAdapter: ue };
function Lo(e) {
  const t = "length" in e ? e : [e];
  for (let s = 0; s < t.length; s += 1) {
    const n = t[s];
    ne(n) && Array.prototype.splice.call(t, s, 1, ...n.children);
  }
  let u = "";
  for (let s = 0; s < t.length; s += 1) {
    const n = t[s];
    u += To(n, Oo);
  }
  return u;
}
const Do = ii((e, t, u, s) => t._useHtmlParser2 ? kn(e, t) : So(e, t, u, s)), Ce = vi(Do, (e, t) => t._useHtmlParser2 ? Et(e, t) : Lo(e)), Ro = new W("backloggd", {
  name: "Backloggd",
  urlPattern: "https://backloggd.com/u/{identifier}/",
  verificationMethods: {
    profile: async ({ did: e, claim: t }) => {
      let u = `https://backloggd.com/u/${t.identifier}/`, s = `https://keyoxide.org/api/3/get/http?url=${encodeURI(u)}&format=text`;
      const n = await (await fetch(s)).text();
      return {
        ok: Ce(n)("a.secondary-link").text()?.includes(e),
        proofUrl: u
      };
    }
  }
}), xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ro
}, Symbol.toStringTag, { value: "Module" })), Po = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eBluesky%3c/title%3e%3cpath%20d='M12%2010.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944%201.561%201.266.902%201.565.139%201.908%200%203.08%200%203.768c0%20.69.378%205.65.624%206.479.815%202.736%203.713%203.66%206.383%203.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387%202.005-2.83%207.078%205.013%205.19%206.87-1.113%207.823-4.308.953%203.195%202.05%209.271%207.733%204.308%204.267-4.308%201.172-6.498-2.74-7.078a8.741%208.741%200%200%201-.415-.056c.14.017.279.036.415.056%202.67.297%205.568-.628%206.383-3.364.246-.828.624-5.79.624-6.478%200-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3%201.24C16.046%204.748%2013.087%208.687%2012%2010.8Z'/%3e%3c/svg%3e", yo = new W("bsky", {
  name: "Bluesky",
  urlPattern: "https://bsky.app/profile/{identifier}",
  icon: Po,
  renderFormat: "@{identifier}",
  verificationMethods: {
    did: ({ did: e }) => ({
      ok: !0,
      proofUrl: `https://pdsls.dev/at://${e}/app.bsky.actor.profile/self`
    })
  }
}), Mo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yo
}, Symbol.toStringTag, { value: "Module" })), ko = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M%2012,0%20A%2012,12%200%201%200%2024,12%2012.012692,12.012692%200%200%200%2012,0%20Z%20M%208.9573077,16.615385%20H%2015.042692%20C%2014.423077,18.731539%2013.384615,20.638846%2012,22.141154%2010.615385,20.638846%209.5769234,18.731539%208.9573077,16.615385%20Z%20M%208.5384615,14.769231%20a%2016.813846,16.813846%200%200%201%200,-5.5384618%20h%206.9230775%20a%2016.813846,16.813846%200%200%201%200,5.5384618%20z%20M%201.8461539,12%20A%2010.108846,10.108846%200%200%201%202.2303846,9.2307692%20h%204.4376923%20a%2018.668077,18.668077%200%200%200%200,5.5384618%20H%202.2303846%20A%2010.108846,10.108846%200%200%201%201.8461539,12%20Z%20M%2015.042692,7.3846154%20H%208.9573077%20C%209.5769234,5.2684615%2010.615385,3.3611539%2012,1.8588461%20c%201.384615,1.5023078%202.423077,3.4096154%203.042692,5.5257693%20z%20m%202.289231,1.8461538%20h%204.437692%20a%2010.171154,10.171154%200%200%201%200,5.5384618%20h%20-4.437692%20a%2018.668077,18.668077%200%200%200%200,-5.5384618%20z%20M%2021.042692,7.3846154%20H%2016.954615%20A%2016.429615,16.429615%200%200%200%2014.616923,2.1923077%2010.196539,10.196539%200%200%201%2021.042692,7.3846154%20Z%20M%209.3830766,2.1923077%20A%2016.429615,16.429615%200%200%200%207.0453846,7.3846154%20H%202.9573077%20A%2010.196539,10.196539%200%200%201%209.3830766,2.1923077%20Z%20M%202.9573077,16.615385%20h%204.0880769%20a%2016.429615,16.429615%200%200%200%202.337692,5.192307%2010.196539,10.196539%200%200%201%20-6.4257689,-5.192307%20z%20m%2011.6596153,5.192307%20a%2016.429615,16.429615%200%200%200%202.337692,-5.192307%20h%204.088077%20a%2010.196539,10.196539%200%200%201%20-6.425769,5.192307%20z'%20/%3e%3c/svg%3e", Bo = new W("dns", {
  name: "DNS",
  icon: ko,
  verificationMethods: {
    txt: async ({ did: e, claim: t }) => {
      const u = `https://dns.google/resolve?name=_atproto.${t.identifier}&type=TXT`, s = await (await fetch(u)).json(), n = (r) => ({ ok: r, proofUrl: u });
      if (!s || !s.Answer)
        return n(!1);
      for (const r of s.Answer)
        if (r.data === `did=${e}`)
          return n(!0);
      return n(!1);
    },
    "well-known": async ({ did: e, claim: t }) => {
      let u, s = `https://${t.identifier}/.well-known/atproto-did`;
      const n = (r) => ({ ok: r, proofUrl: s });
      try {
        let r = `https://keyoxide.org/api/3/get/http?url=${encodeURI(s)}&format=text`;
        u = await (await fetch(r)).text();
      } catch {
        return n(!1);
      }
      return n(u === e);
    }
  }
}), wo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bo
}, Symbol.toStringTag, { value: "Module" })), Fo = "data:image/svg+xml,%3csvg%20width='202'%20height='231'%20viewBox='0%200%20202%20231'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M98.3592%202.80337L34.8353%20107.327C34.3371%20108.147%2033.1797%20108.238%2032.5617%20107.505C26.9693%20100.864%206.13478%2072.615%2031.9154%2046.8673C55.4403%2023.3726%2085.4045%206.62129%2096.5096%200.831705C97.7695%200.174847%2099.0966%201.59007%2098.3592%202.80337Z'%20fill='%230080BC'/%3e%3cpath%20d='M94.8459%20230.385C96.1137%20231.273%2097.6758%20229.759%2096.8261%20228.467C82.6374%20206.886%2035.4713%20135.081%2028.9559%20124.302C22.5295%20113.67%209.88976%2096.001%208.83534%2080.8842C8.7301%2079.3751%206.64332%2079.0687%206.11838%2080.4879C5.27178%2082.7767%204.37045%2085.5085%203.53042%2088.6292C-7.07427%20128.023%208.32698%20169.826%2041.7753%20193.238L94.8459%20230.386V230.385Z'%20fill='%230080BC'/%3e%3cpath%20d='M103.571%20228.526L167.095%20124.003C167.593%20123.183%20168.751%20123.092%20169.369%20123.825C174.961%20130.465%20195.796%20158.715%20170.015%20184.463C146.49%20207.957%20116.526%20224.709%20105.421%20230.498C104.161%20231.155%20102.834%20229.74%20103.571%20228.526Z'%20fill='%230080BC'/%3e%3cpath%20d='M107.154%200.930762C105.886%200.0433954%20104.324%201.5567%20105.174%202.84902C119.363%2024.4301%20166.529%2096.2354%20173.044%20107.014C179.471%20117.646%20192.11%20135.315%20193.165%20150.432C193.27%20151.941%20195.357%20152.247%20195.882%20150.828C196.728%20148.539%20197.63%20145.808%20198.47%20142.687C209.074%20103.293%20193.673%2061.4905%20160.225%2038.078L107.154%200.930762Z'%20fill='%230080BC'/%3e%3c/svg%3e", Uo = new W("ens", {
  name: "ENS",
  urlPattern: "https://app.ens.domains/{identifier}",
  icon: Fo,
  verificationMethods: {
    "txt-record": async ({ did: e, claim: t, proof: u }) => {
      const s = await (await fetch(`https://api.github.com/gists/${u.gistId}`)).json();
      for (const [n, r] of Object.entries(s.files))
        if (r.content.includes(`did=${e}`))
          return !0;
      return !1;
    }
  }
}), Ho = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Uo
}, Symbol.toStringTag, { value: "Module" })), vo = "data:image/svg+xml,%3csvg%20width='752'%20height='689'%20viewBox='0%200%20752%20689'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M128.889%200H613.333V688.889H542.222V373.333H541.525C533.665%20286.121%20460.369%20217.777%20371.111%20217.777C281.853%20217.777%20208.557%20286.121%20200.697%20373.333H200V688.889H128.889V0Z'%20fill='black'/%3e%3cpath%20d='M0%2097.777L28.889%20195.555H53.333V591.111C41.06%20591.111%2031.111%20601.06%2031.111%20613.333V640H26.667C14.394%20640%204.44398%20649.949%204.44398%20662.222V688.889H253.333V662.222C253.333%20649.949%20243.384%20640%20231.111%20640H226.667V613.333C226.667%20601.06%20216.717%20591.111%20204.444%20591.111H177.778V97.777H0Z'%20fill='black'/%3e%3cpath%20d='M546.667%20591.111C534.394%20591.111%20524.444%20601.06%20524.444%20613.333V640H520C507.727%20640%20497.778%20649.949%20497.778%20662.222V688.889H746.667V662.222C746.667%20649.949%20736.717%20640%20724.444%20640H720V613.333C720%20601.06%20710.051%20591.111%20697.778%20591.111V195.555H722.222L751.111%2097.777H573.333V591.111H546.667Z'%20fill='black'/%3e%3c/svg%3e", Yo = new W("farcaster", {
  name: "Farcaster",
  urlPattern: "https://farcaster.xyz/{identifier}",
  renderFormat: "@{identifier}",
  icon: vo,
  verificationMethods: {
    profile: async ({ did: e, claim: t, proof: u }) => {
      const s = `https://client.farcaster.xyz/v2/user-by-username?username=${t.identifier}`, n = `https://keyoxide.org/api/3/get/http?url=${encodeURI(s)}&format=text`;
      return {
        ok: ((await (await fetch(n)).json()).result?.user?.profile?.bio?.text || "").includes(e),
        proofUrl: s
      };
    }
  }
}), qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Yo
}, Symbol.toStringTag, { value: "Module" })), Vo = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cscript%20xmlns=''%20id='argent-x-extension'%20data-extension-id='{51e0c76c-7dbc-41ba-a45d-c579be84301b}'/%3e%3ctitle%3eGitHub%3c/title%3e%3cpath%20d='M12%20.297c-6.63%200-12%205.373-12%2012%200%205.303%203.438%209.8%208.205%2011.385.6.113.82-.258.82-.577%200-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422%2018.07%203.633%2017.7%203.633%2017.7c-1.087-.744.084-.729.084-.729%201.205.084%201.838%201.236%201.838%201.236%201.07%201.835%202.809%201.305%203.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93%200-1.31.465-2.38%201.235-3.22-.135-.303-.54-1.523.105-3.176%200%200%201.005-.322%203.3%201.23.96-.267%201.98-.399%203-.405%201.02.006%202.04.138%203%20.405%202.28-1.552%203.285-1.23%203.285-1.23.645%201.653.24%202.873.12%203.176.765.84%201.23%201.91%201.23%203.22%200%204.61-2.805%205.625-5.475%205.92.42.36.81%201.096.81%202.22%200%201.606-.015%202.896-.015%203.286%200%20.315.21.69.825.57C20.565%2022.092%2024%2017.592%2024%2012.297c0-6.627-5.373-12-12-12'/%3e%3c/svg%3e", Go = new W("github", {
  name: "GitHub",
  urlPattern: "https://github.com/{identifier}",
  icon: Vo,
  verificationMethods: {
    gist: async ({ did: e, claim: t, proof: u }) => {
      const s = `https://api.github.com/gists/${u.gistId}`, n = await (await fetch(s)).json(), r = (i) => ({ ok: i, proofUrl: s });
      for (const [i, d] of Object.entries(n.files))
        if (d.content.includes(`did=${e}`))
          return r(!0);
      return !1;
    }
  }
}), Qo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Go
}, Symbol.toStringTag, { value: "Module" })), Wo = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20fill='%23000000'%20version='1.1'%20id='Capa_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='800px'%20height='800px'%20viewBox='0%200%2094%2094'%20xml:space='preserve'%3e%3cg%3e%3cpath%20d='M89,0H5C2.238,0,0,2.239,0,5v84c0,2.761,2.238,5,5,5h84c2.762,0,5-2.239,5-5V5C94,2.239,91.762,0,89,0z%20M67.611,68.875%20c-15.605,0-21.019-7.036-23.904-15.786l-2.887-9.021c-2.164-6.585-4.689-11.727-12.629-11.727c-5.504,0-11.094,3.969-11.094,15.064%20c0,8.659,4.42,14.073,10.643,14.073c7.037,0,11.729-5.232,11.729-5.232l2.887,7.848c0,0-4.873,4.78-15.066,4.78%20c-12.627,0-19.664-7.396-19.664-21.108c0-14.251,7.037-22.642,20.297-22.642c11.998,0,18.043,4.33,21.83,16.057l2.978,9.02%20c2.164,6.585,5.953,11.367,15.063,11.367c6.136,0,9.379-1.354,9.379-4.691c0-2.616-1.53-4.51-6.131-5.593l-6.138-1.442%20c-7.483-1.804-10.463-5.684-10.463-11.817c0-9.833,7.939-12.9,16.058-12.9c9.203,0,14.795,3.338,15.517,11.457l-9.021,1.082%20c-0.361-3.879-2.705-5.502-7.035-5.502c-3.972,0-6.403,1.804-6.403,4.871c0,2.706,1.17,4.33,5.141,5.232l5.773,1.263%20c7.758,1.804,11.905,5.593,11.905,12.899C86.375,65.448,78.799,68.875,67.611,68.875z'/%3e%3c/g%3e%3c/svg%3e", jo = new W("lastfm", {
  name: "Last.fm",
  urlPattern: "https://www.last.fm/user/{identifier}",
  icon: Wo,
  verificationMethods: {
    profile: async ({ did: e, claim: t }) => {
      let u = `https://www.last.fm/user/${t.identifier}`, s = `https://keyoxide.org/api/3/get/http?url=${encodeURI(u)}&format=text`;
      const n = await (await fetch(s)).text();
      return {
        ok: Ce(n)("section.about-me-sidebar").text()?.includes(e),
        proofUrl: u
      };
    }
  }
}), Xo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: jo
}, Symbol.toStringTag, { value: "Module" })), $o = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eMatrix%3c/title%3e%3cpath%20d='M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043%207.26v1.157h.033c.309-.443.683-.784%201.117-1.024.433-.245.936-.365%201.5-.365.54%200%201.033.107%201.481.314.448.208.785.582%201.02%201.108.254-.374.6-.706%201.034-.992.434-.287.95-.43%201.546-.43.453%200%20.872.056%201.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23%201.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755%201.755%200%200%200-.18-.66%201.106%201.106%200%200%200-.438-.448c-.194-.11-.457-.166-.785-.166-.332%200-.6.064-.803.189a1.38%201.38%200%200%200-.48.499%201.946%201.946%200%200%200-.231.696%205.56%205.56%200%200%200-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074%202.074%200%200%200-.143-.688%201.052%201.052%200%200%200-.415-.503c-.194-.125-.476-.19-.854-.19-.111%200-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18%201.02v4.966H5.46V7.81zm15.693%2015.64V.55H21.72V0H24v24h-2.28v-.55z'/%3e%3c/svg%3e", Ko = new W("matrix", {
  name: "Matrix",
  urlPattern: "https://matrix.to/#/@{identifier}",
  icon: $o,
  renderFormat: "@{identifier}"
}), zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ko
}, Symbol.toStringTag, { value: "Module" })), Zo = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20fill='%231a1400'%20version='1.1'%20viewBox='0%200%2024%2014.963'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:cc='http://creativecommons.org/ns%23'%20xmlns:dc='http://purl.org/dc/elements/1.1/'%20xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23'%3e%3cpath%20d='m12.027-4.5188h-0.0546c-6.6123%200-11.973%205.3603-11.973%2011.973v0.0546c0%206.6123%205.3604%2011.973%2011.973%2011.973h0.0546c6.6123%200%2011.973-5.3604%2011.973-11.973v-0.0546c0-6.6124-5.3604-11.973-11.973-11.973z'%20fill='%23000'%3e%3c/path%3e%3cg%20transform='matrix(.46046%200%200%20.46046%207.5822%20-1.7004)'%20fill='%23fff'%3e%3cpath%20d='m2.47%205.8c-0.82%200.97-1.46%202.1-1.85%203.34%202.22-0.5%205.17-0.62%206.84-0.75%200.52-2.14%202-3.77%204.48-3.66%201.07%200.05%202.01%200.74%202.66%201.8%200.48-0.51%201.12-0.85%201.97-0.97%200.06%200%200.19-0.01%200.29-0.01-1.76-1.92-4.27-3.14-7.08-3.14-0.51%200-1.01%200.05-1.51%200.13-0.1%200-0.23%200.02-0.4%200.06h-0.04-0.04c-1.94%200.47-3.4%200.09-4.23-1.04-0.09-0.12-0.44-0.65-0.55-1.58-0.61%200.63-1.01%201.67-0.67%202.78%200.27%200.88%200.78%201.35%201.33%201.62-0.84%200.05-1.54-0.11-2.24-0.64-0.41-0.31-0.67-0.65-1.1-1.54-0.4%200.63-0.36%201.33-0.28%201.69%200.1%200.48%200.35%201.02%200.67%201.33%200.49%200.48%201.19%200.59%201.76%200.58z'%3e%3c/path%3e%3cellipse%20cx='11.95'%20cy='10.22'%20rx='2.25'%20ry='3.85'%3e%3c/ellipse%3e%3cellipse%20cx='16.9'%20cy='10.08'%20rx='1.76'%20ry='3.06'%3e%3c/ellipse%3e%3cpath%20d='m8.19%2033.71s-0.18-4.72%201.6-8.24c0.63-1.23%202.06-2.93%203.13-3.85%200.57-0.5%201.14-0.92%201.7-1.31%200.29-0.17%200.56-0.35%200.82-0.54%204.73-2.9%208.9-2.26%2012.35-1.76%200%200%200.82-2.44-2.56-3.7-1.84-0.68-4.01-1.23-5.82-1.61-0.26%200.47-0.59%200.87-0.98%201.17-0.28%200.21-0.97%200.75-2.24%200.6-0.64-0.08-1.13-0.34-1.52-0.72-0.66%201.09-1.61%201.8-2.71%201.9-3.05%200.26-4.59-2.3-4.69-5.13-2.29%200.22-5.41%201.63-7.07%202.45v24.53c2.45%201.26%205.14%202.09%208%202.4v-6.19z'%3e%3c/path%3e%3c/g%3e%3c/svg%3e", Jo = new W("nostr", {
  name: "Nostr",
  icon: Zo,
  urlPattern: "https://njump.me/{identifier}",
  verificationMethods: {
    note: async ({ did: e, claim: t, proof: u }) => {
      let s = `https://njump.me/${u.nevent}`;
      const n = await (await fetch(s)).text();
      return {
        ok: Ce(n)(".leading-6").text()?.includes(e),
        proofUrl: s
      };
    }
  }
}), el = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Jo
}, Symbol.toStringTag, { value: "Module" })), tl = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%3e%3cpath%20d='M15.974%200c-8.401%200-15.292%206.479-15.943%2014.714l8.573%203.547c0.729-0.495%201.604-0.786%202.552-0.786%200.083%200%200.167%200.005%200.25%200.005l3.813-5.521v-0.078c0-3.328%202.703-6.031%206.031-6.031s6.036%202.708%206.036%206.036c0%203.328-2.708%206.031-6.036%206.031h-0.135l-5.438%203.88c0%200.073%200.005%200.141%200.005%200.214%200%202.5-2.021%204.526-4.521%204.526-2.177%200-4.021-1.563-4.443-3.635l-6.135-2.542c1.901%206.719%208.063%2011.641%2015.391%2011.641%208.833%200%2015.995-7.161%2015.995-16s-7.161-16-15.995-16zM10.052%2024.281l-1.964-0.813c0.349%200.724%200.953%201.328%201.755%201.667%201.729%200.719%203.724-0.104%204.443-1.833%200.349-0.844%200.349-1.76%200.005-2.599-0.344-0.844-1-1.495-1.839-1.844-0.828-0.349-1.719-0.333-2.5-0.042l2.026%200.839c1.276%200.536%201.88%202%201.349%203.276s-2%201.88-3.276%201.349zM25.271%2011.875c0-2.214-1.802-4.021-4.016-4.021-2.224%200-4.021%201.807-4.021%204.021%200%202.219%201.797%204.021%204.021%204.021%202.214%200%204.016-1.802%204.016-4.021zM18.245%2011.87c0-1.672%201.349-3.021%203.016-3.021s3.026%201.349%203.026%203.021c0%201.667-1.359%203.021-3.026%203.021s-3.016-1.354-3.016-3.021z'/%3e%3c/svg%3e", ul = new W("steam", {
  name: "Steam",
  urlPattern: "https://steamcommunity.com/id/{identifier}/",
  icon: tl,
  verificationMethods: {
    profile: async ({ did: e, claim: t }) => {
      let u = `https://steamcommunity.com/id/${t.identifier}/`, s = `https://keyoxide.org/api/3/get/http?url=${encodeURI(u)}&format=text`;
      const n = await (await fetch(s)).text();
      return {
        ok: Ce(n)('meta[property="og:description"]').attr("content")?.includes(e),
        proofUrl: u
      };
    }
  }
}), sl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ul
}, Symbol.toStringTag, { value: "Module" })), al = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eTelegram%3c/title%3e%3cpath%20d='M11.944%200A12%2012%200%200%200%200%2012a12%2012%200%200%200%2012%2012%2012%2012%200%200%200%2012-12A12%2012%200%200%200%2012%200a12%2012%200%200%200-.056%200zm4.962%207.224c.1-.002.321.023.465.14a.506.506%200%200%201%20.171.325c.016.093.036.306.02.472-.18%201.898-.962%206.502-1.36%208.627-.168.9-.499%201.201-.82%201.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184%203.247-2.977%203.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793%201.14-5.061%203.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663%203.498-1.524%205.83-2.529%206.998-3.014%203.332-1.386%204.025-1.627%204.476-1.635z'/%3e%3c/svg%3e", nl = new W("telegram", {
  name: "Telegram",
  urlPattern: "https://t.me/{identifier}",
  icon: al,
  renderFormat: "@{identifier}",
  verificationMethods: {
    profile: async ({ did: e, claim: t }) => {
      let u = `https://t.me/${t.identifier}`, s = `https://keyoxide.org/api/3/get/http?url=${encodeURI(u)}&format=text`;
      const n = await (await fetch(s)).text();
      return {
        ok: Ce(n)('meta[property="og:description"]').attr("content")?.includes(e),
        proofUrl: u
      };
    }
  }
}), rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nl
}, Symbol.toStringTag, { value: "Module" })), il = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20id='Layer_2'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2048%2048'%3e%3cdefs%3e%3cstyle%3e%20.cls-1%20{%20fill:%20%23000;%20}%20%3c/style%3e%3c/defs%3e%3cg%20id='_x2D_-production'%3e%3cg%20id='logomark.square.black'%3e%3cpath%20class='cls-1'%20d='M47.87,9.58c-.05-.39-.13-.77-.23-1.15-.19-.74-.46-1.45-.79-2.14-.15-.3-.31-.6-.5-.88-.36-.6-.77-1.16-1.24-1.69C43.03,1.43,40.05,0,36.73,0H11.26C5.04,0,0,5.05,0,11.27v25.48C0,42.96,5.04,48,11.26,48h25.47c6.22,0,11.27-5.04,11.27-11.26V11.27c0-.57-.04-1.13-.13-1.69ZM47,36.74c0,5.66-4.61,10.25-10.26,10.25H11.26c-5.66,0-10.25-4.6-10.25-10.25V11.27C1,5.61,5.6,1,11.26,1h25.47c3.04,0,5.77,1.33,7.66,3.43l-22.85,22.86-8.62-8.62-1.46,1.46,14.4,14.4,1.46-1.47-4.31-4.31L45.61,6.14c.18.29.33.6.47.91l-21.69,21.7,3.62,3.62,1.46-1.46-2.16-2.16,19.47-19.48c.08.4.14.8.17,1.21l-18.26,18.27,1.46,1.46,16.83-16.84v23.36ZM15.77,15.82l7.93,7.93,1.46-1.48-7.93-7.92-1.46,1.46ZM13.62,17.98l7.92,7.93,1.47-1.48-7.93-7.92-1.46,1.47ZM6.67,35.12V12.88c0-3.42,2.78-6.2,6.2-6.2h20.79v-2.08H12.87c-4.56,0-8.28,3.71-8.28,8.28v22.23c0,4.57,3.72,8.29,8.28,8.29h22.24c4.57,0,8.28-3.72,8.28-8.29v-3.51h-2.08v3.51c0,3.42-2.78,6.21-6.2,6.21H12.87c-3.42,0-6.2-2.79-6.2-6.21Z'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e", cl = new W("trakt", {
  name: "Trakt",
  urlPattern: "https://trakt.tv/users/{identifier}",
  icon: il,
  verificationMethods: {
    profile: async ({ did: e, claim: t }) => {
      let u = `https://trakt.tv/users/${t.identifier}`, s = `https://keyoxide.org/api/3/get/http?url=${encodeURI(u)}&format=text`;
      const n = await (await fetch(s)).text();
      return {
        ok: Ce(n)("div.about-me-text").text()?.includes(e),
        proofUrl: u
      };
    }
  }
}), ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cl
}, Symbol.toStringTag, { value: "Module" })), Ku = /* @__PURE__ */ Object.assign({ "./src/backloggd/index.js": xo, "./src/bsky/bsky.js": Mo, "./src/dns/dns.js": wo, "./src/ens/ens.js": Ho, "./src/farcaster/farcaster.js": qo, "./src/github/github.js": Qo, "./src/lastfm/lastfm.js": Xo, "./src/matrix/matrix.js": zo, "./src/nostr/nostr.js": el, "./src/steam/steam.js": sl, "./src/telegram/telegram.js": rl, "./src/trakt/trakt.js": ol }), ll = {};
for (const e in Ku) {
  const t = e.split("/")[2];
  ll[t] = Ku[e].default;
}
export {
  ll as default
};
