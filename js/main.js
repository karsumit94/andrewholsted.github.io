$(function($){
	
	$("#about-link").on('click', function(e){
		e.preventDefault();
		$(document.body).animate({
    		'scrollTop':   $('#about').offset().top
		}, 1000);
		
	});

	$("#projects-link").on('click', function(e){
		e.preventDefault();
		$(document.body).animate({
    		'scrollTop':   $('#projects').offset().top
		}, 1000);
	
	});

	$("#posts-link").on('click', function(e){
		e.preventDefault();
		$(document.body).animate({
    		'scrollTop':   $('#posts').offset().top
		}, 1000);
	
	});
	
	$("#contact-link").on('click', function(e){
		e.preventDefault();
		$(document.body).animate({
    		'scrollTop':   $('#contact').offset().top
		}, 1000);

	});
 
	// slider
    if($("#slider").length){

    	// Set the width of each slide to the widow width;
        $("#slider li").width($(window).innerWidth());
        // Declare variables
        var sliderLength = $("#slider > li").length,
        	currentPosition = 1,
            slideWidth = $("#slider > li:first").outerWidth(true),
            totalWidth = slideWidth * sliderLength;
         
        $("#slider").width(totalWidth);

        //hide the slider-prev control on initial load.
        manageSlideControls(currentPosition,sliderLength);

        $("#slider-prev").click(function(){
            if(currentPosition !== 1){
                $("#slider").animate({left : "+=" + slideWidth + "px"});
           		currentPosition -= 1;
           		manageSlideControls(currentPosition,sliderLength);

            }
            return false;
        });
        
        $("#slider-next").click(function(){
            if(currentPosition !== sliderLength){
                $("#slider").animate({left : "-=" + slideWidth + "px"});
                currentPosition += 1;
                manageSlideControls(currentPosition,sliderLength);
            }
            return false;
        });
    }

    function manageSlideControls(slidePosition, sliderLength) {
    	if(slidePosition == 1) {
    		 $("#slider-prev").hide();
    	}
    	else{
    		$("#slider-prev").show();
    	}
    	if(slidePosition == sliderLength) {
    		$("#slider-next").hide();
    	}
    	else{
    		$("#slider-next").show();
    	}
    }
});


