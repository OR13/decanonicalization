
import fs from 'fs'

import vendor0 from './vendor-0.js'
import vendor1 from './vendor-1.js'

import { generateSeries } from './common.js'

(async ()=> {
  // 16 takes too long - https://github.com/OR13/decanonicalization/actions/runs/4058366235
  const count = 10
  const increment = 1;
  const seriesA = await generateSeries(vendor0, 'Data Integrity', count, increment)
  const seriesB = await generateSeries(vendor1, 'JSON Web Signature', count, increment)
  fs.writeFileSync('./docs/times.json', JSON.stringify(
    [...seriesA, ...seriesB], null, 2
  ));
})()
