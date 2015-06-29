# SavitzkyGolay

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

Savitzky–Golay filter in Javascript

This code is based in the article: Savitzky, A., & Golay, M. J. E. (1964). Smoothing and Differentiation of Data by Simplified Least Squares Procedures. Analytical Chemistry, 36(8), 1627–1639.

## Installation

`npm install ml-savitzkyGolay`

## Methods
 
### new SavitzkyGolay(data, dx)

Creates a new Savitzky-Golay filter based in the array of `y` values(`data`) and the difference between `x` dots(`dx`).

### calc([options])

Applies the filter using the current options.

__Options__
* windSize: The amount of dots used to make the filtering evaluation, the default value is 5.
* deriv: The grade for the derivative, the default value is 1.
* pol: The grade of the polynomial function to use for calculation, the default value is 2.

## Test

```js
$ npm install
$ npm test
```

## Authors

- [Miguel Asencio](https://github.com/maasencioh)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-savitzkyGolay.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-savitzkyGolay
[travis-image]: https://img.shields.io/travis/mljs/savitzkyGolay/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/savitzkyGolay
[david-image]: https://img.shields.io/david/mljs/savitzkyGolay.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/savitzkyGolay
[download-image]: https://img.shields.io/npm/dm/ml-savitzkyGolay.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-savitzkyGolay
