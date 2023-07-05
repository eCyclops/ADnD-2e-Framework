[h: tableName = getStrProp(arg(0),"tableName")]
[h: currentSkills = getLibProperty(tableName,"Lib:Skills")]
[h: links = '']
[h: profNames = json.sort(json.fields(currentSkills, 'json'))]
[h: class = "oddRow"]
[h: loopCount  = 0]
[h: outTxt = strformat('<table  BORDER="1" CELLPADDING="1"><tr class=%{class}>')]
[h, foreach(prop, profNames, ""), code :{
	[h: link = macroLink(prop,'edit@Lib:Skills:Macros','none','name='+prop+';tableName='+tableName+';')]
	[h: outTxt = concat(outTxt,strformat('<td>%{link}</td>'))]
	[h: loopCount = loopCount +1]
	[h, if(loopCount >= 4): class = if(class=="oddRow", "evenRow", "oddRow")]
	[h, if(loopCount >= 4): outTxt = concat(outTxt,strformat('</tr><tr class=%{class}>'))]
	[h, if(loopCount >= 4): loopCount=0]

}]
[h: outTxt = concat(outTxt,strformat('</tr></table>'))]

[r: tableName]: <br>
[r: outTxt]