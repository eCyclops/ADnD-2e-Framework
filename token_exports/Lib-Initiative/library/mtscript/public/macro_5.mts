[h: roundOver = arg(0)]

[frame("Initiative", "width=100; height=200;"): {
	<html>
		<head>
      		<link rel="stylesheet" type="text/css" href="CSS@Lib:Initiative">
    	</head>
		<body>
			[if(roundOver == "true"), code: {
				<div class="completed-round">
					ROUND COMPLETE<br>
					[r: macrolink("Next Round", "Next Round@Lib:Initiative", "none")]
				</div>
			};{}]
			<div>[r: macrolink("Roll", "Roll@Lib:Initiative", "none")]</div>
			<div>[r: macrolink("Next", "Next@Lib:Initiative", "none")]</div>
			<div>[r: macrolink("End", "End@Lib:Initiative", "none")]</div>
		</body>
	</html>
}]