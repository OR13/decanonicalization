

import * as jose from 'jose'
import fs from 'fs'

const keyPair = JSON.parse(fs.readFileSync('./keyPair.json').toString())

const getPrivateKey = () =>{
  return jose.importJWK(keyPair.privateKeyJwk);
}

const getPublicKey = () =>{
  return jose.importJWK(keyPair.publicKeyJwk);
}

const sign = async (document, privateKey)=>{
  const jws = await new jose.CompactSign(
    new TextEncoder().encode(JSON.stringify(document)),
  )
    .setProtectedHeader({ alg: keyPair.publicKeyJwk.alg })
    .sign(privateKey)
  return jws
}

const verify = async (document, publicKey)=>{
  const { protectedHeader } = await jose.compactVerify(document, publicKey)
  return protectedHeader.alg === keyPair.publicKeyJwk.alg
}

// (async ()=>{
//   const privateKey = await getPrivateKey();
//   const publicKey = await getPublicKey();
//   const signature = await sign(document, privateKey)
//   const verified = await verify(signature, publicKey )
//   console.log(verified, signature)
// })()

const api = {
  keyPair,
  getPrivateKey,
  getPublicKey,
  sign,
  verify
}

export default api