[h: picNames=arg(0)]

[foreach(picName, picNames), code: {
	<img src='[r:getImage(picName)]'>
}]
