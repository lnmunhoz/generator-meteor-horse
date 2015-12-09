'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var ncp = require('ncp').ncp;


module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-meteor-horse') + ' generator!'
    ));

    done();
  },

  writing: function() {
    var rootPath = this.destinationRoot() + '/app';
    var templatePath = this.sourceRoot() + '/app';
    ncp(templatePath, rootPath, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('done!');
    });
  }
});
