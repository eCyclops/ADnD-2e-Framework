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
	[h: memorizeToolTip =  toolTipIt(strformat("Click to memorize more spells."),"+"+"memorize")]
	[h: memorizeLink = macroLink(memorizeToolTip, 'Learn_Menu@Lib:Spells:Macros','none',strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType}; viewLevelSpell=1"))]
	<tr><td style="text-align:center"><span style="font-size:16px">[r: magicType]</span> [r: memorizeLink]</td></tr>
	<br>
	[for(levelCount,0,9,1,""), code: {
		[h: usedSlots = getUsedSpellSlots(levelCount,magicType,myID)]
			[if(usedSlots > 0), code: {
			<tr><td>
				<table width=100%>
					[h, if(magicType == "Arcane"): headerClass = "headerRow"; headerClass = "headerRowDivine"]
					<tr class="[r:headerClass]">
						<td>Level [r: levelCount] ([r: usedSlots])</td>
						<td><td>
					</tr>
					[h: spellList = json.get(memorizedByLevel,levelCount)]
					[h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType}; spellList=%{spellList}")]
					[macro("spellSlotRow@Lib:Spells:Macros"): args]
				</table>
			</td></tr>
		};{}]
	}]
	
</table>