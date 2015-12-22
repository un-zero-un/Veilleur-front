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
        tags:       TagStore.getAll(),
        activeTags: tags
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
        if (-1 === this.state.activeTags.indexOf(tag.name)) {
            tags.push(tag.name);

            return tags
        }

        return tags.filter(item => item !== tag.name);
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.tags.map((tag) => {
                        return (
                            <li key={tag.id}>
                                <Link to={`/tags/${this.toggleTag(tag).join('|')}/`}>
                                    <span>{tag.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

