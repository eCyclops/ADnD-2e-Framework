[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: myHP = getProperty("HP",myID)]
[h: heartIMG = strformat('<img height=15 width=15 src="asset://7e1db21976b2b32ac7932d6d80f3d538"/></img>')]
[h: acIMG = strformat('<img height=15 width=15 src="asset://043590a73fbc74503634ea6cf9365660"/></img>')]
[h: attacksIMG = strformat('<img height=15 width=15 src="asset://39d77ac0a6b3abf5eeac0b6a945f9923"/></img>')]
[h: saveIMG = strformat('<img height=11 width=11 src="asset://3b6de87ed779c02d9ef3010c74f60592"/></img>')]
[h: racialsIMG = strformat('<img height=15 width=15 src="asset://eb6903ebea9ed4081a04bbfe903fdb67"/></img>')]

[h: hpLink =  macroLink("<font size=4>"+myHP+"</font>",'HP_Adjust@Lib:ADND','none',strformat("myID=%{myID};"),myID)]
[h: hpLinkToolTip = toolTipIt("Click to adjust health.",hpLink)]

<TABLE WIDTH="100%">
  <TR>
    <TD VALIGN="TOP">
      <TABLE width=100%>
        <TR>
          <TD>
            [h: rollInitiativeLink =  macroLink("Roll Initiative",'DO_Initiative@Lib:Initiative','none',strformat("myID=%{myID};"),myID)]
            [h: multiAttackLink =  macroLink("Multiple Weapons",'getMultiWeaponSelectionForm@Lib:ADND','none',strformat("myID=%{myID};"),myID)]
            [h: multiAttackToolTip = toolTipIt("Attack with mutiple weapons. Longsword/Shortsword, Dagger/Dagger etc...",multiAttackLink)]
            [r: rollInitiativeLink], or attack with [r: multiAttackToolTip]
          </td>
        </tr>
        <TR>
          <TD>
            <TABLE width=100%>
              <tr class="headerRow"><td align="center">[r: attacksIMG]Attacks</td></tr>
              [r: profsSheet_activeWeapons( strformat('myID=%{myID};') )]
            </TABLE>
          </TD>
        </TR>
      </TABLE>
      <table width="100%">
        <tr>
          <td>
            <table style="text-align: left; width: 100%; background-color:#FFD700;"border="0" cellpadding="1" cellspacing="0">
              <tr valign=top>
                <td style="vertical-align: top;" BGCOLOR="#F0F0F0">
                  <table style="text-align: left;  width: 100%; height: 100%;" border="1" cellpadding="0" cellspacing="0"  BGCOLOR="#F0F0F0">
                    <caption>[r: heartIMG]HP/THACO</caption>
                    [h: class = "oddRow"]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT"><b>Current Hit Points</b></td>
                      <TD ALIGN="center">[r: hpLinkToolTip]</td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Max Hit Points</td>
                      <TD ALIGN="center">[r: getProperty("MaxHP",myID)]</td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Base THACO</td>
                      <TD ALIGN="center">[r: getProperty("THACO",myID)]</td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Movement Base/Adjusted</td>
                      <TD ALIGN="center">[r: getProperty("Movement",myID)]/[r: getProperty("AdjustedMove",myID)]</td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Magic Resistances</td>
                      <TD ALIGN="center">[r: getProperty("MagicResistances",myID)]</td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                  </table>
                </td>
                <td style="vertical-align: top;" BGCOLOR="#F0F0F0">
                  <table style="text-align: left;  width: 100%; height: 100%;" BGCOLOR="#F0F0F0">
                    <tr class="headerRow"><td align="center" colspan="2">[r: saveIMG]Saves</td></tr>

                    [h: charClass = lower(getStrProp(getProperty("Character_Details",myID),"Class"))]
                    [h: charLevel = getStrProp(getProperty("Character_Details",myID),"Level")]
                    [macro("GetSaveTable@Lib:ADnD1EMacros"): json.set("{}", "charClass", charClass, "charLevel", charLevel)]
                    [h: saveData = macro.return]
                    
                    [h: class = "oddRow"]
                    [h: saveValue = json.get(saveData, "poison")]
                    [h: args = strformat("myID=%{myID}; Name=paralyzation, poison, or death magic; Save=%{saveValue}")]
                    [h: saveLink = macroLink(saveValue,"DO_Save@Lib:ADnD","none",args,myID)]
                    [h: saveLinkToolTip = toolTipIt(strformat('Click to save versus paralyzation, poison, or death magic'),saveLink)]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Paralyzation, Poison, or Death Magic</td>
                      <TD ALIGN="center"><font size=4>[r: saveLinkToolTip]</font></td>
                    </TR>
                    
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    [h: saveValue = json.get(saveData, "wand")]
                    [h: args = strformat("myID=%{myID}; Name=rod, staff, or wand; Save=%{saveValue}")]
                    [h: saveLink = macroLink(saveValue,"DO_Save@Lib:ADnD","none",args,myID)]
                    [h: saveLinkToolTip = toolTipIt(strformat('Click to save versus rod, staff, or wand'),saveLink)]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Rod, Staff, or Wand</td>
                      <TD ALIGN="center"><font size=4>[r: saveLinkToolTip]</font></td>
                    </TR>

                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    [h: saveValue = json.get(saveData, "petrify")]
                    [h: args = strformat("myID=%{myID}; Name=petrification or polymorph; Save=%{saveValue}")]
                    [h: saveLink = macroLink(saveValue,"DO_Save@Lib:ADnD","none",args,myID)]
                    [h: saveLinkToolTip = toolTipIt(strformat('Click to save versus petrification or polymorph'),saveLink)]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Petrification or Polymorph</td>
                      <TD ALIGN="center"><font size=4>[r: saveLinkToolTip]</font></td>
                    </TR>
                    
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    [h: saveValue = json.get(saveData, "breath")]
                    [h: args = strformat("myID=%{myID}; Name=breath weapon; Save=%{saveValue}")]
                    [h: saveLink = macroLink(saveValue,"DO_Save@Lib:ADnD","none",args,myID)]
                    [h: saveLinkToolTip = toolTipIt(strformat('Click to save versus breath weapon'),saveLink)]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Breath Weapon</td>
                      <TD ALIGN="center"><font size=4>[r: saveLinkToolTip]</font></td>
                    </TR>

                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    [h: saveValue = json.get(saveData, "spell")]
                    [h: args = strformat("myID=%{myID}; Name=spell; Save=%{saveValue}")]
                    [h: saveLink = macroLink(saveValue,"DO_Save@Lib:ADnD","none",args,myID)]
                    [h: saveLinkToolTip = toolTipIt(strformat('Click to save versus spell'),saveLink)]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Spell</td>
                      <TD ALIGN="center"><font size=4>[r: saveLinkToolTip]</font></td>
                    </TR>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: top;" BGCOLOR="#F0F0F0">
                  <table style="text-align: left;  width: 100%; height: 100%;" border="1" cellpadding="1" cellspacing="0"  BGCOLOR="#F0F0F0">
                    <caption>[r: acIMG]Armor</caption>
                    [r: updateEquipedAdjustments(strformat("myID=%{myID};"))]

                    [h: dexAC= getStrProp(getProperty("Attribute_Dexterity",myID),"ac_adjustment")]
                    [h, if(charClass != "Monk"): dexAC = getStrProp(getProperty("Attribute_Dexterity",myID),"ac_adjustment"); dexAC = 0]
                    [h: naturalAC = getStrProp(getProperty("Armor_Details",myID),"Natural_Armor")]
                    [h: armorAC = getStrProp(getProperty("Armor_Details",myID),"Armor_Adjustment")]
                    [h: armorACmag = getStrProp(getProperty("Armor_Details",myID),"Armor_Magical_Adjustment")]
                    [h: shieldAC = getStrProp(getProperty("Armor_Details",myID),"Shield_Adjustment")]
                    [h: shieldACmag = getStrProp(getProperty("Armor_Details",myID),"Shield_Magical_Adjustment",0)]
                    [h: adjsAC = dexAC+armorAC+armorACmag+shieldAC+shieldACmag]
                    [h: finalAC = naturalAC+adjsAC]
                    [h: setProperty("AC",finalAC,myID)]
                    [h: class = "oddRow"]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">FINAL:</TD>
                      <TD ALIGN="center">[r: finalAC]</TD>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]

                    [if( dexAC !=0 ) , code :{
                      <TR class="[r:class]">
                        <TD ALIGN="LEFT">DEX Defensive adj.</TD>
                        <TD ALIGN="center">[r: dexAC]</TD>
                      </TR>
                      [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    };{}]

                    [if (shieldAC != 0 || shieldACmag != 0), code :{
                      <TR class="[r:class]">
                        <TD ALIGN="LEFT">Shield, [r: getStrProp(getProperty("Armor_Details",myID),"Shield_Worn")]</TD>
                        <TD ALIGN="center">[r: shieldAC]</TD>
                      </TR>
                      [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                      <TR class="[r:class]">
                        <TD ALIGN="LEFT">Magical Adjustment</TD> 
                        <TD ALIGN="center">[r: shieldACmag]</TD>
                      </TR>
                      [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    };{}]

                    [if (armorAC != 0 || armorACmag != 0), code :{
                      <TR class="[r:class]">
                        <TD ALIGN="LEFT">Armor, [r: getStrProp(getProperty("Armor_Details",myID),"Armor_Worn")]</TD>
                        <TD ALIGN="center">[r: armorAC]</TD>
                      </TR>
                      [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                      <TR class="[r:class]">
                        <TD ALIGN="LEFT">Magical Adjustment</TD>
                        <TD ALIGN="center">[r: armorACmag]</TD>
                      </TR>
                      [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                    };{}]

                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Natural armor class</TD>
                      <TD ALIGN="center"> [r: naturalAC]</TD>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                  </table>
                </td>
                <td style="vertical-align: top;" BGCOLOR="#F0F0F0">
                  <table style="text-align: left; width:  width: 100%; height: 100%;" border="1" cellpadding="1" cellspacing="0"  BGCOLOR="#F0F0F0">
                    <caption>[r: racialsIMG]Racial/Features/Other</caption>
                    [h: class = "oddRow"]
                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Racial Weapon Features</td>
                      <TD ALIGN="RIGHT"><b>hit adj</b> <i>[r: getStrProp(getProperty("racial_weapon",myID),"to hit adjustment")]</i></td>
                      <TD ALIGN="RIGHT"><b>damage adj</b> <i>[r: getStrProp(getProperty("racial_weapon",myID),"to damage adjustment")]</i></td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]

                    <TR class="[r:class]">
                      <TD ALIGN="LEFT">Other Weapon Features</td>
                      <TD ALIGN="RIGHT"><b>hit adj</b> <i>[r: getStrProp(getProperty("other_weapon",myID),"to hit adjustment")]</i></td>
                      <TD ALIGN="RIGHT"><b>damage adj</b> <i>[r: getStrProp(getProperty("other_weapon",myID),"to damage adjustment")]</i></td>
                    </TR>
                    [h: class = if(class=="oddRow", "evenRow", "oddRow")]
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </TD>
  </TR>
</TABLE>