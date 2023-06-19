[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: item = getStrProp(arg(0),"item")]
[h: source = getStrProp(arg(0),"source")]

[h: choiceList = "Description, Note"]
[h: status=input(
	strformat('selectChoice| %{choiceList}  | View which for '+item+'? | RADIO | ORIENT=V SELECT=0 VALUE=STRING')

)]
[h:abort(status)]

[if(selectChoice == "Description"), code :{
	[h: myArgs = strformat("myID=%{myID};item=%{item};")]
	[macro("viewItemDetailsFrame@Lib:Equipment:Macros"):strformat("name=%{source}")]
};{
	[h: myArgs = strformat("myID=%{myID};item=%{item};")]
	[macro("noteEQ@Lib:Equipment:Macros"):myArgs]
}]

