export default class Section{
    constructor({renderer}, containerObject) {
        this._renderer = renderer;
        this._container = containerObject;
    }

    renderItems(items) {
        items.forEach((item) => this._renderer(item))
    }

    addItem(item) {
        this._container.prepend(item);
    }
}