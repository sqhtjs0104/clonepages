import BadRequestException from "./ExceptionHelper.js";

class RegexHelper {
    /** 싱글톤 */
    // 싱글톤은 스태틱을 통해 메모리 적재해주는게 좋음
    static #current = null;

    static getInstance() {
        if (RegexHelper.#current === null) {
            RegexHelper.#current = new RegexHelper();
        }

        return RegexHelper.#current;
    }

    /**
     * 값의 존재 여부 검사
     * @param   {HTMLElement}   field   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {string}        msg     - 값이 없을 경우 출력할 메세지
     */
    value(field, msg) {
        const content = field.value;

        if (content === undefined || content === null || (typeof content === "string" && content.trim().length === 0)) {
            throw new BadRequestException(msg, field);
        }

        return true;
    }

    /**
     * 최대 글자 길이 초과 여부 검사
     * @param   {HTMLElement}   field   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {number(int)}   len     - 최대 글자수
     * @param   {string}        msg     - 값이 최대 길이보다 길 경우 출력할 메세지
     */
    maxLength(field, len, msg) {
        this.value(field, msg);

        const content = field.value;

        if (content.length > len) {
            throw new BadRequestException(msg, field);
        }

        return true;
    }

    /**
     * 최소 글자 수 미만 여부 검사
     * @param   {HTMLElement}   field   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {number(int)}   len     - 최소 글자수
     * @param   {string}        msg     - 값이 최소 길이보다 짧을 경우 출력할 메세지
     */
    minLength(field, len, msg) {
        this.value(field, msg);
        
        const content = field.value;

        if (content.length < len) {
            throw new BadRequestException(msg, field);
        }

        return true;
    }

    /**
     * 두 값이 동일한지 검사
     * @param   {HTMLElement}   origin   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {HTMLElement}   compare   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {string}        msg     - 검사에 실패할 경우 출력할 메세지
     */
    compareTo(origin, compare, msg) {
        this.value(origin, msg);
        this.value(compare, msg);

        const src = origin.value.trim();
        const dsc = compare.value.trim();

        if (src != dsc) {
            throw new BadRequestException(msg, origin);
        }

        return true;
    }

    /**
     * 라디오/체크박스가 선택된 항목인지 검사
     * @param   {HTMLElement}   field   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {string}        msg     - 검사에 실패할 경우 출력할 메세지
     */
    check(field, msg) {
        const checkedItem = Array.from(field).filter(v => v.checked);

        if (checkedItem.length === 0) {
            throw new BadRequestException(msg, field[0]);
        }
    }

    /**
     * 라디오/체크박스의 최소/최대 선택 개수 제한
     * @param   {HTMLElement}   field   - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {string}        msg     - 검사에 실패할 경우 출력할 메세지
     */
    /* 최소 선택 개수 */
    checkMin(field, len, msg) {
        const checkedItem = Array.from(field).filter(v => v.checked);

        if (checkedItem.length < len) {
            throw new BadRequestException(msg, field[0]);
        }
    }
    /* 최대 선택 개수 */
    checkMax(field, len, msg) {
        const checkedItem = Array.from(field).filter(v => v.checked);

        if (checkedItem.length > len) {
            throw new BadRequestException(msg, field[0]);
        }
    }

    /**
     * 정규 표현식 검사를 위한 통합 메소드 field
     * @param   {HTMLElement}   field       - 검사할 대상에 대한 요소의 DOM Object(Element)
     * @param   {string}        msg         - 정규 표현식을 충족하지 않을 때 출력할 메세지
     * @param   {object}        regexExpr   - 검사할 정규 표현식
     */
    field(field, msg, regexExpr) {
        this.value(field, msg);

        // 입력값이 없거나 정규 표현식 검사가 실패할 경우
        if (!regexExpr.test(field.value.trim())) {
            throw new BadRequestException(msg, field);
        }

        return true;
    }

    /** field를 사용해 검사하는 각 항목들 */
    /* 숫자로만 이루어졌는지 검사 (field 호출) */
    num(field, msg) {
        // this의 field() 메소드에 입력값과 오류 출력문, 정규 표현식(숫자) 전달
        return this.field(field, msg, /^[0-9]*$/);
    }

    /* 영문으로만 입력 여부 검사 */
    eng(field, msg) {
        return this.field(field, msg, /^[a-zA-Z]*$/);
    }

    /* 한글로만 입력 여부 검사 */
    kor(field, msg) {
        return this.field(field, msg, /^[ㄱ-ㅎ가-힣]*$/);
    }

    /* 영문과 숫자로만 입력 여부 검사 */
    engNum(field, msg) {
        return this.field(field, msg, /^[a-zA-Z0-9]*$/);
    }

    /* 한글과 숫자로만 입력 여부 검사 */
    korNum(field, msg) {
        return this.field(field, msg, /^[ㄱ-ㅎ가-힣0-9]*$/);
    }

    /* 영어와 한글로만 입력 여부 검사 */
    engKor(field, msg) {
        return this.field(field, msg, /^[가-힣a-zA-Z]*$/);
    }

    /* 최소 하나의 문자, 숫자, 특수문자를 포함했는지 검사 */
    engNumSChar(field, msg) {
        return this.field(field, msg, /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z0-9!@#$%^&*]*$/);
    }

    /* 이메일 주소 형식인지 검사 */
    email(field, msg) {
        return this.field(field, msg, /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    }

    /* 핸드폰 번호 형식인지 검사 */
    cellphone(field, msg) {
        return this.field(field, msg, /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/);
    }

    /** 집 전화 형식인지 검사 */
    telphone(field, msg) {
        return this.field(field, msg, /^\d{2,3}\d{3,4}\d{4}$/);
    }

    /* 핸드폰 번호나 집 전화 번호 둘 중 하나를 충족하는지 검사 */
    phone(field, msg) {
        this.value(field, msg);

        const content = field.value.trim();
        const check1 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
        const check2 = /^\d{2,3}\d{3,4}\d{4}$/;

        if (!check1.test(content) && !check2.test(content)) {
            throw new BadRequestException(msg, field);
        }

        return true;
    }
}

export default RegexHelper;