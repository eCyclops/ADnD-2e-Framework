[h: tokenID = arg(0)]

[h: trackedTokens = getLibProperty("trackedTokens", "Lib:Tracker")]
[h: playerVisibleTokens = getLibProperty("playerVisibleTrackedTokens", "Lib:Tracker")]

[h: listIndex = listFind(trackedTokens, tokenID)]
[h: playerListIndex = listFind(playerVisibleTokens, tokenID)]

[h: trackedTokens = listDelete(trackedTokens, listIndex)]

[h, if(playerListIndex != -1): playerVisibleTokens = listDelete(playerVisibleTokens, playerListIndex)]

[h: setLibProperty("trackedTokens", trackedTokens, "Lib:Tracker")]
[h: setLibProperty("playerVisibleTrackedTokens", playerVisibleTokens, "Lib:Tracker")]

[h, macro("Tracker Frame@Lib:Tracker"): ""]