[h: activeId = arg(0)]
[h: selection = getSelected()]
[h: link = macroLinkText("actionFrame@Lib:ADnD1EMacros", "none", activeId)]
[h: perform= macroLinkText("performAction@Lib:ADnD1EMacros", "all")]
[frame("Action"): {
    <html>
        <head>
            <link rel='onChangeSelection' type='macro' href='[r:link]'>
        </head>
        <body>
            <b>Attacker:</b><br>
            [r, token(activeId): strformat("<img src='%s' alt='%s'>", getTokenImage(50), getName())]
            <br>
            <b>Targets:</b> <br>
            [r, foreach(id, selection, " "), code: {
                [r, token(id): strformat("<img src='%s' alt='%s'>", getTokenImage(50), getName())]
            }]
            <form action="[r:perform]" method="json">
            <input type="text" name="mods" value="0"><br>
            <input type="submit" name="btn_submit" value="Perform action">
            <input type="hidden" name="id" value="[r:activeId]">
            <input type="hidden" name="targets" value="[r:selection]">
        }]