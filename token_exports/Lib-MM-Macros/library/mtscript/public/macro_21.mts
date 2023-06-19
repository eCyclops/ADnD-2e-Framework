[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(JSON). "+getMacroName()+"@"+getMacroLocation())]

[H: thisJSON = arg(0) ]
[h: macro.return = codeJSON(thisJSON,1)]