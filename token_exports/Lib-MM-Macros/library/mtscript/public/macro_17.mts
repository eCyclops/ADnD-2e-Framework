[h: incJSON = arg(0)]
[h: name = json.get(incJSON, "name")]
[h: tokenID = json.get(incJSON,"tokenID")]
[h: assert(tokenID,"Need to select a token to initialize.",0)]
[h: selectedTokens = json.get(incJSON,"selectedTokens")]
[h: assert(!(selectedTokens==''),"selectedTokens is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: closeFrame("Monster_Spawn_Management")]

[h: setPropertyType("Monster",tokenID)]
[h: npcJSON = getNPCJSON(name)]

[h: npcDECODED = decodeJSON(npcJSON)]

[h: npcNameUnique = getUnusedName(json.get(npcDECODED,"name"))]
[h: setName(npcNameUnique,tokenID)]

[h: setProperty("MonsterSourceName",json.get(npcDECODED,"name"),tokenID)]
[h: setProperty("HD",json.get(npcDECODED,"hitDice"),tokenID)]
[h: setProperty("AC",json.get(npcDECODED,"ac"),tokenID)]	
[h: setProperty("Movement",json.get(npcDECODED,"move"),tokenID)]
[h: setProperty("THACO",json.get(npcDECODED,"thaco"),tokenID)]
[h: setProperty("HD",json.get(npcDECODED,"hitDice"),tokenID)]
[h: setProperty("Intel",json.get(npcDECODED,"intelligence"),tokenID)]
[h: setProperty("Alignment",json.get(npcDECODED,"alignment"),tokenID)]
[h: setProperty("numAttacks",json.get(npcDECODED,"numAttacks"),tokenID)]
[h: setProperty("Damage",json.get(npcDECODED,"damage"),tokenID)]
[h: setProperty("SD",json.get(npcDECODED,"specialDefense"),tokenID)]
[h: setProperty("SA",json.get(npcDECODED,"specialAttacks"),tokenID)]
[h: setProperty("MR",json.get(npcDECODED,"magicResistance"),tokenID)]
[h: setProperty("Size",json.get(npcDECODED,"size"),tokenID)]
[h: setProperty("Morale",json.get(npcDECODED,"morale"),tokenID)]
[h: xp = json.get(npcDECODED,"xp")]
[h: xp = replace(xp,',','')]
[h: setProperty("xp",xp,tokenID)]
[h, token(tokenID): setGMNotes( json.get(NPCDECODED,'description') )]
[h: hasAttacks = 0]
[h, foreach(entry,npcDECODED,""), code :{
	[h, if(startsWith(entry,"attack.")), code :{
		[h: hasAttacks = 1]
		[h: findString = strformat( "\^(?i).*\\.(.*)(\$)" )]
		[h: id = strfind(entry, findString)]
		[h, if(getFindCount(id)>0): attackNumber = getGroup(id, 1, 1); attackNumber = -1]
		[h: thisProp = json.get(npcDECODED,entry)]
		[h: thisProp = replace(thisProp,"&#59",";")]
		[h: setProperty(strformat('weapon.%{attackNumber}'),thisProp,tokenID)]
	};{}]
}]


[h, if(hasAttacks), code :{
	[h: status=input (
		strformat("seperator | <html><b>--- Creature has default attack, add weapons also? ---</b></html> | | LABEL | SPAN=TRUE"),
		strformat("addWeapons | 1 | Give me weapon selection  | CHECK")

	)]
	[h:abort(status)]
	[h, if (addWeapons), code :{
		[h, macro("NPC_Initialize_FirstTime@Lib:ADND"):strformat("myID=%{tokenID}; selectedTokens=%{selectedTokens};")]
	};{
		[h, macro("NPC_Initialize_Normal@Lib:ADND"):strformat("myID=%{tokenID};")]
	}]
};{
	[h, macro("NPC_Initialize_FirstTime@Lib:ADND"):strformat("myID=%{tokenID}; selectedTokens=%{selectedTokens};")]
}]

