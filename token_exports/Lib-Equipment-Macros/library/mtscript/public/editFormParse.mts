[h: myID = json.get(arg(0),"myID")]

[h: item = json.get(arg(0),"item")]
[h: 'remove commans from item names because it causes problems']
[h: item = replace(item,",","-")]
[h: arg(0) = json.set(arg(0),"item",item)]

[h: catagory = json.get(arg(0),"catagory")]
[h: originalCatagory = json.get(arg(0),"originalCatagory")]

[h: weight = json.get(arg(0),"weight")]
[h: isContainer = json.get(arg(0),"isContainer")]	[h, if(isContainer == 'true'): isContainer = 1; isContainer = 0][h: arg(0) = json.set(arg(0),"isContainer",isContainer)]
[h: max_weight_carried = json.get(arg(0),"max_weight_carried")]
[h: weaponType = json.get(arg(0),"weaponType")]
[h: ac = json.get(arg(0),"ac")]
[h: armorType = json.get(arg(0),"armorType")]
[h: damageSmall = json.get(arg(0),"damageSmall")]
[h: damageMedium = json.get(arg(0),"damageMedium")]
[h: damageLarge = json.get(arg(0),"damageLarge")]
[h: tohit = json.get(arg(0),"tohit")]
[h: todamage = json.get(arg(0),"todamage")]
[h: description = json.get(arg(0),"description")]
[h: shortName = json.get(arg(0),"shortName")]
[h: baseCoinValue = json.get(arg(0),"baseCoinValue")]
[h: wt_reduction = json.get(arg(0),"wt_reduction")]
[h: hasCharges = json.get(arg(0),"hasCharges")]	[h, if(hasCharges == 'true'): hasCharges = 1; hasCharges = 0] [h: arg(0) = json.set(arg(0),"hasCharges",hasCharges)]
[h: speed = json.get(arg(0),"speed")]
[h: weaponSize = json.get(arg(0),"weaponSize")]
[h: value = json.get(arg(0),"value")]
[h: rangeShort = json.get(arg(0),"rangeShort")]
[h: rangeMedium = json.get(arg(0),"rangeMedium")]
[h: rangeLong = json.get(arg(0),"rangeLong")]

[h: armorSaveAdj = json.get(arg(0),"armorSaveAdj")]

[h: numberPages = json.get(arg(0),"numberPages")]

[h: deleteThis = json.get(arg(0),"delete")]	[h, if(deleteThis == 'true'): deleteThis=1;deleteThis=0] [h: arg(0) = json.set(arg(0),"deleteThis",deleteThis)]
[h: newEntry = json.get(arg(0),"newEntry")]

[h: closeFrame("Edit Object Frame")]

<!-- encode description -->
[h: encodedDescription = encode(json.get(arg(0),"description"))]
[h: arg(0) = json.set(arg(0),"description",encodedDescription)]

[h: encodedShortName = encode(json.get(arg(0),"shortName"))]
[h: arg(0) = json.set(arg(0),"shortName",encodedShortName)]

[h: strProp = json.toStrProp(arg(0))]
[h, if(deleteThis == 1), code : {
  [h: assert( askYN(strformat("Delete %{item}?")) ,strformat("Did not delete %{item}."),0)]
  [h, macro("delete@Lib:Equipment:Macros"):"item="+item+";"+"catagory="+catagory+";"]
};{
  [h, if(originalCatagory != catagory), code :{
    [h: assert( askYN(strformat("Move %{item} to new catagory (%{originalCatagory}->%{catagory})?")) ,strformat("Did not move %{item}."),0)]
    [macro("delete@Lib:Equipment:Macros"):"item="+item+";"+"catagory="+originalCatagory+";"]
  };{}]
  
[h, macro("add@Lib:Equipment:Macros"):strProp]
}]
