[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: weaponList = ""]
[H, token(myID): myWeapons = getMatchingProperties("weapon\\..*")]
[h, foreach(wep,myWeapons,""), code :{
	[h: weaponList = listAppend(weaponList,wep)]
}]
[macro.return = weaponList]