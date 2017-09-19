var imageCollection,
	viewportOrientation = window.outerWidth > window.outerHeight ? "landscape" : "portrait",
	collectionToUse,
	shuffledCollection = [],
	portraitCollection = [],
	landscapeCollection = [],
	backgroundImageContainer,
	backgroundImageURL = '/images/homepage/bg/';

function init() {
	$.getJSON("scripts/images.json", function(json) {
	   	imageCollection = json;
	    createCollectionByOrientation(imageCollection.images);
	    shuffledCollection = shuffleImages(collectionToUse());

	    startSlideshow();
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

function startSlideshow() {
	backgroundImageContainer = $('.background-image');
	backgroundImageURL += shuffledCollection[0];
	backgroundImageContainer.css('background','url(backgroundImageURL)');

	console.log(backgroundImageContainer);
	console.log('first image = ' + shuffledCollection[0]);
	console.log(backgroundImageURL);
}

$(document).ready(function() {
	init();

	// console.log('first image = ' + shuffledCollection[0]);
});
