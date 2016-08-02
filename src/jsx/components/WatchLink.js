import moment from 'moment';
import React from 'react';

export default React.createClass({
    render() {
        return (
            <blockquote className="watch-link">
                <div className="watch-link-content">
                    <h2 className="watch-link-title">
                        <a href={this.props.watchLink.url} tabIndex="-1" className="watch-link-title-link">
                            {this.props.watchLink.name}
                        </a>
                    </h2>
                    <cite className="watch-link-url">
                        <time dateTime={moment(this.props.watchLink.createdAt).format()}>
                            {moment(this.props.watchLink.createdAt).fromNow()}
                        </time>
                        <a href={this.props.watchLink.url} className="watch-link-link">{this.props.watchLink.url}</a>
                    </cite>

                    {(() => {
                        if (this.props.watchLink.tags.length > 0) {
                            return (
                                <ul className="watch-links-tags">
                                    {this.props.watchLink.tags.map((tag) => {
                                        return (
                                            <li className="watch-links-tag" key={tag.id}>
                                                <span className="watch-links-tag-label">{tag.name}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            );
                        }
                    })()}

                    <p>{this.props.watchLink.description}</p>
                </div>

                {(() => {
                    if (this.props.watchLink.image) {
                        return (
                            <div className="watch-link-image-container">
                                <img src={this.props.watchLink.image} className="watch-link-image" />
                            </div>
                        );
                    }
                })()}
            </blockquote>
        );
    }
});

