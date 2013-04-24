$(function($){
   
    
    var slidePosition = 1,
	slideWidth,
    windowHeight;

    // set the intial height for each section and the width of the slider
    setHeight();
    setSlider();
    $("#home-link").addClass("active");
    $(document.body).animate({'scrollTop':0});

    //attach the click event to the menu links 

    $(".nav-link").click(function(e){
        e.preventDefault();
        $(".nav-link").removeClass('active');
        $(this).addClass('active');
        $(document.body).animate({'scrollTop': $(this.hash).offset().top}, 1000);
    });


    //resize slider and section heights on window resize
 
    $(window).resize(function() {
        setHeight();
        setSlider();

    });


    //set section height

    function setHeight(){
        windowHeight = $(window).height();
        $("section").each(function(){
            $(this).height('auto');
            if($(this).height() < windowHeight - 40){
                $(this).height(windowHeight - 40);
            }
        });
    }

    $(window).scroll(function() {    
    // find the li with class 'active' and remove it
    $("#home-nav ul li a.active").removeClass("active");
    // get the amount the window has scrolled
    var scroll = $(window).scrollTop();
    // add the 'active' class to the correct li based on the scroll amount
    if (scroll <= windowHeight) {
        $("#home-link").addClass("active");
    }
    else if (scroll <= (windowHeight-40)*2) {
        $("#about-link").addClass("active");
    }
     else if (scroll <= (windowHeight-40)*3) {
        $("#projects-link").addClass("active");
    }
     else if (scroll <= (windowHeight-40)*4) {
        $("#posts-link").addClass("active");
    }
    else if (scroll <= (windowHeight-40)*5) {
        $("#contact-link").addClass("active");
    }
});

    //set slider width

    function setSlider(){

        // Set the width of each slide to the widow width;
        $("#slider li").width($(window).innerWidth());
        // Declare variables
            slideWidth = $("#slider > li:first").width();
            var sliderLength = $("#slider > li").length;
            var totalWidth = slideWidth * sliderLength;
            
        $("#slider").width(totalWidth);
        
        if(slidePosition != 1){
            $("#slider").css({left:slideWidth*(slidePosition-1)*-1});
        }

        //hide the slider-prev control on initial load.
        manageSlideControls(slidePosition,sliderLength);

        $("#slider-prev").on('click',function(){
            
            if(slidePosition !== 1){
                $("#slider").animate({left : "+=" + slideWidth + "px"});
                slidePosition -= 1;
                manageSlideControls(slidePosition,sliderLength);
            }
            return false;
        });
        
        $("#slider-next").on('click',function(){
           
            if(slidePosition !== sliderLength){
                $("#slider").animate({left : "-=" + slideWidth + "px"});
                slidePosition += 1;
                manageSlideControls(slidePosition,sliderLength);
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


