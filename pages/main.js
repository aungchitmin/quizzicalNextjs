import classes from "./main.module.css";
import { quizzFetch } from "../lib/quizzFetch";
import Quizz from "../components/Quizz";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { deleteState, checkAnswers } from "../reducers/answerExecuter";

export default function Main(props) {
  const [flag, setFlag] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.counterReducer.scores);

  let questions = props.alldata.map((item) => (
    <Quizz
      data={item}
      key={item.correct_answer}
      id={item.correct_answer}
      flag={flag}
    />
  ));

  const checkIt = () => {
    dispatch(checkAnswers());
    setFlag(true);
  };

  const goHome = () => {
    dispatch(deleteState());
    router.push("/");
  };

  const playAgain = async () => {
    dispatch(deleteState());
    router.reload();

    let moreQues = await quizzFetch();

    setFlag(false);
    questions = moreQues.map((item) => (
      <Quizz
        data={item}
        key={item.correct_answer}
        id={item.correct_answer}
        flag={flag}
      />
    ));
  };

  return (
    <div className={classes.allquizzHolder}>
      <div className={classes.quizzHolder}>{questions}</div>
      {!flag ? (
        <div className={classes.checkButtonHolder}>
          <button onClick={checkIt} className={classes.checkButton}>
            Check
          </button>
        </div>
      ) : (
        ""
      )}
      {flag ? (
        <div className={classes.resultHolder}>
          <p className={classes.resultText}>You scored {scores}/4 points.</p>
          <button onClick={goHome} className={classes.homeButton}>
            Home
          </button>
          <button onClick={playAgain} className={classes.playAgainButton}>
            Play Again
          </button>
        </div>
      ) : (
        ""
      )}
      <svg
        className={classes.topBlob}
        width="126"
        height="131"
        viewBox="0 0 126 131"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M63.4095 71.3947C35.1213 40.8508 -2.68211 11.7816 1.17274 -29.6933C5.43941 -75.599 39.854 -115.359 82.4191 -133.133C122.797 -149.994 170.035 -140.256 205.822 -115.149C235.947 -94.0141 236.823 -53.8756 246.141 -18.271C256.17 20.0508 282.521 60.8106 260.501 93.7792C237.538 128.159 188.991 133.432 147.931 128.768C112.318 124.723 87.7505 97.6768 63.4095 71.3947Z"
          fill="#FFFAD1"
        />
      </svg>
      <svg
        className={classes.bottomBlob}
        width="65"
        height="62"
        viewBox="0 0 65 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-38.919 2.96445C-10.8241 1.07254 20.4975 -5.87426 40.8434 11.5469C63.3629 30.8293 69.9281 62.0589 61.4141 88.8747C53.3376 114.313 28.2818 132.992 -0.0909882 140.475C-23.9759 146.775 -45.6063 132.093 -68.3914 123.11C-92.9153 113.441 -125.606 110.575 -133.794 87.7612C-142.333 63.9714 -124.677 39.0277 -104.912 21.3621C-87.7687 6.03978 -63.0936 4.59238 -38.919 2.96445Z"
          fill="#DEEBF8"
        />
      </svg>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { category, difficulty } = context.query;
  const preparedData = await quizzFetch(category, difficulty);

  return {
    props: {
      alldata: preparedData,
    },
  };
}
