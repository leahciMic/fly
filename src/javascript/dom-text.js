var flyTemplate = require('fly-template');

function fText(config) {
  this.value = config.value;
  this.sync = flyTemplate(config.value);
}

fText.prototype.createDom = function(parent) {
  parent.appendChild(document.createTextNode(this.value));
};

module.exports = fText;