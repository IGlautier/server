var settings = require("./settings.json");

/* Setting up moustache templates */
var mu = require("mu2")
mu.root = __dirname + '/templates';

/* Setting up markdown parsing */
var marked = require("marked");
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
});



function templatemd(data, callback) {
	marked(data, function(err, content) 
		{
			if(err) throw err; 
			console.log("Templating an md file");
			var stream = mu.compileAndRender('.mdwiki.html', {body: content, sitename: settings.sitename});
			callback(stream);
		});
}


exports.templatemd = templatemd;