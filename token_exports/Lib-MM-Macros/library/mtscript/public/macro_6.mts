[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(StringProp,1=Encode, 0=Decode). "+getMacroName()+"@"+getMacroLocation())]

[H: prop = arg(0) ]
[H: encodeType = arg(1) ]

[count(countStrProp(prop),""), code :{
	[h: key = indexKeyStrProp(prop,roll.count)]
	[h: data = indexValueStrProp(prop,roll.count)]
	[h, if (encodeType): 
		prop = setStrProp(prop,key,encode(data));
		prop = setStrProp(prop,key,decode(data))]
}]

[h: macro.return = prop]