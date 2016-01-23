var Cat = Cat || {};
Cat.catClicker = function(){
	var catClickCountState = 0;

	var updateCatClickCounter = function(){
		var clickCounter = document.getElementById('click-counter');
		catClickCountState++;
		clickCounter.innerHTML = catClickCountState;
	},

	onCatClickIncreaseClickCounter = function(){
		var cat = document.getElementById('cat-picture');
		cat.addEventListener('click', updateCatClickCounter);
	},
	
	init = function(){
		onCatClickIncreaseClickCounter();
	};

	return {
		init:init
	};
}();

Cat.catClicker.init();