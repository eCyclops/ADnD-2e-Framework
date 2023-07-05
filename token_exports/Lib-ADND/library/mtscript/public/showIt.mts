[H: numArgs = argCount()]
[h: assert(!(numArgs<4),"Too few arguments to function "+getMacroName()+"(outputTxt, tokenID, outputType, hidePCRollFromPC). "+getMacroName()+"@"+getMacroLocation())]

[H: finalTxt = arg(0) ]
[H: myID = arg(1) ]
[h: outputType = arg(2)]
[h: hidePCRollFromPC = arg(3)]

[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: hiddenMode = getStrProp(cfgSettings,"hiddenMode",0)]
[h: privateMode  = getStrProp(cfgSettings,"PrivateMode",0)]
[h: privateAttackMode  = getStrProp(cfgSettings,"privateAttackMode",0)]

[h: npcShown = 0]
[if(privateMode && startsWith(outputType,"save") && isNPC(myID)), code : {
	[r: broadcast("DM: "+finalTxt,"gm")]
	[h: npcShown = 1]
};{}]
[if(privateMode && startsWith(outputType,"check") && isNPC(myID)), code : {
	[r: broadcast("DM: "+finalTxt,"gm")]
	[h: npcShown = 1]
};{}]
[if(privateMode && startsWith(outputType,"initiative") && isNPC(myID)), code : {
	[r: broadcast("DM: "+finalTxt,"gm")]
	[h: npcShown = 1]
};{}]
[if(privateAttackMode && startsWith(outputType,"attack") && isNPC(myID)), code : {
	[r: broadcast("DM: "+finalTxt,"gm")]
	[h: npcShown = 1]
};{}]
[if(startsWith(outputType,"health") && isNPC(myID)), code : {
	[r: broadcast("DM: "+finalTxt,"gm")]
	[h: npcShown = 1]
};{}]
[if(startsWith(outputType,"gm") && isNPC(myID)), code : {
	[r: broadcast("DM: "+finalTxt,"gm")]
	[h: npcShown = 1]
};{}]
[if(!npcShown && isNPC(myID)), code : {
	[r: broadcast(finalTxt)]
};{}]

[h: hasShowCheck = 0]
[if(isPC(myID) && hidePCRollFromPC && hiddenMode && !hasShowCheck), code :{
	[h: playerName = getName(myID)]
	[h: connectedPlayerID = getPlayerName()]
	[h: hiddenFromTxt = strformat('<table cellpadding=1 bgcolor=black><tr><td font color=yellow><b>RESULT HIDDEN FROM %{playerName}</b></td></tr></table>')]
	[r: broadcast(hiddenFromTxt+finalTxt,"gm")]
	[r: broadcast("Roll results sent to DM.<br>",connectedPlayerID)]
	[h: hasShowCheck = 1]
};{}]
[if(getProperty("PrivacyMode",myID) == 1 && isPC(myID) && !hasShowCheck), code : {
	[h: connectedPlayerID = getPlayerName()]
	[r: broadcast("DM: "+finalTxt,"gm")]
	[r: broadcast(finalTxt,connectedPlayerID)]
	[h: hasShowCheck = 1]
};{}]
[if(isPC(myID) && !hasShowCheck), code : {
	[r: broadcast(finalTxt)]
};{}]
