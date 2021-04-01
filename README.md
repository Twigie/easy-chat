# easy-chat
This is a vue component intended to act as a frontend chat layout.
## Current Props able to be passed
```
messages: Array,
title: String

Example messages Array: [{name: '', text: '', color: ''}]

The event 'sendMessage' is triggered when the user enters a chat message
this.$emit('sendMessage', this.temText)
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
