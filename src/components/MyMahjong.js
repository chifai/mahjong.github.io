class MyMahjong {
    constructor(grouped = [], ungrouped = [], pairNum = 0) {
        this.grouped = grouped.slice();
        this.ungrouped = ungrouped.slice();
        this.pairNum = pairNum;
    }

    isDone() {
        return this.ungrouped.length === 0;
    }

    getGrouped() {
        return this.grouped.slice();
    }

    groupPair() {
        if (this.pairNum === 1) return -1;  // invalid
        let target = this.ungrouped[0];
        
        if (target === this.ungrouped[1]) {
            this.grouped.push([target, target]);
            this.ungrouped.splice(0, 2);
            this.pairNum = 1;
            return 1;   // formed a pair
        }

        return 0;   // no pair formed
    }

    groupThreeAKind() {
        let target = this.ungrouped[0];

        if (target === this.ungrouped[1]) {
            if (target === this.ungrouped[2]) {
                this.grouped.push([target, target, target]);
                this.ungrouped.splice(0, 3);
                return true;
            }
        }

        return false;
    }

    groupContThree() {
        let target = this.ungrouped[0];
        let matchedInd1 = this.ungrouped.findIndex(el => el === target + 1);
        let matchedInd2 = this.ungrouped.findIndex(el => el === target + 2);

        if (matchedInd1 !== -1 && matchedInd2 !== -1 ) {
            this.ungrouped.shift();                     // remove the first
            this.ungrouped.splice(matchedInd1 - 1, 1);
            this.ungrouped.splice(matchedInd2 - 2, 1);
            this.grouped.push([target, target + 1, target + 2]);
            return true;
        }

        return false;
    }

    copy(MyMj) {
        MyMj.ungrouped = this.ungrouped.slice();
        MyMj.grouped = this.grouped.slice();
        MyMj.pairNum = this.pairNum;
    }
}

export default MyMahjong;