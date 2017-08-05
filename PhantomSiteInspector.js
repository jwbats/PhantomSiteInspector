function InitPrototypeFunctions(){
	if (!String.prototype.format){
		String.prototype.format = function(){
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number){
				return typeof args[number] != 'undefined'
					? args[number]
					: match;
			});
		};
	}
}

function InitPage(){
	var page = require('webpage').create();

	page.viewportSize = {
	  width: 1920,
	  height: 1200
	};

	page.clipRect = {
		top:    0,
		left:   0,
		width:  page.viewportSize.width,
		height: page.viewportSize.height
	};

	page.onError = function (msg, trace) {
		//console.log(msg);
		trace.forEach(function(item) {
			//console.log('  ', item.file, ':', item.line);
		});
	};

	return page;
}

function ReadUrls(){
	var args = require('system').args;
	var fileInput = args[1];

	var fs = require('fs');
	var stream = fs.open(fileInput, 'r');

	var urls = [];

	while(!stream.atEnd()) {
		var line = stream.readLine();
		urls.push(line);
	}

	stream.close();

	return urls;
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function CreateDateTimeStamp(){
	var date = new Date();

	var year    = date.getFullYear();
	var month   = date.getMonth() + 1;
	var day     = date.getDate();
	var hours   = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	return '{0}.{1}.{2} {3}.{4}.{5}'.format(
		pad(year, 4),
		pad(month, 2),
		pad(day, 2),
		pad(hours, 2),
		pad(minutes, 2),
		pad(seconds, 2)
	);
}

function GetDomain(url){
	return url
		.replace('http://', '')
		.replace('https://', '')
		.replace('www.', '')
		.replace('/', '');
}

function HandleUrl(url){
	var page = InitPage();

	phantom.clearCookies();

	page.open(url, function(status) {
		var success = (status == 'success');

		if (success){
			console.log('Successfully loaded ' + url + '.');
		} else {
			console.log('Error loading ' + url + '. Could indicate problem. Check screenshot.');
		}
		
		// wait a few seconds to see if this site is hacked with a redirect
		setTimeout(function(){
			var fileName = dtStamp + '\\' + GetDomain(url) + '.jpg';
			page.render(fileName, {format: 'jpg', quality: '85'});

			setTimeout(HandleNextUrl, 100);			
		}, 4000);
	});
}

function HandleNextUrl(){
    var url = urls.shift();

	if (url){
		HandleUrl(url);
	} else {
		phantom.exit(0);
	}
}

InitPrototypeFunctions();

var dtStamp = CreateDateTimeStamp();
var urls = ReadUrls();

HandleNextUrl();