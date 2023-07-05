[h: importText = json.get(arg(0), "TextBox")]
[h: whichCreature = json.get(arg(0), "impType")]

[h: closeFrame("MonsterImport")]

[h: npcJSON = getEmptyNPCJSON()]

<!-- key is the field we're searching for, data is the "key" we use for the value found in npcJSON -->
[h: searchJSON = json.set("{}",
		"Climate/Terrain:","climate",
		"Frequency:","frequency",
		"Organization:","organization",
		"Activity Cycle:","activity",
		"Diet:","diet",
		"Intelligence:","intelligence",
		"Treasure:","treasure",
		"Alignment:","alignment",
		"No. Appearing:","numAppearing",
		"Armor Class:","ac",
		"Movement:","move",
		"Hit Dice:","hitDice",
		"THAC0:","thaco",
		"No. of Attacks:","numAttacks",
		"Damage/Attack:","damage",
		"Special Attacks:","specialAttacks",
		"Special Defenses:","specialDefense",
		"Magic Resistance:","magicResistance",
		"Size:","size",
		"Morale:","morale",
		"XP Value:","xp"
		)]

<!-- Get The text blocks in imports -->
[h: descriptionTime = 0]
[h: description = '']

[h: name = "New Creature"]
[h: text = encode(importText)]

[h: tick = "%EF%BF%BD"]
[h: text = replace(text,tick,"'")]

[h: quote = "%22"]
[h: text = replace(text,quote,"'")]

[H: LF = "%0A"]
[h: CR = "%0D"]
[h: TAB = "%09"]
[h: TAB_DECODE = TAB]
[h: ALL_ACCEPTABLE_TEXT_OLD = "/,0-9A-Z-+% '()/[/]\/" ]
[h: ALL_ACCEPTABLE_TEXT = ":;<>!@#&*?/,0-9A-Z-+% '()/[/]\/" ]
[h: AAA = ALL_ACCEPTABLE_TEXT]
[h,if(whichCreature == 1): GET_ID = 1]
[h,if(whichCreature == 2): GET_ID = 4]
[h,if(whichCreature == 3): GET_ID = 8]
[h,if(whichCreature == 4): GET_ID = 11]
[h,if(whichCreature == 5): GET_ID = 14]
[h,if(whichCreature == 6): GET_ID = 17]
[h,if(whichCreature == 7): GET_ID = 20]
[h,if(whichCreature == 8): GET_ID = 23]
[h,if(whichCreature == 9): GET_ID = 26]
[h,if(whichCreature == 10): GET_ID = 30]
[h: text = replace(text,LF+CR,LF)]
[h: text = replace(text,CR+LF,LF)]


[h, foreach(encodedLine,text, "", "%0A"), code: {
	[h: foundMatch = 0]
	[h: line = decode(encodedLine)]

	[foreach(search,searchJSON,""), code :{
		[h: npcJSONKey = json.get(searchJSON,search)]
		[h: findString2 = strformat( "\^(?i)%{search}\\s+([%{AAA}]+)(\\t+|\$)" )]
		[h: findString = strformat( "\^(?i)%{search}\\s+(([%{AAA}]+)(\\t+|\$))(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?(([%{AAA}]+)(\\t+|\$))?" )]
		[h: id = strfind(line, findString)]
		[h, if( !foundMatch && getFindCount(id)>0):
			npcJSON = json.set(npcJSON,npcJSONKey,encode(getGroup(id, 1, GET_ID)))]
		[h, if( !foundMatch && getFindCount(id)>0):
			foundMatch = 1]
	}]
	<!-- Anything NOT found goes into description -->
	[h, if( !foundMatch):
		description  = concat(description,encode(line)+LF) ]
}]
[h:'<!-- end line by line test ->']
[h: npcJSON = json.set(npcJSON,"description",description)]
[h: npcJSON = json.set(npcJSON,"climate_text",json.get(npcJSON,'climate'))]
[h: npcJSON = json.set(npcJSON,"activity_text",json.get(npcJSON,'activity'))]

[h: status=input (
	"name | New Creature | Enter name of this creature | TEXT | WIDTH=15"
)]
[h:abort(status)]

[h: npcJSON = json.set(npcJSON,"name", encode(name),"importNew",1,"viewLetter",lower(substring(name,0,1)) )]

[h: npcJSON = createAttacksFromDamage(npcJSON)]

[macro("edit@Lib:MM:Macros"):npcJSON]
