'use strict';
var pluralize = require('pluralize');

module.exports = {
  contentForTpl: function(collectionName) {
    collectionName = pluralize(collectionName.toLowerCase());

    return {
      collectionName: collectionName,
      collectionNameSingular: pluralize(collectionName, 1),
      collectionNameCapitalized: collectionName[0].toUpperCase() + collectionName.slice(1),
      collectionNameSingularCapitalized: pluralize(collectionName[0].toUpperCase() + collectionName.slice(1), 1)
    };
  }
};
