import fs from 'fs';
import {  mergeTypeDefs  } from "@graphql-tools/merge";

const typeDefs = mergeTypeDefs([
    fs.readFileSync(new URL('./global.graphql', import.meta.url), 'utf-8'),
    fs.readFileSync(new URL('./user.graphql', import.meta.url), 'utf-8'),
    fs.readFileSync(new URL('./post.graphql', import.meta.url), 'utf-8'),
    fs.readFileSync(new URL('./comment.graphql', import.meta.url), 'utf-8'),
]);

export default typeDefs