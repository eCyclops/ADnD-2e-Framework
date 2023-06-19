[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: myThaco = getProperty("THACO",myID)]
[h: weaponList = getStrProp(arg(0),"weaponList",0)]


[h: myName = getName(myID)]
[h: cfgSettings = getLibProperty("CFGSettings", "Lib:ADND")]
[h: cTarget = getStrProp(cfgSettings,"usecrit","0")]
[h: fTarget = getStrProp(cfgSettings,"usefumble","0")]
[h: npcCanCrit = getStrProp(cfgSettings,"npcCanCrit","1")]
[h, if(hasProperty("npcCanCrit",myID)):npcCanCrit = getProperty("npcCanCrit",myID)]

[h: EQTag = getLibProperty("ItemTag","Lib:Equipment")+"_"]

[h: bColor = getLibProperty("RotateColor","Lib:ADND")]
[h,if(bColor ==''):bColor="#c1cdcd")]
[h: sColor =bColor]
[h,if(bColor=="#c1cdcd"):bColor="#ffd700";bColor="#c1cdcd"]
[h: setLibProperty("RotateColor", bColor, "Lib:ADND")]

[h: targetID = getSelected()]
[h, if(listCount(targetID)>1): targetID = listGet(targetID,0);targetID = getSelected()]

[H: hasTarget = 0]
[h: targetAC = -100]
[h: targetName = 'NA']

[if(targetID == ''): targetID = myID)]

[if(targetID != myID && hasProperty("AC",targetID)), code : {
    [h: targetAC = getProperty("AC", targetID)]
    [h: targetName = getName(targetID)]
    [h, if ( isNumber(targetAC) ): hasTarget = 1; hasTarget = 0]
};{}]
[h: setState("Struck",0,targetID)]
[h: setState("Red",0,targetID)]

[h: strAttr = getProperty("Attribute_Strength",myID)]
[h: attr_strToHit = getStrProp(strAttr,"to_hit_adjustment","0")]
[h: attr_strToDam = getStrProp(strAttr,"to_damage_adjustment","0")]

[h: dexAttr = getProperty("Attribute_Dexterity",myID)]
[h: attr_dexToHit = getStrProp(dexAttr,"to_hit_adjustment","0")]

[h: racialToHit = getStrProp(getProperty("racial_weapon",myID),"to hit adjustment","0")]
[h: racialToDam = getStrProp(getProperty("racial_weapon",myID),"to damage adjustment","0")]

[h: otherToHit = getStrProp(getProperty("other_weapon",myID),"to hit adjustment","0")]
[h: otherToDam = getStrProp(getProperty("other_weapon",myID),"to damage adjustment","0")]

[h: characterDetails = getProperty("Character_Details", myID)]
[h: isMonk = listContains(lower(getStrProp(characterDetails, "Class")),"monk")]
[h: monkWeaponDamage = 0]
[h, if(isMonk > 0), code: {
  [h: monkListOffset = listFind(lower(getStrProp(characterDetails, "Class")),"monk")]
  [h: characterLevelList = getStrProp(characterDetails, "Level")]
  [h, if(listCount(characterLevelList) - 1 >= monkListOffset):
    monkLevel = listGet(characterLevelList, monkListOffset);
    monkLevel = listGet(characterLevelList, 0)
  ]
  [h: monkWeaponDamage = monkLevel*0.5]
};{}]
[h, if(floor(monkWeaponDamage) == monkWeaponDamage): monkWeaponDamage = floor(monkWeaponDamage)]

[h: "<!-- ************** attack loops should start here, need to build output before this (headers/etc) -->"]
[h: ammoUsed = '']
[foreach(thisWeaponID, weaponList,""), code :{
    [h: weaponTag = strformat("weapon.%{thisWeaponID}")]
    [h: prop = getProperty(weaponTag,myID)]
    [h: weaponID = getStrProp(prop,"weaponID",0)]
    [h: name = getStrProp(prop,"name",0)]

    [h: toHit = getStrProp(prop,"toHit",0)]
    [h: toDamage = getStrProp(prop,"toDamage",0)]
    [h: smallDamageDice = getStrProp(prop,"damageSmall",0)]
    [h: mediumDamageDice = getStrProp(prop,"damageMedium",0)]
    [h: largeDamageDice = getStrProp(prop,"damageLarge",0)]
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
      [h: smallDamageDice = json.get(ammoSourceJSON,"damageSmall")]
      [h: mediumDamageDice = json.get(ammoSourceJSON,"damageMedium")]
      [h: largeDamageDice = json.get(ammoSourceJSON,"damageLarge")]
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

    [h: monkDamage = getStrProp(prop,"monkDamage",0)]
    [h, if(monkDamage): monkDamage = monkWeaponDamage; monkDamage = 0]
    
		[h: effectBonus = 0]
		[h: effectBonusTbl = ""]
		[h: effectDmg = 0]
		[h: effectDmgTbl = ""]
		[h: effectACBonus = ""]
		[h: effectACTbl = ""]
		<!-- Apply attacker effects -->
		[h: myEffectsList = getProperty("stateEffects", myID)]
		[h, foreach(effect, myEffectsList), code: {
		  [h: effectMyToHit = json.get(effect,"myToHit")]
			[h: reverseEffectMyToHit = -effectMyToHit] [h:'<!-- used to adjust the ac correctly -->']
		  [h: effectMyToDmg = json.get(effect,"myToDmg")]
		  [h: effectName = json.get(effect,"name")]

		  <!-- Add the effect to the bonuses -->
		  [h, if(effectMyToHit > 0): effectBonus = effectBonus + effectMyToHit]
		  [h, if(effectMyToHit < 0): effectACBonus = effectACBonus + reverseEffectMyToHit]
		  [h, if(effectMyToDmg > 0): effectDmg = effectDmg + effectMyToDmg]

		  <!-- List the effect in the results table -->
		  [h, if(effectMyToHit > 0): effectBonusTbl = concat(effectBonusTbl,strformat("<tr><td bgcolor=white>%{effectName}</td><td align=right bgcolor=white>%{effectMyToHit}</td></tr>"))]
		  [h, if(effectMyToHit < 0): effectACTbl = concat(effectACTbl,strformat("<tr><td bgcolor=white>%{effectName}</td><td align=right bgcolor=white>%{reverseEffectMyToHit}</td></tr>"))]
		  [h, if(effectMyToDmg > 0): effectDmgTbl = concat(effectDmgTbl,strformat("<tr><td colspan=3 bgcolor=white>%{effectName}</td><td align=right bgcolor=white>%{effectMyToDmg}</td></tr>"))]
		}]

		<!-- Apply target effects -->
		[h, if(targetID != myID): targetEffectsList = getProperty("stateEffects", targetID); targetEffectsList = ""]
		[h, foreach(effect, targetEffectsList), code: {
		  [h: effectTargetToHit = json.get(effect,"toHit")]
			[h: reverseEffectTargetToHit = -effectTargetToHit] [h:'<!-- used to adjust the ac correctly -->']
		  [h: effectTargetToDmg = json.get(effect,"toDmg")]
		  [h: effectName = json.get(effect,"name")]

		  <!-- Add the effect to the bonuses -->
		  [h, if(effectTargetToHit > 0): effectBonus = effectBonus + effectTargetToHit]
		  [h, if(effectTargetToHit < 0): effectACBonus = effectACBonus + reverseEffectTargetToHit]
		  [h, if(effectTargetToDmg > 0): effectDmg = effectDmg + effectTargetToDmg]

		  <!-- List the effect in the results table -->
		  [h, if(effectTargetToHit > 0): effectBonusTbl = concat(effectBonusTbl,strformat("<tr><td bgcolor=white>%{effectName}</td><td align=right bgcolor=white>%{effectTargetToHit}</td></tr>"))]
		  [h, if(effectTargetToHit < 0): effectACTbl = concat(effectACTbl,strformat("<tr><td bgcolor=white>%{effectName}</td><td align=right bgcolor=white>%{reverseEffectTargetToHit}</td></tr>"))]
		  [h, if(effectTargetToDmg > 0): effectDmgTbl = concat(effectDmgTbl,strformat("<tr><td colspan=3 bgcolor=white>%{effectName}</td><td align=right bgcolor=white>%{effectTargetToDmg}</td></tr>"))]
		}]

    [h: profListJSON = getProperty("Profs_Combat",myID)]
    [h,if(!json.isEmpty(profListJSON) && json.type(profListJSON) == "OBJECT"): profJSON = json.get(profListJSON,weaponProf); profJSON = '']
    [h,if(!json.isEmpty(profJSON) &&  json.type(profJSON) == "OBJECT"), code :{
      [h: profHit = json.get(profJSON,"toHit")]
      [h: profDamage = json.get(profJSON,"toDamage")]
    };{
      [h: profHit = 0]
      [h: profDamage = 0]
    }]


    [h: critDamage = 1]

    [h, if(isGM()&& isNPC(myID)): 
      critOverRideTxt = 'seperator|<html><b>--- CRITICAL HIT Override ---</b></html>||LABEL|SPAN=TRUE';
      critOverRideTxt = '']
    [h, if(isGM() && isNPC(myID)): 
      askCanCrit = strformat('npcCanCrit| %{npcCanCrit} | Can NPC Crit?|CHECK');
      askCanCrit = strformat('')]

    [H: status = input(
      "junkvar|"+name+" |Weapon | LABEL",
      "miscHit | 0 | Situational attack modifier",
      "miscDmg | 0 | Situational damage modifier",
      "seperator|<html><b>--- Override ---</b></html>||LABEL|SPAN=TRUE",
      "overRide | 0 | Override d20 roll with 1-20 value",
      critOverRideTxt,
      askCanCrit
    )]
    [H: abort(status)]

  [h: 'use whatever we set to this manually or default for this NPC from now on']
  [h, if(isGM() && isNPC(myID)): setProperty("npcCanCrit",npcCanCrit,myID)]

  [h, if(overRide<1||overRide>20):overRide=0]

  [h: d20roll = 1d20]
  [h, if(overRide>0):d20roll=overRide]
  [h: overRideTxt = toolTipIt(overRide,"OVERRIDE")]
  [h, if( overRide>0 && !isGM() ):overTxt = strformat("(%{overRideTxt}) ");overTxt = ""]
  [h: attackRoll = d20roll]

  [h: totalHitMod = miscHit+profHit+strHit+dexHit+raceHit+otherHit+toHit+effectBonus]
  [h, if(totalHitMod>=0):totalHitSym = "+";totalHitSym = "-")]
  [h: hitMod =totalHitMod]
  [h,if(hitMod>=0): hitModSym = "+";hitModSym = "-")]

  [h: totalHitRoll = attackRoll + hitMod]
  [h: '<!-- Build a table showing any modifiers for the to-hit roll -->']
  [h: toHitModTable = strformat("<table bgcolor=black cellspacing=1 cellpadding=3>
    <tr style='font-weight:bold'><td bgcolor=#d4d4d4>Source</td><td align=right bgcolor=#d4d4d4>Value</td>
    <tr><td bgcolor=white>1d20</td><td align=right bgcolor=white>%{attackRoll}</td></tr>")]
  [h, if(miscHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Situational</td><td align=right bgcolor=white>%{miscHit}</td></tr>"))]
  [h, if(profHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Proficiency</td><td align=right bgcolor=white>%{profHit}</td></tr>"))]
  [h, if(strHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Strength</td><td align=right bgcolor=white>%{strHit}</td></tr>"))]
  [h, if(dexHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Dexterity</td><td align=right bgcolor=white>%{dexHit}</td></tr>"))]
  [h, if(raceHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Racial</td><td align=right bgcolor=white>%{raceHit}</td></tr>"))]
  [h, if(otherHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Other</td><td align=right bgcolor=white>%{otherHit}</td></tr>"))]
  [h, if(toHit != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=white>Weapon</td><td align=right bgcolor=white>%{toHit}</td></tr>"))]
	[h, if (effectBonus != 0): toHitModTable = concat(toHitModTable,effectBonusTbl)]
  [h, if(miscHit != 0 || profHit != 0 || strHit != 0 || dexHit != 0 || raceHit != 0 || otherHit != 0 || toHit != 0 || effectBonus != 0): toHitModTable = concat(toHitModTable,strformat("<tr><td bgcolor=#F0F0F0>Total</td><td align=right bgcolor=#F0F0F0>%{totalHitRoll}</td></tr>"))]
  [h: toHitModTable = concat(toHitModTable,strformat("</table>"))]
	
  [h: totalHitRollToolTip = toolTipIt(toHitModTable,totalHitRoll)]

  [h: totalDmgMod = miscDmg+toDamage+strDamage+profDamage+raceDamage+monkDamage+otherDamage+effectDmg]
  [h, if(totalDmgMod>=0):totalDmgSym = "+";totalDmgSym = "-")]

  [h: dmgMod = totalDmgMod]
  [h,if(dmgMod>=0): dmgModSym = "+";dmgModSym = "-")]

  [h: acHit = myThaco - totalHitRoll]

  [h: meleeArgs = strformat('attackRoll=%{attackRoll}; totalHitMod=%{totalHitMod}; myID=%{myID};')]
  [h: meleeAttackReturn = meleeAttack(meleeArgs)]

  [h: '<!-- This is a patched in attack macro, that has the correct AC numbers and calculates monk stun -->']
  [h: '<!-- Someday, I will integrate it into this code, but for now, I just call it and use the output -->']
  [h: '<!-- Here, I am using it to get the AC. I use it again a little later to get the result for the monk stun -->']
  [h: acHit = getStrProp(meleeAttackReturn, "MyHitAC")]
  [h, if(acHit == 999): acHit = myThaco - totalHitRoll]
	[h: acHitRaw = acHit]
	[h: acHit = acHit + effectACBonus]

	[h: '<!-- Build a table showing any modifiers for the AC -->']
	[h: acModTable = strformat("<table bgcolor=black cellspacing=1 cellpadding=3>
		<tr style='font-weight:bold'><td bgcolor=#d4d4d4>Source</td><td align=right bgcolor=#d4d4d4>Value</td>
		<tr><td bgcolor=white>Rolled AC</td><td align=right bgcolor=white>%{acHitRaw}</td></tr>")]
	[h, if (effectACBonus != 0): acModTable = concat(acModTable,effectACTbl)]
	[h, if(acHitRaw != 0 || effectACBonus != 0): acModTable = concat(acModTable,strformat("<tr><td bgcolor=#F0F0F0>Total</td><td align=right bgcolor=#F0F0F0>%{acHit}</td></tr>"))]
	[h: acModTable = concat(acModTable,strformat("</table>"))]

	[h: totalACToolTip = toolTipIt(acModTable,acHit)]

  [h: critEffect = ""]
  [h: colorAttack = "white"]
  [if(cTarget!=0 && d20roll>=cTarget), code: {
    [h: critDamage = 2]
    [h: colorAttack = "#CC6666"]
	   [h: critEffect = getStrProp(table("Table_Crits"), "hit")]
  };{}]
  [if(fTarget!=0 && d20roll<=fTarget), code: {
    [h: critDamage = 0]
    [h: colorAttack = "CCFF66"]
	   [h: critEffect = getStrProp(table("Table_Crits"), "miss")]
  };{}]

  [h: 'if npc and not allowed to crit we ignore crit and fumble lables/effects']
  [if(isNPC(myID) && !npcCanCrit), code :{
    [h: critDamage = 1]
    [h: colorAttack = "white"]
    [h: critEffect = ""]
  };{}]
  [h: critOutput = ""]
  [h, if(critEffect != ""): critOutput = strformat("<tr><td colspan=5 bgcolor=%{colorAttack}>%{critEffect}</td></tr>")]

  [h: '<!-- Get the message for the monk stun effect -->']
  [h: stunMessage = getStrProp(meleeAttackReturn, "stunMessage")]
  [h, if(stunMessage != ""): stunMessage = strformat("<tr><td colspan=5 bgcolor=%{colorAttack}>%{stunMessage}</td></tr>")]
  
  [h: '<!-- roll damage for small/med/large -->']
  [h: dmgSmallRoll = eval(smallDamageDice)]
  [h: dmgMediumRoll = eval(mediumDamageDice)]
  [h: dmgLargeRoll = eval(largeDamageDice)]

  [h, if(mediumDamageDice == largeDamageDice), code :{
    [h: dmgLargeRoll = dmgMediumRoll]
  }]
  [h, if(smallDamageDice == mediumDamageDice), code :{
    [h: dmgMediumRoll = dmgSmallRoll]
  }]
  [h, if(smallDamageDice == largeDamageDice), code :{
    [h: dmgLargeRoll = dmgSmallRoll]
  }]

  [h: dmgSmall = (dmgSmallRoll)+dmgMod]
  [h: dmgMedium = (dmgMediumRoll)+dmgMod]
  [h: dmgLarge = (dmgLargeRoll)+dmgMod]

  [h: weaponToolTip =  toolTipIt(strformat("Weapon Damage Damage Dice, Small/Medium/Large, %{smallDamageDice}/%{mediumDamageDice}/%{largeDamageDice}"),name)]

  [h: '<!-- Set default damage display for if there is not a target -->']
  [h: canAutoApplyDamage = "false"]
	[h: autoDamageAmount = 0]
  [h: damageTxt = strformat("%{dmgSmall}/%{dmgMedium}/%{dmgLarge}")]

  [h, if(smallDamageDice == mediumDamageDice && mediumDamageDice == largeDamageDice), code :{
    [h: damageTxt = strformat("%{dmgSmall}")]
    [h, if(hasTarget): canAutoApplyDamage = "true"]
		[h, if(hasTarget): autoDamageAmount = -dmgSmall]
  }]
  [h, if(smallDamageDice == mediumDamageDice && mediumDamageDice != largeDamageDice), code :{
    [h: damageTxt = strformat("%{dmgSmall} (S,M) / %{dmgLarge} (L)")]
  }]

  [h: '<!-- If there is a target, display the damage for the correct size -->']
  [if(hasTarget && hasProperty("Size",targetID)), code : {
    [h: targetSize = getProperty("Size", targetID)]

    [h, if(startsWith(targetSize, "s") || startsWith(targetSize, "S") || startsWith(targetSize, "m") || startsWith(targetSize, "M") || startsWith(targetSize, "l") || startsWith(targetSize, "L")): canAutoApplyDamage = "true"]
    
    [h, if(startsWith(targetSize, "s") || startsWith(targetSize, "S")): damageTxt = strformat("%{dmgSmall} (S)")]
    [h, if(startsWith(targetSize, "m") || startsWith(targetSize, "M")): damageTxt = strformat("%{dmgMedium} (M)")]
    [h, if(startsWith(targetSize, "l") || startsWith(targetSize, "L")): damageTxt = strformat("%{dmgLarge} (L)")]

		[h, if(startsWith(targetSize, "s") || startsWith(targetSize, "S")): autoDamageAmount = -dmgSmall]
    [h, if(startsWith(targetSize, "m") || startsWith(targetSize, "M")): autoDamageAmount = -dmgMedium]
    [h, if(startsWith(targetSize, "l") || startsWith(targetSize, "L")): autoDamageAmount = -dmgLarge]
  }]

  [h: '<!-- Create a table for the damage modifier, but only with items that are not 0 -->']
  [h: damageModTable = ""]
  [h, if(miscDmg != 0 || profDamage != 0 || strDamage != 0 || raceDamage != 0 || toDamage != 0 || otherDamage != 0): damageModTable=strformat("<tr><td colspan=4 align=center bgcolor=#d4d4d4><b>Modifier</b></td></tr>")]
  [h, if(miscDmg != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Situational</td><td align=right bgcolor=white>%{miscDmg}</td></tr>"))]
  [h, if(profDamage != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Proficiency</td><td align=right bgcolor=white>%{profDamage}</td></tr>"))]
  [h, if(strDamage != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Strength</td><td align=right bgcolor=white>%{strDamage}</td></tr>"))]
  [h, if(raceDamage != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Racial</td><td align=right bgcolor=white>%{raceDamage}</td></tr>"))]
  [h, if(toDamage != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Weapon</td><td align=right bgcolor=white>%{toDamage}</td></tr>"))]
  [h, if(monkDamage != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Monk</td><td align=right bgcolor=white>%{monkDamage}</td></tr>"))]
  [h, if(otherDamage != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=white>Other</td><td align=right bgcolor=white>%{otherDamage}</td></tr>"))]
	[h, if(effectDmg != 0): damageModTable=concat(damageModTable,effectDmgTbl)]
	[h, if(miscDmg != 0 || profDamage != 0 || strDamage != 0 || raceDamage != 0 || toDamage != 0 || monkDamage != 0 || otherDamage != 0 || effectDmg != 0): damageModTable=concat(damageModTable,strformat("<tr><td colspan=3 bgcolor=#F0F0F0>Total Modifier</td><td align=right bgcolor=#F0F0F0>%{totalDmgMod}</td></tr>"))]

  [h: damageToolTip = toolTipIt(strformat("
    <table bgcolor=black cellspacing=1 cellpadding=3>
      <tr style='font-weight:bold'><td bgcolor=#d4d4d4>Size</td><td align=center bgcolor=#d4d4d4>Roll</td><td align=center bgcolor=#d4d4d4>Mod</td><td align=right bgcolor=#d4d4d4>Total</td></tr>
      <tr><td bgcolor=white>%{smallDamageDice} (Small)</td><td align=center bgcolor=white>%{dmgSmallRoll}</td><td align=center bgcolor=white>%{totalDmgMod}</td><td align=right bgcolor=#F0F0F0>%{dmgSmall}</td></tr>
      <tr><td bgcolor=white>%{mediumDamageDice} (Medium)</td><td align=center bgcolor=white>%{dmgMediumRoll}</td><td align=center bgcolor=white>%{totalDmgMod}</td><td align=right bgcolor=#F0F0F0>%{dmgMedium}</td></tr>
      <tr><td bgcolor=white>%{largeDamageDice} (Large)</td><td align=center bgcolor=white>%{dmgLargeRoll}</td><td align=center bgcolor=white>%{totalDmgMod}</td><td align=right bgcolor=#F0F0F0>%{dmgLarge}</td></tr>

      %{damageModTable}
    "),damageTxt)]


  [h: effectTextCol = ""]
  [h, if(acHit <= targetAC && critDamage != 0 && critDamage != 2): effectTextCol = "color=red"]
  [h, if(acHit > targetAC  && critDamage != 0 && critDamage != 2): effectTextCol = "color=green"]
  
  [h, if (acHit <= targetAC): effectTxt=strformat('<font %{effectTextCol}>HIT %{targetName}!</font>')]
  
  [h: 'if (hasTarget && acHit <= targetAC && isNPC(targetID)):  setState("Struck",1,targetID)']
  [h, if (hasTarget && acHit <= targetAC && isNPC(targetID)): setState("Red",1,targetID)]
  
  [h, if (acHit > targetAC): effectTxt=strformat('<font %{effectTextCol}>MISSED %{targetName}!</font>')]
  [h, if(!hasTarget): effectTxt = 'no target']

  [if( isPC(myID) && ammoSource != '' && ammoSource != 'none'), code :{
    [h: ammoArgs = strformat('myID=%{myID}; item=%{ammoSource}; inCombat=1;')]
    [macro("PC_Use_Charge@Lib:Equipment:Macros"):ammoArgs]
    [h: ammoUsed = concat(ammoUsed,macro.return)]
  };{
  }]

}]
[h: "<!-- END WEAPON LOOPS -->"]

[h, if(canAutoApplyDamage == "true"), code: {
  [h: damageLinkOutput = "all"]
  [h: applyDamageLink = temporaryLink("HP_Adjust@Lib:ADND", "Apply", strformat("myID=%{targetID}; healthAdjustment=%{autoDamageAmount}"), strformat("output=%{damageLinkOutput}; expire=-1"))]
};
{
	[h: applyDamageLink = ""]
}]

[h: styleTxt = getLibProperty("styleTxt_noColor", "Lib:ADND")]
[h: outTxt = strformat("
<table cellpadding=0 %{styleTxt} bgcolor=black width=100%>
  <tr>
    <td  bgcolor=%{sColor}>
      <table border=0 width=100%>
        <tr>
          <td align=center bgcolor=%{sColor}>
            %{myName} Attacks!
          </td>
        </tr>
        <tr>
          <td>
            <table bgcolor=black cellspacing=1 cellpadding=2 width=100%>
              <tr bgcolor=%{sColor}>
                <td><b>Weapon</b></td>
                <td><b>Roll</b></td>
                <td><b>AC</b></td>
                <td><b>Damage</b> %{applyDamageLink}</td>
                <td><b>Result</b></td>
              </tr>
              <tr>
                <td bgcolor=%{colorAttack}>%{weaponToolTip} %{hitModSym}%{hitMod}/%{dmgModSym}%{dmgMod}</td>
                <td bgcolor=%{colorAttack}>%{overTxt} %{totalHitRollToolTip}</td>
                <td bgcolor=%{colorAttack}>%{totalACToolTip}</td>
                <td bgcolor=%{colorAttack}>%{damageToolTip}</td>
                <td bgcolor=%{colorAttack}>%{effectTxt}</td>
              </tr>
              %{stunMessage}
              %{critOutput}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>"))]

[r: showIt(outTxt,myID,"attack",0)]
