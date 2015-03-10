// how does a directive look?

directive('class', function() {

});

directive('if', function() {

});

directive('repeat', function() {

});

function Element(config) {
  this.children = config.children;
  this.attribs = config.attribs;
  this.tag = config.tag;
}

Element.prototype.createDom = function(parent) {
  var element = document.createElement(this.tag);
  var self = this;
  Object.keys(this.attribs).forEach(function(key) {
    if (key[0] == '[') {
      return;
    }
    element.setAttribute(key, self.attribs[key]);
  });

  this.children.forEach(function(child) {
    child.createDom(element);
  });

  parent.appendChild(element);
};

function Text(config) {
  this.value = config.value;
}

Text.prototype.createDom = function(parent) {
  parent.appendChild(document.createTextNode(this.value));
}

var tree = getElements();

// to complete this we need to bind to data, and update intelligently

function render() {
  var element = document.getElementById('render');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  tree.forEach(function(item) {
    item.createDom(element);
  });
}

var a = performance.now();

document.addEventListener('DOMContentLoaded', function() {
  var howmany = 0
  var render2 = function() {
    render();
    if (howmany++ > 1000) {
      console.log((1000 / a) + ' per ms');
    } else {
      window.setTimeout(render2, 0);
    }
  };
  render2();
});

function getElements() {
  return [new Element({tag:"div",attribs:{"[if]":"true"},children: [new Text({"value":"\n  The lazy ${animal} jumps over the lazy ${thing}.\n"})]}),new Text({"value":"\n\n"}),new Element({tag:"ul",attribs:{},children: [new Text({"value":"\n  "}),new Element({tag:"li",attribs:{"[repeat]":"car in cars"},children: []}),new Text({"value":"\n"})]}),new Text({"value":"\n\n"}),new Element({tag:"div",attribs:{"[class]":"{'yourmum': yourmum}"},children: [new Text({"value":"\n  "}),new Element({tag:"p",attribs:{"class":"fuck","style":"font-size: 56px;"},children: [new Text({"value":"\n    Some text here.\n  "})]}),new Text({"value":"\n"})]}),new Text({"value":"\n"})];
}