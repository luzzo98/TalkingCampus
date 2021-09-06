import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import InitialForm from "./InitialForm";

interface Props {
    id: number;
    name: string;
    img: string;
    role: string;
}

const AsideMenu:React.FC<Props> = ({id, role, img, name}) => {

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

    return (
        <header id="main-nav">
            <input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
            <label htmlFor="drawer-toggle" id="drawer-toggle-label"></label>
            <nav id="drawer">
                <h1 className="mobile-logo">Talking Campus</h1>
                <hr/>
                <div className="card">
                    <h3>Ciao {name}!</h3>
                    <img src={img} className="avatar-holder"/>
                </div>
                <Router>
                    {selectProfileMenu(role)}
                    <button className="corner-button logout-button">
                        <span>Logout</span>
                    </button>
                </Router>
            </nav>
        </header>
    );
}

export default AsideMenu;
