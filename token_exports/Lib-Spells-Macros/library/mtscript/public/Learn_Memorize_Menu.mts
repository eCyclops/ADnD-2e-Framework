[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: learnArcaneLink = macroLink("Learn Spells", "Learn_Menu@Lib:Spells:Macros","none",strformat("myID=%{myID};magicType=Arcane;vancianType=Known;"))]
[h: memorizeArcaneLink =  macroLink("Memorize Spells", "Learn_Menu@Lib:Spells:Macros","none",strformat("myID=%{myID};magicType=Arcane;vancianType=Memorized;"))]

[h: addSpellLink =  macroLink('<i>Add Spell to Library Inventory</i>(confer with DM first)','Add Spell To DB@Lib:Spells:Macros','none',strformat("myID=%{myID};"))]

[h: outTxt = '<table>']

[h: outTxt = concat(outTxt,strformat("<tr><td align=center>Index</td></tr>"))]

[h: outTxt = concat(outTxt,strformat("<tr><td><table border=0 width=100%><tr><td>%{learnArcaneLink}</td>"))]
[h: outTxt = concat(outTxt,strformat(                               "<td align=right>%{memorizeArcaneLink}</td></tr></table></td></tr>"))]

[h: outTxt = concat(outTxt,strformat("<tr><td>%{addSpellLink}</td></tr>"))]

[h: outTxt = concat(outTxt,strformat("</table>"))]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Spellbook</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>Spellbook</caption><br>"))]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</table></td></tr></table></body></html>"))]

[frame("Spellbook"):
{
	[r: preResultsTxt]

	[r: outTxt]
	
	[r: endResultsTxt]
}]
