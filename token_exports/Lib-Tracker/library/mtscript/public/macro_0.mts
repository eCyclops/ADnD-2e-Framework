[h: trackedTokens = getLibProperty("trackedTokens", "Lib:Tracker")]
[h: playerVisibleTokens = getLibProperty("playerVisibleTrackedTokens", "Lib:Tracker")]
[h, if(listCount(trackedTokens) == 0): noneTrackedMessage = "<div class='tracked-token'>No tokens tracked.</div>"; noneTrackedMessage = ""]
[h, if(listCount(playerVisibleTokens) == 0 && isGM() == 0): noneTrackedMessage = "<div class='tracked-token'>No tokens tracked.</div>"]
[h: selectedTokens = getSelected()]

[frame5("Tracker", "width=400; height=400; scrollreset=0;"): {
	<html>
		<head>
      		<link rel="stylesheet" type="text/css" href="CSS@Lib:Tracker">
					<link rel='onChangeSelection' type='macro' href='[r:macroLinkText("Tracker@Lib:Tracker")]'>
    	</head>
		<body>
			[r, macro("SVG Icons@Lib:Tracker"): ""]
			
			[if(listCount(selectedTokens) > 0 && isGM() == 1), code: {
				[h, if(listCount(selectedTokens) == 1): addMessage = "Add 1 Token"; addMessage = "Add " + listCount(selectedTokens) + " Tokens"]
				[h, if(listCount(selectedTokens) == 1): addMessageTooltip = "Add selected token to tracker"; addMessageTooltip = "Add selected tokens to tracker"]
				<div class="controls">
					<a href='[r: macroLinkText("Add to Tracker@Lib:Tracker", "none", selectedTokens)]' title='[r:addMessageTooltip]'>[r:addMessage]</a>
					<a href='[r: macroLinkText("Teleport@Lib:Tracker", "none", trackedTokens)]' title='Teleport all to selected token'>Teleport All</a>
				</div>
				<hr>
			};{}]
			<div>
				[r: noneTrackedMessage]
				[foreach(token, trackedTokens, ""), code: {
					[r, macro("Tracked Item@Lib:Tracker"): token]
				}]
			</div>
		</body>
	</html>
}]