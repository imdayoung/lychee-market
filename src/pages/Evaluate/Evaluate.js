import EvaluateModal from "./components/EvaluateModal";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Id = "mouse0429";
const YourId = "dlekdud0102";

export default function Evaluate(props) {
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
            <EvaluateModal open={ModalOpen} close={CloseModal} id={Id} yourid={YourId}>

            </EvaluateModal>
        </div>
    )
}