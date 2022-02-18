import { Exam } from "./exam.js";
export class FetchData {
    constructor(url) {
        this.url = url;
        this.data = this.fetchData();
        this.displayQuiz();
    }
    async fetchData() {
        this.data = await fetch(this.url)
        this.data = await this.data.json()
        this.data = this.data.results
        await new Exam(this.data);
    }

    displayQuiz() {
        $('.setting').slideUp(500, () => {
            $('.quiz').slideDown(500)
        });

    }













}