'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var pluralize = require('pluralize');

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

      // Asserts lowercase and plural name
      this.props.name = pluralize(this.props.name.toLowerCase());

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
    }, {
      type: 'confirm',
      name: 'optional',
      message: 'This field is optional?',
      default: false,
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
            type: props.type,
            optional: props.optional
          });
          ask.call(this);
        } else {
          done();
        }
      }.bind(this));
    }

    ask.call(this);
  },

  views: function() {
    this.composeWith('meteor-horse:views', {
      options: {
        keys: this.props.keys,
        collectionName: this.props.name
      }
    });
  }

  // writing: function () {
  //   this.fs.copy(
  //     this.templatePath('dummyfile.txt'),
  //     this.destinationPath('dummyfile.txt')
  //   );
  // },

  // install: function () {
  //   this.installDependencies();
  // }
});
