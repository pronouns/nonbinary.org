# nonbinary.org-data
Temporary attempt to make content of nonbinary.org available. The extraction process is a bit redundant as I couldn't run the main crawler on my machine and I couldn't run extended logic on the web crawling service.

## Process

| step | artifacts | code |
| ---- | --------- | ---- |
| Extract HTML data from the majority of articles on wiki (using Apifier). | `2/README` | N/A |
| Remove content to speed up processing | `unsorted2.json` | performed using a regex |
| Extract article names and remove uneeded articles and de-dupe | `2/list.json` `2/times.json` | `tolist.js` |
| Query archive.org for raw wiki text of articles | `3/pages/*` `3/failed.json` | `runquery.json` |


  
