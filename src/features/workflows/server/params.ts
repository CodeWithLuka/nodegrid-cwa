import { parseAsInteger, parseAsString } from "nuqs/server";

import { PAGINATION } from "@/constants";

export const workflowsParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString
    .withDefault(PAGINATION.SEARCH)
    .withOptions({ clearOnDefault: true }),
};
