var <%= collectionName %>SubsManager = new SubsManager();

var <%= collectionName %>Routes = FlowRouter.group({
  prefix: '/<%= collectionName %>',
  name: '<%= collectionName %>',
});

<%= collectionName %>Routes.route('/', {
  name: '<%= collectionName %>.index',
  action() {
    BlazeLayout.render('defaultLayout', {
      content: '<%= collectionName %>Index'
    });
  }
});

<%= collectionName %>Routes.route('/add', {
  name: '<%= collectionName %>.add',
  action() {
    BlazeLayout.render('defaultLayout', {
      content: '<%= collectionName %>Add'
    });
  }
});

<%= collectionName %>Routes.route('/:id/show', {
  name: '<%= collectionName %>.show',
  subscriptions: function(params) {
    this.register('<%= collectionName %>', <%= collectionName %>SubsManager.subscribe('<%= collectionName %>', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      content: '<%= collectionName %>Show'
    });
  },
});

<%= collectionName %>Routes.route('/:id/edit', {
  name: '<%= collectionName %>.edit',
  subscriptions: function(params) {
    this.register('<%= collectionName %>', <%= collectionName %>SubsManager.subscribe('<%= collectionName %>', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      content: '<%= collectionName %>Edit'
    });
  },
});

