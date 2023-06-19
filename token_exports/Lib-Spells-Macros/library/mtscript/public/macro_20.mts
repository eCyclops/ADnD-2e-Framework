[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: 'magicType  = getStrProp(arg(0), "magicType")']
[h: vancianType  = getStrProp(arg(0), "vancianType")]

[h: magicType  = "Arcane"]
[h: spellsTag = add(magicType,"_"+vancianType)]
[h: spellsJSON = getProperty(spellsTag,myID)]
[h: spellsMemorizedList = '']
[foreach(spellName, spellsJSON,""), code :{
	[h: spellInfo = json.get(spellsJSON,spellName)]
	[h: count = json.get(spellInfo,"count")]
	[h: spellsMemorizedList = listAppend(spellsMemorizedList,strformat("%{spellName}x%{count}"))]
}]

[h: magicType  = "Divine"]
[h: spellsTag = add(magicType,"_"+vancianType)]
[h: spellsJSON = getProperty(spellsTag,myID)]
[foreach(spellName, spellsJSON,""), code :{
	[h: spellInfo = json.get(spellsJSON,spellName)]
	[h: count = json.get(spellInfo,"count")]
	[h: spellsMemorizedList = listAppend(spellsMemorizedList,strformat("%{spellName}x%{count}"))]
}]

[h: setProperty("SpellsReady",spellsMemorizedList,myID)]
