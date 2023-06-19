[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: tableName = "Skills"]
[h: skills = getProperty(tableName,myID)]
[h: skillsList = listSort(json.toList(skills),'A')]

[h: assert(!(json.isEmpty(skills)), "You have no "+tableName,0)]

[h: deleteThis = 0]
[if(getStrProp(arg(0),"thisSkill") == ''), code : {
	[h: status=input(
		"thisSkill|"+skillsList+"|Select Skill to edit|LIST|SELECT=0 VALUE=STRING",
		"deleteThis|0|Delete this?|CHECK"
	)]
	[h:abort(status)]
};{
	[h: thisSkill = getStrProp(arg(0),"thisSkill")]
}]

[h: args = strformat("myID=%{myID};thisSkill=%{thisSkill};tableName=%{tableName};")]
[if (deleteThis == 1), code : {
	[macro("deleteSkill@Lib:Skills:Macros"):args]
};
{
	[macro("editSkill@Lib:Skills:Macros"):args]
	[h: args2 = macro.return]
	
	[h: args2 = strformat("%{args} %{args2}")]
	[macro("addSkill@Lib:Skills:Macros"):args2]
}]