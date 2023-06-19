[h: '<!-- Expire all links, but only if there is just one player -->']
[h: '<!-- This stops it from triggering when a player connects to the server -->']
[h: '<!-- It should only trigger when the GM first loads the campaign -->']
[h: playerCount = listCount(getAllPlayerNames())]
[h, if( playerCount == 1), code: {
	[h, macro("Deactivate All Links@Lib:Temporary Links"): ""]
}]