[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: cfgSettings = getLibProperty('CFGSettings', 'Lib:ADND')]
[h: privateMode = getStrProp(cfgSettings,'privatemode','1')]

[h: status=input(
	"sName|Strength,Dexterity,Intelligence,Constitution,Wisdom,Charisma|Select Ability Based on|LIST|SELECT=0 VALUE=STRING",
	"abilityScore|10|Ability Score Value",
	"mod|0|Check Modifier",
	"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
	"overRided20 | 0 | Override d20 roll with 1-20 value"
)]
[h:abort(status)]

[h: args = strformat("myID=%{myID}; Name=%{sName}; Value=%{abilityScore}; Mod=%{mod}; OverRide=%{overRided20};")]
[r: DO_AbilityCheck(args)]
