[h:assert(isGM(),"This is a DM command.",0)]

[h: preResultsTxt = '']
[h: preResultsTxt = concat(preResultsTxt,strformat("<html><head><title>Journal Management</title><link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND></head><body>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width=100% BORDER=1 CELLPADDING=1 BORDERCOLOR=#000000 BORDERCOLORLIGHT=#000000 BORDERCOLORDARK=#000000>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<BODY BGCOLOR=#FFD700>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TR>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TD VALIGN=TOP BGCOLOR=#F0F0F0>"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<TABLE width =100% >"))]
[h: preResultsTxt = concat(preResultsTxt,strformat("<caption>Management</caption>"))]

[h:addEntryLink =  macroLink("+add","edit@Lib:Journal:Macros","none",'')]

[h: endResultsTxt = '']
[h: endResultsTxt = concat(endResultsTxt,strformat("</body></html></table></td></tr><tr><td>%{addEntryLink}</td></tr></table>"))]

[h: class = "oddRow"]
[h:outTxt = strformat("<table border=1 cellpadding=1 width=100%><tr class=%{class}>")]
[h: loopCount = 0]
[h: tag = getLibProperty("JournalsTagVar","Lib:Journal")]
[h: entries = getMatchingLibProperties(tag+'\\..*', "Lib:Journal")]
[foreach(entry,entries,""), code :{
	[h: prop=getLibProperty(entry,"Lib:Journal")]
	[h: name=getStrProp(prop,"name")]
	[h: visible =getStrProp(prop,"visible",0)]
	[h: desc =getStrProp(prop,"description")]
	[h, if(desc != ''), code :{
		[h: args = strformat('name=%{name}; visible=%{visible}; description=%{desc};')]
		[h: editLink =  macroLink(decode(name),"edit@Lib:Journal:Macros","none",args)]

		[h:outTxt = concat(outTxt,strformat("<td>%{editLink}</td>"))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount >= 3): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 3): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 3): loopCount=0]
	};{}]

}]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[frame("Journal Management"): {

	[r: preResultsTxt]

	[r: outTxt]

	[r: endResultsTxt]

}]
