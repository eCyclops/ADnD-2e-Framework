[h: teleportList = arg(0)]
[h: teleportTarget = listGet(getSelected(),0)]

[h: targetX = getTokenX(0,teleportTarget)]
[h: targetY = getTokenY(0,teleportTarget)]
[h: targetMap = getCurrentMapName()]

[h, foreach(token, teleportList), code: {
	[h: startingMap = listGet(getTokenMap(token),0)]
	[h, if(startingMap == targetMap), code: {
		[h: moveToken(targetX, targetY, 0, token)]
	};
	{
		[h: moveTokenFromMap(token, startingMap, targetX, targetY)]
	}]
}]