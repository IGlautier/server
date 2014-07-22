
function getText(url, num, callback) {
    var request = new XMLHttpRequest();
	request.open('GET', url);
    request.onreadystatechange = function()
    {
        if (request.readyState == 4 && request.status == 200)
        {
            callback(request.responseText, num); 
        }
    }; 
    
    request.send();
}


function getLinks(content) {
	links = document.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++) {
		if(typeof existing[links[i].href] == "undefined") {
			existing[links[i].href] = false;
			
			if (links[i].hostname == settings.host) {
				links[i].id = "sec" + i;
				getText(links[i].href, i, function(res, x) {
					var parser = new DOMParser();
					var doc = parser.parseFromString(res, 'text/html');
					if (doc.title == "index.md") getLinks(doc);
					links = document.getElementsByTagName('a');
					var newDiv = document.createElement("div");
					for (var l = 0; l < doc.body.childNodes.length; l++) newDiv.appendChild(doc.body.childNodes[l]);
					document.getElementById("sec" + x).parentNode.nextSibling.parentNode.insertBefore(newDiv, document.getElementById("sec" + x).parentNode.nextSibling);
				});
			}
			
		}
	}
}


