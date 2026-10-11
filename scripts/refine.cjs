const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/constitution.json'), 'utf-8'));

data.forEach(item => {
  if (item.articleNumber === 0) {
    item.article = 'Preamble';
    item.partId = 'Preamble';
    item.partName = 'Preamble of the Constitution';
    item.category = 'Foundational Philosophy & Objectives';
  }
});

fs.writeFileSync(path.join(__dirname, '../src/data/constitution.json'), JSON.stringify(data, null, 2), 'utf-8');
console.log('Refined constitution.json successfully');
