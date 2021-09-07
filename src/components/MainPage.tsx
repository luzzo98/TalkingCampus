import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapBox from "./MapBox";
import img from '../assets/volto_uomo.jpg'
import AsideMenu from "./AsideMenù";

const MainPage:React.FC = () => {
    return (
        <div className={"main-container"}>
            <AsideMenu user={{id: 0, name: "Giovanni", img: img, role: "student"}}/>
            <main className={"main"}>
                <MapBox />
            </main>
        </div>
    );
}

export default MainPage;
