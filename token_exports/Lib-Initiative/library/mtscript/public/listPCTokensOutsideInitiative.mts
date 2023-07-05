[h: '<!-- Create a list of all PC tokens on this map -->']
[h: pcTokenList = getTokens("json", json.set("{}", "pc", 1))]
[h: pcTokensCount = listCount(pcTokenList)]
[h: assert(pcTokensCount > 0,"No PC tokens on current map.<br>",0)]

[h: '<!-- Create a list of tokens in the initiative order -->']
[h: initiativeTokensJSON = json.get(getInitiativeList(), "tokens")]
[h: tokensInInitiativeCount = json.length(initiativeTokensJSON)]
[h, if( tokensInInitiativeCount < 1 ), code : {
	[h: assert(0, "No tokens have rolled initiative yet.<br>", 0)]
};{}]

[h: initiaveTokensList = ""]
[h, foreach(tokenJSON, initiativeTokensJSON,""), code: {
	[h: tokenID =  json.get(tokenJSON, "tokenId")]
	[h: initiaveTokensList = listAppend(initiaveTokensList, tokenID)]
}]

[h: '<!-- Compile a list of all PC tokens that are not in the initiative order -->']
[h: notFoundList = ""]
[h, foreach(pcToken, pcTokenList, ""), code: {
	[h, if(listFind(initiaveTokensList, pcToken) < 0), code: {
		[h: notFoundList = listAppend(notFoundList, getName(pcToken))]
	};{}]
}]

[h: macro.return = notFoundList]