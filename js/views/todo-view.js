const Backbone = require('backbone');
const $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
   tagName: 'li',
   template: 'item.html',
   initialize(options) {
       console.log('options is: ', options);
       this.filter = options.filter;
   },
   events: {

   },
   render() {

       if(this.model.changed.id !== undefined){
           console.log('this.model.changed.id is: ', this.model.changed.id);
           return this;
       }

       console.log('this.model.toJSON is: ', this.model.toJSON());
       this.$el.html(global.nunjucksEnv.render(this.template, this.model.toJSON()));
       console.log('render');
       this.$input = this.$('.edit');
       return this;
   }
});