[H: numArgs = argCount()]
[h: assert(!(numArgs<4),"To few arguments to function "+getMacroName()+"(NPCValue,List,NPCPropertyName,Name). "+getMacroName()+"@"+getMacroLocation())]

[H: npcValue = arg(0) ]
[H: list = arg(1) ]
[H: propertyName = arg(2) ]
[H: name = arg(3) ]
[h: nameLower = lower(name)]

[h: thisInput = strformat('<td>%{name}</td><td><select name="%{propertyName}" size="">')]
[h: foundMatch = 0]
[h, foreach(entry, list,""), code :{
	[if(entry != npcValue), code :{
		[thisInput = concat(thisInput,strformat('<option>%{entry}</option>'))]
	};{
		[thisInput = concat(thisInput,strformat('<option selected="selected">%{entry}</option>'))]
		[foundMatch = 1]
	}]
}]
[h, if(foundMatch != 1 && npcValue != '' && npcValue != 'NA'), code :{
	[h: thisInput = concat(thisInput,strformat('<option selected="selected">%{npcValue}</option>'))]
};{}]

[h: thisInput = concat(thisInput,strformat('</select></td>'))]

[h: macro.return = thisInput]
