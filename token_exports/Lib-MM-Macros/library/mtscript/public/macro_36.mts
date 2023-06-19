[h: item = json.get(arg(0),"name")]

[h: choiceList = "Spawn, View Creature"]
[h: status=input(
	strformat('selectChoice| %{choiceList}  | Choice for '+item+'? | RADIO | ORIENT=V SELECT=0 VALUE=STRING')

)]
[h:abort(status)]

[if(selectChoice == "Spawn"), code :{
	[macro("spawnCreature@Lib:MM:Macros"):arg(0)]
};{
	[macro("viewMonsterEntry@Lib:MM:Macros"):strformat("sourceName=%{item}; ")]
}]

