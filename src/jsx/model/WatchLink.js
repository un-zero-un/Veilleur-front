import Tag from './Tag';

export default class WatchLink {
    constructor(hydraData) {
        this.id = hydraData['@id'];
        this.name = hydraData.name;
        this.url = hydraData.url;
        this.description = hydraData.description;
        this.image = hydraData.image;
        this.createdAt = new Date(hydraData.createdAt);
        this.tags = hydraData.tags.map(tag => new Tag(tag));
    }

    hasImage() {
        return !!this.image;
    }

    hasTags() {
        return 0 !== this.tags.length;
    }
}
