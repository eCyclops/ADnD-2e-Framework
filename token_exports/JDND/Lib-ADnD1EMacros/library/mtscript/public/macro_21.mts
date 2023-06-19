    [dialog("Weapons"): {
      <html>
        <head>
          <title>Weapons</title>
          <link rel="stylesheet" type="text/css" href="ViewWeapon_css@[r: getMacroLocation()]">
        </head>
        <body>
          [h,macro("GetWeaponNumbers@this"): ""]
          [h: wpList = macro.return]
          <table>
            [foreach(weapon, wpList, ""), code: {
              [h,macro("GetWeapon@this"): weapon]
              [h: wProp = macro.return]
              <tr class="WeaponName">
                <th>
                  [r: getStrProp(wProp, "Name")]
                </th>
              </tr>
              <tr>
                <th>Damage</th>
                <td>[r: getStrProp(wProp, "Damage")]</td>
                <th>Bonus</th>
                <td>[r: getStrProp(wProp, "Bonus")]</td>
              </tr>
            }]
          </table>
        </body>
      </html>
    }]