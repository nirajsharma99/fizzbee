import '../../styling/slider.css';
import { useState } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
    getAlbum,
    handlePlayPause,
    playfromlist,
} from '../../store/actions/spotify-actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCorrectPath } from '../../utils/helperFunctions';
// Import Swiper React components
import SwiperCore, { Navigation, Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import { MediumPlayButton } from '../../player/buttons';
import { setCurrentTileId } from '../../store/actions/player-actions';

SwiperCore.use([Navigation, Autoplay, EffectCoverflow]);

function NewReleasesSlider({ newReleases }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const playing = useSelector((state) => state.player.playing);
    const currentTileId = useSelector((state) => state.player.currentTileId);
    const { autoPlay, autoPlayDelay } = useSelector((state) => state.app.homeSlider);
    const { path } = useRouteMatch();
    const getPath = getCorrectPath(path);
    //console.log(newReleases)
    const handlePlayTile = (id) => {
        if (playing && id === currentTileId) {
            dispatch(handlePlayPause());
        } else {
            getAlbum(id).then(
                function (data) {
                    dispatch(setCurrentTileId(id));
                    dispatch(playfromlist(0, data.body.tracks.items));
                },
                function (err) {
                    console.error(err);
                }
            );
        }
    };

    const ReturnSlider = ({ children }) => {
        if (autoPlay)
            return (<Swiper
                effect='coverflow'
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                autoplay={{
                    delay: autoPlayDelay * 1000,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                navigation
            >{children}</Swiper>);
        else
            return (<Swiper
                effect='coverflow'
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                navigation
            >{children}</Swiper>);
    }


    return (
        <div className='tile-container'>
            <ReturnSlider>
                {newReleases?.map((item, ind) => (
                    <SwiperSlide
                        key={ind}
                        style={{ backgroundImage: `url(${item.images[0]?.url})` }}
                        onClick={() => history.push({ pathname: `${getPath}/album/${item.id}` })}
                    >
                        <div className="tiled-left">
                            <MediumPlayButton
                                playing={playing}
                                isCurrent={item?.id === currentTileId}
                                onClick={() => handlePlayTile(item?.id)}
                            />
                        </div>
                    </SwiperSlide>))}
            </ReturnSlider>

        </div >
    );
}
export default NewReleasesSlider;
