import {useEffect,useState} from'react';
import {useCookies} from 'react-cookie'; // npm i react-cookie 모듈설치
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
    let navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const [cookies,setCookies] = useCookies('');    // 쿠키저장
    const [saveId, setSaveId] = useState(false);    // checkbox

    useEffect(function(){
        // 쿠키에서 id를 산출
        let user_id = cookies.user_id;
        if(user_id !== undefined && user_id !== ""){    // 저장 id가 있음
            setId(user_id);
            setSaveId(true);
        }else{
            setId("");
            setSaveId(false);
        }
    },[cookies]);

    // cookie 저장 및 체크박스 처리
    const checkHandler = () => {
        setSaveId(!saveId);

        if(id !== "" && !saveId === true){
            setCookies("user_id",id);
        }else{
            setCookies("user_id","");
        }
    }

    const loginAf = () => {
        axios.post('http://localhost:9900/Login', null, {params:{id:id,pw:pw}})
            .then((resp)=>{
                if(resp.data.id !== undefined && resp.data.id !== ""){
                    alert(resp.data.id + '님 환영합니다');

                    // 여기서 jwt token을 받는다
                    localStorage.setItem('login', JSON.stringify(resp.data));

                    // (전 페이지로) 이동
                    let before = localStorage.getItem('before');
                    navigate(before);
                }else{
                    alert('아이디나 패스워드를 확인해주세요');
                }
             }) 
            .catch((err)=>{
                 alert('error');
            });
    }

    return(
        <div className='login'>
            <table className='table'>
            <tbody>
                <tr>
                    <th>아이디</th>
                    <td>
                        <input value={id} onChange={(e)=>setId(e.target.value)} className="form=control" />
                    </td>
                </tr>
                <tr>
                    <th>패스워드</th>
                    <td>
                        <input value={pw} onChange={(e)=>setPw(e.target.value)} className="form=control" type='password' />
                    </td>
                </tr>
                <tr>
                    <td colSpan='2'>
                        <input type='checkbox' checked={saveId} onChange={checkHandler}/>&nbsp;&nbsp;id 저장<br />
                        <br />
                    <span><input type='button' onClick={loginAf} className='btn btn-primary' value='login'/></span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span><Link to ='/regi'>회원가입</Link></span>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
    );
}

export default Login;