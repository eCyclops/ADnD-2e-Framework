[h: sourceName = getStrProp(arg(0),"sourceName")]
[h: assert(!(sourceName==''),"sourceName is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: npcJSON = getNPCJSON(sourceName)]
[h: npcDetails = getNPCDetailsTxt(sourceName,npcJSON)]

[h: thisFrameName = "View Monster Entry"]
[h: formLink = macroLinkText('closeFormWindow@Lib:ADND',"none")]
[h: formText = strformat('<form method="json" name="simpleDialogFrame" action="%{formLink}">')]
[h: doneSubmitText = strformat('<input type="hidden" name="frameName" value="%{thisFrameName}"><input type="submit"  name="Done" value="Done"> </input></form>')]

[h: name = decode(json.get(npcJSON,'name'))]
[h: description = json.get(npcJSON,'description')]

[h: descUpdated = '']
[foreach(encodedLine,description, "", "%0A"), code: {
	[h: line = decode(encodedLine)]
	[h: findString = strformat( "\^(?i)(\\w+:)" )]
	[h: id = strfind(line, findString)]
	[h, if(getFindCount(id)>0): foundBold = getGroup(id, 1, 1); foundBold = '']
	[h: line = replace(line,"\^\\w+:",strformat("<br><b>%{foundBold}</b>"))]

	[h: descUpdated = concat(descUpdated,line+"<br>")]
}]

[h: descUpdatedDISABLED = decode(replace(description,'%0A','<br>'))]

[h: npcText = strformat("<table border=0>%{npcDetails}</table>")]
[h: npcDescription = strformat("<table border=0>%{descUpdated}</table>")]


[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Monster Entry</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat('%{formText}'))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE border=0 width =100% >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>%{name}</caption>"))]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</table></td></tr><tr><td align=center>%{doneSubmitText}</td></tr></table></body></html>"))]

[frame(thisFrameName,"width=800; height=800;" ): {
	[r: preResultsTxt]

	<td valign=top>[r: npcText]</td><td valign=top>[r: npcDescription]</td>

	[r: endResultsTxt]
}]