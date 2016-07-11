$(document).ready(function() {
	$('nav a').on('click', function() {
		// .current class assignment
		$('nav li.current').removeClass('current');
		$(this).parent().addClass('current');			// $(this) is the clicked link
		
		// set heading text
		$('h1#heading').text($(this).text());
		
		// get & filter link text
		var category = $(this).text().toLowerCase().replace(' ', '-');
		
		// remove hidden class if 'all-projects' is selected
		if (category == 'all-projects') {
			$('ul#gallery li:hidden').fadeIn('slow').removeClass('hidden');
		} else {
			$('ul#gallery li').each(function() {
				if ( ! $(this).hasClass(category)) {
					$(this).hide().addClass('hidden');
				} else {
					$(this).fadeIn('slow').removeClass('hidden');
				}
			});
		}
		return false;			// stop link behaviour i.e. don't follow link
	});
	
	// mouseenter overlay
	$('ul#gallery li').on('mouseenter', function() {
		// get data attribute values
		var title = $(this).children().data('title');
		var desc = $(this).children().data('desc');
		
		// validation
		if (desc == null) {
			desc = 'Click to enlarge';
		}
		
		if (title == null) {
			title = '';
		}
		
		// create overlay div
		$(this).append('<div class="overlay"></div>');
		
		// get the overlay div
		var overlay = $(this).children('.overlay');
		
		// add html to overlay
		overlay.html('<h3>' + title + '</h3><p>' + desc + '</p>');
		
		overlay.fadeIn(200);
	});
	
	// mouseleave overlay
	$('ul#gallery li').on('mouseleave', function() {
		// create overlay div
		$(this).append('<div class="overlay"></div>');
		
		// get the overlay div
		var overlay = $(this).children('.overlay');
		
		// fade out overlay and stop() creating new div.overlay on each mouseenter
		overlay.stop().fadeOut(500, function() {
			$(this).remove();			// $(this) refers to overlay
		});
	});
});