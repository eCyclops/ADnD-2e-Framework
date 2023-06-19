[h: auraGroup = getLibProperty("_auraGroup","Lib:ADND")]
[h: auraName = getLibProperty("_auraName","Lib:ADND")]
[h: colorInitiative = getLibProperty("_colorInitiative ","Lib:ADND")]

[h: initiativeList = json.get(getInitiativeList(), "tokens")]
[h, foreach(tok, initiativeList,""), code : {
	[h: tokenId = json.get(tok,"tokenId")]

	[h, if(getHalo(tokenId) == colorInitiative): setHalo("None",tokenId)]
	[h, token(tokenId): setLight(auraGroup,auraName,0) ]
	
	[h: setState("FailedSave",0,tokenId)]
	[h: setState("Green",0,tokenId)]
	[h: setState("Orange",0,tokenId)]
	[h: setState("Struck",0,tokenId)]
	[h: setState("Red",0,tokenId)]
}]