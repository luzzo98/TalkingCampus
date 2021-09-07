import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, useHistory} from "react-router-dom";
import {User} from "../Model";
import * as utils from "../utils/utils"
import {setClass} from "../utils/utils";

interface Props {
    user: User
}

const AsideMenu:React.FC<Props> = ({user}) => {

    function selectProfileMenu(role: String): JSX.Element[] {
        let buttons:JSX.Element[] = [];
        switch (role){
            case "student":
                buttons = renderButton(["Area Personale", "Notifiche", "Aule registrate"]);
                break;
            case "teacher":
                buttons = renderButton(["Area Personale", "Modifica orario di ricevimento", "Gestisci i tuoi corsi"]);
                break;
            case "admin":
                buttons = renderButton(["Aggiungi locale", "Elimina locale", "Modifica locale"]);
                break;
        }
        return buttons;
    }

    function renderButton(textButtons: String[]){
        return textButtons.map(
            el =>
            <button className="corner-button">
                <span>{el}</span>
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
    function closeMenu(){

        const toggle = utils.getElementOnViewById("drawer-toggle-label")
        toggle.click(); toggle.style.visibility = "hidden"
        utils.getScreenWidth() > utils.hdSize ? slideOutScreen() : slideOutPhone()

        setTimeout(() => {
            history.push("/")

        }, 998)
    }

    return (
        <header id="main-nav">
            <input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
            <label htmlFor="drawer-toggle" id="drawer-toggle-label"></label>
            <nav id="drawer">
                <h1 className="mobile-logo">Talking Campus</h1>
                <hr/>
                <div className="card">
                    <h3>Ciao {user.name}!</h3>
                    <img src={user.img} className="avatar-holder"/>
                </div>
                <Router>
                    {selectProfileMenu(user.role)}
                    <button className="corner-button logout-button" onClick={closeMenu}>
                        <span>Logout</span>
                    </button>
                </Router>
            </nav>
        </header>
    );
}

export default AsideMenu;
