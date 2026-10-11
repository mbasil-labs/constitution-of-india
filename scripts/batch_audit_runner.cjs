const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const officialArticles = JSON.parse(fs.readFileSync('/Users/basilmuhammed/.gemini/antigravity-ide/brain/6bdf0fa9-6802-461e-9c40-2c4f4a7aab27/scratch/official_articles_clean.json'));
const rawPath = path.join(__dirname, '../src/raw_constitution.json');

// Define batches
const batches = [
  {
    id: 1,
    name: "Batch 1: Preamble, Part I (Arts 1–4, 2A) & Part II (Arts 5–11)",
    articles: ['0', '1', '2', '2A', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  },
  {
    id: 2,
    name: "Batch 2: Part III: Fundamental Rights (Arts 12–35, 21A, 31A–31D, 32A)",
    articles: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '21A', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '31A', '31B', '31C', '31D', '32', '32A', '33', '34', '35']
  },
  {
    id: 3,
    name: "Batch 3: Part IV: Directive Principles (Arts 36–51, 39A, 43A–B, 48A) & Part IVA (Art 51A)",
    articles: ['36', '37', '38', '39', '39A', '40', '41', '42', '43', '43A', '43B', '44', '45', '46', '47', '48', '48A', '49', '50', '51', '51A']
  },
  {
    id: 4,
    name: "Batch 4: Part V: The Union (Arts 52–151, 124A–C, 131A, 134A, 139A, 144A)",
    articles: (() => {
      const arr = [];
      for (let i = 52; i <= 151; i++) {
        arr.push(String(i));
        if (i === 124) arr.push('124A', '124B', '124C');
        if (i === 131) arr.push('131A');
        if (i === 134) arr.push('134A');
        if (i === 139) arr.push('139A');
        if (i === 144) arr.push('144A');
      }
      return arr;
    })()
  },
  {
    id: 5,
    name: "Batch 5: Part VI: The States (Arts 152–237, 224A, 226A, 228A, 232, 233A) & Part VII (Art 238)",
    articles: (() => {
      const arr = [];
      for (let i = 152; i <= 237; i++) {
        arr.push(String(i));
        if (i === 224) arr.push('224A');
        if (i === 226) arr.push('226A');
        if (i === 228) arr.push('228A');
        if (i === 231) arr.push('232');
        if (i === 233) arr.push('233A');
      }
      arr.push('238');
      return arr;
    })()
  },
  {
    id: 6,
    name: "Batch 6: Part VIII: The Union Territories (Arts 239–242, 239A, 239AA, 239AB, 239B, 242)",
    articles: ['239', '239A', '239AA', '239AB', '239B', '240', '241', '242']
  },
  {
    id: 7,
    name: "Batch 7: Part IX, IXA, IXB (Arts 243–243ZT) & Part X (Arts 244–244A)",
    articles: [
      '243', '243A', '243B', '243C', '243D', '243E', '243F', '243G', '243H', '243I', '243J', '243K', '243L', '243M', '243N', '243O',
      '243P', '243Q', '243R', '243S', '243T', '243U', '243V', '243W', '243X', '243Y', '243Z', '243ZA', '243ZB', '243ZC', '243ZD', '243ZE', '243ZF', '243ZG',
      '243ZH', '243ZI', '243ZJ', '243ZK', '243ZL', '243ZM', '243ZN', '243ZO', '243ZP', '243ZQ', '243ZR', '243ZS', '243ZT',
      '244', '244A'
    ]
  },
  {
    id: 8,
    name: "Batch 8: Part XI: Union-State Relations (Arts 245–263) & Part XII: Finance, Property (Arts 264–300A)",
    articles: (() => {
      const arr = [];
      for (let i = 245; i <= 263; i++) {
        arr.push(String(i));
        if (i === 246) arr.push('246A');
        if (i === 257) arr.push('257A');
        if (i === 258) arr.push('258A');
      }
      for (let i = 264; i <= 300; i++) {
        arr.push(String(i));
        if (i === 268) arr.push('268A');
        if (i === 269) arr.push('269A');
        if (i === 279) arr.push('279A');
        if (i === 290) arr.push('290A');
      }
      arr.push('300A');
      return arr;
    })()
  },
  {
    id: 9,
    name: "Batch 9: Part XIII: Trade & Commerce (Arts 301–307), Part XIV: Services & UPSC (Arts 308–323), Part XIVA: Tribunals (Arts 323A–323B)",
    articles: (() => {
      const arr = [];
      for (let i = 301; i <= 307; i++) arr.push(String(i));
      for (let i = 308; i <= 323; i++) {
        arr.push(String(i));
        if (i === 312) arr.push('312A');
      }
      arr.push('323A', '323B');
      return arr;
    })()
  },
  {
    id: 10,
    name: "Batch 10: Part XV: Elections (Arts 324–329A) & Part XVI: Special Provisions (Arts 330–342A)",
    articles: [
      '324', '325', '326', '327', '328', '329', '329A',
      '330', '330A', '331', '332', '332A', '333', '334', '334A', '335', '336', '337', '338', '338A', '338B', '339', '340', '341', '342', '342A'
    ]
  },
  {
    id: 11,
    name: "Batch 11: Part XVII: Official Language (Arts 343–351), Part XVIII: Emergency (Arts 352–360), Part XIX: Miscellaneous (Arts 361–367)",
    articles: [
      '343', '344', '345', '346', '347', '348', '349', '350', '350A', '350B', '351',
      '352', '353', '354', '355', '356', '357', '358', '359', '359A', '360',
      '361', '361A', '361B', '362', '363', '363A', '364', '365', '366', '367'
    ]
  },
  {
    id: 12,
    name: "Batch 12: Part XX: Amendment (Art 368), Part XXI: Temporary & Special Provisions (Arts 369–392), Part XXII: Short Title & Repeals (Arts 393–395)",
    articles: [
      '368',
      '369', '370', '371', '371A', '371B', '371C', '371D', '371E', '371F', '371G', '371H', '371I', '371J', '372', '372A', '373', '374', '375', '376', '377', '378', '378A',
      '379', '380', '381', '382', '383', '384', '385', '386', '387', '388', '389', '390', '391', '392',
      '393', '394', '394A', '395'
    ]
  },
  {
    id: 13,
    name: "Batch 13: Schedules 1 through 12",
    isSchedule: true
  }
];

module.exports = { batches, officialArticles, rawPath };
