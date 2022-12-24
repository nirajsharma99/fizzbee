import { CopyToClipboard } from 'react-copy-to-clipboard';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinkedinIcon from '@material-ui/icons/LinkedIn';
import { useDispatch } from 'react-redux';
import { setNotibar } from '../../store/actions/app-actions';
import {
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    LinkedinShareButton,
} from 'react-share';

function SocialShare(props) {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setNotibar('Copied to Clipboard!', true, 7000));
    };
    return (
        <div className="d-flex flex-row">
            <CopyToClipboard text={props.url}>
                <button
                    className="px-2 mx-2 rounded-lg border-0"
                    onClick={handleClick}
                    style={{
                        background: 'transparent',
                        fontSize: '1.5rem'
                    }}
                >
                    <ion-icon
                        style={{
                            color: 'var(--text-primary)',
                        }}
                        name="link-outline"></ion-icon>
                </button>
            </CopyToClipboard>
            <TwitterShareButton
                url={props.url}
                title={JSON.stringify(props.question)}
                via="opinion poll"
                className="text-decoration-none px-2 mx-2 rounded-lg "
                style={{
                    color: 'var(--text-primary)',
                }}
            >
                <TwitterIcon />
            </TwitterShareButton>

            <WhatsappShareButton
                url={props.url}
                title={JSON.stringify(props.question)}
                className="text-decoration-none px-2 mx-2 rounded-lg "
                style={{
                    color: 'var(--text-primary)',
                }}
            >
                <WhatsAppIcon />
            </WhatsappShareButton>

            <TelegramShareButton
                url={props.url}
                title={JSON.stringify(props.question)}
                className="text-decoration-none px-2 mx-2 rounded-lg "
                style={{
                    color: 'var(--text-primary)',
                }}
            >
                <TelegramIcon />
            </TelegramShareButton>

            <LinkedinShareButton
                url={props.url}
                title={JSON.stringify(props.question)}
                summary="Hey, Join my party :), Suggest the next song! "
                className="text-decoration-none px-2 mx-2 rounded-lg "
                style={{
                    color: 'var(--text-primary)',
                }}
            >
                <LinkedinIcon />
            </LinkedinShareButton>
        </div>
    );
}
export default SocialShare;
