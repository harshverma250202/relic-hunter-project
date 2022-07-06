const Question = require("../models/relic_question.model");

exports.get_question = async (req, res) => {
  try {
    const num=await Question.countDocuments();
    if(num<req.user.question_on){
     return res.status(200).json({message:"no more questions",question_over:true});
    }
    let question = await Question.findOne({
      question_number: req.user.question_on,
    });
    if(question.accesstime > new Date()) {
      return res.status(200).json({visitTomorrow:true,accesstime:question.accesstime})
    }
    // question={...question,answer:"think yourself"};
    question.answer="think yourself";
    // console.log(question,'asf')
    // console.log(question);
    return res.status(200).json({question,question_over:false});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.submit_response = async (req, res) => {
  try {
    let user = req.user;
    let question = await Question.findOne({
      question_number: user.question_on,
    });
    let answer = question.answer.map(x=>x.toLowerCase());
    let response = req.body.response.toLowerCase();
    // console.log(answer,response,"asfasdf");
    // console.log(question, answer, response);
    if (answer.includes( response)) {
      // user.score += question.points;
      user.question_on++;
      user.last_solved = Date.now();
      await user.save();
      res.status(200).json({ message: "correct answer"
      ,
      is_correct:true
    });
    } else {
      //   user.question++;
      //   await user.save();
      res.status(404).json({ message: "wrong answer try again",is_correct:false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.create_question = async (req, res) => {
  try {
    console.log(req.body);
    if (  req.body.answer) {
      const num=await Question.countDocuments();
      const question = new Question({
        question_number: num+1,
        answer: req.body.answer,
        hint: req.body.hint,
        image_url: req.body.image_url,
        points: req.body.points,
      });
      await question.save();
      res.status(200).json(question);
    } else {
      res
        .status(400)
        .json({ message: "please provide all the required fields" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.update_question = async (req, res) => {
try{
  const {question_number,question,answer,hint,image_url,points}=req.body;
  const question_update=await Question.findOne({question_number:question_number});
  question_update.answer=[...answer,answer.map(x=>x)];
  question_update.image_url=[...image_url,image_url.map(x=>x)];
  question_update.hint=hint;
  question_update.points=points;
  await question_update.save();
  res.status(200).json({message:"question updated",question:question_update});


}
catch (err) {
  res.status(500).json({ message: err.message });
}


}

