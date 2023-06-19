[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]


[h: abilitiesIMG = strformat('<img height=15 width=15 src="asset://21f199b0fe4a2995ade2c0d3dae7294e"/></img>')]
[h: personalIMG = strformat('<img height=15 width=15 src="asset://eb6903ebea9ed4081a04bbfe903fdb67"/></img>')]

<TABLE width="100%" height="100%">
  <tr>
    <td>
      <table width="100%">
        <tr><td><font size="6">[r: getName(myID)]</font></td></tr>
      </table>
      
      <hr>
      
      <table width="100%">
        <tr>
          <td><font size="3">Level [r: getStrProp(getProperty("Character_Details",myID),"Level")] [r: getStrProp(getProperty("Character_Details",myID),"Race")] [r: getStrProp(getProperty("Character_Details",myID),"Class")]</font></td>
          <td align="right">
            [h: HP = getProperty("HP", myID)]
            [h: MaxHP = getProperty("MaxHP", myID)]
            [h: hpBarArgs = strformat("MaxLen=50; Value=%{HP}; MaxValue=%{MaxHP}; Label=HP")]
            [macro("TrafficLightBar@this"): hpBarArgs]
          </td>
        </tr>
        <tr>
          <td><font size="3">[r: getStrProp(getProperty("Character_Details",myID),"Alignment")]</font></td>
          <td align="right">
            [h: XP = getProperty("XP", myID)]
            [h: NextLevelXP = getProperty("XPNeeded",myID)]
            [h: hpBarArgs = strformat("MaxLen=50; Value=%{XP}; MaxValue=%{NextLevelXP}; Label=XP; Color=120,120,255")]
            [macro("StatusBar@this"): hpBarArgs]
          </td>
        </tr>
      </table>
      
      <hr>

      <table width="100%">
        <tr>
          <td width="50%">
            <table width="100%">
              <tr class="headerRow"><td colspan="2" align="center">Ability Scores</td></tr>
              
              [h: propNames = "Strength, Intelligence, Wisdom, Dexterity, Constitution, Charisma, Comeliness"]
              [h: args = strformat("myID=%{myID}; OverRide=0;")]
              [h: class = "oddRow"]
              [foreach(prop, propNames, ""), code: {
                <tr class="[r:class]">
                  <td>[r: prop]</td>
                  [h: propValue = getProperty(prop,myID)]
                  <td align="right">[r: macroLink(propValue,"PC_AbilityCheck@Lib:ADND","none",args+strformat("Name=%{prop}; Value=%{propValue}; "),myID)]</td>
                </tr>
                [h: class = if(class=="oddRow", "evenRow", "oddRow")]
              }]
              
            </table>
          </td>
          <td valign="top">
            <table width="100%">
              <tr class="headerRow"><td colspan="2" align="center">Appearance</td></tr>
              [h: class = "oddRow"]
              <tr class="[r:class]"><td>Gender</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Gender")]</td></tr>
              [h: class = if(class=="oddRow", "evenRow", "oddRow")]
              <tr class="[r:class]"><td>Age</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Age")]</td></tr>
              [h: class = if(class=="oddRow", "evenRow", "oddRow")]
              <tr class="[r:class]"><td>Height</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Height")]</td></tr>
              [h: class = if(class=="oddRow", "evenRow", "oddRow")]
              <tr class="[r:class]"><td>Weight</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Weight")]</td></tr>
            </table>
          </td>
        </tr>
      </table>
      
    </td>
  </tr>
</table>