var console = process.stdout;
var argv = process.argv;
var fs = require('fs');
var path = require('path');
var ini = require('node-ini');
var pkg = require('./package.json');

function print(msg)
{
	console.write(msg + "\n");
}

function startup()
{
	print("");
	print("wurli version " + pkg.version);
	print("");
	
	if (argv.length < 3) 
	{
		process.exit();
		return false;
	}
	return true;
}

function processArgs()
{
	for (var i = 2; i < argv.length; i++)
	{
		var filePathName = argv[i];
		var	fileExt = path.extname(filePathName);
		
		print("Processing file: " + filePathName);
		
		switch (fileExt)
		{
			case '.url':
				processUrlFile(filePathName, fileExt);
				break;
			case '.htm':
			case '.html':
				processHtmFile(filePathName, fileExt);
				break;
		}
	}
}

function processHtmFile(filePathName, fileExt)
{
	// TODO: Extract url(s) from file and make .url file(s)?
}

function processUrlFile(filePathName, fileExt)
{
	var src = ini.parseSync(filePathName);
	var targetUrl = src.InternetShortcut.URL;
	//print("url of source file: " + targetUrl);
	
	var dirName = path.dirname(filePathName);
	var fileName = path.basename(filePathName, fileExt);
	var outputFilePathName = path.join(dirName, fileName + '.html');
	
	var htmlTemplate = 
'<html>\
<body>\
<script type="text/javascript">\
	window.location.href = "{target.url}"; \
</script>\
</body>\
</html>';
	
	fs.writeFileSync(outputFilePathName, htmlTemplate.replace('{target.url}', targetUrl));
}

if (!startup()) return;
processArgs();
