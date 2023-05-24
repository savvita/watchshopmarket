import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";





const ResetPasswordResult = () => {
    const params = useParams();

    const [msg, setMsg] = useState("");

    useEffect(() => {
        if(params.result === 'success') {
            setMsg("Пароль скинуто");
        } else if(params.result === 'confirm') {
            setMsg("Для скидання паролю перейдіть за посиланням, яке було надіслано вам на пошту");
        }
        else {
            setMsg("Не вдалося скинути пароль");
        }
    }, [params]);

    return (
        <div className="text-white mt-4 text-center">
            <p>{ msg }</p>
            { params.result === 'success' && <Link to="/signIn">Увійти</Link> }
        </div>
    );
}

export default ResetPasswordResult;