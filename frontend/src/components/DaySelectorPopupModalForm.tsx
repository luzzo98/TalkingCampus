import {Form, FormInstance, Modal} from "antd";
import React, {useEffect, useRef} from "react";
import DaySelectorPopup from "./DaySelectorPopup";

interface ModalFormProps {
    formName: string
    visible: boolean
    onCancel: () => void
    value: any
    setValue: any
}

const useResetFormOnCloseModal = ({visible}: { form: FormInstance; visible: boolean }) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
};

const DaySelectorModalForm: React.FC<ModalFormProps> = ({formName, visible, onCancel, value, setValue}) => {
    const [popupForm] = Form.useForm();

    const onOk = () => {
        popupForm.submit();
    }

    useResetFormOnCloseModal({
        form: popupForm,
        visible,
    });

    return (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
            <DaySelectorPopup value={value}
                              setValue={setValue}
                              formName={formName}
                              form={popupForm}/>
        </Modal>
    );
}

export default DaySelectorModalForm;