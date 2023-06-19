[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: tableName = getStrProp(arg(0),"tableName")]

[h: dbProfs = getLibProperty(tableName,"Lib:Skills")]

[h: currentProfs = getProperty(tableName,myID)]
[h, if(!json.isEmpty(currentProfs) && json.type(currentProfs) == "OBJECT"):testObj = json.get(currentProfs,thisSkill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"), code :{
	[h: weaponType  = json.get(testObj,"weaponType")]
	[h: weaponSource  = json.get(testObj,"weaponSource")]
	[h: toHit  = json.get(testObj,"toHit")]
	[h: toDamage  = json.get(testObj,"toDamage")]
};{
	[h: weaponType = json.get(json.get(dbProfs,thisSkill),"weaponType")]
	[h: weaponSource = thisSkill]
	[h: toHit  = 0]
	[h: toDamage  = 0]
}]

[h: status=input(
	"junkvar|"+weaponSource+"|Weapon Source| LABEL",
	"thisSkill|"+thisSkill+"|Weapon proficiency name",
	"toHit|"+toHit+"|To hit modifier for this proficiency",
	"toDamage|"+toDamage+"|To damage modifier for this proficiency"
)]
[h:abort(status)]

[h: macro.return = 
	"thisSkill="+thisSkill+";"+
	"tableName="+tableName+";"+
	"weaponType="+weaponType+";"+
	"weaponSource="+weaponSource+";"+
	"toDamage="+toDamage+";"+
	"toHit="+toHit+";"+
	]