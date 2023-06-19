[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: magicType  = getStrProp(arg(0), "magicType")]
[h: vancianType  = getStrProp(arg(0), "vancianType")]
[h: spellList = getStrProp(arg(0), "spellList")]

[h: args = arg(0)]


[h: class = "oddRow"]
[h: spellList = listSort(spellList, "A")]
[foreach(spell, spellList, ""), code: {
  [h: spellToolTipTxt = toolTipIt("Click to cast",spell)]
  [h: linkCast = macroLink(spellToolTipTxt,'castSpell@Lib:Spells:Macros','none',strformat("%{args}; Name=%{spell};"))]
  [h: linkInfo = macroLink("?",'showSpellText@Lib:Spells:Macros','none',strformat("%{args}; Name=%{spell};"))]
  <tr class="[r:class]"><td>[r: linkInfo] [r: linkCast]</td></tr>
  [h: class = if(class=="oddRow", "evenRow", "oddRow")]
}]