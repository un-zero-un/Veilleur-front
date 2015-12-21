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

