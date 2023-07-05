[h: '<!-- get item JSON. Load "Name"-->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(Name). "+getMacroName()+"@"+getMacroLocation())]

[h: name = arg(0) ]

[h: tag  = getLibProperty("ItemTag","Lib:Equipment")+"_"+name]

[h: sourceProperty = getLibProperty(tag,"Lib:Equipment")]
[h, if(length(sourceProperty)>0): itemJSON = json.get(sourceProperty,name);itemJSON = "{}"]

[h: macro.return = itemJSON]

