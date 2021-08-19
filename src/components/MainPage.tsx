import '../styles/mainPageStyle/MainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapBox from "./MapBox";
import img from '../assets/volto_uomo.jpg'

const MainPage:React.FC = () => {

    return (
        <body>
            <header id="main-nav">
                <input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
                <label htmlFor="drawer-toggle" id="drawer-toggle-label"></label>
                <nav id="drawer">
                        <h1 className="mobile-logo">Talking Campus</h1>
                        <hr></hr>
                        <div className="card">
                            <h3>Ciao Giovanni!</h3>
                            <img src={img} className="avatar-holder"></img>
                        </div>
                        <button className="corner-button">
                            <span>Area personale</span>
                        </button>
                        <button className="corner-button">
                            <span>Notifiche</span>
                        </button>
                        <button className="corner-button">
                            <span>Aule registrate</span>
                        </button>
                        <button className="corner-button logout-button">
                            <span>Logout</span>
                        </button>
                </nav>
            </header>
            <main>
                <MapBox />
            </main>
        </body>
    );
}

export default MainPage;
