const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
   tagName: 'li',
   template: 'item.html',

   initialize(options) {
       this.filter = options.filter;

       this.listenTo(this.model, 'change', this.render);
       this.listenTo(this.model, 'destroy', this.remove);
       this.listenTo(this.model, 'visible', this.toggleVisible);
   },
   events: {
       'click .toggle': 'toggleCompleted',
       'dblclick label': 'edit',
       'click .destroy': 'clear',
       'keypress .edit': 'updateOnEnter',
       'keydown .edit': 'revertOnEscape',
       'blur .edit': 'close',

   }
   ,
   render() {

       if(this.model.changed.id !== undefined){
           return this;
       }

       this.$el.html(global.nunjucksEnv.render(this.template, this.model.toJSON()));
       this.$input = this.$('.edit');
       return this;
   },

   toggleCompleted() {
       this.model.toggle();
   },

    isHidden() {
        return this.model.get('completed') ?
        this.filter.rule === 'active' :
        this.filter.rule === 'completed';
    },

    toggleVisible() {
        this.$el.toggleClass('hidden', this.isHidden());
    },

   edit() {
     this.$el.addClass('editing'); // replace this list with input field

     // this.$input.focus();
   },

   close() {
     const value = this.$input.val();
     const trimmedValue = value.trim();

     if (!this.$el.hasClass('editing')){
         return;
     }

     if(trimmedValue){
         this.model.save({ title: trimmedValue });
     } else {
         this.clear();
     }

     this.$el.removeClass('editing');
   },

   updateOnEnter(e) {
       if(e.which === ENTER_KEY) {
           this.close();
       }
   },

    revertOnEscape(e) {
        if(e.which === ESC_KEY) {
            this.$el.removeClass('editing');
            // this.$input.val(this.model.get('title'));
        }
    },
    clear() {
        this.model.destroy();
    }

});