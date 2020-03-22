#!/usr/bin/env sh

set -ex

DIR=$(dirname $0)

# apollo-codegen introspect-schema ./graphql/schema.graphql --output ./graphql/schema.json

apollo service:download \
  $1/schema.json

apollo client:codegen \
  --config apollo.config.js \
  --target typescript \
  --addTypename \
  --outputFlat $1/clientTypes.ts

graphql-schema-typescript generate-ts \
  --typePrefix="" \
  --strictNulls \
  --smartTResult \
  --asyncResult \
  --requireResolverTypes \
  --noStringEnum \
  --output $1/serverTypes.ts $1/schema.graphql \
  --contextType="ResolverContext" \
  --importStatements="import { ResolverContext } from \"./resolvers\";"

set +x