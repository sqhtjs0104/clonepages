class BadRequestException extends Error {
    #statusCode; // Error Code
    #selector; // 입력 요소에 대한 selector(element를 받기 위한 추가요소)

    constructor(msg = "잘못된 요청입니다.", selector = null) {
        super(msg);
        super.name = "BadRequestException";
        this.#statusCode = 400;
        this.#selector = selector;
    }

    get statusCode() {
        return this.#statusCode;
    }

    get selector() {
        return this.#selector;
    }
}

export default BadRequestException;