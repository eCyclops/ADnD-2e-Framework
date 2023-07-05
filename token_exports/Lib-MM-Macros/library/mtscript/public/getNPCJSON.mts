[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(Name). "+getMacroName()+"@"+getMacroLocation())]

[H: name = arg(0) ]

[h: pTag = getLibProperty("PropertyTag","Lib:MM")]
[h: pTag = strformat('%{pTag}.%{name}')]

[h: npcJSON = getLibProperty(pTag,"Lib:MM")]

[h: macro.return = npcJSON]
