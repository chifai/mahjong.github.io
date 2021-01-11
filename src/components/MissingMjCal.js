// to calculate the missing mahjong
const MAX_MJ_TYPE = 9;
const MAX_MJ_NUM = 4;
const MAX_MJ_CHOICE = 16;   // maximum 16 pieces

class MissingMjCal {
    constructor() {
        this.MjInHandNum = Array(MAX_MJ_TYPE).fill(0);  // array to store each mj number (each one max: 4)
        this.bNeedAPair = false;                        // true: need to include a pair
        this.MjInHand = [];                             // to store mj in hand in sorted order
        this.TotalMjNum = 0;
    }

    // to set NeedAPair is true or not
    setNeedAPair(bNeedAPair) {
        this.bNeedAPair = bNeedAPair;
    }

    // calculate the missing mahjong
    calMissingMahjong() {
        // do not need to include a pair
        let MjGroup = [];
        if (this.bNeedAPair === false) {
            // return null as not valid when the number is not right
            if (this.MjInHand.length % 3 !== 2) return [];
            for (let i = 1; i < MAX_MJ_TYPE + 1; i++) {
                let testMjList = this.MjInHand.slice();
                testMjList.push(i);
                testMjList.sort();
                let ans = this.formGroups(testMjList);
                if (ans !== null) {
                    let possibleGroup = { num: i, group: ans };
                    MjGroup.push(possibleGroup);
                }
            }
        }
        else {
            // return null as not valid when the number is not right
            if (this.MjInHand.length % 3 !== 1) return [];
            for (let i = 1; i < MAX_MJ_TYPE + 1; i++) {

            }
        }
        //console.log(MjGroup);
        return MjGroup;
    }

    // form groups from a sorted MjList, return list of formed groups
    // return null if not exist
    formGroups(MjList) {
        let MjGroupList = [];
        while (MjList.length > 0) {
            // get the first one from the list and find a group
            let targetMj = MjList.shift();
            MjGroupList.push(targetMj);
            //console.log({MjList:MjList});

            // find the next two
            for (let i = 0; i < 2; i++) {
                // find next one
                let nextIndex = MjList.findIndex(el => el === targetMj + 1);
                targetMj++;

                //console.log({nextIndex: nextIndex});
                //console.log({targetMj: targetMj});

                // not matched
                if (nextIndex === -1) return null;

                // found matched, push to group
                MjGroupList.push(MjList.splice(nextIndex, 1)[0]);
                //console.log({grouplist: MjGroupList});
            }
        }
        //console.log({Grouplist: MjGroupList});
        return MjGroupList;
    }

    // add or minus one from current mj in hand
    changeMjNum(MjNum, bAdd) {
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