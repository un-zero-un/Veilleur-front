import React from 'react';
import { render } from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';
import { Router, Route, Link, Redirect } from 'react-router';
import Config from './constants/Config';
import WatchLinks from './components/WatchLinks';

let $element = document.getElementById('app');
let createHistory = window.location.protocol === 'file:' ? createHashHistory : createBrowserHistory;

Config.ENTRYPOINT = $element.getAttribute('data-entrypoint');

class App extends React.Component
{
    render() {
        return (
            <Router history={createHistory()}>
                <Redirect from="/" to="/page/1" />
                <Redirect from="/tags//" to="/page/1" />
                <Redirect from="/tags/:tags" to="/tags/:tags/page/1" />
                <Route path="/page/:page" component={WatchLinks} />
                <Route path="/tags/:tags/page/:page" component={WatchLinks} />
            </Router>
        );
    }
}

function boot() {
    render(<App />, $element);
}

if (window.location.protocol === 'file:') {
    document.addEventListener('deviceready', boot, false);
} else {
    boot();
}


