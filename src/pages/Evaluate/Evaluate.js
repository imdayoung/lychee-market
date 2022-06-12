import EvaluateModal from "./components/EvaluateModal";
import Header from "../../components/Header";
import { useState } from "react";
import getCookie from "../../components/GetCookie";

const YourId = "dlekdud0102";

export default function Evaluate() {
    const cookie = getCookie("is_login");
    let userid = '';
    
    //로그인 정보
    if(cookie === "true"){
      userid = localStorage.getItem("user_id");
    }

    const [ModalOpen, SetModalOpen] = useState(false);
    const OpenModal = () => {
        SetModalOpen(true);
    }
    const CloseModal = () => {
        SetModalOpen(false);
    }

    return (
        <div>
            <Header />
            <button onClick={OpenModal}>모달!</button>
            <EvaluateModal open={ModalOpen} close={CloseModal} id={userid} yourid={YourId}>

            </EvaluateModal>
        </div>
    )
}