[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(npcJSON). "+getMacroName()+"@"+getMacroLocation())]

[H: npcJSON = arg(0) ]

[h: newDamageList = parseDamageRolls(decode(json.get(npcJSON,'damage')))]

[if(listCount(newDamageList)>0), code :{
	[foreach(dice,newDamageList,""), code :{
		[h: newDice = parseDiceRoll(dice)]
		[h: npcJSON = addWeaponToNPC(npcJSON,newDice)]
	}]
};{}]

[h: macro.return = npcJSON]