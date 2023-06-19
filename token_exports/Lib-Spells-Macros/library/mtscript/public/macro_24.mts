[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(MagicType, SpellName). "+getMacroName()+"@"+getMacroLocation())]

[H: magicType = arg(0) ]
[H: spellName = arg(1) ]

[h: tag_prefix = getLibProperty("ItemTag","Lib:Spells")]
[h: spellTag = strformat("%{tag_prefix}.%{magicType}.%{spellName}")]
[h: spellJson = getLibProperty(spellTag,"Lib:Spells")]

[h: macro.return = spellJson]

