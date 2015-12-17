'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
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

    // If comes from scaffold, ends here.
    if (this.options.collectionName) {
      this.props.collectionName = this.options.collectionName;
      done();
    } else {
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
        done();
      }.bind(this));
    }
  },

  writing: function() {
    var content = contentForTpl(this.props.collectionName);
    content.keys = this.options.keys;

    var destPath = 'app/client/views/' + content.collectionName + '/' + content.collectionName;

    // Add
    this.fs.copyTpl(this.templatePath('view_add.html'), this.destinationPath(destPath + '_add.html'), content);
    this.fs.copyTpl(this.templatePath('view_add.js'), this.destinationPath(destPath + '_add.js'), content);

    // Edit
    this.fs.copyTpl(this.templatePath('view_edit.html'), this.destinationPath(destPath + '_edit.html'), content);
    this.fs.copyTpl(this.templatePath('view_edit.js'), this.destinationPath(destPath + '_edit.js'), content);

    // Index
    this.fs.copyTpl(this.templatePath('view_index.html'), this.destinationPath(destPath + '_index.html'), content);
    this.fs.copyTpl(this.templatePath('view_index.js'), this.destinationPath(destPath + '_index.js'), content);

    // Show
    this.fs.copyTpl(this.templatePath('view_show.html'), this.destinationPath(destPath + '_show.html'), content);
    this.fs.copyTpl(this.templatePath('view_show.js'), this.destinationPath(destPath + '_show.js'), content);
  }
});
