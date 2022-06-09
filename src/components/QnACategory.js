import '../style/Category.css'

function QnACategory(props) {

  const handleChange = (data) => {
    props.setData(data);
  }
//계정/인증, 구매/판매, 쪽지, 기타, 광고, 오류/제안
  return (
    <select className="category" onChange={handleChange}>
      <option value="none">==카테고리==</option>
      <option value="계정/인증">계정/인증</option>
      <option value="구매/판매">구매/판매</option>
      <option value="쪽지">쪽지</option>
      <option value="오류/제안">오류/제안</option>
      <option value="광고">광고</option>
      <option value="기타">기타</option>
    </select>
  )
}

export default QnACategory;