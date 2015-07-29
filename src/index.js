"use strict";

var isInteger = require("is-integer");
var matrix = require('ml-matrix');

/**
 * Savitzky-Golay filter
 * @param {Array <number>} y
 * @param {number} dx
 * @constructor
 */
function SavitzkyGolay (y, dx) {
    this.data = y;
    this.h = dx
}

var defaultOptions = {
    windSize: 5,
    deriv: 1,
    pol: 2
};

/**
 * Applies the filter
 * @param options
 * @returns {Array}
 */
SavitzkyGolay.prototype.calc = function (options) {
    options = options || {};
    this.options = {};
    for (var o in defaultOptions) {
        if (options.hasOwnProperty(o)) {
            this.options[o] = options[o];
        } else {
            this.options[o] = defaultOptions[o];
        }
    }
    if ((this.options.windSize % 2 === 0) || (this.options.windSize < 5))
        throw new RangeError('Invalid window size');
    if ((this.options.deriv < 0) || (this.options.pol < 1))
        throw new RangeError('Number too small');
    if (!(isInteger(this.options.pol)) || !(isInteger(this.options.deriv)) || !(isInteger(this.options.windSize)))
        throw new TypeError('Only integers allowed');

    var C, norm;
    var ans =  new Array(this.data.length);
    if ((this.options.windSize === 5) && (this.options.pol === 2) && ((this.options.deriv === 1) || (this.options.deriv === 2))) {
        if (this.options.deriv === 1) {
            C = [-2,-1,0,1,2];
            norm = 10;
        }
        else {
            C = [2, -1, -2, -1, 2];
            norm = 7;
        }
    }
    else {
        var J = new Array(this.options.windSize);
        for (var i = 0; i < J.length; i++) {
            J[i] = new Array(this.options.pol + 1);
            var inic = -(this.options.windSize - 1) / 2;
            for (var j = 0; j < J[i].length; j++) {
                if ((inic + 1 === 0) && (j === 0))
                    J[i][j] = 1;
                else
                    J[i][j] = Math.pow((inic + i), j);
            }
        }
        var Jmatrix = new matrix(J);
        var Jtranspose = Jmatrix.transpose();
        var Jinv = (Jtranspose.mmul(Jmatrix)).inverse();
        C = Jinv.mmul(Jtranspose);
        C = C[this.options.deriv];
        norm = 1;
    }
    for (var k = Math.ceil(this.options.windSize / 2); k < (ans.length - Math.floor(this.options.windSize / 2)); k++) {
        var d = 0;
        for (var l = 0; l < C.length; l++) {
            d += C[l] * this.data[l + k - Math.floor(this.options.windSize / 2)] / (norm * Math.pow(this.h, this.options.deriv));
        }
        ans[k] = d;
    }
    for (var a = 0; a < Math.ceil(this.options.windSize / 2); a++)
        ans[a] = ans[Math.ceil(this.options.windSize / 2)];
    for (var b = (ans.length - Math.floor(this.options.windSize / 2)); b < ans.length; b++)
        ans[b] = ans[(ans.length - Math.floor(this.options.windSize / 2)) - 1];
    return ans;
};

module.exports = SavitzkyGolay;