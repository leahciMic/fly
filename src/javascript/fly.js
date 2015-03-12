var domParser = require('./dom-parser.js');
var stringParser = require('./string-parser.js');
var fElement = require('./dom-element.js');
var fText = require('./dom-text.js');

function Fly(q) {
  this.compile(this.parse(q));

};

Fly.prototype.compile = function(obj) {
  var nodes = obj.map(function(element) {
    if (element.type === 'tag') {
      return new fElement(element);
    } else {
      return new fText(element);
    }
  });
  return new FastTemplate(nodes);
};

Fly.prototype.parse = function() {
  var parser;

  if (q typeof 'string') {
    parser = stringParser;
  } else if (q instanceof Node || q instanceof NodeList)
    parser = domParser;
  }

  if (!parser) {
    throw new Error('Parser not found');
  }

  return parser(q);
};