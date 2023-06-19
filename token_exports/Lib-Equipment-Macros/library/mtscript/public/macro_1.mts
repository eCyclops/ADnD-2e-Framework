//add
[h: myID = getStrProp(arg(0),"myID")]

[h: catagory = getStrProp(arg(0),"catagory")]
[h: item = getStrProp(arg(0),"item")]
[h: item = lower(item)]
[h: storeThis = ""]

[h: weight = getStrProp(arg(0),"weight",0)]
[h: isContainer = getStrProp(arg(0),"isContainer",0)]
[h: max_weight_carried = getStrProp(arg(0),"max_weight_carried",0)]
[h: weaponType = getStrProp(arg(0),"weaponType",'Slashing')]
[h: ac = getStrProp(arg(0),"ac",0)]
[h: armorType = getStrProp(arg(0),"armorType",'Non-Bulky')]
[h: damageSmall = getStrProp(arg(0),"damageSmall","1d4")]
[h: damageMedium = getStrProp(arg(0),"damageMedium","1d4")]
[h: damageLarge = getStrProp(arg(0),"damageLarge","1d4")]
[h: tohit = getStrProp(arg(0),"tohit",0)]
[h: todamage = getStrProp(arg(0),"todamage",0)]
[h: description = getStrProp(arg(0),"description","")]
[h: wt_reduction = getStrProp(arg(0),"wt_reduction","")]
[h: hasCharges = getStrProp(arg(0),"hasCharges",0)]

[h: rangeShort = getStrProp(arg(0),"rangeShort",0)]
[h: rangeMedium = getStrProp(arg(0),"rangeMedium",0)]
[h: rangeLong = getStrProp(arg(0),"rangeLong",0)]

[h: shortName = getStrProp(arg(0),"shortName","Np")]
[h: baseCoinValue = getStrProp(arg(0),"baseCoinValue","1")]

[h: speed = getStrProp(arg(0),"speed","1")]
[h: numberPages = getStrProp(arg(0),"numberPages","0")]

[h: value = getStrProp(arg(0),"value","worthless")]

[h: weaponSize = getStrProp(arg(0),"weaponSize","Small")]

[h: armorSaveAdj = getStrProp(arg(0),"armorSaveAdj",0)]

[h: OLDcatTag = item+"_"]
[h: catTag = getLibProperty("ItemTag","Lib:Equipment")+"_"+item]

[h: indexThis = json.set("{}","catagory",catagory)]

[h: storeThis = json.set("{}", 
	"weight",weight,
	"isContainer",isContainer,
	"max_weight_carried",max_weight_carried, 
	"weaponType",weaponType,
	"ac",ac,
	"armorType",armorType,
	"damageSmall",damageSmall,
	"damageMedium",damageMedium,
	"damageLarge",damageLarge,
	"tohit",tohit,
	"todamage",todamage,
	"description",description,
	"shortName",shortName,
	"baseCoinValue",baseCoinValue,
	"wt_reduction",wt_reduction,
	"catagory",catagory,
	"name",item,
	"hasCharges",hasCharges,
	"speed",speed,
	"rangeShort",rangeShort,
	"rangeMedium",rangeMedium,
	"rangeLong",rangeLong,
	"weaponSize",weaponSize,
	"value",value,
	"numberPages",numberPages,
	"armorSaveAdj",armorSaveAdj
)]

[h: currentIndexDB = getLibProperty(catagory,"Lib:Equipment")]
[h: setLibProperty(catagory,json.set(currentIndexDB,item,indexThis),"Lib:Equipment")]

[h: currentDB = getLibProperty(catTag,"Lib:Equipment")]

[h, if(!json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"):testObj = json.get(currentDB,item);testObj = '']
[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"):isEdit = 1;isEdit = 0]

[h: setLibProperty(catTag,json.set(currentDB,item,storeThis),"Lib:Equipment")]

[h, if(isEdit==1):stateTxt = "Changed";stateTxt= "Added"]
[broadcast(strformat("%{stateTxt} %{item}.<br>"),"gm")]

[if(isFrameVisible("Inventory Management")), code :{
	[macro("Manage Main@Lib:Equipment:Macros"):"catagorySelection="+catagory+";"]
};{}]

[if(isFrameVisible("Tradepost")), code :{
	[macro("Open Tradepost@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
};{}]
