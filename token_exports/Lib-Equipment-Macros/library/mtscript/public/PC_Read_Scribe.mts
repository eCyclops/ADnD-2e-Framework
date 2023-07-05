[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: bookName = getStrProp(arg(0),"bookName","Unknown")]
[h: bookID = getStrProp(arg(0),"bookID",-1)]
[h: tag = "book."]
[h: magicType  = getStrProp(arg(0), "magicType","Arcane")]
[h: viewLevelSpell = getStrProp(arg(0),"viewLevelSpell",1)]

[h: type_args = arg(0)]
[h: arcane_args = setStrProp(type_args,"magicType",'Arcane')]
[h: divine_args = setStrProp(type_args,"magicType",'Divine')]
[h: arcaneLink = macroLink('Arcane','PC_Read_Scribe@Lib:Equipment:Macros','none',arcane_args,myID)]
[h: divineLink = macroLink('Divine','PC_Read_Scribe@Lib:Equipment:Macros','none',divine_args,myID)]
[h, if(magicType == 'Arcane'): arcaneLink = "[Arcane]"; divineLink = "[Divine]"]

[h: typeSelect = '<table width=100% border=0 cellpadding=1 width=100%>']
[h: typeSelect = concat(typeSelect,strformat("<tr align=center><td align=center>INDEX</td></tr>"))]
[h: typeSelect = concat(typeSelect,strformat("<tr align=center><td><table width=100% border=0><tr><td align=left>%{arcaneLink}</td><td align=right>%{divineLink}</td></tr></table></td></tr>"))]
[h: typeSelect = concat(typeSelect,strformat("</tr></table>"))]

[h: levelSelect = strformat("<table width=100% align=center border=0 cellpadding=1><caption>View Level</caption>")]
[h, if(magicType == "Arcane"):spellCount = 10;spellCount=8]
[h: levelSelect = concat(levelSelect,strformat("<tr>"))]
[count(spellCount,""), code :{
	[h: args = arg(0)]
	[h: args = setStrProp(args,"viewLevelSpell",roll.count)]
	[h: link = macroLink(roll.count,'PC_Read_Scribe@Lib:Equipment:Macros','none',args,myID)]
	[h,if(roll.count == viewLevelSpell):levelSelect = concat(levelSelect,strformat("<td>[%{viewLevelSpell}]</td>")); levelSelect = concat(levelSelect,strformat("<td>%{link}</td>")) ]
}]
[h: levelSelect = concat(levelSelect,strformat("</tr></table>"))]
[h: selectTxt = strformat("%{typeSelect}<table border=0 cellpadding=1 align=center><td>%{levelSelect}</td></table>"))]
[h: class = "oddRow"]

[h: bookJSON = getProperty(tag+bookID,myID)]
[h: pageNames = json.sort(json.fields(bookJSON, 'json'))]
[h: bookContents = strformat("<table border=1 cellpadding=1><caption>Contents</caption><tr>")]
[h: bookContentsList = '']
[h: loopCount = 0]
[foreach(page,pageNames,""), code :{
	[h: args = strformat("myID=%{myID}; bookName=%{bookName}; bookID=%{bookID}; name=%{page}; magicType=%{magicType}; level=%{viewLevelSpell};")]
	[h: removeLink = macroLink(page,'deleteScribedSpell@Lib:Equipment:Macros','none',args,myID)]
	[h, if(page!='hidden-book-notes'):bookContents = concat(bookContents,strformat("<td>%{removeLink}</td>"))]

	[h: count = json.get(json.get(bookJSON,page),'count')]
	[h: bookContentsList = concat(bookContentsList,strformat("%{page}=%{count} "))]

	[h: loopCount = loopCount + 1]
	[h, if(loopCount >=4):bookContents = concat(bookContents,strformat("</tr><tr>"))]
	[h, if(loopCount >=4):loopCount = 0]
}]

[h: bookContents = concat(bookContents,strformat("</table>"))]

[h: avaliableSpells = "<table width=100%  border=1 cellpadding=1><caption>Avaliable to Scribe</caption>"]
[h: levelSpell = viewLevelSpell]
[h: spellDBIdx = add(magicType,levelSpell)]
[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]
[h: spellListSorted = json.sort(json.fields(spellList, 'json'))]
[h: loopCount = 0]
[h: class = "oddRow"]
[h: avaliableSpells = concat(avaliableSpells,strformat("<tr class=%{class}>"))]
[foreach(Item, spellListSorted,''), code : {
	[h: count = getStrProp(bookContentsList,Item,0)]
	[h: count = count + 1]
	[h: args = strformat("myID=%{myID}; bookName=%{bookName}; name=%{Item}; bookID=%{bookID}; magicType=%{magicType}; level=%{viewLevelSpell}; count=%{count}")]
	[h: scribeSpellLink = macroLink(Item,"addScribedSpell@Lib:Equipment:Macros","none",args,myID)]

	[h: tipTxt = getShowSpellToolTip(strformat("magicType=%{magicType}; Name=%{Item};"))]
	[h: spellToolTipTxt = toolTipIt(tipTxt,scribeSpellLink)]

	[h: avaliableSpells = concat(avaliableSpells,strformat("<td>%{spellToolTipTxt}</td>"))]
		
	[h: loopCount = loopCount +1]
	[h, if(loopCount >= 3): avaliableSpells = concat(avaliableSpells,strformat("</tr><tr class=%{class}>"))]
	[h, if(loopCount>=3): class = if(class=="oddRow", "evenRow", "oddRow")]
	[h, if(loopCount >= 3):loopCount=0]
}]
[h: avaliableSpells = concat(avaliableSpells,strformat("</tr></table>"))]

[h: backLink = macroLink('read book','PC_Read@Lib:Equipment:Macros','none', strformat("myID=%{myID}; bookName=%{bookName}; bookID=%{bookID}; magicType=%{magicType}; viewLevelSpell=%{viewLevelSpell}; "),myID)]
[h: backToBook = strformat("<table><tr><td>%{backLink}</td></tr></table>")]


[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Book/Scroll</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE  align=center width=100%  BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD   align=center VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE   align=center  width=100%  >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>%{bookName}<br></caption><br>"))]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</body></html>"))]


[frame("Read Book"): {
	[r: preResultsTxt]

	[r: selectTxt]

	[h: bookContents]

	[r: avaliableSpells]

	[r: backToBook]

	[r: endResultsTxt]
}]

