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

    if (this.options.collectionName) {
      this.props.collectionName = this.options.collectionName;
      done();
    } else {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the excellent ' + chalk.red('generator-meteor-horse') + ' generator!'
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

  keys: function() {
    var done = this.async();

    if (this.options.keys) {
      this.props.keys = this.options.keys;
      done();
    } else {
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
    }
  },

  writing: function() {
    var content = contentForTpl(this.props.collectionName);
    content.keys = this.props.keys;

    this.fs.copyTpl(this.templatePath('model.js'), this.destinationPath('app/lib/models/' + content.collectionName + '.js'), content);
  }
});
