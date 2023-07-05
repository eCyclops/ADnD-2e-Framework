[frame("SpellImport", "input=0"): {
  <html>
    <head>
        <meta name="input" content="true">
    </head>
    <body>
      <form method="json" name="spellInput" action="[r:macroLinkText('SpellImportFromFrame@Lib:Spells:Macros',"all")]">
       <p>Paste spell details below and hit <b>Save</b>.</p><p>name|level|school|range|duration|aoe|components|casttime|save</p>

        <table>
          <tr>
            <td>
              <textarea rows="20" cols="80" name='TextBox' ></textarea> 
           </td>
          </tr>

          <tr>
            <td>
	<input type='radio' name='impType' value='ARCANE' checked>ARCANE Spells</input>
	<input type='radio' name='impType' value='DIVINE'>DIVINE spells</input>
           </td>
          </tr>

</table>
        <input type="submit"  name="Save" value="Save"> </input>
      </form>

<p>
    </body>
  </html>
}]