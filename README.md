
#### 🔏 JSON Web Signatures are better at protecting content type `application/credentials+ld+json`.

This reposistory demonstrates that [data integrity proof](https://www.w3.org/TR/vc-data-integrity/) `sign` and `verify` operation times are bound to the size of the input data interpreted as RDF.

This is because data integrity proofs require some form of canonicalizaton, most commonly [URDNA2015](https://www.w3.org/TR/rdf-canon/).

A clever attacker can ask a verifier expensive questions.

The verifier will be forced to cannonicalize before checking the signature.

This can cost the verifier a lot of compute time, for something that will not even very.

See this twitter thread: [just... sign... the... bytes...](https://twitter.com/OR13b/status/1618415157235052545)
