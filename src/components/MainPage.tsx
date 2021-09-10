import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapBox from "./MapBox";
import AsideMenu from "./AsideMenu";
import {MainpageContents} from "../Model";
import {useLocation} from "react-router-dom"

const MainPage:React.FC<MainpageContents> = () => {

    let data = useLocation();
    const mainContents:MainpageContents = data.state as MainpageContents

    return (
        <div className={"main-container"}>
            <AsideMenu hooks={mainContents.hooks} user={mainContents.user} />
            <main className={"main"}>
                <MapBox />
            </main>
        </div>
    );
}

export default MainPage;
