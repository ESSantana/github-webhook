import { getDBConnection } from "./dbConnection";
import { SlackWebhookDB } from "@internal-types/slack";
import MySQL from "mysql";

const insert = async (connection: MySQL.Connection, table: string, data: any) => {
  const query = `INSERT INTO ${table}(webhook_url) VALUES (?)`;
  const result = await connection.query(query, data);
  return result;
}

export const saveWebhookInfo = async (data: Partial<SlackWebhookDB>) => {
  const connection = await getDBConnection();
  const response = await insert(connection, "tb_slack_webhook", data.webhookUrl);

  return response;
}
