import { handlerPath } from "@utils/utils";

export default {
  handler: handlerPath("github.main"),
  events: [
    {
      http: {
        method: "post",
        path: "github-webhook",
      },
    },
  ],
};
