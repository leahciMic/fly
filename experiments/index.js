var htmlparser = require('htmlparser');
var fs = require('fs');
var template = fs.readFileSync('./template.html', 'utf8');
var util = require('util');

// Server compiled is quicker...
// Client compiled creates a couple of wonderfull possiblities
// These two formats should both be supported
// convert is much faster.
// convert
// 985
// ±9.82%
// fastest

// convert2
// 279
// ±7.63%
// 71% slower

var handler = new htmlparser.DefaultHandler(function(error, dom) {

});

var parser = new htmlparser.Parser(handler);
parser.parseComplete(template);

var directives = {
  '$if': function() {

  }
};
// console.log(util.inspect(handler.dom, false, null));

function Element(config) {
  this.children = config.children;
  this.attribs = config.attribs;
  this.tag = config.tag;
}

Element.prototype.createDom = function(parent) {
  var element = document.createElement(this.tag);
  var self = this;
  Object.keys(this.attribs).forEach(function(key) {
    element.setAttribute(key, self.attribs[key]);
  });

  this.children.forEach(function(element) {
    element.createDom(element);
  });

  parent.appendChild(element);
};

function Text(config) {
  this.value = config.value;
}

Text.prototype.createDom = function(parent) {
  parent.appendChild(document.createTextNode(this.value));
}

var convert = function(dom) {
  return dom.map(function(element) {
    if (element.type == 'tag') {
      return ['new Element({',
        'tag:' + JSON.stringify(element.name) + ',',
        'attribs:' + JSON.stringify(element.attribs || {}) + ',',
        'children: [' + convert(element.children || []).join(',') + ']',
        '})'].join("");
    } else {
      return 'new Text(' + JSON.stringify({
        value: element.data
      }) + ')';
    }
  });
};

var convert2 = function(dom) {
  return dom.map(function(element) {
    if (element.type == 'tag') {
      return {
        tag: element.name,
        attribs: element.attribs,
        type: element.type,
        children: convert2(element.children || [])
      };
    } else {
      return {
        value: element.data
      };
    }
  });
}

var unconvert = function(json) {
  var nodes = JSON.parse(json).map(function(element) {
    if (element.type === 'tag') {
      return new Element(element);
    } else {
      return new Text(element);
    }
  });
  return new FastTemplate(nodes);
};

function FastTemplate(nodes) {
  this.children = nodes;

}

FastTemplate.prototype.render = function() {
  var docFragment = document.createDocumentFragment();
  this.children.forEach(function(child) {
    child.render(docFragment);
  });
};

var compile = function(dom) {
  return dom.map(function(element) {
    if (element instanceof Element) {

    }
  });
};

util.print(convert(handler.dom).join(","))
// util.print(JSON.stringify(JSON.stringify(convert2(handler.dom))));
// convert(handler.dom);





// console.log(util.inspect(convert(handler.dom), {depth: null}));