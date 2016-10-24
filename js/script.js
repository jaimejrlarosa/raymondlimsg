(function($) {
	
	"use strict";
	
	
	//Preloader
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(500).fadeOut(500);
		}
	}
	
	
	//Update Header Style + Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			if (windowpos >= 80) {
				$('.main-header').addClass('fixed-header');
				$('.scroll-to-top').fadeIn(300);
			} else {
				$('.main-header').removeClass('fixed-header');
				$('.scroll-to-top').fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
	}
	
	
	//Hidden Bar Menu Config
	function hiddenBarMenuConfig() {
		var menuWrap = $('.hidden-bar .side-menu');
		// appending expander button
		menuWrap.find('.dropdown').children('a').append(function () {
			return '<button type="button" class="btn expander"><i class="icon fa fa-bars"></i></button>';
		});
		// hidding submenu 
		menuWrap.find('.dropdown').children('ul').hide();
		// toggling child ul
		menuWrap.find('.btn.expander').each(function () {
			$(this).on('click', function () {
				$(this).parent() // return parent of .btn.expander (a) 
					.parent() // return parent of a (li)
						.children('ul').slideToggle();
	
				// adding class to expander container
				$(this).parent().toggleClass('current');
				// toggling arrow of expander
				$(this).find('i').toggleClass('fa-minus fa-bars');
	
				return false;
	
			});
		});
	}
	
	hiddenBarMenuConfig();
	
	
	//Custom Scroll for Hidden Sidebar
	if ($('.hidden-bar-wrapper').length) {
		$('.hidden-bar-wrapper').mCustomScrollbar();
	}
	
	
	//Hidden Bar Toggler
	if ($('.hidden-bar-closer').length) {
		$('.hidden-bar-closer').on('click', function () {
			$('.hidden-bar').removeClass('visible-sidebar');
		});
	}
	if ($('.hidden-bar-opener').length) {
		$('.hidden-bar-opener').on('click', function () {
			$('.hidden-bar').addClass('visible-sidebar');
		});
	}
	
	//Update Section Height to Viewport Height
	function updateHeight() {
		var screenHeight = $(window).height();
		$('.main-slider .content-container').css('min-height',screenHeight);
		var contentNormalHeight = $('.main-slider .content-container').height();
		$('.main-slider .content-container .content-box').css('height',contentNormalHeight);
	}
	
	updateHeight();
	
	
	//Main Slider
	if($('.main-slider .slider-style-one').length){
		$('.main-slider .slider-style-one').bxSlider({
			adaptiveHeight: true,
			auto:true,
			mode:'fade',
			controls: true,
			pause: 5000,
			speed: 1000,
			pager:true
		});
		
		//Set background Position Of Slide
		if($('.main-slider .slide-item').attr('data-bg-position').length){
			$('.main-slider .slide-item').each(function() {
                var bgPostion = $(this).attr('data-bg-position');
				$(this).css('background-position',bgPostion);
            });
			
		}
	}
	
	
	//Text Carousel Slider
	if($('.text-carousel').length){
		$('.text-carousel').bxSlider({
			adaptiveHeight: true,
			auto:true,
			mode:'fade',
			controls: false,
			pause: 5000,
			speed: 1000,
			pager:true
		});
	}
	
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'elastic',
			closeEffect : 'elastic',
			helpers : {
				media : {}
			}
		});
	}
	
	
	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : 1 
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.bind('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	enableMasonry();
	
	
	
	//Gallery With Filters List
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			$('.tab-buttons .tab-btn').removeClass('active-btn');
			$(this).addClass('active-btn');
			$('.tabs-box .tab').fadeOut(0);
			$('.tabs-box .tab').removeClass('active-tab');
			$(target).fadeIn(500);
			$(target).addClass('active-tab');
			var windowWidth = $(window).width();
			if (windowWidth <= 700) {
				$('html, body').animate({
				   scrollTop: $('.tabs-content').offset().top
				 }, 1000);
			}
		});
		
	}
	
	
	//Portfolio Carousel
	if ($('.portfolio-carousel').length) {
		$('.portfolio-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="btn-text">Prev</span>', '<span class="btn-text">Next</span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:2
				},
				1024:{
					items:3
				},
				1400:{
					items:3
				}
			}
		});    		
	}
	
	
	
	//Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 5000,
			navText: [ '<span class="btn-text">Prev</span>', '<span class="btn-text">Next</span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:3
				},
				1024:{
					items:4
				},
				1400:{
					items:5
				}
			}
		});    		
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Scroll to top
	if($('.scroll-to-top').length){
		$(".scroll-to-top").on('click', function() {
		   // animate
		   $('html, body').animate({
			   scrollTop: $('html, body').offset().top
			 }, 1000);
	
		});
	}
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}
	
/* ==========================================================================
   When document is ready, do
   ========================================================================== */
	
	$(document).on('ready', function() {
		updateHeight();
		enableMasonry();
	});
	
	
/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
		
	});
	
/* ==========================================================================
   When document is Loaded, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
		updateHeight();
		enableMasonry();
	});
	

/* ==========================================================================
   When Window is Resized
   ========================================================================== */
	
	$(window).on('resize', function() {
		updateHeight();
	});

	

})(window.jQuery);