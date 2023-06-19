[h: characterClass = json.get(arg(0), "charClass")]
[h: characterLevel = json.get(arg(0), "charLevel")]

[h: index = 0]
[h: size = listCount(characterClass)]

[h: myBreathSave=999]
[h: myPetrifySave=999]
[h: myPoisonSave=999]
[h: mySpellSave  =999]
[h: myWandSave=999]

[while (index < size, ""), CODE: {
  [h: separateClass = listGet(characterClass, index)]
  [h: separateLevel = listGet(characterLevel, index)]
  [h: index = index+1]

  [h, switch(separateClass), CODE:
    case "ranger": { [saveRolls = saveTable.fighter(separateLevel)] };
    case "fighter": { [saveRolls = saveTable.fighter(separateLevel)] };
    case "paladin": { [saveRolls = saveTable.fighter(separateLevel)] };

    case "cleric": { [saveRolls = saveTable.cleric(separateLevel)] };
    case "druid": { [saveRolls = saveTable.cleric(separateLevel)] };
    case "bard": { [saveRolls = saveTable.cleric(separateLevel)] };

    case "magic-user": { [saveRolls = saveTable.magic(separateLevel)] };
    case "illusionist": { [saveRolls = saveTable.magic(separateLevel)] };

    case "thief": { [saveRolls = saveTable.thief(separateLevel)] };
    case "assassin": { [saveRolls = saveTable.thief(separateLevel)] };
    case "monk": { [saveRolls = saveTable.thief(separateLevel)] };

    case "monster": { [saveRolls = saveTable.monster(separateLevel)] };

    default: { [saveRolls = saveTable.fighter(0)] }
  ]
      
  [h: rolledBreathSave = json.get(saveRolls,"breathSave")]
  [h: rolledPetrifySave = json.get(saveRolls, "petrifySave")]
  [h: rolledPoisonSave = json.get(saveRolls, "poisonSave")]
  [h: rolledSpellSave   = json.get(saveRolls, "spellSave")]
  [h: rolledWandSave  = json.get(saveRolls, "wandSave")]
     
  [h, if(rolledBreathSave < myBreathSave): myBreathSave = rolledBreathSave]
  [h, if(rolledPetrifySave < myPetrifySave): myPetrifySave = rolledPetrifySave]
  [h, if(rolledPoisonSave < myPoisonSave): myPoisonSave = rolledPoisonSave]
  [h, if(rolledSpellSave < mySpellSave): mySpellSave = rolledSpellSave]
  [h, if(rolledWandSave < myWandSave): myWandSave = rolledWandSave]
}]

[h: saveData = json.set("{}", "breath", myBreathSave, "petrify", myPetrifySave, "poison", myPoisonSave, "spell", mySpellSave, "wand", myWandSave)]
[h: macro.return = saveData]