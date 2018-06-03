// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"
import './process';
import {ReactInstance} from 'react-360-web';
import DomOverlayModule from './DomOverlayModule';


function init(bundle, parent, options = {}) {

  // Create a div where the overlay will be displayed in the DOM.
  const domOverlayContainer = document.createElement('div');
  domOverlayContainer.id = 'dom-overlay';
  // Create an instance of the module, to be registered below.
  const domOverlayModule = new DomOverlayModule(domOverlayContainer);

  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [domOverlayModule]
  });

  // Render your app content to the default cylinder surface
  r360.renderToLocation(
    r360.createRoot('Hello360', { /* initial props */ }),
    r360.getDefaultLocation()
  );

  // Inject DOM overlay container to the player so that it is rendered properly.
  r360.overlay._wrapper.appendChild(domOverlayContainer);
  // Load the initial environment
  // r360.compositor.setBackground(r360.getAssetURL('the-chester--v112351.prefilter.jpg'));
}

window.React360 = {init};
