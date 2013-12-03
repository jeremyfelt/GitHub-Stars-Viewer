var access_token = '',
    gh_user      = '';

function pageRequest( url ) {
	$.ajax({
		type: "GET",
		url: url,
		dataType: 'jsonp',
		async: false,
		jsonp: false
		//jsonpCallback: processData
	});
}

var processData = function( response ) {
	console.log( response );
	$.each( response.data, function processItem( key, val ) {
		if ( 'WatchEvent' === val.type ) {
			$('#stars-list').append( '<li>' + val.actor.login + ' <a href="' + val.repo.url + '">' + val.repo.name + '</a></li>' );
		}
	} );
	if ( 'next' === response.meta.Link[0][1].rel ) {
		pageRequest( response.meta.Link[0][0] );
	}
};

pageRequest( 'https://api.github.com/users/' + gh_user + '/received_events?access_token=' + access_token + '&callback=processData' );
