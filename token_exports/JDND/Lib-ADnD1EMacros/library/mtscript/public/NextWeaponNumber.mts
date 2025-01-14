    <!--

      Returns the number for the next weapon as well as updating the

      the counter.

      -->

     

    <!-- If Weapons token property is empty set it to a default value -->

    [h,if(isPropertyEmpty("Weapons")): Weapons = "NumWeapons=0;"]

     

    [h: numWeapons = getStrProp(Weapons, "NumWeapons") + 1]

     

    <!-- Now update our property -->

    [h: Weapons = setStrProp(Weapons, "NumWeapons", numWeapons)]

     

    <!-- Finally set out return value -->

    [h: macro.return = numWeapons]