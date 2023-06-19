[h: '<!-- this takes a string like 1-8+1/1-6/3d5 and turns it into an array of 1-8+1, 1-6, 3d5 -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(DamageString). "+getMacroName()+"@"+getMacroLocation())]

[H: damage = arg(0) ]

[h: diceList = '']
[h:strID = strfind(damage,"((\\d+[\\-dD]\\d+([\\-\\+]\\d+)?)+)(\\/|\$)?")] 
[h: foundCount = getFindCount(strID) + 1]
[h, for (find, 1,foundCount), code :{
	[h: diceRoll = getGroup(strID,find,1)]
	[h: diceList = listAppend(diceList, trim(diceRoll) )]
}]

[h: macro.return = diceList]



