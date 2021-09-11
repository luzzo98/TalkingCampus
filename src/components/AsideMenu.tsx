import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Link, useHistory} from "react-router-dom";
import {MainpageContents, User} from "../Model";
import * as utils from "../utils/utils"

const AsideMenu:React.FC<MainpageContents> = ({user, hooks}) => {

    const buttons: JSX.Element[] = createButtons()

    function createButtons():JSX.Element[]{
        return hooks.map(
            el =>
                <button className="corner-button" onClick={() => closeMenu(el[1])}>
                    <span>{el[0]}</span>
                </button>
        )
    }

    function slideOutScreen() {
        utils.setClass("main-container", "slide-out-transition-class")
    }

    function slideOutPhone() {
        utils.setClass("main", "slide-trans-class");
        utils.setClass("#drawer", "slide-out-transition-class")
        utils.setClass("#main-nav", "slide-out-transition-class")
    }

    let history = useHistory();
    function closeMenu(path: string){

        const toggle = utils.getElementOnViewById("drawer-toggle-label")
        toggle.click(); toggle.style.visibility = "hidden"
        utils.getScreenWidth() > utils.hdSize ? slideOutScreen() : slideOutPhone()
        setTimeout(() => {
            history.push(path)
        }, 900)
    }

    return (
        <header id="main-nav">
            <input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
            <label htmlFor="drawer-toggle" id="drawer-toggle-label"/>
            <nav id="drawer">
                <h1 className="mobile-logo">Talking Campus</h1>
                <hr/>
                <div className="card">
                    <h3>Ciao {user.name}!</h3>
                    <img src={user.img} className="avatar-holder"/>
                </div>
                {buttons}
                <button className="corner-button logout-button" onClick={() => closeMenu("/")}>
                    <span>Logout</span>
                </button>
            </nav>
        </header>
    );
}

export default AsideMenu;
