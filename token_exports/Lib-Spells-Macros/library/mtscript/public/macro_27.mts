[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]

[h: incomingArgs = arg(0)]

[h: castableProp = canCastSpells(strformat("myID=%{myID};"))]
[h: hasArcane = getStrProp(castableProp,"hasArcane",0)]
[h: hasDivine = getStrProp(castableProp,"hasDivine",0)]

[h,if(magicType == 'Arcane'): slotPropertyName = 'Arcane'; slotPropertyName = 'Divine']
[h: memorizedPropertyName = strformat('%{slotPropertyName}_Memorized')]
[h: memorizedSpells = getProperty(memorizedPropertyName,myID)]
[macro("sortMemorizedByLevel@Lib:Spells:Macros"): memorizedSpells]
[h: memorizedByLevel = macro.return]

<table width=100%>
	[h: learnToolTip =  toolTipIt(strformat("Click to learn more spells."),"+"+"learn")]
	[h: learnLink = macroLink(learnToolTip, 'Learn_Menu@Lib:Spells:Macros','none',strformat("myID=%{myID}; magicType=%{magicType}; vancianType=Known;"))]
	<tr><td style="text-align:center"><span style="font-size:16px">[r: magicType]</span> [r: learnLink]</td></tr>
	
	[h: slotPropertyName = strformat('%{slotPropertyName}_SpellSlots')]
	[h: magicTypeSlots = getProperty(slotPropertyName,myID)]
	[foreach(slotLevel, magicTypeSlots, "", ";"), code: {
		[h: slotData = stringToList(slotLevel, "=")]
		[h: level = listGet(stringToList(listGet(slotData, 0), " "), 1)]
		[h: slotCount = listGet(slotData, 1)]
		[if(slotCount != 0 && slotCount != ""), code: {
			[h: class = "oddRow"]
			<tr><td>
				<table width=100%>
					[h: usedSlots = getUsedSpellSlots(level,magicType,myID)]
					[h, if (vancianType == 'Memorized'): 
						typeName = "memorize";
						typeName = "learn"]
					[h: typeNameToolTip =  toolTipIt(strformat("Click to %{typeName} more spells."),"+"+typeName)]
					[h: memorizeMoreLink = macroLink(typeNameToolTip, 'Learn_Menu@Lib:Spells:Macros','none',strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType}; viewLevelSpell=%{level}"))]
					[h, if(usedSlots >= slotCount): memorizeMoreLink = ""]

					[h, if(magicType == "Arcane"): headerClass = "headerRow"; headerClass = "headerRowDivine"]
					<tr class="[r:headerClass]">
						<td>Level [r: level] ([r: usedSlots]/[r: slotCount])</td>
						<td style="text-align:right"><span style="color:#87cefa">[r: memorizeMoreLink]</span></td>
					</tr>
					[h: spellList = json.get(memorizedByLevel,level)]
					[h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType}; spellList=%{spellList}")]
					[macro("spellSlotRow@Lib:Spells:Macros"): args]
				</table>
			</td></tr>
		};{}]
	}]
</table>