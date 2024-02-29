import React, { useState,useEffect } from'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';


function Bbsupdate(){

    let navigate = useNavigate();
    let params = useParams();
    let str = localStorage.getItem("login");
    let login = JSON.parse(str);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [bbs, setBbs] = useState();

    // 받을 데이터를 읽어 들이는 처리가 끝났는지 확인
    const [loading, setLoading] = useState(false); 

    async function getBbs(seq){
        await axios.get("http://localhost:9900/bbsdetail", { params:{"seq":seq} })
            .then(function(resp){
                setBbs(resp.data);
                setTitle(resp.data.title);
                setContent(resp.data.content);
                setLoading(true);
            })
            .catch(function(err){
                alert('error');
            })
    }

    useEffect(function(){
        getBbs(params.seq);
    }, []);

    if(loading === false){
        return <div>loading...</div>;
    }

    function update(seq,id,title,content) {
        axios.get("http://localhost:9900/bbsupdate", { params:{"seq":seq,"id":id,"title":title,"content":content}})
                        .then(function(response){
                            if(response.data === "YES"){
                                alert("글수정이 완료되었습니다.");
                                navigate("/bbslist");
                            }else{
                                alert("글수정에 실패하였습니다!");
                                navigate("/bbsupdate/" + params.seq);
                            }
                        })
                        .catch(function(){
                             console.log("error");
                        })
    }

    return(
        <div>
            <div className='center'>
            <h3>글수정</h3>
            <table className="table table-bordered">
                <colgroup>
                    <col width="200px"/><col width="500px"/>
                </colgroup>
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td>{login.id}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td><input 
                                    type="text" 
                                    value={title}  
                                    onChange={e => setTitle(e.target.value)} 
                                    className='form-control'
                                /></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea 
                                    rows={15} 
                                    cols={50} 
                                    value={content} 
                                    onChange={e => setContent(e.target.value)} 
                                    className='form-control'
                                /></td>
                    </tr>
                </tbody>
            </table><br/>
            <div className='my-5 d-flex justify-content-center'>
                <button className="btn btn-primary" onClick={() => update(params.seq,login.id,title,content)}>작성완료</button>
            </div>
        </div>
        </div>
    );
}

export default Bbsupdate;