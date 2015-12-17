var siteData;

$(function() {

	//load the json
	$.get( "info.json", function( data ) {

		//did it load json data as string or as an object?
		if (typeof data == "string")
			data = $.parseJSON(data);

		siteData = data;
				
		//create the top navigation
		var links = $('#menu');
		for (var property in data.menu) {
			var author = property;
			var nospace = deSpace(author);
			var item = $('<li class="menu-item">');
			item.html('<a href="#' + nospace + '">' + author + '</a>');
			item.appendTo(links);
		}

    	//loading iframe
		locationHashChanged();



	});
	

});


function locationHashChanged() {
	var currentPage = getPage();

	//if the page exists
	if (siteData.menu.hasOwnProperty(currentPage)){
		console.log('ping')
		$('#backgrnd').attr('src', siteData.menu[currentPage].url);

		//subnav
		var subnav = $('#subnav');
		subnav.html('');
		for (var property in siteData.menu[currentPage].subnav) {
			var item = $('<li class="subnav-item">');
			item.html('<a href="' + siteData.menu[currentPage].subnav[property] + '">' + property + '</a>');
			item.appendTo(subnav);

		//set title
		$('#banner').html(siteData.menu[currentPage].title);
		}


	} else {
	//load the first one
		$('#backgrnd').attr('src', siteData.menu[Object.keys(siteData.menu)[0]].url);
	}
}


function deSpace(input) {
	return input.replace(/ /gi, '-');
}

function reSpace(input) {
	return input.replace(/-/gi, ' ')
}

function getPage() {
	var item = window.location.hash;
	item = item.replace('#','');
	item = decodeURI(item);
	item = reSpace(item);
	return item;
}


window.onhashchange = locationHashChanged;

