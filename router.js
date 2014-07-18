function directory(path, callback) {
	return function(err, stats) {
		if(err) throw err;
		callback(stats.isDirectory());
	}
}



exports.directory = directory;
