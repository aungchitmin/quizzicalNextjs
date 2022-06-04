import classes from "./Quizz.module.css";
import Answer from "./Answer";
import { useState } from "react";

export default function Quizz(props) {
  const ID = props.id;
  const answersWithHolds = props.data.randomedanswersObject.map((item) => {
    return {
      key: item.item,
      answer: item.item,
      hold: item.hold,
    };
  });

  const [hold, setHold] = useState(answersWithHolds);
  const flag = props.flag;

  const answerlist = hold.map((item) => (
    <Answer
      key={item.key}
      answer={item.answer}
      id={ID}
      flag={flag}
      hold={item.hold}
      setHold={setHold}
    />
  ));

  return (
    <div>
      <h2
        className={classes.question}
        dangerouslySetInnerHTML={{ __html: props.data.question }}
      />
      <div className={classes.answerHolder}>{answerlist}</div>
      <hr className={classes.hr}/>
    </div>
  );
}
