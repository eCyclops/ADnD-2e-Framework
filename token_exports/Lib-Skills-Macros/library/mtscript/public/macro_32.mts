[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(WeaponID,Property,tokenID). "+getMacroName()+"@"+getMacroLocation())]

[h: weaponID = arg(0) ]
[h: weaponProperty = arg(1) ]
[h: myID = arg(2) ]

[H, token(myID): myWeapons = getMatchingProperties("weapon\\..*")]
[h: returnProperty = '']
[h, foreach(thisWeapon,myWeapons,""), code :{
	[h: prop = getProperty(thisWeapon,myID)]
	[if(prop != '' && getStrProp(prop,'weaponID') == weaponID): returnProperty = getStrProp(prop,weaponProperty) ]
}]

[h: macro.return = returnProperty]