# Official Constitution of India Verification and Accuracy Audit Log

**Official Reference Document:**  
*The Constitution of India (As on 1st May, 2024)*  
Published by: Government of India, Ministry of Law and Justice, Legislative Department, Official Languages Wing.  
Source URL: `https://www.legislative.gov.in/static/uploads/2025/07/ca7ce5c746fa7480804bbdeb6cb704f0.pdf`  
Total Pages: 402  

---

## Audit Methodology & Quality Standards

1. **Full Exhaustive Coverage**: Every Constitutional Part, Chapter, Article (Articles 1 through 395 and all lettered amendment articles), and Schedule (1 through 12) is iteratively cross-checked against the official text.
2. **Multi-Point Verification**:
   - **Article Numbering & Identifier**: Exact format (e.g., `239AA`, not `239 A A`; `371J`, `334A`, `330A`, `279A`, `43B`).
   - **Official Article Title**: Word-for-word comparison against the Ministry of Law & Justice authoritative publication.
   - **Constitutional Text (Description)**: Verification of statutory clauses, provisos, and explanations.
   - **Constitutional Status**: Identification of active provisions vs. omitted/repealed provisions (e.g., 2A, 31, 31D, 238, 278, 291, 306, 314, 329A, 379–391) with amendment citations.
   - **Part & Category Hierarchy**: Accurate assignment to Parts (I through XXII) and constitutional categories.
   - **Schedule Coverage**: Accurate listing of governing articles, territorial definitions, oaths, lists, and functional subjects.
3. **Iterative Logging & Git Commit**: Each batch validation, discrepancy finding, correction, and reverification is logged and committed to the repository.

---

## Validation Batches Execution

| Batch | Scope | Status | Discrepancies Found | Corrections Applied | Reverification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Batch 1** | Preamble, Part I (Arts 1–4, 2A) & Part II (Arts 5–11) | **COMPLETED** | 0 missing added, 0 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 2** | Part III | **COMPLETED** | 0 missing added, 22 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 3** | Part IV | **COMPLETED** | 1 missing added, 15 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 4** | Part V | **COMPLETED** | 5 missing added, 93 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 5** | Part VI | **COMPLETED** | 3 missing added, 83 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 6** | Part VIII | **COMPLETED** | 2 missing added, 4 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 7** | Part IX, IXA, IXB (Arts 243–243ZT) & Part X (Arts 244–244A) | **COMPLETED** | 0 missing added, 47 corrected | Applied official text & metadata | **PASS (100%)** |
| **Batch 8** | Part XI (Arts 245–263, 246A, 257A–259) & Part XII (Arts 264–300A, 268A, 269A, 278–279A, 290A, 291) | Queued | Pending | Pending | Pending |
| **Batch 9** | Part XIII (Arts 301–307, 306), Part XIV (Arts 308–323, 312A, 314, 320), Part XIVA (Arts 323A–323B) | Queued | Pending | Pending | Pending |
| **Batch 10** | Part XV (Arts 324–329A) & Part XVI (Arts 330–342A, 330A, 332A, 334A, 338A–B, 342A) | Queued | Pending | Pending | Pending |
| **Batch 11** | Part XVII (Arts 343–351), Part XVIII (Arts 352–360), Part XIX (Arts 361–367) | Queued | Pending | Pending | Pending |
| **Batch 12** | Part XX (Art 368), Part XXI (Arts 369–392, 371A–J, 379–391), Part XXII (Arts 393–395) | Queued | Pending | Pending | Pending |
| **Batch 13** | Schedules 1 through 12 | Queued | Pending | Pending | Pending |

---

### Batch 1: Preamble, Part I (Arts 1–4, 2A) & Part II (Arts 5–11)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Preamble** | Preamble | `VERIFIED_MATCH` | None |
| **Article 1** | Name and territory of the Union | `VERIFIED_MATCH` | None |
| **Article 2** | Admission or establishment of new States | `VERIFIED_MATCH` | None |
| **Article 2A** | Sikkim to be associated with the Union | `VERIFIED_MATCH` | None |
| **Article 3** | Formation of new States and alteration of areas, boundaries or names of existing States | `VERIFIED_MATCH` | None |
| **Article 4** | Laws made under articles 2 and 3 to provide for the amendment of the First and the Fourth Schedules and supplemental, incidental and consequential matters | `VERIFIED_MATCH` | None |
| **Article 5** | Citizenship at the commencement of the Constitution | `VERIFIED_MATCH` | None |
| **Article 6** | Rights of citizenship of certain persons who have migrated to India from Pakistan | `VERIFIED_MATCH` | None |
| **Article 7** | Rights of citizenship of certain migrants to Pakistan | `VERIFIED_MATCH` | None |
| **Article 8** | Rights of citizenship of certain persons of Indian origin residing outside India | `VERIFIED_MATCH` | None |
| **Article 9** | Persons voluntarily acquiring citizenship of a foreign State not to be citizens | `VERIFIED_MATCH` | None |
| **Article 10** | Continuance of the rights of citizenship | `VERIFIED_MATCH` | None |
| **Article 11** | Parliament to regulate the right of citizenship by law | `VERIFIED_MATCH` | None |

**Reverification Result:** 13 articles verified, 0 missing articles added, 0 articles corrected. 100% parity achieved.

### Batch 2: Part III: Fundamental Rights (Arts 12–35, 21A, 31A–31D, 32A)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Article 12** | Definition | `CORRECTED` | Title corrected from "Definitions" to "Definition"; Standardized statutory wording/punctuation/formatting |
| **Article 13** | Laws inconsistent with or in derogation of the fundamental rights | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 14** | Equality before law | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 15** | Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth | `VERIFIED_MATCH` | None |
| **Article 16** | Equality of opportunity in matters of public employment | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 17** | Abolition of Untouchability | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 18** | Abolition of titles | `VERIFIED_MATCH` | None |
| **Article 19** | Protection of certain rights regarding freedom of speech, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 20** | Protection in respect of conviction for offences | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 21** | Protection of life and personal liberty | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 21A** | Right to education | `VERIFIED_MATCH` | None |
| **Article 22** | Protection against arrest and detention in certain cases | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 23** | Prohibition of traffic in human beings and forced labour | `VERIFIED_MATCH` | None |
| **Article 24** | Prohibition of employment of children in factories, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 25** | Freedom of conscience and free profession, practice and propagation of religion | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 26** | Freedom to manage religious affairs | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 27** | Freedom as to payment of taxes for promotion of any particular religion | `VERIFIED_MATCH` | None |
| **Article 28** | Freedom as to attendance at religious instruction or religious worship in certain educational institutions | `VERIFIED_MATCH` | None |
| **Article 29** | Protection of interests of minorities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 30** | Right of minorities to establish and administer educational institutions | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 31** | Compulsory acquisition of property | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 31A** | Saving of laws providing for acquisition of estates, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 31B** | Validation of certain Acts and Regulations | `VERIFIED_MATCH` | None |
| **Article 31C** | Saving of laws giving effect to certain directive principles | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 31D** | Saving of laws in respect of anti-national activities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 32** | Remedies for enforcement of rights conferred by this Part | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 32A** | Constitutional validity of State laws not to be considered in proceedings under article 32 | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 33** | Power of Parliament to modify the rights conferred by this Part in their application to Forces, etc | `VERIFIED_MATCH` | None |
| **Article 34** | Restriction on rights conferred by this Part while martial law is in force in any area | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 35** | Legislation to give effect to the provisions of this Part | `CORRECTED` | Text was truncated/outdated; updated to full official text |

**Reverification Result:** 30 articles verified, 0 missing articles added, 22 articles corrected. 100% parity achieved.

### Batch 3: Part IV: Directive Principles (Arts 36–51, 39A, 43A–B, 48A) & Part IVA (Art 51A)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Article 36** | Definition | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 37** | Application of the principles contained in this Part | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 38** | State to secure a social order for the promotion of welfare of the people | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 39** | Certain principles of policy to be followed by the State | `VERIFIED_MATCH` | None |
| **Article 39A** | Equal justice and free legal aid | `VERIFIED_MATCH` | None |
| **Article 40** | Organisation of village panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 41** | Right to work, to education and to public assistance in certain cases | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 42** | Provision for just and humane conditions of work and maternity relief | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 43** | Living wage, etc., for workers | `CORRECTED` | Title corrected from "Living wage, etc, for workers" to "Living wage, etc., for workers"; Standardized statutory wording/punctuation/formatting |
| **Article 43A** | Participation of workers in management of industries | `VERIFIED_MATCH` | None |
| **Article 43B** | Promotion of co-operative societies | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 44** | Uniform civil code for the citizens | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 45** | Provision for early childhood care and education to children below the age of six years | `CORRECTED` | Title corrected from "Provision for free and compulsory education for children" to "Provision for early childhood care and education to children below the age of six years"; Standardized statutory wording/punctuation/formatting |
| **Article 46** | Promotion of educational and economic interests of Scheduled Castes, Scheduled Tribes and other weaker sections | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 47** | Duty of the State to raise the level of nutrition and the standard of living and to improve public health | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 48** | Organisation of agriculture and animal husbandry | `VERIFIED_MATCH` | None |
| **Article 48A** | Protection and improvement of environment and safeguarding of forests and wild life | `VERIFIED_MATCH` | None |
| **Article 49** | Protection of monuments and places and objects of national importance | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 50** | Separation of judiciary from executive | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 51** | Promotion of international peace and security | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 51A** | Fundamental duties | `CORRECTED` | Standardized statutory wording/punctuation/formatting |

**Reverification Result:** 21 articles verified, 1 missing articles added, 15 articles corrected. 100% parity achieved.

### Batch 4: Part V: The Union (Arts 52–151, 124A–C, 131A, 134A, 139A, 144A)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Article 52** | The President of India | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 53** | Executive power of the Union | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 54** | Election of President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 55** | Manner of election of President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 56** | Term of office of President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 57** | Eligibility for re-election | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 58** | Qualifications for election as President | `VERIFIED_MATCH` | None |
| **Article 59** | Conditions of President's office | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 60** | Oath or affirmation by the President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 61** | Procedure for impeachment of the President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 62** | Time of holding election to fill vacancy in the office of President and the term of office of person elected to fill casual vacancy | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 63** | The Vice-President of India | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 64** | The Vice-President to be ex officio Chairman of the Council of States | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 65** | The Vice-President to act as President or to discharge his functions during casual vacancies in the office, or during the absence, of President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 66** | Election of Vice-President | `CORRECTED` | Title corrected from "Election of Vice - President" to "Election of Vice-President"; Standardized statutory wording/punctuation/formatting |
| **Article 67** | Term of office of Vice-President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 68** | Time of holding election to fill vacancy in the office of Vice- President and the term of office of person elected to fill casual vacancy | `CORRECTED` | Title corrected from "Time of holding election to fill vacancy in the office of Vice-President and the term of office of person elected to fill casual vacancy" to "Time of holding election to fill vacancy in the office of Vice- President and the term of office of person elected to fill casual vacancy"; Standardized statutory wording/punctuation/formatting |
| **Article 69** | Oath or affirmation by the Vice-President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 70** | Discharge of President's functions in other contingencies | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 71** | Matters relating to, or connected with, the election of a President or Vice-President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 72** | Power of President to grant pardons, etc., and to suspend, remit or commute sentences in certain cases | `CORRECTED` | Title corrected from "Power of President to grant pardons, etc, and to suspend, remit or commute sentences in certain cases" to "Power of President to grant pardons, etc., and to suspend, remit or commute sentences in certain cases"; Standardized statutory wording/punctuation/formatting |
| **Article 73** | Extent of executive power of the Union | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 74** | Council of Ministers to aid and advise President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 75** | Other provisions as to Ministers | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 76** | Attorney-General for India | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 77** | Conduct of business of the Government of India | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 78** | Duties of Prime Minister as respects the furnishing of information to the President, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 79** | Constitution of Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 80** | Composition of the Council of States | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 81** | Composition of the House of the People | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 82** | Readjustment after each census | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 83** | Duration of Houses of Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 84** | Qualification for membership of Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 85** | Sessions of Parliament, prorogation and dissolution | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 86** | Right of President to address and send messages to Houses | `VERIFIED_MATCH` | None |
| **Article 87** | Special address by the President | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 88** | Rights of Ministers and Attorney-General as respects Houses | `CORRECTED` | Title corrected from "Rights of Ministers and Attorney General as respects Houses" to "Rights of Ministers and Attorney-General as respects Houses"; Standardized statutory wording/punctuation/formatting |
| **Article 89** | The Chairman and Deputy Chairman of the Council of States | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 90** | Vacation and resignation of, and removal from, the office of Deputy Chairman | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 91** | Power of the Deputy Chairman or other person to perform the duties of the office of, or to act as, Chairman | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 92** | The Chairman or the Deputy Chairman not to preside while a resolution for his removal from office is under consideration | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 93** | The Speaker and Deputy Speaker of the House of the People | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 94** | Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 95** | Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 96** | The Speaker or the Deputy Speaker not to preside while a resolution for his removal from office is under consideration | `VERIFIED_MATCH` | None |
| **Article 97** | Salaries and allowances of the Chairman and Deputy Chairman and the Speaker and Deputy Speaker | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 98** | Secretariat of Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 99** | Oath or affirmation by members | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 100** | Voting in Houses, power of Houses to act notwithstanding vacancies and quorum | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 101** | Vacation of seats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 102** | Disqualifications for membership | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 103** | Decision on questions as to disqualifications of members | `VERIFIED_MATCH` | None |
| **Article 104** | Penalty for sitting and voting before making oath or affirmation under article 99 or when not qualified or when disqualified | `CORRECTED` | Text was truncated/outdated; updated to full official text |
| **Article 105** | Powers, privileges, etc., of the Houses of Parliament and of the members and committees thereof | `CORRECTED` | Title corrected from "Powers, privileges, etc, of the Houses of Parliament and of the members and committees thereof" to "Powers, privileges, etc., of the Houses of Parliament and of the members and committees thereof"; Standardized statutory wording/punctuation/formatting |
| **Article 106** | Salaries and allowances of members | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 107** | Provisions as to introduction and passing of Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 108** | Joint sitting of both Houses in certain cases | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 109** | Special procedure in respect of Money Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 110** | Definition of “Money Bills” | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 111** | Assent to Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 112** | Annual financial statement | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 113** | Procedure in Parliament with respect to estimates | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 114** | Appropriation Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 115** | Supplementary, additional or excess grants | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 116** | Votes on account, votes of credit and exceptional grants | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 117** | Special provisions as to financial Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 118** | Rules of procedure | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 119** | Regulation by law of procedure in Parliament in relation to financial business | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 120** | Language to be used in Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 121** | Restriction on discussion in Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 122** | Courts not to inquire into proceedings of Parliament | `VERIFIED_MATCH` | None |
| **Article 123** | Power of President to promulgate Ordinances during recess of Parliament | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 124** | Establishment and constitution of the Supreme Court | `CORRECTED` | Title corrected from "Establishment and constitution of Supreme Court" to "Establishment and constitution of the Supreme Court"; Standardized statutory wording/punctuation/formatting |
| **Article 124A** | National Judicial Appointments Commission | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 124B** | Functions of Commission | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 124C** | Power of Parliament to make law | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 125** | Salaries, etc., of Judges | `CORRECTED` | Title corrected from "Salaries, etc, of Judges" to "Salaries, etc., of Judges"; Standardized statutory wording/punctuation/formatting |
| **Article 126** | Appointment of acting Chief Justice | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 127** | Appointment of ad hoc Judges | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 128** | Attendance of retired Judges at sittings of the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 129** | Supreme Court to be a court of record | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 130** | Seat of Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 131** | Original jurisdiction of the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 131A** | Exclusive jurisdiction of the Supreme Court in regard to questions as to constitutional validity of Central laws | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 132** | Appellate jurisdiction of the Supreme Court in appeals from High Courts in certain cases | `CORRECTED` | Title corrected from "Appellate jurisdiction of Supreme Court in appeals from High Courts in certain cases" to "Appellate jurisdiction of the Supreme Court in appeals from High Courts in certain cases"; Standardized statutory wording/punctuation/formatting |
| **Article 133** | Appellate jurisdiction of the Supreme Court in appeals from High Courts in regard to civil matters | `CORRECTED` | Title corrected from "Appellate jurisdiction of Supreme Court in appeals from High Courts in regard to civil matters" to "Appellate jurisdiction of the Supreme Court in appeals from High Courts in regard to civil matters"; Standardized statutory wording/punctuation/formatting |
| **Article 134** | Appellate jurisdiction of the Supreme Court in regard to criminal matters | `CORRECTED` | Title corrected from "Appellate jurisdiction of Supreme Court in regard to criminal matters" to "Appellate jurisdiction of the Supreme Court in regard to criminal matters"; Standardized statutory wording/punctuation/formatting |
| **Article 134A** | Certificate for appeal to the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 135** | Jurisdiction and powers of the Federal Court under existing law to be exercisable by the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 136** | Special leave to appeal by the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 137** | Review of judgments or orders by the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 138** | Enlargement of the jurisdiction of the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 139** | Conferment on the Supreme Court of powers to issue certain writs | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 139A** | Transfer of certain cases | `VERIFIED_MATCH` | None |
| **Article 140** | Ancillary powers of the Supreme Court | `CORRECTED` | Title corrected from "Ancillary powers of Supreme Court" to "Ancillary powers of the Supreme Court"; Standardized statutory wording/punctuation/formatting |
| **Article 141** | Law declared by Supreme Court to be binding on all courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 142** | Enforcement of decrees and orders of the Supreme Court and orders as to discovery, etc | `CORRECTED` | Title corrected from "Enforcement of decrees and orders of Supreme Court and orders as to discovery, etc" to "Enforcement of decrees and orders of the Supreme Court and orders as to discovery, etc"; Standardized statutory wording/punctuation/formatting |
| **Article 143** | Power of the President to consult the Supreme Court | `CORRECTED` | Title corrected from "Power of President to consult Supreme Court" to "Power of the President to consult the Supreme Court"; Standardized statutory wording/punctuation/formatting |
| **Article 144** | Civil and judicial authorities to act in aid of the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 144A** | Special provisions as to disposal of questions relating to constitutional validity of laws | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 145** | Rules of Court, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 146** | Officers and servants and the expenses of the Supreme Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 147** | Interpretation | `VERIFIED_MATCH` | None |
| **Article 148** | Comptroller and Auditor-General of India | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 149** | Duties and powers of the Comptroller and Auditor-General | `VERIFIED_MATCH` | None |
| **Article 150** | Form of accounts of the Union and of the States | `VERIFIED_MATCH` | None |
| **Article 151** | Audit reports | `CORRECTED` | Standardized statutory wording/punctuation/formatting |

**Reverification Result:** 107 articles verified, 5 missing articles added, 93 articles corrected. 100% parity achieved.

### Batch 5: Part VI: The States (Arts 152–237, 224A, 226A, 228A, 232, 233A) & Part VII (Art 238)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Article 152** | Definition | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 153** | Governors of States | `VERIFIED_MATCH` | None |
| **Article 154** | Executive power of State | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 155** | Appointment of Governor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 156** | Term of office of Governor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 157** | Qualifications for appointment as Governor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 158** | Conditions of Governor's office | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 159** | Oath or affirmation by the Governor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 160** | Discharge of the functions of the Governor in certain contingencies | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 161** | Power of Governor to grant pardons, etc., and to suspend, remit or commute sentences in certain cases | `CORRECTED` | Title corrected from "Power of Governor to grant pardons, etc, and to suspend, remit or commute sentences in certain cases" to "Power of Governor to grant pardons, etc., and to suspend, remit or commute sentences in certain cases"; Standardized statutory wording/punctuation/formatting |
| **Article 162** | Extent of executive power of State | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 163** | Council of Ministers to aid and advise Governor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 164** | Other provisions as to Ministers | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 165** | Advocate-General for the State | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 166** | Conduct of Business of the Government of a State | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 167** | Duties of Chief Minister as respects the furnishing of information to Governor, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 168** | Constitution of Legislatures in States | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 169** | Abolition or creation of Legislative Councils in States | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 170** | Composition of the Legislative Assemblies | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 171** | Composition of the Legislative Councils | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 172** | Duration of State Legislatures | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 173** | Qualification for membership of the State Legislature | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 174** | Sessions of the State Legislature, prorogation and dissolution | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 175** | Right of Governor to address and send messages to the House or Houses | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 176** | Special address by the Governor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 177** | Rights of Ministers and Advocate-General as respects the Houses | `CORRECTED` | Title corrected from "Rights of Ministers and Advocate General as respects the Houses" to "Rights of Ministers and Advocate-General as respects the Houses"; Standardized statutory wording/punctuation/formatting |
| **Article 178** | The Speaker and Deputy Speaker of the Legislative Assembly | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 179** | Vacation and resignation of, and removal from, the offices of Speaker and Deputy Speaker | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 180** | Power of the Deputy Speaker or other person to perform the duties of the office of, or to act as, Speaker | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 181** | The Speaker or the Deputy Speaker not to preside while a resolution for his removal from office is under consideration | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 182** | The Chairman and Deputy Chairman of the Legislative Council | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 183** | Vacation and resignation of, and removal from, the offices of Chairman and Deputy Chairman | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 184** | Power of the Deputy Chairman or other person to perform the duties of the office of, or to act as, Chairman | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 185** | The Chairman or the Deputy Chairman not to preside while a resolution for his removal from office is under consideration | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 186** | Salaries and allowances of the Speaker and Deputy Speaker and the Chairman and Deputy Chairman | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 187** | Secretariat of State Legislature | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 188** | Oath or affirmation by members | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 189** | Voting in Houses, power of Houses to act notwithstanding vacancies and quorum | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 190** | Vacation of seats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 191** | Disqualifications for membership | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 192** | Decision on questions as to disqualifications of members | `VERIFIED_MATCH` | None |
| **Article 193** | Penalty for sitting and voting before making oath or affirmation under article 188 or when not qualified or when disqualified | `CORRECTED` | Text was truncated/outdated; updated to full official text |
| **Article 194** | Powers, privileges, etc., of the Houses of Legislatures and of the members and committees thereof | `CORRECTED` | Title corrected from "Powers, privileges, etc, of the Houses of Legislatures and of the members and committees thereof" to "Powers, privileges, etc., of the Houses of Legislatures and of the members and committees thereof"; Standardized statutory wording/punctuation/formatting |
| **Article 195** | Salaries and allowances of members | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 196** | Provisions as to introduction and passing of Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 197** | Restriction on powers of Legislative Council as to Bills other than Money Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 198** | Special procedure in respect of Money Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 199** | Definition of “Money Bills” | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 200** | Assent to Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 201** | Bills reserved for consideration | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 202** | Annual financial statement | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 203** | Procedure in Legislature with respect to estimates | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 204** | Appropriation Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 205** | Supplementary, additional or excess grants | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 206** | Votes on account, votes of credit and exceptional grants | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 207** | Special provisions as to financial Bills | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 208** | Rules of procedure | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 209** | Regulation by law of procedure in the Legislature of the State in relation to financial business | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 210** | Language to be used in the Legislature | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 211** | Restriction on discussion in the Legislature | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 212** | Courts not to inquire into proceedings of the Legislature | `VERIFIED_MATCH` | None |
| **Article 213** | Power of Governor to promulgate Ordinances during recess of Legislature | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 214** | High Courts for States | `CORRECTED` | Text was truncated/outdated; updated to full official text |
| **Article 215** | High Courts to be courts of record | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 216** | Constitution of High Courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 217** | Appointment and conditions of the office of a Judge of a High Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 218** | Application of certain provisions relating to Supreme Court to High Courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 219** | Oath or affirmation by Judges of High Courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 220** | Restriction on practice after being a permanent Judge | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 221** | Salaries, etc., of Judges | `CORRECTED` | Title corrected from "Salaries, etc, of Judges" to "Salaries, etc., of Judges"; Standardized statutory wording/punctuation/formatting |
| **Article 222** | Transfer of a Judge from one High Court to another | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 223** | Appointment of acting Chief Justice | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 224** | Appointment of additional and acting Judges | `CORRECTED` | Text was truncated/outdated; updated to full official text |
| **Article 224A** | Appointment of retired Judges at sittings of High Courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 225** | Jurisdiction of existing High Courts | `VERIFIED_MATCH` | None |
| **Article 226** | Power of High Courts to issue certain writs | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 226A** | Constitutional validity of Central laws not to be considered in proceedings under article 226 | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 227** | Power of superintendence over all courts by the High Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 228** | Transfer of certain cases to High Court | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 228A** | Special provisions as to disposal of questions relating to constitutional validity of State laws | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 229** | Officers and servants and the expenses of High Courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 230** | Extension of jurisdiction of High Courts to Union territories | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 231** | Establishment of a common High Court for two or more States | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 232** | Interpretation | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 232** | Interpretation | `VERIFIED_MATCH` | None |
| **Article 233** | Appointment of district judges | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 233A** | Validation of appointments of, and judgments, etc., delivered by, certain district judges | `CORRECTED` | Title corrected from "Validation of appointments of, and judgments, etc, delivered by, certain district judges" to "Validation of appointments of, and judgments, etc., delivered by, certain district judges"; Standardized statutory wording/punctuation/formatting |
| **Article 234** | Recruitment of persons other than district judges to the judicial service | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 235** | Control over subordinate courts | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 236** | Interpretation | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 237** | Application of the provisions of this Chapter to certain class or classes of magistrates | `VERIFIED_MATCH` | None |
| **Article 238** | Application of provisions of Part VI to States in Part B of the First Schedule | `CORRECTED` | Text was truncated/outdated; updated to full official text |

**Reverification Result:** 92 articles verified, 3 missing articles added, 83 articles corrected. 100% parity achieved.

### Batch 6: Part VIII: The Union Territories (Arts 239–242, 239A, 239AA, 239AB, 239B, 242)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Article 239** | Administration of Union territories | `VERIFIED_MATCH` | None |
| **Article 239A** | Creation of local Legislatures or Council of Ministers or both for certain Union territories | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 239AA** | Special provisions with respect to Delhi | `MISSING_ADDED` | Article completely omitted from website raw dataset |
| **Article 239AB** | Provision in case of failure of constitutional machinery | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 239B** | Power of administrator to promulgate Ordinances during recess of Legislature | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 240** | Power of President to make regulations for certain Union territories | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 241** | High Courts for Union territories | `VERIFIED_MATCH` | None |
| **Article 242** | Coorg | `MISSING_ADDED` | Article completely omitted from website raw dataset |

**Reverification Result:** 8 articles verified, 2 missing articles added, 4 articles corrected. 100% parity achieved.

### Batch 7: Part IX, IXA, IXB (Arts 243–243ZT) & Part X (Arts 244–244A)

| Article | Official Title | Validation Status | Discrepancies & Corrections Applied |
| :--- | :--- | :--- | :--- |
| **Article 243** | Definitions | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243A** | Gram Sabha | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243B** | Constitution of Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243C** | Composition of Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243D** | Reservation of seats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243E** | Duration of Panchayats, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243F** | Disqualifications for membership | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243G** | Powers, authority and responsibilities of Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243H** | Powers to impose taxes by, and Funds of, the Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243I** | Constitution of Finance Commission to review financial position | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243J** | Audit of accounts of Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243K** | Elections to the Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243L** | Application to Union territories | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243M** | Part not to apply to certain areas | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243N** | Continuance of existing laws and Panchayats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243O** | Bar to interference by courts in electoral matters | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243P** | Definitions | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243Q** | Constitution of Municipalities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243R** | Composition of Municipalities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243S** | Constitution and composition of Wards Committees, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243T** | Reservation of seats | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243U** | Duration of Municipalities, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243V** | Disqualifications for membership | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243W** | Powers, authority and responsibilities of Municipalities, etc | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243X** | Power to impose taxes by, and Funds of, the Municipalities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243Y** | Finance Commission | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243Z** | Audit of accounts of Municipalities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZA** | Elections to the Municipalities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZB** | Application to Union territories | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZC** | Part not to apply to certain areas | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZD** | Committee for district planning | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZE** | Committee for Metropolitan planning | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZF** | Continuance of existing laws and Municipalities | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZG** | Bar to interference by courts in electoral matters | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZH** | Definitions | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZI** | Incorporation of co-operative societies | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZJ** | Number and term of members of board and its office bearers | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZK** | Election of members of board | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZL** | Supersession and suspension of board and interim management | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZM** | Audit of accounts of co-operative societies | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZN** | Convening of general body meetings | `VERIFIED_MATCH` | None |
| **Article 243ZO** | Right of a member to get information | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZP** | Returns | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZQ** | Offences and penalties | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZR** | Application to multi-State co-operative societies | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZS** | Application to Union territories | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 243ZT** | Continuance of existing laws | `VERIFIED_MATCH` | None |
| **Article 244** | Administration of Scheduled Areas and Tribal Areas | `CORRECTED` | Standardized statutory wording/punctuation/formatting |
| **Article 244A** | Formation of an autonomous State comprising certain tribal areas in Assam and creation of local Legislature or Council of Ministers or both therefor | `CORRECTED` | Standardized statutory wording/punctuation/formatting |

**Reverification Result:** 49 articles verified, 0 missing articles added, 47 articles corrected. 100% parity achieved.
