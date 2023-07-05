[h: dSize = getStrProp(arg(0),"dSize",6)]
[h: dCount = getStrProp(arg(0),"dCount",1)]
[h: dModifier = getStrProp(arg(0),"dModifier",0)]
[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: nameToken = getName(myID)]
[h: namePlayer = getPlayerName(myID)]

[h: destinationList = "All,Self-DM,DM-Only")]

[h: status=input(
	strformat("dCount |%{dCount} | Dice Count|TEXT|WIDTH=5"), 
	strformat("dSize |%{dSize} | Dice Size|TEXT|WIDTH=5"), 
	strformat("dModifier |%{dModifier} | Modifier|TEXT|WIDTH=5"), 
	"seperator |<html><b>--- Where to Send Dice Roll ---</b></html>||LABEL|SPAN=TRUE",
	strformat("destinationTarget | %{destinationList} | Roll result target | RADIO | SELECT=0 ORIENT=V VALUE=STRING")
)]
[h:abort(status)]

[h: rollToolTip = strformat("<table border=1 cellpadding=1>")]
[h: completeRoll = 0]
[h: totalRoll = dModifier]
[h, for(i,1,dCount+1,1), code :{
		[h: thisDiceRoll = strformat("1d%{dSize}")]
		[h: thisRoll = eval(thisDiceRoll)]
		[h: totalRoll = totalRoll + thisRoll]
		[h: rollToolTip = concat(rollToolTip,strformat("<tr><td>#%{i}</td><td>%{thisDiceRoll}</td><td>=%{thisRoll}</td></tr>"))]
}]
[h: rollToolTip = concat(rollToolTip,strformat("<tr><td></td><td>Modifier</td><td>+%{dModifier}</td></tr>"))]
[h: rollToolTip = concat(rollToolTip,strformat("<tr><td></td><td><b>Total</b></td><td>%{totalRoll}</td></tr></table>"))]

[h, if (dModifier != 0): dModifierTXT = strformat(" + %{dModifier}"); dModifierTXT = '']

[h: rollDetails = strformat("<b>%{dCount}d%{dSize}%{dModifierTXT} = %{totalRoll}</b>")]

[h: completeRoll = toolTipIt(rollToolTip,rollDetails)]

[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]

[h: outTxt = ""]
[h: outTxt = concat(outTxt,strformat("%{nameToken} rolls: %{completeRoll}"))]


[h: sentOutput = 0]
[h, if(destinationTarget == "Self-DM"), code :{
	[broadcast(outTxt, getPlayerName())]
	[broadcast(outTxt, "gm")]
  [h: playerName = getPlayerName()]
  [broadcast(strformat("<b><font color=red>Roll sent to DM and %{playerName}.</font></b>"), getPlayerName())]
  [broadcast(strformat("<b><font color=red>Roll sent to DM and %{playerName}.</font></b>"), "gm")]
	[h: sentOutput = 1]
};{}]

[h, if(destinationTarget == "DM-Only"), code :{
	[broadcast(outTxt, "gm")]
	[broadcast(strformat("<b><font color=red>Roll sent to DM only.</font></b>"), getPlayerName())]
	[h: sentOutput = 1]
};{}]
[h, if(sentOutput == 0), code :{
	[broadcast(outTxt)]
};{}]
	
