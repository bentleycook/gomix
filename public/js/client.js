var Promise = TrelloPowerUp.Promise;

var ICON = 'https://cdn.gomix.com/be1e2b3f-0862-4207-9df7-c8db9fb4ba93%2Fboulder_js.jpeg';

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: ICON,
      text: 'Open Overlay',
      callback: (t) => {
        return t.overlay({
          title: 'Overlay Example',
          url: './overlay.html'
        })
      }
    },
   {
      icon: ICON,
      text: 'Open Three.js Example',
      callback: (t) => {
        return t.overlay({
          title: 'Overlay Example',
          url: './three-js.html'
        })
      }
    }];
  }
});