const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/raw_constitution.json'), 'utf-8'));

// Landmark article details (Constitutional insights, landmark cases, significance)
const landmarkMap = {
  0: {
    summary: "The moral and philosophical foundation of the Constitution. It declares India a Sovereign, Socialist, Secular, Democratic Republic, securing Justice, Liberty, Equality, and Fraternity for all citizens.",
    cases: ["Kesavananda Bharati v. State of Kerala (1973) - Preamble is an integral part of the Constitution and can be amended without violating the Basic Structure.", "Berubari Union Case (1960)", "SR Bommai v. Union of India (1994) - Secularism declared basic structure."],
    importance: "landmark",
    tags: ["sovereign", "socialist", "secular", "democratic", "republic", "justice", "liberty", "equality", "fraternity"]
  },
  1: {
    summary: "Declares 'India, that is Bharat, shall be a Union of States', defining the sovereign territory comprising States, Union Territories, and acquired lands.",
    cases: ["State of West Bengal v. Union of India (1963) - Established the indestructible nature of the Indian Union."],
    importance: "landmark",
    tags: ["bharat", "union of states", "territory", "federation"]
  },
  12: {
    summary: "Defines 'the State' for the enforcement of Fundamental Rights, covering the Government, Parliament, state legislatures, and all local or other authorities within India.",
    cases: ["Ajay Hasia v. Khalid Mujib (1981) - Financial, functional, and administrative control test for instrumentality of State.", "R.D. Shetty v. International Airport Authority (1979)"],
    importance: "high",
    tags: ["state", "fundamental rights", "instrumentality", "judiciary"]
  },
  13: {
    summary: "Lays down that all pre-constitutional and post-constitutional laws inconsistent with Fundamental Rights are void to the extent of such inconsistency. Basis of Judicial Review.",
    cases: ["Kesavananda Bharati (1973) - Constitutional amendments are subject to basic structure review.", "A.K. Gopalan (1950)", "State of Madras v. V.G. Row (1952)"],
    importance: "landmark",
    tags: ["judicial review", "void laws", "doctrine of severability", "eclipse"]
  },
  14: {
    summary: "Guarantees equality before the law and equal protection of the laws within the territory of India to every person (citizens and non-citizens). Striking down arbitrary state action.",
    cases: ["E.P. Royappa v. State of Tamil Nadu (1974) - Equality is dynamic; antithesis to arbitrariness.", "Maneka Gandhi v. Union of India (1978) - Triad of Articles 14, 19, and 21 (Golden Triangle).", "Shayara Bano (Triple Talaq, 2017)"],
    importance: "landmark",
    tags: ["equality", "rule of law", "non-discrimination", "golden triangle", "arbitrariness"]
  },
  15: {
    summary: "Prohibits discrimination on grounds only of religion, race, caste, sex, or place of birth. Permits special provisions for women, children, socially & educationally backward classes, and EWS.",
    cases: ["State of Madras v. Champakam Dorairajan (1951) - Led to 1st Constitutional Amendment.", "Indra Sawhney v. Union of India (1992)", "Janki Prasad Parimoo (1973)"],
    importance: "landmark",
    tags: ["discrimination", "reservation", "women", "children", "equality", "ews"]
  },
  16: {
    summary: "Guarantees equality of opportunity in matters of public employment under the State, while allowing affirmative action / reservations for backward classes.",
    cases: ["Indra Sawhney (Mandal Case, 1992) - 50% reservation cap and creamy layer exclusion.", "M. Nagaraj v. Union of India (2006)", "Jarnail Singh (2018)"],
    importance: "landmark",
    tags: ["public employment", "equality of opportunity", "affirmative action", "reservations", "creamy layer"]
  },
  17: {
    summary: "Abolishes 'Untouchability' in all forms and forbids its practice. Any disability arising out of it is an offence punishable by law. Direct absolute human right.",
    cases: ["State of Karnataka v. Appa Balu Ingale (1993) - Constitutional abolition of social subjugation.", "Civil Rights Protection Act 1955"],
    importance: "landmark",
    tags: ["untouchability", "social justice", "dignity", "caste equality"]
  },
  19: {
    summary: "Protects six fundamental freedoms: Speech & Expression, Peaceful Assembly, Associations/Unions, Movement throughout India, Residence anywhere in India, and Practice of Profession/Trade. Subject to reasonable restrictions.",
    cases: ["Romesh Thappar v. State of Madras (1950) - Freedom of press rooted in 19(1)(a).", "Shreya Singhal v. Union of India (2015) - Struck down Section 66A of IT Act for chilling online speech.", "Anuradha Bhasin (2020) - Internet access for speech and trade protected under Art 19."],
    importance: "landmark",
    tags: ["freedom of speech", "press", "assembly", "association", "movement", "profession", "reasonable restrictions"]
  },
  21: {
    summary: "The heart of Indian Constitutional Law: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' Expanded to include dignity, privacy, health, clean environment, and legal aid.",
    cases: ["Maneka Gandhi (1978) - Procedure must be 'just, fair, and reasonable' (Due Process).", "K.S. Puttaswamy v. Union of India (2017) - Unanimously held Right to Privacy is a Fundamental Right.", "Olga Tellis (1985) - Right to livelihood.", "MC Mehta - Clean environment."],
    importance: "landmark",
    tags: ["right to life", "personal liberty", "privacy", "dignity", "due process", "golden triangle"]
  },
  '21A': {
    summary: "Free and compulsory education to all children aged 6 to 14 years. Added via the historic 86th Constitutional Amendment Act, 2002.",
    cases: ["Mohini Jain v. State of Karnataka (1992)", "Unni Krishnan v. State of AP (1993) - Education as an essential corollary of Article 21.", "Society for Unaided Private Schools v. UOI (2012)"],
    importance: "landmark",
    tags: ["education", "children", "compulsory education", "right to education", "rte"]
  },
  25: {
    summary: "Freedom of conscience and free profession, practice, and propagation of religion to all persons, subject to public order, morality, and health.",
    cases: ["Bijoe Emmanuel v. State of Kerala (1986) - National Anthem Case: Jehovah's Witnesses.", "Indian Young Lawyers Association (Sabarimala, 2018)", "Shayara Bano (2017)"],
    importance: "landmark",
    tags: ["freedom of religion", "conscience", "secularism", "faith", "worship"]
  },
  32: {
    summary: "Right to constitutional remedies: empowers citizens to move the Supreme Court directly for the enforcement of Fundamental Rights via writs (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari). Dr. Ambedkar termed it the 'heart and soul of the Constitution'.",
    cases: ["Bandhua Mukti Morcha (1984) - Origin of Public Interest Litigation (PIL).", "Sunil Batra v. Delhi Administration (1980) - Protection of prisoner rights via postcard petition.", "L. Chandra Kumar (1997)"],
    importance: "landmark",
    tags: ["remedies", "writs", "habeas corpus", "mandamus", "pil", "heart and soul"]
  },
  39: {
    summary: "Directs State policy toward securing adequate livelihood, fair distribution of material resources, prevention of concentration of wealth, and equal pay for equal work.",
    cases: ["State of Tamil Nadu v. L. Abu Kavur Bai (1984)", "Randhir Singh v. Union of India (1982) - Equal pay for equal work."],
    importance: "high",
    tags: ["socialism", "livelihood", "equal pay", "economic justice", "directive principles"]
  },
  '39A': {
    summary: "Mandates equal justice and free legal aid to ensure opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.",
    cases: ["Hussainara Khatoon v. Home Secretary, Bihar (1979) - Right to speedy trial and free legal aid.", "NALSA Act 1987"],
    importance: "landmark",
    tags: ["free legal aid", "speedy trial", "access to justice", "nalsa"]
  },
  40: {
    summary: "Organization of village panchayats as units of self-government. Enshrined the Gandhian vision that culminated in the 73rd Amendment Act.",
    cases: ["Panchayati Raj Constitutionalization (73rd Amendment, 1992)."],
    importance: "high",
    tags: ["panchayat", "local self-government", "gandhian principles", "grassroots democracy"]
  },
  44: {
    summary: "Directs the State to secure for the citizens a Uniform Civil Code (UCC) throughout the territory of India.",
    cases: ["Shah Bano Case (1985) - SC urged government to frame a UCC.", "Sarla Mudgal (1995)", "John Vallamattom (2003)"],
    importance: "landmark",
    tags: ["uniform civil code", "ucc", "personal laws", "gender justice", "secularism"]
  },
  '48A': {
    summary: "Protection and improvement of environment and safeguarding of forests and wild life. Added by 42nd Amendment Act, 1976.",
    cases: ["M.C. Mehta v. Union of India - Polluter Pays Principle and Precautionary Principle.", "Vellore Citizens' Welfare Forum (1996)"],
    importance: "high",
    tags: ["environment", "forests", "wildlife", "green constitution", "climate"]
  },
  '51A': {
    summary: "11 Fundamental Duties of every citizen of India, including abiding by the Constitution, cherishing the freedom struggle, defending the nation, promoting harmony, scientific temper, and safeguarding public property.",
    cases: ["AIIMS Students' Union v. AIIMS (2002) - Duties are as important as rights.", "Swaran Singh Committee recommendations."],
    importance: "landmark",
    tags: ["fundamental duties", "patriotism", "scientific temper", "national flag", "citizenship"]
  },
  52: {
    summary: "Establishes that there shall be a President of India, the constitutional Head of State and supreme commander of the defence forces.",
    cases: ["Shamsher Singh v. State of Punjab (1974) - President exercises powers on aid and advice of the Council of Ministers."],
    importance: "high",
    tags: ["president of india", "head of state", "executive power", "republic"]
  },
  61: {
    summary: "Procedure for impeachment of the President of India for 'violation of the Constitution'.",
    cases: ["Special legislative super-majority threshold required in both Houses."],
    importance: "high",
    tags: ["impeachment", "president", "removal", "parliament"]
  },
  72: {
    summary: "Power of President to grant pardons, reprieves, respites or remissions of punishment or to suspend, remit or commute sentences in certain cases, including death sentences.",
    cases: ["Kehar Singh v. Union of India (1989)", "Shatrughan Chauhan v. Union of India (2014) - Commutation due to inordinate executive delay.", "Epuru Sudhakar (2006) - Limited judicial review of pardon."],
    importance: "landmark",
    tags: ["pardon", "clemency", "death penalty", "president power", "remission"]
  },
  74: {
    summary: "Council of Ministers with the Prime Minister at the head to aid and advise the President, who shall, in the exercise of his functions, act in accordance with such advice.",
    cases: ["42nd and 44th Constitutional Amendments - Made ministerial advice binding on the President.", "U.N.R. Rao v. Indira Gandhi (1971)"],
    importance: "landmark",
    tags: ["prime minister", "cabinet", "council of ministers", "parliamentary democracy", "aid and advice"]
  },
  75: {
    summary: "Appointment of Prime Minister and Ministers. Enshrines Collective Responsibility of Council of Ministers to the Lok Sabha (House of the People).",
    cases: ["Collective responsibility is the cornerstone of British/Indian Westminster democracy."],
    importance: "high",
    tags: ["prime minister", "ministers", "collective responsibility", "lok sabha"]
  },
  76: {
    summary: "Attorney-General for India: the highest law officer in the country appointed by the President, having the right of audience in all courts in India.",
    cases: ["Constitutional role in advising Union on complex legal affairs."],
    importance: "high",
    tags: ["attorney general", "law officer", "supreme court", "union"]
  },
  105: {
    summary: "Powers, privileges, and immunities of Parliament and its members, including freedom of speech in Parliament and immunity from court proceedings for speeches made inside.",
    cases: ["P.V. Narasimha Rao v. State (1998) - Overruled in Sita Soren (2024): Bribery is not immune under parliamentary privilege."],
    importance: "landmark",
    tags: ["parliamentary privilege", "freedom of speech", "lok sabha", "rajya sabha", "immunity"]
  },
  110: {
    summary: "Definition of 'Money Bills', dealing exclusively with taxation, borrowing, consolidated fund appropriations. Decided finally by the Speaker of Lok Sabha.",
    cases: ["Aadhaar Case (K.S. Puttaswamy - 2018) - Majority upheld Aadhaar as Money Bill with dissent."],
    importance: "landmark",
    tags: ["money bill", "taxation", "budget", "lok sabha speaker", "consolidated fund"]
  },
  123: {
    summary: "Power of President to promulgate Ordinances during recess of Parliament. Valid as an Act of Parliament but must be laid before Parliament within 6 weeks of reassembly.",
    cases: ["D.C. Wadhwa v. State of Bihar (1987) - Re-promulgation of ordinances without legislative approval is a fraud on the Constitution.", "Krishna Kumar Singh (2017)"],
    importance: "landmark",
    tags: ["ordinance", "executive legislation", "recess of parliament", "presidential rule"]
  },
  124: {
    summary: "Establishment and constitution of the Supreme Court of India. Appointment of Chief Justice of India and Judges.",
    cases: ["First, Second, and Third Judges Cases (1981, 1993, 1998) - Evolution of the Collegium system.", "NJAC Case (Supreme Court Advocates-on-Record Association, 2015) - Struck down 99th Amendment."],
    importance: "landmark",
    tags: ["supreme court", "cji", "collegium", "judiciary", "njac"]
  },
  129: {
    summary: "Supreme Court to be a Court of Record and shall have all powers of such a court, including the power to punish for contempt of itself.",
    cases: ["Prashant Bhushan Contempt Case (2020)", "In Re: Vinay Chandra Mishra (1995)"],
    importance: "high",
    tags: ["court of record", "contempt of court", "judicial authority", "supreme court"]
  },
  136: {
    summary: "Special Leave to Appeal (SLP) by the Supreme Court: discretionary power of extraordinary jurisdiction to grant leave against any judgment or order from any court or tribunal in India.",
    cases: ["Pritam Singh v. State (1950) - Exceptional and rare circumstances.", "Kunhayammed v. State of Kerala (2000)"],
    importance: "landmark",
    tags: ["special leave petition", "slp", "appellate jurisdiction", "supreme court"]
  },
  141: {
    summary: "Law declared by the Supreme Court shall be binding on all courts within the territory of India (Doctrine of Stare Decisis).",
    cases: ["Bengal Immunity Co. (1955) - SC is not bound by its own previous decisions.", "Union of India v. Raghubir Singh (1989)"],
    importance: "landmark",
    tags: ["binding precedent", "stare decisis", "supreme court", "law of the land"]
  },
  142: {
    summary: "Enforcement of decrees and orders of Supreme Court: empowers the Court to pass any decree or order necessary for doing 'complete justice' in any cause or matter.",
    cases: ["Union Carbide (Bhopal Gas Tragedy, 1991)", "Ayodhya Dispute Verdict (2019)", "Perarivalan release (2022)"],
    importance: "landmark",
    tags: ["complete justice", "inherent power", "equity", "extraordinary jurisdiction"]
  },
  143: {
    summary: "Power of President to consult Supreme Court on questions of law or fact of public importance (Advisory Jurisdiction).",
    cases: ["Re: Berubari Union (1960)", "Re: Special Courts Bill (1978)", "Ayodhya Reference (1993)", "2G Spectrum Presidential Reference (2012)"],
    importance: "high",
    tags: ["presidential reference", "advisory jurisdiction", "supreme court", "consultation"]
  },
  148: {
    summary: "Comptroller and Auditor-General of India (CAG): the guardian of the public purse, auditing all accounts of the Union and State governments.",
    cases: ["Dr. Ambedkar described CAG as the most important officer in the Constitution of India."],
    importance: "high",
    tags: ["cag", "auditor general", "public purse", "audit", "accountability"]
  },
  214: {
    summary: "High Courts for States: provides for a High Court in every State as the highest judicial forum in that state.",
    cases: ["High Courts possess coordinate authority with Supreme Court in original writ jurisdiction under Art 226."],
    importance: "high",
    tags: ["high court", "state judiciary", "justice", "constitutional courts"]
  },
  226: {
    summary: "Power of High Courts to issue writs (Habeas Corpus, Mandamus, Quo Warranto, Certiorari) for enforcement of Fundamental Rights and 'for any other purpose' - wider scope than Art 32.",
    cases: ["Chandrakumar (1997) - Judicial review under Art 226 is part of the Basic Structure.", "Whirlpool Corporation (1998)"],
    importance: "landmark",
    tags: ["writs", "high court", "judicial review", "fundamental rights", "habeas corpus"]
  },
  '239AA': {
    summary: "Special provisions with respect to Delhi: creates Legislative Assembly and Council of Ministers for National Capital Territory (NCT) of Delhi with defined legislative powers.",
    cases: ["Govt of NCT of Delhi v. Union of India (2018) - Lieutenant Governor bound by aid and advice of elected Delhi ministers.", "Services Judgment (2023)"],
    importance: "landmark",
    tags: ["delhi", "nct", "special status", "lieutenant governor", "federalism"]
  },
  243: {
    summary: "Panchayati Raj foundational article defining Gram Sabha, Panchayat, District, and tiers of grassroots rural governance introduced by 73rd Amendment, 1992.",
    cases: ["Constitutional mandate for 33% reservation for women and regular panchayat elections."],
    importance: "landmark",
    tags: ["panchayat", "gram sabha", "73rd amendment", "rural decentralization", "democracy"]
  },
  246: {
    summary: "Division of legislative powers between Parliament and State Legislatures across Union List, State List, and Concurrent List in the Seventh Schedule.",
    cases: ["Prafulla Kumar Mukherjee (Doctrine of Pith and Substance).", "State of Bombay v. F.N. Balsara (1951)"],
    importance: "landmark",
    tags: ["seventh schedule", "union list", "state list", "concurrent list", "federal division"]
  },
  '246A': {
    summary: "Special provision with respect to Goods and Services Tax (GST): grants concurrent power to Parliament and State Legislatures to make laws regarding GST. Added by 101st Amendment, 2016.",
    cases: ["Union of India v. Mohit Minerals (2022) - GST Council recommendations are persuasive, not binding on states."],
    importance: "landmark",
    tags: ["gst", "goods and services tax", "101st amendment", "fiscal federalism", "taxation"]
  },
  '279A': {
    summary: "Establishment of Goods and Services Tax Council (GST Council), chaired by Union Finance Minister with state finance ministers as members.",
    cases: ["Symbol of cooperative fiscal federalism in Indian indirect tax administration."],
    importance: "high",
    tags: ["gst council", "fiscal federalism", "finance minister", "indirect tax"]
  },
  280: {
    summary: "Finance Commission: appointed by the President every five years to make recommendations on the devolution of tax revenues between Union and States.",
    cases: ["Primary constitutional vehicle for vertical and horizontal fiscal transfers."],
    importance: "high",
    tags: ["finance commission", "revenue sharing", "tax devolution", "grants-in-aid"]
  },
  '300A': {
    summary: "Persons not to be deprived of property save by authority of law. Converted from a Fundamental Right (former Art 31) to a Constitutional/Human Right via 44th Amendment Act, 1978.",
    cases: ["Vidya Devi v. State of Himachal Pradesh (2020) - Right to property is a human right; state cannot grab land without just compensation.", "K.T. Plantation (2011)"],
    importance: "landmark",
    tags: ["property", "human right", "eminent domain", "acquisition", "compensation"]
  },
  311: {
    summary: "Dismissal, removal or reduction in rank of civil servants: constitutional safeguards preventing dismissal by subordinate authority and requiring inquiry with reasonable opportunity to be heard.",
    cases: ["Union of India v. Tulsiram Patel (1985) - Exceptions to disciplinary inquiry."],
    importance: "high",
    tags: ["civil servants", "ias", "ips", "disciplinary protection", "natural justice"]
  },
  312: {
    summary: "All-India Services (IAS, IPS, IFoS): empowers Rajya Sabha by two-thirds majority resolution to create new All-India Services in national interest.",
    cases: ["Federal pillar binding the Union administrative structure."],
    importance: "high",
    tags: ["all india services", "ias", "ips", "rajya sabha", "civil service"]
  },
  315: {
    summary: "Public Service Commissions for the Union (UPSC) and for the States (SPSC), conducting examinations for appointments to administrative services.",
    cases: ["Constitutional independence of recruitment bodies."],
    importance: "high",
    tags: ["upsc", "spsc", "civil service exams", "recruitment", "merit"]
  },
  324: {
    summary: "Superintendence, direction and control of elections to be vested in an Election Commission of India (ECI), ensuring free and fair democratic polls.",
    cases: ["T.N. Seshan v. Union of India (1995) - Independence and multi-member commission.", "Anoop Baranwal v. Union of India (2023) - Appointment panel for Chief Election Commissioner."],
    importance: "landmark",
    tags: ["election commission", "eci", "free and fair elections", "democracy", "voting"]
  },
  326: {
    summary: "Elections to the House of the People and to Legislative Assemblies of States to be on the basis of adult suffrage (universal adult franchise, 18 years+).",
    cases: ["61st Constitutional Amendment Act 1988 lowered voting age from 21 to 18 years."],
    importance: "landmark",
    tags: ["universal adult franchise", "voting age", "democracy", "suffrage"]
  },
  352: {
    summary: "Proclamation of National Emergency by the President on grounds of war, external aggression, or armed rebellion, on written advice of the Union Cabinet.",
    cases: ["ADM Jabalpur v. Shivkant Shukla (Habeas Corpus Case, 1976) - Historic emergency habeas corpus decision, subsequently formally overruled in Puttaswamy (2017).", "44th Amendment reforms."],
    importance: "landmark",
    tags: ["national emergency", "war", "armed rebellion", "cabinet advice", "fundamental rights suspension"]
  },
  356: {
    summary: "President's Rule: provisions in case of failure of constitutional machinery in States, enabling the Union to assume state executive powers.",
    cases: ["S.R. Bommai v. Union of India (1994) - Judicial review of proclamation under 356; secularism is basic structure; floor test mandatory before dismissing state govt."],
    importance: "landmark",
    tags: ["presidents rule", "state emergency", "sr bommai", "federalism", "governor report"]
  },
  360: {
    summary: "Provisions as to Financial Emergency: power to declare financial emergency if financial stability or credit of India or any part thereof is threatened (never invoked till date).",
    cases: ["Allows reduction of salaries of judges and public servants during emergency."],
    importance: "high",
    tags: ["financial emergency", "economic crisis", "salaries reduction", "union power"]
  },
  368: {
    summary: "Power of Parliament to amend the Constitution and procedure therefor. Requires special majorities and, in federal matters, ratification by state legislatures.",
    cases: ["Shankari Prasad (1951)", "Sajjan Singh (1965)", "Golak Nath (1967)", "Kesavananda Bharati (1973) - Basic Structure Doctrine restricts amending power.", "Minerva Mills (1980)"],
    importance: "landmark",
    tags: ["amendment", "basic structure", "constituent power", "kesavananda bharati", "article 368"]
  },
  370: {
    summary: "Temporary provisions with respect to the State of Jammu and Kashmir. Modified/rendered inoperative by Constitutional Orders C.O. 272 and 273 in August 2019.",
    cases: ["Prem Nath Kaul (1959)", "Sampat Prakash (1970)", "In Re: Article 370 of the Constitution (2023) - SC constitution bench upheld the abrogation of Article 370."],
    importance: "landmark",
    tags: ["jammu and kashmir", "special status", "abrogation", "federalism", "temporary provision"]
  }
};

function getPartInfo(art) {
  const artStr = String(art);
  const num = parseInt(artStr);

  if (artStr === '0' || artStr === 'Preamble') {
    return { partId: 'Preamble', partName: 'Preamble', category: 'Preamble' };
  }
  if (num >= 1 && num <= 4) {
    return { partId: 'Part I', partName: 'Part I: The Union & Its Territory', category: 'Union & Territory' };
  }
  if (num >= 5 && num <= 11) {
    return { partId: 'Part II', partName: 'Part II: Citizenship', category: 'Citizenship' };
  }
  if (num >= 12 && num <= 35) {
    let cat = 'Fundamental Rights';
    if (num <= 13) cat = 'General & Judicial Review';
    else if (num <= 18) cat = 'Right to Equality';
    else if (num <= 22) cat = 'Right to Freedom';
    else if (num <= 24) cat = 'Right Against Exploitation';
    else if (num <= 28) cat = 'Right to Freedom of Religion';
    else if (num <= 31) cat = 'Cultural & Educational Rights';
    else cat = 'Right to Constitutional Remedies';
    return { partId: 'Part III', partName: 'Part III: Fundamental Rights', category: cat };
  }
  if (artStr === '51A') {
    return { partId: 'Part IVA', partName: 'Part IVA: Fundamental Duties', category: 'Fundamental Duties' };
  }
  if (num >= 36 && num <= 51) {
    return { partId: 'Part IV', partName: 'Part IV: Directive Principles of State Policy', category: 'Directive Principles' };
  }
  if (num >= 52 && num <= 151) {
    let cat = 'The Union';
    if (num <= 78) cat = 'Union Executive (President, PM, Ministers)';
    else if (num <= 122) cat = 'Union Parliament';
    else if (num === 123) cat = 'Legislative Powers of President';
    else if (num <= 147) cat = 'Supreme Court & Union Judiciary';
    else cat = 'Comptroller & Auditor-General';
    return { partId: 'Part V', partName: 'Part V: The Union', category: cat };
  }
  if (num >= 152 && num <= 237) {
    let cat = 'The States';
    if (num <= 167) cat = 'State Executive (Governor, CM)';
    else if (num <= 212) cat = 'State Legislature';
    else if (num === 213) cat = 'Ordinance Power of Governor';
    else if (num <= 232) cat = 'High Courts in States';
    else cat = 'Subordinate Courts';
    return { partId: 'Part VI', partName: 'Part VI: The States', category: cat };
  }
  if (num === 238) {
    return { partId: 'Part VII', partName: 'Part VII: States in Part B (Repealed)', category: 'Repealed Provisions' };
  }
  if (num >= 239 && num <= 242) {
    return { partId: 'Part VIII', partName: 'Part VIII: The Union Territories', category: 'Union Territories' };
  }
  if (artStr.startsWith('243')) {
    const suffix = artStr.replace('243', '').toUpperCase();
    if (suffix === '' || (suffix >= 'A' && suffix <= 'O')) {
      return { partId: 'Part IX', partName: 'Part IX: The Panchayats', category: 'Panchayati Raj' };
    } else if (suffix.startsWith('Z') && suffix >= 'ZH' && suffix <= 'ZT') {
      return { partId: 'Part IXB', partName: 'Part IXB: Co-operative Societies', category: 'Co-operative Societies' };
    } else {
      return { partId: 'Part IXA', partName: 'Part IXA: The Municipalities', category: 'Municipalities' };
    }
  }
  if (num === 244) {
    return { partId: 'Part X', partName: 'Part X: Scheduled & Tribal Areas', category: 'Scheduled & Tribal Areas' };
  }
  if (num >= 245 && num <= 263) {
    return { partId: 'Part XI', partName: 'Part XI: Relations Between Union & States', category: 'Centre-State Relations' };
  }
  if (num >= 264 && num <= 300) {
    return { partId: 'Part XII', partName: 'Part XII: Finance, Property, Contracts & Suits', category: 'Finance, Property & Taxes' };
  }
  if (num >= 301 && num <= 307) {
    return { partId: 'Part XIII', partName: 'Part XIII: Trade & Commerce', category: 'Trade & Commerce' };
  }
  if (artStr.startsWith('323')) {
    return { partId: 'Part XIVA', partName: 'Part XIVA: Tribunals', category: 'Administrative Tribunals' };
  }
  if (num >= 308 && num <= 323) {
    return { partId: 'Part XIV', partName: 'Part XIV: Services Under Union & States', category: 'Civil Services & UPSC' };
  }
  if (num >= 324 && num <= 329) {
    return { partId: 'Part XV', partName: 'Part XV: Elections', category: 'Elections & ECI' };
  }
  if (num >= 330 && num <= 342) {
    return { partId: 'Part XVI', partName: 'Part XVI: Special Provisions for Certain Classes', category: 'Affirmative Action & Special Classes' };
  }
  if (num >= 343 && num <= 351) {
    return { partId: 'Part XVII', partName: 'Part XVII: Official Language', category: 'Official Language' };
  }
  if (num >= 352 && num <= 360) {
    return { partId: 'Part XVIII', partName: 'Part XVIII: Emergency Provisions', category: 'Emergency Provisions' };
  }
  if (num >= 361 && num <= 367) {
    return { partId: 'Part XIX', partName: 'Part XIX: Miscellaneous', category: 'Miscellaneous' };
  }
  if (num === 368) {
    return { partId: 'Part XX', partName: 'Part XX: Amendment of the Constitution', category: 'Constitutional Amendments' };
  }
  if (num >= 369 && num <= 392) {
    return { partId: 'Part XXI', partName: 'Part XXI: Temporary & Special Provisions', category: 'Special & Temporary Provisions' };
  }
  if (num >= 393 && num <= 395) {
    return { partId: 'Part XXII', partName: 'Part XXII: Short Title, Commencement & Repeals', category: 'Commencement & Repeals' };
  }
  return { partId: 'Other', partName: 'General', category: 'General' };
}

// Generate summary helper if not specifically customized
function generateSummary(item, partInfo) {
  const t = item.title.trim();
  const artLabel = item.article === 0 ? 'The Preamble' : `Article ${item.article}`;
  return `${artLabel} provides constitutional rules and provisions regarding ${t.toLowerCase()}, under ${partInfo.partName}.`;
}

const enrichedArticles = raw.map((item, index) => {
  const artStr = String(item.article);
  const partInfo = getPartInfo(item.article);
  const landmarkInfo = landmarkMap[artStr] || landmarkMap[item.article] || null;

  const isFundamental = partInfo.partId === 'Part III' || partInfo.partId === 'Part IVA';
  const displayLabel = item.article === 0 ? 'Preamble' : `Article ${item.article}`;

  // Clean description text
  let cleanedDesc = (item.description || '').replace(/\u00a0/g, ' ').replace(/\n{3,}/g, '\n\n').trim();

  // Tags compilation
  const tagsSet = new Set();
  tagsSet.add(partInfo.partId.toLowerCase());
  tagsSet.add(partInfo.category.toLowerCase());
  if (isFundamental) tagsSet.add('fundamental');
  if (landmarkInfo && landmarkInfo.tags) {
    landmarkInfo.tags.forEach(t => tagsSet.add(t.toLowerCase()));
  }

  // Extract keywords from title
  item.title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).forEach(w => {
    if (w.length > 3 && !['with', 'from', 'under', 'that', 'this', 'have', 'been', 'shall', 'such', 'into', 'other'].includes(w)) {
      tagsSet.add(w);
    }
  });

  return {
    id: `art-${artStr}`,
    index,
    article: displayLabel,
    articleNumber: item.article,
    articleStr: artStr,
    title: item.title,
    partId: partInfo.partId,
    partName: partInfo.partName,
    category: partInfo.category,
    description: cleanedDesc,
    summary: landmarkInfo ? landmarkInfo.summary : generateSummary(item, partInfo),
    cases: landmarkInfo && landmarkInfo.cases ? landmarkInfo.cases : [],
    importance: landmarkInfo ? landmarkInfo.importance : (isFundamental ? 'high' : 'standard'),
    tags: Array.from(tagsSet),
    isFundamental
  };
});

// Build 12 Schedules dataset
const schedulesData = [
  {
    scheduleNumber: 1,
    title: "First Schedule: States and Union Territories",
    description: "Lists the States and Union Territories of India, specifying the territorial borders and jurisdiction of each state and territory as amended by state reorganisation acts.",
    articles: "Articles 1 and 4",
    highlights: ["28 States and 8 Union Territories", "Defines geographical expanse and territorial waters of Bharat"]
  },
  {
    scheduleNumber: 2,
    title: "Second Schedule: Emoluments and Allowances",
    description: "Provisions regarding the salaries, allowances, privileges, and official residences of the President, Governors, Speaker and Deputy Speaker of Lok Sabha and Legislative Assemblies, Judges of Supreme Court and High Courts, and the CAG.",
    articles: "Articles 59, 65, 75, 97, 125, 148, 158, 164, 186 and 221",
    highlights: ["Salaries charged upon Consolidated Fund of India", "Immune from negative alteration during tenure"]
  },
  {
    scheduleNumber: 3,
    title: "Third Schedule: Forms of Oaths or Affirmations",
    description: "Prescribes the solemn forms of oaths or affirmations to be taken by Union Ministers, candidates for Parliament, Members of Parliament, Supreme Court Judges, CAG, State Ministers, State Legislators, and High Court Judges.",
    articles: "Articles 75, 84, 99, 124, 146, 173, 188 and 219",
    highlights: ["Oath of Allegiance to the Constitution", "Oath of Secrecy for executive ministers"]
  },
  {
    scheduleNumber: 4,
    title: "Fourth Schedule: Allocation of Seats in the Rajya Sabha",
    description: "Allocates seats to each State and Union Territory in the Council of States (Rajya Sabha), determined according to the population of each state.",
    articles: "Articles 4 and 80",
    highlights: ["Reflects federal representation based on demographic weight", "Maximum sanctioned strength is 250 (238 elected + 12 nominated)"]
  },
  {
    scheduleNumber: 5,
    title: "Fifth Schedule: Administration of Scheduled Areas and Scheduled Tribes",
    description: "Contains special provisions for the administration and control of Scheduled Areas and Scheduled Tribes in states other than Assam, Meghalaya, Tripura, and Mizoram. Establishes Tribes Advisory Councils.",
    articles: "Article 244(1)",
    highlights: ["Governor's discretionary powers to suspend parliamentary laws in scheduled zones", "Tribes Advisory Council (TAC) mandatory consultation"]
  },
  {
    scheduleNumber: 6,
    title: "Sixth Schedule: Tribal Areas in North-Eastern States",
    description: "Administration of autonomous tribal areas in the North-Eastern States of Assam, Meghalaya, Tripura, and Mizoram through Autonomous District Councils (ADCs) and Regional Councils with legislative, judicial, and financial autonomy.",
    articles: "Articles 244(2) and 275(1)",
    highlights: ["Empowered Autonomous District Councils (ADCs)", "Protects indigenous customs, land rights, and tribal customary law"]
  },
  {
    scheduleNumber: 7,
    title: "Seventh Schedule: Distribution of Legislative Powers (Three Lists)",
    description: "Delineates subjects of governance into three lists: List I (Union List - 100 items), List II (State List - 61 items), and List III (Concurrent List - 52 items). Residuary powers reside exclusively with Parliament.",
    articles: "Article 246",
    highlights: ["List I: Defence, Foreign Affairs, Atomic Energy, Currency, Railways", "List II: Police, Public Health, Agriculture, Local Government", "List III: Criminal Law, Marriage, Education, Forests"]
  },
  {
    scheduleNumber: 8,
    title: "Eighth Schedule: Officially Recognized Languages",
    description: "Lists the 22 officially recognized languages of the Republic of India: Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Konkani, Maithili, Malayalam, Manipuri, Marathi, Nepali, Odia, Punjabi, Sanskrit, Santali, Sindhi, Tamil, Telugu, and Urdu.",
    articles: "Articles 344(1) and 351",
    highlights: ["Originally 14 languages; expanded to 22 via amendments", "Mandate to enrich Hindi from vocabulary of Eighth Schedule languages"]
  },
  {
    scheduleNumber: 9,
    title: "Ninth Schedule: Validation of Certain Acts and Regulations",
    description: "Added by the 1st Amendment (1951) to protect land reform laws and agrarian legislation from judicial review on ground of violation of Fundamental Rights. In I.R. Coelho (2007), SC held laws placed after April 24, 1973 are open to Basic Structure review.",
    articles: "Article 31B",
    highlights: ["Contains over 284 protected state and central agrarian laws", "Subject to Basic Structure doctrine post-1973 (I.R. Coelho v. State of TN)"]
  },
  {
    scheduleNumber: 10,
    title: "Tenth Schedule: Anti-Defection Law",
    description: "Inserted by the 52nd Amendment Act (1985). Provides disqualification of legislators on grounds of defection from their political party or voting contrary to the party whip. Decision rendered by the Presiding Officer.",
    articles: "Articles 102(2) and 191(2)",
    highlights: ["Disqualification for voluntarily giving up party membership or defying whip", "Kihoto Hollohan (1992): Speaker's decision is subject to judicial review"]
  },
  {
    scheduleNumber: 11,
    title: "Eleventh Schedule: Powers and Functions of Panchayats",
    description: "Added by 73rd Amendment Act (1992). Lists 29 functional subjects devolved to Panchayati Raj Institutions for economic development and social justice.",
    articles: "Article 243G",
    highlights: ["29 functional items including agriculture, rural housing, drinking water, roads, poverty alleviation", "Grassroots democracy framework"]
  },
  {
    scheduleNumber: 12,
    title: "Twelfth Schedule: Powers and Functions of Municipalities",
    description: "Added by 74th Amendment Act (1992). Lists 18 functional subjects within the purview of urban local bodies (Municipalities and Corporations).",
    articles: "Article 243W",
    highlights: ["18 functional subjects including urban planning, water supply, public health, fire services, solid waste management", "Empowers urban local governance"]
  }
];

// Write enriched JSON files
fs.writeFileSync(path.join(__dirname, '../src/data/constitution.json'), JSON.stringify(enrichedArticles, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../src/data/schedules.json'), JSON.stringify(schedulesData, null, 2), 'utf-8');

console.log('Successfully created enriched constitution database!');
console.log('Total articles:', enrichedArticles.length);
console.log('Total schedules:', schedulesData.length);
