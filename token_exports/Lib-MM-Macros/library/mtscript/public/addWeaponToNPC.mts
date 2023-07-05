[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(npcJSON,damgeDice). "+getMacroName()+"@"+getMacroLocation())]

[H: npcJSON = arg(0) ]
[H: damageDice = arg(1) ]

[h: count = 1]
[h:thisTag = strformat('attack.%{count}')]
[h, while(json.contains(npcJSON,thisTag)), code :{
	[count = count + 1]
	[thisTag = strformat('attack.%{count}')]
}]

[h: npcJSON = json.set(npcJSON,'thisTag',thisTag)]

[h: defaultWeapon = encode(strformat('weaponID=%{count} ; weaponSource=none ; name=attack #%{count} ; speed=5 ; toHit=0 ; toDamage=0 ; damageSmall=%{damageDice} ; damageMedium=%{damageDice} ; damageLarge=%{damageDice} ; weaponProf=none ; strHit=0 ; strDamage=0 ; dexHit=0 ; racialBonus=0 ; otherBonus=0 ;'))]

[h: npcJSON = json.set(npcJSON,thisTag,defaultWeapon)]

[h: macro.return = npcJSON]
