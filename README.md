
#### 🔏 JSON Web Signatures are better at protecting content type `application/credentials+ld+json`.

[![CI](https://github.com/OR13/decanonicalization/actions/workflows/ci.yml/badge.svg)](https://github.com/OR13/decanonicalization/actions/workflows/ci.yml)

This reposistory demonstrates that [data integrity proof](https://www.w3.org/TR/vc-data-integrity/) `sign` and `verify` operation times are bound to the size of the input data interpreted as RDF.

This is because data integrity proofs require some form of canonicalizaton, most commonly [URDNA2015](https://www.w3.org/TR/rdf-canon/).

A clever attacker can ask a verifier expensive questions.

The verifier will be forced to cannonicalize before checking the signature.

This can cost the verifier a lot of compute time, for a proof that might not even verify.

See this twitter thread: [just... sign... the... bytes...](https://twitter.com/OR13b/status/1618415157235052545)


## Updates

The methodology used here has been challenged, see:

- https://github.com/w3c/vc-jwt/pull/44#issuecomment-1420981871
- https://lists.w3.org/Archives/Public/public-vc-wg/2023Jan/0036.html
- https://github.com/dlongley/decanonicalization/commit/4e3266620cf38e4c794b128f5fe204336430f606#r99192077
