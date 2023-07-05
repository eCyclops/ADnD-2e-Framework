[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: '<!-- does this token have ANY spells memorized? -->']

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: tagProp = add(magicType,"_"+vancianType)]
[h: my_spells = getProperty(tagProp,myID)]
[h,if(!json.isEmpty(my_spells)):
	hasMemorized = 1;
	hasMemorized = 0]

[h: macro.return = hasMemorized]
