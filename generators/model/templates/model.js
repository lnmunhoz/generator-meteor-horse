<%= collectionNameCapitalized %> = new Mongo.Collection('<%= collectionName %>');

Schemas.<%= collectionNameSingularCapitalized %> = new SimpleSchema({
  <% keys.forEach(function(key){ %>
    <%= key.name %>: {
      type: <%= key.type %>,
    <% if (key.optional){ %>
      optional: true
    <% } %>
    },
  <% }) %>
 });

<%= collectionNameCapitalized %>.attachSchema(Schemas.<%= collectionNameSingularCapitalized %>);
