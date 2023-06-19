<!-- Character Creation -->
[h: defineFunction("psionicCheck", "Psionic Check@Lib:ADnD1EMacros")]
[h: defineFunction("psionicStrength", "PsionicStrength@Lib:ADnD1EMacros")]

[h: defineFunction("method1", "Method I@Lib:ADnD1EMacros")]
[h: defineFunction("method2", "Method II@Lib:ADnD1EMacros")]

[h: defineFunction("birthTable", "Birth Table@Lib:ADnD1EMacros")]

[h: defineFunction("meleeAttack", "meleeAttack@Lib:ADnD1EMacros")]

<!--Create functions for the attack tables-->
[h: defineFunction("attackTable.cleric", "attackCleric@Lib:ADnD1EMacros")]
[h: defineFunction("attackTable.magic", "attackMagic@Lib:ADnD1EMacros")]
[h: defineFunction("attackTable.fighter", "attackFighter@Lib:ADnD1EMacros")]
[h: defineFunction("attackTable.thief", "attackThief@Lib:ADnD1EMacros")]
[h: defineFunction("attackTable.monster", "attackMonster@Lib:ADnD1EMacros")]
[h: defineFunction("getMonsterLevel", "getMonsterLevel@Lib:ADnD1EMacros")]
[h: defineFunction("testAttack", "attackMonsterTransparent@Lib:ADnD1EMacros")]
<!--Create functions for the saving throw tables-->
<!--Cleric-->
[h: defineFunction("saveTable.cleric", "clericSaves@Lib:ADnD1EMacros")]

[h: defineFunction("saveTable.cleric.breath", "saveClericBreath@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.cleric.petrify", "saveClericPetrify@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.cleric.poison", "saveClericPoison@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.cleric.spell", "saveClericSpell@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.cleric.wand", "saveClericWand@Lib:ADnD1EMacros")]

<!--Fighter-->
[h: defineFunction("saveTable.fighter", "fighterSaves@Lib:ADnD1EMacros")]

[h: defineFunction("saveTable.fighter.breath", "saveFighterBreath@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.fighter.petrify", "saveFighterPetrify@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.fighter.poison", "saveFighterPoison@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.fighter.spell", "saveFighterSpell@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.fighter.wand", "saveFighterWand@Lib:ADnD1EMacros")]

<!--Magic-User-->
[h: defineFunction("saveTable.magic", "magicSaves@Lib:ADnD1EMacros")]

[h: defineFunction("saveTable.magic.breath", "saveMagicBreath@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.magic.petrify", "saveMagicPetrify@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.magic.poison", "saveMagicPoison@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.magic.spell", "saveMagicSpell@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.magic.wand", "saveMagicWand@Lib:ADnD1EMacros")]

<!--Thief-->
[h: defineFunction("saveTable.thief", "thiefSaves@Lib:ADnD1EMacros")]

[h: defineFunction("saveTable.thief.breath", "saveThiefBreath@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.thief.petrify", "saveThiefPetrify@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.thief.poison", "saveThiefPoison@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.thief.spell", "saveThiefSpell@Lib:ADnD1EMacros")]
[h: defineFunction("saveTable.thief.wand", "saveThiefWand@Lib:ADnD1EMacros")]

<!--Create functions for the Ability tables-->
<!--Strength-->
[h: defineFunction("abilityTable.strength", "Strength@Lib:ADnD1EMacros")]
[h: defineFunction("abilityTable.intelligence", "Intelligence@Lib:ADnD1EMacros")]
[h: defineFunction("abilityTable.wisdom", "Wisdom@Lib:ADnD1EMacros")]
[h: defineFunction("abilityTable.dexterity", "Dexterity@Lib:ADnD1EMacros")]
[h: defineFunction("abilityTable.constitution", "Constitution@Lib:ADnD1EMacros")]
[h: defineFunction("abilityTable.charisma", "Charisma@Lib:ADnD1EMacros")]
[h: defineFunction("abilityTable.comeliness", "Comeliness@Lib:ADnD1EMacros")]

<!--Debugging-->
<!-- zEal debugging functions-->
[h: defineFunction("debug", "debug@this", 1, 0)]
[h: defineFunction("displayDebug", "displayDebug@this", 1, 0)]
[h: defineFunction("pause", "pause@this", 1, 0)]

<!-- Create functions for the treasure tables-->
[h: defineFunction("treasureType", "treasureType@Lib:Treasure")]
[h: defineFunction("makeTable", "makeTable@Lib:Treasure")]

[h: tablesList = getTableNames()]

[h, if(!listContains(tablesList,"Scrolls1")):makeTable("Scrolls1")]

onCampaignLoad macro from ADnD1EMacro Library has been run.