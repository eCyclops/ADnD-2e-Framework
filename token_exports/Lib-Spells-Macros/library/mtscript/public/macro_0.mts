[macro("askTypeLevel@this"):""]
[h: args = macro.return]

[h: dbTag = getStrProp(args,"dbTag")]
[h: spellDBIdx = getStrProp(args,"spellDBIdx")]
[h: magicType = getStrProp(args,"magicType")]
[h: levelSpell = getStrProp(args,"levelSpell")]
[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]

<!-- Flip through all objects and get properties -->
[r: magicType] level [r: levelSpell] spells :
[r,foreach(Item, spellList,","):Item]
