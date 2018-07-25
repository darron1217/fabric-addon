/**
 * It resizes font until it fits the width/height of `Textbox`
 * 텍스트박스 크기에 맞게 폰트크기가 자동 조정됨
 * @type FixedTextbox
 */
fabric.FixedTextbox = fabric.util.createClass(fabric.Textbox, {
  type: 'fixed-textbox',

  /**
   * Properties which when set cause object to change dimensions
   * @type Object
   * @private
   */
  _dimensionAffectingProps: fabric.Textbox.prototype._dimensionAffectingProps.concat('height'),

  /**
   * initDimensions (without height setting)
   */
  _initDimensions: function() {
    this.isEditing && this.initDelayedCursor();
    this.clearContextTop();
    this._clearCache();
    // clear dynamicMinWidth as it will be different after we re-wrap line
    this.dynamicMinWidth = 0;
    // wrap lines
    this._styleMap = this._generateStyleMap(this._splitText());
    // if after wrapping, the width is smaller than dynamicMinWidth, change the width and re-wrap
    if (this.dynamicMinWidth > this.width) {
      this._set('width', this.dynamicMinWidth);
    }
    if (this.textAlign.indexOf('justify') !== -1) {
      // once text is measured we need to make space fatter to make justified text.
      this.enlargeSpaces();
    }
    // clear cache and re-calculate height
    // this.height = this.calcTextHeight();
    this.saveState({ propertySet: '_dimensionAffectingProps' });
  },

  initDimensions: function() {
    this._initDimensions();

    // Use defined height as a fixed value. If there's no height value, then use max or calculated height
    // 설정된 height를 사용. 높이값이 없다면, 설정된 최대높이 또는 계산된 높이값을 사용
    if(!this.height) this.height = this.maxHeight || this.calcTextHeight();

    // If fontResizing mode enabled
    // 폰트 리사이징 모드가 설정되어 있다면
    if(this.fontResizing) {
      var textWidth = this.calcTextWidth();
      var textHeight = this.calcTextHeight();
      if (textWidth > this.maxWidth) {
        this.fontSize -= 0.1;
        this.width = this.maxWidth;
        this.initDimensions();
      }
      else if(textHeight > this.height) {
        this.fontSize -= 0.1;
        this.initDimensions();
      }
    }
    else {
      // TODO: Else, cut the overflowed words
      // 아니라면, 넘치는 글자는 자름
    }
  }

});

fabric.FixedTextbox.fromObject = function(object, callback) {
  // Run toString() to make sure it is string
  object.text = object.text.toString();
  return fabric.Object._fromObject('FixedTextbox', object, callback, 'text');
};
