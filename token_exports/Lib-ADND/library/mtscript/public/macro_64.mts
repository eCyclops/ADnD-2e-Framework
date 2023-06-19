[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: thisSkill = getStrProp(arg(0),"thisSkill")]
[h: tableName = getStrProp(arg(0),"tableName")]
[h: skills = getProperty(tableName,myID)]
[h: skillsList = json.toList(skills)]

[h: assert(!(json.isEmpty(skills)), "You have no "+tableName,0)]

[h: jsonSkill = json.get(skills,thisSkill)]

[broadcast("CHANCE: " + skills)]
[h: baseChance=json.get(jsonSkill,"baseChance")]
[h: armorModifier=json.get(jsonSkill,"armorMod")]
[h: racialModifier=json.get(jsonSkill,"racialMod")]
[h: dexModifier=json.get(jsonSkill,"dexMod")]
[h: otherModifier=json.get(jsonSkill,"otherMod")]
[h: targetChance=baseChance+armorModifier+racialModifier+dexModifier+otherModifier]

[h: status=input(
	"junkvar|"+thisSkill+"|Skill| LABEL",
	"junkvar|"+targetChance+"%|Chance|LABEL",
	"mod|0|Situational Modifier",
	"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
	"overRide | 0 | Override d100 roll with 1-100 value"
)]
[h:abort(status)]

[h: targetChance = targetChance + mod]
[h: rolledCheck = 1d100]
[h: finalCheck = rolledCheck]
[h,if(overRide>0 && overRide<=100):finalCheck=overRide;finalCheck = rolledCheck]

[h: sColor = ""]
[h: sResult = "BAZINGA"]

[h, if(finalCheck<=targetChance), code : 
 {
	 [h: sColor = "#4CC417"]
	 [h: sResult = "SUCCESS!"]
 };
 {
	 [h: sColor = "#C11B17"]
	 [h: sResult = "FAILED!"]
 }]

[h:rollToolTip = toolTipIt(strformat("1d100 + Modifiers, %{rolledCheck}=%{finalCheck}"),finalCheck)]

[h: target = targetChance]
[h:targetToolTip = toolTipIt(strformat("At OR Below Target Value.<br> Base Chance + Armor Modifier + Racial Modifier + Dex Modifier + Other Modifier + Situational Modifier = Target Value. <br>%{baseChance}+%{armorModifier}+%{racialModifier}+%{dexModifier}+%{otherModifier}+%{mod}=%{targetChance}"),targetChance)]

[h,if(overRide > 0 && !isGM()):
	overRidedToolTip = toolTipIt( strformat("Dice roll overrode with %{overRide}") , "<font color=red>OVERRIDE</font>");
	overRidedToolTip = ""]

[h: myName = getName(myID)]
[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]

[h: outTxt = ""]
[h: outTxt = concat(outTxt,strformat("<body bgcolor=%{sColor}>"))]
[h: outTxt = concat(outTxt,strformat("<table %{styleTxt} border=1 cellpadding=1><tr><td nowrap bgcolor=%{sColor}>"))]

[h: outTxt = concat(outTxt,strformat("<table border=1 cellpadding=1 width=100%><caption>Skill Check</caption>"))]
[h: outTxt = concat(outTxt,strformat("<tr><td><b>Name</b></td><td><b>Skill</b></td><td><b>Target</b></td><td><b>Roll</b></td><td><b>Result</b></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("<tr bgcolor=white><td>%{myName}</td><td>%{thisSkill}</td><td>%{targetToolTip}</td><td>%{overRidedToolTip}%{rollToolTip}</td><td>%{sResult}</td></tr>"))]

[h: outTxt = concat(outTxt,strformat("</table>"))]
[h: outTxt = concat(outTxt,strformat("</td></tr></table>"))]

[r: showIt(outTxt,myID,"check", 1)]