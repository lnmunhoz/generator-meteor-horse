'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pluralize = require('pluralize');

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
      this.props.collectionName = pluralize(this.options.collectionName.toLowerCase());
      done();
    } else {
      var prompts = [{
        type: 'input',
        name: 'collectionName',
        message: 'Enter the collection name:'
      }];

      this.prompt(prompts, function(props) {
        this.props = props;
        this.props.collectionName = pluralize(this.props.collectionName.toLowerCase());
        done();
      }.bind(this));
    }
  },

  writing: function() {
    var collectionName = this.props.collectionName;
    var collectionNameSingular = pluralize(collectionName, 1);
    var collectionNameCapitalized = collectionName[0].toUpperCase() + collectionName.slice(1);
    var content = {
      collectionName: collectionName,
      collectionNameSingular: collectionNameSingular,
      collectionNameCapitalized: collectionNameCapitalized
    };

    var destinationPath = 'app/server/publications/' + this.props.collectionName + '_publications.js';
    this.fs.copyTpl(this.templatePath('publications.js'), this.destinationPath(destinationPath), content);
  }
});
