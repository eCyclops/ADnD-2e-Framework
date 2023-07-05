[h: searchType = getStrProp(arg(0),"searchType","edit")]

[h: tokenID = getStrProp(arg(0),"tokenID","")]
[h: selectedTokens = getStrProp(arg(0),"selectedTokens","")]

[h: status=input(
	"name| goblin | Name or partial string of monster to find"
)]
[h:abort(status)]

[h: idxTag_Prefix = getLibProperty('MonsterIDXTag','Lib:MM')]
[h: findMatch = strformat('(?i)%{idxTag_Prefix}')]
[h: entries = getMatchingLibProperties(findMatch+'..*','Lib:MM')]

[h: matchingMonsters = '']
[h: findMonster = strformat(".*%{name}.*")]
[foreach(entry,entries,""), code :{
	[h: monsters = getLibProperty(entry,"Lib:MM")]
	[foreach(monster,monsters,""), code :{
		[h, if (matches(monster,findMonster)): matchingMonsters = listAppend(matchingMonsters, monster) ]
	}]
}]

[h: assert( (listCount(matchingMonsters) !=0) ,"** Found nothing matching search string.",0)]

[h: status=input(
	strformat("selectedMonster | %{matchingMonsters} | Select Monster to %{searchType} | LIST | SELECT=0 VALUE=STRING")
)]
[h:abort(status)]

[h: pTag = getLibProperty("PropertyTag","Lib:MM")]
[h: pTag = strformat('%{pTag}.%{selectedMonster}')]
[h: thisJSON = getLibProperty(pTag,"Lib:MM")]
[if(searchType == "edit"), code :{
	[macro("edit@Lib:MM:Macros"):thisJSON]
};{}]
[if(searchType == "spawn"), code :{
	[h: spawnTHIS = json.set("{}","name",selectedMonster,"tokenID",tokenID,"selectedTokens",selectedTokens)]
	[macro("spawnCreature@Lib:MM:Macros"):spawnTHIS]
};{}]



