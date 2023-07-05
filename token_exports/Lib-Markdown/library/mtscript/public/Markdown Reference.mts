[h: page = arg(0)]
[h, if(page == ""): page = "About"]

[h: doubleQuote='"']

<!-- About -->
[h, if(page=="About"): text = "## About Markdown

[Markdown](https://www.markdownguide.org/basic-syntax) is a markup language for adding formatting elements to plain text. This library uses a modified version of the [rtakehara\'s implementation of Markdown for MapTool.](https://forums.rptools.net/viewtopic.php?f=8&t=28461)"]

<!-- Basic Formatting -->
[h, if(page=="Basic"): text = "## Paragraph and Line Breaks

Paragraphs are just plain text between blank lines, for example, this is one paragraph.

And this is another paragraph.

To make line breaks, end a line with two spaces.  
Like this.

## Headings

To create a heading, add pound signs (#) at the beginning of a line, followed by a space. More signs correspond to a higher heading level, up to level six.

For example:

```code
# Heading 1
## Heading 2
### Heading 3
```

Results in:

# Heading 1
## Heading 2
### Heading 3

## Character Styles

To make text italic, surround it with single asterisks. To make it bold, use double asterisks, and to do both at once, use triple.

```code
*This will be italic*  
**This will be bold.**  
***This will be bold and italic***
```

*This will be italic*  
**This will be bold.**  
***This will be bold and italic***

Text can be struck through by surrounding it with two tilde symbols (\\~\\~), and underlines can be done by surrounding it with underscores (\\_)

```code
~~This will be struck through~~  
_This will be underlined_
```

~~This will be struck through~~  
_This will be underlined_

These can be combined with bold and italic.

```code
~~**Bold words struck out**~~  
_*Underlined italics*_
```

~~**Bold words struck out**~~  
_*Underlined italics*_
"]

<!-- Rulers -->
[h, if(page=="Rulers"): text = "## Horizontal Ruler

To create a horizontal rule, use three or more hyphens (---), asterisks (***) or underscores (___). So this:

```code
---

--------------------

_______

*************
```

will all render the same, like this:
---
"]

<!-- Blockquotes -->
[h, if(page=="Blockquotes"): text = "## Blockquotes

To make a blockquote, start a line with > followed by a space. You can have multiple lines as long as each line starts with a >, even the blank lines. So this:

```code
> Here's an example.
>
> You can even have blank lines.  
>> You can have 1 level of nested blockquote.
```

Becomes this:

> Here's an example.
>
> You can even have blank lines.  
>> You can have 1 level of nested blockquote.

**Note**: This implementation of markdown only supports one level of nested blockquotes.

To make a code block, add three back ticks (\\`\\`\\`) before and after any text.

```code
```
Some text inside a code block.
\\`\\`\\`
```

```
Some text inside a code block.
```

This does not behave like the default code block in Markdown, and will show formatted text. If you want to create a code block that ignores formatting, put the word 'code' after the triple marks.

```code
```code
This 'code' ignores **every** markdown and <b>html</b> element.
\\`\\`\\`
```

This will show:

```code
This 'code' ignores **every** markdown and <b>html</b> element.
```

Code can also be added in line by surrounding text with a single backtick.

```code
Some of `this text` is code.
```

Some of `this text` is code.

"]

<!-- Lists -->
[h, if(page=="Lists"): text = "## Lists

You can make ordered lists by starting a line with a number, a period, and a space. An unordered list can be created by starting a line with an asterisk and a space.

```code
1. First item
2. Second item
	1. First nested item
	2. Second nested item
1. Third item. The number will be replaced with the correct numeral.

* First item
	* First nested item
	* Second nested item
* Second item
* Third item
```

1. First item
2. Second item
	1. First nested item
	2. Second nested item
1. Third item. The number will be replaced with the correct numeral.

* First item
	* First nested item
	* Second nested item
* Second item
* Third item

**Note**: This implementation of markdown only supports one level of nested list items.

You can make a task list with checkboxes using a hyphen (\\-) and brackets (\\[ \\]) surrounding a space or an x.

```code
- [x] Item 1
- [ ] Item 2
- [ ] Item 3
```

- [x] Item 1
- [ ] Item 2
- [ ] Item 3

**Note**: Nested task lists are not supported.

**Note**: Selecting checkboxes is not permanent, you can use them to track tempory things, but they will reset next time you load the list.
"]

<!-- Tables -->
[h, if(page=="Tables"): text = "## Tables

To create tables, use three or more hyphens (\\-\\-\\-) to create headers, and use pipes (\\|) to seperate the columns.

```code
| Header 1 	| Header 2 	|
|---------	|---------	|
| Row 1    	| Item 1   	|
| Row 2   	| Item 2   	|
| Row 3   	| Item 3   	|
```

| Header 1 	| Header 2 	|
|---------	|---------	|
| Row 1    	| Item 1   	|
| Row 2   	| Item 2   	|
| Row 3   	| Item 3   	|
"]

<!-- Links -->
[h, if(page=="Links"): text = "## Links

You can add links by simply pasting in a URL https://www.rptools.net

Alternatively, you add custom links like the example:

```code
[Awesome Link](https://www.rptools.net)
```

To get [Awesome Link](https://www.rptools.net).

Links can also be created for dice rolls.

```code
[Roll some dice!](Roll '2d6+3')
```

[Roll some dice!](Roll '2d6+3')

Links to *library macros* can be created by putting the name of a macro followed by \\@ and the token the macro is on. The token must be a *library* token. Arguments to pass to the macro can placed after the macro location, in either single or double quotes. The quotes should be present, even if there are no arguments.

```code
[Macro link](Markdown Reference@Lib:Markdown '') (This will take you to the *About* page of this reference manual)

[Macro link with arguments](Dice Output@Lib:Markdown '2d6+3')
```

[Macro link](Markdown Reference@Lib:Markdown '') (This will take you to the *About* page of this reference manual)

[Macro link with arguments](Dice Output@Lib:Markdown '2d6+3')

"]

<!-- Images -->
[h, if(page=="Images"): text = "## Images

Images use the same format as links, but add an exclamation mark before the brackets. The size can be set by adding a space, an =, and a number after the link. Alt text is indicated by adding text between either single or double quotes after the link.

```code
![RPTools Logo](https://i.imgur.com/xUGc6sT.png)

![Small RPTools Logo](https://i.imgur.com/xUGc6sT.png =50)

![RPTools Logo](https://i.imgur.com/xUGc6sT.png 'Hover to read this')
	
![RPTools Logo](https://i.imgur.com/xUGc6sT.png =50 "+doubleQuote+"Hover to read this"+doubleQuote+")
```

![RPTools Logo](https://i.imgur.com/xUGc6sT.png)

![Small RPTools Logo](https://i.imgur.com/xUGc6sT.png =50)

![RPTools Logo](https://i.imgur.com/xUGc6sT.png 'Hover to read this')

![RPTools Logo](https://i.imgur.com/xUGc6sT.png =50 "+doubleQuote+"Hover to read this"+doubleQuote+")

Links and images can be combined to create image links.

```code
[![Link to RPTools](https://i.imgur.com/xUGc6sT.png)](https://www.rptools.net)
```

[![Link to RPTools](https://i.imgur.com/xUGc6sT.png)](https://www.rptools.net)
	
Similar to *macro links* you can show images from image tokens in MapTool. You will need an image token named in the format image:name. It can be placed on any map.

The syntax is similar to displaying a normal image, but with the name of the **image token** instead of the URL.

The following example will only work if you have a token named 'image:Token'. If you do not have a token with that name, you will see a big red X.

```code
![Image Token](image:Token =300)

![Image Token Original Size](image:Token)
```

![Image Token](image:Token =300)

![Image Token Original Size](image:Token)
"]

<!-- Escaping Characters -->
[h, if(page=="Escaping"): text = "## Escaping Characters

Normally, in Markdown, if you want to show a character instead of using it as syntax, you can add a backslash \\(\\\\) in front of that character. Because of how MapTool handles escaped characters, in some cases you may need to use two or more backslashes.

##### Characters you can escape

|Character	|Name		|
|---------	|---------	|
|\\*			|asterisk	|
|\\`			|backtick	|
|\\_			|underscore	|
|\\#			|pound sign	|
|\\\\			|backslash	|
|\\{\\}		|curly braces|
|\\[\\]		|brackets	|
|\\(\\)		|parentheses|
|\\+			|plus sign	|
|\\-			|minus sign	|
|\\.			|dot		|
|\\!			|exclamation mark|
|\\|			|pipe		|"]

[h, if(text == ""): text = "Page not found."]

[h, macro("Render@Lib:Markdown"): text]
[h: markdownText = macro.return]
[h: markdownText = markdownFormat(text)]

[h: index = '### Index

* [About](Markdown Reference@Lib:Markdown "About")  
* [Basic Formatting](Markdown Reference@Lib:Markdown "Basic")  
* [Rulers](Markdown Reference@Lib:Markdown "Rulers")  
* [Blockquotes](Markdown Reference@Lib:Markdown "Blockquotes")  
* [Lists](Markdown Reference@Lib:Markdown "Lists")  
* [Links](Markdown Reference@Lib:Markdown "Links")  
* [Images](Markdown Reference@Lib:Markdown "Images")  
* [Tables](Markdown Reference@Lib:Markdown "Tables")  
* [Escaping Characters](Markdown Reference@Lib:Markdown "Escaping")']

[h, macro("Render@Lib:Markdown"): index]
[h: markdownIndex = macro.return]
[h: markdownIndex = markdownFormat(index)]

[dialog("Markdown Guide", "width=700; height=400; temporary=1;"): {
	<html>
		<link rel="stylesheet" type="text/css" href="Markdown CSS@Lib:Markdown">
		<body>
			<table>
				<tr>
					<td valign=top style="border-right: solid 1px #000;" width="100">[r: markdownIndex]</td>
					<td valign=top>[r: markdownText]</td>
				</tr>
			</table>
		</body>
	</html>
}]
[abort(0)]