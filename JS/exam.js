import { SetQuiz } from "./setting.js";
export class Exam {
    constructor(questions) {
        this.questions = questions;
        this.questionsNum = questions.length
        this.currentQ = 0;
        this.correctAnswersNum = 0
        this.qBody = $('#qusetion')
        this.answers = $('#answers')
        this.submitBtn = $('#submit')
        this.state = $('#state')
        this.displayQusetion()
        this.submitBtn.click(this.submitAnswer.bind(this))
        $('#try-again').click(this.tryAgain.bind(this))
    }


    displayQusetion() {
        let i = this.currentQ;

        // Display Qustion Body
        this.qBody.fadeOut(500, () => { this.qBody.html(this.questions[i].question); })
        this.qBody.fadeIn(500);

        // Display Progress
        $('#currentQusetion').html(`${this.currentQ + 1} Of ${this.questionsNum} Questions`)

        // getting answers 
        let incorrectAnswers = this.questions[i].incorrect_answers
        incorrectAnswers.push(this.questions[i].correct_answer)
        incorrectAnswers = this.shuffle(incorrectAnswers);
        let container = '';

        // Display answers 
        for (let j = 0; j < incorrectAnswers.length; j++) {
            container += `
            <input
            type="radio"
            id="choice"
            name="choice"
            class="custom-control-input"
            value="${incorrectAnswers[j]}"
          />
          <label class="custom-control-label" for="choice">${incorrectAnswers[j]}</label>
          <br>`
        }
        this.answers.fadeOut(500, () => { this.answers.html(container); })
        this.answers.fadeIn(500)

    }



    // shuffle methode mix array elements randomly
    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    submitAnswer(e) {
        e.preventDefault()
        let choices = $("[name = 'choice']")
        let selected;

        choices.each(function () {
            if (this.checked) {
                selected = this.value;
            }
        })

        // check if the answer is correct or not
        if (selected == this.questions[this.currentQ].correct_answer) {
            this.state.html('Right')
            this.state.addClass('bg-success')
            this.state.fadeIn(500)
            this.state.fadeOut(500, () => {
                this.state.removeClass('bg-danger')
            })
            this.correctAnswersNum++;
        }
        else {
            this.state.html('Wrong')
            this.state.addClass('bg-danger')
            this.state.fadeIn(700)
            this.state.fadeOut(700, () => {
                this.state.removeClass('bg-danger')
            })
        }


        this.currentQ++;
        // check the end of question
        if (this.currentQ == this.questionsNum) {
            this.finish();
        } else {
            this.displayQusetion()
        }
    }



    finish() {

        $('#score').html(`${this.correctAnswersNum} / ${this.questionsNum}`)
        $('.quiz').slideUp(500, () => {
            $('.end').slideDown(500)
        })
    }





    tryAgain() {
        $('.end').slideUp(500, () => {
            location.reload()
        })
    }
















}