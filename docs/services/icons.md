##Icons

### Description

Within ember-cordova, icon management is automated from a single svg
file.

ember-cordova will resize the svg for each platform, convert it to a
png, store the icons in your project & update config.xml on your behalf.

This is powered by a separate library called
[splicon](https://github.com/isleofcode/splicon).

### Usage

Place an icon file at ember-cordova/icon.svg

```
ember cdv:make-icons
```

#### Available options
+ source: path to icon.svg file. (default: ember-cordova/icon.svg)
+ platform: which platforms to generate (default: all)

```
ember cdv:make-icons --source=otherPath --platform=ios
--platform=android
```
