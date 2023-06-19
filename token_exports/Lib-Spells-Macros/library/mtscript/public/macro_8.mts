[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: viewLevelSpell = getStrProp(arg(0),"viewLevelSpell",1)]
[h: showAll = getStrProp(arg(0), "showAll", "false")]

[h: tagProp = add(magicType,"_"+vancianType)]
[h: my_spells = getProperty(tagProp,myID)]
[h: my_spells_known = getProperty(add(magicType,"_Known"),myID)]

[macro("getAllScribedSpells@Lib:Equipment:Macros"):strformat("myID=%{myID};")]
[h: myScribedSpells = macro.return]

[h, if(magicType == "Arcane"):spellCount = 10;spellCount=8]

[h: levelSelect = strformat("<table  align=center border=0 cellpadding=1><caption style='font-size:10px'>Level</caption>")]
[h, if(magicType == "Arcane"):spellCount = 10;spellCount=8]
[h: levelSelect = concat(levelSelect,strformat("<tr>"))]
[count(spellCount,""), code :{
	[h: args = arg(0)]
	[h: args = setStrProp(args,"viewLevelSpell",roll.count)]
	[h: link = macroLink(roll.count,'Learn_Menu@Lib:Spells:Macros','none',args)]
	[h,if(roll.count == viewLevelSpell):levelSelect = concat(levelSelect,strformat("<td>[%{viewLevelSpell}]</td>")); levelSelect = concat(levelSelect,strformat("<td>%{link}</td>")) ]
}]
[h: levelSelect = concat(levelSelect,strformat("</tr></table>"))]

[h: classSelect = strformat("<table  align=center border=0 cellpadding=1><caption style='font-size:10px'>Class</caption>")]
[h: classSelect = concat(classSelect,strformat("<tr>"))]
[h: classSelect = concat(classSelect,strformat("<td>[Cleric]</td><td>Druid</td><td>Illusionist</td><td>Magic-User</td><td>Paladin</td>"))]
[h: classSelect = concat(classSelect,strformat("</tr></table>"))]

[h: selectTxt = strformat("<table align=center border=0 cellpadding=1><td>%{levelSelect}</td><td>%{classSelect}</td></table>"))]

[h: outTxt = strformat("<table width=100% align=center cellpadding=3 cellspacing=-1><tr><td colSpan=3><table width=100% border=0 cellpadding=3><tr><td align=center>Level %{viewLevelSpell}")]
[h: class = "oddRow"]

[h: args = strPropFromVars("myID,magicType,vancianType,viewLevelSpell,showAll")]
[h: showAvailableArgs = setStrProp(args, "showAll", "false")]
[h: showAllArgs = setStrProp(args, "showAll", "true")]

[h, if(showAll == "false"): showAllLink = macroLink('Show All','Learn_Menu@Lib:Spells:Macros','none',showAllArgs); showAllLink = macroLink('Show Available','Learn_Menu@Lib:Spells:Macros','none',showAvailableArgs)]
[h, if(magicType == "Arcane" && vancianType != 'Memorized'): outTxt = concat(outTxt,strformat(" (Spells must exist in spellbook carried to learn) %{showAllLink}"))]
[h, if(vancianType == "Memorized"): outTxt = concat(outTxt,strformat(" (Spells must exist in spellbook carried to memorize) %{showAllLink}"))]
[h: outTxt = concat(outTxt,strformat("</td></tr></table></td></tr><tr class=%{class}>"))]

[h: levelSpell = viewLevelSpell]
[h: spellDBIdx = add(magicType,levelSpell)]
[h: spellList = getLibProperty(spellDBIdx,"Lib:Spells")]
[h: spellListSorted = json.sort(json.fields(spellList, 'json'))]
[h: loopCount = 0]
[foreach(Item, spellListSorted,''), code : {
	[h: args = strformat("myID=%{myID};Name=%{Item}; Level=%{levelSpell}; magicType=%{magicType};vancianType=%{vancianType};;viewLevelSpell=%{viewLevelSpell};")]
	[h: doIKnowThis = 0]
	[h: showit = 0]
	[h:spellLink =  macroLink(Item,"learnSpell@Lib:Spells:Macros","none",args)]

	[h: tipTxt = getShowSpellToolTip(strformat("magicType=%{magicType}; Name=%{Item};"))]
	[h: spellToolTipTxt_showit = toolTipIt(tipTxt,spellLink)]
	[h: spellToolTipTxt_notShowIt = toolTipIt(tipTxt,Item)]

	[h, if(!json.isEmpty(my_spells_known) && json.type(my_spells_known) == 'OBJECT'):doIKnowThis = !json.isEmpty(json.get(my_spells_known,Item)); doIKnowThis = 0]
	[h, if(doIKnowThis == 0  && vancianType == "Known" && listContains(myScribedSpells,Item) ): showit=1]
	[h, if(doIKnowThis == 0  && vancianType == "Known" && magicType == 'Divine' ): showit=1]
	[h, if(doIKnowThis == 0  && vancianType == "Known" && isNPC(myID)): showit=1]
	[h, if(doIKnowThis == 1 && vancianType == "Memorized"): showit=1]
	[h, if(vancianType == "Memorized" && isNPC(myID)): showit=1]
	[h, if(magicType == "Divine"): showit=1]
	[h, if(showAll == "true"): unavailableTxt = strformat("<td style='border:1px solid silver'>%{spellToolTipTxt_notShowIt}</td>"); unavailableTxt = ""]
	[h,if(showit):outTxt = concat(outTxt,strformat("<td style='border:1px solid silver'>%{spellToolTipTxt_showit}</td>"));outTxt = concat(outTxt,unavailableTxt)]

	[h, if(showIt == 0 && showAll == "false"): skipRow = "true"; skipRow = "false"]
	[h, if(skipRow == "false"): loopCount = loopCount +1]
	[h, if(loopCount >= 3 && skipRow == "false"): class = if(class=="oddRow", "evenRow", "oddRow")]
	[h, if(loopCount >= 3 && skipRow == "false"):outTxt = concat(outTxt,strformat("</tr><tr class=%{class}>"))]
	[h,if(loopCount >= 3 && skipRow == "false"):loopCount=0]
}]
[h: outTxt = concat(outTxt,strformat("</tr></table>"))]

[r: selectTxt]
[r: outTxt]