var util = require('util');
var compiler = require('../string-compiler.js');

describe('Compile templates', function() {
  it('should compile HTML correctly', function() {
    var result = compiler('<div id="foo">bar <s>baz</s></div>');

    expect(result).to.deep.equal([
      {
        "tag": "div",
        "attribs": {"id": "foo"},
        "type": "tag",
        "children": [{
          "value": "bar "
        },
        {
          tag: "s",
          attribs: {},
          type: 'tag',
          children: [{
            value: 'baz'
          }]
        }]
      }
    ]);
  });
});