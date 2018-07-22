/**
 * It resizes font until it fits the width/height of `Textbox`
 * 텍스트박스 크기에 맞게 폰트크기가 자동 조정됨
 * @type ResponsiveTextbox
 */
fabric.ResponsiveTextbox = fabric.util.createClass(fabric.Textbox, {
  type: 'resizing-textbox',
  initialize: function(text, options) {
    this.callSuper('initialize', text, options);

    var object = this;
    var oneLineHeight = object.__lineHeights[0];
    if(!object.originFontSize) object.originFontSize = object.fontSize;
    // 텍스트가 박스 밖으로 벗어났을 때,
    if(object.height > object.maxHeight) {
      object.textLines.forEach(function(linetext, i) {
        if(object.textLines.length > i+1) object.text = object.text.replace(linetext, linetext+'\n');
        object.text = object.text.replace(/\n\s/g, "\n");
      })
      object.fontSize = (object.originFontSize / (object.height / object.maxHeight));
    }
  },
});
