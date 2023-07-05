[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: args = strformat("myID=%{myID};")]
[r: DO_Initiative(args)]
