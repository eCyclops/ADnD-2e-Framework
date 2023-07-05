[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: skillsIMG = strformat('<img height=15 width=15 src="asset://b0236476abd8cc6333fe240ee0669bbe"/></img>')]

<TABLE width=100%>
  <TR>
    <TD>
      <TABLE width=100%>
        <tr class="headerRow"><td colspan=5 align="center">Thief Skills</td></tr>
        <tr>
          <TD ALIGN="LEFT"><b>Name</b></td>
          <TD ALIGN="CENTER"><b>Base</b></td>
          <TD ALIGN="CENTER"><b>Modifiers</b></td>
          <TD ALIGN="CENTER"><b>Total</b></td>
          <TD ALIGN="RIGHT"><b>Check</b></td>
        </tr>
        [h: charClass = getStrProp(getProperty("Character_Details",myID),"Class")]
        [h: charLevel = getStrProp(getProperty("Character_Details",myID),"Level")]
        [h, macro("GetSkillTable@Lib:ADnD1EMacros"): json.set("{}", "charClass", charClass, "charLevel", charLevel)]
        [h: mySkills = macro.return]
        
        [h,if(json.isEmpty(mySkills)):skillNames = '';  skillNames = json.sort(json.fields(mySkills, 'json'))]

        [h: class = "oddRow"]
        [foreach(prop, skillNames, ""), code: {
          [h: thisJSON = json.get(mySkills,prop)]
          [h: baseChance=json.get(thisJSON,"baseChance")]
          [h: armorModifier=json.get(thisJSON,"armorMod")]
          [h: racialModifier=json.get(thisJSON,"racialMod")]
          [h: dexModifier=json.get(thisJSON,"dexMod")]
          [h: otherModifier=json.get(thisJSON,"otherMod")]
          
          [h: modifierTooltip = strformat("<html><table>
              <tr><td>Armor</td><td>%{armorModifier}</td></tr>
              <tr><td>Racial</td><td>%{racialModifier}</td></tr>
              <tr><td>Dexterity</td><td>%{dexModifier}</td></tr>
              <tr><td>Other</td><td>%{otherModifier}</td></tr>
            </table></html>")]


          [h: totalMods = armorModifier+racialModifier+dexModifier+otherModifier]
          [h: totalChance = baseChance+totalMods]
          [h: args = strformat("myID=%{myID}; thisSkill=%{prop};")]
          <tr class="[r:class]">
            <TD ALIGN="LEFT">[r: macroLink(prop,"PC_Skill_Edit@Lib:Skills:Macros","none",args,myID)]</td>
            <TD ALIGN="CENTER">[r: baseChance]</td>
            <TD ALIGN="CENTER"><span title="[r:modifierTooltip]">[r: totalMods]</span></td>
            <TD ALIGN="CENTER"><b>[r: totalChance]</b></td>
            <TD ALIGN="RIGHT"><b>[r: macroLink("check","PC_Skill_Check@Lib:ADND","none",args,myID)]</b></td>
          </tr>
          [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        }]
      </TABLE>
      [h: addLink = macroLink("<b>+add</b>","PC_Skill_Add@Lib:Skills:Macros",'none',strformat("myID=%{myID};"),myID)]
      [h: editLink = macroLink("<b>edit</b>","PC_Skill_Edit@Lib:Skills:Macros",'none',strformat("myID=%{myID};"),myID)]
    </TD>
  </TR>
</TABLE>