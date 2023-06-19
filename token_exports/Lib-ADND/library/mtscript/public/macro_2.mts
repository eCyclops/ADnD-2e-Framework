[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(THACO). "+getMacroName()+"@"+getMacroLocation())]

[H: thisTHACO = arg(0) ]

[h: acTR = "<tr><th><b>AC</b></th>"]
[h: diceTR = "<tr><th><b>Roll</b></th>"]

[h, count(21,""), code :{
	[h: armorClass = (roll.count - 10)]
	[h: dice = (thisTHACO - armorClass)]
	[h,if(dice == thisTHACO):acTR = acTR + strformat("<th bgcolor=red> <b>%{armorClass}</b></th>") ; acTR = acTR + strformat("<td align=center bgcolor=#EEEEAA>%{armorClass}</td>")]
	[h,if(dice == thisTHACO):diceTR = diceTR + strformat("<th align=center bgcolor=red><b>%{dice}<b></th>") ; diceTR = diceTR + strformat("<td align=center bgcolor=yellow>%{dice}</td>")]
}]

[h: txtOut = strformat("<table width=100% border=1 cellpadding=0 cellspacing=0>%{diceTR}</tr>%{acTR}</tr></table>")]

[h: macro.return = txtOut]