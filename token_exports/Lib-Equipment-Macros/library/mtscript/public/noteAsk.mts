[h: myID = getStrProp(arg(0),"myID")]
[h: noteType = getStrProp(arg(0),"noteType")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: currentDB = getProperty("Equipment_List",myID)]
[h: itemNames = listSort(json.toList(currentDB),"A")]

[h: assert(json.length(currentDB),"No inventory items currently.<br>",0)]

[h: noteSelectInput = strformat("item | %{itemNames} | Select item to add edit note for | LIST | SELECT=0 VALUE=STRING")]

[H: status = input(
		noteSelectInput
)]
[H: abort(status)]

[h: myArgs = strformat("myID=%{myID};item=%{item};noteType=%{noteType};")]

[macro("noteEQ@Lib:Equipment:Macros"):myArgs]

