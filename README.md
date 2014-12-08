# common-soundcloud

simple wrapper over the SoundCloud HTML5 Widget API


## Installation

```
$ npm install common-soundcloud
```

## Usage


```js
var SoundCloud = require('common-soundcloud');
var player = SoundCloud('id-of-iframe');

player.on('ready', function() {
  player.play();
});

```

# License

  MIT
