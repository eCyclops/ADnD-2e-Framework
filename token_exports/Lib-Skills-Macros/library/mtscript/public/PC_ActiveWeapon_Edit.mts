[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: weaponID = getStrProp(arg(0),"weaponID")]

[h: tag = "weapon."+weaponID]
[h: tagProps = getProperty(tag,myID)]
[h: weaponSource = getStrProp(tagProps,"weaponSource",getStrProp(arg(0),"weaponSource",'none'))]

[h: name = getStrProp(tagProps,"name",getStrProp(arg(0),"name",'none'))]

[h: strDamage = getStrProp(tagProps,"strDamage",0)]
[h: strHit = getStrProp(tagProps,"strHit",0)]
[h: dexHit = getStrProp(tagProps,"dexHit",0)]
[h: monkDamage = getStrProp(tagProps,"monkDamage",0)]
[h: racialBonus = getStrProp(tagProps,"racialBonus",0)]
[h: otherBonus = getStrProp(tagProps,"otherBonus",0)]
[h: weaponProf = getStrProp(tagProps,"weaponProf",'none')]
[h: ammoSource = getStrProp(tagProps,"ammoSource",'none')]

[h: ammoList = "none"]
[h: equipmentJSON = getProperty("Equipment_List",myID)]
[h, if(!json.isEmpty(equipmentJSON) && json.type(equipmentJSON) == "OBJECT"), code :{
[h: eqListSorted = json.sort(json.fields(equipmentJSON, 'json'))]
[h, foreach(item,eqListSorted,""), code : {
		[itemJSON = json.get(equipmentJSON,item)]
		[if(json.get(itemJSON,"itemCatagory")=="Ammo"):ammoList = listAppend(ammoList,item)]
	}]
}]

[h: weaponType = 'none']
[h: catTag = getLibProperty("ItemTag","Lib:Equipment")+"_"+weaponSource]
[h: sourceProperty = getLibProperty(catTag,"Lib:Equipment")]

[h: optionsChoiceList = "Save, Copy, Delete"]

[if(weaponSource != 'none' && length(sourceProperty)>0), code :{
	[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,weaponSource);sourceJSON = "{}"]


	[h: weaponType = json.get(sourceJSON,"weaponType")]

	[h: damageSmall = getStrProp(tagProps,"damageSmall",json.get(sourceJSON,"damageSmall"))]
	[h: damageMedium = getStrProp(tagProps,"damageMedium",json.get(sourceJSON,"damageMedium"))]
	[h: damageLarge = getStrProp(tagProps,"damageLarge",json.get(sourceJSON,"damageLarge"))]
	[h: toHit = getStrProp(tagProps,"toHit",json.get(sourceJSON,"tohit"))]
	[h: toDamage = getStrProp(tagProps,"toDamage",json.get(sourceJSON,"todamage"))]
	[h: speed = getStrProp(tagProps,"speed",json.get(sourceJSON,"speed"))]
	[h: ammoSource = getStrProp(tagProps,"ammoSource",json.get(sourceJSON,"ammoSource"))]

	[h, if(name == 'none'):name=weaponSource]
};{
	[h: damageSmall = getStrProp(tagProps,"damageSmall","1d4")]
	[h: damageMedium = getStrProp(tagProps,"damageMedium","1d4")]
	[h: damageLarge = getStrProp(tagProps,"damageLarge","1d4")]
	[h: toHit = getStrProp(tagProps,"toHit",0)]
	[h: toDamage = getStrProp(tagProps,"toDamage",0)]
	[h: speed = getStrProp(tagProps,"speed",0)]
	[h: weaponProf = getStrProp(tagProps,"weaponProf","none")]
	[h: ammoSource = getStrProp(tagProps,"ammoSource","none")]
}]


[h: weaponProfs = listSort(json.toList(getProperty("Profs_Combat",myID)),"A")]
[h: weaponProfs = listInsert(weaponProfs,0, "none")]
[h,if(listContains(weaponProfs,weaponProf)):profLoc = listFind(weaponProfs,weaponProf);profLoc = 0]

[h,if(listContains(ammoList,ammoSource)):ammoLoc = listFind(ammoList,ammoSource);ammoLoc = 0]
[h,if(weaponType == 'Ranged' || weaponSource == 'none'):
	ammoInput = "ammoSource|"+ammoList+"|Select ammo to use with attacks| LIST | SELECT="+ammoLoc+" VALUE=STRING";
	ammoInput = "junkvar | NA | Ammo Source | LABEL"]

[h: isMonk = listContains(lower(getStrProp(getProperty("Character_Details", myID), "Class")),"monk")]
[h: monkDamageOption = ""]
[h, if(isMonk > 0):
  monkDamageOption = "monkDamage|"+monkDamage+"|Add monk weapon damage|CHECK";
  monkDamageOption = "junkvar| NA |Add monk weapon damage|LABEL"]

[h: status=input(
	"junkvar|"+weaponSource+" ("+weaponID+")|Weapon Source| LABEL",
	"name|"+name+"|Attack name",
	"speed|"+speed+"|Speed factor",
	"toHit|"+toHit+"|To hit modifier",
	"toDamage|"+toDamage+"|Damage modifier",
	"damageSmall|"+damageSmall+"|Damage for small targets",
	"damageMedium|"+damageMedium+"|Damage for medium targets",
	"damageLarge|"+damageLarge+"|Damage for large targets",

	ammoInput,

	"separator|<html><b>--- Proficiency Used ---</b></html>||LABEL|SPAN=TRUE",
	"weaponProf| "+weaponProfs+" |Select proficiency training used with this Attack| LIST | SELECT="+profLoc+" VALUE=STRING",

	"seperator|<html><b>--- Optional ---</b></html>||LABEL|SPAN=TRUE",
	"racialBonus|"+racialBonus+"| Apply racial bonuses |CHECK",
	"otherBonus|"+otherBonus+"| Apply other bonuses |CHECK",
	"strHit|"+strHit+"|Add strength bonus to hit|CHECK",
	"strDamage|"+strDamage+"|Add strength bonus to damage|CHECK",
	"dexHit|"+dexHit+"|Add dexterity bonus to hit|CHECK",
  
	monkDamageOption,

	"separator|<html><b>--- Options ---</b></html>||LABEL|SPAN=TRUE",
	strformat('selectChoice| %{optionsChoiceList}  | Choose | RADIO | ORIENT=V SELECT=0 VALUE=STRING')
)]
[h:abort(status)]

[if(selectChoice == "Delete"), code :{
	[macro("deleteActiveWeapon@Lib:Skills:Macros"):strformat("myID=%{myID}; weaponID=%{weaponID};")]
};{}]

[h: 'Save current weaponID even if copying']
[if(selectChoice == "Save" || selectChoice == "Copy" ), code :{
	[h: args = 
	"myID="+myID+";"+
	"weaponID="+weaponID+";"+
	"weaponSource="+weaponSource+";"+
	"name="+name+";"+
	"speed="+speed+";"+
	"toHit="+toHit+";"+
	"toDamage="+toDamage+";"+
	"damageSmall="+damageSmall+";"+
	"damageMedium="+damageMedium+";"+
	"damageLarge="+damageLarge+";"+
	"weaponProf="+weaponProf+";"+
	"strHit="+strHit+";"+
	"strDamage="+strDamage+";"+
	"dexHit="+dexHit+";"+
	"monkDamage="+monkDamage+";"+
	"racialBonus="+racialBonus+";"+
	"otherBonus="+otherBonus+";"+
	"ammoSource="+ammoSource+";"+
	]

	[macro("addActiveWeapon@Lib:Skills:Macros"):args]
};{}]

[h: 'Copy current to new weaponID and open edit']
[if(selectChoice == "Copy"), code :{
	[h: newWeaponID = getUnusedWeaponID(myID)]
	
	[h: args = 
	"myID="+myID+";"+
	"weaponID="+newWeaponID+";"+
	"weaponSource="+weaponSource+";"+
	"name="+name+" (copy);"+
	"speed="+speed+";"+
	"toHit="+toHit+";"+
	"toDamage="+toDamage+";"+
	"damageSmall="+damageSmall+";"+
	"damageMedium="+damageMedium+";"+
	"damageLarge="+damageLarge+";"+
	"weaponProf="+weaponProf+";"+
	"strHit="+strHit+";"+
	"strDamage="+strDamage+";"+
	"dexHit="+dexHit+";"+
	"monkDamage="+monkDamage+";"+
	"racialBonus="+racialBonus+";"+
	"otherBonus="+otherBonus+";"+
	"ammoSource="+ammoSource+";"+
	]
	[macro("addActiveWeapon@Lib:Skills:Macros"):args]
	[macro("PC_ActiveWeapon_Edit@Lib:Skills:Macros"):args]
};{}]