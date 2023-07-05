[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: outTxt = strformat("<TABLE WIDTH=100%><tr>")]
[h: outTxt = outTxt + strformat("<th>speed</th>")]
[h: outTxt = outTxt + strformat("<th>attack</th>")]
[h: outTxt = outTxt + strformat("<th>hit mod</th>")]
[h: outTxt = outTxt + strformat("<th>dmg</th>")]
[h: outTxt = outTxt + strformat("<th>dmg mod</th>")]
[h: outTxt = outTxt + strformat("<th>edit</th>")]

[h: outTxt = outTxt + strformat("</tr>")]


[h: strAttr = getProperty("Attribute_Strength",myID)]
[h: attr_strToHit = getStrProp(strAttr,"to_hit_adjustment","0")]
[h: attr_strToDam = getStrProp(strAttr,"to_damage_adjustment","0")]

[h: dexAttr = getProperty("Attribute_Dexterity",myID)]
[h: attr_dexToHit = getStrProp(dexAttr,"to_hit_adjustment","0")]

[h: racialToHit = getStrProp(getProperty("racial_weapon",myID),"to hit adjustment","0")]
[h: racialToDam = getStrProp(getProperty("racial_weapon",myID),"to damage adjustment","0")]

[h: otherToHit = getStrProp(getProperty("other_weapon",myID),"to hit adjustment","0")]
[h: otherToDam = getStrProp(getProperty("other_weapon",myID),"to damage adjustment","0")]

[H, token(myID): myWeapons = getMatchingProperties("weapon..*")]

[h: myWeaponsSorted = '']
[h: myWeaponsJSON = '']
[h, foreach(prop,myWeapons,""), code :{
	[h:weaponProp = getProperty(prop,myID)]
	[h:weaponName = getStrProp(weaponProp,"name","none")]
	[h:weaponID = getStrProp(weaponProp,"weaponID","none")]
	[h:storeThis = json.set("{}","weaponName",weaponName,"weaponID",weaponID,"weaponProp",weaponProp)]
	[h, if(length(weaponProp) > 1): myWeaponsJSON = json.set(myWeaponsJSON,weaponName,storeThis)]
}]


[h, if (!json.isEmpty(myWeaponsJSON)), code :{
	[h: myWeaponsSorted = json.sort(json.fields(myWeaponsJSON, 'json'))]
};{
	[h: myWeaponsSorted = '{}']
}]

[h: class = "oddRow"]
[h: EQTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]
[h, foreach(thisWeapon,myWeaponsSorted,""), code :{
		[h: thisJSON = json.get(myWeaponsJSON,thisWeapon)]
		[h: prop = json.get(thisJSON,"weaponProp")]
		[h: weaponID = getStrProp(prop,"weaponID",0)]
		[h: name = getStrProp(prop,"name",0)]

		[h: weaponSource = getStrProp(prop,"weaponSource",0)]
		
		[h: sourceProperty = getLibProperty(EQTag+weaponSource,"Lib:Equipment")]
		[h, if(length(sourceProperty)>0): sourceJSON = json.get(sourceProperty,weaponSource);sourceJSON = "{}"]
		[h, if(length(sourceProperty)<=0): noSource = 1;noSource =0]
		[h, if(weaponSource == '' || weaponSource == 'none'): sourceJSON = '{}' ]
			
		[h, if(!noSource && !json.isEmpty(sourceJSON) && json.type(sourceJSON) == 'OBJECT'), code :{
			[h: weaponSize = json.get(sourceJSON,"weaponSize")]
			[h: weaponType = json.get(sourceJSON,"weaponType")]
			[h: rangeShort = json.get(sourceJSON,"rangeShort")]
			[h: rangeMedium = json.get(sourceJSON,"rangeMedium")]
			[h: rangeLong = json.get(sourceJSON,"rangeLong")]
			[h: rangeTxt = strformat('%{rangeShort}/%{rangeMedium}/%{rangeLong}') ]
			[h, if (weaponType != 'Ranged'): rangeTxt = 'na']
		};{
			[h: weaponSize = 'na']
			[h: rangeTxt = 'na']
		}]

		[h, if (noSource && weaponSource != 'none'), code:{
			[h: weaponSize = 'MISSING FROM DB']
		};{}]
		
		[h: speed = getStrProp(prop,"speed",0)]
		[h: toHit = getStrProp(prop,"toHit",0)]
		[h: toDamage = getStrProp(prop,"toDamage",0)]
		[h: damageSmall = getStrProp(prop,"damageSmall",0)]
		[h: damageMedium = getStrProp(prop,"damageMedium",0)]
		[h: damageLarge = getStrProp(prop,"damageLarge",0)]
		[h: weaponProf = getStrProp(prop,"weaponProf",0)]
		[h: ammoSource = getStrProp(prop,"ammoSource","none")]

		[h, if(ammoSource != '' && ammoSource != 'none'), code :{
			[h: currentEQ = getProperty("Equipment_List",myID)]
			[h, if(!json.isEmpty(currentEQ) && json.type(currentEQ) == "OBJECT"):testObj = json.get(currentEQ,ammoSource);testObj = '{}']
				[h: ammoOrigin = json.get(testObj,"itemSource")]
			[h: ammoSourceJSON = json.get(getLibProperty(EQTag+ammoOrigin,"Lib:Equipment"),ammoOrigin)]
		};{
			[h: ammoSourceJSON = '{}']
		}]
		
		[h, if(!json.isEmpty(ammoSourceJSON) && json.type(ammoSourceJSON) == 'OBJECT'), code :{

			[h: toHit = toHit + json.get(ammoSourceJSON,"tohit")]
			[h: toDamage = toDamage + json.get(ammoSourceJSON,"todamage")]
			[h: damageSmall = json.get(ammoSourceJSON,"damageSmall")]
			[h: damageMedium = json.get(ammoSourceJSON,"damageMedium")]
			[h: damageLarge = json.get(ammoSourceJSON,"damageLarge")]
			
			[h: rangeShort = json.get(ammoSourceJSON,"rangeShort")]
			[h: rangeMedium = json.get(ammoSourceJSON,"rangeMedium")]
			[h: rangeLong = json.get(ammoSourceJSON,"rangeLong")]
			[h: rangeTxt = strformat('%{rangeShort}/%{rangeMedium}/%{rangeLong}') ]
			[h, if (weaponType != 'Ranged' && weaponSource != 'none'): rangeTxt = 'na']
		};{
		}]


		[h: strHit = getStrProp(prop,"strHit",0)]
		[h, if(strHit):strHit = attr_strToHit;strHit = 0]
		[h: strDamage = getStrProp(prop,"strDamage",0)]
		[h, if(strDamage):strDamage = attr_strToDam;strDamage = 0]
		[h: dexHit = getStrProp(prop,"dexHit",0)]
		[h, if(dexHit):dexHit = attr_dexToHit;dexHit = 0]

		[h: racialBonus = getStrProp(prop,"racialBonus",0)]
		[h,if(racialBonus):raceHit = racialToHit;raceHit = 0)]
		[h,if(racialBonus):raceDamage = racialToDam;raceDamage = 0)]

		[h: otherBonus = getStrProp(prop,"otherBonus",0)]
		[h,if(otherBonus):otherHit = otherToHit;otherHit = 0)]
		[h,if(otherBonus):otherDamage = otherToDam;otherDamage = 0)]

		[h: profListJSON = getProperty("Profs_Combat",myID)]
		[h,if(!json.isEmpty(profListJSON) && json.type(profListJSON) == "OBJECT"): profJSON = json.get(profListJSON,weaponProf); profJSON = '']
		[h,if(!json.isEmpty(profJSON) &&  json.type(profJSON) == "OBJECT"), code :{
			[h: profHit = json.get(profJSON,"toHit")]
			[h: profDamage = json.get(profJSON,"toDamage")]
		};{
			[h: profHit = 0]
			[h: profDamage = 0]
		}]

		[h: totalHitMod = profHit+strHit+dexHit+raceHit+otherHit+toHit]
		[h, if(totalHitMod>=0):totalHitSym = "+";totalHitSym = "")]
		[h: totalHitTable = "
			<table width='100%' border='1' cellpading='1'>
				<th>Modifier</th><th>Hit Bonus</th>
				<tr><td>Proficiency</td><td text-align='right'>"+profHit+"</td></tr>
				<tr><td>Strength</td><td>"+strHit+"</td></tr>
				<tr><td>Dexterity</td><td>"+dexHit+"</td></tr>
				<tr><td>Racial</td><td>"+raceHit+"</td></tr>
				<tr><td>Weapon</td><td>"+toHit+"</td></tr>
				<tr><td>Other</td><td>"+otherHit+"</td></tr>
				<tr><td>Total</td><td>"+totalHitMod+"</td>
			</table>
		"]
		[h: toHitToolTip = toolTipIt(strformat(totalHitTable),totalHitMod)]
		
		[h: totalDmgMod = toDamage+strDamage+profDamage+raceDamage+otherDamage]
		[h, if(totalDmgMod>=0):totalDmgSym = "+";totalDmgSym = "-")]
		[h: totalDmgTable = "
			<table width='100%' border='1' cellpading='1'>
				<th>Modifier</th><th>Damage</th>
				<tr><td>Proficiency</td><td text-align='right'>"+profDamage+"</td></tr>
				<tr><td>Strength</td><td>"+strDamage+"</td></tr>
				<tr><td>Racial</td><td>"+raceDamage+"</td></tr>
				<tr><td>Weapon</td><td>"+toDamage+"</td></tr>
				<tr><td>Other</td><td>"+otherDamage+"</td></tr>
				<tr><td>Total</td><td>"+totalDmgMod+"</td>
			</table>
		"]
		[h: toDamageToolTip = toolTipIt(strformat(totalDmgTable),totalDmgMod)]

		[h: initLink = macroLink(speed, 'DO_Initiative@Lib:ADND','none',strformat("myID=%{myID}; initiativeAction=Attack with %{name}; initiativeModifier=%{speed};"),myID)]
		[h: initLink = toolTipIt("Click to roll initiative using "+name,initLink)]

		[h: editLink = macroLink("edit", 'PC_ActiveWeapon_Edit@Lib:Skills:Macros','none',strformat("myID=%{myID}; weaponID=%{weaponID};"),myID)]
		[h: editLink = toolTipIt("Click to edit "+name,editLink)]

		[h: args = 
			'weaponList='+weaponID+';'+
			'myID='+myID+';'+
		]

		[h: additionalStatsTable = "
			<table width='100%' border='1' cellpading='1'>
				<tr><td>Proficiency</td><td text-align='right'>"+weaponProf+"</td></tr>
				<tr><td>Size</td><td>"+weaponSize+"</td></tr>
				<tr><td>Range</td><td>"+rangeTxt+"</td></tr>
			</table>"]
		
		[h: attackLink = macroLink(name, 'DO_Attack@Lib:ADND','none',args,myID)]
		[h: attackLink = toolTipIt("Click to use "+name+" attack.<br>"+additionalStatsTable,attackLink)]

		[h: dmgDice = if(damageSmall == damageMedium && damageSmall == damageLarge, damageSmall, damageSmall+" to "+damageLarge)]
		[h: dmgSMLTable = "
			<table width='100%' border='1' cellpading='1'>
				<tr><td>Small</td><td>"+damageSmall+"</td></tr>
				<tr><td>Medium</td><td>"+damageMedium+"</td></tr>
				<tr><td>Large</td><td>"+damageLarge+"</td></tr>
			</table>
		"]
		[h: dmgDiceTooltip = toolTipIt(dmgSMLTable,dmgDice)]
		
		[h: outTxt = outTxt + strformat("<tr class=%{class}>")]
		[h: outTxt = outTxt + strformat("<td align=center>%{initLink}</td>")]
		[h: outTxt = outTxt + strformat("<td align=center>%{attackLink}</td>")]
		[h: outTxt = outTxt + strformat("<td align=center>%{totalHitSym}%{toHitToolTip}</td>")]
		[h: outTxt = outTxt + strformat("<td align=center>%{dmgDiceTooltip}</td>")]
		[h: outTxt = outTxt + strformat("<td align=center>%{totalDmgSym}%{toDamageToolTip}</td>")]
		[h: outTxt = outTxt + strformat("<td align=center>%{editLink}</td>")]

		[h, if(prop!=''): outTxt = outTxt + strformat("</tr>");]

		[h: class = if(class=="oddRow" && prop!='', "evenRow", "oddRow")]
}]


[h: addWeaponToolTip = toolTipIt("Add weapon or attack.","+add")]
[h: addLink = macroLink(addWeaponToolTip, 'PC_ActiveWeapon_Add@Lib:Skills:Macros','none',strformat("myID=%{myID};"),myID)]
[h: outTxt = concat(outTxt, strformat("</tr></TABLE><table width=100%><td bgcolor=yellow align=center>%{addLink}</td></table>"))]

[r: outTxt]