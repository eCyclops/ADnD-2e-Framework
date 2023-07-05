[h: closeFrame("getPCSelectList")]

[h: finishingMacro = json.get(arg(0),"finishingMacro")]
[h: assert(!(finishingMacro==''),"finishingMacro is invalid in "+getMacroName()+"@"+getMacroLocation())]

[h: pcList = '']
[h, foreach(check,arg(0),""), code :{
	[if( startsWith(check,"tokenID_") ), code :{
		[h: thisName = json.get(arg(0),check)]
		[h: pcList = listAppend(pcList,thisName)]
	}]
}]

[h: assert(!(pcList==''),"No PC's selected."+getMacroName()+"@"+getMacroLocation(),0)]

[macro(finishingMacro+"@Lib:ADND"):strformat("pcList=%{pcList};")]



