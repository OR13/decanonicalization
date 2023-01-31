
import fs from 'fs'

import vendor0 from './vendor-0.js'
import vendor1 from './vendor-1.js'

import { generateSeries } from './common.js'

(async ()=> {
  const count = 4
  const increment = 1;
  const seriesA = await generateSeries(vendor0, 'Data Integrity', count, increment)
  const seriesB = await generateSeries(vendor1, 'JSON Web Signature', count, increment)
  fs.writeFileSync('./docs/times.json', JSON.stringify(
    [...seriesA, ...seriesB], null, 2
  ));
})()
