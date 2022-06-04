import { randomArrayShuffle } from "../components/randomArrayShuffle";

export async function quizzFetch(category, difficulty) {
  const fetcheddata = await fetch(
    `https://opentdb.com/api.php?amount=4&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const rawdata = await fetcheddata.json();
  const preparedData = rawdata.results.map((item) => {
    const allanswers = [...item.incorrect_answers, item.correct_answer];
    const randomedanswers = randomArrayShuffle(allanswers);

    let randomedanswersObject = randomedanswers.map((item) => {
      return { item, hold: false };
    });
    return { ...item, randomedanswersObject };
  });
  return preparedData;
}
