[h: activeId = getSelected()]
[h, if(listCount(activeId)>1): primaryID = listGet(activeId,0);primaryID = activeId)]
[h: assert(!isNumber(primaryID), "Maptools Bug: Token ID corrupted. We cannot use this token. Copy it to new token if you want to use this token and a new ID will be created.",0)]

[h, if(isPC(primaryID)), code: 
{
	[h, macro("PC_Initialize@Lib:ADND"):primaryID]
	[H: broadcast(getName(primaryID)+" initialized.<br>","gm")]
};
{
	[h, macro("NPC_Initialize@Lib:ADND"):'']
}]
