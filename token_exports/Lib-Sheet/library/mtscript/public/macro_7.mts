[h: myID = getStrProp(arg(0),"myID")]
[h: assert(!(myID==''),"myID is invalid "+getMacroName()+"@"+getMacroLocation())]

[h: args = strformat("myID=%{myID};")]

<table width="100%">
  <tr class="headerRow"><td align="center">Journals</td></tr>
  <tr>
    <td>
      [macro("listJournalEntries@Lib:Journal:Macros"):strformat('myID=%{myID}; journalType=Campaign; ')]
      [macro("listJournalEntries@Lib:Journal:Macros"):strformat('myID=%{myID}; journalType=Player; ')]
    </td>
  </tr>
  [h: manageEntriesLink =  macroLink('Update Personal Journal',"ManageJournal@Lib:Journal:Macros","none",strformat('myID=%{myID}; '),myID)]
  <tr><td align=center>[r: manageEntriesLink]</td></tr>
</table>