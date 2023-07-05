[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: status=input(
	"ExpGiven|0|Experience given"
)]
[h:abort(status)]

<table border="0"><tr bgcolor="#000000"><table width="100%"><tr><td style="padding:0px 5px;">
<span style="color:white"><b>
EXP: {XP}/{XPNeeded}
</b></font></td><td style="padding:0px 5px;" align=right><span style="color:white">
EXP Reward: {ExpValue = ExpGiven}
</font></td></tr></table></tr><tr><td>
<b>Current EXP:</b>{XP = XP + ExpValue}/{XPNeeded}
</td></tr></table>
{If(XP >= XPNeeded , "<b>Level up!!!</b>", " ")}
