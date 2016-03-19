'use strict';
var yeoman = require('yeoman-generator');
var contentForTpl = require('../../lib/util').contentForTpl;

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  initializing: function() {
    this.props = {};
  },

  prompting: function() {
    var done = this.async();

    if (this.options.collectionName) {
      this.props.collectionName = this.options.collectionName;
      done();
    } else {
      var prompts = [{
        type: 'input',
        name: 'collectionName',
        message: 'Enter the collection name:'
      }];

      this.prompt(prompts, function(props) {
        this.props = props;
        done();
      }.bind(this));
    }
  },

  writing: function() {
    var content = contentForTpl(this.props.collectionName);
    var destinationPath = 'server/publications/' + content.collectionName + '_publications.js';
    this.fs.copyTpl(this.templatePath('publications.js'), this.destinationPath(destinationPath), content);
  }
});
