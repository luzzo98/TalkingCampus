import {Form, FormInstance, Modal} from "antd";
import React, {useEffect, useRef} from "react";
import DaySelectorPopup from "./DaySelectorPopup";

interface ModalFormProps {
    formName: string
    visible: boolean
    onCancel: () => void
    // onOk?: () => void

}

const useResetFormOnCloseModal = ({visible}: { form: FormInstance; visible: boolean }) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
};

const DaySelectorModalForm: React.FC<ModalFormProps> = ({formName, visible, onCancel}) => {
    const [popupForm] = Form.useForm();

    const onOk = () => {
        console.log(popupForm.getFieldsValue())
        popupForm.submit();
        if (formName !== "reception") onCancel()
    }

    useResetFormOnCloseModal({
        form: popupForm,
        visible,
    });

    return (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
            <DaySelectorPopup formName={formName} form={popupForm}/>
        </Modal>
    );
}

export default DaySelectorModalForm;