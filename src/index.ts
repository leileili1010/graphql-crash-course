import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db.js"; // db
import { typeDefs } from "./schema.js"; // types

// resolvers
const resolvers = {
  // 1. Root resolvers（入口）
  // inside query are entry points to the graph
  Query: {
    reviews: () => db.reviews,
    games: () => db.games,
    authors: () => db.authors,
    review: (_: any, args: { id: string }) =>
      db.reviews.find((review) => review.id === args.id),
    game: (_: any, args: { id: string }) =>
      db.games.find((game) => game.id === args.id),
    author: (_: any, args: { id: string }) =>
      db.authors.find((author) => author.id === args.id),
  },

  // 2. Field resolvers（字段解析）
  // below are nested queries
  Game: {
    reviews: (parent: any) => db.reviews.filter((r) => r.game_id === parent.id),
  },
  Author: {
    reviews: (parent: any) =>
      db.reviews.filter((r) => r.author_id === parent.id),
  },
  Review: {
    author: (parent: any) => db.authors.find((a) => a.id === parent.author_id),
    game: (parent: any) => db.games.find((g) => g.id === parent.game_id),
  },

  // 3. Mutation resolvers
  Mutation: {
    addGame: (_: any, args: { game: { title: string; platform: string[] } }) => {
      const game = {
        ...args.game,
        id: (db.games.length + 1).toString(),
      };
      db.games.push(game);
      return game;
    },
    updateGame: (_: any, args: { id: string; edits: { title: string; platform: string[] } }) => {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game;
      });
      return db.games.find((game) => game.id === args.id);
    },
    deleteGame: (_: any, args: { id: string }) => {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
  },    
};

// Set up server
// ApolloServer constructor requires 2 parameters:
// your schema definition
// and your set of resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
