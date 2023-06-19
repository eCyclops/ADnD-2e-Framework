[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: tableName = getStrProp(arg(0),"tableName")]

[h: attrib = "Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma"]
[h: dbProfs = getLibProperty(tableName,"Lib:Skills")]

[h: currentProfs = getProperty(tableName,myID)]
[h, if(!json.isEmpty(currentProfs) && json.type(currentProfs) == "OBJECT"):testObj = json.get(currentProfs,thisSkill);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"), code :{
	[h: abilitySource = json.get(testObj,"abilitySource")]
	[h: baseModifier = json.get(testObj,"baseModifier")]
};{
	[h: abilitySource = json.get(json.get(dbProfs,thisSkill),"abilitySource")]
	[h: baseModifier = json.get(json.get(dbProfs,thisSkill),"baseModifier")]
}]

[h,if(listContains(attrib,abilitySource)):attribLoc = listFind(attrib,abilitySource);attribLoc = 0]

[h: status=input(
	"junkvar|"+thisSkill+"|Choice| LABEL",
	"abilitySource|"+attrib+"|Ability that is the source of this proficiency|LIST|SELECT="+attribLoc+" VALUE=STRING",
	"baseModifier|"+baseModifier+"|Base modifier for this proficiency"
)]
[h:abort(status)]

[h: macro.return = "abilitySource="+abilitySource+";"+"baseModifier="+baseModifier+";"+]