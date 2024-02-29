import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';   // location.href
import axios from 'axios';
import './Bbswrite.css'

const Bbswrite = () => {
    let navigate = useNavigate();

    // id, title, content 가져오기
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    

    function bbswrite(id, title, content) {
        axios.get("http://localhost:9900/bbswrite", { params: { id, title, content } })
            .then(function (response) {
                setId(response.data.id);
                setTitle(response.data.title);
                setContent(response.data.content);
                alert('글 작성 성공 ');
                navigate("/bbslist");
            })
            .catch(function (err) {
                alert('error');
            });
    }

    useEffect(()=>{
        //login 확인    session.setAttribute("login", login);
        let str = localStorage.getItem('login');
        if(str !== null && str !== ""){ // login 한 경우
            let login = JSON.parse(str);
            setId(login.id);
        }else{
            alert('login 해 주십시오');
            localStorage.setItem('before', '/bbswrite');
            navigate("/login"); 
        }
    },[navigate]);

    return(
        <div className='center'>
            <table className='table table-bordered'>
            <colgroup>
            <col width='200'/><col width='500'/>
            </colgroup>
                <tbody>
                    <tr>
                       <th>아이디</th>
                       <td>
                        <input type="text" value={id} className='form-control' onChange={(e)=>setId(e.target.value)} readOnly/>
                       </td>
                    </tr>
                    <tr>
                       <th>제목</th>
                       <td>
                        <input type="text" value={title} className='form-control' onChange={(e)=>setTitle(e.target.value)}/>
                       </td>
                    </tr>
                    <tr>
                       <th>내용</th>
                       <td>
                        <textarea rows='15' cols='50' value={content} className='form-control' onChange={(e)=>setContent(e.target.value)}></textarea>
                       </td>
                    </tr>
                </tbody>
            </table>
            <div className='my-5 d-flex justify-content-center'>
            <button className='btn btn-primary' onClick={()=>bbswrite(id, title, content)}>글쓰기</button>
            </div> 
        </div>
    );
}

export default Bbswrite;