[H: numArgs = argCount()]
[h: assert(!(numArgs<2),"To few arguments to function "+getMacroName()+"(npcJSON, keyNameOfWeapon). "+getMacroName()+"@"+getMacroLocation())]

[H: npcJSON = arg(0) ]
[H: thisTag = arg(1) ]

[h: thisStrProp = json.get(npcJSON,thisTag)]
[h: thisStrProp = decode(thisStrProp)]

[h: thisStrProp = replace(thisStrProp,"&#59",";")]

[h: name = getStrProp(thisStrProp,"name")]
[h: speed = getStrProp(thisStrProp,"speed")]
[h: toHit = getStrProp(thisStrProp,"toHit")]
[h: toDamage = getStrProp(thisStrProp,"toDamage")]
[h: damage = getStrProp(thisStrProp,"damageSmall")]
[h: damageMedium = getStrProp(thisStrProp,"damageMedium")]
[h: damageLarge = getStrProp(thisStrProp,"damageLarge")]

[h: status=input(
	"junkvar | "+thisTag+" | Weapon Source | LABEL",
	"name | "+name+"|Attack name|TEXT|WIDTH=15", 
	"speed | "+speed+"| Attack speed | TEXT|WIDTH=5", 
	"toHit | "+toHit+ "| To hit adjustment | TEXT|WIDTH=5", 
	"toDamage | "+toDamage+"| To damage adjustment | TEXT|WIDTH=5", 
	"damage | "+damage+"| Damage of attack | TEXT|WIDTH=15", 

	"seperator|<html><b>--- REMOVE? ---</b></html>||LABEL|SPAN=TRUE",
	"deleteWeapon| 0 |Remove this weapon?|CHECK"

)]
[h:abort(status)]

[h: thisStrProp = setStrProp(thisStrProp,"name",name)]
[h: thisStrProp = setStrProp(thisStrProp,"speed",speed)]
[h: thisStrProp = setStrProp(thisStrProp,"toHit",toHit)]
[h: thisStrProp = setStrProp(thisStrProp,"toDamage",toDamage)]
[h: thisStrProp = setStrProp(thisStrProp,"damageSmall",damage)]
[h: thisStrProp = setStrProp(thisStrProp,"damageMedium",damage)]
[h: thisStrProp = setStrProp(thisStrProp,"damageLarge",damage)]

[h, if(deleteWeapon), code :{
	[npcJSON = json.remove(npcJSON,thisTag)]
};{
	[npcJSON = json.set(npcJSON,thisTag,encode(thisStrProp) )]
}]

[macro("add@Lib:MM:Macros"):npcJSON]
[macro("edit@Lib:MM:Macros"):npcJSON]
