[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]

[h: incomingArgs = arg(0)]

[h: castableProp = canCastSpells(strformat("myID=%{myID};"))]
[h: hasArcane = getStrProp(castableProp,"hasArcane",0)]
[h: hasDivine = getStrProp(castableProp,"hasDivine",0)]

[h: slotDetails = getSpellSlotTxt(incomingArgs)]

[h: outTxt = '']

[h: outTxt = concat(outTxt,strformat('<table width=100% border="0" cellpadding="1" cellspacing="0"><caption><b>%{magicType}</b></caption><tr><td>'))]
[h: outTxt = concat(outTxt,strformat('<table width=100%>'))]
[h,if(isPC(myID)): outTxt = concat(outTxt,strformat('<caption>%{slotDetails}</caption>'))]
[h: outTxt = concat(outTxt,strformat('<tbody>'))]

[h: outTxt = concat(outTxt,strformat('<tr>'))]
[h: outTxt = concat(outTxt,strformat('<td><table width=100%>'))]
[h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=Memorized;")]
[h: outTxt = concat(outTxt,listMySpells(args))]
[h: outTxt = concat(outTxt,strformat('</td></tr></table>'))]

[if(isPC(myID)), code : {
	[h: outTxt = concat(outTxt,strformat('<tr><td><table width=100%>'))]
	[h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=Known;")]
	[h: outTxt = concat(outTxt,listMySpells(args))]
	[h: outTxt = concat(outTxt,strformat('</td></tr></table>'))]
};{}]

[h: outTxt = concat(outTxt,strformat('</tr></tbody></table>'))]
[h: outTxt = concat(outTxt,strformat('</td></tr></table>'))]

[h: macro.return = outTxt]
