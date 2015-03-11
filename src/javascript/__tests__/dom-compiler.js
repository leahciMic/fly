var compiler = require('../dom-compiler.js');

describe('DOM Compiler', function() {
  it('should compile HTML correctly', function() {
    var div = document.createElement('div');
    div.setAttribute('id', 'foo');
    div.innerHTML = 'bar <s>baz</s>';

    var result = compiler(div);

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
          type: 'tag',
          attribs: {},
          children: [{
            value: 'baz'
          }]
        }]
      }
    ]);
  });
});