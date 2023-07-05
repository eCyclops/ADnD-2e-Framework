[h: sourceName = getStrProp(arg(0),"name")]
[h: assert(!(sourceName==''),"sourceName is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: itemJSON = getITEMJSON(sourceName)]
[h: itemDetails = getItemToolTxt(sourceName,itemJSON)]

[h: thisFrameName = "View Item Entry"]
[h: formLink = macroLinkText('closeFormWindow@Lib:ADND',"none")]
[h: formText = strformat('<form method="json" name="simpleDialogFrame" action="%{formLink}">')]
[h: doneSubmitText = strformat('<input type="hidden" name="frameName" value="%{thisFrameName}"><input type="submit"  name="Done" value="Done"> </input></form>')]

[h: name = json.get(itemJSON,'name')]
[h: description = decode(json.get(itemJSON,'description'))]

[h: itemTxt = strformat("<table border=0>%{itemDetails}</table>")]
[h: itemDescription = strformat("%{description}")]


[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Item Entry</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
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

[frame(thisFrameName,"width=400; height=300;" ): {
	[r: preResultsTxt]

	<td valign=top>[r: itemTxt]</td><td valign=top><table border=1><tr><td><pre>[r: itemDescription]</pre></td></tr></table></td>

	[r: endResultsTxt]
}]