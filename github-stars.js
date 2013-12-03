var ghstars_access_token = '',
    ghstars_user      = '';

(function( window, $ ) {
	var document = window.document;

	function pageRequest( url ) {
		$.ajax({
			type: "GET",
			url: url,
			dataType: 'jsonp',
			async: false,
			jsonp: false
		});
	}

	function processData( response ) {
		var repo_date,
			$stars_list = $( '#stars-list' );

		$.each( response.data, function processItem( key, val ) {
			if ( 'WatchEvent' === val.type ) {
				repo_date = new Date( val.created_at );
				$stars_list.append( '<li>' + val.actor.login + ' <a target=_blank href="https://github.com/' + val.repo.name + '">' + val.repo.name + '</a> <span class="star-date">' + repo_date + '</span></li>' );
			}
		} );

		if ( 'next' === response.meta.Link[0][1].rel ) {
			pageRequest( response.meta.Link[0][0] );
		}
	}

	window.ghstars_processData = processData;

	pageRequest( 'https://api.github.com/users/' + ghstars_user + '/received_events?access_token=' + ghstars_access_token + '&callback=ghstars_processData' );
})( window, jQuery );