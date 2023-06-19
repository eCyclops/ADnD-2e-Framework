[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: tableName = "Profs"]
[h: profs = getProperty(tableName,myID)]
[h: profList = json.toList(profs)]

[h: assert(!(json.isEmpty(profs)), "You have no "+tableName,0)]

[if(getStrProp(arg(0),"thisSkill") == ''), code : {
	[h: status=input(
		"thisSkill|"+profList+"|Select Proficiency to Use|LIST|SELECT=0 VALUE=STRING"
	)]
	[h:abort(status)]
};{
	[h: thisSkill = getStrProp(arg(0),"thisSkill")]
}]

[h: args = strformat("myID=%{myID};thisSkill=%{thisSkill};tableName=%{tableName};")]
[r: DO_Prof_Check(args)]
