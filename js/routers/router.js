const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
  constructor(options) {
    // this call 'routes'
    Backbone.Router.prototype.constructor.call(this, options);
    this.todos = options.todos;
    this.filter = options.filter;
  },

  routes: {
    '*filter': 'setFilter'
  },

  setFilter(param) {
    this.filter.rule = param || '';
    this.todos.trigger('filter');  // trigger todos's filter
  }
});
