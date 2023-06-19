[h: howToText="## How to Use This Library

This library supplies two functions for displaying text with Markdown.

The first, *markdownWindow()* shows your text inside a dialog window like this one. It's great for quickly showing formatted text, but doesn't offer much flexibility or customization.

```code
[markdownWindow('My Text')]
```

The second, *markdownFormat()* converts your text to HTML, but does not display it. This is great for when you need to display formatted text in a specific window, or need greater control over the formatting.

```code
[dialog('My Window'): {
	<html>
		<link rel='stylesheet' type='text/css' href='Markdown CSS@Lib:Markdown'>
		<body>
			[r: markdownFormat('My Text')]
		</body>
	</html>
}]
```

Also included is the [Markdown Reference](Markdown Reference@Lib:Markdown '') macro. This reference covers all the supported Markdown syntax, and notes any limitations.
"]

[dialog("How To", "width=700; height=400; temporary=1;"): {
	<html>
		<link rel="stylesheet" type="text/css" href="Markdown CSS@Lib:Markdown">
		<body>
			[r: markdownFormat(howToText)]
		</body>
	</html>
}]