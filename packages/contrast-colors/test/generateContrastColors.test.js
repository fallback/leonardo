/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { generateContrastColors } from '../index.js';

// Test simple generation in all color spaces
test('should generate 2 colors (CAM02 interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'CAM02'});;

  expect(colors).toEqual([ '#5490e0', '#2c66f1' ]);

});

test('should generate 2 colors (LAB interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'LAB'});;

  expect(colors).toEqual([ '#7383ff', '#435eff' ]);
});

test('should generate 2 colors (LCH interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'LCH'});;

  expect(colors).toEqual([ '#008fff', '#0065ff' ]);
});

test('should generate 2 colors (HSL interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'HSL'});;

  expect(colors).toEqual([ '#478cfe', '#2d62ff' ]);
});

test('should generate 2 colors (HSLuv interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'HSLuv'});;

  expect(colors).toEqual([ '#1896dc', '#066aea' ]);
});

test('should generate 2 colors (HSV interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'HSV'});;

  expect(colors).toEqual([ '#478cff', '#2d62ff' ]);
});

test('should generate 2 colors (RGB interpolation)', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5', ratios: [3, 4.5], colorspace: 'RGB'});;

  expect(colors).toEqual([ '#5988ff', '#3360ff' ]);
});

test('should generate 2 colors on dark background', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: "#323232",ratios: [3, 4.5], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#0074ff', '#009fff' ]);
});

// Check bidirectionality of contrast ratios (positive vs negative)
test('should generate 2 colors with bidirectional contrast (light background)', function() {
  let colors = generateContrastColors({colorKeys: ["#012676"], base: "#D8D8D8",ratios: [-1.25,4.5], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#efeff6', '#56599a' ]);
});

test('should generate 2 colors with bidirectional contrast (dark background)', function() {
  let colors = generateContrastColors({colorKeys: ["#012676"], base: "#323232",ratios: [-1.25,4.5], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#101c51', '#9695c0' ]);
});

// Contrast gamuts
test('should generate black when ratio darker than available colors', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: "#d8d8d8",ratios: [21], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#000000' ]);
});

test('should generate white when ratio lighter than available colors', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: "#323232",ratios: [21], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#ffffff' ]);
});

test('should generate white when negative ratio lighter than available colors', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: "#f5f5f5",ratios: [-21], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#ffffff' ]);
});

test('should generate black when negative ratio lighter than available colors', function() {
  let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: "#323232",ratios: [-21], colorspace: "LCH"}); // positive & negative ratios

  expect(colors).toEqual([ '#000000' ]);
});

// Expected errors
test('should generate no colors, missing colorKeys', function() {
  expect(
    () => {
      let colors = generateContrastColors({base: '#f5f5f5', ratios: [3, 4.5]}) // no key colors
    }
  ).toThrow();
});

test('should generate no colors, missing ratios', function() {

  expect(
    () => {
      let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], base: '#f5f5f5'}) // no ratios
    }
  ).toThrow();
});

test('should generate no colors, missing base', function() {
  expect(
    () => {
      let colors = generateContrastColors({colorKeys: ['#2451FF', '#C9FEFE', '#012676'], ratios: [3, 4.5]}) // no base
    }
  ).toThrow();
});
