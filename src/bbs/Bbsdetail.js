import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

import axios from 'axios';

function Bbsdetail(){
    let navigate = useNavigate();
    let params = useParams();

    const [bbs, setBbs] = useState();
    const [login, setLogin] = useState([]);

    useEffect(function(){
        // alert('seq =' + params.seq);
        // login확인
        let str = localStorage.getItem('login');
        if(str!== null && str!== ""){ // login 한 경우
            //let login = JSON.parse(str);
            getBbs(params.seq);
        }else{
            alert('login 해 주십시오');
            localStorage.setItem('before', '/bbsdetail/' + params.seq);
            navigate("/login"); 
        }
   }, [params.seq, navigate]);

    // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
    const [loading, setLoading] = useState(false); 

    async function getBbs(seq){
        await axios.get("http://localhost:9900/bbsdetail", { params:{"seq":seq} })
            .then(function(resp){
                console.log(resp.data);
                setBbs(resp.data);

                setLoading(true);
            })
            .catch(function(err){
                alert('error');
            })
    }

    if(loading === false){
        return <div>loading...</div>;
    }

    return(
        <div>
            <table className="table table-bordered">
            <colgroup>
                <col style={{ width:'150px' }}/>
                <col style={{ width:'500px' }}/>
            </colgroup>
            <tbody>
            <tr>
                <th>작성자</th>
                <td>{bbs.id}</td>
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
                <td colSpan={2} style={{ fontSize:'22px', fontWeight:"bold", lineHeight:"28px" }}>{bbs.title}</td>
            </tr>
            <tr>                
                <td colSpan={2} style={{ height:"300px", fontSize:"120%" }}>                
                    <textarea rows="12" style={{ backgroundColor:"#fff", fontSize:"20px", border:"none" }}                    
                        cols="15" className="form-control" value={bbs.content} readOnly></textarea>
                </td>
            </tr>
            </tbody>
            </table>
            <div className='my-5 d-flex justify-content-center'>
            <button type="button" onClick={ ()=>{navigate("/bbsanswer/" + bbs.seq)} } className="btn btn-primary">답글</button>&nbsp;&nbsp;
                <UpdateBtn bbs={bbs} />&nbsp;&nbsp;
                <DeleteBtn bbs={bbs} />
            </div>
        </div>
    )
}

function UpdateBtn(props){
    let navigate = useNavigate();

    let str = localStorage.getItem("login");
    let login = JSON.parse(str);

    function handleUpdateChange(){
        navigate("/bbsupdate/"+props.bbs.seq);
    }

    if(login.id === props.bbs.id){

        return(
            <>
                <button className='btn btn-primary' onClick={() => handleUpdateChange()}>글수정</button>
            </>
        );

    }
}
function DeleteBtn(props){

    let navigate = useNavigate();
    let str = localStorage.getItem("login");
    let login = JSON.parse(str);

    function deleteBbs(seq) {
        axios.get("http://localhost:9900/bbsdelete", { params:{"seq":seq} })
                .then(function(resp){
                        alert("글이 성공적으로 삭제되었습니다.");
                        navigate("/bbslist");
                })    
                .catch(function(err){
                    alert('error');
                })
    }

    if(login.id === props.bbs.id){
        return(
            <>
                <button className='btn btn-primary' onClick={()=> deleteBbs(props.bbs.seq)}>글삭제</button>
            </>
        );
    }
}


export default Bbsdetail;