var str = '<div class="item ${this.id}">' +
           '  <h1>${this.title}</h1>' +
           ' <h1> ${title + date + '
           '  <p>${this.desc}</p>' +
           '  <ul class="attributes">' +
           ' ${new Date().toString()}' +
           '    <li>${this.attrs.dimensions}</li>' +
           '    <li>${this.attrs.weight}</li>' +
           '    <li>${this.attrs.price}</li>' +
           '  </ul>' +
           '</div>';

  // string builder doesn't care about rendering mode, the element takes care of that
// but maybe string builder should give it hints about what data we use...
// yes that'd be a good idea
// how?

function Person(conf) {
  this.name = conf.name;
}

Person.prototype.toString = function() {
  return this.name;
};
global.Person = Person;

function TextNode(text) {
  this.text = text;
}

TextNode.prototype.render = function() {
  return this.text;
};

function ExpressionNode(expression) {
  this.expression = new Function('return ' + expression);
}

ExpressionNode.prototype.render = function(properties) {
  return this.expression.call(properties);
};

function parse(str) {
  var i, l, openCount = 0, startExpressionIndex = false, startIndex = 0;
  var tokens = [];
  for (i = 0, l = str.length; i < l; i++) {
    if (startExpressionIndex === false && str[i] == '$' && str[i+1] == '{') {
      tokens.push({
        type: 'text',
        value: str.substring(startIndex, i)
      });
      startExpressionIndex = i;
      continue;
    }
    if (startExpressionIndex == false) {
      continue;
    }
    if (str[i] == '{') {
      openCount++;
    }
    if (str[i] == '}') {
      openCount--;
      if (openCount == 0) {
        tokens.push({
          type: 'expression',
          value: str.substring(startExpressionIndex + 2, i)
        });
        startExpressionIndex = false;
        startIndex = i + 1;
      }
    }
  }
  if (startIndex !== i) {
    tokens.push({
      type: 'text',
      value: str.substring(startIndex, i)
    });
  }
  return tokens;
}

function convert2(tokens) {
  var fn = new Function('return ' + tokens.map(function(token) {
    if (token.type == 'text') {
      return JSON.stringify(token.value);
    } else {
      return token.value;
    }
  }).join(' + ') + ';');
  return function sync(properties) {
    return fn.call(properties);
  };
}

function convert3(tokens) {
  var fn = new Function('data', 'return ' + tokens.map(function(token) {
    if (token.type == 'text') {
      return JSON.stringify(token.value);
    } else {
      return token.value;
    }
  }).join(' + ') + ';');
  return fn;
}

function convert(tokens) {
  var elements = tokens.map(function(token) {
    if (token.type == 'text') {
      return new TextNode(token.value);
    } else {
      return new ExpressionNode(token.value);
    }
  });
  return function sync(properties) {
    return elements.map(function(el) {
      return el.render(properties);
    }).join('');
  };
}

console.log(convert3(parse(str)).toString());

var sync = convert2(parse(str));
