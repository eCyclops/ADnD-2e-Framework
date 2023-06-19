[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: hasArcane = 0]
[h: arcaneProp = getProperty("Arcane_SpellSlots",myID)]
[h,count(countStrProp(arcaneProp),""), code :{
	[h, if(indexValueStrProp(arcaneProp,roll.count) > 0):hasArcane = 1]
}]
[h: hasDivine = 0]
[h: divineProp = getProperty("Divine_SpellSlots",myID)]
[h,count(countStrProp(divineProp),""), code :{
	[h, if(indexValueStrProp(divineProp,roll.count) > 0):hasDivine = 1]
}]

[h: macro.return = strformat("hasArcane=%{hasArcane}; hasDivine=%{hasDivine}")]
