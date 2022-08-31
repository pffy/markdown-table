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
  const hasValids = !valids.every(function(r){ // rows
      return true === r.every(function(c){ // columns
        return c === null;  
      });
    }); 

  // notes on cell input
  const notes = rng.getNotes();

  let noteCount = 0;
  let noteItem = '';

  const footnotes = [];

  // any notes?
  const hasNotes = !notes.every(function(r){ // rows
      return true === r.every(function(c){ // columns
        return c === "";  
      });
    });

  if(hasNotes) {
    footnotes.push('\n\n### Notes');
  }

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

      // sanitize Markdown table text
      val = cleanText(val);

      // process notes first
      if(hasNotes && notes[x][y]) {
        noteCount++;
        noteItem = `<sup>${noteCount}</sup>`;
        footnotes.push(`${noteItem} ${notes[x][y]}<br/>`);
      }


      // simply prints text check box for this cell
      if(hasValids && valids[x][y] && isCheckbox(valids[x][y])) {
        if(cell.isChecked()) {
          val = '`[X]`';
          arr.push();
        } else {
          val = '`[ ]`';
        }

        if(hasNotes && notes[x][y]) {
          val = val + noteItem;          
        }

        arr.push(val); // checkbox cell complete
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

      if(hasNotes && notes[x][y]) {
        val = val + noteItem;
      }      

      arr.push(val);
    }

    table.push(arr.join(pipe).trim());

    if(i < 2) {
      table.push(rowtwo);
    }    
  }


  // add footnotes below markdown table
  table.push(footnotes.join('\n') + '\n');

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

  // returns true if any checkboxes detected; otherwise, false
  function isCheckbox(validation) {
    return validation.getCriteriaType().toJSON() === 'CHECKBOX';
  }  

  // returns Markdown table
  return table.join('\n');
}
