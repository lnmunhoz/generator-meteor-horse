<%= nameCapitalized %> = new Mongo.Collection('<%= name %>');

Schemas.<%= nameCapitalized %>Schema = new SimpleSchema({
  <% keys.forEach(function(key){ %>
    <%= key.name %>: {
      type: <%= key.type %>
    },
  <% }) %>
 });
