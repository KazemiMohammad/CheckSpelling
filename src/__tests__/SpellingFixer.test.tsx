import axios from "axios";
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import mockResponses from "../../mock_responses/mock-responses";
import SpellingFixer from "../components/SpellingFixer";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("SpellingFixer", () => {
  const makeGetMock = (params: any) => {
    mockAxios.get.mockImplementation(
      (url: string, options: any): Promise<any> => {
        if (
          url.includes("corrections") &&
          options.params &&
          options.params.word in params
        ) {
          return Promise.resolve(params[options.params.word]);
        }

        return Promise.reject({ status: 422 });
      }
    );
  };

  const makeAllMockResolvedValue = (params: any) => {
    mockAxios.all.mockResolvedValue([
      { ...params.helllo.data, start: 0, end: 6 },
      { ...params.woirld.data, start: 7, end: 13 },
    ]);
  };

  const makePostMock = (mockResponse: any, uncorrectedText: string) => {
    mockAxios.post.mockImplementationOnce(
      (url: string, params: any): Promise<any> => {
        if (
          url.includes("checkspelling") &&
          params &&
          params.corpus === uncorrectedText
        ) {
          return Promise.resolve(mockResponse);
        }

        return Promise.reject({ status: 422 });
      }
    );
  };

  afterEach(() => jest.resetAllMocks());

  for (const mock of mockResponses) {
    it(`should correct "${mock.corpus}" -> "${mock.expected}"`, async () => {
      makePostMock(mock.POST, mock.corpus);
      makeGetMock(mock.GET);
      makeAllMockResolvedValue(mock.GET);
      const wrapper = mount(<SpellingFixer corpus={mock.corpus} />);

      await act(() => new Promise(setImmediate));
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledTimes(
        Object.values(mock.GET).length
      );

      wrapper.update();
      const result = wrapper.find(".corrected-text");
      expect(result.text()).toEqual(mock.expected);
    });
  }
});
