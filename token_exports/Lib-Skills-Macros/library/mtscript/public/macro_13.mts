[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: tableName = "Profs_Combat"]
[h: myWeaponProfs = getProperty(tableName,myID)]
[h: profList = listSort(json.toList(myWeaponProfs),'A')]

[h: assert(!(json.isEmpty(myWeaponProfs)), "You have no weapon proficiencies.",0)]

[h: deleteThis = 0]
[h: attribLoc = 0]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h,if(thisSkill != ''), code : {
	[h,if(listContains(profList,thisSkill)):attribLoc = listFind(profList,thisSkill);attribLoc = 0]
}]

[h: status=input(
	"thisSkill|"+profList+"|Select Weapon Proficiency to Edit|LIST|SELECT="+attribLoc+" VALUE=STRING",
	"deleteThis|0|Delete this?|CHECK"
)]
[h:abort(status)]

[h: args = strformat("myID=%{myID};thisSkill=%{thisSkill};tableName=%{tableName};")]
[if (deleteThis == 1), code : {
	[h, macro("deleteWeapon@Lib:Skills:Macros"):args]
};
{
	[h, macro("editWeapon@Lib:Skills:Macros"):args]
	[h: args2 = macro.return]
	
	[h: args2 = strformat("myID=%{myID}; %{args2}")]
	[h, macro("addWeapon@Lib:Skills:Macros"):args2]
}]