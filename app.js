var Cat = Cat || {};
Cat.catClicker = function(){
	
	var updateCatClickCounter = function(){
		var clickerId = this.dataset.counterId,
			clickCounter = document.getElementById(clickerId),
			counterValue = clickCounter.dataset.clickCount;

		counterValue++;
		clickCounter.dataset.clickCount = counterValue;
		clickCounter.innerHTML = counterValue;
	},

	onCatClickIncreaseClickCounter = function(){		
		var cats = document.getElementsByClassName('cat-picture'),
			numberOfCats = cats.length;

		for(var i=0; i<numberOfCats; i++){
			cats[i].addEventListener('click',updateCatClickCounter);
		}		
	},

	
	init = function(){
		onCatClickIncreaseClickCounter();
	};

	return {
		init:init
	};
}();

Cat.catClicker.init();