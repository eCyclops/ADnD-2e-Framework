[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: thisFrameName = "Player Journal Management"]
[h: formLink = macroLinkText('closeFormWindow@Lib:ADND',"none")]
[h: formText = strformat('<form method="json" name="simpleDialogFrame" action="%{formLink}">')]
[h: doneSubmitText = strformat('<input type="hidden" name="frameName" value="%{thisFrameName}"><input type="submit"  name="Done" value="Done"> </input></form>')]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Personal Journal Management</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat('%{formText}'))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width =100% >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>Personal Journal Management</caption>"))]

[h:addEntryLink =  macroLink("+add","editJournal@Lib:Journal:Macros","none",strformat('myID=%{myID}; '),myID)]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</table></td></tr><tr><td align=center>%{doneSubmitText}</td></tr></table></body></html>"))]

[h: class = "oddRow"]
[h:outTxt = strformat("<table border=1 cellpadding=1 width=100%><tr class=%{class}>")]
[h: loopCount = 0]
[h: tag = getLibProperty("JournalsTagVar","Lib:Journal")]
[h, token(myID): entries = getMatchingProperties(tag+'\\..*')]
[foreach(entry,entries,""), code :{
	[h: prop=getProperty(entry,myID)]
	[h: name=getStrProp(prop,"name")]
	[h: desc =getStrProp(prop,"description")]
	[h, if(desc != ''), code :{
		[h: args = strformat('myID=%{myID}; name=%{name}; description=%{desc};')]
		[h: editLink =  macroLink(decode(name),"editJournal@Lib:Journal:Macros","none",args,myID)]

		[h:outTxt = concat(outTxt,strformat("<td>%{editLink}</td>"))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount >= 3): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 3): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 3): loopCount=0]
	};{}]

}]
[h: outTxt = concat(outTxt,strformat("<tr align=center>%{addEntryLink}</tr>"))]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[frame(thisFrameName): {

	[r: preResultsTxt]

	[r: outTxt]

	[r: endResultsTxt]

}]
