import '../../styling/slider.css';
import { useEffect } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
    getAlbum,
    handlePlayPause,
    playfromlist,
} from '../../store/actions/spotify-actions';
import { setCurrentTileId } from '../../store/actions/player-actions';
import { useDispatch, useSelector } from 'react-redux';
import { MediumPlayButton } from '../../player/buttons';
import { getCorrectPath } from '../../utils/helperFunctions';
// Import Swiper React components
import SwiperCore, { Navigation, Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import useCheckDevice from '../../utils/checkDevice';

SwiperCore.use([Navigation, Autoplay, EffectCoverflow]);

function NewReleasesSlider2({ newReleases }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const playing = useSelector((state) => state.player.playing);
    const currentTileId = useSelector((state) => state.player.currentTileId);
    const { path } = useRouteMatch();
    const getPath = getCorrectPath(path);
    const { isMobile } = useCheckDevice();

    useEffect(() => {
        const nextButton = document.querySelector('.swiper-button-next');
        const prevButton = document.querySelector('.swiper-button-prev');

        nextButton.addEventListener('click', getColor);
        prevButton.addEventListener('click', getColor);

        return () => {
            nextButton.removeEventListener('click', getColor);
            prevButton.removeEventListener('click', getColor);
        }
    }, [])

    const getColor = () => {
        const colorThief = new ColorThief();
        const img = document.querySelector('.swiper-slide-active .slider2-img');
        var color;
        if (img.complete) {
            color = colorThief.getColor(img);
            if (document.querySelector('.swiper-slide-active')) {
                document.querySelector('.swiper-slide-active').style.background = `rgba(${color?.[0]},${color?.[1]},${color?.[2]},1)`;
            }
            if (document.querySelector('.swiper-slide-next')) {
                document.querySelector('.swiper-slide-next').style.background = ``;
            }
            if (document.querySelector('.swiper-slide-prev')) {
                document.querySelector('.swiper-slide-prev').style.background = ``;
            }
        } else {
            img.addEventListener('load', function () {
                color = colorThief.getColor(img);
            });
        }
    };
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

    return (
        <div className='tile-container-2'>
            <Swiper
                effect='coverflow'
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 0,
                    stretch: isMobile ? 130 : 300,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                navigation
                onTouchEnd={getColor}

            >
                {newReleases?.map((item, ind) => (
                    <SwiperSlide
                        key={ind}
                        onClick={() => history.push({ pathname: `${getPath}/album/${item.id}` })}
                    >
                        <img className='slider2-img'
                            crossOrigin="anonymous"
                            src={item.images[0]?.url}
                            alt={item?.name}
                            onLoad={getColor}
                        />
                        <div className="tiled-left">
                            <MediumPlayButton
                                playing={playing}
                                isCurrent={item?.id === currentTileId}
                                onClick={() => handlePlayTile(item?.id)}
                            />
                            <div className="al-info">
                                <span className="al">{item?.type}</span>
                                <span className="aln">{item?.name}</span>
                            </div>
                        </div>
                        <div className="tiled-right">
                            <span className="ar">
                                {item?.artists?.[0]?.type}
                            </span>
                            {item?.artists?.map((x, index) => (
                                <span key={index} className="arn">
                                    {x.name}
                                </span>
                            ))}
                        </div>
                    </SwiperSlide>))}
            </Swiper>

        </div >
    );
}
export default NewReleasesSlider2;
