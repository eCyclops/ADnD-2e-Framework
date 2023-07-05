[h: importText = json.get(arg(0), "TextBox")]
[h: whichCreature = json.get(arg(0), "impType")]

[h: closeFrame("MonsterImportFlat")]

<!-- Get The text blocks in imports -->
[h: text = encode(importText)]

[h: tick = "%EF%BF%BD"]
[h: text = replace(text,tick,"'")]

[h: quote = "%22"]
[h: text = replace(text,quote,"'")]

[h: dot = "\\."]
[h: text = replace(text,dot,"'")]

[h: halfQ = "%27"]
[h: text = replace(text,halfQ,"'")]

[H: LF = "%0A"]
[h: CR = "%0D"]
[h: TAB = "%09"]
[h: TAB_DECODE = TAB]
[h: ALL_ACCEPTABLE_TEXT = ":;<>!@#&*?/,0-9A-Z-+% '()/[/]\/" ]
[h: AAA = ALL_ACCEPTABLE_TEXT]
[h,if(whichCreature == 1): GET_ID = 1]
[h,if(whichCreature == 2): GET_ID = 4]
[h,if(whichCreature == 3): GET_ID = 8]
[h,if(whichCreature == 4): GET_ID = 11]
[h: text = replace(text,LF+CR,LF)]
[h: text = replace(text,CR+LF,LF)]

[h: count = 0]
[h: failedCount = 0]
[foreach(encodedLine,text, "", "%0A"), code: {
	[h: line = decode(encodedLine)]

	[h: findString = strformat( "(?i)([%{AAA}]+)(\\t|\$)?" )]
	[h: strID = strfind(line, findString)]
	[h: foundCount = getFindCount(strID)]

	[if(foundCount == 30), code :{
	[h: 'LINE: [for(i,1,30,1,", "): strformat("%{i}=")+getGroup(StrID,i,1)' ]
	[h: count = count + 1]

	[h: npcJSON = '']
	[h: name = encode(getGroup(strID,1,1))]
	[h: npcJSON = json.set(npcJSON,'name',encode(getGroup(strID,1,1)))]
	[h: npcJSON = json.set(npcJSON,'type',encode(getGroup(strID,2,1)))]
		[h: npcJSON_ = json.set(npcJSON,'climate',encode(getGroup(strID,3,1)))]
		[h: npcJSON_ = json.set(npcJSON,'terrain',encode(getGroup(strID,4,1)))]
	[h: npcJSON = json.set(npcJSON,'frequency',encode(getGroup(strID,5,1)))]
	[h: npcJSON = json.set(npcJSON,'organization',encode(getGroup(strID,6,1)))]
	[h: npcJSON = json.set(npcJSON,'activity',encode(getGroup(strID,7,1)))]
	[h: npcJSON = json.set(npcJSON,'diet',encode(getGroup(strID,8,1)))]
	[h: npcJSON = json.set(npcJSON,'intelligence',encode(getGroup(strID,9,1)))]
		[h: npcJSON_ = json.set(npcJSON,'inLair',encode(getGroup(strID,10,1)))]
	[h: npcJSON = json.set(npcJSON,'treasure',encode(getGroup(strID,11,1)))]
	[h: npcJSON = json.set(npcJSON,'alignment',encode(getGroup(strID,12,1)))]
	[h: npcJSON = json.set(npcJSON,'numAppearing',encode(getGroup(strID,13,1)))]
	[h: npcJSON = json.set(npcJSON,'ac',encode(getGroup(strID,14,1)))]
	[h: npcJSON = json.set(npcJSON,'move',encode(getGroup(strID,15,1)))]
	[h: npcJSON = json.set(npcJSON,'hitDice',encode(getGroup(strID,16,1)))]
	[h: npcJSON = json.set(npcJSON,'thaco',encode(getGroup(strID,17,1)))]
	[h: npcJSON = json.set(npcJSON,'numAttacks',encode(getGroup(strID,18,1)))]
	[h: npcJSON = json.set(npcJSON,'damage',encode(getGroup(strID,19,1)))]
	[h: npcJSON = json.set(npcJSON,'specialAttacks',encode(getGroup(strID,20,1)))]
	[h: npcJSON = json.set(npcJSON,'specialDefense',encode(getGroup(strID,21,1)))]
	[h: npcJSON = json.set(npcJSON,'magicResistance',encode(getGroup(strID,22,1)))]

	[h: npcJSON = json.set(npcJSON,'size',encode(getGroup(strID,23,1)))]
	[h: npcJSON = json.set(npcJSON,'morale',encode(getGroup(strID,24,1)))]
	[h: npcJSON_ = json.set(npcJSON,'psionics',encode(getGroup(strID,25,1)))]
	[h: npcJSON_ = json.set(npcJSON,'psionPower',encode(getGroup(strID,26,1)))]
	[h: npcJSON_ = json.set(npcJSON,'level',encode(getGroup(strID,27,1)))]
	[h: npcJSON = json.set(npcJSON,'xp',encode(getGroup(strID,28,1)))]
		[h: npcJSON_ = json.set(npcJSON,'source',encode(getGroup(strID,29,1)))]
		[h: npcJSON_ = json.set(npcJSON,'edition',encode(getGroup(strID,30,1)))]

	[h: source = getGroup(strID,29,1)]
	[h: edition = getGroup(strID,30,1)]
	[h: npcJSON = json.set(npcJSON,'source',encode(strformat('%{source}: %{edition}') ))]

	[h: climate = getGroup(strID,3,1)]
	[h: terrain = getGroup(strID,4,1)]
	[h: npcJSON = json.set(npcJSON,'climate',encode(strformat('%{climate},%{terrain}') ))]

	[h: npcJSON = json.set(npcJSON,"climate_text",json.get(npcJSON,'climate'))]
	[h: npcJSON = json.set(npcJSON,"activity_text",json.get(npcJSON,'activity'))]

	[h: npcJSON = createAttacksFromDamage(npcJSON)]
	[h: npcJSONDISABLE = json.set(npcJSON,'newEntry',1)]

	[macro("add@Lib:MM:Macros"):npcJSON]
	};{
		[h: failedCount = failedCount + 1]
		[r: strformat('All 30 fields not present. Found %{foundCount}. Line not formated correctly=(%{line})<br>')]
	}]
}]

<!-- end line by line test ->

Process completed. Imported [r: count] creatures.<br>
Experienced [r: failedCount] failures.<br>

