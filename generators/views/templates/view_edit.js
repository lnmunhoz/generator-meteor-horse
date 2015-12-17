Template.<%= collectionName %>Edit.events({

});

Template.<%= collectionName %>Edit.helpers({
  <%= collectionNameSingular %>: function(){
    return <%= collectionNameCapitalized %>.findOne({
      _id: FlowRouter.getParam('id')
    });
  }
});

Template.<%= collectionName %>Edit.onCreated(function() {

});

Template.<%= collectionName %>Edit.onRendered(function() {

});

Template.<%= collectionName %>Edit.onDestroyed(function() {

});
