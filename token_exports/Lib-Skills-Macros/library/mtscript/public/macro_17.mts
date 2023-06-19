[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: weaponType = getStrProp(arg(0),"weaponType")]
[h: weaponSource = getStrProp(arg(0),"weaponSource",thisSkill)]
[h: toDamage = getStrProp(arg(0),"toDamage",0)]
[h: toHit = getStrProp(arg(0),"toHit",0)]
[h: tableName = getStrProp(arg(0),"tableName")]

[h: storeThis = json.set("{}",
	"weaponSource",weaponSource,
	"weaponType",weaponType,
	"toHit",toHit,
	"toDamage",toDamage
)]

[h: currentProfs = getProperty(tableName,myID)]
[h, if(!json.isEmpty(currentProfs) && json.type(currentProfs) == "OBJECT"):testObj = json.get(currentProfs,thisSkill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"):isEdit = 1;isEdit = 0]

[h: setProperty(tableName,json.set(currentProfs,thisSkill,storeThis),myID)]

[h, if(isEdit == 1): updateTxt = "changed"; updateTxt = "added"]
[h: outTxt = getName(myID)+strformat(" %{updateTxt} weapon proficiency %{thisSkill}.<br>")]
[r: showIt(outTxt,myID,"default",0)]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Proficiencies;")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]
