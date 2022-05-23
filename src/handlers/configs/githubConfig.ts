// import schema from "@schemas/github";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: handlerPath("github.main"),
  events: [
    {
      http: {
        method: "post",
        path: "github-webhook",
        // request: {
        //   schemas: {
        //     "application/json": any,
        //   },
        // },
      },
    },
  ],
};
