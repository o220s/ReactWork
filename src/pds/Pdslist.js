import {useEffect,useState} from'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Pdslist(){
    const [pdslist, setPdslist] = useState([]);

    function getPdslist(){
        axios.get("http://localhost:9900/pdslist")
       .then(function(resp){
            setPdslist(resp.data);
          })   
       .catch(function(err){
            alert('error');
          })
    }

    useEffect(()=>{
        getPdslist();
    },[]);

    return(
<div align="center">
<table class="table table-hover">
    <colgroup>
    <col width="50"/><col width="100"/><col  width="500"/><col width="100"/><col width="100"/><col width="200"/>
    </colgroup>

    <thead>
    <tr>
        <th>번호</th> <th>작성자</th> <th>제목</th> <th>조회수</th> <th>다운수</th> <th>작성일</th>
    </tr>
    </thead>

    <tbody>
    {
     pdslist && pdslist.map((pds, i) => (
        <TableRow pds={pds} rownum={i + 1} key={pds.id} />
      ))
    }
    </tbody>
</table>
<br/>
<div className='my-5 d-flex justify-content-center'>
                <Link className='btn btn-primary' to='/pdswrite'>글쓰기</Link>
            </div>
</div>
    );
}

function TableRow(props) {
        return (
            <tr>
                <td>{props.rownum}</td>
                <td>{props.pds.id}</td>
                <TitleClick pds={props.pds} />
                <td>{props.pds.readcount}</td>
                <td>{props.pds.downcount}</td>
                <td>{props.pds.regdate}</td>
            </tr>
        );
    }

function TitleClick(props) {
    return (
        <td className='underline'>
             <Link to={`/pdsdetail/${props.pds.seq}`}>
        {props.pds.title}
      </Link>
        </td>
    )
}



export default Pdslist;