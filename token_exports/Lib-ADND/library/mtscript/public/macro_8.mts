[h: closeFrame("Teleport_gatherTokenList")]

[h: mySelected = json.get(arg(0),"mySelected")]
[h: assert(!(mySelected==''),"mySelected is invalid in "+getMacroName()+"@"+getMacroLocation())]

[h: teleportList = '']
[h, foreach(check,arg(0),""), code :{
	[if( startsWith(check,"tokenID_") ), code :{
		[h: thisName = json.get(arg(0),check)]
		[h: teleportList = listAppend(teleportList,thisName)]
	}]
}]
[h, macro("Teleport@Lib:ADND"):strformat("mySelected=%{mySelected}; teleportList=%{teleportList};")]



