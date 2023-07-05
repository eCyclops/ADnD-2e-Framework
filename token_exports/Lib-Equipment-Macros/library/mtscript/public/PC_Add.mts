[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: catList = getLibProperty("Catagories","Lib:Equipment")]

[h: status=input(
	"catagory|"+catList+"|Select type to add|RADIO|SELECT=0 VALUE=STRING"
)]
[h:abort(status)]

[h: dbEquipment = getLibProperty(catagory,"Lib:Equipment")]
[h: eqNames = json.sort(json.fields(dbEquipment, 'json'))]
[h: eqNames = json.toList(eqNames)]
[h: status=input(
	"junkvar|Adding Equipment|Option| LABEL",
	"item|"+eqNames+"|Select Item|LIST|SELECT=0 VALUE=STRING"
)]
[h:abort(status)]

[macro("editEQ@Lib:Equipment:Macros"):strformat("myID=%{myID}; newEntry=1; item=%{item}; catagory=%{catagory};")]
[h: args = strformat("myID=%{myID}; %{macro.return}")]
[macro("addEQ@Lib:Equipment:Macros"):args]
