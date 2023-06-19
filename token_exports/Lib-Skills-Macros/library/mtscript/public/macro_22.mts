[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: tableName = getStrProp(arg(0),"tableName")]

[h: currentSkills = getProperty(tableName,myID)]
[h, if(!json.isEmpty(currentSkills) && json.type(currentSkills) == "OBJECT"):testObj = json.get(currentSkills,thisSkill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"), code :{
	[h: baseChance = json.get(testObj,"baseChance")]
	[h: armorMod = json.get(testObj,"armorMod")]
	[h: racialMod = json.get(testObj,"racialMod")]
	[h: dexMod = json.get(testObj,"dexMod")]
	[h: otherMod = json.get(testObj,"otherMod")]
};{
	[h: baseChance = 5)]
	[h: armorMod = 0)]
	[h: racialMod = 0)]
	[h: dexMod = 0)]
	[h: otherMod = 0)]
}]

[h: status=input(
	"junkvar|"+thisSkill+"|Choice| LABEL",
	"baseChance|"+baseChance+"|Base percentage chance for this skill",
	
	"seperator|<html><b>--- Modifiers ---</b></html>||LABEL|SPAN=TRUE",
	"armorMod |"+armorMod+"| Modifier applied due to armor",
	"racialMod |"+racialMod+"| Modifier applied due to race",
	"dexMod |"+dexMod+"| Modifier applied due to dexterity score",
	"otherMod |"+otherMod+"| Modifier applied due to other reasons"
)]
[h:abort(status)]

[h: macro.return = "thisSkill="+thisSkill+";"+"baseChance="+baseChance+";"+"armorMod="+armorMod+";"+"racialMod="+racialMod+";"+"dexMod="+dexMod+";"+"otherMod="+otherMod+";"]