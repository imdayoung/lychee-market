import EvaluateModal from "./components/EvaluateModal";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import getCookie from "../../components/GetCookie";

const YourId = "dlekdud0102";

export default function Evaluate(props) {
    const cookie = getCookie("is_login");
    var IsManager = false;
    var IsLogin = false;
    let userid = '';
    
    //로그인 정보
    if(cookie === "true"){
      userid = localStorage.getItem("user_id");
      if(userid !== null)
        IsLogin = true;
      else{
        const managerid = localStorage.getItem("manager_id");
        if(managerid !== null){
          IsManager = true;
          IsLogin = true;
        }
      }
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