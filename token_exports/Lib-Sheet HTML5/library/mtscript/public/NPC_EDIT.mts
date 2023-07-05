[h: status=input(

	"HD/HP/AC/THACO/etc | Stats | | TAB",
	"HD|"+HD,
	"Level | "+Level+" | Effective level",
	"HP|"+HP, 
	"MaxHP|"+MaxHP, 
	"AC|"+AC,
	"THACO|"+THACO, 
	"Movement|"+Movement,
	"Intel | "+Intel+" | Intelligence ",
	"Alignment | "+Alignment+" | Alignment ",
	"numAttacks | "+numAttacks+" | Number of attacks",
	"Damage | "+Damage+" | Damage of attacks ",
	"SD|"+SD+" | Special Defenses",
	"SA|"+SA+" | Special Attack",
	"MR|"+MR+" | Magic resistances",
	"Size | "+Size+" | Size of creature",
	"Morale | "+Morale+" | Morale",
	"XP|"+XP,

	"Save Values | Saves | | TAB", 
	"aSave|"+getStrProp(save0,"save")+"|"+getStrProp(save0,"name")+"|TEXT|WIDTH=2", 
	"bSave|"+getStrProp(save1,"save")+"|"+getStrProp(save1,"name")+"|TEXT|WIDTH=2", 
	"cSave|"+getStrProp(save2,"save")+"|"+getStrProp(save2,"name")+"|TEXT|WIDTH=2", 
	"dSave|"+getStrProp(save3,"save")+"|"+getStrProp(save3,"name")+"|TEXT|WIDTH=2", 
	"eSave|"+getStrProp(save4,"save")+"|"+getStrProp(save4,"name")+"|TEXT|WIDTH=2", 

	"Treasure rewards found on NPC| Treasure| | TAB", 
	"Treasure_Type | " + Treasure_Type + " | Treasure Found| PROPS",
	"Treasure|"+Treasure+"| Generated upon NPC initilization"

)]
[h:abort(status)]


[h: save0 = setStrProp(save0,"save",aSave)]
[h: save1 = setStrProp(save1,"save",bSave)]
[h: save2 = setStrProp(save2,"save",cSave)]
[h: save3 = setStrProp(save3,"save",dSave)]
[h: save4 = setStrProp(save4,"save",eSave)]

[h,if(SD == '' || SD == 0): setProperty("SD","")]
[h,if(SA == '' || SA == 0): setProperty("SA","")]
[h,if(MR == '' || MR == 0): setProperty("MR","")]

