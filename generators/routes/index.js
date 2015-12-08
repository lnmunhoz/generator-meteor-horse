'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

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
      // To access props later use this.props.someOption;

      this.props.name = this.props.collectionName.toLowerCase();

      done();
    }.bind(this));
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
