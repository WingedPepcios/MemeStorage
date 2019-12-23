import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import MemesApp from './MemesApp';
import reducers from './Reducers';

const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><MemesApp /></Provider>, document.getElementById('app'));
