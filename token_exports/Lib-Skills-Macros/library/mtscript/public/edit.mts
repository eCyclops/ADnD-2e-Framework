[h: tableName = getStrProp(arg(0),"tableName")]
[h: skill = getStrProp(arg(0),"name")]

[h: currentSkills = getLibProperty(tableName,"Lib:Skills")]

[h: attrib = "Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma"]
[h: typeOfWeapons = "Blugeoning, Slashing, Piercing, Ranged, Other"]

[h: attribLoc = 0]
[h: abilitySource='Strength']
[h: baseModifier=0]
[h: weaponType='Slashing']
[h: name = 'Unknown']

[h, if(!json.isEmpty(currentSkills) && json.type(currentSkills) == "OBJECT"):testObj = json.get(currentSkills,skill);testObj = '']

[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT" && tableName == 'Profs'), code :{
	[h: abilitySource = json.get(testObj,"abilitySource")]
	[h: baseModifier = json.get(testObj,"baseModifier")]
	[h,if(listContains(attrib,abilitySource)):attribLoc = listFind(attrib,abilitySource);attribLoc = 0]
};{
	[h: abilitySource = 'Strength')]
	[h: baseModifier = 0)]
}]

[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT" && tableName == 'Skills'), code :{
	[h: name = json.get(testObj,"name")]
};{
	[h: name = 'Unknown')]
}]

[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT" && tableName == 'Profs_Combat'), code :{
	[h: weaponType = json.get(testObj,"weaponType")]
	[h,if(listContains(typeOfWeapons,weaponType)):attribLoc = listFind(typeOfWeapons,weaponType);attribLoc = 0]
};{
	[h: weaponType = 'Slashing')]
}]

<!-- ask for ability source-->
[if(tableName == 'Profs'), code :{
[h: status=input(
	"skill|"+skill+"|Name of proficiency",
	"abilitySource|"+attrib+"|Ability that is the source of this proficiency|LIST|SELECT="+attribLoc+" VALUE=STRING",
	"baseModifier|"+baseModifier+"|Base modifier for this proficiency",

	"seperator|<html><b>--- REMOVE? ---</b></html>||LABEL|SPAN=TRUE",
	"deleteThis| 0 |Delete this entry?|CHECK"

)]
[h:abort(status)]
};{}]

<!-- ask for skill-->
[if(tableName == 'Skills'), code :{
[h: status=input(
	"skill|"+skill+"|Name of skill",

	"seperator|<html><b>--- REMOVE? ---</b></html>||LABEL|SPAN=TRUE",
	"deleteThis| 0 |Delete this entry?|CHECK"

)]
[h:abort(status)]
};{}]

<!-- ask for language-->
[if(tableName == 'Languages'), code :{
[h: status=input(
	"language|"+language+"|Name of language",

	"seperator|<html><b>--- REMOVE? ---</b></html>||LABEL|SPAN=TRUE",
	"deleteThis| 0 |Delete this entry?|CHECK"

)]
[h:abort(status)]
};{}]

<!-- ask for weapon prof-->
[if(tableName == 'Profs_Combat'), code :{
[h: status=input(
	"skill|"+skill+"|Name of weapon proficiency",
	"weaponType |"+typeOfWeapons+"|Type of weapon | LIST | SELECT="+attribLoc+" VALUE=STRING",

	"seperator|<html><b>--- REMOVE? ---</b></html>||LABEL|SPAN=TRUE",
	"deleteThis| 0 |Delete this entry?|CHECK"

)]
[h:abort(status)]
};{}]

[if(deleteThis == 1), code : {
	[macro("delete@Lib:Skills:Macros"):"name="+skill+";"+"tableName="+tableName+";"]
};{
	[h: skill = lower(skill)]
	[h: skill = replace(skill,",",'')]
	[macro("add@Lib:Skills:Macros"):"name="+skill+";"+"tableName="+tableName+";"+"abilitySource="+abilitySource+";"+"baseModifier="+baseModifier+";"+"weaponType="+weaponType+";"+]
}]