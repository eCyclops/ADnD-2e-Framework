[h: myID= macro.args]
<table>
  <th colspan=2>Appearance</th>
  <tr><td>Gender</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Gender")]</td></tr>
  <tr><td>Age</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Age")]</td></tr>
  <tr><td>Height</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Height")]</td></tr>
  <tr><td>Weight</td><td align="right">[r: getStrProp(getProperty("Character_Details",myID),"Weight")]</td></tr>
</table>