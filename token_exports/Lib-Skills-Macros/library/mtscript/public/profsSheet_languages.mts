[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<TABLE width="100%">
  [h: maxLang = getStrProp(getProperty("Attribute_Intelligence", myID), "number_of_languages")]
  <tr class="headerRow"><td align="center">Languages (0 of [r:maxLang])</td></tr>
  [h: class = "oddRow"]
  <tr class="[r:class]"><td align="left">None</td></tr>
  [h: class = if(class=="oddRow", "evenRow", "oddRow")]
  
  <tr class="evenRow"><td align="center">Add</td></tr>
</TABLE>