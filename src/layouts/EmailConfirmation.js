import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const EmailConfirmation = () => {
    const params = useParams();

    const [msg, setMsg] = useState("");

    useEffect(() => {
        if(!params.result) {
            setMsg("На електронну пошту було відправлено листа для підтвердження електронної пошти");
        } else if (params.result === "success") {
            setMsg("Електронну пошту підтверждено");
        } else {
            setMsg("Не вдалося підтвердити електронну пошту");
        }
    }, [params]);

    return (
        <div className="text-white text-center mt-4">
            <p>{ msg }</p>
        </div>
    );
}
export default EmailConfirmation;