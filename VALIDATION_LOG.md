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
| **Batch 4** | Part V (Arts 52–151, 124A–C, 131A, 134A, 139A, 144A) | Queued | Pending | Pending | Pending |
| **Batch 5** | Part VI (Arts 152–237, 224A, 226A, 228A, 232, 233A) & Part VII (Art 238) | Queued | Pending | Pending | Pending |
| **Batch 6** | Part VIII (Arts 239–242, 239A, 239AA, 239AB, 239B, 242) | Queued | Pending | Pending | Pending |
| **Batch 7** | Part IX, IXA, IXB (Arts 243–243ZT) & Part X (Arts 244–244A) | Queued | Pending | Pending | Pending |
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
