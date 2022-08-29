/* obj.gs */

// name     : obj.gs
// git      : https://github.com/pffy/markdown-table
// author   : The Pffy Authors https://pffy.dev
// license  : https://unlicense.org/

function cotton (range) {

  if(range === undefined || isObjectEmpty(range)) {
    const emptytable = ' \n:--:';
    return emptytable;    
  }

  const rng = range;
  const sht = rng.getSheet();
  
  // count rows and columns
  const rows = rng.getNumRows();
  const cols = rng.getNumColumns();

  // todo: add cell limit in later versions

  // delimiter for Markdown columns
  const pipe = ' | ';

  // column alignments
  const aligns = rng.getHorizontalAlignments()[0]
    .map((a) => getAlignSyntax(a)).filter(function(e,i){
      return !isTableColumnHidden(i+1);
    });

  // syntax for column alignments (row two)
  const rowtwo = aligns.join(pipe);

  // font typeface
  const fontFamilies = rng.getFontFamilies();

  // font style: bold
  const fontWeights = rng.getFontWeights();

  // font style: italics
  const fontStyles = rng.getFontStyles();

  // font style: line-through (strikethrough)
  const fontLines = rng.getFontLines();

  // data validation for cell input
  const valids = rng.getDataValidations();

  // any data validation, including checkboxes
  const hasValids = hasAnyValids(valids);

  // notes on cell input
  const notes = rng.getNotes();

  // cell values
  const values = rng.getValues();

  // locale and user-formatted strings
  const displayValues = rng.getDisplayValues();

  // position in range
  let x = 0;
  let y = 0;

  let val = '';
  let cell = {};

  let arr = [];
  let table = [];

  const isBlank = (ev) => (ev === '');

  for(let i = 1; i < rows + 1; i++) {

    x = i - 1;

    if(displayValues[x].every(isBlank)) {
      arr = new Array(cols).fill('&nbsp;');
      table.push(arr.join(pipe).trim());
      if(i < 2) {
        table.push(rowtwo);
      } 
      continue;
    } else {
      arr = [];
    }

    for(let j = 1; j < cols + 1; j++) {

      y = j - 1;

      cell = rng.getCell(i, j);

      if(isTableColumnHidden(cell.getColumn())) {
        continue;
      }

      if(isTableRowHidden(cell.getRow())) {
        continue;
      }

      val = displayValues[x][y].trim();

      // fixes rendering issue
      if(arr.length < 1 && !val) {
        arr.push('');
      }

      if(!val) {
        arr.push('');
        continue;
      }

      // simply prints text check box for this cell
      if(hasValids && valids[x][y] && isCheckbox(valids[x][y])) {
        if(cell.isChecked()) {
          arr.push('`[X]`');
        } else {
          arr.push('`[ ]`');          
        }
        continue;
      }
      
      if(isFontMonospace(fontFamilies[x][y])) {
        val = val.replace(/\n/g, '`<br/>`'); // pre-processing
        val = addTextSyntax(val, '`');
      }

      if(isFontBold(fontWeights[x][y])) {
        val = addTextSyntax(val, '**');
      }

      if(isFontItalic(fontStyles[x][y])) {
        val = addTextSyntax(val, '*');
      }

      if(isFontStrikethrough(fontLines[x][y])) {
        val = addTextSyntax(val, '~~');
      }      

      // converts new line into line break HTML tag
      // NOTE: should be after font styling
      val = val.replace(/\n/g, '<br/>');

      arr.push(val);
    }

    table.push(arr.join(pipe).trim());

    if(i < 2) {
      table.push(rowtwo);
    }    
  }

  // some inner functions

  // returns true if row is hidden; otherwise, false.  
  function isTableRowHidden(num) {
    
    if(sht.isRowHiddenByFilter(num)) {
      return true;
    }
    
    if(sht.isRowHiddenByUser(num)) {
      return true;
    }
    
    return false;
  }

  // returns true if column is hidden; otherwise, false.
  function isTableColumnHidden(num) {

    if(sht.isColumnHiddenByUser(num)){
      return true;
    }

    return false;
  }

  // returns true if any valid types detected; otherwise, false
  function hasAnyValids(arr) {
    return !arr.every(function(r){
      return true === r.every(function(c){
        return c === null;  
      });
    });    
  }  

  // returns true if any checkboxes detected; otherwise, false
  function isCheckbox(validation) {
    return validation.getCriteriaType().toJSON() === 'CHECKBOX';
  }  

  // returns Markdown table
  return table.join('\n');
}
