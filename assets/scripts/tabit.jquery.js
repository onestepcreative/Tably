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
	take advantage of active tab cookies.
	
	Download Cookies: https://github.com/carhartl/jquery-cookie

*/


(function($) {

	$.extend({
		
		tabIt: function(options) {
			
			
			// SETUP DEFAULTS FOR OUR PLUGIN
			var defaults = {
				
				activeClass:			'active',
				tabContainer: 			'#tabContainer',
				tabContentContaier:		'#tabContentContainer',
				tabSelector:			'.tab',
				contentSelector:		'.tabContent',
				tabTransition:			true	
				
			};
			
			
			// SETUP COOKIE VALUES FOR PLUGIN
			var cookieOptions	= { expires: 365, path:	 '/' },
				cookieValue		= $.cookie('tab_active'),
				options			= $.extend(defaults, options),
				o 				= options;



			// ASSIGN DATA ATTRIBUTES TO TABS
			$(o.tabSelector).each(function(i) {
				
				// START INDEX OF AT 1 INSTEAD OF 0
				var index = i + 1;
				
				// ASSIGN DATA-ATTRIBUTE VALUES TO TABS
				$(this).attr('data-index', index);
				
				// IF COOKIE VALUE ISN'T SET, ASSIGN ACTIVE CLASS TO FIRST TAB
				if(cookieValue === undefined) {
					
					if(i === 1) { 
					
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
				if(cookieValue === undefined) {
				
					if(i === 1) { 
					
						$(this).addClass(o.activeClass); 
						
					}
				
				}
				
			});
			
			
			var activeIndex = $('.tab' + o.activeClass).data('index');
			
			// IF COOKIE DOESN'T EXIST, CREATE IT
			if(cookieValue === undefined) {
				
				$.cookie('tab_active', activeIndex, cookieOptions);
			
			// IF COOKIE DOES EXIST, APPLY ITS VALUE	
			} else if($.cookie('tab_active')) {
				
				$(o.tabSelector).removeClass(o.activeClass);
				$(o.contentSelector).removeClass(o.activeClass);
				
				$(o.tabSelector + '[data-index="' + cookieValue + '"]').addClass(o.activeClass);
				$(o.contentSelector + '[data-index="' + cookieValue + '"]').addClass(o.activeClass);
				
			}
			
			
			
			// CLICK HANDLING WITH COOKIE ASSIGNMENT
			$(o.tabSelector).on('click', function() {
				
				var dataIndex	= $(this).data('index');
				
				// IF COOKIE EXISTS, DESTROY IT
				if ($.cookie('tab_active')) {
		            
		            // DESTROY COOKIE
		   			$.cookie('tab_active', null, cookieOptions);
		            
		        }

				if(o.tabTransition) {
					
					$(o.tabSelector).removeClass(o.activeClass);
					$(o.contentSelector).fadeOut(300).removeClass(o.activeClass);
					
					$(this).addClass(o.activeClass);
					$(o.contentSelector + '[data-index="' + dataIndex + '"]').fadeIn(300).addClass(o.activeClass);
					
				} else {
				
					$(o.tabSelector).removeClass(o.activeClass);
					$(o.contentSelector).removeClass(o.activeClass);
				
					$(this).addClass(o.activeClass);
					$(o.contentSelector + '[data-index="' + dataIndex + '"]').addClass(o.activeClass);
					
				}

		        var cookieValue = dataIndex;

	            // SET COOKIE
	            $.cookie('tab_active', cookieValue, cookieOptions);
				
			});
			
		}
		
	});	

})(jQuery);