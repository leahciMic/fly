var htmlparser = require('htmlparser');

var convert = function(dom) {
  return dom.map(function(element) {
    if (element.type == 'tag') {
      return {
        tag: element.name,
        attribs: element.attribs || {},
        type: element.type,
        children: convert(element.children || [])
      };
    } else {
      return {
        value: element.data
      };
    }
  });
};

module.exports = function parse(html) {
  var handler = new htmlparser.DefaultHandler(function(error, dom) {
  });
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(html);
  return convert(handler.dom);
};