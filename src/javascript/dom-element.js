function fElement(config) {
  this.children = config.children;
  this.attribs = config.attribs;
  this.tag = config.tag;
}

fElement.prototype.createDom = function(parent) {
  var element = document.createElement(this.tag);
  var self = this;

  Object.keys(this.attribs).forEach(function(key) {
    // @todo can we set this attribute?
    // @ look for directives
    element.setAttribute(key, self.attribs[key]);
  });

  this.children.forEach(function(element) {
    element.createDom(element);
  });

  parent.appendChild(element);
};

module.exports = fElement;