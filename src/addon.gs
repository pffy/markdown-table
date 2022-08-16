/* addon.gs */

// name     : addon.gs
// git      : https://github.com/pffy/markdown-table
// author   : The Pffy Authors https://pffy.dev
// license  : https://unlicense.org/


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
    .addItem('Export range to Markdown table ...', 
      'exportActiveRange')
    .addItem('Export all selected ranges to Markdown tables ...', 
      'exportAllActiveRanges')
    .addSeparator()
    .addItem('Export entire sheet to Markdown table ...', 
      'exportEntireSheet')
    .addItem('Export all sheets to Markdown tables ...', 
      'exportAllSheets')
    .addSeparator()
    .addItem('Export selected named ranges to Markdown tables ...', 
      'openSelectNamedRanges')    
    .addItem('Export all named ranges to Markdown tables ...', 
      'exportAllNamedRanges')  
    .addSeparator()
    .addItem('About ...', 'openAboutBox')  
    .addToUi();
}

function onInstall() {
  onOpen();
}
