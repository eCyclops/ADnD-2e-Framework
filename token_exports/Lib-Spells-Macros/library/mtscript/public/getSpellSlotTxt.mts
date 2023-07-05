[h: 'returns html table with Level XUsableSpellSlots (used)']

[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]

[h,if(magicType == 'Arcane'):
	slotPropertyName = 'Arcane';
	slotPropertyName = 'Divine']
[h: slotPropertyName = strformat('%{slotPropertyName}_SpellSlots')]

[h: slotProf = getProperty(slotPropertyName,myID)]
[h: spellTxt = '<table border=1"><td>Slots</td>']
[h, count(countStrProp(slotProf),""), code :{
	[h: key = indexKeyStrProp(slotProf,roll.count)]
	[h: data = indexValueStrProp(slotProf,roll.count)]
	[h, if(data >0): usedSpells = getUsedSpellSlots(roll.count,magicType,myID);usedSpells = '']
	[h, if(data >0): useSpellsToolTip = toolTipIt(strformat("%{usedSpells} of %{data} spell slots used for this level."),usedSpells)]
	[h, if(data >0): spellTxt = concat(spellTxt,strformat("<tr><td><i>%{key}</i> <b>x%{data}</b> <i>(%{useSpellsToolTip})</i></tr></td>"))]
}]
[h: spellTxt = concat(spellTxt,strformat("</table>"))]

[h: macro.return = spellTxt]