const https = require('https');
const { readFileSync } = require('fs');
//format
// https://datafeed.dukascopy.com/datafeed/TSLAUSUSD/2022/06/18/15h_ticks.bi5

// e is byte data
// d is "i" for int, "f" for float
let oP = function (b, c, f, k) { for (var l = 0; l < f; b[c + l] = k[l] ? k[l] : 0, l++); }
let lP = function (b, c, f) { return [b.slice(c, c + f)] }
let qP = function (b, c, f, k) { for (var l, m = 0; m < f; b[c + m] = (l = k.charCodeAt(m)) ? l : 0, m++); }
let nP = function (b, c, f) { for (var k = Array(f), l = 0; l < f; k[l] = String.fromCharCode(b[c + l]), l++); return k.join("") }
let pP = function (b, c, f) { b[c] = f.charCodeAt(0) }
let mP = function (b, c) { return String.fromCharCode(b[c]) }
let ek = function (d, e, f) { var k = c ? b.Ue - 1 : 0, l = c ? -1 : 1, m = k + l * b.Ue; for (f = f < b.min ? b.min : f > b.max ? b.max : f; k != m; d[e + k] = f & 255, k += l, f >>= 8); }
let dk = function (d, e) { var f = c ? b.Ue - 1 : 0, k = c ? -1 : 1, l = f + k * b.Ue, m, p; m = 0; for (p = 1; f != l; m += d[e + f] * p, f += k, p *= 256); b.jk && m & Math.pow(2, 8 * b.Ue - 1) && (m -= Math.pow(2, 8 * b.Ue)); return m }
let UB = function (d, e, f) {
    var k, l, m, p, q, r, u; r = b.$r; u = 8 * b.Ue - b.$r - 1; p = (1 << u) - 1; m = p >> 1;
    k = 0 > f ? 1 : 0; f = Math.abs(f); isNaN(f) || Infinity == f ? (f = isNaN(f) ? 1 : 0, l = p) : (l = Math.floor(Math.log(f) / Math.LN2), 1 > f * (q = Math.pow(2, -l)) && (l--, q *= 2),
        f = 1 <= l + m ? f + b.Az / q : f + b.Az * Math.pow(2, 1 - m), 2 <= f * q && (l++, q /= 2),
        l + m >= p ? (f = 0, l = p) : 1 <= l + m ? (f = (f * q - 1) * Math.pow(2, r), l += m) : (f = f * Math.pow(2, m - 1) * Math.pow(2, r), l = 0));
    m = c ? b.Ue - 1 : 0;
    for (p = c ? -1 : 1; 8 <= r; d[e + m] = f & 255, m += p, f /= 256, r -= 8); l = l << r | f; for (u += r; 0 < u; d[e + m] = l & 255, m += p, l /= 256, u -= 8);
    d[e + m - p] |= 128 * k
}
let RB = function (d, e) {
    var f, k, l, m, p, q, r, u, t; r = b.$r; l = 8 * b.Ue - b.$r - 1; t = (1 << l) - 1; u = t >> 1; m = c ? 0 : b.Ue - 1;
    p = c ? 1 : -1; f = d[e + m]; m += p; q = -7; k = f & (1 << -q) - 1; f >>= -q; for (q += l; 0 < q; k = 256 * k + d[e + m],
        m += p, q -= 8); l = k & (1 << -q) - 1; k >>= -q; for (q += r; 0 < q; l = 256 * l + d[e + m], m += p, q -= 8)
        ;
    switch (k) {
        case 0:
            k = 1 - u;
            break;
        case t:
            return l ? NaN : Infinity * (f ? -1 : 1);
        default:
            l += Math.pow(2, r), k = k - u
    }
    return (f ? -1 : 1) * l * Math.pow(2, k - r)
}

let WB = {
    A: { a: oP, tg: lP },
    s: { a: qP, tg: nP },
    c: { a: pP, tg: mP },
    b: { a: ek, tg: dk, Ue: 1, jk: !0, min: -Math.pow(2, 7), max: Math.pow(2, 7) - 1 },
    B: { a: ek, tg: dk, Ue: 1, jk: !1, min: 0, max: Math.pow(2, 8) - 1 },
    h: { a: ek, tg: dk, Ue: 2, jk: !0, min: -Math.pow(2, 15), max: Math.pow(2, 15) - 1 },
    H: { a: ek, tg: dk, Ue: 2, jk: !1, min: 0, max: Math.pow(2, 16) - 1 },
    i: { a: ek, tg: dk, Ue: 4, jk: !0, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 },
    I: { a: ek, tg: dk, Ue: 4, jk: !1, min: 0, max: Math.pow(2, 32) - 1 },
    l: { a: ek, tg: dk, Ue: 4, jk: !0, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 },
    L: { a: ek, tg: dk, Ue: 4, jk: !1, min: 0, max: Math.pow(2, 32) - 1 },
    f: { a: UB, tg: RB, Ue: 4, $r: 23, Az: Math.pow(2, -24) - Math.pow(2, -77) },
    d: { a: UB, tg: RB, Ue: 8, $r: 52, Az: 0 },
    D: { a: ek, tg: dk, Ue: 8, jk: !0, min: -Math.pow(2, 63), max: Math.pow(2, 63) - 1 }
};

function lM() { }
lM.prototype.init = function () {
    var b = 5;
    this.g = 0;
    for (this.a = -1; b--;)
        this.g = this.g << 8 | this.j.tf()
}

function iM(b) {
    var c = b.a - b.w;
    if (0 !== c) {
        for (; c--;)
            b.j.rq(b.u[b.w++]);
        b.a >= b.g && (b.a = 0);
        b.w = b.a
    }
}

function jM(b, c) {
    iM(b);
    b.j = null;
    b.j = c
}

function hM() {
    this.g = 0
}

hM.prototype.init = function (b) {
    b || (this.a = this.w = 0)
}
function mM(b, c, d) {
    var e = c[d]
        , f = (b.a >>> 11) * e;
    if ((b.g ^ 2147483648) < (f ^ 2147483648))
        return b.a = f,
            c[d] += 2048 - e >>> 5,
            0 === (b.a & 4278190080) && (b.g = b.g << 8 | b.j.tf(),
                b.a <<= 8),
            0;
    b.a -= f;
    b.g -= f;
    c[d] -= e >>> 5;
    0 === (b.a & 4278190080) && (b.g = b.g << 8 | b.j.tf(),
        b.a <<= 8);
    return 1
}
function nM(b, c) {
    for (; c--;)
        b[c] = 1024
}

function oM(b) {
    this.g = [];
    this.a = b
}
oM.prototype.init = function () {
    nM(this.g, 1 << this.a)
}
    ;
oM.prototype.decode = function (b) {
    for (var c = 1, d = this.a; d--;)
        c = c << 1 | mM(b, this.g, c);
    return c - (1 << this.a)
}

function pM() {
    this.g = [];
    this.j = [];
    this.u = [];
    this.w = new oM(8);
    this.a = 0
}
function sM() { }
sM.prototype.init = function () {
    for (var b = 1 << this.a + this.j; b--;)
        this.g[b].init()
}
pM.prototype.init = function () {
    var b = this.a;
    for (nM(this.g, 2); b--;)
        this.j[b].init(),
            this.u[b].init();
    this.w.init()
}
    ;
pM.prototype.decode = function (b, c) {
    return 0 === mM(b, this.g, 0) ? this.j[c].decode(b) : 0 === mM(b, this.g, 1) ? 8 + this.u[c].decode(b) : 16 + this.w.decode(b)
}

function rM() {
    this.a = []
}
rM.prototype.init = function () {
    nM(this.a, 768)
}

function Eb(b) {
    this.data = b || [];
    this.mode = typeof this.data;
    this.offset = 0
}
h = Eb.prototype;
h.tf = function () {
    return "string" == this.mode ? this.data.charCodeAt(this.offset++) & 255 : this.data[this.offset++]
}
    ;
h.rq = function (b) {
    if ("string" == this.mode)
        throw "Byte writing in string streams not implemented!";
    return this.data[this.offset++] = b
}
    ;
h.reset = function () {
    this.offset = 0
}
    ;
h.clear = function () {
    this.data.length = 0;
    this.reset()
}
    ;
h.toString = function () {
    for (var b = "", c = 0; c < this.data.length; c++)
        16 > this.data[c] && (b += "0"),
            b += this.data[c].toString(16) + " ";
    return b
}
    ;
h.oq = function () {
    return this.data
}

function YL(b, c, d) {
    b.Xl = !0;
    b.Of = d;
    b.Hr = !c;
    ZL(b)
}
function ZL(b) {
    if (b.zw && b.Xl && dM(b)) {
        var c = b.zw
            , d = eM[c];
        d && (da.clearTimeout(d.qb),
            delete eM[c]);
        b.zw = 0
    }
    b.Mb && (b.Mb.vt--,
        delete b.Mb);
    for (var c = b.Of, e = d = !1; b.Un.length && !b.ix;) {
        var f = b.Un.shift()
            , k = f[0]
            , l = f[1]
            , f = f[2];
        if (k = b.Hr ? l : k)
            try {
                var m = k.call(f || b.jD, c);
                ea(m) && (b.Hr = b.Hr && (m == c || m instanceof Error),
                    b.Of = c = m);
                if (Xg(c) || "function" === typeof da.Promise && c instanceof da.Promise)
                    e = !0,
                        b.ix = !0
            } catch (p) {
                c = p,
                    b.Hr = !0,
                    dM(b) || (d = !0)
            }
    }
    b.Of = c;
    e && (m = v(b.tC, b, !0),
        e = v(b.tC, b, !1),
        c instanceof WL ? (eE(c, m, e),
            c.EP = !0) : c.then(m, e));
    d && (c = new fM(c),
        eM[c.qb] = c,
        b.zw = c.qb)
}

function $L(b) {
    if (b.Xl) {
        if (!b.fA)
            throw new aM;
        b.fA = !1
    }
}

function va(b, c, d) {
    return b.call.apply(b.bind, arguments)
}

function kM(b, c) {
    var d = b.a - c - 1;
    0 > d && (d += b.g);
    return b.u[d]
}


function WL(b, c) {
    this.Un = [];
    this.vG = b;
    this.jD = c || null;
    this.Hr = this.Xl = !1;
    this.Of = void 0;
    this.fA = this.EP = this.ix = !1;
    this.zw = 0;
    this.Mb = null;
    this.vt = 0
}
h = WL.prototype;
h.cancel = function (b) {
    if (this.Xl)
        this.Of instanceof WL && this.Of.cancel();
    else {
        if (this.Mb) {
            var c = this.Mb;
            delete this.Mb;
            b ? c.cancel(b) : (c.vt--,
                0 >= c.vt && c.cancel())
        }
        this.vG ? this.vG.call(this.jD, this) : this.fA = !0;
        this.Xl || this.vg(new XL)
    }
}
h.tC = function (b, c) {
    this.ix = !1;
    YL(this, b, c)
}
h.rd = function (b) {
    $L(this);
    YL(this, !0, b)
}

h.vg = function (b) {
    $L(this);
    YL(this, !1, b)
}

function qM(b, c) {
    for (; b.a < c; ++b.a)
        b.j[b.a] = new oM(3),
            b.u[b.a] = new oM(3)
}

var Db = new function () {
    var b, c = !1;
    this.lP = function (b, c, f) { return [b.slice(c, c + f)] };
    this.oP = function (b, c, f, k) { for (var l = 0; l < f; b[c + l] = k[l] ? k[l] : 0, l++); };
    this.mP = function (b, c) { return String.fromCharCode(b[c]) };
    this.pP = function (b, c, f) { b[c] = f.charCodeAt(0) };
    this.dk = function (d, e) { var f = c ? b.Ue - 1 : 0, k = c ? -1 : 1, l = f + k * b.Ue, m, p; m = 0; for (p = 1; f != l; m += d[e + f] * p, f += k, p *= 256); b.jk && m & Math.pow(2, 8 * b.Ue - 1) && (m -= Math.pow(2, 8 * b.Ue)); return m };
    this.ek = function (d, e, f) { var k = c ? b.Ue - 1 : 0, l = c ? -1 : 1, m = k + l * b.Ue; for (f = f < b.min ? b.min : f > b.max ? b.max : f; k != m; d[e + k] = f & 255, k += l, f >>= 8); };

    this.nP = function (b, c, f) { for (var k = Array(f), l = 0; l < f; k[l] = String.fromCharCode(b[c + l]), l++); return k.join("") };
    this.qP = function (b, c, f, k) { for (var l, m = 0; m < f; b[c + m] = (l = k.charCodeAt(m)) ? l : 0, m++); };
    this.RB = function (d, e) { var f, k, l, m, p, q, r, u, t; r = b.$r; l = 8 * b.Ue - b.$r - 1; t = (1 << l) - 1; u = t >> 1; m = c ? 0 : b.Ue - 1; p = c ? 1 : -1; f = d[e + m]; m += p; q = -7; k = f & (1 << -q) - 1; f >>= -q; for (q += l; 0 < q; k = 256 * k + d[e + m], m += p, q -= 8); l = k & (1 << -q) - 1; k >>= -q; for (q += r; 0 < q; l = 256 * l + d[e + m], m += p, q -= 8); switch (k) { case 0: k = 1 - u; break; case t: return l ? NaN : Infinity * (f ? -1 : 1); default: l += Math.pow(2, r), k = k - u }        return (f ? -1 : 1) * l * Math.pow(2, k - r) };
    this.UB = function (d, e, f) { var k, l, m, p, q, r, u; r = b.$r; u = 8 * b.Ue - b.$r - 1; p = (1 << u) - 1; m = p >> 1; k = 0 > f ? 1 : 0; f = Math.abs(f); isNaN(f) || Infinity == f ? (f = isNaN(f) ? 1 : 0, l = p) : (l = Math.floor(Math.log(f) / Math.LN2), 1 > f * (q = Math.pow(2, -l)) && (l--, q *= 2), f = 1 <= l + m ? f + b.Az / q : f + b.Az * Math.pow(2, 1 - m), 2 <= f * q && (l++, q /= 2), l + m >= p ? (f = 0, l = p) : 1 <= l + m ? (f = (f * q - 1) * Math.pow(2, r), l += m) : (f = f * Math.pow(2, m - 1) * Math.pow(2, r), l = 0)); m = c ? b.Ue - 1 : 0; for (p = c ? -1 : 1; 8 <= r; d[e + m] = f & 255, m += p, f /= 256, r -= 8); l = l << r | f; for (u += r; 0 < u; d[e + m] = l & 255, m += p, l /= 256, u -= 8); d[e + m - p] |= 128 * k };
    this.tP = "(\\d+)?([AxcbBhHsfdDiIlL])";
    this.sP = { A: 1, x: 1, c: 1, b: 1, B: 1, h: 2, H: 2, s: 1, f: 4, d: 8, D: 8, i: 4, I: 4, l: 4, L: 4 };
    this.WB = { A: { a: this.oP, tg: this.lP }, s: { a: this.qP, tg: this.nP }, c: { a: this.pP, tg: this.mP }, b: { a: this.ek, tg: this.dk, Ue: 1, jk: !0, min: -Math.pow(2, 7), max: Math.pow(2, 7) - 1 }, B: { a: this.ek, tg: this.dk, Ue: 1, jk: !1, min: 0, max: Math.pow(2, 8) - 1 }, h: { a: this.ek, tg: this.dk, Ue: 2, jk: !0, min: -Math.pow(2, 15), max: Math.pow(2, 15) - 1 }, H: { a: this.ek, tg: this.dk, Ue: 2, jk: !1, min: 0, max: Math.pow(2, 16) - 1 }, i: { a: this.ek, tg: this.dk, Ue: 4, jk: !0, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 }, I: { a: this.ek, tg: this.dk, Ue: 4, jk: !1, min: 0, max: Math.pow(2, 32) - 1 }, l: { a: this.ek, tg: this.dk, Ue: 4, jk: !0, min: -Math.pow(2, 31), max: Math.pow(2, 31) - 1 }, L: { a: this.ek, tg: this.dk, Ue: 4, jk: !1, min: 0, max: Math.pow(2, 32) - 1 }, f: { a: this.UB, tg: this.RB, Ue: 4, $r: 23, Az: Math.pow(2, -24) - Math.pow(2, -77) }, d: { a: this.UB, tg: this.RB, Ue: 8, $r: 52, Az: 0 }, D: { a: this.ek, tg: this.dk, Ue: 8, jk: !0, min: -Math.pow(2, 63), max: Math.pow(2, 63) - 1 } };
    this.rP = function (c, e, f, k) { for (var l = b.tg, m = [], p = 0; p < c; m.push(l(f, k + p * e)), p++); return m };
    this.yf = function (d, e, f) {
        c = "<" != d.charAt(0);
        f = f ? f : 0;
        for (var k = new RegExp(this.tP, "g"), l, m, p, q = []; l = k.exec(d);) {
            m = void 0 == l[1] || "" == l[1] ? 1 : parseInt(l[1]);
            p = this.sP[l[2]];
            if (f + m * p > e.length)
                return;
            switch (l[2]) {
                case "A":
                case "s":
                    q.push(this.WB[l[2]].tg(e, f, m));
                    break;
                case "c":
                case "b":
                case "B":
                case "h":
                case "H":
                case "i":
                case "I":
                case "l":
                case "L":
                case "f":
                case "d":
                case "D":
                    b = this.WB[l[2]],
                        q.push(this.rP(m, p, e, f))
            }
            f += m * p
        }
        return Array.prototype.concat.apply([], q)
    }
}

function tM() {
    this.u = new hM;
    this.g = new lM;
    this.oc = [];
    this.uc = [];
    this.$g = [];
    this.Wc = [];
    this.cd = [];
    this.tc = [];
    this.C = [];
    this.kd = [];
    this.jd = new oM(4);
    this.Ka = new pM;
    this.eb = new pM;
    this.bb = new sM;
    this.Ha = this.za = -1;
    this.C[0] = new oM(6);
    this.C[1] = new oM(6);
    this.C[2] = new oM(6);
    this.C[3] = new oM(6)
}

tM.prototype.init = function () {
    var b = 4;
    this.u.init(!1);
    nM(this.oc, 192);
    nM(this.tc, 192);
    nM(this.uc, 12);
    nM(this.$g, 12);
    nM(this.Wc, 12);
    nM(this.cd, 12);
    nM(this.kd, 114);
    for (this.bb.init(); b--;)
        this.C[b].init();
    this.Ka.init();
    this.eb.init();
    this.jd.init();
    this.g.init()
}

tM.prototype.ea = function () {
    while (this.F < this.xa) {
        var c;
        a: {
            this.la = this.F & this.Fd;
            if (0 === mM(this.g, this.oc, (this.j << 4) + this.la)) {
                c = this.bb;
                var d = this.F++;
                this.ld = c.g[((d & c.u) << c.a) + ((this.ra & 255) >>> 8 - c.a)];
                if (7 <= this.j) {
                    c = this.ld;
                    var d = this.g
                        , e = kM(this.u, this.a)
                        , f = 1
                        , k = void 0
                        , l = void 0;
                    do
                        if (k = e >> 7 & 1,
                            e <<= 1,
                            l = mM(d, c.a, (1 + k << 8) + f),
                            f = f << 1 | l,
                            k !== l) {
                            for (; 256 > f;)
                                f = f << 1 | mM(d, c.a, f);
                            break
                        }
                    while (256 > f);
                    c = f & 255
                } else {
                    c = this.ld;
                    d = this.g;
                    e = 1;
                    do
                        e = e << 1 | mM(d, c.a, e);
                    while (256 > e);
                    c = e & 255
                }
                this.ra = c;
                c = this.u;
                d = this.ra;
                c.u[c.a++] = d;
                c.a >= c.g && iM(c);
                this.j = 4 > this.j ? 0 : this.j - (10 > this.j ? 3 : 6)
            } else {
                if (1 === mM(this.g, this.uc, this.j))
                    this.w = 0,
                        0 === mM(this.g, this.$g, this.j) ? 0 === mM(this.g, this.tc, (this.j << 4) + this.la) && (this.j = 7 > this.j ? 9 : 11,
                            this.w = 1) : (0 === mM(this.g, this.Wc, this.j) ? this.Db = this.U : (0 === mM(this.g, this.cd, this.j) ? this.Db = this.$ : (this.Db = this.Nb,
                                this.Nb = this.$),
                                this.$ = this.U),
                                this.U = this.a,
                                this.a = this.Db),
                        0 === this.w && (this.w = 2 + this.eb.decode(this.g, this.la),
                            this.j = 7 > this.j ? 8 : 11);
                else if (this.Nb = this.$,
                    this.$ = this.U,
                    this.U = this.a,
                    this.w = 2 + this.Ka.decode(this.g, this.la),
                    this.j = 7 > this.j ? 7 : 10,
                    this.P = this.C[5 >= this.w ? this.w - 2 : 3].decode(this.g),
                    4 <= this.P)
                    if (this.Bb = (this.P >> 1) - 1,
                        this.a = (2 | this.P & 1) << this.Bb,
                        14 > this.P) {
                        c = this.a;
                        for (var d = this.kd, e = this.a - this.P - 1, f = this.g, k = this.Bb, l = 1, m = 0, p = 0, q = void 0; p < k; ++p)
                            q = mM(f, d, e + l),
                                l = l << 1 | q,
                                m |= q << p;
                        this.a = c + m
                    } else {
                        c = this.a;
                        d = this.g;
                        e = 0;
                        f = this.Bb - 4;
                        for (k = void 0; f--;)
                            d.a >>>= 1,
                                k = d.g - d.a >>> 31,
                                d.g -= d.a & k - 1,
                                e = e << 1 | 1 - k,
                                0 === (d.a & 4278190080) && (d.g = d.g << 8 | d.j.tf(),
                                    d.a <<= 8);
                        c = this.a = c + (e << 4);
                        d = this.jd;
                        e = this.g;
                        f = 1;
                        l = k = 0;
                        for (m = void 0; l < d.a; ++l)
                            m = mM(e, d.g, f),
                                f = f << 1 | m,
                                k |= m << l;
                        this.a = c + k;
                        if (0 > this.a) {
                            c = -1 === this.a ? void 0 : !1;
                            break a
                        }
                    }
                else
                    this.a = this.P;
                if (this.a >= this.F || this.a >= this.Ha) {//this.F =1,
                    c = !1;
                    break a
                }
                c = this.u;
                d = this.w;
                e = c.a - this.a - 1;
                for (0 > e && (e += c.g); d--;)
                    e >= c.g && (e = 0),
                        c.u[c.a++] = c.u[e++],
                        c.a >= c.g && iM(c);
                this.F += this.w;
                this.ra = kM(this.u, 0)
            }
            c = void 0
        }
        !1 === c && this.ua.vg(!1)
    }
}

tM.prototype.decode = function (b, c, d) {
    this.ra = this.F = this.Nb = this.$ = this.U = this.a = this.j = 0;
    this.xa = d;
    this.g.j = b;
    jM(this.u, c);
    this.init();
    this.ua = new WL;
    this.ea = va(this.ea, this);
    this.ea();
    this.rb = 0;
    var j1 = 1
    let results = []
    while (this.rb < this.u.u.length) {
        let d = [this.startTime + 1 * Db.yf("i", this.u.u, this.rb + 0), Db.yf("i", this.u.u, this.rb + 8) / 10 * this.wb, Db.yf("i", this.u.u, this.rb + 4) / 10 * this.wb, parseFloat((Db.yf("f", this.u.u, this.rb + 16)[0] * j1).toFixed(4)), parseFloat((Db.yf("f", this.u.u, this.rb + 12)[0] * j1).toFixed(4))]
        this.rb += 20;
        results.push(d)
    }
    return results
}


function send_HTTP_req(body, type, host, route) { //type = GET, POST   
    return new Promise((re, rj) => {
        let post_options = {
            host: host,
            port: 443,
            path: '/' + route,
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': '*/*'
            }
        };

        // Set up the request
        let post_req = https.get(post_options, function (res) {
            let sss = [];
            //res.setEncoding('utf8');
            res.on('data', function (chunk) {
                //console.log('Response: ' + chunk);
                sss = sss.concat(chunk)
            });
            res.on('end', () => {
                let sss1 = Buffer.concat(sss);
                t1 = new tM
                t1.a = 0
                t1.w = 0

                b = new Eb
                b.data = Array.from(sss1)
                b.offset = 0

                d = new tM;

                f = b.tf();
                var e1 = f % 9;
                f = ~~(f / 9);
                var k = f % 5
                    , l = ~~(f / 5);
                f = 1 << l;

                if (8 < e1 || 4 < k || 4 < l)
                    e1 = !1;
                else {
                    l = d.bb;
                    if (!l.g || l.a !== e1 || l.j !== k)
                        for (l.j = k,
                            l.u = (1 << k) - 1,
                            l.a = e1,
                            l.g = [],
                            e1 = 1 << l.a + l.j; e1--;)
                            l.g[e1] = new rM;
                    qM(d.Ka, f);
                    qM(d.eb, f);
                    d.Fd = f - 1;
                    e1 = !0
                }

                e1 ? (e1 = b.tf(),
                    e1 |= b.tf() << 8,
                    e1 |= b.tf() << 16,
                    e1 += 16777216 * b.tf(),
                    0 > e1 ? e1 = !1 : (d.za !== e1 && (d.za = e1,
                        d.Ha = Math.max(d.za, 1),
                        e1 = d.u,
                        k = Math.max(d.Ha, 4096),
                        e1.u && e1.g === k || (e1.u = []),
                        e1.g = k,
                        e1.a = 0,
                        e1.w = 0),
                        e1 = !0)) : e1 = !1

                e1 = b.tf();
                e1 |= b.tf() << 8;
                e1 |= b.tf() << 16;
                e1 += 16777216 * b.tf();
                b.tf();
                b.tf();
                b.tf();
                b.tf();
                c = new Eb
                let rows = d.decode(b, c, e1);
                re(rows);
            })
        })
        post_req.end();
    });
}

function decodeBinary(sss, historicalFilename, yyyy, mm, dd, hh) {
    let meta = JSON.parse(readFileSync("meta.json"))
    let instruments = meta.instruments
    let pipValue = 1
    let keys = Object.keys(instruments)
    for (let ii = 0; ii < keys.length; ii++) {
        let k = keys[ii]
        if (instruments[k]['historical_filename'] === historicalFilename) {
            pipValue = instruments[k]['pipValue']
            break;
        }
    }


    let sss1 = Buffer.concat(sss);

    b = new Eb
    b.data = Array.from(sss1)
    b.offset = 0

    d = new tM;
    d.wb = pipValue
    mm = '' + (+(mm) + 1)
    mm = mm.length == 1 ? '0' + mm : mm

    d.startTime = Date.parse(mm + '/' + dd + '/' + yyyy + ' ' + hh + ':00:00 GMT')

    f = b.tf();
    var e1 = f % 9;
    f = ~~(f / 9);
    var k = f % 5
        , l = ~~(f / 5);
    f = 1 << l;

    if (8 < e1 || 4 < k || 4 < l)
        e1 = !1;
    else {
        l = d.bb;
        if (!l.g || l.a !== e1 || l.j !== k)
            for (l.j = k,
                l.u = (1 << k) - 1,
                l.a = e1,
                l.g = [],
                e1 = 1 << l.a + l.j; e1--;)
                l.g[e1] = new rM;
        qM(d.Ka, f);
        qM(d.eb, f);
        d.Fd = f - 1;
        e1 = !0
    }

    e1 ? (e1 = b.tf(),
        e1 |= b.tf() << 8,
        e1 |= b.tf() << 16,
        e1 += 16777216 * b.tf(),
        0 > e1 ? e1 = !1 : (d.za !== e1 && (d.za = e1,
            d.Ha = Math.max(d.za, 1),
            e1 = d.u,
            k = Math.max(d.Ha, 4096),
            e1.u && e1.g === k || (e1.u = []),
            e1.g = k,
            e1.a = 0,
            e1.w = 0),
            e1 = !0)) : e1 = !1

    e1 = b.tf();
    e1 |= b.tf() << 8;
    e1 |= b.tf() << 16;
    e1 += 16777216 * b.tf();
    b.tf();
    b.tf();
    b.tf();
    b.tf();
    c = new Eb
    let rows = d.decode(b, c, e1);
    return rows;
}

module.exports = decodeBinary