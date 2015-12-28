import React from 'react';
import TagStore from '../stores/Tag';
import Dispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Tag';
import { Link } from 'react-router';


function getInitialState(props) {
    let tags = [];
    if (undefined !== props.params && undefined !== props.params.tags) {
        tags = props.params.tags.split('|');
    }

    return {
        tags:        TagStore.getAll(),
        activeTags:  tags,
        tagListOpen: false
    };
}

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = getInitialState(props);
    }

    componentDidMount() {
        Dispatcher.register(((payload) => {
            if (Constants.RECEIVED_CONTENT !== payload.type) {
                return;
            }

            this.setState(getInitialState(this.props));
        }).bind(this));
    }

    componentWillReceiveProps(props) {
        this.setState(getInitialState(props));
    }

    toggleTag(tag) {
        let tags = this.state.activeTags.slice(0);
        if (!this.isTagActive(tag)) {
            tags.push(tag.name);

            return tags
        }

        return tags.filter(item => item !== tag.name);
    }

    isTagActive(tag) {
        return -1 !== this.state.activeTags.indexOf(tag.name);
    }

    toggleTagList() {
        this.state.tagListOpen = !this.state.tagListOpen;

        this.setState(this.state);
    }

    render() {
        return (
            <nav className="tags-nav">
                <a className="tag-list-opener" onClick={this.toggleTagList.bind(this)}>
                    <svg viewBox="0 0 30 40" className={'tags-nav-icon ' + (this.state.tagListOpen ? 'active' : '')}>
                        <line x1="2" y1="5" x2="38" y2="5" className="top-line" />
                        <line x1="2" y1="20" x2="38" y2="20" className="middle-line" />
                        <line x1="2" y1="35" x2="38" y2="35" className="bottom-line" />
                    </svg>
                </a>
                <ul className={'tags-list ' + (this.state.tagListOpen ? 'open' : 'closed')}>
                    {this.state.tags.map((tag) => {
                        return (
                            <li key={tag.id}
                                className={(this.isTagActive(tag) ? 'active' : 'inactive') + ' tag'}>
                                <Link to={`/tags/${this.toggleTag(tag).join('|')}/`} className="tag-link">
                                    <span className="tag-link-label">
                                        {tag.name}
                                    </span>
                                    <span className="tag-link-count">{tag.watchLinks.length}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
}

