[h: idLastTimeStamp = getLibProperty("idLastTimeStamp")]
[h: idIncrement = getLibProperty("idIncrement")]
[h, if(idIncrement == 0): idIncrement = 0]
[h: idTimeStamp = json.get(getInfo("server"), "timeInMs")]

[h, if(idLastTimeStamp == idTimeStamp), code: {
	[h: idIncrement = idIncrement + 1]
};
{
	[h: idIncrement = 0]
	[h: setLibProperty("idLastTimeStamp", idTimeStamp)]
}]
[h: setLibProperty("idIncrement", idIncrement)]

[h: macro.return = idTimeStamp + "-" + idIncrement]