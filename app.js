var Cat = Cat || {};
Cat.catClicker = function(){
	'use strict';
	var clicks = [];

	var countCatClicks = function(catNumber){		
		clicks[catNumber] = (clicks[catNumber] || 0) +1;
	},

	createCatPicture = function(catNumber){
	var catPicture = document.createElement("img");
		catPicture.src = 'cat' + catNumber + '.jpg';
		catPicture.setAttribute('data-cat-number', catNumber);
		return catPicture;
	},

	updateClickCounter = function(){
		var catNumber = this.dataset.catNumber,
			clickCounter = document.getElementById('click-counter');

		countCatClicks(catNumber);
		clickCounter.innerHTML = 'You clicked me ' + clicks[catNumber] + ' times';			
	},

	showMeACat = function(){
		var catNumber = this.dataset.catNumber,
			catPictureDiv = document.getElementById('cat-picture'),
			clickCounter = document.getElementById('click-counter'),
			catImage = createCatPicture(catNumber),
			numberOfClicks = clicks[catNumber] || 0;

			clickCounter.innerHTML  = 'You clicked me ' + numberOfClicks + ' times';
			catPictureDiv.innerHTML = '';
			catImage.onclick = updateClickCounter;
			catPictureDiv.appendChild(document.createTextNode('My name is cat' + catNumber));
			catPictureDiv.appendChild(document.createElement('br'));
			catPictureDiv.appendChild(catImage);

		return false;
	},

	giveMeCatListItem = function(catNumber) {
		var newCatListItem = document.createElement("li"),
			catLink = document.createElement('a');
						
			catLink.href='cat' + catNumber + '.jpg';			
			catLink.onclick = showMeACat;
			catLink.innerHTML = 'cat # ' + catNumber;
			catLink.setAttribute('data-cat-number', catNumber);
			newCatListItem.appendChild(catLink);

			return newCatListItem;
	},
	createCatList = function(numberOfCats){
		var catList = document.getElementById('cat-list');

		for(var catNumber = 0; catNumber < numberOfCats; catNumber++){
			catList.appendChild(giveMeCatListItem(catNumber));
		}
	},
	
	init = function(numberOfCats){
		createCatList(numberOfCats);
	};

	return {
		init:init
	};
}();

Cat.catClicker.init(5);