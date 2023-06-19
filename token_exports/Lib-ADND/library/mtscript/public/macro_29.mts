[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: sName = getStrProp(arg(0), "Name")]
[h: abilityScore = getStrProp(arg(0), "Value")]
[h: overRide = getStrProp(arg(0), "OverRide")]
[h: mod = getStrProp(arg(0), "Mod")]
[if (mod == ""), code : {
	[h: status=input(
		"junkvar|"+sName+"("+abilityScore+")|Ability to Test| LABEL",
		"mod|0|Check Modifier"
	)]
	[h:abort(status)]
};{
}]


[h: rolledCheck = 1d20]
[h: finalCheck = rolledCheck]
[h,if(overRide>0 && overRide<=20):finalCheck=overRide;finalCheck = rolledCheck]

[h: sColor = ""]
[h: sResult = "BAZINGA"]

[h, if((finalCheck)<=(abilityScore+mod)), code : 
 {
 [h: sColor = "#4CC417"]
 [h: sResult = "SUCCESS!"]
 };
 {
 [h: sColor = "#C11B17"]
 [h: sResult = "FAILED!"]
 }]


[h:rollToolTip = toolTipIt(strformat("1d20, %{rolledCheck}=%{finalCheck}"),finalCheck)]
[h: target = abilityScore+mod]
[h:targetToolTip = toolTipIt(strformat("Ability Score + Modifier, %{abilityScore}+%{mod}=%{target}"),target)]

[h,if(overRide > 0 && !isGM()):
	overRidedToolTip = toolTipIt( strformat("Dice roll overrode with %{overRide}") , "<font color=red>OVERRIDE</font>");
	overRidedToolTip = ""]

[h: byValue = absolutevalue(target-finalcheck)]
[h:byValueToolTip = toolTipIt(strformat("Failed/Succeeded by this much.<br>Target - Final Check, %{target}-%{finalcheck}=%{byValue}"),byValue)]
[h: myName = getName(myID)]
[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]

[h: outTxt = ""]
[h: outTxt = concat(outTxt,strformat("<body bgcolor=%{sColor}>"))]
[h: outTxt = concat(outTxt,strformat("<table %{styleTxt} border=1 cellpadding=1><tr><td nowrap bgcolor=%{sColor}>"))]

[h: outTxt = concat(outTxt,strformat("<table border=1 cellpadding=1 width=100%><caption>Ability Check</caption>"))]
[h: outTxt = concat(outTxt,strformat("<tr><td><b>Name</b></td><td><b>Ability</b></td><td><b>Target</b></td><td><b>Roll</b></td><td><b>Result</b></td><td><b>By</b></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("<tr bgcolor=white><td>%{myName}</td><td>%{sName}</td><td>%{targetToolTip}</td><td>%{overRidedToolTip}%{rollToolTip}</td><td>%{sResult}</td><td><b>%{byValueToolTip}</b></td></tr>"))]

[h: outTxt = concat(outTxt,strformat("</table>"))]
[h: outTxt = concat(outTxt,strformat("</td></tr></table>"))]

[r: showIt(outTxt,myID,"check", 1)]
