# @ionic/v4-migration-tslint

[![Build Status][circle-badge]][circle-badge-url]
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/ionic-team/v4-migration-tslint/badge.svg?branch=master)](https://coveralls.io/github/ionic-team/v4-migration-tslint?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

An effort to automatically fix syntax changes listed in [BREAKING.md](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md) using tslint + codelyzer.

> We are looking for contributors to help build these rules out! We have not released a first version of this package yet but it is coming soon.

## How to use

### Coming Soon!!

~~Using this package is a piece of cake!~~

~~First run `npm i @ionic/v4-migration-tslint --save-dev`. Add a file called `ionic-migration.json` at the root of your project and paste in the following JSON.~~

```
{
  "rulesDirectory": [
    "node_modules/@ionic/v4-migration-tslint"
  ],
  "rules": {
    "action-sheet-title-and-subtitle-are-now-header-and-sub-header": true,
    "ion-navbar-is-now-ion-toolbar": true,
    "alert-title-and-subtitle-are-now-header-and-sub-header": true,
    "ion-tab-title-is-now-label": true,
    "ion-tab-icon-is-now-icon": true,
    "ion-tab-badge-is-now-badge": true,
    "ion-tab-badge-style-is-now-badge-style": true
  }
}
```

~~To lint your project use:~~

~~`./node_modules/.bin/tslint -c ionic-migration.json -p tsconfig.json`~~

## Rules

Rules without an **author** and without green checkmarks need some help! See [#contributing-rules](#contributing-rules) to learn how.

| key                                                                 | link                                                                                                                  | status                                                         | author                                  |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------- |
| `ion-action-sheet-title-and-subtitle-are-now-header-and-sub-header` | [#action-sheet](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#action-sheet)                     | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |
| `ion-alert-title-and-subtitle-are-now-header-and-sub-header`        | [#alert](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#alert)                                   | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |
| `ion-back-button-is-no-longer-added-to-navigation-bar`              | [#back-button](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#back-button)                       | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-button-is-now-an-element`                                      | [#button](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#button)                                 | :white_check_mark: tested<br> :black_square_button: fixable    | [@cwoolum](https://github.com/cwoolum/) |
| `ion-button-attributes-are-renamed`                                 | [#attributes-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#attributes-renamed)         | :white_check_mark: tested<br> :black_square_button: fixable    | [@cwoolum](https://github.com/cwoolum/) |
| `ion-chip-markup-has-changed`                                       | [#chip](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#chip)                                     | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-datetime-class-has-been-renamed`                               | [#datetime](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#datetime)                             | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-fab-markup-has-changed`                                        | [#fab-markup-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#markup-changed-2)           | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-fab-attributes-have-changed`                                   | [#fab-attributes-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#attributes-renamed-1)   | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-fab-fixed-context-must-be-in-a-fixed-slot`                     | [#fixed-content](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#fixed-content)                   | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-icon-is-active-property-has-been-removed`                      | [#property-removed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#property-removed)             | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-input-sass-variables-have-been-renamed`                        | [#input](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#input)                                   | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-markup-has-changed`                                       | [#item-markup-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#markup-changed-3)          | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-label-is-now-required`                                    | [#item-label-required](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#label-required)            | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-detail-push-is-now-a-single-property`                     | [#item-detail-push](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#detail-push)                  | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-divider-now-requires-label`                               | [#divider-requires-label](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#label-required-1)       | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-options-are-now-start-and-end`                            | [#item-options-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#attributes-renamed-3)     | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-sliding-markup-has-changed`                               | [#item-sliding-markup-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#markup-changed-4)  | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-item-sliding-method-renamed`                                   | [#item-sliding-method-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#method-renamed)    | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-list-header-label-now-required`                                | [#list-header-label-required](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#label-required-2)   | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-menu-toggle-markup-changed`                                    | [#menu-toggle-markup-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#markup-changed-5)   | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-nav-method-renamed`                                            | [#nav-method-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#method-renamed-1)           | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-navbar-is-now-ion-toolbar`                                     | [#navbar](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#navbar)                                 | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |
| `ion-option-markup-has-changed`                                     | [#option-markup-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#markup-changed-6)        | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-option-class-has-changed`                                      | [#option-class-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#class-changed)            | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-radio-slot-required`                                           | [#radio-slot-required](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#slot-required)             | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-radio-group-is-now-an-element`                                 | [#radio-group](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#radio-group)                       | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-range-attributes-renamed`                                      | [#range-attributes-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#attributes-renamed-4) | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-select-attributes-are-renamed`                                 | [#select-attributes-renamed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#select)              | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-spinner-name-is-changed`                                       | [#spinner-name-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#name-changed)             | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-text-must-now-wrap-elements`                                   | [#text-markup-changed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#markup-changed-7)          | :black_square_button: tested<br> :black_square_button: fixable |                                         |
| `ion-tab-title-is-now-label`                                        | [#tabs](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#tabs)                                     | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |
| `ion-tab-icon-is-now-icon`                                          | [#tabs](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#tabs)                                     | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |
| `ion-tab-badge-is-now-badge`                                        | [#tabs](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#tabs)                                     | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |
| `ion-tab-badge-style-is-now-badge-style`                            | [#tabs](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#tabs)                                     | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |

### Not Covered

Some changes are not covered by this fixer due to their complexity or because it would make no sense to do in automated fashion. They are

[#colors](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#colors)
[#dynamic-mode](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#dynamic-mode)
[#icon-fonts-removed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#icon)
[#theming](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#theming)

## Contributing Rules

You **must** use the conventional changelog standard. Install [commitizen](https://github.com/commitizen/cz-cli#installing-the-command-line-tool) and use `git cz` instead of `git commit` OR use `npm run cz` to make commits.

[circle-badge]: https://circleci.com/gh/ionic-team/v4-migration-tslint.svg?style=shield
[circle-badge-url]: https://circleci.com/gh/ionic-team/v4-migration-tslint
