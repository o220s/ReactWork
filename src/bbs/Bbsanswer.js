import {useState,useEffect} from'react';
import{useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';

const Bbsanswer = () => {
    let navigate = useNavigate();   // bbslist로 이동하기 위한
    let params = useParams();       // seq취득

    const [bbs, setBbs] = useState();
    const [loading, setLoading] = useState(false);

    const [seq] = useState(params.seq); //seq를 저장

    // 답글
    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const bbsData = async(seq) => {
        const response = await axios.get('http://localhost:9900/bbsdetail', { params:{"seq":seq} });

        setBbs(response.data);

        setLoading(true);   // 여기서 rendering
    }

    useEffect(()=>{
        let login = localStorage.getItem('login');
        let id = (JSON.parse(login)).id;
        setId(id);
        bbsData(params.seq);
    },[params.seq]);

    function answerBbs(){
        axios.get("http://localhost:9900/bbsanswer", 
                    { params:{ "seq":seq, "id":id, "title":title, "content":content } })
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("답글이 성공적으로 등록되었습니다");
                    navigate('/bbslist');    // bbslist로 이동
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             })   
    }

    if(loading === false){
        return <div>Loading...</div>
    }


    return (
        <div>
            <h2>기본글</h2>

            <table className="table">
            <colgroup>
            <col width="150"/><col width="500"/>
            </colgroup>
            <tbody>
            <tr>
                <th>작성자</th>
                <td>{bbs.id}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>{bbs.title}</td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>{bbs.wdate}</td>
            </tr>
            <tr>
                <th>조회수</th>
                <td>{bbs.readcount}</td>
            </tr>
            <tr>                
                <td colSpan="2">
                    <textarea rows="10" style={{ backgroundColor:"#fff", fontSize:"20px", border:"none" }}                    
                        cols="15" className="form-control" value={bbs.content} readOnly></textarea>
                </td>
            </tr>
            </tbody>
            </table>

            <hr/>

            <h2>답글작성</h2>
            
            <table className="table">
            <colgroup>
                <col width="150"/><col width="500"/>
            </colgroup>
            <tbody>
            <tr>
                <th>아이디</th>
                <td>
                    <input type="text" className="form-control" value={id} readOnly/>
                </td>
            </tr>
            <tr>
                <th>제목</th>
                <td>
                    <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </td>	
            </tr>
            <tr>
                <th>내용</th>
                <td>
                    <textarea rows="10" cols="50" className="form-control" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                </td>
            </tr>
            <tr>
                <td colSpan="2" align="center">
                    <input type="button" className='btn btn-primary' onClick={answerBbs} value="작성완료" />
                </td>
            </tr>
            </tbody>
            </table>            

        </div>
    );
}

export default Bbsanswer;