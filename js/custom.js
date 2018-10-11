// Custom JS

// init slick carousel
$(document).ready(function() {
	slick();
	scrollReveal();
	backToTop();
	smoothScrolling();
});

// slick carousel
function slick () {
	$('.slide').slick({
  	   dots: true,
	  infinite: false,
	  speed: 300,
	  Arrows: true,
	  nextArrow: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
	  prevArrow: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
	  slidesToShow: 3,
	  slidesToScroll: 3,
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	        infinite: true,
	        dots: true
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	    // You can unslick at a given breakpoint now by adding:
	    // settings: "unslick"
	    // instead of a settings object
	  ]
	});
}

// scroll reveal
function scrollReveal () {
	window.sr = ScrollReveal();
	sr.reveal('#start', {
		duration: 2000,	
		origin: 'bottom',
		distance: '300px',
		viewFactor: 0.5
	});
	
}


// Back to Top
function backToTop () {
	$(window).scroll(function(){
		if ($(this).scrollTop() > 200) {
			$('.backTop').fadeIn();
		} else {
			$('.backTop').fadeOut();
		}
	});

	// smooth scrolling top top
	jQuery('.backTop').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, 1000);
        return false;
    });
}

// Smooth Scrolling
function smoothScrolling () {
	$('a[href*="#"]:not([href="#"])').click(function() {

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
    });
}
