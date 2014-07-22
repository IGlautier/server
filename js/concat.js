var existing;

getText = function(url, callback) {
    var request = new XMLHttpRequest();
	
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            callback(request.responseXML); 
        }
    }; 
    request.open('GET', url);
	request.responseType = "document";
    request.send();
}


function getLinks(content) {
	links = document.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++) {
		if(typeof existing[links[i].href] == "undefined") {
			existing[links[i].href] = false;
			/*check if a local link*/
			getText(links[i].href, function(res) {
				if (res.title == "index.md") getLinks(res);
				links[i].href.parentNode.appendChild(res.body.childNodes);
			});
			
		}
	}
}


