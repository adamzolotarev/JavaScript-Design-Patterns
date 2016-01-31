var Cat = Cat || {};
Cat.catClicker = function(){
	'use strict';

	var model = {		
		init: function(numberOfCats){
			this.cats = [];
			for (var i = 0; i < numberOfCats; i++) {
				this.cats.push({
					clickCount: 0,
					name: 'cat' + i,
					imgSrc: 'cat' + i + '.jpg',
					id: i
				});
			}
		},
		currentCat: null,
		adminMode: false
	};

	var octopus = {
		incrementCatClicks: function(){
			model.currentCat.clickCount++;
			catDisplayView.render();
		},		
		setCurrentCat: function(cat){
			model.currentCat = cat;						
			catDisplayView.render();
		},				
		getCurrentCat: function(){
			return model.currentCat;
		},
		getCats: function(){
			return model.cats;
		},

		saveAdminCat: function(cat){			
			var matchingCat = model.cats.filter(function(existingCat){
				return existingCat.id === cat.id;
			})[0];
			matchingCat.name = cat.name;
			matchingCat.clickCount = cat.clickCount;
			matchingCat.imgSrc = cat.imgSrc;
			octopus.setCurrentCat(matchingCat);
		},
		setAdminMode: function(){
			model.adminMode = true;
		},
		setUserMode: function(){
			model.adminMode = false;
		},
		isAdminMode: function(){
			return model.adminMode;
		},

		init: function(numberOfCats){
			model.init(numberOfCats);
			catListView.init();
			catDisplayView.init();
			adminView.init();
		}
	};

	var adminView = {
		init: function(){
			this.adminArea = document.getElementById('admin-area');
			this.adminButton = document.getElementById('admin-button');
			this.adminSaveButton = document.getElementById('admin-save-button');
			this.adminCancelButton = document.getElementById('admin-cancel-button');
			this.adminCatName = document.getElementById('admin-cat-name');
			this.adminCatClicks = document.getElementById('admin-cat-clicks');
			this.adminCatUrl = document.getElementById('admin-cat-url');

			this.adminButton.addEventListener('click', function(){
				octopus.setAdminMode();
				adminView.render();
			});
			this.adminCancelButton.addEventListener('click', function(){
				octopus.setUserMode();
				adminView.render();
			});
			this.adminSaveButton.addEventListener('click', function(){
				octopus.saveAdminCat({
					clickCount: adminView.adminCatClicks.value,
					name: adminView.adminCatName.value,
					imgSrc: adminView.adminCatUrl.value,
					id: octopus.getCurrentCat().id});

				octopus.setUserMode();
				adminView.render();
			});
		},
		render: function(){
			var cat;
			if(octopus.isAdminMode()){
				this.adminArea.style.display = '';
				cat = octopus.getCurrentCat();
				this.adminCatName.value = cat.name;
				this.adminCatClicks.value = cat.clickCount;
				this.adminCatUrl.value = cat.imgSrc;
			}
			else{
				this.adminArea.style.display = 'none';
			}
		}
	};

	var catDisplayView = {
		init: function(){
			this.catImage = document.getElementById('cat-picture');
			this.catClickCounter = document.getElementById('click-counter');			
			this.catNameArea = document.getElementById('cat-name');
			this.adminButton = document.getElementById('admin-button');
			this.catImage.addEventListener('click', function(e){
				octopus.incrementCatClicks();
				e.preventDefault;
			});

			catDisplayView.render();
		},
		render: function(){
			var currentCat = octopus.getCurrentCat();

			if(!currentCat) return;			
			this.adminButton.style.display = '';
			this.catImage.src = currentCat.imgSrc;			
			this.catNameArea.innerHTML = currentCat.name;		
			this.catClickCounter.innerHTML = 'You clicked me ' + currentCat.clickCount + ' times';
		}
	};

	var catListView = {
		giveMeCatListItem: function(cat) {
			var newCatListItem = document.createElement("li"),
				catLink = document.createElement('a');
							
				catLink.addEventListener('click', function(e){
					e.preventDefault();
					e.stopPropagation();
					octopus.setCurrentCat(cat);					
				});

				catLink.innerHTML = cat.name;				
				newCatListItem.appendChild(catLink);

				return newCatListItem;
		},
		init: function(){
			this.catList = document.getElementById('cat-list');
			catListView.render();
		},
		render: function(){
			var cats = octopus.getCats(),
				catNumber,
				numberOfCats = cats.length;

			for(catNumber = 0; catNumber < numberOfCats; catNumber++){
				this.catList.appendChild(catListView.giveMeCatListItem(cats[catNumber]));
			}
		}
	};

	octopus.init(5);
}();