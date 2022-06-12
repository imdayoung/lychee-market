import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import ManagerHeader from "../../components/Header3";
import UserListItem from "./components/UserListItem";
import Pagination from "../../components/Pagination";
import "../../style/Management.css"

export default function ManageUser() {
  // 사용자 정보
  const [User, SetUser] = useState([{
    user_id: '',
    user_nickname: '',
    user_name: '',
    user_reliable: '',
  }]);

  // 페이지네이션
  const limit = 10;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  // 검색 단어
  const [SearchWord, SetSearchWord] = useState();
  
  useEffect(()=>{
    Axios.get('http://localhost:8080/manager/user')
    .then((res)=>{
      console.log(res.data);
      SetUser(res.data);
    });
  },[]);

  let UserList = [];
  if(User.length === 0) {
    UserList.push(<tr key={0} className="ListRow"><td colSpan={6}>회원이 존재하지 않습니다.</td></tr>);
  }
  for(let i=User.length-1; i>=0; i--){
    UserList.push(
      <UserListItem key={i} userid={User[i].user_id} nickname={User[i].user_nickname}
      username={User[i].user_name} reliable={User[i].user_reliable}/>
    );
  }

  return (
    <div>
      <ManagerHeader keyword="회원 관리"/>
      <div className="ManageMain">
        <table className="UserList">
          <thead className="UserHead">
            <tr>
              <td className="UserId">아이디</td>
              <td className="UserNickname">닉네임</td>
              <td className="UserName">이름</td>
              <td className="UserReliable">신뢰도</td>
              <td className="ChangeReliable">신뢰도 조정</td>
              <td className="PermanentBan">영구 정지</td>
            </tr>
          </thead>
          <tbody>
            {UserList.slice(offset, offset + limit)}
          </tbody>
        </table>
        <Pagination
          total={UserList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
        <div className="ManageBottom">
          <div className="ManageSearch">
            <input type="text" onChange={e=>SetSearchWord(e.target.value)}></input>
            <Link to={{pathname: '/manager/user/'+SearchWord}} state={{searchword: SearchWord}}>
              <button type="button">검색</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}