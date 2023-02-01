
import fs from 'fs'

const document = JSON.parse(fs.readFileSync('./document.json').toString());

const makeObjectForIndex = (index)=>{
  const doc = JSON.parse(JSON.stringify(document))
  doc.credentialSubject.items = new Array(index).fill({ name: 'itemsL1', items: new Array(index).fill({ name: 'itemsL2' }) });
  return doc;
}

function parseHrtimeToSeconds(hrtime) {
  var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
  return seconds;
}

function parseHrtimeToMillis(hrtime) {
  var millis = (hrtime[0] + (hrtime[1] / 1e6)).toFixed(4);
  return millis;
}

const timeFunction = async (func) => {
  const start = process.hrtime();
  await func()
  const end = process.hrtime(start);
  const durationSeconds = parseHrtimeToSeconds(end);
  const durationMillis = parseHrtimeToMillis(end);
  return { "s": parseFloat(durationSeconds), "ms": parseFloat(durationMillis) }
}

const prepareVendor = async (v) => {
  const privateKey = await v.getPrivateKey()
  const publicKey = v.getPublicKey === undefined ? undefined : await v.getPublicKey();
  v.publicKey = publicKey;
  v.privateKey = privateKey;
}

const generateSeries = async (vendor, name, count, increment)=>{
  await prepareVendor(vendor)
  const signatureTime = []
  const verifyTime = []
  for (let i = 0; i < count; i+=increment){
    const doc = makeObjectForIndex(i)
    let signed;
    signatureTime.push( await timeFunction(async ()=>{
      signed = await vendor.sign(doc, vendor.privateKey);
    }))
    verifyTime.push( await timeFunction(async ()=>{
      await vendor.verify(signed, vendor.publicKey);
    }))
  }
  return [{
    "name": name + " - Sign",
    "data": signatureTime
  },
  {
    "name": name + " - Verify",
    "data": verifyTime
  }]
}


export  { makeObjectForIndex,  parseHrtimeToSeconds, timeFunction, prepareVendor, generateSeries  }
