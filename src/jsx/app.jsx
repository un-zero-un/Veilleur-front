import React from 'react';
import Main from './components/Main';
import Config from './constants/Config';

let $element = document.getElementById('app');

Config.ENTRYPOINT = $element.getAttribute('data-entrypoint');

React.render(<Main />, $element);
