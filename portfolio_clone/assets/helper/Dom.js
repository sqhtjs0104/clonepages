let lineNumber = 0; // 총 콘솔 출력 라인 수
let dept = 0; // 각 노드 계층 단계의 깊이

function exploreDom(ancestor) {
    lineNumber++; // 함수 호출: 무조건 한 줄 출력 -> 라인 + 1
    dept++; // 깊이도 + 1 해준 뒤 함수 마지막에 다시 빼줌(재귀 거듭될수록 높아짐 -> 깊이)

    // 자식 노드가 있다면
    if (ancestor.children[0]) {
        // console.group을 통해 하위 노드 처리
        if (ancestor.classList[0]) { // 클래스가 있다면
            console.group(`<${ancestor.tagName} class="${ancestor.classList[0]}">`); // 클래스 이름도 붙여서 태그 출력
        } else {
            console.group(`<${ancestor.tagName}>`); // 클래스 없으면 그냥 태그만 출력
        }
        console.log(`///// dept: ${dept}`);
        // 재귀 호출
        Array.from(ancestor.children).forEach(v => {
            exploreDom(v);
        });
        console.groupEnd();
    } else {
        // 리프 태그 출력(클래스 포함)
        if (ancestor.classList[0]) {
            console.log(`<${ancestor.tagName} class="${ancestor.classList[0]}">`);
        } else {
            console.log(`<${ancestor.tagName}>`);
        }
    }

    dept--;
    return lineNumber; // DOM 총 길이 반환
}

export default exploreDom;