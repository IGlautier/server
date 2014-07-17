var mu = require("mu2")
mu.root = __dirname + '/templates';

function insert(content, callback) {
	mu.compile(".wiki.html", function(err, content) {
		if (err) throw err;
		console.log(content);
		callback(content);
	});
}

exports.insert = insert;