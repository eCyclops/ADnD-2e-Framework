[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: weaponID = getStrProp(arg(0),"weaponID")]
[h: tag = "weapon."+weaponID]
[h: name = getStrProp(getProperty(tag,myID),"name","unknown")]

[h: setProperty(tag,"",myID)]

[h: outTxt = getName(myID)+strformat(" removed equipped weapon, %{name}.<br>")]
[r: showIt(outTxt,myID,"default",0)]

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
