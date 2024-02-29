import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Pdswrite() {
  let navigate = useNavigate();
  const [file, setFile] = useState(null);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const pdswrite = () => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('content', content);

    // 추가적으로 파일이 선택되었을 때만 파일 데이터를 추가
    if (file) {
      formData.append('uploadfile', file);
    }

    axios
      .post('http://localhost:9900/pdsupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        setId(response.data.id);
        setTitle(response.data.title);
        setContent(response.data.content);
        alert('업로드 성공');
        navigate('/pdslist');
      })
      .catch(function (err) {
        alert('error');
      });
  };

  useEffect(() => {
    let str = localStorage.getItem('login');
    if (str !== null && str !== '') {
      let login = JSON.parse(str);
      setId(login.id);
    } else {
      alert('login 해 주십시오');
      localStorage.setItem('before', '/pdswrite');
      navigate('/login');
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div align="center">
      <table className="table table-bordered">
        <tr>
          <th>아이디</th>
          <td>
            <input value={id} onChange={(e) => setId(e.target.value)} className="form-control" readOnly />
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} />
          </td>
        </tr>
        <tr>
          <th>파일업로드</th>
          <td>
            <input type="file" onChange={handleFileChange} />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea rows="15" cols="50" value={content} className="form-control" onChange={(e) => setContent(e.target.value)}></textarea>
          </td>
        </tr>
      </table>
      <button onClick={pdswrite}>업로드</button>
    </div>
  );
}

export default Pdswrite;