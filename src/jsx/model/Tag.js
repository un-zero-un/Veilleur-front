export default class Tag {
    constructor(hydraData) {
        this.id = hydraData['@id'];
        this.name = hydraData.name;
    }
}
