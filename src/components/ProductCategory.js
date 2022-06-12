import '../style/ProductCategory.css'

function ProductCategory(props) {

    const handleChange = (data) => {
        props.setData(data);
    }

    return (
        <select className="category" onChange={handleChange}>
            <option value="none">==카테고리==</option>
            <option value="여성의류">여성의류</option>
            <option value="남성의류">남성의류</option>
            <option value="신발">신발</option>
            <option value="가방">가방</option>
            <option value="시계/쥬얼리">시계/쥬얼리</option>
            <option value="패션 액세서리">패션 액세서리</option>
            <option value="디지털/가전">디지털/가전</option>
            <option value="스포츠/레저">스포츠/레저</option>
            <option value="스타굿즈">스타굿즈</option>
            <option value="키덜트">키덜트</option>
            <option value="예술/희귀/수집품">예술/희귀/수집품</option>
            <option value="음반/악기">음반/악기</option>
            <option value="도서/티켓/문구">도서/티켓/문구</option>
            <option value="뷰티/미용">뷰티/미용</option>
            <option value="가구/인테리어">가구/인테리어</option>
            <option value="생활/가공식품">생활/가공식품</option>
            <option value="유아동/출산">유아동/출산</option>
            <option value="반려동물용품">반려동물용품</option>
            <option value="기타">기타</option>
        </select>
    )
}

export default ProductCategory;