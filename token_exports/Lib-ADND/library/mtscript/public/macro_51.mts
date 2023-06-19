[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: tableName = "Skills"]
[h: skills = getProperty(tableName,myID)]
[h: skillsList = json.toList(skills)]

[h: assert(!(json.isEmpty(skills)), "You have no "+tableName,0)]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[if(thisSkill == ''), code : {
	[h: status=input(
		"thisSkill|"+skillsList+"|Select Skill to use|LIST|SELECT=0 VALUE=STRING"
	)]
	[h:abort(status)]
};{}]

[h: args = strformat("myID=%{myID};thisSkill=%{thisSkill}; tableName=%{tableName};")]
[r: DO_Skill_Check(args)]
