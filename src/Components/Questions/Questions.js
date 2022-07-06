import { React, useState } from "react";
import classes from "./Questions.module.css";
import API from "../../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../redux/login/loginThunk";
import { Spin, message } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Questions = () => {
  // FETCH DATA

  const [question, setQuestion] = useState("");
  const [userRank, setUserRank] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [UserAns, setUserAns] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading_board, setLoading_board] = useState(false);

  const [testi, setTesti] = useState(false);


  // allloaders
  const [questionLoading, setQuestionLoading] = useState(false);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);

  // over question

  const [questionOver, setQuestionOver] = useState(false);
  const [visitTomorrow, setVisitTomorrow] = useState(false);
  const [accesstime, setAccessTime] = useState(null);

  // const [loading_image, setLoading_image] = useState(false);

  const [image, setImage] = useState({
    all_image: [],
    current_image: "",
    current_image_index: 0,
  });

  const mapped_data = leaderboard.map((d, value) => {
    return (
      <tr>
        <td>{value + 1}</td>
        <td>{d.username}</td>
        <td>{d.question_on - 1}</td>
        <td>
          {new Date(d.last_solved).toLocaleString("en-IN", { timeZone: "IST" })}
        </td>
      </tr>
    );
  });

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const get_question = () => {
    setQuestionLoading(true);
    setQuestionOver(false);
    API.post("/question/get_question", { token })
      .then((res) => {
        setQuestionLoading(false);

        // console.log(res.data);
        if (res.data.question_over) {
          setQuestionOver(true);
          return

        }
        if (res.data.visitTomorrow) {
          setVisitTomorrow(true);
          setAccessTime(res.data.accesstime)
        }
        setLoading(true);
        console.log(image);
        setQuestion(res.data.question);
        setImage({
          all_image: res.data.question.image_url,
          current_image: res.data.question.image_url
            ? res.data.question.image_url[0]
            : "",
          current_image_index: 0,
        });
      })
      .catch((err) => {
        console.log(err);
        setQuestionLoading(false);
      });

  };

  const get_rank = () => {
    API.post("/user/current_user_rank", { ktjID: user.ktjID, token })
      .then((res) => {
        console.log(res);
        setUserRank(res.data.rank);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_leaderboard = () => {
    setLeaderboardLoading(true);
    API.post("/user/leaderboard", { token })
      .then((res) => {
        console.log(res);
        setLeaderboard(res.data);
        setLoading_board(true);
        setLeaderboardLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLeaderboardLoading(false);
      });
  };

  const next_image = () => {
    if (image.current_image_index + 1 < image.all_image.length) {
      setImage({
        ...image,
        current_image: image.all_image[image.current_image_index + 1],
        current_image_index: image.current_image_index + 1,
      });
      // setLoading_image(true);
    } else {
      setImage({
        ...image,
        current_image: image.all_image[0],
        current_image_index: 0,
      });
      // setLoading_image(true);
    }
  };

  const dispatch = useDispatch();
  const SubmitAns = () => {
    // SUBMIT DATA TO BACKEND AND IF ANS TRUE SET NEW QUESTION AND REFRESH RANK
    setAnswerLoading(true);
    API.post("/question/submit_response", { response: UserAns, token })
      .then(async (res) => {
        setAnswerLoading(false);
        console.log(res.data);
        if (res.data.is_correct) {
          console.log("correct answer");
          message.success("Correct answer");


          await dispatch(checkUserAuth());
          get_question();
          get_leaderboard();
          get_rank();

        }
      })
      .catch((err) => {
        message.error("Incorrect answer");
        console.log(err);
        setAnswerLoading(false);

      });

    setUserAns("");
  };
  const timer = () => {
    console.log("change");
    get_leaderboard();
    get_rank();
  };
  useEffect(() => {
    get_question();
    get_leaderboard();
    get_rank();
    let id = setInterval(timer, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => setTesti(false), [image.current_image]);

  return (
    <div className={classes.RulesMain}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={answerLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className={classes.CoverArea}>
        {/* <div className={classes.Logo}>
                    <img height="100%" src="https://github.com/KSHITIJ-2022/media/blob/master/images/ILU-light-new.png?raw=true"></img>
                </div> */}
        <div className={classes.qBorder}>
          <Spin spinning={questionLoading}>

            <div className={classes.qOuter}>
              {visitTomorrow ? <Countdown deadline={accesstime} /> : questionOver ? <p>Questions Over!! Congratulations</p> : (
                <>
                  <div className={classes.header1}>
                    QUESTION {" " + question.question_number}
                  </div>
                  {/* <div className={classes.text}>
                Image{" "}
                {" " +
                  (image.current_image_index + 1) +
                  "/" +
                  image.all_image.length}
              </div> */}
                  {/* <div className={classes.qInner}> */}

                  {/* <div className={classes.Qimg}>
                  <img
                    draggable="false"
                    src={image.current_image}
                    width="100%"
                    alt="question"
                  ></img>

                </div> */}
                  <div className={classes.qInner}>

                    {question.question ? <div 
                    style={{ "margin": "10px auto", "font-size": "20px", "alignText":"justify"
                     }} class={classes.questiondiv}>{question.question}</div> : ''}

                    {(question.image_url ? question.image_url.length > 0 : false) ?
                      <Spin spinning={!testi}>
                        <div className={classes.Qimg}>
                          <img
                            style={testi == false ? { display: "none" } : { display: "block" }}
                            onLoad={() => { setTesti(true); }}
                            draggable="false"
                            src={image.current_image}
                            width="100%"
                            alt="question"
                          ></img>
                        </div>
                      </Spin> : ''}



                    <div className={classes.Ans}>
                      <input
                        type="text"
                        placeholder="Type your answer"
                        value={UserAns}
                        onChange={(e) => setUserAns(e.target.value)}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        width: "100%",
                        padding: "10px",
                      }}
                    >
                      <div className={classes.NextImg} style={(image.all_image.length == 1 || image.all_image.length==0) ? { display: "none" } : {}} onClick={next_image}>
                        NEXT&nbsp;IMAGE
                      </div>
                      <div className={classes.NextImg} onClick={() => SubmitAns()}>
                        SUBMIT
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                      padding: "10px",
                    }}
                  >
                    <div className={classes.text} style={{ padding: 0 }}>

                      {question.hint ? ("HINT: " + question.hint) : " "}
                    </div>
                    <div className={classes.text} style={{ padding: 0 }}>
                      {" "}
                       RANK: {"   " + userRank}
                    </div>
                  </div>

                  {/* </div> */}
                  {/* <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <div className={classes.text} style={{ padding: 0 }}>
                  {" "}
                  HINT: {" " + question.hint}
                </div>
                <div className={classes.text} style={{ padding: 0 }}>
                  {" "}
                  CURRENT RANK: {" " + userRank}
                </div>
              </div> */}
                </>)}


            </div>
          </Spin>
          {/* <Spin spinning={leaderboardLoading}> */}
          <div className={classes.Ranking}>
            <div className={classes.header2}>TOP 10 RELICS</div>
            <table>
              <br />
              <tr className={classes.head}>
                <td className={classes.head}>RANK</td>
                <td className={classes.head}>NAME</td>
                <td className={classes.head}>SOLVED</td>
                <td className={classes.head}>LAST SOLVED</td>
              </tr>
              {mapped_data}

            </table>
          </div>
          {/* </Spin> */}
        </div>
      </div >
    </div >
  );
};

function Countdown({ deadline }) {



  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const getTimeUntil = (deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());

    if (time < 0) {
      setDays(0); setHours(0); setMin(0); setSec(0);
      window.location.reload(false);
    }
    else {
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMin(Math.floor((time / 1000 / 60) % 60));
      setSec(Math.floor((time / 1000) % 60));
    }
  }

  useEffect(() => {
    setInterval(() => getTimeUntil(deadline), 1000);

    return () => getTimeUntil(deadline);
  }, [deadline]);

  return (
    <>
      <div className={classes.header2}>Next question Comes In</div>
      <div className={classes.Container}>
        <div className={classes.countdown}>
          <Count type={"DAYS"} tens={days / 10} units={days % 10} />
          <Count type={"HOURS"} tens={hours / 10} units={hours % 10} />
          <Count type={"MINUTES"} tens={min / 10} units={min % 10} />
          <Count type={"SECONDS"} tens={sec / 10} units={sec % 10} />
        </div>
      </div>
    </>
  );
}

function Count({ units, tens, type }) {

  return (
    <>

      <div className={classes.count}>
        <div className={classes.boxC}>
          <div className={classes.box1}>
            {Math.floor(tens)}
          </div>
          <div className={classes.box2}>
            {units}
          </div>
        </div>
        <div className={classes.days}>
          {type}
        </div>

      </div>
    </>

  )

}

export default Questions;
