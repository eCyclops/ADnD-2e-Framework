[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: cfgSettings = getLibProperty('CFGSettings', 'Lib:ADND')]
[h: privateMode = getStrProp(cfgSettings,'privatemode','1')]

[h: args = strformat("myID=%{myID};")]
[r: DO_Initiative(args)]
