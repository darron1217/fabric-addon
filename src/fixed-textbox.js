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
   * initDimensions without height setting
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

    // If fontResizing mode enabled
    // 폰트 리사이징 모드가 설정되어 있다면
    if(this.fontResizing) {
      this.height = this.maxHeight;
      if(!this.originFontSize) this.originFontSize = this.fontSize;
      // 높이구하기
      var textHeight = this.calcTextHeight();
      if(textHeight > this.maxHeight) {
        this.fontSize = this.fontSize / (textHeight / this.maxHeight);
      }
    }
    else {
      // TODO: Else, cut the overflowed words
      // 아니라면, 넘치는 글자는 자름
    }
  },

});

fabric.FixedTextbox.fromObject = function(object, callback) {
  // Run toString() to make sure it is string
  object.text = object.text.toString();
  return fabric.Object._fromObject('FixedTextbox', object, callback, 'text');
};
