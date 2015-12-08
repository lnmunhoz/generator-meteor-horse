'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the tremendous ' + chalk.red('generator-meteor-horse') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'collectionName',
      message: 'Enter the collection name:'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function() {
    var collectionName = this.props.collectionName;
    var destPath = 'app/client/views/' + collectionName + '/' + collectionName;
    var content = {
      collectionName: collectionName,
      collectionNameCapitalized: collectionName[0].toUpperCase() + collectionName.slice(1)
    };

    // Add
    this.fs.copyTpl(this.templatePath('view_add.html'), this.destinationPath(destPath + '_add.html'), content);
    this.fs.copyTpl(this.templatePath('view_add.js'), this.destinationPath(destPath + '_add.js'), content);

    // Edit
    this.fs.copyTpl(this.templatePath('view_edit.html'), this.destinationPath(destPath + '_edit.html'), content);
    this.fs.copyTpl(this.templatePath('view_edit.js'), this.destinationPath(destPath + '_edit.js'), content);
  }
});
