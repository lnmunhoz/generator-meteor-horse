var <%= collectionName %>SubsManager = new SubsManager();

var <%= collectionName %>Routes = FlowRouter.group({
  prefix: '/<%= collectionName %>',
  name: '<%= collectionName %>'
});

<%= collectionName %>Routes.route('/', {
  name: '<%= collectionName %>.index',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: '<%= collectionName %>Index'
    });
  }
});

<%= collectionName %>Routes.route('/add', {
  name: '<%= collectionName %>.add',
  action() {
    BlazeLayout.render('defaultLayout', {
      main: '<%= collectionName %>Add'
    });
  }
});

<%= collectionName %>Routes.route('/:id/show', {
  name: '<%= collectionName %>.show',
  subscriptions: function(params) {
    this.register('<%= collectionNameSingular %>', <%= collectionName %>SubsManager.subscribe('<%= collectionNameSingular %>', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: '<%= collectionName %>Show'
    });
  },
});

<%= collectionName %>Routes.route('/:id/edit', {
  name: '<%= collectionName %>.edit',
  subscriptions: function(params) {
    this.register('<%= collectionNameSingular %>', <%= collectionName %>SubsManager.subscribe('<%= collectionNameSingular %>', params.id));
  },
  action() {
    BlazeLayout.render('defaultLayout', {
      main: '<%= collectionName %>Edit'
    });
  },
});

