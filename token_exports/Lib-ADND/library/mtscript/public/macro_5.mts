[h: closeFrame("NPC_Initialize_FirstTime")]

[h: myID = json.get(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid in "+getMacroName()+"@"+getMacroLocation())]

[h: selectedTokens = json.get(arg(0),"selectedTokens")]
[h: assert(selectedTokens,"selectedTokens is invalid "+getMacroName()+"@"+getMacroLocation())]

[h, foreach(check,arg(0),""), code :{
	[h, if( startsWith(check,"weapon") ), code :{
		[h:attack = getLibProperty(check,"Lib:MM")]
		[h: setProperty(check,attack,myID)]
	}]
}]

[h: selectTokens(selectedTokens,0,",")]

[h, macro("NPC_Initialize_Normal@this"):strformat("myID=%{myID};")]



