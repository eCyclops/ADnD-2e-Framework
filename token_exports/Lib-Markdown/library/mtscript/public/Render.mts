[h:ImageSize=getLibProperty("ImageSize","Lib:Markdown")]
[h:SharedImageSize=getLibProperty("SharedImageSize","Lib:Markdown")]
[h:Roll=getLibProperty("Roll","Lib:Markdown")]
[h:diceArgs=getLibProperty("diceArgs","Lib:Markdown")]
[h:DiceOutput=getLibProperty("DiceOutput","Lib:Markdown")]
[h:Output=getLibProperty("Output","Lib:Markdown")]
[h:ListType=getLibProperty("ListType","Lib:Markdown")]
[h:NestedListType=getLibProperty("NestedListType","Lib:Markdown")]
[h: doubleQuote='"']

<!------------------- RENDER ---------------------->
[h:entry=arg(0)]

<!-------------- REPLACEMENT ---------------->
[h:entry=replace(entry,"\\\\\\`","&#96;")] <!--Replace \\\` with ` Why aren't we just replacing "\`"?-->

<!-------------- CODE ---------------->
[h:entry=replace(entry,"<","LESSERTHAN")]
[h:entry=replace(entry,">","GREATERTHAN")]

[h:codeId=strfind(entry,"`{3}(?!\\n)\\s?(?!\\n)code\\n([\\s\\S]*?)\\n`{3}")]
[h,count(getFindCount(codeId)),code:{
	[h:entry=replace(entry,"`{3}(?!\\n)\\s?(?!\\n)code\\n([\\s\\S]*?)\\n`{3}","CODEPLACEHOLDER"+roll.count,1)]
}]
[h:entry=replace(entry,"OPENCURLYBRACEPLACEHOLDER","{")]
[h:entry=replace(entry,"LESSERTHAN","<")]
[h:entry=replace(entry,"GREATERTHAN",">")]

<!-------------- IN LINE CODE ---------------->
[h:inLineId=strfind(entry,"(?!`{2})`{1}(.*?)`{1}(?!`{2})")]
[h,count(getFindCount(inLineId)),code:{
	[h:group=getGroup(inLineId,roll.count+1,1)]
	[h:entry=replace(entry,"(?!`{2})`{1}(.*?)`{1}(?!`{2})","INLINEPLACEHOLDER"+roll.count,1)]
}]

<!-------------- FUNCTION ---------------->
[h:id=strfind(entry,"\\[\\w*?:(.*?)\\]")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:group=eval(group)]
	[h:entry=replace(entry,"\\[\\w*?:(.*?)\\]",group,1)]
}]

<!-------------- HMTL ---------------->
[h:htmlId=strfind(entry,'(?:<([a-z0-9"\\s]*)>)([\\s\\S]*?)(?:<\\/\\1>)')]
[r,count(getFindCount(htmlId)),code:{
	[h:entry=replace(entry,'(?:<([a-z0-9"\\s]*)>)([\\s\\S]*?)(?:<\\/\\1>)',"HTMLPLACEHOLDER"+roll.count,1)]
}]

<!-------------- CHARACTERS ---------------->
[h:entry=replace(entry,"->","&#45;&gt;")]
[h:entry=replace(entry,"=>","&#61;&gt;")]

[h:entry=replace(entry,"\\\\\\*","&#42;")]
[h:entry=replace(entry,"(?!-)\\s*-\\s*?(?=\\|)(?!-)","&mdash;")]

[h:entry=replace(entry,"\\\\\\_","&#95;")]
[h:entry=replace(entry,"\\\\\\#","&#35;")]
[h:entry=replace(entry,"\\\\\\\\","&#92;")]
[h:entry=replace(entry,"\\\\\\{","&#123;")]
[h:entry=replace(entry,"\\\\\\}","&#125;")]
[h:entry=replace(entry,"\\\\\\[","&#91;")]
[h:entry=replace(entry,"\\\\\\]","&#93;")]
[h:entry=replace(entry,"\\\\\\(","&#40;")]
[h:entry=replace(entry,"\\\\\\)","&#41;")]
[h:entry=replace(entry,"\\\\\\.","&#46;")]
[h:entry=replace(entry,"\\\\\\!","&#33;")]
[h:entry=replace(entry,"\\\\\\|","&#124;")]
[h:entry=replace(entry,"\\\\\\+","&#43;")]
[h:entry=replace(entry,"\\\\\\-","&#45;")]

[h:entry=replace(entry,"\\?","QESTIONMARKPLACEHOLDER")]
[h:entry=replace(entry,"\\(","OPENPARENTHESESPLACEHOLDER")]
[h:entry=replace(entry,"\\)","CLOSEPARENTHESESPLACEHOLDER")]
[h:entry=replace(entry,"\\*","ASTERISKLACEHOLDER")]

<!-------------- HEADER 6 ---------------->
[h:id=strfind(entry,"#{6}\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,find,"<h6>"+group+"</h6>",1)]
}]

<!-------------- HEADER 5 ---------------->
[h:id=strfind(entry,"#{5}\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,find,"<h5>"+group+"</h5>",1)]
}]

<!-------------- HEADER 4 ---------------->
[h:id=strfind(entry,"#{4}\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,find,"<h4>"+group+"</h4>",1)]
}]

<!-------------- HEADER 3 ---------------->
[h:id=strfind(entry,"#{3}\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,find,"<h3>"+group+"</h3>",1)]
}]

<!-------------- HEADER 2 ---------------->
[h:id=strfind(entry,"#{2}\\s(.*)")]
	[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,find,"<h2>"+group+"</h2>",1)]
}]

<!-------------- HEADER 1 ---------------->
[h:id=strfind(entry,"#{1}\\s(.*)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,find,"<h1>"+group+"</h1>",1)]
}]
[h:entry=replace(entry,"ASTERISKLACEHOLDER","*")]

<!-------------- TABLE ---------------->
[h:id=strfind(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,1)]
	
	[h:find=replace(find,"\\[","OPENBRACKETPLACEHOLDER")]
	[h:find=replace(find,"\\]","CLOSEBRACKETPLACEHOLDER")]
	
	[h:ColCount=strfind(find,"(\\|[\\s:]*-{3,}[\\s:]*)")]
	[h:Col=getFindCount(ColCount)]
	
	[h:RowCount=strfind(find,"(\\|\\n\\s*\\|)")]
	
	[h:find=replace(find,"(\\|.*-{3,}:*)","")]
	[h:find=replace(find,"(\\|)","<th>",Col)]
	[h:find=replace(find,"(\\|)","",1)]
	
	[h:class="odd"]
	[h,count(getFindCount(RowCount),"<br><br>"),code:{
	
	[h:find=replace(find,"(\\|\\n\\s*\\|)","<tr"+if(class=="even",""," class=evenTableRow")+">
<td>"
	,1)]
	[h:class=if(class=="odd","even","odd")]
	}]
	
	[h:find=replace(find,"(\\|)","<td>
"
	)]
	
	[h:find="<table><tr>
"+find+"</table>"]
	[h:find=replace(find,"<td>
</table>","</table>")]
	
	[h:find=replace(find,"OPENBRACKETPLACEHOLDER","&#91;")]
	[h:find=replace(find,"CLOSEBRACKETPLACEHOLDER","&#93;")]
	
	[h:entry=replace(entry,"(\\|{1}[\\s\\S]*?\\|{1})(?=\\n{2}|\$)",find,1)]
}]

<!-------------- BLOCKQUOTES ---------------->
[h:entry=replace(entry,"\\n>","
<br>>")]
[h:entry=replace(entry,"\\s{4}>","
<br>>")]
[h:entry=replace(entry,"\\t>","
<br>>")]

[h:entry=replace(entry,"\\+","PLUSPLACEHOLDER")]
[h:entry=replace(entry,"\\*","ASTERISKPLACEHOLDER")]
[h:id=strfind(entry,"<br>>([\\s\\S]*?)(?=\\n{2}|\$)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:group=replace(group,"\\n+","")]
	[h:group=replace(group,"<br>>","
")]
	
	[h:entry=replace(entry,"<br>>([\\s\\S]*?)(?=\\n{2}|\$)","
<blockquote>

"+group+"

</blockquote>

",1)]
}]
[h:entry=replace(entry,"ASTERISKPLACEHOLDER","*")]
[h:entry=replace(entry,"PLUSPLACEHOLDER","+")]

<!-------------- NESTED BLOCKQUOTES ---------------->
[h:entry=replace(entry,"\\n>","
<br>>")]
[h:entry=replace(entry,"\\+","PLUSPLACEHOLDER")]
[h:entry=replace(entry,"\\*","ASTERISKPLACEHOLDER")]
[h:id=strfind(entry,"<br>>([\\s\\S]*?)(?=\\n{2}|\$)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:group=replace(group,"\\n+","")]
	[h:group=replace(group,"<br>>","
	
")]
	
	[h:entry=replace(entry,"<br>>([\\s\\S]*?)(?=\\n{2}|\$)","<blockquote>

"+group+"

</blockquote>
",1)]
}]
[h:entry=replace(entry,"ASTERISKPLACEHOLDER","*")]
[h:entry=replace(entry,"PLUSPLACEHOLDER","+")]

<!-------------- HORIZONTAL RULER ---------------->
[h:entry=replace(entry,"(\\n[-_\\*]{3,}\\n)","
<hr noshade>
"
)]

[h:entry=replace(entry,"OPENPARENTHESESPLACEHOLDER","(")]
[h:entry=replace(entry,"CLOSEPARENTHESESPLACEHOLDER",")")]

<!-------------- IMAGE LINK ---------------->
[h:id=strfind(entry,"\\[!\\[(.*?)\\]\\(([\\S]*)\\s*=*(\\d*)\\s*['"+doubleQuote+"]*([\\s\\d\\w!?.@#%^&\-+=/\\\\,<>|]*?)['"+doubleQuote+"]*\\)\\]\\(([\\S]*)\\)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]
	[h:group5=getGroup(id,roll.count+1,5)]
	
	[h:group2=if(matches(group2,"image:.*")==0,group2,getImage(group2))]
	
	[h:image="<table width=100% style='margin: 0px'><tr><td align=center style='margin: 0px'>"+if(group5=="Share","","<a href='"+group5+"'>")+"<img src='"+group2+"' width='"+if(group3=="",ImageSize,group3)+"'"+if(group4=="","","alt='"+group4+"'")+"></a><br><i>"+group1+"</i></table>"]
	[h:entry=replace(entry,"\\[!\\[(.*?)\\]\\(([\\S]*)\\s*=*(\\d*)\\s*['"+doubleQuote+"]*([\\s\\d\\w!?.@#%^&\-+=/\\\\,<>|]*?)['"+doubleQuote+"]*\\)\\]\\(([\\S]*)\\)",image,1)]
}]

<!-------------- IMAGE ---------------->
[h:id=strfind(entry,"!\\[(.*?)\\]\\(([\\S]*)\\s*=*(\\d*)\\s*['"+doubleQuote+"]*([\\s\\d\\w!?.@#%^&\-+=/\\\\,<>|]*?)['"+doubleQuote+"]*\\)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	[h:group4=getGroup(id,roll.count+1,4)]
	
	[h:group2=if(matches(group2,"image:.*")==0,group2,getImage(group2))]
	
	[h:image="<table width=100% style='margin: 0px'><tr><td align=center style='margin: 0px'><img src='"+group2+"' width='"+if(group3=="",ImageSize,group3)+"'"+if(group4=="","","alt='"+group4+"'")+"><br><i>"+group1+"</i></table>"]
	[h:entry=replace(entry,"!\\[(.*?)\\]\\(([\\S]*)\\s*=*(\\d*)\\s*['"+doubleQuote+"]*([\\s\\d\\w!?.@#%^&\-+=/\\\\,<>|]*?)['"+doubleQuote+"]*\\)",image,1)]
}]

<!------------------------- MACRO LINK ----------------------------->
[h:id=strfind(entry,"\\[(.*?)\\]\\((.*?)\\s['"+doubleQuote+"](.*?)['"+doubleQuote+"]\\)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:group3=getGroup(id,roll.count+1,3)]
	
	<!------------------------- DICE ROLL MACRO ----------------------------->
	[h:outputDiceArgs=diceArgs+group3]
	
	[h:args=if(group2=="Roll",outputDiceArgs,group3)]
	[h:macroName=if(group2=="Roll","Dice Output@Lib:Markdown",group2)]
	
	[h:link=macroLink(group1,macroName,if(group2=="Roll","All","All"),args)]
	
	[h:entry=replace(entry,"\\[(.*?)\\]\\((.*?)\\s['"+doubleQuote+"](.*?)['"+doubleQuote+"]\\)",link,1)]
}]

<!-------------- LINK ---------------->
[h:id=strfind(entry,"\\[(.*?)\\]\\((.*?)\\)")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	[h:link="<a href='"+group2+"'>"+group1+"</a>"]
	[h:entry=replace(entry,"\\[(.*?)\\]\\((.*?)\\)",link,1)]
}]

[h:entry=replace(entry,"\\(","OPENPARENTHESESPLACEHOLDER")]
[h:entry=replace(entry,"\\)","CLOSEPARENTHESESPLACEHOLDER")]

<!-------------- BOLD ---------------->
[h:entry=replace(entry,"\\*","ASTERISKPLACEHOLDER")]

[h:id=strfind(entry,"ASTERISKPLACEHOLDERASTERISKPLACEHOLDER(.*?)ASTERISKPLACEHOLDERASTERISKPLACEHOLDER")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"ASTERISKPLACEHOLDERASTERISKPLACEHOLDER(.*?)ASTERISKPLACEHOLDERASTERISKPLACEHOLDER","<b>"+group+"</b>",1)]
}]

<!-------------- ITALIC ---------------->
[h:id=strfind(entry,"ASTERISKPLACEHOLDER(.*?)ASTERISKPLACEHOLDER")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"ASTERISKPLACEHOLDER(.*?)ASTERISKPLACEHOLDER","<i>"+group+"</i>",1)]
}]
[h:entry=replace(entry,"ASTERISKPLACEHOLDER","*")]

<!-------------- STRIKETHROUGH ---------------->
[h:id=strfind(entry,"~{2}(.*?)~{2}")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"~{2}(.*?)~{2}","<s>"+group+"</s>",1)]
}]

<!-------------- UNDERSCORE ---------------->
[h:id=strfind(entry,"_{1}(.*?)_{1}")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"_{1}(.*?)_{1}","<u>"+group+"</u>",1)]
}]

<!-------------- TASK LIST ---------------->
[h:id=strfind(entry,"(-\\s{1}\\[[\\sx]{1}\\]\\s?)(.*)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group1=getGroup(id,roll.count+1,1)]
	[h:group2=getGroup(id,roll.count+1,2)]
	
	[h:checked=if(matches(group1,".*x.*")==1," checked","")]
	
	[h:entry=replace(entry,"(-\\s{1}\\[[\\sx]{1}\\]\\s?)(.*)","<br><input type=checkbox"+checked+"> "+group2,1)]
}]

<!-------------- ORDERED LIST ---------------->
[h:entry=replace(entry,"\\n\\d+\\.\\s","orderedList")]

[h:id=strfind(entry,"(orderedList[\\s\\S]*?)(?=\\n{2}|\$)(?!orderedList)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:find="<ol type="+ListType+">
"+find+"
</ol>
"]
	[h:find=replace(find,"orderedList","
<li>"
	)]
	
	[h:entry=replace(entry,"(orderedList[\\s\\S]*?)(?=\\n{2}|\$)(?!orderedList)",find,1)]
}]

<!-------------- NESTED ORDERED LIST ---------------->
[h:id=strfind(entry,"(\\s{2}\\d+\\.\\s[\\s\\S]*?)(?=<li>|(?=\\n{2}|\$))")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:find="<ol type="+NestedListType+">
"+find+"
</ol>
"]
	
	[h:find=replace(find,"\\d+\\.\\s{1}","
<li>"
	)]
	
	[h:entry=replace(entry,"(\\s{2}\\d+\\.\\s[\\s\\S]*?)(?=<li>|(?=\\n{2}|\$))",find,1)]
}]

<!-------------- UNORDERED LIST ---------------->
[h:entry=replace(entry,"(?!.)\\n*\\r*[-+*]\\s","unodreredList")]

[h:id=strfind(entry,"(unodreredList[\\s\\S]*?)(?=\\n{2}|\$)(?!unorderedList)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:find="<ul>
"+find+"
</ul>
"]
	
	[h:find=replace(find,"unodreredList","
<li>")]
	
	[h:entry=replace(entry,"(unodreredList[\\s\\S]*?)(?=\\n{2}|\$)(?!unorderedList)",find,1)]
}]

<!-------------- NESTED UNORDERED LIST ---------------->
[h:id=strfind(entry,"(\\s{2}[-+*]\\s[\\s\\S]*?)(?=<li>|(?=\\n{2}|\$))")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	
	[h:find="<ul>
"+find+"
</ul>
"]
	
	[h:find=replace(find,"[-+*]\\s{1}","
<li>"
	)]
	
	[h:entry=replace(entry,"(\\s{2}[-+*]\\s[\\s\\S]*?)(?=<li>|(?=\\n{2}|\$))",find,1)]
}]

<!-------------- CODE ---------------->
[h:entry=replace(entry,"\\+","PLUSPLACEHOLDER")]
[h:id=strfind(entry,"`{3}\\n([\\s\\S]*?)\\n`{3}")]
[h,count(getFindCount(id)),code:{
	[h:find=getGroup(id,roll.count+1,0)]
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"`{3}\\n([\\s\\S]*?)\\n`{3}","<div><p>"+group+"</div>",1)]
}]
[h:entry=replace(entry,"PLUSPLACEHOLDER","+")]

<!-------------- RAW LINK ---------------->
[h:id=strfind(entry,"<(\\w+:\\/\\/\\S+?\\.\\S+)>")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"<(\\w+:\\/\\/\\S+?\\.\\S+)>","<a href='"+group+"'>"+group+"</a>",1)]
}]
[h:id=strfind(entry,"<(\\S+?@\\S+?\\.\\w+)>")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"<(\\S+?@\\S+?\\.\\w+)>","<a href='mailto:"+group+"'>"+group+"</a>",1)]
}]

<!-------------- PARAGRAPH ---------------->
[h:id=strfind(entry,"\\n{2}(.*)")]
[h,count(getFindCount(id),"<br><br>"),code:{
	[h:group=getGroup(id,roll.count+1,1)]
	[h:entry=replace(entry,"\\n{2}(.*)","<p>"+group,1)]
}]

[h:entry=replace(entry,"\\s*<p>\\s*<b>","BOLDPLACEHOLDER")]
[h:entry=replace(entry,"\\s*<p>\\s*<i>","ITALICPLACEHOLDER")]
[h:entry=replace(entry,"\\s*<p>\\s*<u>","UNDERLINEPLACEHOLDER")]
[h:entry=replace(entry,"\\s*<p>\\s*<s>","STRIKEPLACEHOLDER")]
[h:entry=replace(entry,"\\s*<p>\\s*<a\\s","LINKPLACEHOLDER")]
[h:entry=replace(entry,"\\s*<p>\\s*<font","FONTPLACEHOLDER")]
[h:entry=replace(entry,"\\s*<p>\\s*<br><input","INPUTPLACEHOLDER")]

[h:entry=replace(entry,"\\s*<p>\\s*<","<")]
[h:entry=replace(entry,"<p></ol>","</ol>")]
[h:entry=replace(entry,"<p></ul>","</ul>")]
[h:entry=replace(entry,"<p>\\s*CODE","CODE")]
[h:entry=replace(entry,"<p>\\s*HTMLPLACEHOLDER","HTMLPLACEHOLDER")]

[h:entry=replace(entry,"BOLDPLACEHOLDER","<p><b>")]
[h:entry=replace(entry,"ITALICPLACEHOLDER","<p><i>")]
[h:entry=replace(entry,"UNDERLINEPLACEHOLDER","<p><u>")]
[h:entry=replace(entry,"STRIKEPLACEHOLDER","<p><s>")]
[h:entry=replace(entry,"LINKPLACEHOLDER","<p><a ")]
[h:entry=replace(entry,"FONTPLACEHOLDER","<p><font")]
[h:entry=replace(entry,"INPUTPLACEHOLDER","<p><input")]

<!-------------- BREAK ---------------->
[h:entry=replace(entry,"\\s{2}\\n","<br>

")]

<!-------------- REPLACEMENT ---------------->
[h:entry=replace(entry,"QESTIONMARKPLACEHOLDER","?")]

[h:entry=replace(entry,"OPENPARENTHESESPLACEHOLDER","(")]
[h:entry=replace(entry,"CLOSEPARENTHESESPLACEHOLDER",")")]

[h:entry=replace(entry,"\\n*<table>","<table>")]
[h:entry=replace(entry,"<table>\\n*","<table>")]

[h:entry=replace(entry,"\\n*<div>","<div>")]
[h:entry=replace(entry,"</div>\\n*","</div>")]

[h:entry=replace(entry,"<ul>\\s*<br>","<ul>")]
[h:entry=replace(entry,"<ol type="+NestedListType+">\\s*<br>","<ol type="+NestedListType+">")]
[h:entry=replace(entry,"<ol type="+ListType+">\\s*<br>","<ol type="+ListType+">")]

<!-------------- HTML ---------------->
[h:htmloutput=strfind(entry,"HTMLPLACEHOLDER\\d+")]
[h,count(getFindCount(htmloutput)),code:{
	[h:group=getGroup(htmlId,roll.count+1,0)]
	[h:entry=replace(entry,"HTMLPLACEHOLDER\\d+",group,1)]
}]

<!-------------- CODE ---------------->
[h:decodeId=strfind(entry,"CODEPLACEHOLDER\\d+")]
[h,count(getFindCount(decodeId)),code:{
	[h:group=getGroup(codeId,roll.count+1,1)]

	[h:group=replace(group,"LESSERTHAN","&lt;")]
	[h:group=replace(group,"GREATERTHAN","&gt;")]

	[h:entry=replace(entry,"CODEPLACEHOLDER\\d+","<div class='codeBlock'><pre><code>"+group+"</code></pre></div>",1)]
}]
<!-------------- IN LINE CODE ---------------->
[h:id=strfind(entry,"INLINEPLACEHOLDER\\d+")]
[h,count(getFindCount(id)),code:{
	[h:group=getGroup(inLineId,roll.count+1,1)]
	[h:entry=replace(entry,"INLINEPLACEHOLDER\\d+","<code>"+group+"</code>",1)]
}]

<!------------------- OUTPUT ---------------------->
[h: macro.return = entry]