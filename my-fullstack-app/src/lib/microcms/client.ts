import { createClient } from "microcms-js-sdk";

// 環境変数を取得（なければ "dummy" を入れる）
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || "dummy";
const apiKey = process.env.MICROCMS_API_KEY || "dummy";

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});

export const microcmsClient = client;
