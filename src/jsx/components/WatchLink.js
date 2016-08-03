import moment from 'moment';
import React, {Component} from 'react';

export default class extends Component {
    render() {
        return (
            <tr className="watch-link">
                <td className="watch-link-content">
                    <time dateTime={moment(this.props.watchLink.createdAt).format()} className="watch-link-date">
                        {moment(this.props.watchLink.createdAt).fromNow()}
                    </time>
                    <h3 className="watch-link-title">
                        <a href={this.props.watchLink.url} tabIndex="-1" className="watch-link-title-link">
                            {this.props.watchLink.name}
                        </a>
                    </h3>
                    <cite className="watch-link-url">
                        <a href={this.props.watchLink.url} className="watch-link-link">{this.props.watchLink.url}</a>
                    </cite>

                </td>

            </tr>
        );
    }
}

/*
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
 *//*
 <p>{this.props.watchLink.description}</p>
 {(() => {
 if (this.props.watchLink.image) {
 return (
 <div className="watch-link-image-container">
 <img src={this.props.watchLink.image} className="watch-link-image" />
 </div>
 );
 }
 })()}*/
