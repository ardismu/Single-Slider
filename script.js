$(function() {
  
	var sliderImages = [
		"https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_960_720.jpg",
		"https://cdn.pixabay.com/photo/2018/02/27/06/30/skyscrapers-3184798_960_720.jpg",
		"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
		"https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_960_720.jpg",
		"https://cdn.pixabay.com/photo/2018/02/27/06/30/skyscrapers-3184798_960_720.jpg"
	];
        var sliderNames = [
            "Menu1",
            "Menu2",
            "Menu3",
            "Menu4",
            "Menu5"
        ];
        var slideID = 0;
        var sliderLength = sliderImages.length;
        
        var $slider = $(".slider");
        var $sliderImage = $(".slider__image");
        var $sliderNav = $(".slider__nav ul");
        var $sliderTitle = $(".slider__title");
        
        // Populate slider nav with slide names
        sliderNames.forEach(function(name, id) {
            $sliderNav.append("<li data-slide-id='" + id + "'><span>" + name + "</span></li>");
        });

        
        var $sliderNames = $(".slider__nav ul li");
        var intervalID;
        var nextAction;
        
        // Manual navigation
        $sliderNames.on("click", function() {
            $sliderNames.removeClass("active");
            slide(parseInt($(this).attr("data-slide-id")));
        })
    
        // Start
        // window.setTimeout(function() {
        // 	slide(0);
        // 	intervalID = window.setInterval(slide, 7000);
        // }, 1000);
        
        slide(0);
        
        function slide(id) {
            // Unload slide
            setLoader()
    
            // Get the nest slide ID
            if (id === undefined) {
                slideID++
                if (slideID >= sliderLength) {
                    slideID = 0;
                }
            } else {
                slideID = id;
            }
    
            window.clearTimeout(nextAction);
            nextAction = window.setTimeout(function() {
                displayImage(slideID);	
            }, 1000);
                    
            // loadImage(slideID, function() {
            // 	displayImage(slideID);
            // })
        }
        
        function setLoader(i) {
            $sliderNames.removeClass("active");
            $slider.addClass("loading");
            $sliderTitle.removeClass("animated");
        }
        
        function loadImage(id, callback) {
            // Load the image
            $('<img/>').attr('src', sliderImages[slideID]).on('load', function() {
                // Image loaded
                $(this).remove(); // prevent memory leaks as @benweet suggested
                callback(id);
            });
        }
        
        function displayImage(id, callback) {
            $slider.removeClass("loading");
            $sliderImage.css('background-image', "url(" + sliderImages[id] + ")");
            $sliderImage.toggleClass("zoomed");
            $($sliderNames[id]).addClass("active");
    
            $sliderTitle.text(sliderNames[id]);
            $sliderTitle.addClass("animated");
    
            window.clearTimeout(nextAction);
            nextAction = window.setTimeout(slide, 6000);
        }
    
    });
    
    