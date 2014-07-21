var express = require("express");
var app = express();
var util = require("util");
var fs = require("fs");
var template = require("./template");
var settings = require("./settings.json");
/* Serving home page */

app.get("/", function(req, res) {
	fs.readFile(__dirname + "/index.md", "utf8", function(err,data) {
		console.log(__dirname + "/index.md");
		if(err) {
			if(err.code == "ENOENT")	res.send("404 - not found");
			else throw err;
		}
		else {
			template.templatemd(data, function(output) {
				util.pump(output,res);
			});
		}	
	});	
});

app.get("/concatenate", function(req, res) {
	template.templateconcat(data, function(output) {
		util.pump(output,res);
	});
});

/* serves all the md files */
app.get("*.md", function(req, res) {
	console.log('Routing an md file request');

	fs.readFile(__dirname + req.params[0]+".md", "utf8", function(err,data) {
		console.log(__dirname + req.params[0]+".md");
		if(err) {
			if(err.code == "ENOENT")	res.send("404 - not found");
			else throw err; 
		}
		else {
			template.templatemd(data, function(output) {
				util.pump(output,res);
			});
		}	
	});				
});

app.post("/", function(req, res) { 
	/* some server side logic */
	res.send("OK");
});





/* serves all the static files and index files*/
app.get(/^(.+)$/, function(req, res){ 
	console.log('static file request : ' + util.inspect(req.params, false, null));
	fs.readFile(__dirname + req.params[0], "utf8", function(err,data) {
		if(err) {
		
			switch(err.code) {
				case "ENOENT":
					res.send("404 - not found");
					break;
				case "EISDIR":
					fs.readFile(__dirname + req.params[0]+"/index.md", "utf8", function(err,data) {
						if(err) {
							if(err.code == "ENOENT")	res.send("404 - not found");
							else throw err; 
						}
						else {
							template.templatemd(data, function(output) {
								util.pump(output,res);
							});
						}	
					});
					break;
				default:
					throw err;
			}
		}
		else {	
			res.sendfile(__dirname + req.params[0]);
		}
	});
	
});



var port = process.env.PORT || 5000;
	app.listen(port, function() {
	console.log("Listening on " + port);
});