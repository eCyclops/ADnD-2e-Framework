[dialog("Changelog", "width=700; height=400; temporary=1;"): {
	<html>
		<link rel='stylesheet' type='text/css' href='Markdown CSS@Lib:Markdown'>
		<head>
			<title>Changelog</title>
		</head>
		<body>
			[r: markdownFormat(decode(getLibProperty("Changelog", "Lib:ADND")))]
		</body>
	</html>
}]