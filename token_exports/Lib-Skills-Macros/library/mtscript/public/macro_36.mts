[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<TABLE width=100%>
  <TR>
    <TD>
      <TABLE width=100%>
        <tr class="headerRow"><td colspan=3 align="center">Attribute Skills</td></tr>
        <tr class="evenRow">
          <TD ALIGN="LEFT"><b>Skill</b></td>
          <TD ALIGN="CENTER"><b>Value</b></td>
          <TD ALIGN="RIGHT"><b>Check</b></td>
        </tr>
        [h: class = "oddRow"]
        <tr class="[r:class]">
          [h: doorsChance = getStrProp(getProperty("Attribute_Strength", myID), "open_doors")]
          <TD ALIGN="LEFT">Open Doors</td>
          <TD ALIGN="CENTER">[r: doorsChance]</td>
          <TD ALIGN="RIGHT"><b>check</b></td>
        </tr>
        [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        <tr class="[r:class]">
        [h: barsChance = getStrProp(getProperty("Attribute_Strength", myID), "bend_bars_or_lift_gates")]
          <TD ALIGN="LEFT">Bend Bars/Lift Gates</td>
          <TD ALIGN="CENTER">[r: barsChance]</td>
          <TD ALIGN="RIGHT"><b>check</b></td>
        </tr>
        [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        <tr class="[r:class]">
          [h: shockChance = getStrProp(getProperty("Attribute_Constitution", myID), "system_shock")]
          <TD ALIGN="LEFT">System Shock Survival</td>
          <TD ALIGN="CENTER">[r: shockChance]</td>
          <TD ALIGN="RIGHT"><b>check</b></td>
        </tr>
        [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        <tr class="[r:class]">
          [h: resChance = getStrProp(getProperty("Attribute_Constitution", myID), "resurrection_survival")]
          <TD ALIGN="LEFT">Resurrection Survival</td>
          <TD ALIGN="CENTER">[r: resChance]</td>
          <TD ALIGN="RIGHT"><b>check</b></td>
        </tr>
      </TABLE>
    </TD>
  </TR>
</TABLE>