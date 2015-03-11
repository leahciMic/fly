describe('Fly', function() {
  it('should be able to render DOM nodes', function() {
    var testContainer = document.createElement('div');
    var render = fly('<p>Hello ${this.thing}</p>').sync(document.testContainer);
    render({
      thing: 'world!'
    });
    expect(testContainer.innerHTML).to.equal('<p>Hello world!</p>');
    render({
      thing: 'worlds!'
    });
    expect(testContainer.innerHTML).to.equal('<p>Hello worlds!</p>');
  });

  it('should be able to respond to data update events', function() {

  });

  it('should be possible to do two-way binding?', function() {

  });

  it('should be possible to stream data to the templates and have them react', function() {

  });

  it('should be possible to send promises of data to templates and have them react', function() {

  });

});