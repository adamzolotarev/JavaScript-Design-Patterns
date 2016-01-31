var Cat = Cat || {};
Cat.catClicker = function(){
	'use strict';

	var model = {
		init: function(numberOfCats){
			this.catClicks = this.catClicks || [];			
			this.numberOfCats = numberOfCats;
		},
		catWasClicked: function(){
			this.catClicks[this.currentCatNumber] = (this.catClicks[this.currentCatNumber] || 0) + 1;
		},
		catWasSelected: function(catNumber){
			this.currentCatNumber = catNumber;
		},
		getCurrentCatNumber: function(){
			return this.currentCatNumber;
		},
		getCatClickCount: function(){
			return this.catClicks[model.getCurrentCatNumber()] || 0;
		},
		getNumberOfCats: function(){
			return this.numberOfCats;
		}
	};

	var octopus = {
		catWasClicked: function(){
			model.catWasClicked();
			catDisplayView.render();
		},
		catWasSelected: function(catNumber){
			model.catWasSelected(catNumber);
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
		init: function(numberOfCats){
			model.init(numberOfCats);
			catListView.init();
			catDisplayView.init();			
		}
	};

	var catDisplayView = {
		init: function(){
			this.catArea = document.getElementById('cat-picture');
			this.catClickCounter = document.getElementById('click-counter');			
			this.catArea.addEventListener('click', function(e){
				octopus.catWasClicked();
				e.preventDefault;
			});
			catDisplayView.render();
		},
		render: function(){
			var catNumber = octopus.getCurrentCatNumber(),
				catPicture;

			if(catNumber === undefined) return;

			catPicture = document.createElement("img");
			catPicture.src = 'cat' + octopus.getCurrentCatNumber() + '.jpg';
			this.catArea.innerHTML = '';
			this.catArea.appendChild(catPicture);

			this.catClickCounter.innerHTML = 'You clicked me ' + octopus.getClickCount() + ' times';
		}
	};

	var catListView = {
		giveMeCatListItem: function(catNumber) {
			var newCatListItem = document.createElement("li"),
				catLink = document.createElement('a');
							
				// catLink.href='cat' + catNumber + '.jpg';
				catLink.addEventListener('click', function(e){
					e.preventDefault();
					e.stopPropagation();
					octopus.catWasSelected(catNumber);					
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