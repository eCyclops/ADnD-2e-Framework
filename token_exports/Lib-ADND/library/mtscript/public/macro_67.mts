[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(SourceToken,TargetToken). "+getMacroName()+"@"+getMacroLocation())]

[H: source = arg(0) ]
[H: target = arg(1) ]

[h: allProperties = getPropertyNames('json',source)]
[foreach(property,allProperties,""), code :{
	[setProperty(property,getProperty(property,source),target)]
}]
