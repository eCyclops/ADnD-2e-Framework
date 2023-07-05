[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: editLink = macroLink('Edit',"PC_EDIT@Lib:ADND","none",strformat("myID=%{myID};"),myID)]

[h: currentPage = getStrProp(arg(0),"Page","Main")]

[macro("canCastSpells@Lib:Spells:Macros"):strformat("myID=%{myID};")]
[h: hasArcane = getStrProp(macro.return,"hasArcane",0)]
[h: hasDivine = getStrProp(macro.return,"hasDivine",0)]

[h: pages = "General,Equipment,Proficiencies,Combat,Spells,Journal"]
<table width="100%">
  <tr>
    [foreach(page, pages,""), code: {
      [h: newLinkEntry = '']
      [h,if (page == currentPage): class="currentHeaderTab" ; class="headerTab"]
      [h: callback = "CharSheet@"+getMacroLocation()]
      [h: args = strformat("myID=%{myID}; Page=%{page};")]
      [h: pageLink = macroLink(page, callback, "none", args)]
	    [h:newLinkEntry = strformat("<td align=center class=%{class}>%{pageLink}</td>")]
	    [r: newLinkEntry]
    }]
    [r: strformat("<td align=center bgcolor=yellow class='headerTab'>%{editLink}</td>")]
  </tr>
</table>