[h: myID = macro.args]
<table>
  <th colspan=2>Ability Scores</th>
  [h: propNames = "Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma"]
  [h: args = strformat("myID=%{myID}; OverRide=0;")]
  [foreach(prop, propNames, ""), code: {
    <tr>
      <td>[r: prop]</td>
      [h: propValue = getProperty(prop,myID)]
      <td align="center">[r: macroLink(propValue,"PC_AbilityCheck@Lib:ADND","none",args+strformat("Name=%{prop}; Value=%{propValue}; "),myID)]</td>
    </tr>
  }]
</table>