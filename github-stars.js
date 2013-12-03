(function( $ ) {
	$.getJSON( 'https://api.github.com/users/jeremyfelt/received_events/public?page=1', processData );
	function processData( data ) {
		var star_list = '';

		$.each( data, function processItem( key, val ) {
			if ( 'WatchEvent' === val.type ) {
				star_list += '<li>' + val.actor.login + ' <a href="' + val.repo.url + '">' + val.repo.name + '</a></li>';				
			}
		});
		$('#stars-list').html( '<ul>' + star_list + '</ul>' );
	}
})( jQuery );