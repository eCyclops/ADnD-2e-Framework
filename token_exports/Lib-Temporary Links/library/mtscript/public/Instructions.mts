[frame("Temporary Links Instructions", "title=Instructions"):{
	<html>
		<head>
			<link rel='stylesheet' type='text/css' href='CSS@Lib:Temporary Links'>
		</head>
		<body>
			<p>This macro adds the ability to post macro links to the chat with limited uses, or expire after a set amount of time.</p>
			<p>It can be called by with the function temporaryLink(), or tempLink().</p>
			<p>The first argument of the function is the macro name and location, the second is the link text, the third is for arguments to pass to the macro, and the fourth is for any additional parameters.</p>
			<div>
				<p>temporaryLink(macro, linkText, arguments, parameters)</p>
				<p>temporaryLink("Roll@Lib:Temporary Links", "Roll Dice", "1d20", "uses=2; expire=120; output=all; target=impersonated;")</p>
			</div>

			<p>Parameters should be seperated by ";"</p>
			
			<p><strong>Parameters</strong></p>
			<ul>
				<li><span>uses</span> - the number of times the link can be used before it stops working. Defaults to 1. Set to -1 for infinite uses.</li>
				<li><span>expire</span> - the time in seconds until the link expires. Defaults to 120. Set to -1 for infinite time.</li>
				<li><span>output</span> - contains who the output of the macro should go to, values are:
				<ul>
					<li><span>"self"</span> - Displays only to the person who clicked on the link.</li>
					<li><span>"gm"</span> - Displays to GM.</li>
					<li><span>"all"</span> - everyone.</li>
					<li><span>"none"</span> - Discard any output. (this is the default)</li>
					<li><span>"gm-self"</span> - Display to GM and the person executing the link.</li>
					<li><span>"list"</span> - Displays to a list of players. When the <span>output</span> is set to <span>"list"</span> then the macro link expects the arguments to be a JSON Object, that contains a field called <span>mlOutputList</span> which is a JSON Array containing the players to send the output to.</li>
				</ul>
				</li>
				<li><span>target</span> - Which tokens to run the macro on. Target can be one or more of the following separated by commas:
				<ul>
					<li><span>"impersonated"</span> - the impersonated Token. (this is the default)</li>
					<li><span>"selected"</span> - the selected Tokens.</li>
					<li><span>"Token Id"</span> - the id of a Token.</li>
				</ul>
				</li>
			</ul>
		</body>
	</html>
}]
