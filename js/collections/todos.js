const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');
const Todo = require('../models/todo');

module.exports = Backbone.Collection.extend({
   model: Todo,
   localStorage: new Backbone.LocalStorage('todos-backbone'),

   completed() {
      return this.where({ completed: true });
   },

   remaining() {
      return this.where({ completed: false });
   },

   nextOrder() {
      return this.length ? this.last().get('order') + 1 : 1;
   },

   comparator: 'order'
});

