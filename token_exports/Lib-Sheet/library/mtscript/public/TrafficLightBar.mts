<!-- ======================================================================
     ====
     ==== Outputs a red/yellow/green bar
     ====
     ==== Parameters (accepts a string property list with following keys)
     ====
     ====   MaxLen - Maximum length of status bar.
     ====   MaxValue - The "Full" value for the bar.
     ====   Value - The current value for the bar.
     ====   Label - The label for the bar.
     ====
     ====================================================================== -->
<!-- Set up the colors for our "Traffic Lights" -->
[h: r0=200] [h: g0=200] [h: b0=200]
[h: r1=200] [h: g1=0]   [h: b1=0]
[h: r2=255] [h: g2=140] [h: b2=0]
[h: r3=0]   [h: g3=200] [h: b3=0]
[h: MaxLen=getStrProp(arg(0), "MaxLen")]
[h: MaxValue=getStrProp(arg(0), "MaxValue")]
[h: Value=getStrProp(arg(0), "Value")]
[h: Label=getStrProp(arg(0), "Label")]
[h: Len=max(min(round(Value*MaxLen/MaxValue+0.4999),MaxLen),0)]
[h: Len=if(Value>=MaxValue,MaxLen, Len)]
[h: c=min(round(Value*3/MaxValue+0.4999),3)]
[h: col=min(max(Len,0),1)*c]
[h: r=eval("r"+col)] [h: g=eval("g"+col)] [h: b=eval("b"+col)]
<table>
  <tr>
    <td><span title="{Value}/{MaxValue}">{Label}</span></td>
    <td style="background-color: rgb({r},{g},{b})">
      <span title="{Value}/{MaxValue}">[c(Len, ""),r: "&nbsp;"]</span>
    </td>
    [if(MaxLen-Len>0), code: {
      <td style="background-color: rgb({r0},{g0},{b0})">
        <span title="{Value}/{MaxValue}">[c(MaxLen-Len,""),r: "&nbsp;"]</span>
      </td>
    };{}]
  </tr>
</table>