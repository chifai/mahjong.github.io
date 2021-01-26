import MyMahjong from './MyMahjong';

// to calculate the missing mahjong
const MAX_MJ_TYPE = 9;
const MAX_MJ_NUM = 4;
const MAX_MJ_CHOICE = 16;   // maximum 16 pieces

class MissingMjCal {
    constructor() {
        this.MjInHandNum = Array(MAX_MJ_TYPE).fill(0);  // array to store each mj number (each one max: 4)
        this.bNeedAPair = true;                        // true: need to include a pair
        this.MjInHand = [];                             // to store mj in hand in sorted order
        this.TotalMjNum = 0;
    }

    // to get NeedAPair
    getNeedAPair() {
        return this.bNeedAPair;
    }

    // calculate the missing mahjong
    calMissingMahjong() {
        // do not need to include a pair
        let MjGroup = [];
        if (this.bNeedAPair === false) {
            console.log("Start cal with a pair");
            // return null as not valid when the number is not right
            if (this.MjInHand.length % 3 === 2) {
                MjGroup = this.tryMissingMj(this.MjInHand, 1).slice();
                return [{numToDitch: -1, MjGroup: MjGroup}];
            }
            else if (this.MjInHand.length % 3 === 0) {
                // try to ditch one of the mj
                return this.tryDitchMj(this.MjInHand, 1);
            }
        }
        else {
            console.log("Start cal with no pairs");
            // return null as not valid when the number is not right
            if (this.MjInHand.length % 3 === 1) {
                MjGroup = this.tryMissingMj(this.MjInHand, 0).slice();
                return [{numToDitch: -1, MjGroup: MjGroup}];
            }
            else if (this.MjInHand.length % 3 === 2) {
                // try to ditch one of the mj
                return this.tryDitchMj(this.MjInHand, 0);
            }
        }

        return [];
    }

    tryDitchMj(SortedMj, nPairNum) {
        // try current mj list
        if (this.formMjGroups(SortedMj, nPairNum) !== null) {
            console.log("win")
            return [{numToDitch: 0, MjGroup: []}];     // already win!
        }

        let possibleNum = 1;
        let possibleMjGroup = [];
        let numToDitch = 0;
        let ans = []
        let lastDitchNum = 0;
        for (let i = 0; i < SortedMj.length; i++) {
            if (lastDitchNum === SortedMj[i]) {
                continue;
            }
            let testMjList = SortedMj.slice();
            testMjList.splice(i, 1);    // remove one mj
            let tempPossibleMjGroup = this.tryMissingMj(testMjList, nPairNum);
            if (tempPossibleMjGroup.length > possibleNum) {
                possibleMjGroup = tempPossibleMjGroup.slice();
                possibleNum = possibleMjGroup.length;
                numToDitch = SortedMj[i];
                ans = [];
                ans.push({numToDitch: numToDitch, MjGroup: possibleMjGroup})
                lastDitchNum = numToDitch;
            }
            else if (tempPossibleMjGroup.length === possibleNum) {
                possibleMjGroup = tempPossibleMjGroup.slice();
                possibleNum = possibleMjGroup.length;
                numToDitch = SortedMj[i];
                ans.push({numToDitch: numToDitch, MjGroup: possibleMjGroup})
                lastDitchNum = numToDitch;
            }
        }

        console.log(ans);

        return ans;
    }

    tryMissingMj(SortedMj, nPairNum) {
        let MjGroup = [];
        for (let i = 1; i < MAX_MJ_TYPE + 1; i++) {
            let testMjList = SortedMj.slice();
            testMjList.push(i);
            testMjList.sort();
            let ans = this.formMjGroups(testMjList, nPairNum);
            if (ans !== null) {
                let possibleGroup = { num: i, group: ans };
                MjGroup.push(possibleGroup);
            }
        }
        return MjGroup;
    }

    // input sorted mj in hand, if valid groups are formed, return it
    formMjGroups(SortedMj, nPairNum) {
        // when bPair is true, one pair is needed
        let pendingMj = [];
        let validGroup = null;
        pendingMj.push(new MyMahjong([], SortedMj, nPairNum));

        while (pendingMj.length > 0) {
            // check ungrouped part if any mj can form a valid group: 
            // valid: a pair/three-a-kind/continuous three
            let popMJ = pendingMj.pop();
            let tempMyMj;

            // if ungrouped is empty => grouped is the answer
            if (popMJ.isDone() === true) {
                validGroup = popMJ.getGrouped();
                break;
            }

            tempMyMj = new MyMahjong();
            popMJ.copy(tempMyMj);
            if (tempMyMj.groupPair() === 1) {
                pendingMj.push(tempMyMj);
            }

            tempMyMj = new MyMahjong();
            popMJ.copy(tempMyMj);            
            if (tempMyMj.groupContThree() === true) {
                pendingMj.push(tempMyMj);
            }

            tempMyMj = new MyMahjong();
            popMJ.copy(tempMyMj);
            if (tempMyMj.groupThreeAKind() === true) {
                pendingMj.push(tempMyMj);
            }
        }
        return validGroup;
    }

    // add or minus one from current mj in hand
    changeMjNum(MjNum, bAdd) {
        if (MjNum === 0) {
            this.bNeedAPair = !bAdd;
            return true;
        }

        // mj num can only be 1 - 9
        let MjIndex = MjNum - 1;

        if (MjIndex < 0 || MjIndex >= MAX_MJ_TYPE) return false;
        if (bAdd === true) {
            if (this.TotalMjNum === MAX_MJ_CHOICE) return false;
            if (this.MjInHandNum[MjIndex] === MAX_MJ_NUM) return false;
            this.MjInHandNum[MjIndex]++;

            // push the mj number and sort
            this.MjInHand.push(MjNum)
            this.TotalMjNum++;
        }
        else {
            if (this.MjInHandNum[MjIndex] === 0) return false;
            this.MjInHandNum[MjIndex]--;

            // delete the matching one
            const matchIndex = this.MjInHand.findIndex(el => el === MjNum);
            this.MjInHand.splice(matchIndex, 1);
            this.TotalMjNum--;
        }

        // sort the number
        this.MjInHand.sort();
        return true;
    }
}

export default MissingMjCal;