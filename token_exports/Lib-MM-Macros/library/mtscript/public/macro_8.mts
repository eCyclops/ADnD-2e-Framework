[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(StringProp). "+getMacroName()+"@"+getMacroLocation())]

[H: prop = arg(0) ]
[h: macro.return = codeStrProp(prop,1)]