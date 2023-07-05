<!-- EDIT WEAPONS MACRO b46 -->

<!-- Build the list of weapon names. -->
  [H: WpnList = ""]
  [H,COUNT(10): WpnList = listAppend(WpnList, getStrProp(eval("Weapon" + roll.count), "WpnName"))]

<!-- Ask the user to select one of the weapons. -->
  [H: status = input("WpnNum | " + WpnList + " | Select weapon to edit | LIST")]
  [H: abort(status)]
  
<!-- Obtain the property string for the selected weapon. -->
  [H: WpnPropName = "Weapon" + WpnNum]
  [H: WpnProps = eval(WpnPropName)]
  
<!-- Error checking -- make sure the property string has been set up already. -->
  [H: NumProps = countStrProp(eval(WpnPropName))]
  [H: assert(NumProps!=0, "The " + WpnPropName + " property is not set up correctly.")]
  
<!-- Put up a dialog with all the properties in the property string. 
  -- Note that the new property string is automatically assigned back to the
  -- token property that holds the weapon's property string. -->
  [H: status = input("blah | " + WpnNum + " | Weapon number | LABEL",
      WpnPropName + " | " + WpnProps + " | Weapon properties | PROPS")]
  [H: abort(status)]

<!-- Print the new values to the chat window for verification. -->
New properties for weapon #{WpnNum}:
{formatStrProp(eval(WpnPropName), 
    "<table border=0>%list</table>", 
    "<tr><td style='padding:0px 5px'><b>%key</b></td> <td>%value</td></tr>",
    ""
)}