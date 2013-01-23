/*

	Author: 	Josh McDonald
	Twitter: 	@onestepcreative
	Website: 	developerstoolbox.net
	
	Version:	1.1
	
	This plugin allows for you to define your
	tabs, and your tab content by simple selectors.
	The script then assigns a matching index to each
	tab and content selector, for easy cookie storage
	later. So tab one and tabContent one will both
	be assigned data-index="1", thus being able 
	to link up each tab to its corresponding 
	tab content.
	
	This plugin requires jQuery Cookies to
	take advantage of active tab saving.
	
	Download Cookies: https://github.com/carhartl/jquery-cookie

*/


(function($) {

	$.extend({
		
		tably: function(options) {
			
			
			// SETUP DEFAULTS FOR OUR PLUGIN
			var defaults = {
				
				activeClass:			'active',
				tabContainer: 			'#tabContainer',
				tabContentContainer:	'#tabContentContainer',
				tabSelector:			'.tab',
				contentSelector:		'.tabContent',
				tabTransition:			false,
				transitionTime:			250,
				enableSaving:			true
				
			};
			
			
			// SETUP COOKIE VALUES FOR PLUGIN
			var cookieOptions	= { expires: 365, path:	 '/' },
				cookieValue		= $.cookie('tab_active'),
				options			= $.extend(defaults, options),
				o 				= options;


			// IF SAVING IS SET TO FALSE, DESTROY COOKIE
			if(o.enableSaving === false) {
				
				$.cookie('tab_active', null, cookieOptions);
				
			}

			// ASSIGN DATA ATTRIBUTES TO TABS
			$(o.tabSelector).each(function(i) {
				
				// START INDEX OF AT 1 INSTEAD OF 0
				var index = i + 1;
				
				// ASSIGN DATA-ATTRIBUTE VALUES TO TABS
				$(this).attr('data-index', index);
				
				// IF COOKIE VALUE ISN'T SET, ASSIGN ACTIVE CLASS TO FIRST TAB
				if(cookieValue === null || cookieValue === undefined || o.enableSaving === false) {
					
					if(index === 1) { 
					
						$(this).addClass(o.activeClass); 
						
					}
					
				}
				
			});
			
			
			// ASSIGN DATA-ATTRIBUTES TO TAB CONTENT
			$(o.contentSelector).each(function(i) {
				
				// START INDEX OF AT 1 INSTEAD OF 0
				var index = i + 1;
				
				// ASSIGN DATA-ATTRIBUTE TO TAB CONTENT
				$(this).attr('data-index', index);
				
				// IF COOKIE VALUE ISN'T SET, ASSIGN ACTIVE CLASS TO FIRST TAB CONTENT
				if(cookieValue === null || cookieValue === undefined || o.enableSaving === false) {
				
					if(index === 1) { 
					
						$(this).addClass(o.activeClass); 
						
					}
				
				}
				
			});
			
			var activeIndex = $(o.tabSelector + o.activeClass).data('index');
			
			// READ AND SAVE COOKIES IF ENABLED IN SETTINGS
			if(o.enableSaving === true) {
			
				// IF COOKIE DOESN'T EXIST, CREATE IT
				if(cookieValue === undefined) {
					
					$.cookie('tab_active', activeIndex, cookieOptions);
				
				// IF COOKIE DOES EXIST, APPLY ITS VALUE	
				} else if($.cookie('tab_active')) {
					
					$(o.tabSelector + o.activeClass).removeClass(o.activeClass);
					$(o.contentSelector).removeClass(o.activeClass);
					
					$(o.tabSelector + '[data-index="' + cookieValue + '"]').addClass(o.activeClass);
					$(o.contentSelector + '[data-index="' + cookieValue + '"]').addClass(o.activeClass);
					
				}
			
			} else {
				
				$(o.tabSelector + o.activeClass).removeClass(o.activeClass);
				$(o.contentSelector).removeClass(o.activeClass);
				
				$(o.tabSelector + '[data-index="1"]').addClass(o.activeClass);
				$(o.contentSelector + '[data-index="1"]').addClass(o.activeClass);
				
			}
			
			
			
			// CLICK HANDLING WITH COOKIE ASSIGNMENT
			$(o.tabSelector).on('click', function(e) {
				
				var dataIndex = $(this).data('index');
				
				// IF COOKIE EXISTS, DESTROY IT
				if ($.cookie('tab_active')) {
		            
		            // DESTROY COOKIE
		   			$.cookie('tab_active', null, cookieOptions);
		            
		        }
		        
		        // IF TRANSITIONS ARE SET TO TRUE, FADE IN / OUT
				if(o.tabTransition) {
					
					$(o.tabSelector + o.activeClass).removeClass(o.activeClass);
					$(o.contentSelector).fadeOut(o.transitionTime).removeClass(o.activeClass);
					
					$(this).addClass(o.activeClass);
					$(o.contentSelector + '[data-index="' + dataIndex + '"]').fadeIn(o.transitionTime).addClass(o.activeClass);
				
				// IF SET TO FALSE, SIMPLY SHOW / HIDE
				} else {
				
					$(o.tabSelector + o.activeClass).removeClass(o.activeClass);
					$(o.contentSelector).removeClass(o.activeClass);
				
					$(this).addClass(o.activeClass);
					$(o.contentSelector + '[data-index="' + dataIndex + '"]').addClass(o.activeClass);
					
				}

		        cookieValue = dataIndex;
		        
		        // IF SAVING IS SET TO TRUE, SET COOKIE
		        if(o.enableSaving === true) {
	            
		            // SET COOKIE
		            $.cookie('tab_active', cookieValue, cookieOptions);
				
				} else {
					
					// SET COOKIE TO NULL
		            $.cookie('tab_active', null, cookieOptions);
					
				}
				
				e.preventDefault();
				
			});
			
		}
		
	});	

})(jQuery);