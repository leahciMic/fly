var domCompiler = require('./dom-compiler.js');
var stringCompiler = require('./string-compiler.js');

function Fly() {

};

Fly.prototype.template = function flyTemplate(from) {
  this.structure = parseTemplate(from);

};


flyTemplate.prototype.parseTemplate = function(template) {
  if (from typeof 'string') {
    return stringCompiler(template);
  }
  if (from typeof Node || from typeof NodeList) {
    return domCompiler(template);
  }
  throw new Error('Not sure what to do with that.');
  // maybe support arrays of nodes?
}