[h: postProcess = macroLinkText("DoAddProperty@Lib:JDWMT:Macros", "all")]
[frame("addProperty"): {
	

<form action="[r:postProcess]" method="json">
	Library: <input type="radio" name="libOrTable" value="Lib">
	Table: <input type="radio" name="libOrTable" value="Table">
	<br>
	Name: <input type="text" name="inputName" value="Name of the Table or Library">
	<br>
	Value: <input type="text" name="inputValue" value="What property are you entering?">
	<br>
	Result: <input type="text" name="inputResult" value="What result with this have?">
	<br>
	<input type="submit" name="Let's light this popsicle!" value="Let's light this popsicle!">
</form>

}]