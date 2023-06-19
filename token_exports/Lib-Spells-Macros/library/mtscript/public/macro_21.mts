[H: numArgs = argCount()]
[h: assert(!(numArgs<3),"To few arguments to function "+getMacroName()+"(LevelOfSpell,Arcane|Divine,tokenID). "+getMacroName()+"@"+getMacroLocation())]

[h: level = arg(0) ]
[h: magicType = arg(1) ]
[h: myID = arg(2) ]

[h: slotsTag = strformat('%{magicType}_SpellSlots')]
[h: slotsProp = getProperty(slotsTag,myID)]
[h: maxCanMemorize = getStrProp(slotsProp,strformat('Level %{level}'),0)]

[h: maxUsedSlots = 0]
[h: slotsUsedTag = strformat('%{magicType}_Memorized')]
[h: slotsUsedJSON = getProperty(slotsUsedTag,myID)]
[h, if(!json.isEmpty(slotsUsedJSON) && json.type(slotsUsedJSON) == 'OBJECT'), code :{
	[foreach(spell,slotsUsedJSON,""), code :{
		[thisJSON = json.get(slotsUsedJSON,spell)]
		[thisSlots = json.get(thisJSON,'count')]
		[thisLevel = json.get(thisJSON,'level')]
		[if(thisLevel == level): maxUsedSlots = maxUsedSlots + thisSlots]
	}]
};{
	[h: maxUsedSlots = 0]
}]

[h, if(maxUsedSlots >= maxCanMemorize): canMemorize = 0; canMemorize = 1]
[h, if(isNPC(myID)): canMemorize = 1]

[h: macro.return = canMemorize]

