[h: '<!-- change DB token from #e to DB -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<3),"To few arguments to function "+getMacroName()+"(libMapName,libName,dbVersion). "+getMacroName()+"@"+getMacroLocation())]
[h: 'example usage to change Spells DB to 2e: changeDB("Framework - Library","Lib:Spells","2e")']
[h: 'example usage to change MM DB to 1e: changeDB("Framework - Library","Lib:MM","1e")']

[H: libMapName = arg(0) ]
[H: finalName = arg(1) ]
[H: dbVersion = arg(2) ]

	[h: setCurrentMap(libMapName)]

	[h: replacementDBToken = strformat("%{finalName}:%{dbVersion}")]
	[h: replacementID = findToken(replacementDBToken)]
	[h: assert(replacementID !="", strformat("Unable to find original DB token %{replacementDBToken}, aborting! <br>"),0)]
	[h: replacementCurrentX = getTokenX(1, replacementID)]
	[h: replacementCurrentY = getTokenY(1, replacementID)]

	[h: tokenID = findToken(finalName)]
	[h: assert(tokenID !="", strformat("Unable to find original DB token %{finalName}, aborting! <br>"),0)]
	[h: currentDBVersion = getProperty("dbVersion",tokenID)]
	[h: newReplacement_DBToken = strformat("%{finalName}:%{currentDBVersion}")]
	[h: CurrentX = getTokenX(1, tokenID)]
	[h: CurrentY = getTokenY(1, tokenID)]

	[h: 'create the new main lib token from the stored one']
	[h: updates = strformat("{name: '%{finalName}',x: '%{currentX}',y: '%{currentY}', useDistance: 1, delta: 0 }")]
	[h: copyToken(replacementID,1,libMapName,updates)]
	
	[h: 'copy the current lib db to the stored name']
	[h: newReplacement_updates = strformat("{name: '%{newReplacement_DBToken}',x: '%{replacementCurrentX}',y: '%{replacementCurrentY}', useDistance: 1, delta: 0 }")]
	[h: copyToken(tokenID,1,libMapName,newReplacement_updates)]

	[h: removeToken(tokenID)]
	[h: removeToken(replacementID)]


