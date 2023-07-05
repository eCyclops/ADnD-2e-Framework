[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: tableName = "Profs"]
[h: profs = getProperty(tableName,myID)]
[h: profList = listSort(json.toList(profs),'A')]

[h: assert(!(json.isEmpty(profs)), "You have no "+tableName,0)]

[h: deleteThis = 0]
[if(getStrProp(arg(0),"thisSkill") == ''), code : {
	[h: status=input(
		"thisSkill|"+profList+"|Select Proficiency to Edit|LIST|SELECT=0 VALUE=STRING",
		"deleteThis|0|Delete this?|CHECK"
	)]
	[h:abort(status)]
};{
	[h: thisSkill = getStrProp(arg(0),"thisSkill")]
}]

[if (deleteThis == 1), code : {
	[h: args = strformat("myID=%{myID};thisSkill=%{thisSkill};tableName=%{tableName};")]
	[h, macro("deleteProf@Lib:Skills:Macros"):args]
};
{
	[h: args1 = strformat("myID=%{myID};thisSkill=%{thisSkill};tableName=%{tableName};")]
	[macro("editProf@Lib:Skills:Macros"):args1]
	[h: args = macro.return]

	[h: args = strformat("%{args} %{args1}")]
	[h, macro("addProf@Lib:Skills:Macros"):args]
}]