---Arcane Spells ---<br>
[h: magicType = "Arcane"]
<!-- check for 0 - 9th level spells -->
[count(10,"<br>"), code : {
	[h: levelSpell = roll.count]
	[h: spellDBIdx = add(magicType,levelSpell)]
	[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]

	Level [r: levelSpell] spells :
	[r,foreach(Item, spellList,","):Item]
}]

<br>--- Divine Spells ---<br>
[h: magicType = "Divine"]
<!-- check for 0 - 7th level spells -->
[count(8,"<br>"), code : {
	[h: levelSpell = roll.count]
	[h: spellDBIdx = add(magicType,levelSpell)]
	[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]

	Level [r: levelSpell] spells :
	[r,foreach(Item, spellList,","):Item]
}]
<br>
