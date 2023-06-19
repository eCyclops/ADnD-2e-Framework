<!-- ======================================================================
     ====
     ==== Outputs a "progress" bar
     ====
     ==== Parameters (accepts a string property list with following keys)
     ====
     ====   MaxLen - Maximum length of status bar.
     ====   MaxValue - The "Full" value for the bar.
     ====   Value - The current value for the bar.
     ====   Label - The label for the bar.
     ====   Color - R,G,B color
     ====
     ====================================================================== -->
[h: r0=200] [h: g0=200] [h: b0=200]
[h: MaxLen=getStrProp(arg(0), "MaxLen")]
[h: MaxValue=getStrProp(arg(0), "MaxValue")]
[h: Value=getStrProp(arg(0), "Value")]
[h: Color=getStrProp(arg(0), "Color")]
[h: Label=getStrProp(arg(0), "Label")]
[h: r1=listGet(Color,0)]
[h: g1=listGet(Color,1)]
[h: b1=listGet(Color,2)]
[h: Len=max(min(round(Value*MaxLen/MaxValue+0.4999),MaxLen),0)]
[h: c=min(round(Value/MaxValue+0.4999),1)]
[h: col=min(max(Len,0),1)*c]
[h: r=eval("r"+col)] [h: g=eval("g"+col)] [h: b=eval("b"+col)]
<table>
  <tr>
    <td><span title="{Value}/{MaxValue}">{Label}</span></td>
    <td style="background-color: rgb({r},{g},{b})">
      <span title="{Value}/{MaxValue}">[r: strformat("<span style='color:white'>%d XP out of %d : %d Remaining</span>",Value,MaxValue,MaxValue-Value)] [c(Len, ""),r: "&nbsp;"]</span>
    </td>
    [if(MaxLen-Len>0), code: {
      <td style="background-color: rgb({r0},{g0},{b0})">
        <span title="{Value}/{MaxValue}">[c(MaxLen-Len,""),r: "&nbsp;"]</span>
      </td>
    };{}]
  </tr>
</table>