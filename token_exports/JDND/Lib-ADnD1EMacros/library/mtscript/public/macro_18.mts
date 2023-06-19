    <!--

      Gets a string list of the valid weapon numbers

    -->

    <!-- If Weapons token property is empty set it to a default value -->

    [h,if(isPropertyEmpty("Weapons")): Weapons = "NumWeapons=0;"]

     

    [h: maxNum = getStrProp(Weapons, "NumWeapons")]

    [h: wnumList=""]

    [h,c(maxNum), code: {

      [h: wnum = roll.count+1]

      [h: name = getStrProp(Weapons, strformat("Weapon%{wnum}Name"))]

      [if(name != ""):

        wnumList = listAppend(string(wnumList), string(wnum))

      ]

    }]

    [h: macro.return = wnumList]