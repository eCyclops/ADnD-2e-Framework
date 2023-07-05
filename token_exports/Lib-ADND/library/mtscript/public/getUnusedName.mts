<!-- returns unused name (IN CURRENT MAP) for name -->
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(Name[,tokenID]). "+getMacroName()+"@"+getMacroLocation())]
[h: myID = -1]

[H: name = arg(0) ]
[h, if(numArgs == 2):myID = arg(1)]

[h: count = 1]
[h: currentName = replace(name,"\s+?\d+","")]
[h, if (myID != -1 && findToken(currentName) == myID), code :{
	[h: currentName = name]
};{
	[h: currentName = strformat('%{name} %{count}')]
	[h, while(findToken(currentName) != ''), code :{
		[h: count = count + 1]
		[h: currentName = strformat('%{name} %{count}')]
	}]
}]
[h: macro.return = currentName]