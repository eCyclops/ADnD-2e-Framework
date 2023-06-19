[h: tokenID = arg(0)]

[h: map = listGet(getTokenMap(tokenID), 0)]

[h: setCurrentMap(map)]
[h: goto(tokenID)]
[h: setZoom(0.5)]

[h, macro("Tracker Frame@Lib:Tracker"): ""]