[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<TABLE width="100%" valign="Top">
  <tr class="headerRow"><td colspan=3 align="center">Henchmen</td></tr>
  [h: class = "oddRow"]
  <tr class="[r:class]">
    [h: maxHenchmen = getStrProp(getProperty("Attribute_Charisma", myID), "max_henchmen")]
    <TD ALIGN="LEFT">Maximum</td>
    <TD ALIGN="CENTER">[r: maxHenchmen]</td>
    <TD ALIGN="RIGHT"><b>Check</b></td>
  </tr>
  [h: class = if(class=="oddRow", "evenRow", "oddRow")]
  <tr class="[r:class]">
    [h: loyaltyBase = getStrProp(getProperty("Attribute_Charisma", myID), "loyalty_base")]
    <TD ALIGN="LEFT">Loyalty Base</td>
    <TD ALIGN="CENTER">[r: loyaltyBase]</td>
    <TD ALIGN="RIGHT"><b>check</b></td>
  </tr>
  [h: class = if(class=="oddRow", "evenRow", "oddRow")]
  <tr class="[r:class]">
    [h: reactAdjust = getStrProp(getProperty("Attribute_Charisma", myID), "reaction_adjustment")]
    <TD ALIGN="LEFT">Reaction Adjustment</td>
    <TD ALIGN="CENTER">[r: reactAdjust]</td>
    <TD ALIGN="RIGHT"><b>check</b></td>
  </tr>
</TABLE>