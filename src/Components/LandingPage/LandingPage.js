import React, { useState } from 'react'
import classes from './LandingPage.module.css'
import { Spin } from "antd";
import {Link} from "react-router-dom"

const LandingPage = () => {
    const [test, setTest] = useState(false);
    const [test1, setTest1] = useState(false);
    return <div className={classes.CoverArea}>
        {/* <div className={classes.Logo}>
                <img height="100%" src="https://github.com/KSHITIJ-2022/media/blob/master/images/ILU-light-new.png?raw=true"></img>
            </div> */}
        <Spin spinning={(!test && !test1)} className={classes.pos} style={{ height: "100vh" }}>
            <Link to="/questions" className={classes.man}>
                <img onLoad={() => { setTest(true); }} draggable="false" src="https://github.com/KSHITIJ-2022/media/blob/master/RelicHunter/11.png?raw=true" alt="" />
            </Link>
            <div className={classes.slot}>
                <Link to="/questions" className={classes.text}>Relic Hunter</Link>
                <div className={classes.textimg}>
                    <Link to="/questions" className={classes.texti}>
                        <img onLoad={() => { setTest1(true); }} src='https://github.com/KSHITIJ-2022/media/blob/master/RelicHunter/007.png?raw=true'></img>
                    </Link>
                </div>
                <div className={classes.lowInp}>
                    <button><Link className={classes.lin} to="/questions">Enter</Link></button>
                </div>
            </div>
        </Spin>
    </div>;
}

export default LandingPage;