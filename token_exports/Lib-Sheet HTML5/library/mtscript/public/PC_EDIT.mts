[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: selectTokens(myID)]

[h: dexAC = getStrProp(getProperty("Attribute_Dexterity"),"ac_adjustment")]

[h: 'set a default deity if key doesnt exist yet.']
[h: Character_Details = setStrProp(Character_Details,"Deity",getStrProp(getProperty("Character_Details"),"Deity","None"))]

[h: status=input(
"Name, Height, Weight, Class, Level | General | | TAB",
"Character_Details | " + Character_Details + " | General Details| PROPS",

"Ability Scores | Stats | | TAB",
"seperator|<html><b>--- Strength ---</b></html>||LABEL|SPAN=TRUE",
"Strength|"+Strength+"|Strength|TEXT|WIDTH=3", 
"Strength_Percent|"+Strength_Percent+"|Strength Percent|TEXT|WIDTH=3", 

"seperator|<html><b>--- Dexterity ---</b></html>||LABEL|SPAN=TRUE",
"Dexterity|"+Dexterity+"|Dexterity|TEXT|WIDTH=3", 

"seperator|<html><b>--- Consitution ---</b></html>||LABEL|SPAN=TRUE",
"Constitution|"+Constitution+"|Constitution|TEXT|WIDTH=3", 

"seperator|<html><b>--- Intelligence ---</b></html>||LABEL|SPAN=TRUE",
"Intelligence|"+Intelligence+"|Intelligence|TEXT|WIDTH=3", 

"seperator|<html><b>--- Wisdom ---</b></html>||LABEL|SPAN=TRUE",
"Wisdom|"+Wisdom+"|Wisdom|TEXT|WIDTH=3", 

"seperator|<html><b>--- Charisma ---</b></html>||LABEL|SPAN=TRUE",
"Charisma|"+Charisma+"|Charisma|TEXT|WIDTH=3", 

"Combat Scores | Combat | | TAB", 
"Armor_Details | " + Armor_Details + " | Armor Details| PROPS",

"THACO|"+THACO+"|THAC0|TEXT|WIDTH=3", 
"HP|"+HP+"|HP|TEXT|WIDTH=3", 
"MaxHP|"+MaxHP+"|Maximum HP|TEXT|WIDTH=3", 
"MagicResistances|"+MagicResistances+"|Magic Resistance|TEXT|WIDTH=5", 
"Movement|"+Movement+"|Move Rate|TEXT|WIDTH=10", 
"racial_weapon | " + racial_weapon + " | Racial weapon bonus| PROPS",
"other_weapon | " + other_weapon + " | Other weapon bonus| PROPS",


"Save Values | Saves | | TAB", 
"aSave|"+getStrProp(save0,"save")+"|"+getStrProp(save0,"name")+"|TEXT|WIDTH=2", 
"bSave|"+getStrProp(save1,"save")+"|"+getStrProp(save1,"name")+"|TEXT|WIDTH=2", 
"cSave|"+getStrProp(save2,"save")+"|"+getStrProp(save2,"name")+"|TEXT|WIDTH=2", 
"dSave|"+getStrProp(save3,"save")+"|"+getStrProp(save3,"name")+"|TEXT|WIDTH=2", 
"eSave|"+getStrProp(save4,"save")+"|"+getStrProp(save4,"name")+"|TEXT|WIDTH=2", 

"Arcane and Divine Spellsl | Spells | | TAB",
"Arcane_SpellSlots | " + Arcane_SpellSlots + " | Arcane Spell Slots| PROPS",
"Divine_SpellSlots | " + Divine_SpellSlots + " | Divine Spell Slots| PROPS",

"Experience Values | EXP | | TAB", 
"XP|"+XP, 
"XPNeeded|"+XPNeeded,

"Settings | Settings | | TAB", 
"PrivacyMode|"+PrivacyMode+"|Do you want your intiative, attack, save and ability check rolls private?|CHECK"

)]
[h:abort(status)]

[h: save0 = setStrProp(save0,"save",aSave)]
[h: save1 = setStrProp(save1,"save",bSave)]
[h: save2 = setStrProp(save2,"save",cSave)]
[h: save3 = setStrProp(save3,"save",dSave)]
[h: save4 = setStrProp(save4,"save",eSave)]

[h, if(getProperty("Base_Strength",myID) == ''): setProperty("Base_Strength",Strength,myID)]
[h, if(getProperty("Base_Strength_Percent",myID) == ''): setProperty("Base_Strength_Percent",Strength_Percent,myID)]

[h, if(getProperty("Base_Dexterity",myID) == ''): setProperty("Base_Dexterity",Dexterity,myID)]
[h, if(getProperty("Base_Dexterity_Percent",myID) == ''): setProperty("Base_Dexterity_Percent",0,myID)]

[h, if(getProperty("Base_Constitution",myID) == ''): setProperty("Base_Constitution",Constitution,myID)]
[h, if(getProperty("Base_Constitution_Percent",myID) == ''): setProperty("Base_Constitution_Percent",0,myID)]

[h, if(getProperty("Base_Intelligence",myID) == ''): setProperty("Base_Intelligence",Intelligence,myID)]
[h, if(getProperty("Base_Intelligence_Percent",myID) == ''): setProperty("Base_Intelligence_Percent",0,myID)]

[h, if(getProperty("Base_Wisdom",myID) == ''): setProperty("Base_Wisdom",Wisdom,myID)]
[h, if(getProperty("Base_Wisdom_Percent",myID) == ''): setProperty("Base_Wisdom_Percent",0,myID)]

[h, if(getProperty("Base_Charisma",myID) == ''): setProperty("Base_Charisma",Charisma,myID)]
[h, if(getProperty("Base_Charisma_Percent",myID) == ''): setProperty("Base_Charisma_Percent",0,myID)]

[h: Level = getStrProp(Character_Details,"Level","0")]

[h: Attribute_Charisma = table("Table_Charisma",Charisma)]
[h: Attribute_Wisdom = table("Table_Wisdom",Wisdom)]
[h: Attribute_Intelligence = table("Table_Intelligence",Intelligence)]
[h: Attribute_Constitution = table("Table_Constitution",Constitution)]
[h: Attribute_Dexterity = table("Table_Dexterity",Dexterity)]
[h: Attribute_Strength = table("Table_Strength",Strength)]
[h,if(Strength == 18 && Strength_Percent > 0), code :{
	[if(Strength_Percent <= 50): Attribute_Strength = table("Table_Strength",50)]
	[if(Strength_Percent <= 75 && Strength_Percent > 50): Attribute_Strength = table("Table_Strength",75)]
	[if(Strength_Percent <= 90  && Strength_Percent > 75): Attribute_Strength = table("Table_Strength",90)]
	[if(Strength_Percent <= 99 && Strength_Percent > 90): Attribute_Strength = table("Table_Strength",99)]
	[if(Strength_Percent == 100): Attribute_Strength = table("Table_Strength",100)]
};{}]

[h: Encumbrance_Table = table("Table_Encumbrance",Strength)]
[h,if(Strength == 18 && Strength_Percent > 0), code :{
	[if(Strength_Percent <= 50): Encumbrance_Table = table("Table_Encumbrance",50)]
	[if(Strength_Percent <= 75 && Strength_Percent > 50): Encumbrance_Table = table("Table_Encumbrance",75)]
	[if(Strength_Percent <= 90  && Strength_Percent > 75): Encumbrance_Table = table("Table_Encumbrance",90)]
	[if(Strength_Percent <= 99 && Strength_Percent > 90): Encumbrance_Table = table("Table_Encumbrance",99)]
	[if(Strength_Percent == 100): Encumbrance_Table = table("Table_Encumbrance",100)]
};{}]

[h: naturalAC = getStrProp(getProperty("Armor_Details"),"Natural",10)]
[h: dexAC= getStrProp(getProperty("Attribute_Dexterity"),"ac adjustment",0)]
[h: armorAC = getStrProp(getProperty("Armor_Details"),"Armor Adjustment",0)]
[h: armorACmag = getStrProp(getProperty("Armor_Details"),"Armor Magical Adjustment",0)]
[h: shieldAC = getStrProp(getProperty("Armor_Details"),"Shield Adjustment",0)]
[h: shieldACmag = getStrProp(getProperty("Armor_Details"),"Shield Magical Adjustment",0)]
[h: adjsAC = dexAC+armorAC+armorACmag+shieldAC+shieldACmag]
[h: finalAC = naturalAC+adjsAC]
[h: setProperty("AC",finalAC)]


[h: pcSheetFrame = strformat('PC:'+getName(myID)+':%{myID}')]
[if(isFrameVisible(pcSheetFrame)), code :{
	[macro("CharSheet@Lib:ADND"):strformat("myID=%{myID}; Page=General;")]
};{}]

