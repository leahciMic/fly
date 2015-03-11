module.exports = function compileDOM(nodes) {
  if (!(nodes instanceof Array || nodes instanceof NodeList)) {
    nodes = [nodes];
  }
  return Array.prototype.map.call(nodes, function(node) {
    if (node.nodeName === '#text') {
      return {
        value: node.nodeValue
      };
    }
    return {
      tag: node.nodeName.toLowerCase(),
      attribs: Array.prototype.reduce.call(node.attributes, function(attribs, attrib) {
        attribs[attrib.name] = attrib.value;
        return attribs;
      }, {}),
      type: 'tag',
      children: compileDOM(node.childNodes || [])
    }
  });
};