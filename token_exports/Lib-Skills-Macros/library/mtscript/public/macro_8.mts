[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: tableName = "Profs"]
[h: dbProfs = getLibProperty(tableName,"Lib:Skills")]
[h: profNames = json.sort(json.fields(dbProfs, 'json'))]
[h: profNames = json.toList(profNames)]

[h: status=input(
	"junkvar|Adding Proficiency|Option| LABEL",
	"thisSkill|"+profNames+"|Select Proficiency|LIST|SELECT=0 VALUE=STRING"
)]
[h:abort(status)]

[h: args = strformat("myID=%{myID}; thisSkill=%{thisSkill} ;tableName=%{tableName};")]
[h, macro("editProf@Lib:Skills:Macros"):args]
[h: args2 = macro.return]

[h: args2 = strformat("%{args} %{args2}")]
[h, macro("addProf@Lib:Skills:Macros"):args2]