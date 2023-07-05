[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: choiceList = "Memorize, Forget, Read"]
[h: item = getStrProp(arg(0),"Name")]

[h: status=input(
	strformat('spellChoice| %{choiceList}  | Select for %{item}? | RADIO | ORIENT=V SELECT=0 VALUE=STRING')

)]
[h:abort(status)]

[if(spellChoice == "Memorize"), code :{
	[h: args = arg(0)]
	[h: args = setStrProp(args,'vancianType','Memorized')]
	[macro('learnSpell@Lib:Spells:Macros'):args]
};{}]
[if(spellChoice == "Forget"), code :{
	[h: args = arg(0)]
	[h: args = setStrProp(args,'vancianType','Known')]
	[macro('castSpell@Lib:Spells:Macros'):args]
};{}]
[if(spellChoice == "Read"), code :{
	[h: args = arg(0)]
	[macro('showSpellText@Lib:Spells:Macros'):args]
};{}]

