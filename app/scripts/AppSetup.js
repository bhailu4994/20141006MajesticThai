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
var starters = [ 
{name: 'Satay', description: 'Set of 4 skewers.', price: 15, needsMeat: true, imageUrl: 'images/satay.jpg' },
{name: 'Som Tam', price: 15, imageUrl: 'images/somTam.jpg'} ,
{name: 'Thai Chicken Wings', price: 40, imageUrl: 'images/chickenWings.jpg'} 
];

App.Collections.EntreesList = App.Collections.MenuItems.extend ({
	model: App.Models.Entree,
});
var entrees = [ 
{name: 'Gaeng Kiew Wan', price: 35, needsMeat: true, meatType: 'chicken', imageUrl: 'images/greenCurry.jpg'}, 
{name: 'Gaeng Pet', price: 35, needsMeat: true, imageUrl: 'images/gaengPet.gif'}, 
{name: 'Noodle Soup', price: 15, needsMeat: true, needsNoodle: true, imageUrl: 'images/thaiNoodle.jpeg'}, 
{name: 'Pad Thai', price: 25, needsMeat: true, imageUrl: 'images/padThai.jpg'}, 
{name: 'Pad Ka Prow Moo Khai Dow', description: 'Make sure you slice the egg yolk open first so you can dip each bite in it. Pat\'s favorite Thai street food!', price: 30, imageUrl: 'images/padKaiDow.jpg'}, 
{name: 'Khow Man Kai', description: 'Hainan chicken served with cucumber slices and Thai chili salsa. Delicious!', price: 20, imageUrl: 'images/khowManKai3.jpg'} 
];

App.Collections.DessertsList = App.Collections.MenuItems.extend ({
	model: App.Models.Dessert,
});
var desserts = [ 
{name: 'Fruit Plate', price: 15, imageUrl: 'images/fruitPlate.jpg'},
{name: 'Khao Neow Dam', description: 'Sweet black sticky rice with shredded coconut on top.', price: 5, imageUrl: 'images/blackStickyRice.jpg'} 
];

App.Collections.BasicDrinksList = App.Collections.MenuItems.extend ({
	model: App.Models.BasicDrink,
});
var basicDrinks = [ 
{name: 'Coconut Water', price: 15, imageUrl: 'images/coconutWater.jpeg'},
{name: 'Coke', price: 5, imageUrl: 'images/coke.jpeg'}

];

App.Collections.BeerList = App.Collections.MenuItems.extend ({
	model: App.Models.Beer,
});
var beers = [ 
{name: 'Chang', price: 10, imageUrl: 'images/chang.jpeg'}, 
{name: 'Dead Guy Ale', price: 55, imageUrl: 'images/deadGuyAle.jpg'}, 
{name: 'Heineken', price: 35, imageUrl: 'images/heineken.jpeg'}, 
{name: 'Newcastle', price: 45, imageUrl: 'images/newcastle.jpg'}, 
{name: 'Singha', price: 15, imageUrl: 'images/singha.jpeg'} 
];

App.Collections.ThaiDrankList = App.Collections.MenuItems.extend ({
	model: App.Models.ThaiDrink,
});
var thaiDrank = [ 
{name: 'Thai Iced Tea', price: 10, imageUrl: 'images/thaiIcedTea.jpeg'}, 
{name: 'Thai Red Bull', price: 20, imageUrl: 'images/thaiRedBull.jpeg'}, 
{name: 'Sang Som', price: 20, imageUrl: 'images/sangSom.jpg'} 
];


App.Collections.ItemsToOrder = Backbone.Firebase.Collection.extend ({
	model: App.Models.MenuItem,
	firebase: "http://majesticthai.firebaseIO.com/orders/" + Date.now()
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

	description: 'Before you even ask, yes it\'s all organic. Mai pen rai.',

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

	description: 'Our drinks make it rain like it\'s monsoon season.',

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
		$('.'+this.catTitle).append(this.el);				/*NOT SURE THIS IS NECESSARY...SEE LAST LINE OF (e.g.) STARTERSVIEW's RENDERCHILD FN...*/
	},

});


App.Views.SCartView = Backbone.View.extend ({
	
	tagName: 'ul',
	initialize: function() {
		this.listenTo(this.collection, 'add', this.render);	/*line 75 in last project didn't have () here...*/
		this.listenTo(this.collection, 'remove', this.render);
	},

	template: _.template( $('#sCartView').text() ),
	
	events: {
		'click button[class=placeOrder]': 'placeOrder'
	},

	render: function () {
		console.log(this.collection.length);

		// var totalCost = this.calculateTotal(this.collection.models);		SEE Fn Below
		this.$el.html(this.template({collection: this.collection}));			/*Need {collection: this.collection}?*/
		$('.shoppingCart').empty();
		$('.shoppingCart').append(this.el);
		this.collection.each(_.bind(this.renderChild, this));
		$('.shoppingCart').prepend('YOUR ORDER:');
	},

	renderChild: function (menuItem) {
		var sCartItemView = new App.Views.SCartItemView({ model: menuItem });

    	sCartItemView.render();
    	this.$el.prepend(sCartItemView.el);
	},

	// calculateTotal: function (collection) {
	// 	_.chain(this.collection.models)
	// 		.each(function(model) {return this.model.get('price')})
	// 		.reduce(function (acum, b) {return acum + b;})
	// 		.value();
	// }

	placeOrder: function(event) {
		console.log('collection:', this.collection);
		// this.collection.save();
		// this.collection.create('PLACED');
		alert('Your order has been placed.');

		console.log('hi');
		$('.highlightedItem').empty();
		this.$el.empty();
		// this.collection.reset();
		// this.collection = new App.Collections.ItemsToOrder();
		// itemsToOrder = new App.Collections.ItemsToOrder();
		// this.collection = itemsToOrder;
	}


});

App.Views.SCartItemView = Backbone.View.extend ({
	
	initialize: function () {
		this.collection = sCartView.collection;
	},

	tagName: 'li',
	template: _.template( $('#sCartLineItemView').text() ),

	events: {
		'click button': 'removeFromSCart'
	},

	removeFromSCart: function (event) {
		console.log(this.model);	/* Not working */
		// var buttonID = this.button["data-id"];
		// var toBeDeleted = this.collection.findWhere({cid: buttonID})
		window.totalCost = window.totalCost - (this.model.get('price') * this.model.get('quantity'));
		this.collection.remove(this.model);
		$('.highlightedItem').empty();
		$('.highlightedItem').html('<h5>' + this.model.get('name') + ' has been removed from your order :)</h5>');
	},

	render: function () {
		// console.log("Model: ",this.model)
		this.$el.html(this.template({model: this.model}));
		// $('.'+this.catTitle).append(this.el);		/*NOT SURE THIS IS NECESSARY...*/
	},

});



var itemsToOrder = new App.Collections.ItemsToOrder();		 /* SO JAKE PUT THIS IN ROUTER INITIALIZE... SHOULD HAVE BEEN window.itemsToOrder? */
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
        	} else if ($("#meatSelect").val() == '3') {
        		this.model.set({meatType: "shrimp"});
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

		window.totalCost = window.totalCost + (this.model.get('price') * this.model.get('quantity'));

		sCartView.collection.create(this.model);
		$('.highlightedItem').empty();
		this.$el.html('<h5>' + this.model.get('name') + ' has been added to your order :)</h5>');
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


})();