import React, { useEffect, useState, } from 'react';
import '../style/addBoard.css';
import IconButton from '../../../components/IconButton';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function AddBoard() {
  const [uploadFiles, setFiles] = useState([]);
  const [ts, setts] = useState([]);

  useEffect(() => {
    if (uploadFiles) {
      let temp = []
      uploadFiles.forEach(e => temp = [...temp, test(e.name)])
      setts(temp)
    }
  }, [uploadFiles])

  let targetChange = null;
  function uploadFile(e) {
    const target = e.currentTarget.lastChild;
    target.click()
    if (targetChange === null)
      targetChange = target.addEventListener('change', (e) => {
        setFiles(Array.from(e.target.files));
      })
  }

  function test(file) {
    return <div key={file}>{file}</div>
  }

  return (
    <div className="add-board-box">
      <div className="add-file-btn" onClick={e => uploadFile(e)}>
        <IconButton icon={faAdd} />
        <input className="add-file-input" type="file" multiple />
      </div>
      {ts}
      <p className="add-board-file">게시물에 업로드할 파일을 선택하세요.</p>
    </div>
  );
}

export default AddBoard;