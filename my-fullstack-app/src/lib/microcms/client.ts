import { createClient } from "microcms-js-sdk";

// 環境変数を取得（なければ "dummy" を入れる）
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || "dummy";
const apiKey = process.env.MICROCMS_API_KEY || "dummy";

// 💡 ポイント: throw new Error の行を削除、またはコメントアウトしました。
// これにより、ビルド時に変数がなくてもプロセスが止まらなくなります。

export const client = createClient({
  serviceDomain: serviceDomain,
  apiKey: apiKey,
});

// 前のファイルでこの名前を使っていた場合のために、別名でも書き出しておくと安全です
export const microcmsClient = client;
