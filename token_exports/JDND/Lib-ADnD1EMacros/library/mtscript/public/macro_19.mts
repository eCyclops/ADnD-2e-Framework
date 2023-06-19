    [dialog("weaponInput"): {

      [h: weaponNum = getStrProp(arg(0), "Number")]

      [h: name = getStrProp(arg(0), "Name")]

      [h: bonus = getStrProp(arg(0), "Bonus")]

      [h: damage = getStrProp(arg(0), "Damage")]

      <!-- If we do not have a weapon number grab the next one -->

      [h, if(weaponNum == ""), code: {

        [h,macro("NextWeaponNumber@this"): ""]

        [h: weaponNum = macro.return]

      }]

      <html>

        <head>

          <title>Edit Weapon Dialog</title>

          <meta name="input" content="true">

          <link rel="stylesheet" type="text/css" href="EditWeapon_css@[r: getMacroLocation()]">

        </head>

        <body>

          <form name="weaponInput" action="[r:macroLinkText('AddWeapon@Lib:ADnD1EMacros')]">

            <table>

              <tr>

                <td>

                  <table>

                    <tr>

                      <th>

                        <label for="Name">Weapon Name</label>

                      </th>

                      <td>

                        <input type="text" name="Name" value="[r: name]">

                        </input> <br>

                      </td>

                    </tr>

                    <tr>

                      <th>

                        <label for="Damage">Weapon Damage</label>

                      </th>

                      <td>

                        <input type="text" name="Damage" value="[r: damage]">

                        </input> <br>

                      </td>

                    </tr>

                    <tr>

                      <th>

                        <label for="Bonus">Weapon Bonus</label>

                      </th>

                      <td>

                        <input type="text" name="Bonus" value="[r: bonus]">

                        </input>

                      </td>

                    </tr>

                  </table>

                </td>

                <td>

                  <img src='[r: getTokenImage(100)]'></img>

                </td>

              </tr>

            </table>

            <!-- hidden input with the weapon number -->

            <input type="hidden" name="Number" value="[r: weaponNum]">

            </input>

            <input id="saveButton" type="submit" name="Save" value="Save">

            </input>

          </form>

        </body>

      </html>

    }]