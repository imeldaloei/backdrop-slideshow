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

function createMarkup() {	

	for (i = 0; i < 2; i++) { 
		$('body')
			.append($('<div/>').addClass('background-image'))
			.find('.background-image:eq('+ i +')').css('background-image','url('+ backgroundImageURL + shuffledCollection[i] +')');
	}

	$('.background-image:eq(0)').addClass('foreground');
}

function startSlideshow() {
	fadeIn();
}

function fadeIn() {
	$('.foreground').fadeIn(800, function() {
    	var currentForeground = $('.background-image').index($('.foreground'));
    	$('.background-image:eq('+ (currentForeground + 1) +')').show();
    	$('body').append(
    		$('<div/>').addClass('background-image').css('background-image','url('+ backgroundImageURL + shuffledCollection[2] +')')
    	);
    	fadeOut();
  	});
}

function fadeOut() {
    setTimeout(function(){
    	$('.foreground').fadeOut(8000);
    }, 2000);	
}

$(document).ready(function() {
	init();
});
