[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: newWeaponID = getUnusedWeaponID(myID)]

[h: weaponsEquipped = "none"]
[h: itemTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h: equipmentJSON = getProperty("Equipment_List",myID)]
[h, if(!json.isEmpty(equipmentJSON) && json.type(equipmentJSON) == "OBJECT"), code :{
[h: eqListSorted = json.sort(json.fields(equipmentJSON, 'json'))]
	[foreach(item,eqListSorted,""), code : {
		[h: itemJSON = json.get(equipmentJSON,item)]

		[h: sourceName = json.get(itemJSON,"itemSource")]
		[h: sourceProperty = getLibProperty(itemTag+sourceName,"Lib:Equipment")]
		[h, if(length(sourceProperty)<=0): noSource = 1;noSource = 0]

		[h,if(!noSource && json.get(itemJSON,"itemCatagory")=="Weapon"):weaponsEquipped = listAppend(weaponsEquipped,item)]
	}]
}]

[h: status=input(
	"junkvar|"+newWeaponID+"|Weapon ID| LABEL",
	"weaponName| "+weaponsEquipped+" |Select weapon in inventory used with this Attack| LIST | SELECT=0 VALUE=STRING"
)]
[h:abort(status)]

[h, if (weaponName != 'none'), code :{
	[h: itemJSON = json.get(equipmentJSON,weaponName)]
	[h: weaponSource = json.get(itemJSON,"itemSource")]
};{
	[h: weaponSource = 'none']
}]

[h: args = strformat("myID=%{myID}; name=%{weaponName}; weaponID=%{newWeaponID}; weaponSource=%{weaponSource};")]

[macro("PC_ActiveWeapon_Edit@Lib:Skills:Macros"):args]