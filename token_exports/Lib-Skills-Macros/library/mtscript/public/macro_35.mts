[h: '<!-- returns unused weaponID on token myID -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(myID). "+getMacroName()+"@"+getMacroLocation())]

[H: myID = arg(0) ]

[h: newWeaponID = 0]
[h: tag = "weapon."+newWeaponID)]
[h: prop = getProperty(tag,myID)]

[h, while(prop != ''), code :{
	[h: newWeaponID = newWeaponID +1]
	[h: tag = "weapon."+newWeaponID)]
	[h: prop = getProperty(tag,myID)]
}]

[h: macro.return = newWeaponID]