[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: profsIMG = strformat('<img height=15 width=15 src="asset://ddd866523d613eca15b7d6988784bb98"/></img>')]

<TABLE width=100%>
  <TR>
    <TD BGCOLOR="#F0F0F0">
      <TABLE width=100% >
        <tr class="headerRow"><td colspan="4" align="center">Proficiencies</td></tr>
        <tr>
          <TD ALIGN="LEFT"><b>Name</b></td>
          <TD ALIGN="CENTER"><b>Source Ability</b></td>
          <TD ALIGN="CENTER"><b>Modifier</b></td>
          <TD ALIGN="RIGHT"><b>Check</b></td>
        </tr>

        [h: tableName = "Profs"]
        [h: myProfs = getProperty(tableName,myID)]
        [h,if(json.isEmpty(myProfs)):profNames = '';  profNames = json.sort(json.fields(myProfs, 'json'))]
        [h: class = "oddRow"]
        [foreach(prop, profNames, ""), code: {
          <tr class="[r:class]">
            <TD ALIGN="LEFT">[r: macroLink(prop,"PC_Prof_Edit@Lib:Skills:Macros","none",strformat("myID=%{myID}; thisSkill=%{prop}"),myID)]</td>
            <TD ALIGN="CENTER">[r: json.get(json.get(myProfs,prop),"abilitySource")]</td>
            <TD ALIGN="CENTER">[r: json.get(json.get(myProfs,prop),"baseModifier")]</td>
            <TD ALIGN="RIGHT">[r: macroLink("check","PC_Prof_Check@Lib:ADND","none",strformat("myID=%{myID}; thisSkill=%{prop}"),myID)]</td>
          </tr>
          [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        }]
      </TABLE>
    </TD>
  </TR>
  <TR>
    <TD BGCOLOR="#F0F0F0" ALIGN="CENTER">
      [r: macroLink("<b>+add</b>","PC_Prof_Add@Lib:Skills:Macros",'none', strformat("myID=%{myID};"),myID)], [r: macroLink("<b>edit</b>","PC_Prof_Edit@Lib:Skills:Macros",'none',strformat("myID=%{myID};"),myID)]
    </TD>
  </TR>
</TABLE>