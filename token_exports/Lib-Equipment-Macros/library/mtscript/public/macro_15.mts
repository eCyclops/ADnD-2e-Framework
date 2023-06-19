[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: catagory = getStrProp(arg(0),"catagory")]
[h: currentDBIndex = getLibProperty(catagory,"Lib:Equipment")]

[h: outTxt = '']
[h, if(!json.isEmpty(currentDBIndex) && json.type(currentDBIndex) == "OBJECT"), CODE:{
	[h: itemNames = json.sort(json.fields(currentDBIndex, 'json'))]
	[h: loopCount = 0]
	[h: class = "oddRow"]
	[h: outTxt = concat(outTxt,strformat('<tr class=%{class}>'))]
	[h, foreach(prop, itemNames, ""), code :{
		[h: args = strformat("myID=%{myID}; newEntry=1;item=%{prop}; catagory=%{catagory};")]
		[h: editLink = macroLink(prop,'PC_Edit@Lib:Equipment:Macros','none',args)]
		[h: detailsToolTip = toolTipIt("Click to view item details.","?")]
		[h: detailsLink = macroLink(detailsToolTip,'viewItemDetailsFrame@Lib:Equipment:Macros','none',strformat("name=%{prop}"))]
		[h: itemTxt = toolTipIt(prop,editLink)]
		
		[h: outTxt = concat(outTxt,strformat("<td>%{itemTxt} %{detailsLink}</td>"))]

		[h: loopCount = loopCount +1]
		[h, if(loopCount>=5): class = if(class=="oddRow", "evenRow", "oddRow")]
		[h, if(loopCount >= 5): outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
		[h, if(loopCount >= 5):loopCount=0]
	}]
	[h: outTxt = concat(outTxt,strformat('</tr>'))]
};{
	[h: outTxt = concat(outTxt,strformat("<tr><td>%{catagory} is empty</tr></td>"))]
}]

[r: outTxt]

