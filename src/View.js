
/**
 * Represents a rectangular area on the screen
 * and manages the content in that area.
 */
export default class View {
  /**
   * View constructor.
   */
  constructor () {
    this._$root = null
    this._superview = null
    this._subviews = []
  }

  /**
   * Returns root element.
   * @return {?HTMLElement}
   */
  getElement () {
    if (this._$root === null) {
      this.willRender()
      this._$root = this.render()
      this.didRender()
    }
    return this._$root
  }

  /**
   * Renders view.
   * @protected
   * @return {HTMLElement}
   */
  render () {
    return document.createElement('div')
  }

  /**
   * Triggered before rendering root element.
   * @override
   */
  willRender () {
  }

  /**
   * Triggered after rendering root element.
   * @override
   */
  didRender () {
  }

  /**
   * Layouts view and its subviews.
   * @return {View}
   */
  layout () {
    this._subviews.forEach(subview => subview.layout())
    return this
  }

  /**
   * Adds subview.
   * @param {View} view View to add as subview.
   * @return {View} Fluent interface
   */
  addSubview (view) {
    // make sure view is detached
    view.removeFromSuperview()

    // add view to subviews
    this._subviews.push(view)
    view.setSuperview(this)
    this.appendSubviewElement(view)
  }

  /**
   * Returns subviews.
   * @return {View[]} Subviews
   */
  getSubviews () {
    return this._subviews
  }

  /**
   * Injects subview's root element into own DOM structure.
   * Override this method to choose how to inject which kind of views.
   * @protected
   * @override
   * @param {View} view
   * @return {View} Fluent interface
   */
  appendSubviewElement (view) {
    // default behaviour: append subview element to own root element
    if (view.getElement().parentNode !== this.getElement()) {
      this.getElement().appendChild(view.getElement())
    }
    return this
  }

  /**
   * Remove subview.
   * @param {View} view View to be removed from subviews.
   * @return {View} Fluent interface
   */
  removeSubview (view) {
    const index = this._subviews.indexOf(view)
    if (index !== -1) {
      this._subviews.splice(index, 1)
      view.setSuperview(null)
      this.removeSubviewElement(view)
    }
  }

  /**
   * Removes previously added subview element from own DOM structure.
   * @protected
   * @override
   * @param {View} view
   * @return {View} Fluent interface
   */
  removeSubviewElement (view) {
    // default behaviour: remove subview element from its parent node
    view.getElement().parentNode.removeChild(view.getElement())
    return this
  }

  /**
   * Remove self from superview.
   * @return {View} Fluent interface
   */
  removeFromSuperview () {
    if (this._superview !== null) {
      this._superview.removeSubview(this)
    }
    return this
  }

  /**
   * Returns superview.
   * @return {?View} Superview
   */
  getSuperview () {
    return this._superview
  }

  /**
   * Sets superview.
   * @param {?View} view
   * @return {View} Fluent interface
   */
  setSuperview (view) {
    this._superview = view
    return this
  }

  /**
   * Returns the model object that manages this view.
   * @return {?Object}
   */
  getModel () {
    return this._model
  }

  /**
   * Returns true, if model is set.
   * @return {boolean} True, if model is set.
   */
  hasModel () {
    return this._model !== null
  }

  /**
   * Sets the model.
   * @param {?Object} model
   * @return {View} Fluent interface
   */
  setModel (model) {
    this._model = model
    return this
  }
}
