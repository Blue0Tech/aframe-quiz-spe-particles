let questions = [['Augmented reality is when the user is placed into a virtual world.',false],['There is a library called spe-particles to allow particle simulations in A-Frame.',true],['Keyboard controls can be disabled in virtual reality simulations.',true],['The element a-player is used to configure the point of view.',false],['All A-Frame elements must be placed inside a-scene.',true]];
let score = 5;
let current = -1;
AFRAME.registerComponent('game',{
    init: function() {
        let scene = document.getElementById('scene');
        let text = document.createElement('a-text');
        text.setAttribute('value','Welcome to the quiz! Press either button to continue, this will not affect your score. Your score starts at 5, you can score a maximum of 15.');
        text.setAttribute('color','white');
        text.setAttribute('scale','2 2 2');
        text.setAttribute('align','center');
        text.setAttribute('id','text');
        scene.appendChild(text);
        let left = document.createElement('a-plane');
        left.setAttribute('position','-5 -3 0');
        left.setAttribute('width','3');
        let leftText = document.createElement('a-text');
        leftText.setAttribute('value','False');
        leftText.setAttribute('color','black');
        leftText.setAttribute('scale','2 2 2');
        leftText.setAttribute('align','center');
        left.appendChild(leftText);
        let right = document.createElement('a-plane');
        right.setAttribute('position','5 -3 0');
        right.setAttribute('width','3');
        let rightText = document.createElement('a-text');
        rightText.setAttribute('value','True');
        rightText.setAttribute('color','black');
        rightText.setAttribute('scale','2 2 2');
        rightText.setAttribute('align','center');
        right.appendChild(rightText);
        scene.appendChild(left);
        scene.appendChild(right);
        left.addEventListener('click',()=>{this.submission(false)});
        right.addEventListener('click',()=>{this.submission(true)});
        let scoreDisplay = document.createElement('a-text');
        scoreDisplay.setAttribute('value',`Score: ${score}`);
        scoreDisplay.setAttribute('color','white');
        scoreDisplay.setAttribute('scale','4 4 4');
        scoreDisplay.setAttribute('align','center');
        scoreDisplay.setAttribute('position','0 -3 0');
        scoreDisplay.setAttribute('id','score');
        scene.appendChild(scoreDisplay);
    },
    isCorrect: async function() {
        document.getElementById('correct').setAttribute('visible','true');
        setTimeout(function() {document.getElementById('correct').setAttribute('visible','false')},2000);
    },
    isWrong: async function() {
        document.getElementById('wrong').setAttribute('visible','true');
        setTimeout(function() {document.getElementById('wrong').setAttribute('visible','false')},2000);
    },
    submission: async function(ans) {
        current += 1;
        let text = document.getElementById('text');
        let scoreDisplay = document.getElementById('score');
        if(current > questions.length) {
            this.isCorrect();
            this.isWrong();
            scoreDisplay.setAttribute('visible','true');
            text.setAttribute('value',`Your score was ${score}! Good job! Keep trying to increase your score!`);
        } else {
            if(current == 0) {
                this.isCorrect();
                this.isWrong();
            } else if(ans == questions[current - 1][1]) {
                this.isCorrect();
                score += 2;
            } else {
                this.isWrong();
                score -= 1;
            }
            scoreDisplay.setAttribute('value',`Score: ${score}`);
            if(current == questions.length) {
                scoreDisplay.setAttribute('visible','false');
                text.setAttribute('value','The quiz is over! Press either button to see your score!');
                this.isCorrect();
                this.isWrong();
            } else {
                let text = document.getElementById('text');
                text.setAttribute('value',questions[current][0]);
            }
        }
    }
});