[h: selectedTokens = arg(0)]

[h: trackedTokens = getLibProperty("trackedTokens", "Lib:Tracker")]
[h, foreach(tokenID, selectedTokens), code: {
	[h, if(listContains(trackedTokens, tokenID) == 0):
		trackedTokens = listAppend(trackedTokens, tokenID)
	]
}]

[h: setLibProperty("trackedTokens", trackedTokens, "Lib:Tracker")]

[h, macro("Tracker Frame@Lib:Tracker"): ""]