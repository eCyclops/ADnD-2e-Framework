
[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: journalType = getStrProp(arg(0),"journalType","Campaign")]

[h: class = "oddRow"]
[h:outTxt = strformat("<table width=100%><caption>%{journalType}</caption><tr class=%{class}>")]
[h: loopCount = 0]
[h:tag = getLibProperty("JournalsTagVar","Lib:Journal")]

[h, if(journalType == 'Campaign'), code :{
	[h: entries = getMatchingLibProperties(tag+'\\..*', "Lib:Journal")]
};{
	[h, token(myID): entries = getMatchingProperties(tag+'\\..*')]
}]

[foreach(entry,entries,""), code :{
	[h,if(journalType == 'Campaign'):
		prop=getLibProperty(entry,"Lib:Journal");
		prop=getProperty(entry,myID)]
	[h: name=getStrProp(prop,"name")]
	[h: visible =getStrProp(prop,"visible",0)]
	[h: desc =getStrProp(prop,"description")]
	[h: showit = 0]
	[h, if(journalType == 'Campaign' && desc != '' && visible): showit = 1]
	[h, if(journalType != 'Campaign' && desc != ''): showit = 1]
	[h, if(showit), code :{
		[h: args = strformat('myID=%{myID}; name=%{name}; visible=%{visible}; description=%{desc};journalType=%{journalType}; ')]
		[h: viewLink =  macroLink(decode(name),"viewJournalEntry@Lib:Journal:Macros","none",args,myID)]

		[h:outTxt = concat(outTxt,strformat("<td>%{viewLink}</td>"))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount >= 3): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 3): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 3): loopCount=0]
	};{}]

}]

[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[r: outTxt]
