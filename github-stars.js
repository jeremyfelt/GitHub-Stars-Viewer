var access_token = '',
    gh_user      = '';

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
				$stars_list.append( '<li>' + repo_date + ' ' + val.actor.login + ' <a href="' + val.repo.url + '">' + val.repo.name + '</a></li>' );
			}
		} );

		if ( 'next' === response.meta.Link[0][1].rel ) {
			pageRequest( response.meta.Link[0][0] );
		}
	}

	window.ghstars_processData = processData;

	pageRequest( 'https://api.github.com/users/' + gh_user + '/received_events?access_token=' + access_token + '&callback=ghstars_processData' );
})( window, jQuery );