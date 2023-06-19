    <!-- ============================================================ -->

    <!-- ============================================================ -->

    <!-- ============================================================ -->

    <!--

      Deletes a weapon from the Weapons property List.

     

      Parameters

        The weapon number

    -->

    [h: num = arg(0)]

    [h: Weapons = deleteStrProp(Weapons, strformat("Weapon%{num}Damage"))]

    [h: Weapons = deleteStrProp(Weapons, strformat("Weapon%{num}Name"))]

    [h: Weapons = deleteStrProp(Weapons, strformat("Weapon%{num}Bonus"))]