import React, {Component} from 'react';

export default ({sidebar, content}) => {
    return (
        <div>
            <div className="navbar navbar-light bg-faded">
                <span className="navbar-brand">
                    Veilleur
                </span>
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 sidebar">
                        {sidebar}
                    </div>
                    <div className="col-sm-9 content">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
