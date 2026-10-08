# Portfolio numerical claim audit

Original claims are retained here for traceability. Repeated statements in a
README or biography are not independent measurement evidence.

## Publication decisions

| Original claim | Original location | Evidence status | Decision |
| --- | --- | --- | --- |
| Query speed improved by 45% | README.md | No query, baseline, dataset, environment, or timing report supplied | Removed; do not publish until reproducible |
| 99% automated validation accuracy / over 99% data accuracy | README.md and src/Portifolio.jsx | Accuracy definition, labeled dataset, denominator, and evaluation absent | Replaced with data validation work description |
| Projects delivered 20% faster | README.md | No comparison period, comparable scope, or delivery records supplied | Replaced with project leadership description |
| Recognition accuracy increased 15% | src/Portifolio.jsx | Baseline and evaluation absent; relative percent versus percentage points ambiguous | Replaced with recognition and validation work description |
| 16 unique browser profiles | src/Portifolio.jsx | Count not verified against the automation repository | Replaced with unnumbered browser-profile description |
| 04+ key projects | src/About.jsx | Portfolio contains five project entries; this verifies listed entries only | Retained as a portfolio count; do not imply deployed production systems |
| 02 internships | src/About.jsx | Two internship entries exist | Retained as reported experience; dates/status still require confirmation |
| 08 certifications | src/About.jsx | Eight certificate entries exist, including an MLSA entry and duplicate Java labels | Count is supported as eight displayed credential entries; credential classification needs review before reuse |
| CGPA 7.97/10 | src/Education.jsx | Superseded by owner-supplied 8.04 | Updated to 8.04/10 |
| Class X 81%; Intermediate 94.4% | src/Education.jsx | Existing reported education data; component currently not rendered | Pending owner/record confirmation |

## Measurement requirements

For any future numerical outcome, record the project, exact metric, baseline,
changed implementation, dataset or workload, environment, measurement dates,
sample size, result, and a reproducible report or script. State personal
contribution separately from team results.

- Query latency: name the query and dataset, show comparable before/after timings, and specify percentile or average and cache conditions.
- Accuracy: define correct output, provide labeled examples, denominator, validation rules, and before/after evaluation. Distinguish extraction accuracy from validation accuracy.
- Delivery speed: define the delivery unit, comparable scopes, dates, and attribution.
- Scale: distinguish measured concurrent users, sustained throughput, registered users, and architectural goals.

Label load-test results as load-test results. Do not present a design goal,
library dependency, or repository size as evidence of production scalability.
