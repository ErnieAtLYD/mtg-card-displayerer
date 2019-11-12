import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import useInfiniteScroll from './useInfiniteScroll';
import MockAdapter from "axios-mock-adapter";

test("useFetch performs GET request", async () => {
  const mock = new MockAdapter(axios);
  const mockData = "response";
  const url = 'https://api.magicthegathering.io/v1/cards?type=Creature&pageSize=20&page=1'
  mock.onGet(url).reply(200, mockData);

  // const {result} = renderHook(
  //   (obj) => useInfiniteScroll()
  // )
  // console.log(result.current)
});
