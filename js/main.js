var siteData;

$(function() {

	//$('#subnav').draggable();

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
			item.addClass(nospace);
			item.appendTo(links);
		}

    	//loading iframe
		locationHashChanged();


	});
	

});


function locationHashChanged() {
	var pageArray = getPage();
	console.log(pageArray);
	currentPage = pageArray[0];
	currentSubpage = reSpace(pageArray[1]);

	//reset active class
	$('li a').removeClass('active');

	//if the page exists
	if (siteData.menu.hasOwnProperty(currentPage)){
		
		//subnav
		var subnav = $('#subnav');
		subnav.html('');
		for (var property in siteData.menu[currentPage].subnav) {
			var item = $('<li class="subnav-item">');
			//normal linking// item.html('<a href="' + siteData.menu[currentPage].subnav[property] + '">' + property + '</a>');
			item.html('<a href="#' + deSpace(currentPage) + "?" + deSpace(property) + '">' + property + '</a>');
			item.appendTo(subnav);
		//set title
		$('#banner').html(siteData.menu[currentPage].title);
		//active
		$('.' + deSpace(currentPage) + ' a').addClass('active');
		console.log (currentPage);
		console.log(currentSubpage);
		}

		//set iframe
		if( currentSubpage == "" ){
			$('#bg').attr('src', siteData.menu[currentPage].url);
		} else {
			$('#bg').attr('src', siteData.menu[currentPage].subnav[currentSubpage]);
		}


	} else {
	//load the first one
		$('#bg').attr('src', siteData.menu[Object.keys(siteData.menu)[0]].url);
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
	var subitem = "";
	item = item.replace('#','');
	if (item.indexOf("?") >= 0){
		pageitem = item.substr(0, item.indexOf('?'));
		subitem = item.substr(item.indexOf('?'),item.length)
		subitem = subitem.replace('?','');
	} else {
		pageitem = item;
	}
	pageitem = decodeURI(pageitem);
	pageitem = reSpace(pageitem);
	return [pageitem, subitem];
}


window.onhashchange = locationHashChanged;

