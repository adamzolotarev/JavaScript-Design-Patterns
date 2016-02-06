/*global ko */

var Cat = Cat || {};
Cat.catClicker = function(){
	'use strict';

	var Cat = function(){
		this.clickCount = ko.observable(0);
		this.name = ko.observable('cat0');
		this.imgSrc = ko.observable('cat0.jpg');
		this.nickNames = ko.observableArray([
			{name: 'Kitty'},
			{name: 'Catopus'},
			{name: 'Cat42'},
			{name: 'Awesomecat'}]);

		this.catLevel = ko.computed(function(){
			if(this.clickCount() < 10){
				return "level 0";
			}
			if(this.clickCount() < 20){
				return "level 1";
			}
			
			return "Master";			
		}, this);
	};
	var ViewModel = function(){
		var self = this;

		this.currentCat = ko.observable(new Cat());
		this.incrementCounter = function(){
			self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		};
	};

	ko.applyBindings(new ViewModel());

}();