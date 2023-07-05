[h: catagory = getStrProp(arg(0),"catagory")]
[h: currentDBIndex = getLibProperty(catagory,"Lib:Equipment")]

[h: outTxt = '']
[h, if(!json.isEmpty(currentDBIndex) && json.type(currentDBIndex) == "OBJECT"), CODE:{
	[h: itemNames = json.sort(json.fields(currentDBIndex, 'json'))]
	[h: class = "oddRow"]
	[h: loopCount = 0]
	[h: outTxt = concat(outTxt,strformat('<tr class="%{class}">'))]
	[foreach(prop, itemNames, ""), code :{
		[h: editLink = macroLink(prop,'edit@Lib:Equipment:Macros','none','item='+prop+';catagory='+catagory+';')]
		[h: outTxt = concat(outTxt,strformat('<td>%{editLink}</td>'))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount>=5): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 5): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 5):loopCount=0]
	}]
	[h: outTxt = concat(outTxt,strformat('</tr>'))]
};{
	[h: outTxt = concat(outTxt,strformat('<tr><td>%{catagory} is empty</tr></td>'))]
}]

[r: outTxt]
