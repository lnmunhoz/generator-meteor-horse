'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the excellent ' + chalk.red('generator-meteor-horse') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Enter the collection name:'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;
      // To access props later use this.props.someOption;

      this.props.name = this.props.name.toLowerCase();

      done();
    }.bind(this));
  },

  keys: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'key',
      message: 'Enter a ' + chalk.green('key') + ' for the object:'
    }, {
      type: 'list',
      name: 'type',
      message: 'Enter a ' + chalk.blue('type') + ' of the ' + chalk.green('key') + ':',
      choices: [{
        name: 'String'
      }, {
        name: 'Number'
      }, {
        name: 'Boolean'
      }, {
        name: 'Date'
      }, {
        name: 'Object'
      }, {
        name: '[String]'
      }, {
        name: '[Number]'
      }],
      when: function(answers) {
        return answers.key;
      }
    }];

    this.props.keys = [];

    function ask() {
      this.prompt(prompts, function(props) {
        if (props.key) {
          this.props.keys.push({
            name: props.key,
            type: props.type
          });
          ask.call(this);
        } else {
          done();
        }
      }.bind(this));
    }

    ask.call(this);
  },

  writing: function() {
    var collectionName = this.props.name;
    var content = {
      collectionName: collectionName,
      collectionNameCapitalized: collectionName[0].toUpperCase() + collectionName.slice(1),
      keys: this.props.keys
    };

    this.fs.copyTpl(this.templatePath('model.js'), this.destinationPath('app/lib/models/' + this.props.name + '.js'), content);
  }
});
