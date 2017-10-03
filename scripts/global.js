var imageCollection,
	viewportOrientation = window.outerWidth > window.outerHeight ? "landscape" : "portrait",
	collectionToUse,
	shuffledCollection = [],
	portraitCollection = [],
	landscapeCollection = [],
	backgroundImageURL = '/images/'	;

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
	var slideshowLength = shuffledCollection.length,
		currentForeground = $('.foreground');
		currentForegroundIndex = $('.background-image').index(currentForeground);

	for (i=0; i < slideshowLength; i++) {
		fadeImageIn();
	}

	function fadeImageIn() {

		console.log($(currentForeground).next().css('background-image'));

		$('.foreground').fadeIn(800, function() {
	    	$('.background-image:eq('+ (currentForegroundIndex + 1) +')').show();
	    	$('body').append(
	    		$('<div/>').addClass('background-image').css('background-image','url('+ backgroundImageURL + shuffledCollection[currentForegroundIndex + 2] +')')
	    	);
	    	fadeImageOut(currentForeground);
	  	});
	}

	function fadeImageOut(image) {
		console.log("fading image out");
	    setTimeout(function(){
	    	$(image).fadeOut(8000, function(){
	    		$(image).removeClass('foreground');
	    		$(image).next().addClass('foreground');
	    	});
	    }, 2000);	
	}

}


$(document).ready(function() {
	init();
});
