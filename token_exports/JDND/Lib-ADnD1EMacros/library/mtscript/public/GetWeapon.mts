    <!--

      Retrieves a weapon from the Weapons Property list.

     

      Parameters

        Weapon Number

     

      Returns

        A string property list with following keys

          Name = Name of Weapon

          Damage = Damage Weapon does

          Bonus = Bonus of Weapon

          Number = The index number of the Weapon

        If the weapon is not found then an empty string ("") is returned.

    -->

    [h: num = arg(0)]

    [h: damage = getStrProp(Weapons, strformat("Weapon%{num}Damage"))]

    [h: name = getStrProp(Weapons, strformat("Weapon%{num}Name"))]

    [h: bonus = getStrProp(Weapons, strformat("Weapon%{num}Bonus"))]

    [h, if(name == ""):

       macro.return = ""

    ;

       macro.return = strformat("Number=%{num}; Damage=%{damage}; Bonus=%{bonus}; Name=%{name}")

    ]