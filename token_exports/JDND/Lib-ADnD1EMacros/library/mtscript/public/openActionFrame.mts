    [h: chosenAction = arg(0)]

    [h, if(hasImpersonated()): activeId = getImpersonated(); activeId = getSelected()]

    [h, if(listCount(activeId)!=1): assert(0, "You have to select only one token")]

    [h: gm = isGM()]

    [h: owned = isOwner(getPlayerName(), activeId)]

    [h, if(gm ||  owned): ""; assert(0, "You have no right to act with this token.")]

    [h: deselectTokens()]

     

    <!-- call right actionFrame for chosenAction -->

    [r, macro("actionFrame@Lib:ADnD1EMacros"): activeId]