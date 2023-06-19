[h: teleportList = getStrProp(arg(0),"teleportList")]
[h: assert(!(teleportList==''),"teleportList is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: mySelected = getStrProp(arg(0),"mySelected")]
[h: assert(!(mySelected==''),"mySelected is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: '<!-- This will find ALL PC tokens on any map in the campaign and move it to the currently selected token -->']

[h: activeId = mySelected ]
[h: assert(listCount(activeId)==1, "You have to select ONE token for the teleport location of the PCs.",0)]

[h: CurrentX = getTokenX(0,activeId)]
[h: CurrentY = getTokenY(0,activeId)]
[h: currentMap = getCurrentMapName()]
[h: cond = json.set("{}", "pc", 1)]
[h: allMapNames = getAllMapNames()]
[h: '<!-- check all maps for PC tokens and store the id/name/map in json -->']

[foreach(aMap,allMapNames,""),code: {
	[h: setCurrentMap(aMap)]
	[h: ids = getTokens("json", cond)]
	[foreach(id, ids,""), code :{
		[h: pcName = getName(id)]
		[h: okTP = listContains(teleportList,id)]
		[r, if(okTP && aMap == currentMap):
			moveToken(CurrentX,CurrentY,0,id)]
		[r, if(okTP && aMap != currentMap):
			moveTokenToMap(id,currentMap,CurrentX,CurrentY,0)]
		[r, if(okTP && currentMap == aMap):"Teleported "+pcName+" to "+aMap+".<br>"]
	}]

}]
[h:setCurrentMap(currentMap)]



