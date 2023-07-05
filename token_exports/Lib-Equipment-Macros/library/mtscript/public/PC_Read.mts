[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType","Arcane")]
[h: viewLevelSpell = getStrProp(arg(0),"viewLevelSpell",1)]

[h: bookName = getStrProp(arg(0),"bookName","Unknown")]
[h: bookID = getStrProp(arg(0),"bookID",-1)]
[h: tag = "book."]

[h: bookJSON = getProperty(tag+bookID,myID)]
[h: pageNames = json.sort(json.fields(bookJSON, 'json'))]
[h: outTxt = strformat("<table border=1 cellpadding=1><tr><td>cast</td><td>spell</td><td>#</td><td>type</td><td>level</td></tr>")]
[h: class = "oddRow"]
[h, foreach(page,pageNames,""), code :{
	[h: pageJSON = json.get(bookJSON,page)]
	[h: level = json.get(pageJSON,"level")]
	[h: count = json.get(pageJSON,"count")]
	[h: thisMagicType = json.get(pageJSON,"magicType")]
	[h: args = strformat("myID=%{myID}; bookName=%{bookName};bookID=%{bookID};name=%{page}")]
	[h: editLink = macroLink(page,'PC_Scribe_Edit@Lib:Equipment:Macros','none',args)]
	[h: castLink = macroLink('cast','PC_Scribe_Cast@Lib:Equipment:Macros','none',args)]

	[h, if(page!='hidden-book-notes'):
		tipTxt = getShowSpellToolTip( strformat("magicType=%{thisMagicType}; Name=%{page};"));
		tipTxt = "NA"]
	[h: spellToolTipTxt = toolTipIt(tipTxt,editLink)]

	[h, if(page!='hidden-book-notes'):outTxt = concat(outTxt,strformat("<tr class=%{class}><td>%{castLink}</td><td>%{spellToolTipTxt}</td><td>x%{count}</td><td>%{magicType}</td><td>%{level}</td></tr>"))]
	[h: class = if(class=="oddRow" && page!='hidden-book-notes', "evenRow", "oddRow")]
}]
[h: outTxt = concat(outTxt,strformat("</table>"))]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Book/Scroll</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>%{bookName}<br></caption><br>"))]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</body></html>"))]

[frame("Read Book"): {
	[r: preResultsTxt]

	[r: outTxt]
	
	<hr>[r: macroLink('+add','PC_Read_Scribe@Lib:Equipment:Macros','none',strformat("myID=%{myID}; bookName=%{bookName};bookID=%{bookID}; magicType=%{magicType}; viewLevelSpell=%{viewLevelSpell};"),myID)]

	[r: endResultsTxt]
}]


