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
  sanitize: true,
  smartLists: true,
  smartypants: false
});

function serve(data, callback) {
	marked(data, function(err, content) 
			{if(err) throw err; console.log(content);
				var stream = mu.compileAndRender('.wiki.html', {body: content});
				callback(stream);
			
			
			});
}

exports.serve = serve;