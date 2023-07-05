[h: currrentSelections = getSelected()]
[h: deselectTokens()]

[h:status = input(
	"HealingTaken|0|Enter healing received."
)]
[H: abort(status)]

[foreach(id, currrentSelections, ""), code :
{
[h: switchToken(id)]

<table border="0"><tr bgcolor="#4CC417"><table width="100%"><tr><td style="padding:0px 5px;">
<span style="color:white"><b>
[H:HealingValue = HealingTaken]
Hp: {HP}/{MaxHP}
</b></font></td><td style="padding:0px 5px;" align=right><span style="color:white">
Takes {HealingValue}  points of healing!
[h: HP = HP + HealingValue]
[h:Current=HP]
[H:Overhealed= If(Hp>MaxHP, Hp-MaxHP, 0)]
[h:HP= If(Hp > MaxHP, MaxHP, Current)]
[H:bar.Health=HP/MaxHP]
</font></td></tr></table></tr><tr><td>
<b>Current Hp: </b>{Hp}/{MaxHP} {if(Overhealed > 0 , "<td style=align=right><i> Over Healed </i>" + Overhealed + " Hp", " ")}
</td></tr></table>

<!-- remove states if > 0 -->
[if(HP > 0), code: {
	[h: setState("Dying", 0)]
	[h: setState("Dead", 0)]
	[h: setState("NPCDead", 0)]
}]

<!-- end of foreach -->
}]


[h: selectTokens(currrentSelections,0,",")]
