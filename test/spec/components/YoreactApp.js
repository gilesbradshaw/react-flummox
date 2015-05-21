'use strict';

describe('YoreactApp', function () {
  var React = require('react/addons');
  var YoreactApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    YoreactApp = require('components/YoreactApp.js');
    component = React.createElement(YoreactApp);
  });

  it('should create a new instance of YoreactApp', function () {
    expect(component).toBeDefined();
  });
});
