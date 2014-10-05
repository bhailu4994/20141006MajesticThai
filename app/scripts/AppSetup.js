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
		name: 'i',
		needsMeat: 'false',
		needsNoodle: 'false',
		quantity: 1
	},
});

App.Models.Starter = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	},
});

App.Models.Entree = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	}
});

App.Models.Dessert = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	}
});

App.Models.BasicDrink = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	},
});

App.Models.Beer = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	},
});

App.Models.ThaiDrink = App.Models.MenuItem.extend ({
	defaults: {
		name: 'i',
	},
});

// App.Models.ItemToOrder = App.Models.MenuItem.extend({

// });

// COLLECTIONS

App.Collections.MenuItems = Backbone.Collection.extend ({
	model: App.Models.MenuItem
});

App.Collections.StartersList = App.Collections.MenuItems.extend ({
	model: App.Models.Starter,
});
var starters = [ {name: 'Thai Chicken Wings'}, {name: 'Som Tam'} ];

App.Collections.EntreesList = App.Collections.MenuItems.extend ({
	model: App.Models.Entree,
});
var entrees = [ {name: 'Gaeng Kiowan', needsMeat: true, meatType: 'chicken'}, {name: 'Red Curry', needsMeat: true}, {name: 'Noodle Soup', needsMeat: true, needsNoodle: true}, {name: 'Pad Thai', needsMeat: true}, {name: 'Pad Ka Pow Moo Kai Dow'}, {name: 'Chicken and Salsa on rice'} ];

App.Collections.DessertsList = App.Collections.MenuItems.extend ({
	model: App.Models.Dessert,
});
var desserts = [ {name: 'Fruit Plate'} ];

App.Collections.BasicDrinksList = App.Collections.MenuItems.extend ({
	model: App.Models.BasicDrink,
});
var basicDrinks = [ {name: 'Coke'} ];

App.Collections.BeerList = App.Collections.MenuItems.extend ({
	model: App.Models.Beer,
});
var beers = [ {name: 'Chang'}, {name: 'Dead Guy Ale'}, {name: 'Heineken'}, {name: 'Newcastle'}, {name: 'Singha'} ];

App.Collections.ThaiDrankList = App.Collections.MenuItems.extend ({
	model: App.Models.ThaiDrink,
});
var thaiDrank = [ {name: 'Thai Iced Tea'}, {name: 'Thai Red Bull'}, {name: 'Sang Som'} ];


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
		var entreesList = new App.Collections.EntreesList();
		entreesList.set(entrees);
		var entreesView = new App.Views.EntreesView({collection: entreesList});
		entreesView.render(); 
		var dessertsList = new App.Collections.DessertsList();
		dessertsList.set(desserts);
		var dessertsView = new App.Views.DessertsView({collection: dessertsList});
		dessertsView.render();
	}
});

App.Views.DrinksView = Backbone.View.extend ({
	
	template: _.template( $('#menuSectionView').text() ),

	description: 'Our drinks are the shit yo.',

	render: function () {
		this.$el.html(this.template());
		$('.dynamicViewLoader').append(this.el);
		var basicDrinksList = new App.Collections.BasicDrinksList();
		basicDrinksList.set(basicDrinks);
		var basicDrinksView = new App.Views.BasicDrinksView({collection: basicDrinksList});
		basicDrinksView.render();
		var beerList = new App.Collections.BeerList(); 
		beerList.set(beers);
		var beersView = new App.Views.BeersView({collection: beerList});
		beersView.render();
		var thaiDrankList = new App.Collections.ThaiDrankList(); 
		thaiDrankList.set(thaiDrank);
		var thaiDrankView = new App.Views.ThaiDrankView({collection: thaiDrankList});
		thaiDrankView.render();
	}
});

App.Views.SpecialsView = Backbone.View.extend ({
	render: function () {
		this.$el.html('Once we can afford it we will post daily specials and combo meals here. For now though we\'re just trying to pay back our Iron Yard tuition!');
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
		this.listenTo(this.collection, 'remove', this.render);
	},

	template: _.template( $('#sCartView').text() ),

	events: {
		'click button[class=removeIt]': 'removeFromSCart'
	},

	removeFromSCart: function (event) {
		console.log(this.model);	/* Not working */
		var buttonID = this.button["data-id"];
		var toBeDeleted = this.collection.findWhere({cid: buttonID})
		this.collection.remove(toBeDeleted);
	},

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

		this.model.set({quantity: $('#quantity').val()});

		if (this.model.get('needsMeat') === true) {
    		if ($("#meatSelect").val() == "1") {
        		this.model.set({meatType: "chicken"});
    		} else if ($("#meatSelect").val() == '2') {
        		this.model.set({meatType: "pork"});
    		} else {
        		this.model.set({meatType: "vegetarian"});
    		}
		};	

		if (this.model.get('needsNoodle') === true) {
    		if ($("#noodleSelect").val() == "1") {
        		this.model.set({noodleType: "Sen Yai"});
    		} else if ($("#noodleSelect").val() == '2') {
        		this.model.set({noodleType: "Sen Lek"});
    		} else {
        		this.model.set({noodleType: "Sen Mee"});
    		}
		};	


		sCartView.collection.add(this.model);
		$('.highlightedItem').empty();
		this.$el.html(this.model.get('name') + ' has been added to your order :)');
		$('.highlightedItem').append(this.el);
		// console.log(itemToOrder);
		// console.log(sCartView.collection.length);
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

	catTitle: 'Starters & Sides',

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

App.Views.EntreesView = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Entrees',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	this.collection.each(_.bind(this.renderChild, this));
	},

	renderChild: function(entree){
    var itemView = new App.Views.ItemView({ model: entree });
    itemView.render();
    this.$el.append(itemView.el);
  	}

});


App.Views.DessertsView = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Desserts',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	this.collection.each(_.bind(this.renderChild, this));
	},

	renderChild: function(menuItem){
    var itemView = new App.Views.ItemView({ model: menuItem });
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
	this.collection.each(_.bind(this.renderChild, this));
	},

	renderChild: function(basicDrink){
    var itemView = new App.Views.ItemView({ model: basicDrink });
    itemView.render();
    this.$el.append(itemView.el);
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

App.Views.ThaiDrankView = Backbone.View.extend ({
	
	template: _.template( $('#specificCatView').text() ),

	catTitle: 'Thai Drank',

	render: function () {
	this.$el.html(this.template());
	$('.description').append(this.el);
	this.collection.each(_.bind(this.renderChild, this));
	},

	renderChild: function(menuItem){
    var itemView = new App.Views.ItemView({ model: menuItem });
    itemView.render();
    this.$el.append(itemView.el);
  	}

});





}());