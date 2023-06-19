[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: cfgSettings = getLibProperty('CFGSettings', 'Lib:ADND')]
[h: privateMode = getStrProp(cfgSettings,'privatemode','1')]

[r, macro("DO_Initiative@Lib:Initiative"): arg(0)]