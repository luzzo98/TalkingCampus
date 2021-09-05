import React, {useState} from 'react';
import InitialForm from "./components/InitialForm";
import './styles/App.css';
import MainPage from "./components/MainPage";

const pages = {
    START: 'registration-form',
    HOME: 'home'
}

const App:React.FC = () => {

    const [page, setPage] = useState(pages.START)

    const setMainPage = async(username: string, password: string) => {
        setPage(pages.HOME)
        //todo: change with JWT
        console.log("Username: " + username + " Password: " + password)
    }

    const renderPage = () => {
        switch (page) {
            case pages.START:
                return <InitialForm onAccessGranted={setMainPage}></InitialForm>
            case pages.HOME:
                return <MainPage/>
        }
    }

    return (
        <div className={"App"}>
            <div className={"BackgroundImg"}>
            </div>
            {renderPage()}
        </div>
    );
}

export default App;
