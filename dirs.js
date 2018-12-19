const Promise = require('bluebird');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
//Продвигает весь объект, просматривая свойства объекта
// и создавая асинхронный эквивалент каждой функции объекта и его цепи прототипов.
const dirs = [
	'dir-1/dir-1-1',
	'dir-1/dir-1-2',
	'dir-1/dir-1-2/dir-1-2-1',
	'dir-2/dir-2-1/dir-2-1-1',
	'dir-2/dir-2-2/dir-2-2-1',
	'dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
	'dir-3/dir-3-1',
	'dir-3',
	'dir-3/dir-3-2/dir-3-2-1',
	'dir-3/dir-3-3/dir-3-3-1'
];

let arrOfPaths = [];

dirs.forEach((dir) => {
	let p = './gen/';
	dir.split('/')
		.forEach((dir) => {
			p += dir + path.sep;
			if (arrOfPaths.indexOf(p) < 0)
				arrOfPaths.push(p);
		})
});

 
Promise.mapSeries(arrOfPaths, (path) => {
	return fs.mkdirAsync(path);
});