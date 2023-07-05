[h: memorizedSpells = arg(0)]

[h: spellNames = json.fields(memorizedSpells)]

[h: sortedSpells = "{}"]

[foreach(spell, spellNames, ""), code: {
  [h: spellLvl = json.get(json.get(memorizedSpells,spell),"level")]
  [h: spellCount = json.get(json.get(memorizedSpells,spell),"count")]

  [h, if(json.contains(sortedSpells, spellLvl)), code: {
    [h: levelList = json.get(sortedSpells, spellLvl)]
  }; {
    [h: levelList = ""]
  }]
  
  [h, count(spellCount), code: {
    [h: levelList = listAppend(levelList, spell)]
  }]
  [h: sortedSpells = json.set(sortedSpells, spellLvl, levelList)] 
}]

[h: macro.return = sortedSpells]