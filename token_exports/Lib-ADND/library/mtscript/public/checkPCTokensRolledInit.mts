[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"('Last'|'Rolled'|'Remaining'|'All'|'Default'). "+getMacroName()+"@"+getMacroLocation())]

[H: optionTXT = arg(0) ]

[h: initJSON = getInitiativeList() ]
[h: tokenCount =  json.length(json.get(initJSON,"tokens"))]
[h: pcTokenJSON =  json.get(initJSON,"tokens")]
[h, if( tokenCount <1 ), code :{
	[h: assert(0,"No tokens have rolled initiative yet.<br>",0)]
};{}]
[h: initTokenList = ""]
[h, foreach(thisJSON,pcTokenJSON,""), code :{
	[tokenID =  json.get(thisJSON,"tokenId")]
	[initTokenList = listAppend(initTokenList,tokenID)]
}]

[h: cond = json.set("{}", "pc", 1)]
[h: pcTokens = getTokens("json", cond)]
[h: pcTokensCount = listCount(pcTokens)]
[h: assert(pcTokensCount>0,"No PC tokens on current map.<br>",0)]

[h: foundAll = 0]
[h: foundCount = 0]
[h: foundList = ""]
[h: notFoundList = ""]
[h, foreach(pcToken, pcTokens,""), code :{
	[h: foundThis = 0]
	[foreach(initToken,initTokenList,""), code :{
		[if(pcToken == initToken): foundThis = 1]
	}]
	[h, if (foundThis): foundCount = foundCount + 1 ]
	[h, if (foundThis): 
			foundList = listAppend(foundList,pcToken);
			notFoundList = listAppend(notFoundList,pcToken)]
}]

[h, if (foundCount == pcTokensCount): foundAll = 1]

[h: foundListName = '']
[h, foreach(id,foundList,""):foundListName = listAppend(foundListName,getName(id))]
[h: notFoundListName = '']
[h, foreach(id,notFoundList,""):notFoundListName = listAppend(notFoundListName,getName(id))]

[h,if(startsWith("All",optionTXT) || startsWith("Rolled",optionTXT)): broadcast(strformat("<font color=green>Rolled initiative: %{foundListName}</font><br>"))]
[if(!foundAll), code :{
	[h,if(startsWith("All",optionTXT) || startsWith("Default",optionTXT) || startsWith("Remaining",optionTXT)): 
		broadcast(strformat("<font color=red>Initiative NOT received from: %{notFoundListName}</font><br>"))]
};{}]

[h,if(startsWith("All",optionTXT) || startsWith("Last",optionTXT) && foundAll): broadcast(strformat("<font color=orange>All PCs have rolled initiative. START ROUND!</font><br>"))]
