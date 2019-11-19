/*global Vue axios */
var app = new Vue({
    el: '#admin',
    data: {
        name: "",
        votes: '',
        file: null,
        addCandidate: null,
        candidates: [],
        findName: "",
        findCandidate: null,
        newCandidate: "",
        ballot: [],
    },
    created() {
        this.getCandidates();
    },
    computed: {
        suggestions() {
            return this.candidates.filter(candidate => candidate.name.toLowerCase().startsWith(this.findName.toLowerCase()));
        }

    },
    methods: {
        fileChanged(event) {
            this.file = event.target.files[0];
        },

        async upload() {
            try {
                let r1 = await axios.post('/api/candidates', {
                    name: this.name,
                    votes: this.votes,
                });
                this.addCandidate = r1.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async getCandidates() {
            try {
                let response = await axios.get("/api/candidates");
                this.candidates = response.data;
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        selectCandidate(candidate) {
            this.findName = "";
            this.findCandidate = candidate;
        },
        async deleteCandidate(candidate) {
            try {
                let response = axios.delete("/api/candidates/" + candidate._id);
                this.findCandidate = null;
                this.getCandidates();
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        async incrementVote(candidate) {
            try {
                console.log(candidate);
                let response = await axios.put("/api/candidates/" + candidate._id, {
                    votes: candidate.votes,
                });
                this.findCandidate = null;
                this.getCandidates();
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },
        submitVote() {
            console.log("Submitting Votes");
            for (var candidate of this.candidates) {
                if (candidate.selected) {
                    console.log(candidate);
                    this.incrementVote(candidate);
                    this.ballot.push(candidate);
                }
            }
        }
    }
});
