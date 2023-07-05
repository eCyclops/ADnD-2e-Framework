[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[if (getStrProp(macro.args, "Name") != "" && getStrProp(macro.args, "Value")), code : {
	[h: sName = getStrProp(macro.args, "Name")]
	[h: abilityScore = getStrProp(macro.args, "Value")]

	[h: status=input(
		"junkvar|"+sName+"("+abilityScore+")|Ability to Test| LABEL",
		"mod|0|Check Modifier",
		"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
		"overRided20 | 0 | Override d20 roll with 1-20 value"
	)]
	[h:abort(status)]

};{
	[h: status=input(
		"sName|Strength,Dexterity,Intelligence,Constitution,Wisdom,Charisma|Select Ability Based on|LIST|SELECT=0 VALUE=STRING",
		"mod|0|Check Modifier",
		"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
		"overRided20 | 0 | Override d20 roll with 1-20 value"
	)]
	[h:abort(status)]
	
	[h: abilityScore = getProperty(sName,myID)]
}]

[h: args = strformat("myID=%{myID}; Name=%{sName}; Value=%{abilityScore}; Mod=%{mod}; OverRide=%{overRided20};")]
[r: DO_AbilityCheck(args)]
