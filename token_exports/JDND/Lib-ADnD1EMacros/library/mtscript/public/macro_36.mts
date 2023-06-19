    [h: arguments = arg(0)]
    [h: id = json.get(arguments, "id")]
    [h: targets = json.get(arguments, "targets")]
    [h, if(listCount(targets)<1): abort(0)]
    <!-- target and performer could be the same -->
    <!-- target could be one or many -->

    <!-- roll the attack -->

    <b>Melee attack:</b><br>
    [r, foreach(target, targets, "<br>"), code: {
        <b>[r: getName(id)]</b> rolls
        [r, token(id): rollResult = 1d20 + Strength]
        [r, if(rollResult>=15), code: {
            and hits <b>[r:getName(target)]</b> for
            [r: dmg = 1d6 + getProperty("Strength", id) - getProperty("Armor", target)]
            points of damage.
            [h: setProperty("Hit Points", getProperty("Hit Points", target) - max(0,dmg), target)]
        };{and misses [r:getName(target)]}]
    }]