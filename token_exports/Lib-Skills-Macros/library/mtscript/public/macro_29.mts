[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: wepProfsIMG = strformat('<img height=15 width=15 src="asset://577aaa194bd34d237c738aa18904821a"/></img>')]

<TABLE width=100%>
  <TR>
    <TD BGCOLOR="#F0F0F0">
      <TABLE width=100%>
        <tr class="headerRow"><td colspan="2" align="center">Weapons Proficiencies</td></tr>
        <tr>
          <TD ALIGN="LEFT"><b>Name</b></td>
          <TD ALIGN="RIGHT" width="25%"><b>Type</b></td>
        </tr>

        [h: tableName = "Profs_Combat"]
        [h: myProfs = getProperty(tableName,myID)]
        [h,if(json.isEmpty(myProfs)):profNames = ''; profNames = json.sort(json.fields(myProfs, 'json'))]
        [h: class = "oddRow"]
        [foreach(prop, profNames, ""), code: {
          <tr class="[r:class]">
            <TD ALIGN="LEFT">[r: macroLink(prop,"PC_Weapon_Edit@Lib:Skills:Macros","none", strformat("myID=%{myID};thisSkill=%{prop}"))]</td>
            <TD ALIGN="RIGHT">[r: json.get(json.get(myProfs,prop),"weaponType")]</td>
          </tr>
          [h: class = if(class=="oddRow", "evenRow", "oddRow")]
        }]
      </TABLE>
    </TD>
  </TR>
  <TR>
    <TD BGCOLOR="#F0F0F0" ALIGN="CENTER">
      [r: macroLink("<b>+add</b>","PC_Weapon_Add@Lib:Skills:Macros",'none', strformat("myID=%{myID};"))], [r: macroLink("<b>edit</b>","PC_Weapon_Edit@Lib:Skills:Macros",'none',strformat("myID=%{myID};"))]
    </TD>
  </TR>
</TABLE>