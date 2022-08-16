/* ui.gs */

// name     : ui.gs
// git      : https://github.com/pffy/markdown-table
// author   : The Pffy Authors https://pffy.dev
// license  : https://unlicense.org/

// exports current selectino as a table
function exportActiveRange() {

  opts.mode = 'markdown table';
  opts.abbr = 'a human-readable table rendered by platforms';
  opts.details = 'The one table you selected is in this document.';
  opts.title = 'Cotton Markdown Tables';
  opts.folder = opts.title;
  opts.filename = 'cotton-table.markdown';

  saveToDrive(convertActiveRange());
  openSidebar('done');
  finish();
}

// exports the multi-selection as tables
function exportAllActiveRanges() {

  opts.mode = 'markdown table group';
  opts.abbr = 'many tables in one document';
  opts.details = 'Each table represents a selection.';
  opts.title = 'Cotton Markdown Tables';
  opts.folder = opts.title;
  opts.filename = 'cotton-table.markdown';

  saveToDrive(convertAllRanges());
  openSidebar('done');
  finish();
}

// exports selected named ranges as tables
function exportSelectedNamedRanges(str){

  if(!hasNamedRanges()) {
    sayNoNamedRanges()
    return false;
  }      

  // NOTE: not accessed from menu, accessed from sidebar

  opts.mode = 'markdown table group';
  opts.abbr = 'many tables in one document';
  opts.details = 'Each table represents a named range.';
  opts.title = 'Cotton Markdown Tables';
  opts.folder = opts.title;
  opts.filename = 'cotton-table.markdown';

  saveToDrive(convertSelectedNamedRanges(str));
  openSidebar('done');
  finish();
}


// exports all the named ranges as tables
function exportAllNamedRanges() {

  if(!hasNamedRanges()) {
    sayNoNamedRanges()
    return false;
  }

  opts.mode = 'markdown table group';
  opts.abbr = 'many tables in one document';
  opts.details = 'Each table represents a named range.';
  opts.title = 'Cotton Markdown Tables';
  opts.folder = opts.title;
  opts.filename = 'cotton-table.markdown';

  saveToDrive(convertAllNamedRanges());
  openSidebar('done');
  finish();
}

// exports the active sheet in the spreadsheet
function exportEntireSheet() {

  opts.mode = 'markdown table';
  opts.abbr = 'a human-readable table rendered by platforms';
  opts.details = 'The entire sheet is the table in this document.';
  opts.title = 'Cotton Markdown Tables';
  opts.folder = opts.title;
  opts.filename = 'cotton-table.markdown';

  saveToDrive(convertEntireSheet());
  openSidebar('done');
  finish();
}

// exports all sheets in a spreadsheet
function exportAllSheets() {

  opts.mode = 'markdown table group';
  opts.abbr = 'many tables in one document';
  opts.details = 'Each table represents an entire sheet.';
  opts.title = 'Cotton Markdown Tables';
  opts.folder = opts.title;
  opts.filename = 'cotton-table.markdown';

  saveToDrive(convertAllSheets());
  openSidebar('done');
  finish();
}

// opens sidebar to select named ranges
function openSelectNamedRanges() {

  if(!hasNamedRanges()) {
    sayNoNamedRanges()
    return false;
  }

  opts.title = 'Cotton Markdown Tables';  
  openSidebar('select');
}

// uses toast to say something
function sayNoNamedRanges() {
  say('You have no named ranges in this spreadsheet. To create named ranges, try the menu item Data > "Named ranges" ...', 'Oops!'); 
}

// opens sidebar with info about add-on
function openAboutBox() {
  openSidebar('about');
}
