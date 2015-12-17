'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pluralize = require('pluralize');
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
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the funkadelic ' + chalk.red('generator-meteor-horse') + ' generator!'
      ));

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
    var destPath = 'app/lib/routes/' + content.collectionName + '_routes.js';
    this.fs.copyTpl(this.templatePath('routes.js'), this.destinationPath(destPath), content);
  }
});
