import { env } from "./env";
import { loadDataList } from "./utils";

const { PASSWORD, DATA_PATH } = env;

const dataList = loadDataList(DATA_PATH, PASSWORD);
console.log(dataList);
