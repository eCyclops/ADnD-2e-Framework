[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[macro("canCastSpells@Lib:Spells:Macros"):strformat("myID=%{myID};")]
[h: hasArcane = getStrProp(macro.return,"hasArcane",0)]
[h: hasDivine = getStrProp(macro.return,"hasDivine",0)]
[h: hasDruid = getStrProp(macro.return,"hasDruid",0)]
[h: hasIllusion = getStrProp(macro.return,"hasIllusion",0)]

<TABLE WIDTH="100%">
  <TR>
    <TD valign=top>
      [r, if(hasArcane), code :{
        [h: magicType  = "Arcane"]
        [h: vancianType = "Memorized"]
        [h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType};")]
        [r: getSpellWindow(args)]
			};{}]

      [r, if(hasDivine), code :{
        [h: magicType  = "Divine"]
        [h: vancianType = "Memorized"]
        [h: args = strformat("myID=%{myID}; magicType=%{magicType}; vancianType=%{vancianType};")]
        [r: getSpellWindow(args)]
      };{}]
    </TD>
  </TR>

  <TR>
    <TD>
      [if(!hasArcane && !hasDivine), code :{
        [h: linkLearn = macroLink('Add Spell Training/Slots',"PC_EDIT@Lib:ADND","none",strformat("myID=%{myID};"),myID)]

        [r: linkLearn]<br>
      };{}]
    </TD>
  </TR>
</TABLE>