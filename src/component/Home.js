import MyModal from "./MyModal";

function Home(){

    // 임시 ( 홈 들어오면 로그인이 풀림 )
    localStorage.removeItem('login');
    
    return(
        <div>
            <h1>Home</h1>
            <p>Welcome to My Home</p>
            <MyModal/>
        </div>
    )
}
export default Home;