    <!-- Adds a weapon to the Weapons property list
      Parameters (in a string property list)
      Name = Name of Weapon
      Damage = Damage Weapon does
      Bonus = Bonus of Weapon
      Number = The index number of the Weapon
    -->

    [h: num = getStrProp(arg(0), "Number")]
    [h: damage = getStrProp(arg(0), "Damage")]
    [h: name = getStrProp(arg(0), "Name")]
    [h: bonus = getStrProp(arg(0), "Bonus")]
    [h: Weapons = setStrProp(Weapons, strformat("Weapon%{num}Name"), name)]
    [h: Weapons = setStrProp(Weapons, strformat("Weapon%{num}Damage"), damage)]
    [h: Weapons = setStrProp(Weapons, strformat("Weapon%{num}Bonus"), bonus)]