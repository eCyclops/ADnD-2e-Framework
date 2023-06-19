[h: '<!-- get item information into a simple table html output for viewing. Load "Name" or use provided JSON -->']
[H: numArgs = argCount()]
[h: assert(!(numArgs<1),"To few arguments to function "+getMacroName()+"(Name,[itemJSON]). "+getMacroName()+"@"+getMacroLocation())]

[H: name = arg(0) ]
[h, if(numArgs==2):
	itemJSON = arg(1);
	itemJSON = getITEMJSON(name)]
	
	[if(json.isEmpty(itemJSON)), code :{
		[broadcast(strformat("Count not load %{name}"))]
		[abort()]
	};{}]

[h: '<!-- remove these as we dont want them in the table -->']
[h: "itemJSON = json.remove(itemJSON,'Save')"]

[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]

[h: bgColor = "#FFFFFF"]
[h: catagory = json.get(itemJSON,"catagory")]

[h: outTxt = strformat('<table border=1 cellpadding=0><tr><td><table border=0 cellpadding=0>')]
[h, foreach(key,itemJSON,""), code :{
	[h: addedKey = 0]
	[h: data = json.get(itemJSON,key)]
	[h: cKey = capFirst(key)]

	[if(catagory == "Armor" && (key == "item" || key == "weight" ||  key == "ac" || key=="armorType" || key=="catagory") ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if(catagory == "Ammo" && (key == "item" || key == "weight" || key=="catagory" 
								|| key == "tohit" || key == "todamage" || key == "damageSmall" || key == "damageMedium" || key == "damageLarge" || key == "rangeShort" || key == "rangeMedium" || key == "rangeLong" ) ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if(catagory == "Goods" && (key == "item" || key == "weight" || key=="catagory" 
								|| key == "isContainer" || key == "max_weight_carried" || key == "wt_reduction" ) ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if(catagory == "Weapon" && (key == "item" || key == "weight" || key=="catagory" 
								|| key == "speed" || key == "weaponSize" || key == "weaponType" || key == "tohit" || key == "todamage" || key == "damageSmall" || key == "damageMedium" || key == "damageLarge" || key == "rangeShort" || key == "rangeMedium" || key == "rangeLong" ) ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]
	
	[if(catagory == "Book/Scroll" && (key == "item" || key == "weight" || key=="catagory" || key == "numberPages") ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if(catagory == "Coin" && (key == "item" || key == "weight" || key=="catagory" || key == "baseCoinValue" || key == "shortName") ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if(catagory == "Magic" && (key == "item" || key == "weight" || key=="catagory" || key == "hasCharges"
								|| key == "isContainer" || key == "max_weight_carried" || key == "wt_reduction" ) ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if(catagory == "Valuables" && (key == "item" || key == "weight" || key=="catagory" || key == "value") ), code :{
		[h: outTxt = concat(outTxt,strformat('<tr bgcolor=%{bgColor}><td>%{cKey}</td><td>%{data}</td></tr>'))]
		[h: addedKey = 1]
	};{}]

	[if (addedKey): bgColor = if(bgColor=="#FFFFFF", "#EEEEAA", "#FFFFFF")]
}]

[h: outTxt = concat(outTxt,strformat('</table></td></tr></table>'))]

[h: macro.return = outTxt]