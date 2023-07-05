[h: npcJSON = arg(0)]
[h: newEntry = json.contains(npcJSON,"newEntry")]
[h, if(newEntry): npcJSON = json.remove(npcJSON,"newEntry")]

[h: npcJSON = json.remove(npcJSON,"viewLetter")]

[h: name = decode( json.get(npcJSON,"name"))]
[h: name = lower(name)]

[h: pTag = getLibProperty("PropertyTag","Lib:MM")]
[h: pTag = strformat('%{pTag}.%{name}')]

[h: idxTag_Prefix = getLibProperty('MonsterIDXTag','Lib:MM')]
[h: firstChar = substring(name,0,1)]
[h:idxTag = strformat('%{idxTag_Prefix}.%{firstChar}')]
[h: idxJSON = getLibProperty(idxTag,"Lib:MM")]


[h: '<!-- check that the spell name doesnt exist already if DB exists -->']
[h: updateTxt = "Added"]
[h, if(!json.isEmpty(idxJSON)), code : {
	[h: testObj = json.get(idxJSON, name)]
	[h,if( !json.isEmpty(testObj) ): updateTxt = "Updated"]
	[h,if(newEntry): assert(json.isEmpty(testObj),name+"  already exists in the creature database.")]
};{}]

[h: idxStore = json.set("{}",
		"hitDice",decode(json.get(npcJSON,"hitDice")),
		"climate",decode(json.get(npcJSON,"climate")),
		"frequency",decode(json.get(npcJSON,"frequency")),
		"activity",decode(json.get(npcJSON,"activity")),
		"diet",decode(json.get(npcJSON,"diet")),
		"source",decode(json.get(npcJSON,"source"))
		)]

[h: '<!-- add index item using name as pointer -> ']
[h: setLibProperty(idxTag,json.set(idxJSON,name,idxStore),"Lib:MM")]

[h: '<!-- store in private property PropertyTag.name, you wont ever see this on the Token btw -->']
[h: setLibProperty(pTag,npcJSON,"Lib:MM")]

[h: outTxt = strformat('%{updateTxt} npc %{name}.<br>')]
[broadcast(outTxt,"gm")]

[h, if(isFrameVisible("Monster_DB_Management")), code :{
	[h: viewLetter = substring(name,0,1)]
	[h, macro("Manage Main@Lib:MM:Macros"):strformat('viewLetter=%{viewLetter};')]
};{}]
