import classes from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function StartPage(props) {
  const router = useRouter()
  
  const categories = props.alldata.map(item => {
    return <option key={item.id} value={item.id}>{item.name}</option>
  })

  function catAndDiffSelect() {
    var selectCat = document.getElementById('catLists');
    var selectDiff = document.getElementById('diffLists');
    var valueCat = selectCat.options[selectCat.selectedIndex].value;
    var valueDiff = selectDiff.options[selectDiff.selectedIndex].value;
    router.push({
      pathname: '/main',
     query: { category: valueCat, difficulty: valueDiff},
  }) 
  }

  return (
    <div className={classes.home}>
      <h1 className={classes.header}>Quizzical</h1>
      <h3 className={classes.description}>A Fun Quizz App Using Open Trivia API</h3>
      
      <div className={classes.catSelectHolder}>
      <label htmlFor='categories' className={classes.label}>Select categories:</label>
      <select name='categories' id="catLists" className={classes.catSelect} >
        {categories}
      </select>
      </div>

      <div className={classes.diffSelectHolder}>
      <label htmlFor="difficulty" className={classes.label}>Select difficulty:</label>
      <select name="difficulty" id="diffLists" className={classes.diffSelect}>
        <option value='easy'>easy</option>
        <option value='medium'>medium</option>
        <option value='hard'>hard</option>
      </select>
      </div>

      <svg className={classes.topBlob} width="158" height="141" viewBox="0 0 158 141" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M63.4095 81.3947C35.1213 50.8507 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.539 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z" fill="#FFFAD1"/>
</svg>

      <svg className={classes.bottomBlob} width="148" height="118" viewBox="0 0 148 118" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
</svg>


      <button onClick={catAndDiffSelect} className={classes.play}>Play</button>
    </div>
  );
}

export async function getStaticProps() {
  const fetcheddata = await fetch(
    "https://opentdb.com/api_category.php"
  );
  const rawdata = await fetcheddata.json();
  return {
    props: {
      alldata: rawdata.trivia_categories
    }
  }
}
