var imageCollection,
	viewportOrientation,
	currentViewportOrientation,
	newViewportOrientation,
	hasOrientationChanged = false,
	collectionToUse,
	shuffledCollection = [],
	portraitCollection = [],
	landscapeCollection = [],
	checkResize,
	backgroundImageURL = '/images/';

function init() {
	
	$.getJSON("scripts/images.json", function(json) {
		currentViewportOrientation = getViewportOrientation();
	   	imageCollection = json;
	    createCollectionByOrientation(imageCollection.images);

	    startSlideshow();
		
		$(window).resize(function() {
		    clearTimeout(checkResize);
		    checkResize = setTimeout(checkViewportAfterResize, 500);
		});
		 
	});
}

function getViewportOrientation() {
	viewportOrientation = window.outerWidth > window.outerHeight ? "landscape" : "portrait";
	return viewportOrientation;
}

function checkViewportAfterResize() {
	newViewportOrientation = getViewportOrientation();

    if (newViewportOrientation !== currentViewportOrientation) {
		currentViewportOrientation = newViewportOrientation;
		startSlideshow();
	}
}

function createCollectionByOrientation(collection){
	for(var i = 0; i < collection.length; i++) {
		var filename = collection[i].filename;
  		collection[i].orientation === "portrait" ? portraitCollection.push(filename) : landscapeCollection.push(filename);
	}
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
	var slideshowLength,
		allImages;

	collectionToUse = currentViewportOrientation === 'portrait' ? portraitCollection : landscapeCollection;
	shuffledCollection = shuffleImages(collectionToUse);
	slideshowLength = shuffledCollection.length;

	if (slideshowLength > 1) {

		for (i = 0; i < 2; i++) { 
			$('body')
				.append($('<div/>').addClass('background-image'))
				.find('.background-image:eq('+ i +')').css('background-image','url('+ backgroundImageURL + shuffledCollection[i] +')');
		}

		allImages = $('.background-image').css('display','none');
		allImages.eq(0).addClass('foreground');

		allImages.eq(0)
			.fadeIn(2000, function(){
				fadeImageOut(0);
			});
	}

	function fadeImageOut(index) {

		var nextIndex = index + 1,
			currentImage = $('.background-image').eq(index),
			nextImage = $('.background-image').eq(nextIndex),
			allImages = $('.background-image');

		if (nextIndex === shuffledCollection.length) {
			replaySlideshow();
		} else if (nextImage.length === 0 && index < shuffledCollection.length) {
			if (index < shuffledCollection.length - 1) {
				addImage();
				proceedWithFadeOut();			
			}
		} else {
			proceedWithFadeOut();
		}

		function addImage() {
			$('body')
				.append($('<div/>').addClass('background-image'));

			$('.background-image').eq(nextIndex)	
				.css({
					'background-image':'url('+ backgroundImageURL + shuffledCollection[nextIndex] +')',
					'display':'block'
				});	
		}
	
		function proceedWithFadeOut() {
			allImages.eq(index + 1).css('display','block');
			allImages.eq(index).addClass('foreground').fadeOut(4000, function(){
				$(this).removeClass('foreground').css('display','none');	
				fadeImageOut(index + 1);
			});
		}
	}

	function replaySlideshow() {

		$('.background').removeClass('background');
		$('.foreground').removeClass('foreground');

		allImages = $('.background-image');
		allImages.last().fadeOut(4000);
		allImages.first().addClass('foreground').fadeIn(4000, function(){
			loopFadeOut(0);
		});
	}

	function loopFadeOut(index) {
		if (index < allImages.length - 1) {
			allImages.eq(index + 1).css('display','block');
			allImages.eq(index).addClass('foreground').fadeOut(4000, function(){
				$(this).removeClass('foreground').css('display','none');
				loopFadeOut(index + 1);
			});	
		} else {
			replaySlideshow();
		}
	}
}


$(document).ready(function() {
	init();
});
