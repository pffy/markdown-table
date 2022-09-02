/* fn.gs */

// name     : fn.gs
// git      : https://github.com/pffy/markdown-table
// author   : The Pffy Authors https://pffy.dev
// license  : https://unlicense.org/

function convertActiveRange() {

  const sht = SpreadsheetApp.getActiveSheet();
  const activeRange = sht.getActiveRange();

  const output = cotton(activeRange);
  opts.output = output;

  return output;  
}

function convertEntireSheet() {
  
  const sht = SpreadsheetApp.getActiveSheet();
  const dataRange = sht.getDataRange();

  const output = cotton(dataRange);
  opts.output = output;

  return output;
}

function convertAllRanges() {

  const crlf = '\r\n';

  const arr = [];
  const sht = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const rngs = sht.getActiveRangeList().getRanges();
  let i = 1;
  rngs.forEach(function(rng) {
    arr.push(crlf);
    arr.push('range ' + i);
    arr.push(cotton(rng));
    i++;
  });

  const output = arr.join(crlf + crlf);
  opts.output = output;  

  return output;
}

function convertAllSheets() {

  const crlf = '\r\n';  
  
  const arr = [];
  const shts = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  
  shts.forEach(function(sht) {
    const dataRange = sht.getDataRange();
    arr.push(crlf);
    arr.push(sht.getSheetName());    
    arr.push(cotton(dataRange));
  });

  const output = arr.join(crlf + crlf);
  opts.output = output;

  return output;
}

function convertAllNamedRanges() {

  const crlf = '\r\n';
  const prefix = '### '; // for named range header above the table

  const arr = [];
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const rngs = ss.getNamedRanges().sort(orderNamedRangeByAlpha);
   
  rngs.forEach(function(rng) {
    arr.push(crlf);
    arr.push(prefix + rng.getName());
    arr.push(cotton(rng.getRange()));
  });

  const output = arr.join(crlf + crlf);
  opts.output = output;

  return output;
}

function convertSelectedNamedRanges(str) {

  const crlf = '\r\n';
  const prefix = '### '; // for named range header above the table

  const arr = [];  

  // named ranges from user selection
  const nr = str.split(',');

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // filter to only process selected named ranges
  const rngs = ss.getNamedRanges().filter(function(rng){
    return nr.indexOf(rng.getName()) > -1;
  }).forEach(function(rng) {
    arr.push(crlf);
    arr.push(prefix + rng.getName());
    arr.push(cotton(rng.getRange()));
  });

  const output = arr.join(crlf + crlf);
  opts.output = output;

  return output;
}

function orderNamedRangeByAlpha(a,b) {
  
  // based on solution found here:
  // https://stackoverflow.com/a/30840201

  // alphabetical order
  if(a.getName() < b.getName()) return -1;
  if(a.getName() > b.getName()) return 1;
  return 0;
}

// returns Markdown syntax for column alignments
function getAlignSyntax(str) {
  
  switch(str.toLowerCase()) {
    case 'left':
    case 'general-left':
      return ':--';
    case 'center':
    case 'general-center':
      return ':--:';
    case 'right':
    case 'general-right':
      return '--:';
    default:
      // center will be the default for now
      return ':--:';
  }  
}

// font functions

// returns true if font is monospace; false, otherwise
function isFontMonospace(str) {

  // monospace Google fonts:
  // https://www.google.com/fonts
  const fonts = `anonymous pro
azeret mono
b612 mono
courier
courier new
courier prime
cousine
cutive mono
dm mono
droid sans mono
fira code
fira mono
ibm plex mono
inconsolata
jetbrains mono
major mono display
monospace
nanum gothic coding
noto sans mono
nova mono
overpass mono
oxygen mono
pt mono
red hat mono
roboto mono
share tech mono
space mono
source code pro
spline sans mono
syne mono
ubuntu mono
vt323
xanh mono
`.trim().split(/\n/);

  return (fonts.indexOf('' + str.toLowerCase()) > -1);
}

// returns true if font is bold; otherwise, false. 
function isFontBold(str) {
  return !!str && (str.toLowerCase() === 'bold');
}

// returns true if font is italic; otherwise, false.
function isFontItalic(str) {
  return !!str && (str.toLowerCase() === 'italic');
}

// returns true if font is strikethrough; otherwise, false.
function isFontStrikethrough(str) {
  return !!str && (str.toLowerCase() === 'line-through');
}

// adds Markdown text formatting syntax to string
function addTextSyntax(str, chr) {
  return Utilities.formatString(chr + '%s' + chr, str);
}

// more general functions

// saves file to Google drive, then returns URL
function saveToDrive(str) {

  // GCP implementation:
  // Drive API must be enabled in console/gcloud

  const filename = opts.filename || 'cotton-table.markdown';

  const label = opts.folder || 'Cotton Markdown Tables';
  const folder = DriveApp.getRootFolder();
 
  if(folder.getFoldersByName(label).hasNext()) {
    newFolder = folder.getFoldersByName(label).next();
  } else {
    newFolder = folder.createFolder(label);
  }

  const file = newFolder.createFile(filename, 
    str, MimeType.PLAIN_TEXT);

  opts.url = file.getUrl();
  opts.durl = file.getDownloadUrl();
}

// returns true if an object is empty; otherwise, false.
function isObjectEmpty(obj) {
  return obj && (Object.keys(obj).length < 1 && obj.constructor === Object);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function openSidebar(filename) {
  const ui = HtmlService.createTemplateFromFile(filename)
    .evaluate().setTitle(opts.title).setWidth(300);
  SpreadsheetApp.getUi().showSidebar(ui);  
}

function finish() {

  // using solution found here:
  // https://stackoverflow.com/a/19316873
  Object.keys(opts).forEach(key => delete opts[key]);
}

function say(str , title) {
    title = title || 'Hi'
    SpreadsheetApp.getActiveSpreadsheet()
      .toast(str, title, -1);  
}

function hasNamedRanges() {
  return !!SpreadsheetApp.getActiveSpreadsheet().getNamedRanges().length;
}

function addNamedRangeSelectHtml() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const arr = [];
  arr.push('<select id="choices" name="ranges" multiple size="4">');

  let i = 0;
  let s = 'selected';
  
  const rngs = ss.getNamedRanges().sort(orderNamedRangeByAlpha).forEach(function(rng) {
      arr.push('  <option value="'+i+'"'+s+'>'+rng.getName()+'</option>');
      i++;
      s = ''; // removed 'selected' attribute after first iteration
  });

  arr.push('</select>');

  return arr.join('\n');
}

// cleans Markdown in each table cell
function cleanText(str) {

  // prevents "new column"
  // all must go
  str = str.replace(/\|/g, '&vert;' );

  // prevents list item
  // first must go
  str = str.replace(/^\*/, '&ast;' );
  str = str.replace(/^\-/, '&plus;' );
  str = str.replace(/^\+/, '&minus;' );    

  // prevents headers
  // first must go
  str = str.replace(/^#/, '&num;' ); // hashtag

  // prevents quote block
  // first must go
  str = str.replace(/^>/, '&gt;' );

  return str;
}

// returns true if any checkboxes detected; otherwise, false
function isCheckbox(validation) {
  return validation.getCriteriaType().toJSON() === 'CHECKBOX';
}  

// surrounds string with matching HTML tags
function addHtmlTagToSyntax(str, tag) {
  return `<${tag}>${str}</${tag}>`;
}

// adds hyperlink to Markdown table syntax
function addHyperlinkToSyntax(obj) {
  obj.title = obj.title.replace(/\"/g, '\\"');
  return `[${obj.label}](${obj.url} "${obj.title}")`;
}
