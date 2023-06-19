[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(tokensJSON, OLDmyInitiativeList,updateFromOld). "+getMacroName()+"@"+getMacroLocation())]

[h: tokensJSON = arg(0) ]
[h,if(numArgs >1): OLDmyInitiativeList = arg(1); OLDmyInitiativeList = '{}']
[h,if(numArgs >2): updateFromOld = arg(2); updateFromOld = 0]

[h: myInitiativeList = '{}']
[h: myTokensJSON = '']
[h: count = 0]
[h, foreach(tok, tokensJSON,""), code :
{
	[h: previousWent = -1]
	[h: previousTokenId = ""]
	[h: tokenId = json.get(tok,"tokenId")]
	[h: initiative = json.get(tok,"initiative")]
	[h: initiative = number(initiative)]
	[h: holding = json.get(tok,"holding")]
	[h: slot = count]

	[foreach(oldTok, OLDmyInitiativeList,""), code :{
		[h: OLDtokenId = json.get(oldTok,"tokenId")]
		[h: OLDwent = json.get(oldTok,"went")]
	
		[if(OLDtokenId == tokenId):previousWent = OLDwent]
		[if(OLDtokenId == tokenId):previousTokenId = OLDtokenId]
	}]
	[h, if(previousWent != -1 && previousTokenId == tokenId): went = previousWent;went = 0]

	[h:  myTokensJSON = json.append(myTokensJSON,
			json.set("",
			"holding",holding,
			"initiative",initiative,
			"tokenId",tokenId,
			"went",went,
			"slot", slot))]
	[h: count = count + 1]
}]
[h: myInitiativeList = json.sort(myTokensJSON,"a","initiative")]

[h: macro.return = myInitiativeList]
