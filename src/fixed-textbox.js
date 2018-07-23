/**
 * It resizes font until it fits the width/height of `Textbox`
 * 텍스트박스 크기에 맞게 폰트크기가 자동 조정됨
 * @type FixedTextbox
 */
fabric.FixedTextbox = fabric.util.createClass(fabric.Textbox, {
  type: 'fixed-textbox',
  initialize: function(text, options) {
    this.callSuper('initialize', text, options);

    // If fontResizing mode enabled
    // 폰트 리사이징 모드가 설정되어 있다면
    if(this.fontResizing) {
      if(!this.originFontSize) this.originFontSize = this.fontSize;
      if(!this.maxHeight) this.maxHeight = this.height;
      if(this.height > this.maxHeight) {
        for(var i in this.textLines) {
          var line = this.textLines[i];
          if(this.textLines.length > i + 1) this.text = this.text.replace(line, line+'\n');
          this.text = this.text.replace(/\n\s/g, "\n");
        }
        this.fontSize = (this.originFontSize / (this.height / this.maxHeight));
      }
    }
    else {
      // TODO: Else, cut the overflowed words
      // 아니라면, 넘치는 글자는 자름
    }
  },
});
