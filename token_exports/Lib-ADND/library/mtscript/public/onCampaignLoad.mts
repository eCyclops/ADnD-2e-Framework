<!-- User Defined Functions -->
[defineFunction("initPC", "PC_Initialize@Lib:ADND")]
[defineFunction("initNPC", "NPC_Initialize@Lib:ADND")]
[defineFunction("frameSettings", "frameworkSettings@Lib:ADND")]
[defineFunction("C_Settings", "Settings@Lib:ADND")]
[defineFunction("LOG_KILL", "LOG_KILL@Lib:ADND")]
[defineFunction("toolTipIt", "toolTipFormat@Lib:ADND")]
[defineFunction("NPC_Initialization_formProcess", "NPC_Initialization_formProcess@Lib:ADND")]
[defineFunction("initRefresh", "initiative_RefreshInternal@Lib:ADND")]
[defineFunction("showIt", "showIt@Lib:ADND")]
[defineFunction("copyProperties", "copyProperties@Lib:ADND")]
[defineFunction("getUnusedName", "getUnusedName@Lib:ADND")]
[defineFunction("capFirst", "capFirst@Lib:ADND")]
[defineFunction("getTHACOWindow", "getTHACOWindow@Lib:ADND")]
[defineFunction("logIt", "logIt@Lib:ADND")]
[defineFunction("checkPCTokensRolledInit", "checkPCTokensRolledInit@Lib:ADND")]
[defineFunction("getTimeStamp", "getTimeStamp@Lib:ADND")]
[defineFunction("changeDB", "changeDB@Lib:ADND")]
[defineFunction("askYN", "askYN@Lib:ADND")]
[defineFunction("getLifeTimePassedReadable", "getLifeTimePassedReadable@Lib:ADND")]
[defineFunction("getLifeTimePassed", "getLifeTimePassed@Lib:ADND")]

<!-- NPC Functions -->
[defineFunction("NPC_Attack", "NPC_Attack@Lib:ADND")]
[defineFunction("NPC_Damage", "NPC_Damage@Lib:ADND")]
[defineFunction("NPC_Heal", "NPC_Heal@Lib:ADND")]
[defineFunction("NPC_EditWeapons", "NPC_EditWeapons@Lib:ADND")]
[defineFunction("NPC_EDIT", "NPC_EDIT@Lib:ADND")]
[defineFunction("NPC_Save", "NPC_Save@Lib:ADND")]
[defineFunction("NPC_AbilityCheck", "NPC_AbilityCheck@Lib:ADND")]
[defineFunction("NPC_Initialize", "NPC_Initialize@Lib:ADND")]
[defineFunction("NPC_CalcHPandLEVEL", "NPC_CalcHPandLEVEL@Lib:ADND")]
[defineFunction("getNPCCombatWindow", "getNPCCombatWindow@Lib:ADND")]

<!-- PC Functions -->
[defineFunction("INVENTORY_Open", "Invent Main Starter@Lib:inventory")]
[defineFunction("PC_Attack", "PC_Attack@Lib:ADND")]
[defineFunction("PC_Damage", "PC_Damage@Lib:ADND")]
[defineFunction("PC_Heal", "PC_Heal@Lib:ADND")]
[defineFunction("PC_EditWeapons", "PC_EditWeapons@Lib:ADND")]
[defineFunction("PC_EDIT", "PC_EDIT@Lib:ADND")]
[defineFunction("PC_Experience", "PC_Experience@Lib:ADND")]
[defineFunction("PC_AbilityCheck", "PC_AbilityCheck@Lib:ADND")]
[defineFunction("PC_Save", "PC_Save@Lib:ADND")]
[defineFunction("PC_PrivacyMode", "PC_PrivacyMode@Lib:ADND")]

<!-- general -->
[defineFunction("DO_Save", "DO_Save@Lib:ADND")]
[defineFunction("DO_AbilityCheck", "DO_AbilityCheck@Lib:ADND")]
[defineFunction("DO_Skill_Check", "DO_Skill_Check@Lib:ADND")]
[defineFunction("DO_Prof_Check", "DO_Prof_Check@Lib:ADND")]
[defineFunction("Teleport", "Teleport@Lib:ADND")]
[defineFunction("HP_Adjust", "HP_Adjust@Lib:ADND")]
[defineFunction("DO_Attack", "DO_Attack@Lib:ADND")]

<!-- start up -->
[defineFunction("StartUP", "StartUP@Lib:ADND")]

<!-- this is run this way to avoid writing to the Lib during bootup -->
[h: link = macroLinkText("StartUP@Lib:ADND","self")]
[h: execLink(link,1)]