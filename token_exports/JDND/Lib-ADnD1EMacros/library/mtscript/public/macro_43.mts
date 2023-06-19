[h: theLevel = arg(0)]
[h: theMod = 0]

[h, if(!isNumber(theLevel)), code: {
	[h: monsterLevel = strfind(theLevel,"(\\d+)([+-]\\d+)")]
	[h: find = getFindCount(monsterLevel)]
	[h: theLevel = getGroup(monsterLevel,1,1)]
	[h: theMod = getGroup(monsterLevel,1,2)]
	[h, if(theMod>3): theLevel = theLevel+1]
	[h, if(theMod>3): theMod = 0]
}]

[h: returnArgs = ""]
[h: returnArgs = setStrProp(returnArgs, "theLevel", theLevel)]
[h: returnArgs = setStrProp(returnArgs, "theMod", theMod)]

[r: returnArgs]