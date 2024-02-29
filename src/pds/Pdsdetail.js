import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
function Pdsdetail(){
    let navigate = useNavigate();
    let params = useParams();

    const [pds, setPds] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(function(){
        let str = localStorage.getItem('login');
        if(str!== null && str!== ""){ // login 한 경우
            //let login = JSON.parse(str);
            getPds(params.seq);
        }else{
            alert('login 해 주십시오');
            localStorage.setItem('before', '/pdsdetail/' + params.seq);
            navigate("/login"); 
        }
   }, [params.seq, navigate]);

   async function getPds(seq){
    await axios.get("http://localhost:9900/getPds",{ params:{"seq":seq} })
    .then(function(resp){
        console.log(resp.data);
        setPds(resp.data);
        setLoading(true);
    })
    .catch(function(err){
        alert('error');
    })
   }

   const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:9900/filedownload?seq=${params.seq}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pds.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
    }
  };

   if(loading === false){
    return <div>loading...</div>;
}

    return(
        <div class="center">

        <table class="table table-bordered">
        <col width="200"/><col width="600"/>
        <tr>
            <th>id</th>
            <td>{pds.id}</td>
        </tr>
        <tr>
            <th>조회수</th>
            <td>{pds.readcount}</td>
        </tr>
        <tr>
            <th>다운로드수</th>
            <td>{pds.downcount}</td>
        </tr>
        <tr>
            <th>파일</th>
            <td>		
                <span>{pds.filename}</span>&nbsp;&nbsp;
                <button onClick={handleDownload}>다운로드</button>
            </td>
        </tr>
        <tr>
            <th>제목</th>
            <td>{pds.title}</td>
        </tr>
        <tr>
            <td colspan="2">
                <textarea rows="10" cols="50" value={pds.content} class="form-control"></textarea>
            </td>
        </tr>
        </table>
        </div>
    )
}
export default Pdsdetail;