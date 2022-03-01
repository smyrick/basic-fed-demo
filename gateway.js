import { ApolloServer } from 'apollo-server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

export async function buildGateway(port) {
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        {
          name: 'a',
          url: 'http://localhost:4001/graphql',
        },
        {
          name: 'b',
          url: 'http://localhost:4002/graphql',
        },
      ],
    }),
  });

  const server = new ApolloServer({
    gateway,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  const { url } = await server.listen(port);
  console.log(`Gateway running ${url}`);
}
