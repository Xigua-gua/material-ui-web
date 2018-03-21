import React from 'react';
import ReactDOM from 'react-dom';
import App from './root';
import registerServiceWorker from './registerServiceWorker';

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}

render(App);

if (module.hot) {
    module.hot.accept('./root', () => {
        const NextApp = require('./root').default;
        render(NextApp);
    });
}

registerServiceWorker();
