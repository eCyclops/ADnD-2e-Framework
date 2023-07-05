<!-- hidden input name="frameName", value is the frame we're closing. -->
<!-- look at viewJournalEntry@Lib:Journal for an example usage -->
[h: frameToClose = json.get(arg(0), "frameName")]

[h: closeFrame(frameToClose)]
