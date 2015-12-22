/* global fetch */
import Dispatcher from '../dispatcher/Dispatcher';
import Constants  from '../constants/Tag';
import Config     from '../constants/Config';
import Tag        from '../model/Tag';

class TagStore {
    constructor() {
        this.tags         = [];
    }

    getAll() {
        if (0 === this.tags.length) {

            fetch(Config.ENTRYPOINT + '/tags')
                .then(response => response.json())
                .then(this.onReceive.bind(this));
        }

        return this.tags;
    }

    onReceive(response) {
        this.tags = response['hydra:member'].map(tag => new Tag(tag));

        Dispatcher.dispatch({ type: Constants.RECEIVED_CONTENT });
    }
}

export default new TagStore();
