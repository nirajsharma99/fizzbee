import { Switch } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import useSpotify from '../hooks/useSpotify';
import { setNotibar } from '../store/actions/app-actions';
import { useDispatch } from 'react-redux';

function NewPlaylistForm({ setShowModal, setChanges }) {
  const dispatch = useDispatch();
  const spotify = useSpotify();
  const [form, setForm] = useState({ pname: '', desc: '', public: true });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [base64file, setBase64File] = useState(null);
  const fileInputRef = useRef();

  const fileType = ['image/png', 'image/jpeg'];
  const handleFile = (e) => {
    let pic = e.target.files[0];
    if (pic && fileType.includes(pic.type) && pic.size < 263168) {
      setFile(pic);
      getBase64(pic, (result) => {
        setBase64File(result);
      });
    } else {
      setFile(null);
    }
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result.split(',')[1]);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  //console.log(base64file);

  const createPlaylist = () => {
    if (form.pname) {
      // Create a private playlist
      spotify
        .createPlaylist(form.pname, {
          description: form.desc,
          public: form.public,
        })
        .then(
          function (data) {
            console.log('Created playlist!');
            const playlistId = data.body.id;
            if (base64file) {
              // Upload a custom playlist cover image
              spotify
                .uploadCustomPlaylistCoverImage(playlistId, base64file)
                .then(
                  function (data) {
                    console.log('Playlist cover image uploaded!');
                    setShowModal(false);
                  },
                  function (err) {
                    console.log('Something went wrong!', err);
                  }
                );
            } else {
              setShowModal(false);
            }
            dispatch(setNotibar('Playlist created! :)', true));
            setChanges((prev) => ({ changes: !prev.changes }));
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="playlist-form">
      <div className="pl-form-outer">
        <div className="upload-img-div">
          <input ref={fileInputRef} type="file" onChange={handleFile} hidden />
          <button
            className="t-btn w-100"
            onClick={() => fileInputRef.current.click()}
          >
            <AddCircleTwoToneIcon fontSize="large" />
          </button>
          {file && (
            <div>
              <img src={preview} className="uploaded-img" alt="art-pic" />
            </div>
          )}
          {file && (
            <button className="remove-img-btn" onClick={removeImage}>
              <RemoveCircleTwoToneIcon style={{ color: 'var(--main-theme)' }} />
            </button>
          )}
        </div>
        <div>
          <div className="mb-2 d-flex justify-content-between">
            <label className="me-2">Name:</label>
            <input
              type="text"
              placeholder="Playlist Name"
              className="escapeEvent"
              value={form.pname}
              onChange={(e) => setForm({ ...form, pname: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between">
            <label>Description:</label>
            <input
              type="text"
              placeholder="Small description"
              className="escapeEvent"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
          </div>
          <div className="d-flex align-items-center mt-2">
            <label>Public:</label>
            <Switch
              checked={form.public}
              onChange={() => setForm({ ...form, public: !form.public })}
              color="secondary"
              size="small"
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="create-btn" onClick={createPlaylist}>
              CREATE
            </button>
            <button className="cancel-btn" onClick={() => setShowModal(false)}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewPlaylistForm;
