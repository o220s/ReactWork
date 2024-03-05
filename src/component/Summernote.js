

// npm i react-summernote -force
// npm i bootstrap @popperjs/core -force

import ReactSummernote from 'react-summernote';
import "react-summernote/dist/react-summernote.css"; // import styles
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

function Summernote(){
    const [snote, setSnote] = useState('');
    const [print, setPrint] = useState();

    function onChange(content){    // 데이터를 변경
        setSnote(content);
    }

    function onImageUpload(images, insertImage){    // 이미지 업로드
        for(let i = 0;i < images.length;i++){
            const reader = new FileReader();
            reader.onloadend = () => {
                insertImage(reader.result);
            }
            reader.readAsDataURL(images[i]);
        }
    }

    function clickBtn(){
        setPrint(snote);
    }

    return(
        <div>
                 <ReactSummernote        
                value={snote}       
                options={{
                    lang : 'ko-KR',              // default: 'en-US'          
                    height: 500,          
                    dialogsInBody: true,
                    focus: true,  
                    toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', "italic", 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['fontname', ['fontname']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture', 'video']],
                    ['view', ['fullscreen', 'codeview']]
                    ]
                }}
                onChange={onChange}
                onImageUpload={onImageUpload}
            />
                <br />
                <button onClick={clickBtn}>출력</button>
                <br />
                <div dangerouslySetInnerHTML={{__html: print}}/>
        </div>
    );
}

export default Summernote;