jQuery(function($){
	
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


});


