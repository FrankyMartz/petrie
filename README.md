# <Project Title>

# Table Of Content

## Requirement

### Requirement: Backend
### Requirement: Frontend

**Note:** Complete list of requirements can be found in [package.json][package.json]

* [NodeJS][nodejs] (6.2.2)
* [NPM][npm] (3.9.5)
* [LibSASS][libsass] (stable 3.3.6)
* [Sass][sass] (Selective Steve 3.4.22)

## Backend

## Frontend

**The Development Directory Structure:**

```
SRC/
|—— script/
|   |—— module/
|   |—— page/
|   |—— main.js
|   |—— vendor.json
|
|—— style/
|   |—— _utility/
|   |—— _global/
|   |—— _component/
|   |—— _page/
|   |—— _variable.scss
|   |—— main.scss
|
|—— fonts/
|—— images/
```


### Frontend: General

1. Set/Install correct [NodeJS][nodejs] version as listed in [.node-version][.node-version]. Please, use a [NodeJS][nodejs] Version Manager.

2. Install all Front-end Project dependencies via [NPM][npm].

```bash
cd /path/to/project/root
npm install
```


### Frontend: HTML

The GulpJS Build System implements CacheBusting via file renaming. Each asset
is generated a random HASH based on its contents which is appended to the
filename. Upon completion, a manifest file listing all file paths and their
respective origins is constructed for CraftCMS digestion.

For more details, please review README.md found in gulp_rev plug-in directory.

[*Find More Information?*](./craft/plugins/gulprev/README.md)


#### Frontend: HTML: Asset

```twig
<link rel="stylesheet" href="{{ '/style/main.css' | gulp_rev }}">
```


### Frontend: CSS

The `main.scss` file is the designated entry point for all SASS files and should include entire site styling.

`main.scss`:

```sass
// Global --------------------
@import '_global/base';

// Component -----------------
@import '_component/footer';

// Page ----------------------
@import '_page/home';
```

*This file should ONLY include `@import` statements. Use modules for styles.*


### Frontend: JS

### Frontend: JS: Main

The `main.js` file is the designated entry point for all user custom JavaScript.

*This file should primarily be utilized as a root file for all project `require` statements. Use modules to break code into components.*


### Frontend: JS: Common

The `common.json` file is designated for storing all externally maintained
libraries and/or plug-ins.

**Add Library/Plugin:**

1. Install via [NPM][npm]
```bash
npm i -S <plugin>
```

2. Append to `common.json`.
```json
[
    "<plugin>"
]
```

3. Utilize in JavaScript Module.
```javascript
var plugin = require('<plugin>');
```


### Frontend: Development

```bash
npm run dev
```


### Frontend: Staging

```bash
npm run stage
```


### Frontend: Production

```bash
npm run prod
```


## FAQ


[nodejs]: https://nodejs.org/ "NodeJS"
[npm]: https://www.npmjs.com "NPM"
[libsass]: http://sass-lang.com/libsass "libSass"
[sass]: http://sass-lang.com "Sass"

[package.json]: ./package.json "Package Configuration"

