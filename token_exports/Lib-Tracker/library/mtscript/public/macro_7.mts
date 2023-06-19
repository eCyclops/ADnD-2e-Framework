[h: tokenID = arg(0)]
[if(isGM() == 1), code: {
	[r, macro("GM Item@Lib:Tracker"): tokenID]
};
{
	[r, macro("Player Item@Lib:Tracker"): tokenID]
}]