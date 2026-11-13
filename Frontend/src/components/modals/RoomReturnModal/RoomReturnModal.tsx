import { useState } from "react";
import styles from "./RoomReturnModal.module.scss"
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useWebSocket } from "@websocket";
import { playbackService, usePlaybackData } from "@playback";

/**
 * RoomReturnModal is component that helps to return to room that was before 
 * user left application
 */
const RoomReturnModal = () => {

    const { client } = useWebSocket();
    const playbackData = usePlaybackData();
 
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(true)

    /**
     * void that tries to join room
     */
    const continueListening = async () => {
        
        if (!client) return;

        navigate("/app/room");
        setOpen(false)
        
        client.publish({
            destination: "/app/playback.reconnect",
            body: ""
        });
    }

    /**
     * void that tries leave room
     */
    const leaveRoom = async () => {
        try {
            await playbackService.unsubscribe();
        } finally {
            
        }
    }

    return isOpen && (
        <Modal
            isOpen={true} 
            onClose={() => setOpen(false)}
            title={`You have left room ${playbackData.room?.title}`}
        >
            <div className={styles.body}>
                <button className={styles.btn} onClick={leaveRoom}>Cancel</button>
                <button className={styles.btn} onClick={continueListening}>Continue listening</button>
            </div>
        </Modal>
    )
}

export default RoomReturnModal;