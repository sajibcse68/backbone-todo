const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;
const _ = require('lodash');
const TodoView = require('./todo-view');

module.exports = Backbone.View.extend({
   el: '.todoapp',
   // statsTemplate: 'stats.html',

    initialize(options){
        console.log('in app-view options is:', options );
        this.todos = options.todos;
        this.filter = options.filter;

        this.$input = this.$('.new-todo');
        this.$list = $('.todo-list');

        this.listenTo(this.todos, 'add', this.addOne);
    },
    events: {
        'keypress .new-todo': 'createOnEnter'

    },
    addOne(todo){
        console.log('addOne');
        const view = new TodoView({model: todo, filter: this.filter }); // call todo-view initialize(), then render()
        // debugger;
        this.$list.append(view.render().el);
    },
    newAttributes() {
      return {
          title: this.$input.val().trim(),
          // order: this.todos.nextOrder(),
          completed: false
      }
    },
    createOnEnter(e) {
      if(e.which == ENTER_KEY && this.$input.val().trim()) {  // trim() remove the whitespace from the beginning and end of a string
          this.todos.create(this.newAttributes()); // call this.listenTo(this.todos, 'add', this.addOne);
          this.$input.val('');
      }
    },
    render() {
        const completed = this.todos.completed().length;
        const remaining = this.todos.remaining().length;

    },


});