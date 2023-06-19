    [h: propNames = "Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma"]

    [dialog("CharSheetTest"): {

      <html>

        <head>

          <link rel="stylesheet" type="text/css" href="CharSheet_css@[r: getMacroLocation()]">

          <title>Character Sheet</title>

        </head>

        <body>

          <table>

            <tr>

              <td>

                <img src='[r: getTokenImage(100)]'></img>

              </td>

              <td>

                <table id="stats">

                  <tr>

                    <th>Name</th>

                    <th>Score</th>

                  </tr>

                  [h: htmlclass = "oddRow"]

                  [foreach(prop, propNames, ""), code: {

                    <tr class="[r:htmlclass]">

                      <td>[r: prop]</td>

                      <td>[r: getProperty(prop)]</td>

                    </tr>

                    [h: htmlclass = if(htmlclass=="oddRow", "evenRow", "oddRow")]

                  }]

                </table>

              </td>

            </tr>

          </table>

          <hr>

          <table>

            <tr>

              <td>

                [h: hpBarArgs = strformat("MaxLen=50; Value=%{HP}; MaxValue=%{MaxHP}; Label=HP")]

                [macro("TrafficLightBar@this"): hpBarArgs]

              </td>

            </tr>

            <tr>

              <td>

                [h: hpBarArgs = strformat("MaxLen=50; Value=%{XP}; MaxValue=%{NextLevelXP}; Label=XP; Color=120,120,255")]

                [macro("StatusBar@this"): hpBarArgs]

              </td>

            </tr>

          </table>

        </body>

      </html>

    }]