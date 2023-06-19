[h: primaryID =json.get(macro.args,0)]

[h: switchToken(primaryID)]
[h: setPropertyType("Character")]

[h: status=input(
	"Strength|"+Strength+"|Strength",
	"Dexterity|"+Dexterity+"|Dexterity",
	"Constitution|"+Constitution+"|Constitution",
	"Intelligence|"+Intelligence+"|Intelligence",
	"Wisdom|"+Wisdom+"|Wisdom",
	"Charisma|"+Charisma+"|Charisma",
	"HP|"+HP+"|Hit Points",
	"THACO|"+THACO+"|THACO (roll to hit AC 0)",
	"AC|"+AC+"|Armor Class",
	"Movement|"+Movement+"|Movement"
)]
[h:abort(status)]

[h: setProperty("MaxHP",HP)]

[H:bar.HealthPC=HP/MaxHP]
[h: setState("Dying", 0)]
[h: setState("Dead", 0)]

[h: bMacro = strformat("[h: args  = 'myID='+currentToken()+';']")]

[h: command=encode(bMacro+"[r: PC_Initiative(args)]")]
[h: macroName = "<img height=20 width=20 src='asset://7f04125e50f1c0b41195a70e4034f4d2'/><br><b>Roll Initiative</b>"]

[h: command=encode(bMacro+"[h: PC_Attack(args)]")]
[h: macroName = "<img height=20 width=20 src='asset://39d77ac0a6b3abf5eeac0b6a945f9923'/><br><b>Attack</b>"]

[h: macroName = "<img height=20 width=20 src='asset://be2c7d84af1fc71e1f6a4cc462de5075' /><br><b>Damage</b>"]
[h: macroName = "<img height=20 width=20 src='asset://7e1db21976b2b32ac7932d6d80f3d538' /><br><b>Heal</b>"]
[h: command=encode("[r: PC_Save()]")]
[h: macroName = "<img height=20 width=20 src='asset://257742d92fe3419989b54649425eedd9' /><br><b>Save</b>"]
[h: command=encode("[r: PC_AbilityCheck()]")]
[h: macroName = "<img height=20 width=20 src='asset://7d03560ff3a3e790ccce0bf4629235ef' /><br><b>Ability Check</b>"]

[h: macroName = "<img height=30 width=30 src='asset://da0548317dc6cb44cf6ace818d432337' /><br><b>Sheet</b>"]
[h,if(!hasMacro(macroName)):createMacro(macroName, bMacro+"[h: CharacterSheet_Open(args)]", "color=orange; fontColor=black; sortBy=1; playerEditable=0; group=1. Character; minWidth=100;")]

[h: macroName = "<img height=30 width=30 src='asset://5044d36d23f9880b19582a2e2f1e04e1' /><br><b>Edit</b>"]
[h,if(!hasMacro(macroName)):createMacro(macroName, bMacro+"[h: PC_EDIT(args)]", "color=orange; fontColor=black; sortBy=2; playerEditable=0; group=1. Character; minWidth=100;")]

[h: macroName = "<img height=30 width=30 src='asset://4a5306ff949f6a162306337d592b7f30' /><br><b>Bags</b>"]

[h: command=encode(bMacro+"[macro('Learn_Memorize_Menu@Lib:Spells'):args]")]
[h: macroName = "<img height=30 width=30 src='asset://fb1b2d53a2c5c62322db79eadfd71669' /><br><b>Study/Prayer</b>"]

[H: CRLF = decode("%0D%0A")]﻿
[h: timeStamp = getTimeStamp()]
[h: setGMNotes(strformat("%{timeStamp} LOG: INITIALIZED%{CRLF}"))]
