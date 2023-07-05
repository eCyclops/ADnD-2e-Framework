[h: myID = getStrProp(arg(0),"myID")]

[h: catagory = getStrProp(arg(0),"catagory")]
[h: originalCatagory = catagory]
[h: item = getStrProp(arg(0),"item","Unknown")]

[h: currentDBIndex = getLibProperty(catagory,"Lib:Equipment")]
[h: tag  = getLibProperty("ItemTag","Lib:Equipment")+"_"+item]
[h: currentDB = getLibProperty(tag,"Lib:Equipment")]

[h: catList = getLibProperty("Catagories","Lib:Equipment")]
[h: typeWeaponList = getLibProperty("TypeWeapon","Lib:Equipment")]
[h: typeArmorBulkList = getLibProperty("TypeArmorBulk","Lib:Equipment")]
[h: typeSizeList = getLibProperty("TypeSize","Lib:Equipment")]

[h: weaponType='Slashing']

[h, if(!json.isEmpty(currentDB) && json.type(currentDB) == "OBJECT"):testObj = json.get(currentDB,item);testObj = '']

[h, if(!json.isEmpty(testObj) && json.type(testObj) == "OBJECT"), code :{
	[h: weight = json.get(testObj,"weight")]
	[h: isContainer = json.get(testObj,"isContainer")]
	[h: max_weight_carried = json.get(testObj,"max_weight_carried")]
	[h: weaponType = json.get(testObj,"weaponType")]
	[h: ac = json.get(testObj,"ac")]
	[h: armorType = json.get(testObj,"armorType")]
	[h: damageSmall = json.get(testObj,"damageSmall")]
	[h: damageMedium = json.get(testObj,"damageMedium")]
	[h: damageLarge = json.get(testObj,"damageLarge")]
	[h: tohit = json.get(testObj,"tohit")]
	[h: todamage = json.get(testObj,"todamage")]
	[h: description = json.get(testObj,"description")]
	[h: shortName = json.get(testObj,"shortName")]
	[h: baseCoinValue = json.get(testObj,"baseCoinValue")]
	[h: wt_reduction = json.get(testObj,"wt_reduction")]
	[h: hasCharges = json.get(testObj,"hasCharges")]
	[h: speed = json.get(testObj,"speed")]
	[h: numberPages = json.get(testObj,"numberPages")]
	[h: weaponSize = json.get(testObj,"weaponSize")]
	[h: value = json.get(testObj,"value")]

	[h: rangeShort = json.get(testObj,"rangeShort")]
	[h: rangeMedium = json.get(testObj,"rangeMedium")]
	[h: rangeLong = json.get(testObj,"rangeLong")]
	[h: newEntry = 0]

	[h: armorSaveAdj = json.get(testObj,"armorSaveAdj")]

};{
	[h: weight = 0]
	[h: isContainer = 0]
	[h: max_weight_carried = 0]
	[h: weaponType='Slashing']
	[h: ac = 0]
	[h: armorType='Non-Bulky']
	[h: damageSmall = "1d4"]
	[h: damageMedium = "1d4"]
	[h: damageLarge = "1d4"]
	[h: tohit = 0]
	[h: todamage = 0]
	[h: description = "?"]
	[h: shortName = "a item"]
	[h: baseCoinValue = 1]
	[h: wt_reduction = 0]
	[h: hasCharges = 0]
	[h: speed = 1]
	[h: numberPages = 1]
	[h: rangeShort = 0]
	[h: rangeMedium = 0]
	[h: rangeLong = 0]
	[h: weaponSize = "Small"]
	[h: value = "unknown"]
	[h: newEntry = 1]

	[h: armorSaveAdj = 0]
}]
	
<!-- item type/catagory -->
[h: catagoryTypeInput2 = '<table border=1 cellpadding=5><caption>Item Catagory</caption><tr>']
[h, foreach(catagoryType, catList,""), code :{
	[if(catagoryType != catagory), code :{
		[catagoryTypeInput2 = concat(catagoryTypeInput2,strformat('<td><input type="radio" name="catagory" value="%{catagoryType}">%{catagoryType}</td>'))]
	};{
		[catagoryTypeInput2 = concat(catagoryTypeInput2,strformat('<td><input type="radio" name="catagory" checked="checked" value="%{catagoryType}">%{catagoryType}</td>'))]
	}]
}]
[h: catagoryTypeInput2 = concat(catagoryTypeInput2,strformat('</tr></table>'))]

<!-- weaponType -->
[h: weaponTypeInput = '<table><td>Type</td><td><select name="weaponType" size="">']
[h: foundType = 0]
[h, foreach(listType, typeWeaponList,""), code :{
	[if(listType != weaponType), code :{
		[weaponTypeInput = concat(weaponTypeInput,strformat('<option>%{listType}</option>'))]
	};{
		[weaponTypeInput = concat(weaponTypeInput,strformat('<option selected="selected">%{listType}</option>'))]
		[foundType = 1]
	}]
}]
[h, if(foundType != 1): weaponTypeInput = concat(weaponTypeInput,strformat('<option selected="selected">Slashing</option>'))]
[h: weaponTypeInput = concat(weaponTypeInput,strformat('</select></td></table>'))]


<!-- itemSize -->
[h: itemSizeInput = '<table><td>Size</td><td><select name="weaponSize" size="">']
[h: foundType = 0]
[h, foreach(listType, typeSizeList,""), code :{
	[if(listType != weaponSize), code :{
		[itemSizeInput = concat(itemSizeInput,strformat('<option>%{listType}</option>'))]
	};{
		[itemSizeInput = concat(itemSizeInput,strformat('<option selected="selected">%{listType}</option>'))]
		[foundType = 1]
	}]
}]
[h, if(foundType != 1): itemSizeInput = concat(itemSizeInput,strformat('<option selected="selected">Small</option>'))]
[h: itemSizeInput = concat(itemSizeInput,strformat('</select></td></table>'))]

<!-- armorType -->
[h: armorTypeInput = '<table><td>Armor Bulk</td><td><select name="armorType" size="">']
[h: foundType = 0]
[h, foreach(listType, typeArmorBulkList,""), code :{
	[if(listType != armorType), code :{
		[armorTypeInput = concat(armorTypeInput,strformat('<option>%{listType}</option>'))]
	};{
		[armorTypeInput = concat(armorTypeInput,strformat('<option selected="selected">%{listType}</option>'))]
		[foundType = 1]
	}]
}]
[h, if(foundType != 1): armorTypeInput = concat(armorTypeInput,strformat('<option selected="selected">Non-Bulky</option>'))]
[h: armorTypeInput = concat(armorTypeInput,strformat('</select></td></table>'))]

[h, if(isContainer): isChecked = strformat('checked="checked"'); isChecked='']
[h: isContainerInput = 	strformat('<table border=0><td><b>Container</b></td><td><input type="checkbox" name="isContainer" value="true" %{isChecked}></td></table>')]

[h, if(hasCharges): isChecked = strformat('checked="checked"'); isChecked='']
[h: hasChargesInput = 	strformat('<table border=0><td><b>Has Charges</b></td><td><input type="checkbox" name="hasCharges" value="true" %{isChecked}></td></table>')]

[h: deleteInput = 	strformat('<table border=0><tr align=left><td><b>Delete?</b></td><td><input type="checkbox" name="delete" value="true"></td></tr></table>')]

[h: hiddenInput = strformat(
	'<input type="hidden" name="newEntry" value="%{newEntry}">'+
	'<input type="hidden" name="originalCatagory" value="%{originalCatagory}">'+
	'<input type="hidden" name="myID" value="%{myID}">'+
	'<input type="hidden" name="numberPages" value="%{numberPages}">'
)]

<!-- textarea box -->
[h: decodedDescription = decode(description)]
[h: descriptionInput = strformat('<textarea rows="20" cols="80" name="description">%{decodedDescription}</textarea>')]


[h: formMacroText = macroLinkText("editFormParse@Lib:Equipment:Macros","none")]

[h: outTxt = '<html><head>']
[h: outTxt = concat(outTxt,strformat('<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>'))]
[h: outTxt = concat(outTxt,strformat('<meta name="input" content="true"></head><body>'))]
[h: outTxt = concat(outTxt,strformat('<form method="json" name="editObjectInput" action="%{formMacroText}">'))]
[h: outTxt = concat(outTxt,strformat('<table align=left border=0 cellpadding=1><caption><b>%{item}</b></caption>'))]

[h: outTxt = concat(outTxt,
	'<tr align=center><table border=0><tr><td>'+
	buildHTMLInputLine(item,"Name",'item',"25")+'</td><td>'+
	buildHTMLInputLine(decode(shortName),"Short Name (a potion, a sword, cp, gp)",'shortName',"15")+'</td><td>'+
	buildHTMLInputLine(weight,"Weight",'weight',"5")+'</td>'+
	'</tr></table></tr>')]



<!-- general -->
[h: outTxt = concat(outTxt,'<tr align=center><td>'+catagoryTypeInput2+'</td></tr>')]

<!-- weapon specific -->
[h: weaponOutTxt = '']
[h: weaponOutTxt = concat(weaponOutTxt,'<tr align=center><td><table border=1 cellpadding=1><caption>Weapon Details</caption>')]

[h: weaponOutTxt = concat(weaponOutTxt,'<tr><td><table border=0>'+
	weaponTypeInput+'</td><td>'+itemSizeInput+'</td>' + buildHTMLInputLine(speed ,"Speed Factor",'speed',"5") + 
	buildHTMLInputLine(tohit,"To-Hit",'tohit',"5")+buildHTMLInputLine(todamage,"To-Damage",'todamage',"5")+
	'</table></td></tr>')]

[h: weaponOutTxt = concat(weaponOutTxt,'<tr><td><table border=0><tr><td>'+
	'<table border=1><caption>Damage</caption>'+
	buildHTMLInputLine(damageSmall ,"Small",'damageSmall',"5")+
	buildHTMLInputLine(damageMedium ,"Medium",'damageMedium',"5")+
	buildHTMLInputLine(damageLarge,"Large",'damageLarge',"5")+
	'</table></td>')]

[h: weaponOutTxt = concat(weaponOutTxt,'<td><table border=1><caption>Range</caption>'+
	buildHTMLInputLine(rangeShort ,"Short",'rangeShort',"5")+
	buildHTMLInputLine(rangeMedium ,"Medium",'rangeMedium',"5")+
	buildHTMLInputLine(rangeLong,"Long",'rangeLong',"5")+
	'</table></td>'+
	'</tr></table></td></tr>')]
	
[h: weaponOutTxt = concat(weaponOutTxt,'</table></td></tr>')]

[h: outTxt = concat(outTxt,weaponOutTxt)]

<!-- armor specific -->
[h: armorOutTxt = '']
[h: armorOutTxt = concat(armorOutTxt,'<tr align=center><td><table border=1 cellpadding=1><caption>Armor Details</caption>')]
[h: armorOutTxt = concat(armorOutTxt,'<tr><td><table border=0><tr><td>'+armorTypeInput+'</td><td><table border=0>'+buildHTMLInputLine(ac,"AC Adjustment",'ac',5)+'</table></td></tr></table></td></tr>')]
[h: armorOutTxt = concat(armorOutTxt,'<tr><td><table border=0><tr><td>'+buildHTMLInputLine(armorSaveAdj,"Armor Saving Throw Adjustment",'armorSaveAdj')+'</td></tr></table></td></tr>')]
[h: armorOutTxt = concat(armorOutTxt,'</table></td></tr>')]
[h: outTxt = concat(outTxt,armorOutTxt)]

<!-- container specific -->
[h: containerOutTxt = '']
[h: containerOutTxt = concat(containerOutTxt,'<tr align=center><td><table border=1 cellpadding=1><caption>Container Details</caption>')]

[h: containerOutTxt = concat(containerOutTxt,'<tr><td><table border=0><tr><td>'+
		isContainerInput+'</td>'+
		'<td><table>'+
		buildHTMLInputLine(max_weight_carried,"Max Wt. Carried",'max_weight_carried',"7")+
		'</table></td></td><table border=0>'+
		buildHTMLInputLine(wt_reduction,"Weight Reduction %",'wt_reduction',"7")+
		'</table></td></tr></table></td></tr>')]
		
[h: containerOutTxt = concat(containerOutTxt,'</table></td></tr>')]
[h: outTxt = concat(outTxt,containerOutTxt)]

<!-- magic items -->
[h: magicOutTxt = '']
[h: magicOutTxt = concat(magicOutTxt,'<tr align=center><td><table border=1 cellpadding=1><caption>Magic Item Details</caption>')]
[h: magicOutTxt = concat(magicOutTxt,'<tr><td>'+hasChargesInput+'</td></tr>')]
[h: magicOutTxt = concat(magicOutTxt,'</table></td></tr>')]
[h: outTxt = concat(outTxt,magicOutTxt)]

<!-- coin item -->
[h: coinOutTxt = '']
[h: coinOutTxt = concat(coinOutTxt,'<tr align=center><td><table border=1 cellpadding=1><caption>Coin Details</caption>')]
[h: coinOutTxt = concat(coinOutTxt,'<tr><td><table border=0>'+buildHTMLInputLine(baseCoinValue,"Base Coin Value",'baseCoinValue',"7")+'</table></td></tr>')]
[h: coinOutTxt = concat(coinOutTxt,'</table></td></tr>')]
[h: outTxt = concat(outTxt,coinOutTxt)]

<!-- other item -->
[h: otherOutTxt = '']
[h: otherOutTxt = concat(otherOutTxt,'<tr align=center><td><table border=1 cellpadding=1><caption>Other Details</caption>')]
[h: otherOutTxt = concat(otherOutTxt,'<tr><td><table border=0>'+buildHTMLInputLine(value,"Value",'value')+'</table></td></tr>')]
[h: otherOutTxt = concat(otherOutTxt,'</table></td></tr>')]
[h: outTxt = concat(outTxt,otherOutTxt)]

<!-- desc -->
[h: outTxt = concat(outTxt,'<tr align=center><td>'+descriptionInput+'</td></tr>')]

<!-- form finish -->
[h: outTxt = concat(outTxt,hiddenInput)]

[h: outTxt = concat(outTxt,strformat('<tr align=center><td>'+'<table border=0><tr>'+
		'<td align=left>'+deleteInput+'</td><td align=right>'+
		'<input type="submit"  name="Save" value="Submit"> </input>'+
		'</td></tr></table>'+
		'</td></tr>'))]
[h: outTxt = concat(outTxt,strformat('</body>'))]

[frame("Edit Object Frame",'width=900; height=1000; '): {
	[r: outTxt]
}]
