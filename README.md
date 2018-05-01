# @ionic/v4-migration-tslint

[![Build Status][circle-badge]][circle-badge-url]
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

An effort to automatically fix syntax changes listed in [BREAKING.md](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md) using tslint + codelyzer.

## Rules

Rules without an **author** and without green checkmarks need some help! See [#contributing-rules](#contributing-rules) to learn how.

| key                                                            | link                                                                          | status                                                         | author                                  |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------- |
| `action-sheet-title-and-subtitle-are-now-header-and-subheader` | [#action-sheet][action-sheet-title-and-subtitle-are-now-header-and-subheader] | :black_square_button: tested<br> :black_square_button: fixable |
| `ion-navbar-is-now-ion-toolbar`                                | [#navbar][ion-navbar-is-now-ion-toolbar]                                      | :white_check_mark: tested<br> :white_check_mark: fixable       | [@cwoolum](https://github.com/cwoolum/) |

[ion-navbar-is-now-ion-toolbar]: https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#navbar
[action-sheet-title-and-subtitle-are-now-header-and-subheader]: https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#action-sheet

## Contributing Rules

TODO

[circle-badge]: https://circleci.com/gh/ionic-team/starters.svg?style=shield
[circle-badge-url]: https://circleci.com/gh/ionic-team/starters
