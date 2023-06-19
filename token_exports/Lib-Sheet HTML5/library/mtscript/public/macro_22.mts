[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: editLink = macroLink('Edit',"PC_EDIT@this","none",strformat("myID=%{myID};"),myID)]

[h: currentPage = getStrProp(macro.args,"Page","Main")]

[macro("canCastSpells@Lib:Spells:Macros"):strformat("myID=%{myID};")]
[h: hasArcane = getStrProp(macro.return,"hasArcane",0)]
[h: hasDivine = getStrProp(macro.return,"hasDivine",0)]

[h: pages = "General,Equipment,Proficiencies,Combat,Spells,Journal"]
<nav>
  <ul>
    [foreach(page, pages,""), code: {
      [h: newLinkEntry = '']
      [h,if (page == currentPage): class="currentHeaderTab" ; class="headerTab"]
      [h: callback = "PC Sheet@"+getMacroLocation()]
      [h: args = strformat("myID=%{myID}; Page=%{page};")]
      [h: pageLink = macroLink(page, callback, "none", args)]
	    [h:newLinkEntry = strformat("<li class=%{class}>%{pageLink}</li>")]
	    [r: newLinkEntry]
    }]
    [r: strformat("<li class='headerTab'>%{editLink}</li>")]
  </ul>
</nav>