[h:assert(isGM(),"This is a DM command.",0)]

[h: magicType = getStrProp(arg(0),"magicType","Arcane")]
[h: viewLevelSpell = getStrProp(arg(0),"viewLevelSpell",1)]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Spells Management</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width =100% >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>Spell Management<br></caption><br>"))]


[h: args = strformat("viewLevelSpell=%{viewLevelSpell}; magicType=%{magicType}; newEntry=1;")]
[h:addSpellLink =  macroLink(strformat("+add level %{viewLevelSpell} spell"),"edit@Lib:Spells:Macros","none",args)]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</body></html></table></td></tr><tr><td>%{addSpellLink}</td></tr></table>"))]

[h: learnArcaneLink = macroLink("Switch to Arcane", "Manage Main@Lib:Spells:Macros","none",strformat("magicType=Arcane; viewLevelSpell=1;"))]
[h: learnDivineLink = macroLink("Switch to Divine", "Manage Main@Lib:Spells:Macros","none",strformat("magicType=Divine; viewLevelSpell=1;"))]

[h, if(magicType == 'Arcane'):learnArcaneLink = "<b>Arcane</b>" ; learnDivineLink = "<b>Divine</b>"]

[h: outTxt = '<table width=100% border=0 cellpadding=1 width=100%>']
[h: outTxt = concat(outTxt,strformat("<tr align=center><td align=center>INDEX</td></tr>"))]
[h: outTxt = concat(outTxt,strformat("<tr align=center><td><table width=100% border=0><tr><td align=left>%{learnArcaneLink}</td><td align=right>%{learnDivineLink}</td></tr></table></td></tr>"))]
[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[h, if(magicType == "Arcane"):spellCount = 10;spellCount=8]

[h: levelSelect = strformat("<table width=100% align=center border=0 cellpadding=1><caption>View Level</caption>")]
[h, if(magicType == "Arcane"):spellCount = 10;spellCount=8]
[h: levelSelect = concat(levelSelect,strformat("<tr>"))]
[count(spellCount,""), code :{
	[h: args = strformat("magicType=%{magicType}; viewLevelSpell=%{roll.count};")]
	[h: link = macroLink(roll.count,'Manage Main@Lib:Spells:Macros','none',args)]
	[h,if(roll.count == viewLevelSpell):levelSelect = concat(levelSelect,strformat("<td>[%{viewLevelSpell}]</td>")); levelSelect = concat(levelSelect,strformat("<td>%{link}</td>")) ]
}]
[h: levelSelect = concat(levelSelect,strformat("</tr></table>"))]
[h: selectTxt = strformat("<table border=0 cellpadding=1 align=center><td>%{levelSelect}</td></table>"))]
[h: class = "oddRow"]

[h: outTxt = concat(outTxt,strformat("%{selectTxt}<table width=100%><caption>Level %{viewLevelSpell}</caption><tr class=%{class}>")))]

[h: levelSpell = viewLevelSpell]
[h: spellDBIdx = add(magicType,levelSpell)]
[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]

[h: assert(!json.isEmpty(spellList),strformat("There are no level %{viewLevelSpell} %{magicType} spells in the database."),0)]

[h: spellListSorted = json.sort(json.fields(spellList, 'json'))]
[h: loopCount = 0]
[foreach(Item, spellListSorted,''), code : {
	[h: args = strformat("Name=%{Item}; viewLevelSpell=%{viewLevelSpell}; magicType=%{magicType};")]
	[h:spellLink =  macroLink(Item,"edit@Lib:Spells:Macros","none",args)]

	[h: tipTxt = getShowSpellToolTip(strformat("magicType=%{magicType}; Name=%{Item};"))]
	[h: spellToolTipTxt = toolTipIt(tipTxt,spellLink)]

	[h:outTxt = concat(outTxt,strformat("<td>%{spellToolTipTxt}</td>"))]

	[h: loopCount = loopCount +1]
	[h, if(loopCount >= 4): class = if(class=="oddRow", "evenRow", "oddRow")]
	[h, if(loopCount >= 4): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
	[h, if(loopCount >= 4): loopCount=0]
}]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[frame("SpellDB_Management"): {

	[r: preResultsTxt]

	[r: outTxt]

	[r: endResultsTxt]

}]
