[h: magicType = getStrProp(arg(0),"magicType")]
[h: spellName = getStrProp(arg(0),"Name")]

[h: spellJSON = getSpellJSON(magicType,spellName)]

[h: assert(!json.isEmpty(spellJSON),strformat("%{spellName} in %{magicType} is missing.")+getMacroName()+"@"+getMacroLocation() ) ]

[h: level = decode(json.get(spellJSON,"level"))]
[h: school = decode(json.get(spellJSON,"school"))]
[h: range = decode(json.get(spellJSON,"range"))]
[h: duration = decode(json.get(spellJSON,"duration"))]
[h: aoe = decode(json.get(spellJSON,"aoe"))]
[h: casttime = decode(json.get(spellJSON,"casttime"))]
[h: save = decode(json.get(spellJSON,"save"))]
[h: verbal = json.get(spellJSON,"verbal")]
[h: somatic = json.get(spellJSON,"somatic")]
[h: material = json.get(spellJSON,"material")]
[h: reversible = json.get(spellJSON,"reversible")]
[h: sphere = json.get(spellJSON,"sphere")]

[h: description = json.get(spellJSON,"description")]

[h: description = replace(description,'%0A','<br>')]
[h: description = replace(description,'%22',"'")]
[h: description = decode(description)]

[h: tipTxt = ""]

[h: tipTxt = concat(tipTxt,strformat('<body bgcolor=white>Level %{level}<br>'))]
[h, if(reversible==1): reversibleTxt = "(reversible)"; reversibleTxt = ""]
[h: tipTxt = concat(tipTxt,strformat('<strong><font color=red>%{spellName}</font></strong>%{reversibleTxt}<br>'))]
[h: tipTxt = concat(tipTxt,strformat('<font color=red>(<em>school %{school}</em>)</font><br>'))]
[h,if (magicType == 'Divine'): tipTxt = concat(tipTxt,strformat('<font color=red>(<em>sphere %{sphere}</em>)</font><br>'))]
[h: tipTxt = concat(tipTxt,strformat('<table width=100% height=100% bgcolor=white border=0 cellpadding=1 cellspacing=1>'))]
[h: tipTxt = concat(tipTxt,strformat('<tbody><tr><td  valign=top><b>Range:</b> %{range}</td>'))]

[h, if(verbal ==1): vsmTxt = "V " ; vsmTxt = '']
[h, if(somatic ==1):vsmTxt = concat(vsmTxt,"S ")]
[h, if(material ==1):vsmTxt = concat(vsmTxt,"M ")]
[h: tipTxt = concat(tipTxt,strformat('<td valign=top><b>Components</b>: %{vsmTxt}<br></td></tr>'))]
[h: tipTxt = concat(tipTxt,strformat('<tr><td valign=top><b>Duration:</b> %{duration}<br></td>'))]
[h: tipTxt = concat(tipTxt,strformat('<td valign=top><b>Casting Time:</b> %{casttime}<br></td></tr>'))]
[h: tipTxt = concat(tipTxt,strformat('<tr><td valign=top><b>Area of Effect:</b> %{aoe}<br></td>'))]
[h: tipTxt = concat(tipTxt,strformat('<td valign=top><b>Saving Throw:</b> %{save}<br></td></tr>'))]

[h: tipTxt = concat(tipTxt,strformat('</tbody></table><br>'))]

[h: tipTxt = concat(tipTxt,strformat('<pre>%{description}</pre>'))]

[h: macro.return = tipTxt]
