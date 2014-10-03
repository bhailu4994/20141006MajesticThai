// Glue Code

$(document).ready(function(){

'use strict';

	var menuItem = new App.Models.MenuItem();

	var menuItems = new App.Collections.MenuItems();

	var mainView = new App.Views.MainView({collection: menuItems});
	
	var foodView = new App.Views.FoodView();
		foodView.render();

});