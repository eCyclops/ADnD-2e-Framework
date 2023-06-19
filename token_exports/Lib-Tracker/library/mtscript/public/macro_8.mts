[h: "This macro is the same as the 'Remove from Tracker' macro, but it does not refresh the frame when it is done."]

[h: tokenID = arg(0)]

[h: trackedTokens = getLibProperty("trackedTokens", "Lib:Tracker")]
[h: listIndex = listFind(trackedTokens, tokenID)]
[h: trackedTokens = listDelete(trackedTokens, listIndex)]

[h: setLibProperty("trackedTokens", trackedTokens, "Lib:Tracker")]