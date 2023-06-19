[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: styleTxt = getLibProperty("styleTxt_NoColor", "Lib:ADND")]

[h: combatActions = getLibProperty("CombatActions","Lib:ADND")]
[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: initSize = getStrProp(cfgSettings,"initiativedice","1")]
[h: initDice = "1d"+initSize]

[h: sInitiativeAction = getStrProp(arg(0),"initiativeAction","")]
[h: initiativeModifier = getStrProp(arg(0),"initiativeModifier",0)]
[h: initiativeAutoRoll = getStrProp(arg(0),"initiativeAutoRoll",0)]

[h, if(sInitiativeAction != ''):
	initActionInput = strformat("junkvar | %{sInitiativeAction} | Initiative Action | LABEL");
	initActionInput = strformat("sInitiativeAction | %{combatActions} | What type of action this round?|LIST|SELECT=0 VALUE=STRING")]

[h, if(initiativeAutoRoll == 0), code: {
	[h: status=input(
		initActionInput,
		strformat("initiativeModifier| %{initiativeModifier} | Initiative Modifier"),
		"seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
		strformat("overRided | 0 | Override d%{initSize} roll with static value 1-%{initSize}")
	)]
	[h:abort(status)]
};{
	[h: overRided = getStrProp(arg(0),"initiativeOverride",0)]
}]


[h: myName = getName(myID)]

[h: initDiceString = strformat("1d%{initSize}")]
[h: initRoll = eval("1d"+initSize)]
[h: rptoolsInit =initSize+1]
[h,if(overRided > 0 && overRided <= initSize): initRoll = overRided]
[h,if(overRided > 0 && !isGM()):
	overRidedToolTip = toolTipIt( strformat("Dice roll overridden with %{overRided}") , "<font color=red>OVERRIDE</font> ");
	overRidedToolTip = ""]

[h: finalInitRoll = (initRoll+initiativeModifier)]

[H, token(myID): addTest = addToInitiative(0,-finalInitRoll)]
[h: sortInitiative()]

[h:initRollToolTip = toolTipIt(strformat("%{initDiceString} + Modifiers, %{initRoll}+%{initiativeModifier}=%{finalInitRoll}"),"<b>Initiative:</b> " + finalInitRoll)]

[h,if (isPC(myID)):sColor = "#F0A804";sColor="#C0C0C0"]

[h: setProperty("ActionType",strformat("%{sInitiativeAction} (Roll %{initRoll}, Final %{finalInitRoll})"),myID)]

[h: outTxt = strformat("
<table %{styleTxt} bgcolor=black cellpadding=2 cellspacing=2 width=100%>
  <tr>
    <td nowrap bgcolor=%{sColor} colspan=2 align=center>Initiative rolled for <b>%{myName}</td>
  </tr>
  <tr>
    <td bgcolor=white><b>Action:</b> <i>%{sInitiativeAction}</i></td>
    <td bgcolor=white width=15% align=center>%{overRidedToolTip}%{initRollToolTip}</td>
  </tr>
</table>")]

[r: showIt(outTxt,myID,"initiative",0)]