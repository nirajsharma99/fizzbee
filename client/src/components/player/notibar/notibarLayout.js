import { useSelector } from "react-redux";
import Notibar1 from "./notibar1";
import Notibar2 from "./notibar2";

function NotibarLayout() {
    const { notibarType } = useSelector((state) => state.app);
    const returnNotibar = () => {
        switch (notibarType) {
            case 0:
                return <Notibar1 />;
            case 1:
                return <Notibar2 />;
            default:
                console.log("Error Notibar Type");
                break;
        }
    }
    return <>{returnNotibar()}</>
}
export default NotibarLayout;