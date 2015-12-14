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
      this.props.name = this.options.collectionName;
      done();
    } else {
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
    var name = this.props.name;
    var nameCapitalized = name[0].toUpperCase() + name.slice(1);
    var nameSingularCapitalized = pluralize(nameCapitalized, 1);
    var content = {
      name: name,
      nameCapitalized: nameCapitalized,
      nameSingularCapitalized: nameSingularCapitalized,
      keys: this.props.keys
    };

    this.fs.copyTpl(this.templatePath('model.js'), this.destinationPath('app/lib/models/' + this.props.name + '.js'), content);
  }
});
