[h: name = decode(getStrProp(arg(0),"name",""))]
[h: description = decode(getStrProp(arg(0),"description",""))]
[h: visible = getStrProp(arg(0),"visible",0)]

[h, if(visible): visibleChecked = strformat('checked="checked"'); visibleChecked='']

[frame("Add/Edit Journal Entry", "input=0"): {
  <html>
    <head>
	<link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
	<meta name="input" content="true">
    </head>
    <body>
      <form method="json" name="journalInput" action="[r:macroLinkText('editFormParse@Lib:Journal:Macros',"none")]">
        <table>
	<tr>
	<td><table><td><input type="checkbox" name="playerVisible" value="Visible" [r: visibleChecked]></td><td>Visible to Players?</td></table></td>
	</tr>
	<tr><td>Name of Entry</td></tr>
	<tr><td>
		<input type="text" name="name" size="40" maxlength="120" value="[r: name]">
	</td></tr>
	<tr><td>Journal Entry</td></tr>
          <tr>
            <td>
              <textarea rows="20" cols="80" name='description'>[r: description]</textarea> 
           </td>
          </tr>

          <tr>
	<td><table><td><input type="checkbox" name="deleteEntry" value="Delete"></td><td>Delete?</td></table></td>
          </tr>

	<tr>
	<td align=center><input type="submit"  name="Save" value="Save"> </input></td>
	</tr>

</table>
      </form>

<p>
    </body>
  </html>
}]