jQuery(function($){
	$("#about-link").on('click', function(){
		if($("#contact").css('display') == 'block'){
			$("#contact").hide();
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
		$("#home-image").show();
		$("#contact").fadeIn('fast');

	});

});
