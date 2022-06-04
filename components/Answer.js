import classes from "./Answer.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addtext } from "../reducers/answerExecuter";

export default function Answer(props) {
  const selectedAnswer = useSelector((state) => state.counterReducer[props.id]);
  const flag = props.flag;
  const ID = props.id;
  const dispatch = useDispatch();
  let styles = {};

  //html encoded text to normal string, html decoder
  function decode(str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
      return String.fromCharCode(dec);
    });
  }

  if (flag && props.answer === selectedAnswer && props.answer === ID) {
    styles = { backgroundColor: "lime", border: "none" };
  } else if (flag && props.answer === selectedAnswer && props.answer !== ID) {
    styles = { backgroundColor: "tomato", border: "none" };
  } else if (flag && props.answer === ID) {
    styles = { backgroundColor: "yellow", border: "none" };
  } else {
    styles = {
      backgroundColor: props.hold ? "#D6DBF5" : "white",
      border: props.hold ? "none" : "1px solid black",
    };
  }

  function clickedAnswer(e) {
    if (!flag) {
      props.setHold((prev) =>
        prev.map((item) => {
          if (decode(item.answer) === e.target.innerHTML) {
            item.hold = true;
            return item;
          } else {
            item.hold = false;
            return item;
          }
        })
      );

      const action = {
        value: e.target.innerHTML,
        id: ID,
      };

      dispatch(addtext(action));
    }
  }
  return (
    <span
      className={classes.answer}
      style={styles}
      onClick={clickedAnswer}
      dangerouslySetInnerHTML={{ __html: props.answer }}
    />
  );
}
