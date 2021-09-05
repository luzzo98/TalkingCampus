import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapBox from "./MapBox";
import img from '../assets/volto_uomo.jpg'
import AsideMenu from "./AsideMenù";

const MainPage:React.FC = () => {
    return (
        <body>
            <AsideMenu id={0} name={"Giovanni"} img={img} role={"student"}/>
            <main>
                <MapBox />
            </main>
        </body>
    );
}

export default MainPage;
