[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: tableName = getStrProp(arg(0),"tableName")]

[h: baseChance = getStrProp(arg(0),"baseChance")]

[h: armorMod = getStrProp(arg(0),"armorMod")]
[h: racialMod = getStrProp(arg(0),"racialMod")]
[h: dexMod = getStrProp(arg(0),"dexMod")]
[h: otherMod = getStrProp(arg(0),"otherMod")]

[h: storeThis = json.set("{}",
	"baseChance",baseChance,
	"armorMod",armorMod,
	"racialMod",racialMod,
	"dexMod",dexMod,
	"otherMod",otherMod
)]

[h: currentSkills = getProperty(tableName,myID)]
[h, if(!json.isEmpty(currentSkills) && json.type(currentSkills) == "OBJECT"):testObj = json.get(currentSkills,thisSkill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"):isEdit = 1;isEdit = 0]

[h: setProperty(tableName,json.set(currentSkills,thisSkill,storeThis),myID)]

[h, if(isEdit == 1): updateTxt = "changed"; updateTxt = "added"]
[h: outTxt = getName(myID)+strformat(" %{updateTxt} skill %{thisSkill}.<br>")]
[r: showIt(outTxt,myID,"default",0)]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Proficiencies;")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]
