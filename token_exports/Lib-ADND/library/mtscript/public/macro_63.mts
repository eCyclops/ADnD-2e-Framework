[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: tableName = getStrProp(arg(0),"tableName")]
[h: profs = getProperty(tableName,myID)]
[h: profList = json.toList(profs)]

[h: assert(!(json.isEmpty(profs)), "You have no "+tableName,0)]

[h: jsonSkill = json.get(profs,thisSkill)]
[h: profMod = json.get(jsonSkill,"baseModifier")]
[h: profSource = json.get(jsonSkill,"abilitySource")]
[h: abilityScore = getProperty(profSource,myID)]

[h: status=input(
	"junkvar|"+thisSkill+"|Proficiency| LABEL",
	"junkvar|"+profSource+" ("+abilityScore+")|Ability that is the source of this proficiency|LABEL",
	"junkvar|"+profMod+"|Base Modifier|LABEL",
	"mod|0|Situational Modifier",
	"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
	"overRide | 0 | Override d20 roll with 1-20 value"
)]
[h:abort(status)]

[h: rolledCheck = 1d20]
[h: finalCheck = rolledCheck]
[h,if(overRide>0 && overRide<=20):finalCheck=overRide;finalCheck = rolledCheck]

[h: sColor = ""]
[h: sResult = "BAZINGA"]

[h, if((finalCheck)<=(abilityScore+mod+profMod)), code : 
 {
	 [h: sColor = "#4CC417"]
	 [h: sResult = "SUCCESS!"]
 };
 {
	 [h: sColor = "#C11B17"]
	 [h: sResult = "FAILED!"]
 }]

[h:rollToolTip = toolTipIt(strformat("1d20, %{rolledCheck}=%{finalCheck}"),finalCheck)]
[h: target = abilityScore+mod+profMod]
[h:targetToolTip = toolTipIt(strformat("Ability Score + Proficiency Modifier + Modifier, %{abilityScore}+%{profMod}+%{mod}=%{target}"),target)]

[h,if(overRide > 0 && !isGM()):
	overRidedToolTip = toolTipIt( strformat("Dice roll overrode with %{overRide}") , "<font color=red>OVERRIDE</font>");
	overRidedToolTip = ""]

[h: byValue = absolutevalue((abilityScore+profMod+mod)-finalcheck)]
[h:byValueToolTip = toolTipIt(strformat("Failed/Succeeded by this much.<br>(Ability Score + Proficiency Modifier + Modifier) - Final Check, %{abilityScore}+%{profMod}+%{mod}-%{finalcheck}=%{byValue}"),byValue)]

[h: myName = getName(myID)]
[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]

[h: outTxt = ""]
[h: outTxt = concat(outTxt,strformat("<body bgcolor=%{sColor}>"))]
[h: outTxt = concat(outTxt,strformat("<table %{styleTxt} border=1 cellpadding=1><tr><td nowrap bgcolor=%{sColor}>"))]

[h: outTxt = concat(outTxt,strformat("<table border=1 cellpadding=1 width=100%><caption>Proficiency Check</caption>"))]
[h: outTxt = concat(outTxt,strformat("<tr><td><b>Name</b></td><td><b>Ability</b></td><td><b>Target</b></td><td><b>Roll</b></td><td><b>Result</b></td><td><b>By</b></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("<tr bgcolor=white><td>%{myName}</td><td>%{thisSkill}</td><td>%{targetToolTip} %{profSource} </td><td>%{overRidedToolTip}%{rollToolTip}</td><td>%{sResult}</td><td><b>%{byValueToolTip}</b></td></tr>"))]

[h: outTxt = concat(outTxt,strformat("</table>"))]
[h: outTxt = concat(outTxt,strformat("</td></tr></table>"))]

[r: showIt(outTxt,myID,"check", 1)]