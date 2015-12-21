import Dispatcher from '../dispatcher/Dispatcher';
import Constants  from '../constants/WatchLink';
import Config     from '../constants/Config';

class WatchLinkStore {
    constructor() {
        this.watchLinks   = {1: []};
        this.pages        = 1;
        this.totalItems   = 30;
        this.itemsPerPage = 30;
    }

    getLasts(page = 1) {
        if (0 === this.watchLinks[page].length) {
            fetch(Config.ENTRYPOINT + '/watch_links?page=' + page)
                .then(response => response.json())
                .then(this.onReceive.bind(this, page));
        }

        return this.watchLinks[page];
    }

    onReceive(page, response) {
        this.totalItems       = response['hydra:totalItems'];
        this.itemsPerPage     = response['hydra:itemsPerPage'];
        this.watchLinks[page] = response['hydra:member'];

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
