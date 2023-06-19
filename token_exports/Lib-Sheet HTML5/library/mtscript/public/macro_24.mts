[h: myID = getStrProp(macro.args,"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

<TABLE WIDTH="100%">
  <TR>
    <TD>
      <!-- Weapons -->
      [ macro("profsSheet_weapons@Lib:Skills:Macros"):strformat("myID=%{myID};")]

      <!-- Thief Skills -->
      [h: charClass = lower(getStrProp(getProperty("Character_Details",myID),"Class"))]
      [if(listContains(charClass, "thief") > 0 || listContains(charClass, "assassin") > 0 || listContains(charClass, "monk") > 0), CODE: {
        [macro("profsSheet_skills@Lib:Skills:Macros"):strformat("myID=%{myID};")]
      };{}]

      <!-- Attribute Skills -->
      [ macro("profsSheet_attributeSkills@Lib:Skills:Macros"):strformat("myID=%{myID};")]

      <Table width="100%">
        <tr>
          <td valign="top">
            <!-- Languages -->
            [ macro("profsSheet_languages@Lib:Skills:Macros"):strformat("myID=%{myID};")]
          </td>
          <td valign="top">
            <!-- Henchmen -->
            [ macro("profsSheet_henchmen@Lib:Skills:Macros"):strformat("myID=%{myID};")]
          </td>
        </tr>
      </table>

      <!-- Non-Weapon Proficiencies -->
      [ macro("profsSheet_proficiencies@Lib:Skills:Macros"):strformat("myID=%{myID};")]

    </TD>
  </TR>
</TABLE>