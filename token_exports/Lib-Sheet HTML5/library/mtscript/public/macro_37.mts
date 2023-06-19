[h: currentSelections = getSelected()]
[h, if(listCount(currentSelections)>1): primaryID = listGet(currentSelections,0);primaryID = currentSelections)]

[h: hasBeenInitialized = getProperty("NPC_Initialized",primaryID)]
[h, if(hasBeenInitialized == '' || hasBeenInitialized == 0), code :{
	[h, macro("Spawn Creature Main@Lib:MM:Macros"):json.set("{}","tokenID",primaryID,"selectedTokens",currentSelections)]
}
;{
	[h, macro("NPC_Initialize_Normal@Lib:ADND"):strformat("myID=%{primaryID};")]
}]
