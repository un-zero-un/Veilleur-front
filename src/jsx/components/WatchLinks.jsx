import React from 'react';
import WatchLinkStore from '../stores/WatchLink';
import Dispatcher from '../dispatcher/Dispatcher';
import WatchLink from './WatchLink';
import Constants from '../constants/WatchLink';

export default React.createClass({
    getInitialState() {
        return {
            watchLinks: WatchLinkStore.getLasts()
        };
    },

    componentDidMount: function() {
        Dispatcher.register((payload) => {
            if (Constants.RECEIVED_CONTENT !== payload.type) {
                return;
            }

            this.setState({watchLinks: WatchLinkStore.getLasts()});
        });
    },

    render() {
        return (
            <div>
                {this.state.watchLinks.map((watchLink) => {
                    return (<WatchLink watchLink={watchLink} key={watchLink['@id']} />);
                })}
            </div>
        );
    }
});

