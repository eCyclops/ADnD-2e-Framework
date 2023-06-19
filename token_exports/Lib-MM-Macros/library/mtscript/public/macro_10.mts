[H: numArgs = argCount()]
[h: assert(!(numArgs<4),"To few arguments to function "+getMacroName()+"(currentValue,List,NPCPropertyName,Name). "+getMacroName()+"@"+getMacroLocation())]

[H: currentValue = arg(0) ]
[H: list = arg(1) ]
[H: propertyName = arg(2) ]
[H: name = arg(3) ]

[h: loopCount = 0]
[h: foundMatch = 0]
[h: thisInput = strformat('<table border=1 cellpadding=0><caption><b>%{name}</b></caption><tr>')]
[h, foreach(entry, list,""), code :{
	[h: endOfIndex = listCount(list)-1]
	[h: currentIndex = listFind(list,entry)]

	[if(listContains(currentValue,entry)), code :{
		[thisInput = concat(thisInput,strformat('<td bgcolor=orange><table border=0><td><input type="checkbox" name="%{propertyName}.%{entry}" value="%{entry}" checked="checked"></td><td>%{entry}</td></table></td>'))]
		[foundMatch = 1]
	};{
		[thisInput = concat(thisInput,strformat('<td><table border=0><td><input type="checkbox" name="%{propertyName}.%{entry}" value="%{entry}"></td><td>%{entry}</td></table></td>'))]
	}]
	[loopCount = loopCount + 1]
	[if(loopCount > 4 && endOfIndex != currentIndex): thisInput = concat(thisInput,strformat('</tr><tr>'))]
	[if(loopCount > 4 && endOfIndex != currentIndex): loopCount = 0]
}]
[h, if(!foundMatch), code :{
	[h: thisInput = concat(thisInput,strformat('<td><table border=0><td><input type="checkbox" name="%{propertyName}.Other" value="Other" checked="checked"></td><td>Other</td></table></td>'))]
};{}]

[h: thisInput = concat(thisInput,strformat('</select></td></tr></table>'))]

[h: macro.return = thisInput]

