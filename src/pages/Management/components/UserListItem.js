import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function UserListItem(props){
    let Navigate = useNavigate();

    const [Reliable, SetReliable] = useState(0);

    // 신뢰도 조정 클릭
    const ReliableClick = ()=>{
      if(Reliable > 100 || Reliable < 0){
        alert("적절하지 않은 신뢰도입니다. 다시 입력해주세요.");
        Navigate('/manager/user');
      }
      else{
        if(window.confirm(props.userid+"님의 신뢰도를 '"+Reliable+"'(으)로 조정하시겠습니까?")===true){
          Axios.post("http://localhost:8080/manager/user/reliable",{
            user_id: props.userid,
            user_reliable: Reliable,
          }).then((res)=>{
            console.log(res);
            if(res.data === true)
              window.location.reload();
            else{
              alert("신뢰도 조정에 오류가 발생하였습니다.");
              Navigate('/manager/user');
            }
          });
        }
      }
    };

    // 영구정지 클릭
    const BanClick = ()=>{
      if(window.confirm(props.userid+"님을 영구 정지하시겠습니까?")===true){
        Axios.post("http://localhost:8080/manager/user",{
          user_id: props.userid,
        }).then((res)=>{
          console.log(res);
          if(res.data === true)
            window.location.reload();
          else{
            alert("영구 정지에 오류가 발생하였습니다.");
            Navigate('/manager/user');
          }
        });
      }
    };

    return (
      <tr className="ListRow">
        <td className="UserId">{props.userid}</td>
        <td className="UserNickname">{props.nickname}</td>
        <td className="UserName">{props.username}</td>
        <td className="UserReliable">{props.reliable}</td>
        <td className="ChangeReliable">
          <input className="InputReliable" onChange={(e)=>SetReliable(e.target.value)}/>
          <button className="SubmitReliable" onClick={ReliableClick}>확인</button>
        </td>
        <td className="PermanentBan">
          <button className="BanButton" onClick={BanClick}>영정</button>
        </td>
      </tr>
    );
  };