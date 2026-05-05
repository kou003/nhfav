import util from "node:util";
import {
  type Data,
  type DataList,
  dataResponseSchema,
  dataSchema,
} from "@models/data";
import { env } from "./env";
import { delay, loadData, saveData } from "./utils";

const {
  PASSWORD,
  API_KEY,
  API_ENDPOINT,
  MAIN_ORIGIN,
  THUMBNAIL_ORIGINS,
  DATA_PATH,
  WAIT_MS,
  WORKFLOW_TOKEN,
  REPOSITORY,
} = env;

async function main() {
  const isFullUpdate = process.argv.includes("--full");
  if (isFullUpdate) {
    console.log("Performing full update...");
  } else {
    console.log("Performing incremental update...");
  }

  const prevData =
    (!isFullUpdate &&
      dataSchema.safeParse(loadData(DATA_PATH, PASSWORD)).data) ||
    dataSchema.parse({});
  const existIds = new Set(prevData.items.map((item) => item.id));

  const nextItems: DataList = [];

  let page = 1;
  while (true) {
    const url = `${API_ENDPOINT}?page=${page}`;
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

    console.log(`Fetched page ${page} with ${data.result.length} items.`);

    if (data.result.length === 0) {
      console.log("No more data to fetch.");
      break;
    }

    let existFound = false;
    for (const item of data.result) {
      if (existIds.has(item.id)) {
        existFound = true;
        break;
      } else {
        nextItems.push(item);
      }
    }
    if (existFound) {
      console.log("Existing data found. Stopping fetch.");
      break;
    }

    page++;

    await delay(WAIT_MS); // Wait before the next request
  }

  nextItems.push(...prevData.items);

  const newData = {
    items: nextItems,
    origin: MAIN_ORIGIN,
    thumbnailOrigins: THUMBNAIL_ORIGINS,
    repository: REPOSITORY,
    workflowToken: WORKFLOW_TOKEN,
  } satisfies Data;

  if (util.isDeepStrictEqual(newData, prevData)) {
    console.log("No changes detected. Data is up to date.");
    return;
  }

  saveData<Data>(DATA_PATH, PASSWORD, newData);
}

main();
