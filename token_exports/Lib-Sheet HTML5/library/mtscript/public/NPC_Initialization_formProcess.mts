[h: closeFrame("NPC_Initialize_FirstTime")]

[h: myID = json.get(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid in "+getMacroName()+"@"+getMacroLocation())]

[h: selectedTokens = json.get(macro.args,"selectedTokens")]
[h: assert(selectedTokens,"selectedTokens is invalid "+getMacroName()+"@"+getMacroLocation())]

[h, foreach(check,macro.args,""), code :{
	[h, if( startsWith(check,"weapon") ), code :{
		[h:attack = getLibProperty(check,"Lib:MM")]
		[h: setProperty(check,attack,myID)]
	}]
}]

[h: selectTokens(selectedTokens,0,",")]

[h, macro("NPC_Initialize_Normal@this"):strformat("myID=%{myID};")]



