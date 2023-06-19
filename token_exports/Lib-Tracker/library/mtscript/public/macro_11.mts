[h: tokenID = arg(0)]
[h: playerVisibleTokens = getLibProperty("playerVisibleTrackedTokens", "Lib:Tracker")]

[h: tokenListIndex = listFind(playerVisibleTokens, tokenID)]
[h, if(tokenListIndex == -1), code: {
	[h: playerVisibleTokens = listAppend(playerVisibleTokens, tokenID)]
};
{
	[h: playerVisibleTokens = listDelete(playerVisibleTokens, tokenListIndex)]
}]

[h: setLibProperty("playerVisibleTrackedTokens", playerVisibleTokens, "Lib:Tracker")]

[h: updateTrackerLink = macroLinkText("Auto Refresh Tracker@Lib:Tracker","none")]
[h: execLink(updateTrackerLink, 1, "all")]