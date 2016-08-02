/* global fetch */
import Dispatcher from '../dispatcher/Dispatcher';
import Constants  from '../constants/Tag';
import Config     from '../constants/Config';
import Tag        from '../model/Tag';

class TagStore {
    constructor() {
        this.tags = [];
    }

    getAll() {
        if (0 === this.tags.length) {
            this.fetch(1);
        }

        return this.tags;
    }

    fetch(page) {
        fetch(Config.ENTRYPOINT + '/tags?page=' + page)
            .then(response => response.json())
            .then(this.onReceive.bind(this))
            .then(this.continueIfNeeded.bind(this, page));
    }

    onReceive(response) {
        response['hydra:member'].forEach(tag => this.tags.push(new Tag(tag)));

        Dispatcher.dispatch({ type: Constants.RECEIVED_CONTENT });

        return response;
    }

    continueIfNeeded(page, response) {
        if (30 === response['hydra:member'].length) {
            this.fetch(page + 1)
        }
    }
}

export default new TagStore();
