[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: weaponID = getStrProp(arg(0),"weaponID")]
[h: weaponSource = getStrProp(arg(0),"weaponSource")]
[h: ammoSource = getStrProp(arg(0),"ammoSource")]
[h: name = getStrProp(arg(0),"name")]
[h: speed = getStrProp(arg(0),"speed")]
[h: toHit = getStrProp(arg(0),"toHit")]
[h: toDamage = getStrProp(arg(0),"toDamage")]
[h: damageSmall = getStrProp(arg(0),"damageSmall")]
[h: damageMedium = getStrProp(arg(0),"damageMedium")]
[h: damageLarge = getStrProp(arg(0),"damageLarge")]
[h: weaponProf = getStrProp(arg(0),"weaponProf")]
[h: strHit = getStrProp(arg(0),"strHit")]
[h: strDamage = getStrProp(arg(0),"strDamage")]
[h: dexHit = getStrProp(arg(0),"dexHit")]


[h: tag = "weapon."+weaponID]

[h: setProperty(tag,arg(0), myID)]


[h: outTxt = getName(myID)+strformat(" updated equipped weapon, %{name}. <br>")]
[r: showIt(outTxt,myID,"gm-self",0)]


[if(isFrameVisible("PC_Attack")), code :{
	[macro("PC_Attack@Lib:ADND"):strformat("myID=%{myID};")]
};{}]


[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Combat;")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]

