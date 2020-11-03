export default class Section{
    constructor({items, renderer}, containerObject) {
        this._itemsArray = items;
        this._renderer = renderer;
        this._container = containerObject;
    }

    renderItems() {
        this._itemsArray.forEach((item) => this._renderer(item))
    }

    addItem(item) {
        this._container.prepend(item);
    }
}