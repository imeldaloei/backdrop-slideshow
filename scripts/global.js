var imageCollection,
	viewportOrientation = window.outerWidth > window.outerHeight ? "landscape" : "portrait",
	collectionToUse,
	shuffledCollection = [],
	portraitCollection = [],
	landscapeCollection = [],
	backgroundImageContainer,
	backgroundImageURL = '/images/',
	frontBackgroundImage,
	frontBackgroundImageURL,
	backBackgroundImage,
	backBackgroundImageURL;

function init() {
	
	$.getJSON("scripts/images.json", function(json) {
	   	imageCollection = json;
	    createCollectionByOrientation(imageCollection.images);
	    shuffledCollection = shuffleImages(collectionToUse());

	    createMarkup();
	});
}

function createCollectionByOrientation(collection){
	console.log('e is ' + collection);
	for(var i = 0; i < collection.length; i++) {
		var filename = collection[i].filename;
  		collection[i].orientation === "portrait" ? portraitCollection.push(filename) : landscapeCollection.push(filename);
	}
};

function collectionToUse() {
	collectionToUse = viewportOrientation === 'portrait' ? portraitCollection : landscapeCollection;
	return collectionToUse;
}

function shuffleImages(collection) {
  
  var imagesLeft = collection.length, 
  	swappedNumber, 
  	randomNumber;
  // While there remain elements to shuffle…
  while (imagesLeft) {
    // Pick a remaining element…
    randomNumber = Math.floor(Math.random() * imagesLeft--);

    // And swap it with the current element.
    swappedNumber = collection[imagesLeft];
    collection[imagesLeft] = collection[randomNumber];
    collection[randomNumber] = swappedNumber;
  }

  return collection;
}

function createMarkup() {	

	for (i = 0; i < 2; i++) { 
		$('body')
			.append($('<div/>').addClass('background-image'))
			.find('.background-image:eq('+ i +')').css('background-image','url('+ backgroundImageURL + shuffledCollection[i] +')');
	}

	var foregroundImage = $('.background-image')[0];

	$(foregroundImage).addClass('foreground').fadeIn(800, function() {
    	console.log('animation complete');
    	console.log($(this).css('display'));
    	//$(this).css('opacity','0.5');
  	});
}

function animateImages() {
	var noImageExists = $('div.background-image').length === 0;

	if (noImageExists) {
		createMarkup();
	};
}

$(document).ready(function() {
	init();

	// console.log('first image = ' + shuffledCollection[0]);
});
