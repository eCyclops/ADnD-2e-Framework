[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: name = decode(getStrProp(arg(0),"name",""))]
[h: description = decode(getStrProp(arg(0),"description",""))]

[dialog("Journal Entry"): {
  <html>
    <head>
      <link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
      <meta name="input" content="true">
    </head>
    <body>
      <form method="json" name="journalInput" action="[r:macroLinkText('editJournalFormParse@Lib:Journal:Macros',"none")]">
        <table>
          <tr>
            <td>
              <table width="100%">
                <td>[r: macroLink("Markdown Reference","Markdown Reference@Lib:Markdown","none")]</td>
                <td width=10px><input type="checkbox" name="deleteEntry" value="Delete"></td>
                <td>Delete?</td>
                <td align=right><input type="submit"  name="Save" value="Save"> </input></td>
              </table>
            </td>
          </tr>
        
          <tr><td>Name of Entry</td></tr>
          <tr>
            <td>
              <input type="text" name="name" size="40" maxlength="120" value="[r: name]">
            </td>
          </tr>

          <tr>
            <td>Journal Entry</td>
          </tr>

          <tr>
            <td>
              <textarea rows="20" cols="80" name='description'>[r: description]</textarea> 
            </td>
          </tr>

        </table>
        <input type="hidden" name="myID" value="[r: myID]">
      </form>
    </body>
  </html>
}]