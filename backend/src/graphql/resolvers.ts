import { loadFilesSync } from '@graphql-tools/load-files';
import { join } from 'path';
import { DocumentNode } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

const resolvers = {
  Query: {
    // To be implemented
  },
  Mutation: {
    // To be implemented
  },
};

const typeDefs = loadFilesSync(join(__dirname, './schema.graphql')) as DocumentNode[];

export const schema = makeExecutableSchema({ typeDefs, resolvers });
export default resolvers; 