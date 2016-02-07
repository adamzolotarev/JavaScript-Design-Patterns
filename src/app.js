/*global ko */

var CatNs = CatNs || {};

CatNs.catClicker = function(){
	'use strict';	
	var initialCats = [{
		clickCount: 0,
		name:'cat0',
		imgSrc: 'images/cat0.jpg',
		nicknames:['Kitty', 'Catopus', 'Cat42','Awesomecat']},
		{
		clickCount: 0,
		name:'cat1',
		imgSrc: 'images/cat1.jpg',
		nicknames:['Kitty', 'Catopus', 'Cat42','Awesomecat']},
		{
		clickCount: 0,
		name:'cat2',
		imgSrc: 'images/cat2.jpg',
		nicknames:['Kitty', 'Catopus', 'Cat42','Awesomecat']},
		{
		clickCount: 0,
		name:'cat3',
		imgSrc: 'images/cat3.jpg',
		nicknames:['Kitty', 'Catopus', 'Cat42','Awesomecat']},
		{
		clickCount: 0,
		name:'cat4',
		imgSrc: 'images/cat4.jpg',
		nicknames:['Kitty', 'Catopus', 'Cat42','Awesomecat']}		
	];

	var Cat = function(data) {
		this.clickCount = ko.observable(data.clickCount);
		this.name = ko.observable(data.name);
		this.imgSrc = ko.observable(data.imgSrc);
		this.nickNames = ko.observableArray(data.nicknames);
		this.isActive = ko.observable(false);
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

		this.catList = ko.observableArray([]);		

		initialCats.forEach(function(catItem){
			self.catList.push(new Cat(catItem));
		});
		self.catList()[0].isActive(true);

		this.currentCat = ko.observable(this.catList()[0]);

		this.incrementCounter = function(){
			self.currentCat().clickCount(self.currentCat().clickCount() + 1);
		};

		this.changeCat = function(cat){
			self.currentCat().isActive(false);		
			cat.isActive(true);
			self.currentCat(cat);
		};
		
	};

	ko.applyBindings(new ViewModel());

}();