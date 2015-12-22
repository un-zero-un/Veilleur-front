import React from 'react';

export default React.createClass({
    render() {
        return (
            <blockquote className="watch-link">
                <div className="watch-link-content">
                    <h2>{this.props.watchLink.name}</h2>
                    <cite className="watch-link-url">
                        <a href={this.props.watchLink.url}>{this.props.watchLink.url}</a>
                    </cite>

                    {(() => {
                        if (this.props.watchLink.tags.length > 0) {
                            return (
                                <ul className="watch-links-tags">
                                    {this.props.watchLink.tags.map((tag) => {
                                        return (
                                            <li className="watch-links-tag">
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

