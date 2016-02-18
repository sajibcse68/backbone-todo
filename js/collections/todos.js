const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');
const Todo = require('../models/todo');

module.exports = Backbone.Collection.extend({
   model: Todo,
   localStorage: new Backbone.LocalStorage('todos-backbone'),

   yz() {
      console.log(this.model);
},

});

