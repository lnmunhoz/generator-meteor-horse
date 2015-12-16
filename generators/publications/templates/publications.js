Meteor.publishComposite('<%= collectionName %>', function(){
  this.unblock();
  return {
    find() {
      this.unblock();
      return <%= collectionNameCapitalized %>.find({});
    }
  }
});

Meteor.publishComposite('<%= collectionNameSingular %>', function(id) {
  check(id, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      return <%= collectionNameCapitalized %>.find({
        _id: id
      });
    }
  }
});
