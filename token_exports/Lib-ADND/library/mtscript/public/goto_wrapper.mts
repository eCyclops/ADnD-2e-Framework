[h: targetID = getStrProp(arg(0),"targetID")]
[h: assert(!(targetID==''),"targetID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: goto(targetID)]
