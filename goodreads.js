// add code to find year (from goodreads.py)

var cheerio = require('cheerio');
var request = require('request');
var url = 'http://www.goodreads.com/topic/show/1631814-mollie-t-s-2014-books';
// var dateRe = /(?<=finished )([A-Za-z0-9 ]*)(?=.)/;
// var dateRe = /{finished ([A-Za-z0-9 ]*)(?=.)}/g;
var dateRe = /(finished [A-Za-z0-9 ]*)/g;
var yearRe = /(20[0-9]{2})/g;

// var generateJSON = function(arr, year) {
// 	result = {
// 		year: year,
// 		dates: arr 
// 	};

// 	return result;
// }

request(url, function(err, resp, body) {
	if (err)
		throw err;
	$ = cheerio.load(body);
	var title = $('title').text();
	var year = title.match(yearRe)[0];
	// this next line should find the first comment instead of needing the div id:
	var commentText = $('div #comment_89570136').text();
	var dates = commentText.match(dateRe);
	for (i = 0; i < dates.length; ++i) {
		dates[i] = dates[i].replace("finished ", "");
		var month = dates[i].split(" ")[0];
		var date = dates[i].split(" ")[1];
		var observation = [
			year,
			month,
			date
		];
		dates[i] = observation;
	}
	console.log(dates);
	// return dates;

	// // output data where each row is a book read and the columns represent year, month, and date:
	// var csvContent = "data:text/csv;charset=utf-8,";
	// dates.forEach(function(infoArray, index) {
	// 	dataString = infoArray.join(",");
	// 	csvContent += index < infoArray.length ? dataString+ "\n" : dataString;
	// });
	// var encodedUri = encodeURI(csvContent);
	// console.log(encodedUri)
});

// console.log(dates);