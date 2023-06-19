[h: myID = macro.args]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: proceed = input("var|This will break the inventory for the old character sheet. Continue?|Warning|Label|Span=true")]
[h: assert(proceed,"Inventory update canceled.",0)]

[macro("Inventory Updater@Lib:Update Database"): myID]