import React from 'react'
import classes from './Rules.module.css'

const rules = ()=> {

    return (
      <div className={classes.RulesMain}>
        <div className={classes.CoverArea}>
          {/* <div className={classes.Logo}>
                    <img height = "100%" src="https://github.com/KSHITIJ-2022/media/blob/master/images/ILU-light-new.png?raw=true"></img>
                </div> */}

          <div className={classes.Rheader}>
            <div className={classes.header1}>ABOUT</div>
            <div className={classes.header2}>
              Kshitij 2022 presents to you, Relic Hunter
            </div>
          </div>

          <div className={classes.gap}>
            <div className={classes.bino}>
              <img
                draggable="false"
                src="https://github.com/KSHITIJ-2022/media/blob/master/RelicHunter/Binoculors2.png?raw=true"
                alt=""
              />
            </div>
            <div className={classes.Rcard}>
              <div className={classes.header3}>RULES</div>
              <div className={classes.text}>
                1. There are 25 questions to put up in this event
                <br />
                2. Hints and background image will be provided based on the
                question, utilize them wisely.
                <br />
                3. If answer contains two names, separate them with 'and'.
                <br />
                4. Answers are not case sensitive.
                <br />
                5. You can't jump into the next question unless and until you
                crack the preceding one.
                <br />
                6. A leaderboard will be put up parallelly, in which results
                will be updated automatically.
                <br />
                7. Registrations on ktj.in is compulsary. Otherwise one can't
                participate in the event.
                <br />
                8. Note down your KTJ ID for future reference, in case of any
                discrepency contact us immediately.
              </div>
            </div>
            <div className={classes.cash}>
              <img
                src="https://github.com/KSHITIJ-2022/media/blob/master/RelicHunter/Coins2.png?raw=true"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default rules
