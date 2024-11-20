import aqp from 'api-query-params';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGESIZE,
  QUERY_NUMBER_ALL,
  QUERY_STRING_ALL,
} from './constants';

type QueryKeywords = {
  keyword: string;
  page: number;
  pageSize: number;
  skip: number;
  sort: Record<string, number>;
};

export const queryHandler = (query: string): QueryKeywords => {
  const { filter, sort } = aqp(query);

  const keyword = filter['keyword'] || QUERY_STRING_ALL;
  const page = filter['page'] || DEFAULT_PAGE;
  const pageSize = filter['pageSize'] || DEFAULT_PAGESIZE;
  const skip = page * pageSize;

  return {
    keyword,
    page,
    pageSize,
    skip,
    sort,
  };
};
