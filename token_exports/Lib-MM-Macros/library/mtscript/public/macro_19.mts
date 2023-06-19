[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(JSON,1=Encode, 0=Decode). "+getMacroName()+"@"+getMacroLocation())]

[H: thisJSON = arg(0) ]
[H: encodeType = arg(1) ]

[foreach(entry,thisJSON,""), code :{
	[h: thisJSON = json.set(thisJSON,entry,decode(json.get(thisJSON,entry)) )]
}]

[h: macro.return = thisJSON]