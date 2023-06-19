[frame("Edit Changelog"): {
  <html>
    <head>
      <link rel=stylesheet type=text/css href=CharSheet_css@Lib:ADND>
      <meta name="input" content="true">
    </head>
    <body>
      <form method="json" name="logEditor" action="[r:macroLinkText('updateChangelogData@Lib:ADND','none')]">
        <table>
          <tr><td align="center">Edit Changelog</td></tr>
          <tr>
            <td>
              <textarea rows="20" cols="80" name="log">[r: decode(getLibProperty("Changelog", "Lib:ADND"))]</textarea> 
            </td>
          </tr>
          <tr>
            <td align="center"><input type="submit" name="Save" value="Save"> </input></td>
          </tr>
        </table>
      </form>
    </body>
  </html>
}]