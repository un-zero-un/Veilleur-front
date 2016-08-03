import React, {Component} from 'react';
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

export default class extends Component {
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
                <h2>Tags</h2>
                <ul>
                    {this.state.tags.map((tag, i) => {
                        return (
                            <li key={'tag-' + i}>
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

