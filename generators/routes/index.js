'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
        this.props.collectionName = this.props.collectionName.toLowerCase();

        done();
      }.bind(this));
    }
  },

  writing: function() {
    var collectionName = this.props.collectionName;
    var destPath = 'app/lib/routes/' + collectionName + '_routes.js';
    var content = {
      collectionName: collectionName,
      collectionNameCapitalized: collectionName[0].toUpperCase() + collectionName.slice(1)
    };
    this.fs.copyTpl(this.templatePath('routes.js'), this.destinationPath(destPath), content);
  }
});
