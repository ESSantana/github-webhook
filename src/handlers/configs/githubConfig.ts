// import schema from "@schemas/github";
import { handlerPath } from "@utils/utils";

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
