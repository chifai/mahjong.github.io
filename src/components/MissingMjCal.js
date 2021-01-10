// to calculate the missing mahjong
const MAX_MJ_TYPE = 9;
const MAX_MJ_NUM = 4;
const MAX_MJ_CHOICE = 16;   // maximum 16 pieces

class MissingMjCal {
    constructor() {
        this.MjInHandNum = Array(MAX_MJ_TYPE).fill(0);  // array to store each mj number (each one max: 4)
        this.bNeedAPair = false;                        // true: need to include a pair
        this.MjInHand = [];
        this.TotalMjNum = 0;
    }

    // to set NeedAPair is true or not
    setNeedAPair(bNeedAPair) {
        this.bNeedAPair = bNeedAPair;
    }

    // add or minus one from current mj in hand
    changeMjNum(MjNum, bAdd) {
        // mj num can only be 1 - 9
        let MjIndex = MjNum - 1;
        
        if (MjIndex < 0 || MjIndex >= MAX_MJ_TYPE) return false;
        if (bAdd === true) {
            if (this.TotalMjNum === MAX_MJ_CHOICE ) return false;
            if (this.MjInHandNum[MjIndex] === MAX_MJ_NUM) return false;
            this.MjInHandNum[MjIndex]++;

            // push the mj number and sort
            this.MjInHand.push(MjNum)
            this.TotalMjNum++;
        }
        else {
            console.log("minus1")
            if (this.MjInHandNum[MjIndex] === 0) return false;
            console.log("before")
            this.MjInHandNum[MjIndex]--;
            console.log(this.MjInHand)
            console.log(MjNum);

            // delete the matching one
            const matchIndex = this.MjInHand.findIndex( el => el === MjNum );
            this.MjInHand.splice(matchIndex, 1);

            console.log(this.MjInHand)
            this.TotalMjNum--;
        }

        // sort the number
        this.MjInHand.sort();
        return true;
    }
}

export default MissingMjCal;