import { useRef, useState } from "react";

function Imageview(){
    const [imageFile, setImageFile] = useState("");
    const imgRef = useRef();

    function saveImgFile(){
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageFile(reader.result);
        }
    }

    return(
        <div>
            <input type="file" onChange={saveImgFile} ref={imgRef}/><br /><br />
            <img src={imageFile} alt="" />
        </div>
    );
}

export default Imageview;