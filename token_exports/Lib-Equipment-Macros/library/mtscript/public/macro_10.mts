[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: curEQ = getProperty("Equipment_List",myID)]
[h: eqList = json.toList(curEQ)]
[h: newEntry = getStrProp(arg(0),"newEntry",0)]

[h: assert(!(json.isEmpty(curEQ) && getStrProp(arg(0),"item") ==''), "You have none of that.",0)]

[h: deleteThis = 0]
[h: item = getStrProp(arg(0),"item")]
[if(item == ''), code : {
[h: status=input(
	"item|"+eqList+"|Select item to Edit|LIST|SELECT=0 VALUE=STRING",
	"deleteThis|0|Delete this?|CHECK"
)]
[h:abort(status)]
};{
	[h: catagory = getStrProp(arg(0),"catagory")]
}]

[if (deleteThis == 1), code : {
	[h: args = strformat("myID=%{myID}; item=%{item};catagory=%{catagory};")]
	[macro("deleteEQ@Lib:Equipment:Macros"):args]
};
{
	[macro("editEQ@Lib:Equipment:Macros"):strformat("myID=%{myID}; newEntry=%{newEntry}; item=%{item};catagory=%{catagory};")]
	[h: args = macro.return]
	[macro("addEQ@Lib:Equipment:Macros"):args]
}]
