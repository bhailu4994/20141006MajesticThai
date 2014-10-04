(function(){
'use strict';


window.App = {};
App.Models = {};
App.Collections = {};
App.Views = {};
App.Routers = {};


// MODELS

App.Models.MenuItem = Backbone.Model.extend ({
	defaults: {
		name: '',
	},
});

App.Models.Starter = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	},
})

App.Models.Beer = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	},
});

App.Models.ItemToOrder = App.Models.MenuItem.extend({

});

// COLLECTIONS

App.Collections.MenuItems = Backbone.Collection.extend ({
	model: App.Models.MenuItem
});

App.Collections.StartersList = App.Collections.MenuItems.extend ({
	model: App.Models.Starter,
});
var starters = [ {name: 'Thai Chicken Wings'}, {name: 'Som Tam'} ];

App.Collections.BeerList = App.Collections.MenuItems.extend ({
	model: App.Models.Beer,
});
var beers = [ {name: 'Chang'}, {name: 'Dead Guy Ale'}, {name: 'Heineken'}, {name: 'Newcastle'}, {name: 'Singha'} ];


App.Collections.ItemsToOrder = App.Collections.MenuItems.extend ({
	model: App.Models.MenuItem
});


// VIEWS

App.Views.MainView = Backbone.View.extend ({
	initialize: function() {
		this.render();
	},

	template: _.template( $('#topNav').text() ),
	
	render: function() {
		this.$el.html(this.template());
		$('.loadMenu').append(this.el);
	},

	events: {
		'click button[class=food]': 'renderFoodView',
		'click button[class=drinks]': 'renderDrinksView',
		'click button[class=specials]': 'renderSpecialsView'
	},

	renderFoodView: function() {
		$('.dynamicViewLoader').empty();
		var foodView = new App.Views.FoodView();
		foodView.render();
	},

	renderDrinksView: function() {
		$('.dynamicViewLoader').empty();
		var drinksView = new App.Views.DrinksView();
		drinksView.render();
	},

	renderSpecialsView: function() {
		$('.dynamicViewLoader').empty();
		var specialsView = new App.Views.SpecialsView();
		specialsView.render();
	}

});


App.Views.FoodView = Backbone.View.extend ({	
	
	template: _.template( $('#menuSectionView').text() ),

	description: 'All organic, k?',

	render: function () {
		this.$el.html(this.template());
		$('.dynamicViewLoader').append(this.el);
		var startersList = new App.Collections.StartersList();
		startersList.set(starters);
		var startersView = new App.Views.StartersView({collection: startersList});
		startersView.render();
	}
});

App.Views.DrinksView = Backbone.View.extend ({
	
	template: _.template( $('#menuSectionView').text() ),

	description: 'Our drinks are the shit yo.',

	render: function () {
		this.$el.html(this.template());
		$('.dynamicViewLoader').append(this.el);
		var basicDrinksView = new App.Views.BasicDrinksView();
		basicDrinksView.render();
		var beerList = new App.Collections.BeerList(); 
		beerList.set(beers);
		var beersView = new App.Views.BeersView({collection: beerList});
		beersView.render();
		var thaiDrankView = new App.Views.ThaiDrank();
		thaiDrankView.render();
	}
});

App.Views.SpecialsView = Backbone.View.extend ({
	render: function () {
		this.$el.html('FUCK');
		$('.dynamicViewLoader').append(this.el);
	}
});


App.Views.ItemView = Backbone.View.extend ({
	tagName: 'li',
	template: _.template( $('#thumbnailView').text() ),

	events: {
		'click button': 'displayInSidebar'
	},

	displayInSidebar: function(event) {
		// pass model to sidebarView
		// console.log(event);
		if (!hItemView) {
		var hItemView = new App.Views.HItemView({ model: this.model });
		};
		hItemView.render();
	},

	render: function () {
		// console.log("Model: ",this.model)
		this.$el.html(this.template());
		$('.'+this.catTitle).append(this.el);
	},

});


App.Views.SCartView = Backbone.View.extend ({
	
	initialize: function() {
		this.listenTo(this.collection, 'add', this.render);	/*line 75 in last project didn't have () here...*/
	},

	template: _.template( $('#sCartView').text() ),

	render: function () {
		console.log(this.collection.length);
		this.$el.html(this.template({collection: this.collection}));
		$('.shoppingCart').empty();
		$('.shoppingCart').append(this.el);
	}
});



var itemsToOrder = new App.Collections.ItemsToOrder();
var sCartView = new App.Views.SCartView({collection: itemsToOrder});



App.Views.HItemView = Backbone.View.extend ({
	
	initialize: function () {
		this.collection = itemsToOrder;
	},

	template: _.template( $('#hItemView').text() ),

	events: {
		'click button[class=addIt]': 'addToSCartList'
	},

	addToSCartList: function(event) {
		console.log(event);
		// if (!window.itemsToOrder) { 
		// 	window.itemsToOrder = new App.Collections.ItemsToOrder(); 
		// 	window.sCartView = new App.Views.SCartView({collection: window.itemsToOrder});
		// }
		// var itemToOrder = this.model;
		this.collection.add(this.model);
		console.log(this.model);
		// console.log(itemToOrder);
		console.log(sCartView.collection.length);
		console.log("Colleciton: ",this.collection)

		// console.log(this.model);
	},

	render: function () {
		this.$el.html(this.template());
		$('.highlightedItem').empty();
		$('.highlightedItem').append(this.el);
	}
});





// SPECIFIC CATEGORY VIEWS


App.Views.StartersView = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Starters',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	this.collection.each(_.bind(this.renderChild, this));
	},

	renderChild: function(starter){
    var itemView = new App.Views.ItemView({ model: starter });
    itemView.render();
    this.$el.append(itemView.el);
  	}

});


App.Views.BasicDrinksView = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Basic Drinks',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	}
});

App.Views.BeersView = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Beers',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	this.collection.each(_.bind(this.renderChild, this));
	},

	renderChild: function(beer){
    var itemView = new App.Views.ItemView({ model: beer });
    itemView.render();
    this.$el.append(itemView.el);
  	}

});

App.Views.ThaiDrank = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Thai Drank',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	}
});





}());