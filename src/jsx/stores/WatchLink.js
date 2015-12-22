/* global fetch */
import Dispatcher from '../dispatcher/Dispatcher';
import Constants  from '../constants/WatchLink';
import Config     from '../constants/Config';
import WatchLink  from '../model/WatchLink';

class WatchLinkStore {
    constructor() {
        this.watchLinks   = {'': {1:[]}};
        this.pages        = 1;
        this.totalItems   = 30;
        this.itemsPerPage = 30;
    }

    getLasts(tags = [], page = 1) {
        let tagString = tags.join('|');
        if (
            undefined !== this.watchLinks[tagString] &&
            undefined !== this.watchLinks[tagString][page] &&
            0 !== this.watchLinks[tagString][page].length
        ) {
            return this.watchLinks[tagString][page];
        }

        this.watchLinks[tagString] = {};
        this.watchLinks[tagString][page] = [];
        let url = Config.ENTRYPOINT + '/watch_links?order[createdAt]=DESC&page=' + page;
        if (0 !== tags.length) {
            url += tags.map((tag, index) => `&tags[${index}]=${tag}`).join('');
        }

        fetch(url)
            .then(response => response.json())
            .then(this.onReceive.bind(this, tagString, page));

        return this.watchLinks[tagString][page];
    }

    onReceive(tagString, page, response) {
        this.totalItems                  = response['hydra:totalItems'];
        this.itemsPerPage                = response['hydra:itemsPerPage'];
        this.watchLinks[tagString][page] = response['hydra:member'].map(watchLink => new WatchLink(watchLink));

        Dispatcher.dispatch({ type: Constants.RECEIVED_CONTENT });
    }

    getTotalItems() {
        return this.totalItems;
    }

    getItemsPerPage() {
        return this.itemsPerPage;
    }
}

export default new WatchLinkStore();
