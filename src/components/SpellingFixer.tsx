import axios from "axios";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ShowCorrected from "./ShowCorrected";

type Props = { corpus: string };

const SpellingFixer = ({ corpus }: Props) => {
  const [corrected, setCorrected] = useState<string | null>(null);

  const url = "https://spellchecker.glitch.me/";

  enum apiPath {
    misspelled = "misspelled",
    corrections = "corrections",
    checkspelling = "checkspelling",
  }

  useEffect(() => {
    checkString();
    // eslint-disable-next-line
  }, [corpus]);

  const checkString = async () => {
    setCorrected(null);
    await axios
      .post(url + apiPath.checkspelling, {
        corpus,
      })
      .then(async function (response) {
        if (response.data.misspellings.length) {
          let correctionRequests: any[] = [];
          let correctionResult: any[];

          correctionRequests = generateCorrectionRequestPromises(
            response.data.misspellings
          );
          correctionResult = await axios.all(correctionRequests);

          correctionResult && applyCorrections(corpus, correctionResult);
        } else {
          setCorrected(corpus);
        }
      });
  };

  const applyCorrections = (incorrectString: string, corrections: any[]) => {
    let newString: string = incorrectString;

    corrections
      .sort((a: any, b: any) => {
        return b.start - a.start;
      })
      .forEach((correction: any) => {
        newString =
          newString.substring(0, correction.start) +
          correction.corrections[0] +
          newString.substring(correction.end);
      });

    setCorrected(newString);
  };

  const generateCorrectionRequestPromises: any = (misspellings: any[]) => {
    let correctionRequests: any[] = [];
    misspellings.forEach((miss: any, index: number) => {
      let missString: string = corpus.substring(miss.start, miss.end);

      correctionRequests.push(
        createCorrectionRequest(missString, miss.start, miss.end)
      );
    });
    return correctionRequests;
  };

  const createCorrectionRequest: any = (
    word: string,
    start: number,
    end: number
  ) => {
    return axios
      .get(url + apiPath.corrections, {
        params: {
          word,
        },
      })
      .then((response) => {
        return { ...response.data, start, end };
      });
  };

  return (
    <>
      {corrected === null ? (
        <LoadingSpinner />
      ) : (
        <ShowCorrected text={corrected} />
      )}
    </>
  );
};

export default SpellingFixer;
