[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: abilitySource = getStrProp(arg(0),"abilitySource")]
[h: baseModifier = getStrProp(arg(0),"baseModifier")]
[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: profSource = getStrProp(arg(0),"profSource",thisSkill)]
[h: tableName = getStrProp(arg(0),"tableName")]

[h: storeThis = json.set("{}",
	"profSource",profSource,
	"abilitySource",abilitySource,
	"baseModifier",baseModifier
)]

[h: currentProfs = getProperty(tableName,myID)]
[h, if(!json.isEmpty(currentProfs) && json.type(currentProfs) == "OBJECT"):testObj = json.get(currentProfs,thisSkill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"):isEdit = 1;isEdit = 0]

[h: setProperty(tableName,json.set(currentProfs,thisSkill,storeThis),myID)]

[h, if(isEdit == 1): updateTxt = "changed"; updateTxt = "added"]
[h: outTxt = getName(myID)+strformat(" %{updateTxt} proficiency %{thisSkill}.<br>")]
[r: showIt(outTxt,myID,"default",0)]

[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=Proficiencies;")]
};{}]


[h: npcSheetFrame = strformat('NPC:'+getName(myID)+':%{myID}')]
[h, if(isFrameVisible(npcSheetFrame)): 
	NPC_Sheet(strformat("myID=%{myID};"))]
