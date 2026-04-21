import { type DataList, dataResponseSchema } from "../src/types/data";
import { env } from "./env";
import { delay, loadDataList, saveDataList } from "./utils";

const { PASSWORD, API_KEY, ENDPOINT, DATA_PATH, WAIT_MS } = env;

async function main() {
  const prevDataList = loadDataList(DATA_PATH, PASSWORD);
  const existIds = new Set(prevDataList.map((item) => item.id));

  const nextDataList: DataList = [];

  let page = 1;
  while (true) {
    const url = `${ENDPOINT}?page=${page}`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Key ${API_KEY}`,
      },
    });

    // Handle rate limiting
    const retryAfter = response.headers.get("Retry-After");
    if (response.status === 429 && retryAfter) {
      const retryAfterMs = parseInt(retryAfter, 10) * 1000;
      console.warn(
        `Rate limited. Retrying after ${retryAfterMs / 1000} seconds...`,
      );
      await delay(retryAfterMs + 10000); // Add extra 10 seconds to be safe
      continue;
    }

    // Handle other HTTP errors
    if (!response.ok) {
      throw new Error(`http error: ${response.status}`);
    }

    const data = dataResponseSchema.parse(await response.json());

    if (data.result.length === 0) {
      console.log("No more data to fetch.");
      break;
    }

    let existFound = false;
    for (const item of data.result) {
      if (!existIds.has(item.id)) {
        nextDataList.push(item);
      } else {
        existFound = true;
        break;
      }
    }
    if (existFound) {
      console.log("Existing data found. Stopping fetch.");
      break;
    }

    console.log(`Fetched page ${page} with ${data.result.length} items.`);
    page++;

    await delay(WAIT_MS); // Wait before the next request
  }

  nextDataList.push(...prevDataList);

  saveDataList(DATA_PATH, PASSWORD, nextDataList);
}

main();
