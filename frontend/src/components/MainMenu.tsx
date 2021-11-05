import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {useHistory} from "react-router-dom";
import {Tooltip} from "antd";
import {useMediaQuery} from "react-responsive";
import {MainpageContents} from "../Model";
import * as utils from "../utils/utils"
import '../styles/main_page/mainPageStyle.scss'
import getUser from "../services/UserLocalInfoGetter";


interface menuProps {
    visibilityFromMap: boolean
    toggleVisibility: boolean
    onChangeMode: (mode: string) => void
    onClosure: () => void
}

const io = require("socket.io-client");
const socket = io(`${utils.BASE_URL}${utils.SOCKET_IO_PORT}`);

const MainMenu : React.FC<menuProps> = (props: menuProps) => {

    const isTabletOrMobile: boolean = useMediaQuery({ query: '(max-width: 1024px)' })
    const [toggleIsOn, setToggleOnOff] = useState(() => {
        setTimeout(() => { setToggleOnOff(true) }, 0);
        return false
    })
    const [isOpenTooltip, setIsOpenTooltip] = useState(() => {
        setTimeout(() => { setIsOpenTooltip(!toggleIsOn) }, 100);
        return false
    })
    const [isClosing, setIsClosing] = useState(false)
    const [nNotification, setNNotification] = useState<number>(0)

    useEffect(() => socket.on("New notification: christian.derrico@studio.unibo.it",
        () => {
            setNNotification(prevState => prevState+1)
        }), [])

    const buttons: JSX.Element[] = createButtons()

    function createButtons(): JSX.Element[] {
        return utils.getElements(getUser().role).map(
            el =>
                <button className="corner-button"
                        onClick={() => getUser().role !== 'admin' ? closeMenu(el[1]) : adminAction(el[0])}>
                    <span>{el[0]}</span>
                    {el[0] === "Notifiche" && nNotification > 0 ? <span className={"badge"}>{nNotification}</span> : null}
                </button>
        )
    }

    function adminAction(action: string) {
        const command: string = action.split(" ")[0].toLowerCase();
        switch (command) {
            case "aggiungi":
                props.onChangeMode("aggiungi")
                break;
            case "elimina":
                props.onChangeMode("elimina")
                break;
            case "modifica":
                props.onChangeMode("modifica")
                break;
        }
    }

    const history = useHistory()

    function closeMenu(path: string) {
        setToggleOnOff(false)
        setIsOpenTooltip(false)
        setIsClosing(true)
        props.onClosure()
        setTimeout(() => {
            history.push(path)
        }, 900)
    }

    return (
        <header id="main-nav" className={"slide-left"}>
            <input type="checkbox" id="drawer-toggle" name="drawer-toggle"/>
            <CSSTransition in={toggleIsOn} timeout={500} classNames="toggle-slide" mountOnEnter>
                <label htmlFor="drawer-toggle"
                       className={"drawer-toggle-label " + (props.toggleVisibility ? "" : "hidden-label")}
                       onClick={() => !isTabletOrMobile ? setToggleOnOff(prev => !prev) : null}/>
            </CSSTransition>
            <CSSTransition in = {toggleIsOn}
                           timeout ={500}
                           classNames = {isTabletOrMobile ? (isClosing ? "slide-closing" : "slide-vertical") : "drawer-slide"}
                           unmountOnExit={!isTabletOrMobile}>
                <nav className="drawer">
                    <Tooltip color={"#F6E9D8"}
                             title={"clicca qui per visualizzare il menù"}
                             placement={"bottom"}
                             afterVisibleChange={() => !toggleIsOn ?
                                 setTimeout(() => setIsOpenTooltip(false), 1000) : setIsOpenTooltip(true)}
                             visible={!toggleIsOn && isTabletOrMobile && isOpenTooltip}>
                        <h1 className="mobile-logo"
                            onClick={() => isTabletOrMobile ? setToggleOnOff(prev => !prev) : null}>Talking Campus</h1>
                    </Tooltip>
                    <div className="card">
                        <h3>Ciao {getUser().name}!</h3>
                        <img src={getUser().image} className="avatar-holder"/>
                    </div>
                    {buttons}
                    <button className="corner-button logout-button" onClick={() => closeMenu("/")}>
                        <span>Logout</span>
                    </button>
                </nav>
            </CSSTransition>
        </header>)

}

export default MainMenu
