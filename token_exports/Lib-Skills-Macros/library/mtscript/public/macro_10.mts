[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: tableName = "Skills"]
[h: dbProfs = getLibProperty(tableName,"Lib:Skills")]
[h: profNames = json.sort(json.fields(dbProfs, 'json'))]
[h: profNames = json.toList(profNames)]

[h: status=input(
	"thisSkill|"+profNames+"|Select Skill|LIST|SELECT=0 VALUE=STRING"
)]
[h:abort(status)]

[macro("editSkill@Lib:Skills:Macros"):strformat("myID=%{myID}; thisSkill=%{thisSkill};tableName=%{tableName};")]
[h: args = macro.return]

[h: args = strformat("%{args} myID=%{myID}; thisSkill=%{thisSkill};tableName=%{tableName};")]
[macro("addSkill@Lib:Skills:Macros"):args]