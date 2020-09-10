const EBSurlfinder = require('ebs_onlinecls');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("접속할 학교 이름을 입력해 주세요 : ", input => {
    
    EBSurlfinder(input).then(res => {
        if (res.err) return console.log(`오류가 발생했습니다.\n프로그램을 재시작해 주세요`);
        if (!res.length) return console.log('검색 결과가 없습니다. 다시 검색해 주세요');
        if (res.length < 2) {
            console.log(`${res[0].schulNm} 의 온라인클래스 페이지를 브라우져에서 엽니다.\n열리지 않을시 아래 링크로 접속해 주세요.\n${res[0].url}`);
            var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
            require('child_process').exec(start + ' ' + res[0].url);
            return;
        } else {

            console.clear();
            console.log("이름이 중복되는 학교가 있습니다. 아래 목록에서 선택해 주세요");
            res.forEach((val, idx) => {console.log(`${idx+1}. ${val.cityNm} ${val.areaNm} ${val.schulNm}\n`)});
            
            rl.question("숫자를 입력해 주세요 : ", input => {
                if (isNaN(input)) return console.log("숫자가 아닙니다.");
                if (input > res.length || input < 1) return console.log("범위 밖의 입력값입니다.");

                
                console.log(`${res[input-1].cityNm} ${res[input-1].areaNm} ${res[input-1].schulNm} 의 온라인클래스 페이지를 브라우져에서 엽니다.\n열리지 않을시 아래 링크로 접속해 주세요.\n${res[input-1].url}`);
                var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
                require('child_process').exec(start + ' ' + res[input-1].url);
            });

        }
    });

})