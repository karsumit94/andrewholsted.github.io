$(function($){
   
    
    var slidePosition = 1,
	slideWidth,
    windowHeight;

    // set the intial height for each section and the width of the slider
    $(window).load(function(){
    	setSlider();
    	setHeight();
        loadSquareSend();
    });
    

    $("#home-link").addClass("active");
    $(document.body).animate({'scrollTop':0});

    //attach the click event to the menu links 

    $(".nav-link").on("click", function(e){
        e.preventDefault();
        $('body, html').animate({'scrollTop': $(this.hash).offset().top}, 1000);
    });

$(window).resize(function(){
    //resize slider and section heights on window resize
        setHeight();
        setSlider();

});

   
    //set section height

    function setHeight(){
        windowHeight = $(window).height();
        $("section").each(function(){
            $(this).height('auto');
            var navHeight = $("#home-nav").height();
            if($(this).height() <= windowHeight - navHeight){
                $(this).height(windowHeight - navHeight);
            }
        });
        $('#contact').height(windowHeight);


    }

     $(window).scroll(function() {    
    // find the li with class 'active' and remove it
        $("#home-nav ul li a.active").removeClass("active");
        // get the amount the window has scrolled
        var scroll = $(window).scrollTop(),
            homeHeight = $("#home").height(),
            aboutHeight = $("#about").height(),     
            postsHeight = $("#posts").height(),
            projectsHeight = $("#projects").height(),
            contactHeight = $("#contact").height();

        if(scroll <= homeHeight){
            $("#home-link").addClass("active");
        }
        else if(scroll <= (homeHeight + aboutHeight)){
            $("#about-link").addClass("active");
        }
        else if(scroll <= (homeHeight+aboutHeight+projectsHeight)){
            $("#projects-link").addClass("active");
        }
        else if(scroll<=(homeHeight+aboutHeight+projectsHeight+postsHeight)){
            $("#posts-link").addClass("active");
        }
        else{
            $("#contact-link").addClass("active");
        }
        // add the 'active' class to the correct li based on the scroll amount

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

        //unbind click events because the resize function executes multiple times and in turn adds multiple click events tot he que
      

        $("#slider-prev").off("click").on("click",function(){
            
            if(slidePosition !== 1){
                $("#slider").animate({left : "+=" + slideWidth + "px"});
                slidePosition -= 1;
                manageSlideControls(slidePosition,sliderLength);
                
            }
                return false;
            });
            
            $("#slider-next").off("click").on("click",function(){
               
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

    function loadSquareSend() {
      var squareScript = document.createElement('script');
      squareScript.type = 'text/javascript';
      squareScript.src = "//squaresend.com/squaresend.js";
      document.getElementsByTagName('head')[0].appendChild(squareScript);
    };

});


