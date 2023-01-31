
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020'
import { Ed25519Signature2020, suiteContext } from '@digitalbazaar/ed25519-signature-2020'
import fs from 'fs'
import jsigs from 'jsonld-signatures';
const {purposes: {AssertionProofPurpose}} = jsigs;
const keyPair = JSON.parse(fs.readFileSync('./keyPair2.json').toString())
const vcContext = JSON.parse(fs.readFileSync('./contexts/cred-v1.json').toString())
const { privateKeyBase58, ...publicVerificationMethod } = keyPair;
const contexts = {
  'https://www.w3.org/2018/credentials/v1': vcContext,
  'https://w3id.org/security/suites/ed25519-2020/v1': suiteContext.CONTEXT
}
const controllers = {
  'https://example.edu/issuers/565049': {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      'https://w3id.org/security/suites/ed25519-2020/v1'
    ],
    id: keyPair.controller,
    assertionMethod: [publicVerificationMethod]
  },
  'https://example.edu/issuers/565049#z6MkiquE5MxVqA6QxWNzbv5xvY8R9qkn8Jf7E29aXzz1fbwu': {
    '@context': 'https://w3id.org/security/suites/ed25519-2020/v1',
    ...publicVerificationMethod
  }
}
const getPrivateKey = async () =>{
  return Ed25519VerificationKey2020.from(keyPair)
}
const documentLoader = (url)=>{
  if (contexts[url]){
    return { document: contexts[url] }
  }
  if (controllers[url]){
    return { document: controllers[url] }
  }
  console.error('Unsupported URL: ', url)
}
const sign = async (document, keyPair)=>{
  const suite = new Ed25519Signature2020({key: keyPair});
  suite.date = '2010-01-01T19:23:24Z';
  const signedDocument = await jsigs.sign(document, {
    suite,
    purpose: new AssertionProofPurpose(),
    documentLoader
  });
  return signedDocument
};
const verify = async (document)=>{
  const suite = new Ed25519Signature2020();
  const {verified} = await jsigs.verify(document, {
    suite,
    purpose: new AssertionProofPurpose(),
    documentLoader
  });
  return verified
};

// (async ()=>{
//   const privateKey = await getPrivateKey();
//   const signature = await sign(document, privateKey)
//   const verified = await verify(signature)
//   console.log(verified)
// })()

const api = {
  keyPair,
  getPrivateKey,
  // getPublicKey,
  sign,
  verify
}

export default api