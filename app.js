var Cat = Cat || {};
Cat.catClicker = function(){
	'use strict';
	var clicks = [];
	var countCatClicks = function(catNumber){
		var clickCount = clicks[catNumber];
		if(clickCount === undefined)
		{
			clicks[catNumber] = 0;
		}
		else{
			clickCount++;
			clicks[catNumber] = clickCount;
		}
	},
	createCatPicture = function(catNumber){
	var catPicture = document.createElement("img");
		catPicture.src = 'cat' + catNumber + '.jpg';
		return catPicture;
	},

	showMyCat = function(){
		var catNumber = this.dataset.catNumber,
			catPictureDiv = document.getElementById('cat-picture'),
			catImage = createCatPicture(catNumber);
			catPictureDiv.innerHTML = '';
			catImage.onclick = function(){
				countCatClicks(catNumber);
			};
			catPictureDiv.appendChild(catImage);

		return false;
	},

	giveMeCatListItem = function(catNumber) {
		var newCatListItem = document.createElement("li"),
			catLink = document.createElement('a');
						
			catLink.href='cat' +catNumber+'.jpg';			
			catLink.onclick = showMyCat;
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

Cat.catClicker.init(3);