<!-- zEal Debugging macros from rptools.net forum -->
[ toolkit.DebugVariableCount = argCount() ]
[ toolkit.DebugInputParameter = ".|<html>" +
    "<table cellspacing='2' cellpadding='0' style='background-color:#595751'>" +
    "<tr><td>" +
    "<table width='300px' cellspacing='0' cellpadding='2' style='background-color:#FAF9F5;'>" +
    "%{toolkit.DebugVariableRows}</table></td></tr></html>" +
    "|Debugger|LABEL|SPAN=TRUE"
]
[ toolkit.DebugVariableRow = "<tr %{toolkit.DebugVariableRowStyle}><td>" +
    "<b>%{toolkit.DebugVariableName}</b></td><td>%{toolkit.DebugVariableContent}" +
    "</td></tr>"
]
[ toolkit.DebugVariableRows = "<tr style='background-color:#E0DDD5; font-size:1.1em;'><td><b>Variable</b></td><td><b>Value</b></td></tr>" ]
[ count( toolkit.DebugVariableCount ), code:
{
    [ toolkit.DebugVariableRowStyle = "" ]
    [ toolkit.DebugVariableName = arg( roll.count ) ]
    [ toolkit.DebugVariableContent = eval( arg( roll.count ) ) ]
    [ if( floor( roll.count/2 ) == roll.count/2 ), code:
    {
        [ toolkit.DebugVariableRowStyle = "style='background-color:#EDECE8;'" ]
    } ]
    [ toolkit.DebugVariableRows = toolkit.DebugVariableRows +
        strformat( toolkit.DebugVariableRow )
    ]
} ]
[ if( toolkit.DebugVariableCount == 0 ), code:
{
    [ toolkit.DebugVariableRows = "<tr><td style='font-size: 1.4em' align='center'><b>Pause</b></td></tr>" ]
} ]

[ toolkit.DebugBreak = input( strformat( toolkit.DebugInputParameter ) )]
[ abort( toolkit.DebugBreak ) ] 