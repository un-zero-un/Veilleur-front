import React from 'react';
import WatchLinkStore from '../stores/WatchLink';
import Dispatcher from '../dispatcher/Dispatcher';
import WatchLink from './WatchLink';
import Constants from '../constants/WatchLink';
import { Link } from 'react-router';


function getInitialState(props) {
    return {
        watchLinks:   WatchLinkStore.getLasts(props.params.page),
        itemsPerPage: WatchLinkStore.getItemsPerPage(),
        totalItems:   WatchLinkStore.getTotalItems()
    };
}

export default React.createClass({
    getInitialState() {
        return getInitialState(this.props);
    },

    componentDidMount() {
        Dispatcher.register((payload) => {
            if (Constants.RECEIVED_CONTENT !== payload.type) {
                return;
            }

            this.setState(getInitialState(this.props));
        });
    },

    componentWillReceiveProps(props) {
        console.log(props.params);
        this.setState(getInitialState(props));
    },

    getPages() {
        let pages = [];
        for (let i = 0; i < this.state.totalItems / this.state.itemsPerPage; i++) {
            pages.push(i + 1);
        }

        return pages;
    },

    render() {
        return (
            <div>
                <div>
                    {this.state.watchLinks.map((watchLink) => {
                        return (<WatchLink watchLink={watchLink} key={watchLink.id} />);
                    })}
                </div>
                <div>
                    {this.getPages().map((page) => {
                        return (
                            <Link key={page} to={`/page/${page}`}>{page}</Link>
                        );
                    })}
                </div>
            </div>
        );
    }
});

