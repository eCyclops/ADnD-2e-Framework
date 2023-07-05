<!-----===== FormatTooltip =====----->
<!-- This function takes a JSON object of variables (labels) and values 
to be formatted into a table for a tooltip pop-up in the MapTools non-standard HTML interpreter,
overtop the sum, which is automatically calculated -->
[H: numArgs = argCount() ]
[H: tValues = arg(0) ]    <!-- arg(0) if not a user-defined function -->
[H, IF( numArgs>1 ): sumValues = arg(1) ; sumValues = 1 ]    <!-- optional switch to calculate sum or just return formatted table -->
[H, IF( numArgs>2 ): vsDC = arg(2) ; vsDC = "" ]    <!-- optional value to compare to sum as success threshold (DC) -->
[H, if( isNumber( vsDC ) ): vsDC = number( vsDC ) ; vsDC = 0 ]
[H: tNames = json.fields( tValues )]

<!--calculte sum of value-->
[H: valueSum = 0 ]
[H, FOREACH( var, tNames, "" ): valueSum = valueSum + json.get( tValues, var )]
<!--calculate the the result vs the DC-->
[H: marginDC = valueSum - vsDC ]    <!-- margin of the roll vs DC.  >=0 is a pass, <0 is a fail -->

<!--create basic tooltip html-->
<!--HEADER-->
[H: ttHead = "<html><head>"+
    "<style><!--"+
    "   td              { font-family: Verdana,sans-serif ; }
        td.var          {font-style: italic;
                        text-align: left;}
        td.value        {text-align: right;}
        tr.total        {font-weight: bold;
                        color: #333333;
                        background: #CCCCFF;}
        tr.dc, tr.dcfail{font-weight: normal;
                        font-size: 100%;
                        color: #000000;
                        background: #CCFFCC;}
        tr.dcfail       {color: #660000;
                        background: #CCCCCC;}
    --></style></head><body>"]

<!--CONTENT-->
[H:                             ttContents = "<table>"]
<!--add labels with values-->
[H, FOREACH( var, tNames, "" ):ttContents = ttContents + strformat("<tr><td class='var'>%s</td><td class='value' style='text-align: right;'>%s</td></tr>", var, json.get( tValues,var ))]
<!--add the sum of values-->
[H:                             ttContents = ttContents + strformat("<tr class='total'><td class='var'><em>Total</em></td><td class='value' >%s</td></tr>",valueSum)]
<!--add DC is it is set-->
[H, if( vsDC!=0 ):             ttContents = ttContents + strformat("<tr class='%s'><td class='var'><strong>%s</strong></td><td class='value' style='text-align: right;'><em>vs.</em>%s</td></tr>", if( marginDC<0, "dcfail", "dc" ), if( marginDC>0, "+", "" )+ marginDC, vsDC)]
<!--end of the content-->
[H:                             ttContents = ttContents + "</table>" ]

<!--FOOTER-->
[H: ttFoot = "</body></html>" ]

<!--add HEADER, CONTENT and FOOTER-->
[H: ttHTML = ttHead + ttContents + ttFoot ]

<!--set background color for output text (to chat-->
[H: textBG = if(vsDC!=0, if( marginDC<0, "#FFCCCC", "#CCFFCC" ), "#EEEEEE")]

[H, IF( sumValues ), CODE:{
    <!--create output with tt-->
    [formattedtt = strformat('<span style="background:%s" title="%s" >%s</span>', textBG, ttHTML, if( vsDC==0, valueSum, if( marginDC>0, "+", "" )+ marginDC ) ) ]
};{
    <!--create output without tt, just show list of values-->
    [formattedtt = ttContents ]
}]

<!--return value to calling macro-->
[H: macro.return = formattedtt ]