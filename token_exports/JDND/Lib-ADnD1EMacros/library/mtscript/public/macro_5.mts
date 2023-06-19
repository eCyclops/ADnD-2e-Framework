<!-- zEal Debugging Macros from rptools.net forum -->
<!-- Translate -->
[toolkit.Debugger.Title = "Debugger" ]
[ toolkit.DebuggerTitleCaps = upper( toolkit.DebuggerTitle ) ]
[ toolkit.DebugExpectationsTitle = "Expectations" ]
[ toolkit.DebugEnvironmentTitle = "Environment" ]
[ toolkit.DebugCurrentMacroTitle = "Current Macro" ]
[ toolkit.DebugMacroLocationTitle = "Macro Location" ]
[ toolkit.DebugCurrentTokenTitle = "Current Token" ]
[ toolkit.DebugImpersonatedTokenTitle = "Impersonated Token" ]
[ toolkit.DebugImpersonatedTokenNone = "No impersonated tokens" ]
[ toolkit.DebugSelectedTokensTitle = "Selected Tokens" ]
[ toolkit.DebugSelectedTokensNone = "No selected tokens" ]
[ toolkit.DebugVariableTraceTitle = "Variable Trace" ]

<!-- Layout -->
[ toolkit.DebugInputParameters = ".|<html>" +
    "<span style='font-size:2.00em;'><b><i>%{toolkit.DebuggerTitleCaps}</i></b></span>" +
    "<table cellspacing='2' cellpadding='0' style='background-color:#595751'>" +
    "<tr><td>" +
    "<table cellspacing='10' cellpadding='0' style='background-color:#faf9f5'>" +
    "<tr><td valign='top' width='50%'><span style='font-size:1.7em'><b>%{toolkit.DebugEnvironmentTitle}</b></span>" +
    "<table width='200px' border='0' cellspacing='2' cellpadding='0'>%{toolkit.DebugEnvironmentRows}</table></td>" +
    "<td width='200px' valign='top'><span style='font-size:1.7em'><b>%{toolkit.DebugVariableTraceTitle}</b></span>" +
    "<table width='100%' border='0' cellspacing='2' cellpadding='0'>%{toolkit.DebugVariableRows}</table>" +
    "</td></tr><tr><td colspan='2'>" +
    "<table width='100%' cellpadding='0' cellspacing='2'>" +
    "<tr><td style='font-size:1.2em;'><b>%{toolkit.DebugExpectationsTitle}</b></td></tr>" +
    "<tr><td style='background-color:#EDECE8;'>%{toolkit.DebugExpectations}</td></tr></table></td></tr>" +
    "</table></td></tr></table></html>"+
    "|%{toolkit.DebuggerTitle}|LABEL|SPAN=TRUE"
]
[ toolkit.DebugTableRow = "<tr><td style='background-color:#EDECE8;'>" +
    "<b>%{toolkit.DebugTableRowTitle}</b></td></tr>" +
    "<tr><td>%{toolkit.DebugTableRowContent}</td></tr>"
]

<!-- Get parameters from arg(0) -->
[ toolkit.DebugMacroName = json.get( arg( 0 ), 0 ) ]
[ toolkit.DebugMacroLocation = json.get( arg( 0 ), 1 ) ]
[ toolkit.DebugExpectations = json.get( arg( 0 ), 2 ) ]
[ toolkit.DebugVariables = json.remove( json.remove( json.remove( arg( 0 ), 0 ), 0 ), 0 ) ] 

<!-- Build toolkit.DebugEnvironmentRows -->
[ toolkit.DebugEnvironmentRows = "" ]

<!-- Macro name -->
[ toolkit.DebugTableRowTitle = toolkit.DebugCurrentMacroTitle ]
[ toolkit.DebugTableRowContent = toolkit.DebugMacroName ]
[ toolkit.DebugEnvironmentRows = toolkit.DebugEnvironmentRows + strformat( toolkit.DebugTableRow ) ]

<!-- Macro location -->
[ toolkit.DebugTableRowTitle = toolkit.DebugMacroLocationTitle ]
[ toolkit.DebugTableRowContent = toolkit.DebugMacroLocation ]
[ toolkit.DebugEnvironmentRows = toolkit.DebugEnvironmentRows + strformat( toolkit.DebugTableRow ) ]

<!-- Current token -->
[ toolkit.DebugTableRowTitle = toolkit.DebugCurrentTokenTitle ]
[ toolkit.DebugTableRowContent = getName( currentToken() ) + "<br><i>" + currentToken() + "</i>" ]
[ toolkit.DebugEnvironmentRows = toolkit.DebugEnvironmentRows + strformat( toolkit.DebugTableRow ) ]

<!-- Impersonated token -->
[ toolkit.DebugTableRowTitle = toolkit.DebugImpersonatedTokenTitle ]
[ if( hasImpersonated() ), code:
{
    [ toolkit.DebugTableRowContent = getImpersonatedName() + "<br><i>" + getImpersonated() + "</i>" ]
};{
    [ toolkit.DebugTableRowContent = toolkit.DebugImpersonatedTokenNone ]
} ]
[ toolkit.DebugEnvironmentRows = toolkit.DebugEnvironmentRows + strformat( toolkit.DebugTableRow ) ]

<!-- Selected tokens -->
[ toolkit.DebugTableRowTitle = toolkit.DebugSelectedTokensTitle ]
[ toolkit.SelectedTokens = getSelected("json") ]
[ toolkit.SelectedTokenCount = json.length( toolkit.SelectedTokens ) ]
[ if( toolkit.SelectedTokenCount > 0 ), code:
{
    [ toolkit.DebugTableRowContent = "" ]
    [ foreach( SelectedToken, toolkit.SelectedTokens ), code:
    {
        [ toolkit.DebugTableRowContent = toolkit.DebugTableRowContent +
            if( roll.count != 0, "</td></tr>", "" ) +
            getName( SelectedToken ) +
            "<br><i>" + SelectedToken + "</i>"
        ]
    } ]
};{
    [ toolkit.DebugTableRowContent = toolkit.DebugSelectedTokensNone ]
} ]
[ toolkit.DebugEnvironmentRows = toolkit.DebugEnvironmentRows + strformat( toolkit.DebugTableRow ) ]

<!-- Build toolkit.DebugVariableRows -->
[ toolkit.DebugVariableRows = "" ]
[ foreach( DebugVariable, toolkit.DebugVariables ), code:
{
    [ toolkit.DebugTableRowTitle = DebugVariable ]
    [ toolkit.DebugTableRowContent = eval( DebugVariable ) ]
    [ toolkit.DebugVariableRows = toolkit.DebugVariableRows + strformat( toolkit.DebugTableRow ) ]
} ]

<!-- Show debug -->
[ toolkit.DebugBreak = input( strformat( toolkit.DebugInputParameters ) ) ]
[ abort( toolkit.DebugBreak ) ] 
