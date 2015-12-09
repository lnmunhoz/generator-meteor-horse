<%= nameCapitalized %> = new Mongo.Collection('<%= name %>');

Schemas.<%= nameSingularCapitalized %> = new SimpleSchema({
  <% keys.forEach(function(key){ %>
    <%= key.name %>: {
      type: <%= key.type %>,
    <% if (key.optional){ %>
      optional: true
    <% } %>
    },
  <% }) %>
 });

<%= nameCapitalized %>.attachSchema(Schemas.<%= nameSingularCapitalized %>);
