import '../styles/mainPageStyle/mainPageStyle.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapBox from "./MapBox";
import AsideMenu from "./AsideMenu";
import {MainpageContents} from "../Model";
import {useLocation} from "react-router-dom"
import {useState} from "react";

const MainPage:React.FC<MainpageContents> = () => {

    let data = useLocation();
    const mainContents:MainpageContents = data.state as MainpageContents
    const [contents, setContents] = useState(mainContents)

    console.log(contents)

    return (
        <div className={"main-container"}>
            <AsideMenu hooks={contents.hooks} user={contents.user} />
            <main className={"main"}>
                <MapBox />
            </main>
        </div>
    );
}

export default MainPage;
