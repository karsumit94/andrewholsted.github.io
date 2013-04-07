jQuery(function($){
	$("#about-link").on('click', function(){
		if($("#contact").css('display') == 'block'){
			$("#contact").hide();
		}
		if($("#posts").css('display') == 'block'){
			$("#posts").hide();
		}
		if($("#projects").css('display') == 'block'){
			$("#projects").hide();
		}
		$("#home-image").hide();
		$("#intro").hide();
		$("#about").fadeIn('fast');
		
		
	});

	$("#contact-link").on('click', function(){
		if($("#about").css('display') == 'block'){
			$("#about").hide();
		}
		if($("#intro").css('display') == 'block'){
			$("#intro").hide();
		}
		if($("#posts").css('display') == 'block'){
			$("#posts").hide();
		}
		if($("#projects").css('display') == 'block'){
			$("#projects").hide();
		}
		$("#home-image").show();
		$("#contact").fadeIn('fast');

	});

	$("#posts-link").on('click', function(){
		if($("#contact").css('display') == 'block'){
			$("#contact").hide();
		}
		if($("#about").css('display') == 'block'){
			$("#about").hide();
		}
		if($("#intro").css('display') == 'block'){
			$("#intro").hide();
		}
		if($("#projects").css('display') == 'block'){
			$("#projects").hide();
		}
		$("#home-image").hide();
		$("#posts").fadeIn('fast');
	
	});
	$("#projects-link").on('click', function(){
		if($("#contact").css('display') == 'block'){
			$("#contact").hide();
		}
		if($("#about").css('display') == 'block'){
			$("#about").hide();
		}
		if($("#intro").css('display') == 'block'){
			$("#intro").hide();
		}
		if($("#posts").css('display') == 'block'){
			$("#posts").hide();
		}
		$("#home-image").hide();
		$("#projects").fadeIn('fast');
	
	});


});
