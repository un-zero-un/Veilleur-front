import React from 'react';
import WatchLinkStore from '../stores/WatchLink';
import Dispatcher from '../dispatcher/Dispatcher';
import WatchLink from './WatchLink';
import Constants from '../constants/WatchLink';
import { Link } from 'react-router';


function getInitialState(props) {
    let tags = [];
    if (undefined !== props.params && undefined !== props.params.tags) {
        tags = props.params.tags.split('|');
    }

    return {
        watchLinks:   WatchLinkStore.getLasts(tags, props.params.page),
        itemsPerPage: WatchLinkStore.getItemsPerPage(),
        totalItems:   WatchLinkStore.getTotalItems(),
        activeTags:   tags
    };
}

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = getInitialState(props);
    }

    componentDidMount() {
        Dispatcher.register((payload) => {
            if (Constants.RECEIVED_CONTENT !== payload.type) {
                return;
            }

            this.setState(getInitialState(this.props));
        });
    }

    componentWillReceiveProps(props) {
        this.setState(getInitialState(props));
    }

    getPages() {
        let pages = [];
        for (let i = 0; i < this.state.totalItems / this.state.itemsPerPage; i++) {
            pages.push(i + 1);
        }

        return pages;
    }

    render() {
        return (
            <div>
                <table className="watch-links">
                    <tbody>
                        {this.state.watchLinks.map((watchLink) => {
                            return (<WatchLink watchLink={watchLink} key={watchLink.id} />);
                        })}
                    </tbody>
                </table>
                <div>
                    <ul className="pager">
                        {this.getPages().map((page) => {
                            return (
                                <li className="pager-item" key={page}>
                                    <Link to={`/page/${page}`} className="pager-item-link" activeClassName="active">
                                        {page}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

