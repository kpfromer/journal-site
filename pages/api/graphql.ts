import type { NextApiRequest, NextApiResponse } from "next";
import {
  Request,
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";

import { GraphQLSchema } from "graphql";
import { createContext } from "../../lib/graphql/context";
import { schema } from "../../lib/graphql/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  } as Request;

  if (shouldRenderGraphiQL(request)) {
    res.send(
      renderGraphiQL({
        endpoint: "/api/graphql",
      })
    );
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema: schema as unknown as GraphQLSchema,
      contextFactory: () =>
        createContext(req.headers as Record<string, string>),
    });

    sendResult(result, res);
  }
}
