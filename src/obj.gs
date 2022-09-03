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
  const rowtwo = pipe + aligns.join(pipe) + pipe;

  // font typeface
  const fontFamilies = rng.getFontFamilies();

  // font style: bold
  // deprecated by class TextStyle ?  
  const fontWeights = rng.getFontWeights();

  // font style: italics
  // deprecated by class TextStyle ?
  const fontStyles = rng.getFontStyles();

  // font style: line-through (strikethrough)
  // deprecated by class TextStyle ?
  const fontLines = rng.getFontLines();

  // formulas
  const formulas = rng.getFormulas();

  // any formulas??
  const hasFormulas = !formulas.every(function(r){ // rows
      return true === r.every(function(c){ // columns
        return c === '';  
      });
    });  

  // rich text values
  const richTexts = rng.getRichTextValues();

  // text styles
  const textStyles = rng.getTextStyles();

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

  // cell values
  // never used
  // const values = rng.getValues();

  // locale and user-formatted strings
  const displayValues = rng.getDisplayValues();

  // blank test function
  const isBlank = (ev) => (ev === '');  

  // position in range
  let x = 0;
  let y = 0;

  let val = '';
  let cell = {};

  let arr = [];
  let table = [];

  let therow = '';

  // hyperlink depot
  const re_hyperlink = /^(\=HYPERLINK\()/;
  const hyperlink = {};
  
  let hasHyperlink = false;
  let hasHypertext = false;

  // youtube depot
  const re_yt_watch = /\<\<https\:\/\/www\.youtube\.com\/watch\?v\=(.{11})\>\>/;
  const yt = {};

  // now begins the warp and weft of the exporter

  if(hasNotes) {
    footnotes.push('\n\n### Notes');
  }
  
  for(let i = 1; i < rows + 1; i++) {

    x = i - 1;

    if(displayValues[x].every(isBlank)) {
      
      arr = new Array(cols).fill(' ');
      therow = pipe + arr.join(pipe) + pipe;
      table.push(therow.trim());
      
      if(i < 2) {
        table.push(rowtwo.trim());
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
//      if(arr.length < 1 && !val) {
//        arr.push(' ');
//      }

      if(!val) {
        arr.push(' ');
        continue;
      }

      if(re_yt_watch.test(val)) {

        yt.id = val.match(re_yt_watch)[1]; 
        yt.url = `https://www.youtube.com/watch?=${yt.id}`;

        yt.label = 'YouTube Video';

        if(hasNotes && notes[x][y]) {
          yt.label = notes[x][y];
        }

        val = addYoutubeSyntax(yt);

        footnotes.push(`VIDEO: ${notes[x][y]}<br/>${yt.url}<br/>`);                  
        
        // done with the column
        arr.push(val);
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

        // postfix the reference to the value
        if(hasNotes && notes[x][y]) {
          val = val + noteItem;          
        }

        // checkbox cell complete; adds column to row
        arr.push(val); 
        continue;
      }
      
      if(isFontMonospace(fontFamilies[x][y])) {
        val = val.replace(/\n/g, '`<br/>`'); // pre-processing
        val = addTextSyntax(val, '`');
      }

      // detect and convert bold
      if(textStyles[x][y].isBold()) {
        val = addTextSyntax(val, '**');
      }

      // detect and convert italic
      if(textStyles[x][y].isItalic()) {
        val = addTextSyntax(val, '*');
      }

      // detect and convert strike-through
      if(textStyles[x][y].isStrikethrough()) {
        val = addTextSyntax(val, '~~');
      }

      // detect and convert underline
      if(textStyles[x][y].isUnderline() && !richTexts[x][y].getLinkUrl()) {
        say('hi underline!');
        val = addHtmlTagToSyntax(val, 'ins');
      }      

      // converts new line into line break HTML tag
      // NOTE: should be after font styling
      val = val.replace(/\n/g, '<br/>');

      // checks for =HYPERLINK()
      hasHyperlink = hasFormulas && formulas[x][y] && re_hyperlink.test(formulas[x][y]);

      // checks for hypertext formatting
      hasHypertext = richTexts[x][y].getLinkUrl();

      // if hyperlink detected, val becomes a label
      if(hasHyperlink || hasHypertext) {
        
        hyperlink.url = richTexts[x][y].getLinkUrl();
        hyperlink.title = richTexts[x][y].getText();
        hyperlink.label = val;

        val = addHyperlinkToSyntax(hyperlink);
      }

      // postfix the reference to the cell value
      if(hasNotes && notes[x][y]) {
        val = val + noteItem;
      }

      // adds new column to current row
      arr.push(val);
    }

    // adds new row to table
    therow = pipe + arr.join(pipe) + pipe;
    table.push(therow.trim());    

    // adds alignments row to Markdown table
    if(i < 2) {
      table.push(rowtwo.trim());
    }    
  }

  // add footnotes below markdown table
  table.push(footnotes.join('\n') + '\n');

  // some inner functions are bleow

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

  // returns Markdown table
  return table.join('\n');
}
