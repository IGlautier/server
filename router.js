function directory(path, callback) {
	return function(err, stats) {
		if(err) throw err;
		else callback(stats.isDirectory());
	}
}

exports.directory = directory;