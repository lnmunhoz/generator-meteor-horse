FlowRouter.route('/', {
  name: 'index',
  action() {
    BlazeLayout.render('defaultLayout', {
      content: 'index'
    });
  },
});
