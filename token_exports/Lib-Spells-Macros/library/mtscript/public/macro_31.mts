[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: item = getStrProp(arg(0),"Name")]

[h: choiceList = "Cast, Read"]
[h: status=input(
	strformat('selectChoice| %{choiceList}  | Select for '+item+'? | RADIO | ORIENT=V SELECT=0 VALUE=STRING')

)]
[h:abort(status)]

[if(selectChoice == "Cast"), code :{
	[macro("castSpell@Lib:Spells:Macros"):arg(0)]
};{
	[macro("showSpellText@Lib:Spells:Macros"):arg(0)]
}]

