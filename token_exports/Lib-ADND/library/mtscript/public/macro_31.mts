[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: args = strformat("myID=%{myID};")]
[r: DO_Initiative(arg(0))]
