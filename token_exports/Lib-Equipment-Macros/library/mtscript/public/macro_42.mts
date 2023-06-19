[h: myID = arg(0)]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]
[h: macro.return = "<div>aaa</div>"]