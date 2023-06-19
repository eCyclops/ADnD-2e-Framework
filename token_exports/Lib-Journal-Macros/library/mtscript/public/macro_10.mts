[h: myID = json.get(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid in "+getMacroName()+"@"+getMacroLocation())]

[h: name = encode(json.get(arg(0),"name"))]
[h: description = encode(json.get(arg(0),"description"))]
[h: deleteEntry = json.get(arg(0),"deleteEntry")]
[h, if(deleteEntry != ''): delete=1;delete=0]

[h: closeFrame("Update Journal Entry")]

[if(!delete), code :{
	[macro("addJournal@Lib:Journal:Macros"):strformat('myID=%{myID}; name=%{name}; description=%{description}; '))]
};{
	[macro("deleteJournal@Lib:Journal:Macros"):strformat('myID=%{myID}; name=%{name}; description=%{description};'))]
}]


