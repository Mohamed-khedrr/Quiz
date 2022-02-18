//https://opentdb.com/api.php?amount=5&category=18&difficulty=hard
import { FetchData } from "./fetchData.js";
export class SetQuiz {
    constructor() {
        $('.setting').slideDown(500);
        this.difficulty = $("[name = 'difficulty']")
        this.startBtn = $('#start-btn')
        this.qNumber = $('#q-number')
        this.startBtn.click(this.getUrl.bind(this))

    }



    getUrl(e) {
        e.preventDefault()
        let diff = this.getDifficulty()
        let cat = this.getCategory()
        let num = this.getQuestionsNum()
        if (num == "") {
            $('.alert').removeClass('d-none')
        }
        else {
            $('.alert').addClass('d-none');
            new FetchData(`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`);
        }
    }


    getDifficulty() {
        let level;
        this.difficulty.each(function () {
            if (this.checked) {
                level = this.value;
            }
        })
        return (level);
    }


    getCategory() {
        let cat = $('#category option:selected').val();
        return (cat);
    }

    getQuestionsNum() {
        return (this.qNumber.val());
    }


}