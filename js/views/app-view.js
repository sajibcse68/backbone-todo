const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;
const _ = require('lodash');
const TodoView = require('./todo-view');

module.exports = Backbone.View.extend({
   el: '.todoapp',
   statsTemplate: 'stats.html',

    initialize(options){
        console.log('in app-view options is:', options );
        this.todos = options.todos;
        this.filter = options.filter;

        this.$input = this.$('.new-todo');
        this.$list = $('.todo-list');
        this.$main = this.$('.main');
        this.$footer = this.$('.footer');


        this.listenTo(this.todos, 'add', this.addOne);
        this.listenTo(this.todos, 'change:completed', this.filterOne);
        this.listenTo(this.todos, 'all', _.debounce(this.render, 0));
    },
    events: {
        'keypress .new-todo': 'createOnEnter'

    },

    render() {
        console.log('11111');
        const completed = this.todos.completed().length;
        const remaining = this.todos.remaining().length;

        if (this.todos.length){
            this.$main.show();
            this.$footer.show();
            this.$footer.html(global.nunjucksEnv.render(this.statsTemplate, {
                completed: completed,
                remaining: remaining
            }));
            this.$('.filter li a')
                .removeClass('selected')
                .filter('[href="#/' + (this.filter.rule || '') + '"]')
                .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }
    },

    addOne(todo){
        const view = new TodoView({model: todo, filter: this.filter }); // call todo-view initialize(), then render()
        this.$list.append(view.render().el);
    },
    newAttributes() {
        return {
            title: this.$input.val().trim(),
            order: this.todos.nextOrder(),
            completed: false
        }
    },
    createOnEnter(e) {
        if(e.which == ENTER_KEY && this.$input.val().trim()) {  // trim() remove the whitespace from the beginning and end of a string
            this.todos.create(this.newAttributes()); // call this.listenTo(this.todos, 'add', this.addOne);
            this.$input.val('');
        }
    },

    filterOne(todo) {
        todo.trigger('visible'); // trigger the todo's 'this.listenTo(this.model, 'visible', this.toggleVisible);'
    }
});