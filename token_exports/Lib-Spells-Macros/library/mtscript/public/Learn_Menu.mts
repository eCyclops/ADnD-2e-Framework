[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<!-- menu with list memorized/known spells  -->
[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: viewLevelSpell  = getStrProp(arg(0), "viewLevelSpell",1)]
[h: showAll = getStrProp(arg(0), "showAll", "false")]

[h: tagProp = add(magicType,"_"+vancianType)]
[h: my_spells = getProperty(tagProp,myID)]

[h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType}; viewLevelSpell=%{viewLevelSpell}; showAll=%{showAll}")]

[h: indexLink = macroLink("Index", "Learn_Memorize_Menu@Lib:Spells:Macros","none",strformat("myID=%{myID};"))]
[h: learnArcaneLink = macroLink("Switch to Arcane", "Learn_Menu@Lib:Spells:Macros","none",strformat("myID=%{myID}; magicType=Arcane;vancianType=%{vancianType}; viewLevelSpell=%{viewLevelSpell};"))]
[h: learnDivineLink = macroLink("Switch to Divine", "Learn_Menu@Lib:Spells:Macros","none",strformat("myID=%{myID}; magicType=Divine;vancianType=%{vancianType}; viewLevelSpell=%{viewLevelSpell};"))]

[h, if(magicType == 'Arcane'):learnArcaneLink = "<b>Arcane</b>" ; learnDivineLink = "<b>Divine</b>"]

[h: outTxt = '<table border=0 width=100%>']
[h: outTxt = concat(outTxt,strformat("<tr align=center><td align=center>%{indexLink}</td></tr>"))]
[h: outTxt = concat(outTxt,strformat("<tr align=center><td><table width=100% border=0><tr><td align=left>%{learnArcaneLink}</td><td align=right>%{learnDivineLink}</td></tr></table></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[h, if(vancianType == 'Memorized'):formattedMagicType = "Memorizing"; formattedMagicType = "Learning"]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Spellbook</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100%>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD align=center VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% align=center >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption style='font-size:11px'>%{formattedMagicType} %{magicType} spells</caption><br>"))]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</table></td></tr></table></body></html>"))]

[frame("Spellbook"):
{
	[r: preResultsTxt]

	[r: outTxt]

	[macro("commitedSpellList@Lib:Spells:Macros"):args]

	[macro("vancianSpellsList@Lib:Spells:Macros"):args]

	[r: endResultsTxt]
}]
