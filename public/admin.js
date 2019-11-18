/*global Vue */
var app = new Vue({
    el: '#admin',
    data: {
        candidates: [
            { name: 'Comment 1', votes: 5 },
            { name: 'Comment 2', votes: 6 },
            { name: 'Comment 3', votes: 1 },
            { name: 'Comment 4', votes: 4 },
            { name: 'Comment 5', votes: 3 }
        ],
        newCandidate: "",
    },
    created: function() {},
    computed: {
        sortedCandidates() {
            return this.candidates.sort((a, b) => {
                var rval = 0;
                if (a.votes < b.votes) {
                    rval = 1;
                }
                else if (a.votes > b.votes) {
                    rval = -1;
                }
                return (rval);
            })
        }

    },
    methods: {
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
        addCandidate() {
            this.candidates.push({ name: this.newCandidate, votes: 0 });
            this.newCandidate = "";
        },
        incrementVotes(item) {
            item.votes = item.votes + 1;
        },
    }
});
