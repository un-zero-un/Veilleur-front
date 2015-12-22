import React from 'react';
import { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, Redirect } from 'react-router';
import Config from './constants/Config';
import WatchLinks from './components/WatchLinks';

let $element = document.getElementById('app');

Config.ENTRYPOINT = $element.getAttribute('data-entrypoint');

render(
    (
        <Router history={createBrowserHistory()}>
            <Redirect from="/" to="/page/1" />
            <Redirect from="/tags//" to="/page/1" />
            <Redirect from="/tags/:tags" to="/tags/:tags/page/1" />
            <Route path="/page/:page" component={WatchLinks} />
            <Route path="/tags/:tags/page/:page" component={WatchLinks} />
        </Router>
    ),
    $element
);
