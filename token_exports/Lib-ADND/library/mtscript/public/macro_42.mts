[h: surpriseTokens = getSelected()]
[h, if(listCount(surpriseTokens) == 0), code: {
	[h: broadcast("Tokens must be selected to roll surprise.", "gm")]
	[h: abort(0)]
}]

[h: surpriseRolls = "{}"]
[h, foreach(tokenID, surpriseTokens), code: {
	[h: tokenData = getProperty("Character_Details", tokenID)]
	[h: tokenClassList = getStrProp(tokenData, "Class")]
	[h: tokenLevelList = getStrProp(tokenData, "Level")]

	[h: bestOdds = "2,1d6"]
	[h: checkOdds = "2,1d6"]
	[h, for(i, 0, listCount(tokenClassList), 1, ""), code: {
		[h: tokenClass = listGet(tokenClassList, i)]
		[h: tokenLevel = listGet(tokenLevelList, i)]
		[h, if(tokenLevel == ""): tokenLevel = 1]

		[h, if(tokenClass == "monk" && tokenLevel >= 2): checkOdds = 32 - (2*(tokenLevel-2)) + ",1d100"]
		[h, if(tokenClass == "ranger"): checkOdds = "1,1d6"]

		[h, if(listGet(checkOdds,0) < listGet(bestOdds,0)): bestOdds = checkOdds]
		[h, if(listGet(checkOdds,1) == "1d100" && listGet(bestOdds,1) == "1d6" && listGet(bestOdds,0) == 2): bestOdds = checkOdds]
		[h, if(listGet(checkOdds,1) == "1d100" && listGet(checkOdds,0) <= 16 && listGet(bestOdds,1) == "1d6" && listGet(bestOdds,0) == 1): bestOdds = checkOdds]
		[h, if(listGet(checkOdds,1) == "1d100" && listGet(bestOdds,1) == "1d100" && listGet(checkOdds,0) < listGet(bestOdds,0)): bestOdds = checkOdds]
	}]

	[h: oddsJSON = json.set("{}", "target", listGet(bestOdds,0), "dice", listGet(bestOdds,1), "roll", eval(listGet(bestOdds,1)))]
	[h: surpriseRolls = json.set(surpriseRolls, tokenID, oddsJSON)]
}]

[h: macro.return = surpriseRolls]