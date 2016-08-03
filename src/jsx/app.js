import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHashHistory from 'history/lib/createHashHistory';

import Config from './constants/Config';
import WatchLinks from './components/WatchLinks';
import Tags from './components/Tags';
import Layout from './components/Layout';

import '../scss/main.scss';

let $element = document.getElementById('app');
let createHistory = window.location.protocol === 'file:' ? createHashHistory : createBrowserHistory;

Config.ENTRYPOINT = $element.getAttribute('data-entrypoint');

class App extends Component
{
    render() {
        return (
            <Router history={createHistory()}>
                <Route path="/" component={Layout}>
                    <Redirect from="/" to="/page/1" />
                    <Redirect from="/tags//" to="/page/1" />
                    <Redirect from="/tags/:tags" to="/tags/:tags/page/1" />
                    <Route path="/page/:page" components={{content: WatchLinks, sidebar: Tags}} />
                    <Route path="/tags/:tags/page/:page" components={{content: WatchLinks, sidebar: Tags}} />
                </Route>
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


