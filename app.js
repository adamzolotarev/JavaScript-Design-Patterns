var Cat = Cat || {};
Cat.catClicker = function(){
	'use strict';

	var model = {
		init: function(numberOfCats){
			this.catClicks = this.catClicks || [];			
			this.numberOfCats = numberOfCats;
			this.catName;
		},
		incrementCatClicks: function(){
			this.catClicks[this.currentCatNumber] = (this.catClicks[this.currentCatNumber] || 0) + 1;
		},
		setCurrentCat: function(catNumber){
			this.currentCatNumber = catNumber;
			this.catName = 'cat#' + catNumber;
		},
		getCurrentCatNumber: function(){
			return this.currentCatNumber;
		},
		getCatClickCount: function(){
			return this.catClicks[model.getCurrentCatNumber()] || 0;
		},
		getNumberOfCats: function(){
			return this.numberOfCats;
		},
		getCatName: function(){
			return this.catName;
		}
	};

	var octopus = {
		incrementCatClicks: function(){
			model.incrementCatClicks();
			catDisplayView.render();
		},
		setCurrentCat: function(catNumber){
			model.setCurrentCat(catNumber);
			catDisplayView.render();
		},
		getCurrentCatNumber : function(){
			return model.getCurrentCatNumber();
		},
		getClickCount: function(){
			return model.getCatClickCount();
		},
		getNumberOfCats: function(){
			return model.getNumberOfCats();
		},
		getCatName: function(){
			return model.getCatName();
		},		
		init: function(numberOfCats){
			model.init(numberOfCats);
			catListView.init();
			catDisplayView.init();			
		}
	};

	var catDisplayView = {
		init: function(){
			this.catImage = document.getElementById('cat-picture');
			this.catClickCounter = document.getElementById('click-counter');			
			this.catNameArea = document.getElementById('cat-name');
			this.catImage.addEventListener('click', function(e){
				octopus.incrementCatClicks();
				e.preventDefault;
			});
			catDisplayView.render();
		},
		render: function(){
			var catNumber = octopus.getCurrentCatNumber();

			if(catNumber === undefined) return;
			
			this.catImage.src = 'cat' + octopus.getCurrentCatNumber() + '.jpg';			
			this.catNameArea.innerHTML = 'My name is ' + octopus.getCatName();		
			this.catClickCounter.innerHTML = 'You clicked me ' + octopus.getClickCount() + ' times';
		}
	};

	var catListView = {
		giveMeCatListItem: function(catNumber) {
			var newCatListItem = document.createElement("li"),
				catLink = document.createElement('a');
							
				catLink.addEventListener('click', function(e){
					e.preventDefault();
					e.stopPropagation();
					octopus.setCurrentCat(catNumber);					
				});

				catLink.innerHTML = 'cat # ' + catNumber;				
				newCatListItem.appendChild(catLink);

				return newCatListItem;
		},
		init: function(){
			this.catList = document.getElementById('cat-list');
			catListView.render();
		},
		render: function(){
			var numberOfCats = octopus.getNumberOfCats();

			for(var catNumber = 0; catNumber < numberOfCats; catNumber++){
				this.catList.appendChild(catListView.giveMeCatListItem(catNumber));
			}
		}
	};

	octopus.init(5);
}();