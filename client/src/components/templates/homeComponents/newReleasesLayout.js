import { useSelector } from "react-redux";
import NewReleasesSlider from "./newReleasesSlider";
import NewReleasesSlider2 from "./newReleasesSlider2";
import '../../styling/slider.css';
import '../../styling/homeComponents/newreleases.css';


function NewReleases({ newReleases }) {
    const { sliderType } = useSelector((state) => state.app.homeSlider);
    const returnSlider = () => {
        switch (sliderType) {
            case 0:
                return (<NewReleasesSlider newReleases={newReleases} />);
            case 1:
                return (<NewReleasesSlider2 newReleases={newReleases} />);
            default:
                console.log("Error NewReleases Type");
                break;
        }
    }

    return (
        <div>
            {newReleases && returnSlider()}
        </div>
    )

};

export default NewReleases;